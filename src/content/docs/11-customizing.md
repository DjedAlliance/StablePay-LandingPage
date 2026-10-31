---
title: Customizing the checkout
description: Size the button, restrict networks, restyle the dialog, or skip the widget entirely and build your own checkout UI on StablePay's headless API.
section: Guides
---

# Customizing the checkout

The default widget is designed to be dropped in and forgotten. When you need it to fit your brand or your flow more closely, you have three levels of control: **props**, **styles**, and **going headless**.

## You will learn

- How to size the button and choose which networks appear
- How to restyle the dialog safely
- How to build a fully custom checkout with `StablePay.Transaction`

## Level 1: Props

### Button size

```jsx
<StablePay.Widget networkSelector={networkSelector} buttonSize="large" />
```

| `buttonSize` | Button | Dialog |
|---|---|---|
| `small` | 200 × 50 px | compact |
| `medium` (default) | 250 × 60 px | standard |
| `large` | 300 × 70 px | roomy |

### Which networks appear

The dialog lists every network in the SDK's registry that is not on your **blacklist**. Blacklist networks by chain ID. For example, once a mainnet is available, this hides the Sepolia testnet from real customers:

```js
const config = new StablePay.Config({
  receivingAddress: '0xYourReceivingAddress',
  amounts: { sepolia: { stablecoin: 12 } },
  blacklist: [11155111],
})
```

Today the registry contains only Sepolia, so the blacklist matters once mainnet networks are added. See [Networks & contracts](./14-networks.md).

> [!WARNING]
> Give a price in `amounts` for **every** network you don't blacklist. A network without a price still appears in the list, and the widget would offer to charge `0`.

## Level 2: Styles

The widget's stylesheet uses CSS Modules, so its class names carry a generated suffix, like `PricingCard_pricingCard__LrWb9`. The prefix before the double underscore is stable, so you can target it with an attribute selector, scoped under your own wrapper:

```css title="checkout.css"
.my-checkout [class*="main_stablePayButton__"] {
  border-radius: 999px;
  border-color: #235efe;
}

.my-checkout [class*="PricingCard_pricingCard__"] {
  border-radius: 16px;
  font-family: 'Inter', system-ui, sans-serif;
}
```

```jsx
<div className="my-checkout">
  <StablePay.Widget networkSelector={networkSelector} />
</div>
```

Useful prefixes:

| Prefix | Element |
|---|---|
| `main_stablePayButton__` | The **Pay with StablePay** button |
| `PricingCard_dialogOverlay__` | The dimmed full-screen backdrop (`z-index: 1000`) |
| `PricingCard_pricingCard__` | The dialog card |
| `PricingCard_selectField__` | The network and token dropdowns |
| `PricingCard_transactionReview__` | The review area with amounts |
| `PricingCard_walletButton__` | Connect / Pay buttons |
| `PricingCard_messageBox__` | Status and warning messages |

> [!WARNING]
> Class prefixes are internal details and may change between releases. Keep overrides small, cosmetic, and scoped under your own wrapper, and re-check them when you upgrade.

> [!TIP]
> If your site has a sticky header or a cookie banner with a `z-index` above 1000, the dialog's backdrop may render underneath it. Lower your element's `z-index`, or raise the overlay's with the selector above.

## Level 3: Headless

Want your own checkout UI entirely, for example a one-step "Pay 12 SC" button inside your existing cart? The widget's engine is exported as `StablePay.Transaction`. It does the protocol work (quoting, building transactions, checking the minted amount) and leaves the UI and the wallet to you.

```js title="headlessCheckout.js"
import StablePay from 'stablepay-sdk'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { sepolia } from 'viem/chains'

const MERCHANT = '0xYourReceivingAddress'
const network = StablePay.networksConfig.sepolia

export async function payWithEth(invoiceSC) {
  const [payer] = await window.ethereum.request({ method: 'eth_requestAccounts' })
  const wallet = createWalletClient({ chain: sepolia, transport: custom(window.ethereum) })
  const reader = createPublicClient({ chain: sepolia, transport: http(network.uri) })

  const transaction = new StablePay.Transaction(network)
  await transaction.init()

  const warnings = await transaction.getWarnings()
  warnings.forEach((warning) => console.warn(warning.message))

  const quote = await transaction.quoteNativePayment(String(invoiceSC))
  const tx = await transaction.buyStablecoins(payer, MERCHANT, quote.requiredBC)

  const hash = await wallet.sendTransaction({ ...tx, account: payer })
  const receipt = await reader.waitForTransactionReceipt({ hash })

  const check = transaction.verifyNativePayment({
    receipt,
    receiver: MERCHANT,
    expectedSC: quote.amountSC,
  })
  return { hash, paid: receipt.status === 'success' && check.ok, check }
}
```

And the SC path is just a token transfer:

```js
import { parseUnits } from 'viem'

const tx = transaction.buildTransferTx({
  from: payer,
  to: MERCHANT,
  amount: parseUnits(String(invoiceSC), transaction.getDecimals()),
})
const hash = await wallet.sendTransaction({ ...tx, account: payer })
```

Things the widget did for you that you now own:

- [ ] Switching the wallet to the right chain (`wallet_switchEthereumChain`, then `wallet_addEthereumChain` if the wallet doesn't know it).
- [ ] Re-quoting immediately before signing. Never reuse an old `requiredBC`.
- [ ] Showing the customer both what they pay and what you receive.
- [ ] Showing Tectonic's reserve-health warnings.
- [ ] Turning wallet errors (such as code `4001`, the user rejected) into friendly messages.

> [!IMPORTANT]
> Headless or not, your **server** still verifies the transaction hash before fulfilling the order. See [Verifying payments](./08-verify-payments.md).

Full method signatures are in the [Widget API reference](./12-widget-api.md#stablepaytransaction).

## Recap

- `buttonSize` and `blacklist` cover the common needs.
- Restyle with scoped attribute selectors on stable class prefixes, and keep it light.
- `StablePay.Transaction` lets you build any checkout UI while keeping StablePay's quoting and safety checks.
