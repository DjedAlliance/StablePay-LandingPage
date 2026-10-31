---
title: Next.js
description: Add StablePay to a Next.js App Router store, with a client component for the widget and a route handler that verifies payments.
section: Guides
---

# Next.js

The StablePay widget is a React component that uses browser APIs (the wallet lives on `window.ethereum`), so in the Next.js App Router it belongs in a **Client Component**. Payment verification belongs on the server, in a **Route Handler**. This page wires both up. It was tested with Next.js 16 and React 19.

## You will learn

- Where `'use client'` goes, and why
- How to pass an order from a Server Component into the widget
- How to verify payments in a Route Handler

> [!NOTE]
> This page assumes you know the ideas from the [main tutorial](./07-integration-guide.md). It shows only what is different in Next.js.

## Step 1: Install

Follow [step 3 of the tutorial](./07-integration-guide.md#step-3-install-stablepay) exactly: clone StablePay next to your app, add the `overrides` block to `package.json`, then:

```bash title="terminal"
npm install --install-links ../StablePay/tectonic-sdk ../StablePay/stablepay-sdk
npm install viem
```

## Step 2: The widget, as a Client Component

```jsx title="app/components/StablePayCheckout.jsx"
'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import StablePay from 'stablepay-sdk'
import 'stablepay-sdk/dist/esm/styles.css'

export default function StablePayCheckout({ order }) {
  const router = useRouter()
  const [message, setMessage] = useState('')

  const networkSelector = useMemo(() => {
    const config = new StablePay.Config({
      receivingAddress: order.receivingAddress,
      amounts: { [order.network]: { stablecoin: order.amount } },
    })
    return new StablePay.NetworkSelector(config)
  }, [order.id, order.receivingAddress, order.network, order.amount])

  const confirm = async ({ txHash }) => {
    setMessage('Confirming your payment…')
    for (let attempt = 0; attempt < 20; attempt++) {
      const response = await fetch(`/api/orders/${order.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash }),
      })
      if (response.status !== 202) {
        const updated = await response.json()
        if (updated.status === 'paid') return router.push(`/orders/${order.id}/thank-you`)
        return setMessage(updated.error ?? 'We could not confirm this payment. Please contact us.')
      }
      await new Promise((resolve) => setTimeout(resolve, 4000))
    }
    setMessage('Still waiting for confirmations. Refresh this page in a minute.')
  }

  return (
    <>
      <StablePay.Widget
        networkSelector={networkSelector}
        onTransactionComplete={confirm}
        onTransactionUnderpaid={confirm}
      />
      {message && <p>{message}</p>}
    </>
  )
}
```

`'use client'` must be the very first line of the file. The stylesheet import can live in this component; Next.js bundles it for every page that uses the checkout.

## Step 3: Render it from a Server Component

Your checkout page can stay a Server Component. It loads the order on the server, where the price is trustworthy, and hands only plain data to the widget:

```jsx title="app/checkout/[orderId]/page.jsx"
import { Suspense } from 'react'
import StablePayCheckout from '@/app/components/StablePayCheckout'
import { getOrder } from '@/lib/orders'

export default function CheckoutPage({ params }) {
  return (
    <main>
      <Suspense fallback={<p>Loading your order…</p>}>
        <OrderCheckout params={params} />
      </Suspense>
    </main>
  )
}

async function OrderCheckout({ params }) {
  const { orderId } = await params
  const order = await getOrder(orderId)

  return (
    <>
      <h1>Pay for order {order.id}</h1>
      <p>Total: {order.amount} SC</p>
      <StablePayCheckout
        order={{
          id: order.id,
          amount: Number(order.amount),
          network: 'sepolia',
          receivingAddress: process.env.MERCHANT_ADDRESS,
        }}
      />
    </>
  )
}
```

- `getOrder` is your own data access (a database query).
- `process.env.MERCHANT_ADDRESS` is read on the server, so it doesn't need a `NEXT_PUBLIC_` prefix.
- The `<Suspense>` boundary lets Next.js stream the order in. Recent Next.js versions with Cache Components enabled refuse to build a page that awaits `params` or a database outside one.

> [!WARNING]
> Make sure `amount` reaches the widget as a **number**. Many database drivers return decimal columns as strings, and `StablePay.Config` rejects strings. That's why the page wraps it in `Number(…)`.

## Step 4: Verify in a Route Handler

Copy `verifyPayment.js` from [Verifying payments](./08-verify-payments.md) into `lib/verifyPayment.js`. Then:

```js title="app/api/orders/[id]/confirm/route.js"
import { verifyPayment } from '@/lib/verifyPayment'
import { getOrder, claimTxHash, releaseTxHash, markOrder } from '@/lib/orders'

export async function POST(request, { params }) {
  const { id } = await params
  const order = await getOrder(id)
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 })
  if (order.status === 'paid') return Response.json(order)

  const { txHash } = await request.json()
  if (!/^0x[0-9a-fA-F]{64}$/.test(txHash ?? '')) {
    return Response.json({ error: 'Invalid transaction hash' }, { status: 400 })
  }

  const claimed = await claimTxHash(txHash.toLowerCase(), order.id)
  if (!claimed) {
    return Response.json({ error: 'This transaction already paid for another order' }, { status: 409 })
  }

  const result = await verifyPayment({
    txHash,
    merchantAddress: process.env.MERCHANT_ADDRESS,
    expectedAmount: order.amount,
  })

  if (result.status === 'pending') return Response.json({ status: 'pending' }, { status: 202 })
  if (result.status === 'failed') {
    await releaseTxHash(txHash.toLowerCase())
    return Response.json({ error: 'The transaction reverted' }, { status: 422 })
  }

  const updated = await markOrder(order.id, {
    status: result.status,
    txHash: txHash.toLowerCase(),
    receivedBaseUnits: result.received.toString(),
  })
  return Response.json(updated)
}
```

`claimTxHash` should insert the hash into a column with a **unique constraint** and return `false` if the hash belongs to a different order. That one database rule is what makes the endpoint safe against replayed hashes.

> [!NOTE]
> `bigint` values can't go through `JSON.stringify`. Convert them with `.toString()` (as above) or `formatUnits(value, 18)` before you return them.

## Static exports

If your site uses `output: 'export'`, there is no Next.js server to run Route Handlers. The widget itself works fine in a static export. Put the confirm endpoint on any backend you already have (a serverless function works well), and point the widget's `fetch` at it.

## Recap

- The widget lives in a `'use client'` component; import its stylesheet there.
- Server Components load the order and pass plain, numeric data to the widget.
- A Route Handler verifies the transaction hash on-chain, with a unique hash per order.
