---
title: Verifying payments
description: The one rule that confirms any StablePay payment, with ready-to-use code for Node.js and Python, plus confirmations, replay protection and underpayments.
section: Guides
---

# Verifying payments

StablePay has no server, so it can't send you a webhook. It doesn't need to. The blockchain is a public, tamper-proof ledger, and your server can ask it directly whether a payment happened. This page gives you the rule, the code, and the edge cases.

## You will learn

- The single rule that confirms both kinds of StablePay payment
- Copy-paste verifiers for Node.js and Python
- How many confirmations to wait for
- How to stop one payment from settling two orders
- What to do when a payment arrives short

## Why the browser's word isn't enough

`onTransactionComplete` runs in your customer's browser. Anything in a browser can be faked: a visitor can call your "payment complete" code from the developer console with any transaction hash they like. So the callback's job is only to deliver the **transaction hash** to your server. Your server then answers the real question by itself.

> [!IMPORTANT]
> Fulfil orders from your **server's** verdict, never from the browser's callback.

## The rule

> **A payment of `N` SC to you is confirmed when a successful transaction contains SC `Transfer` events, emitted by the Tectonic contract, sending a total of at least `N` SC to your address.**

That one sentence covers both payment paths, because the Tectonic contract is the SC token:

| Customer paid with | Events in the receipt that matter |
|---|---|
| SC (direct transfer) | `Transfer(from: customer, to: you, value: N)` |
| ETH (minted for you) | `Transfer(from: 0x000…000, to: you, value: N)` alongside `Minted(…, receiver: you, amountSC: N, …)` |

You might also see `Transfer(from: someone, to: 0x000…000)` events. Those are stability fees being burned. They are not sent *to* you, so the rule ignores them automatically.

<details>
<summary><b>Deep dive:</b> Why sum the events instead of reading my balance?</summary>

Comparing your balance before and after looks tempting, but it's fragile. Other payments can land in the same block, a stability fee might be burned from your balance in the very same transaction, and a balance can't tell you *which* transaction paid. The Transfer events inside one receipt are precise: they belong to exactly one transaction, and they show exactly what that transaction sent to you.

</details>

## Node.js verifier

Uses [viem](https://viem.sh). Install it with `npm install viem`.

```js title="verifyPayment.js"
import {
  createPublicClient,
  http,
  parseAbi,
  parseEventLogs,
  parseUnits,
  isAddressEqual,
} from 'viem'
import { sepolia } from 'viem/chains'

const TECTONIC_SC = '0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1'
const MIN_CONFIRMATIONS = 2n

const client = createPublicClient({
  chain: sepolia,
  transport: http(process.env.RPC_URL ?? 'https://ethereum-sepolia-rpc.publicnode.com'),
})

const transferEvent = parseAbi([
  'event Transfer(address indexed from, address indexed to, uint256 value)',
])

export async function verifyPayment({ txHash, merchantAddress, expectedAmount }) {
  let receipt
  try {
    receipt = await client.getTransactionReceipt({ hash: txHash })
  } catch {
    return { status: 'pending', reason: 'Transaction not found or not mined yet' }
  }

  if (receipt.status !== 'success') {
    return { status: 'failed', reason: 'Transaction reverted' }
  }

  const latest = await client.getBlockNumber()
  const confirmations = latest - receipt.blockNumber + 1n
  if (confirmations < MIN_CONFIRMATIONS) {
    return { status: 'pending', reason: `${confirmations} of ${MIN_CONFIRMATIONS} confirmations` }
  }

  const received = parseEventLogs({ abi: transferEvent, logs: receipt.logs, eventName: 'Transfer' })
    .filter((log) => isAddressEqual(log.address, TECTONIC_SC))
    .filter((log) => isAddressEqual(log.args.to, merchantAddress))
    .reduce((sum, log) => sum + log.args.value, 0n)

  const expected = parseUnits(String(expectedAmount), 18)

  if (received < expected) {
    return { status: 'underpaid', received, expected, payer: receipt.from }
  }

  return { status: 'paid', received, expected, payer: receipt.from, blockNumber: receipt.blockNumber }
}
```

Use it like this:

```js
const result = await verifyPayment({
  txHash: '0x86d64bca473078f8bd26e0e139c90de3c6ac724a9f2ae1775f761c2e34f00587',
  merchantAddress: '0xYourReceivingAddress',
  expectedAmount: 5,
})
// → { status: 'paid', received: 5000000000000006740n, expected: 5000000000000000000n, … }
```

The four possible statuses:

| `status` | Meaning | What your server should do |
|---|---|---|
| `paid` | At least the expected SC reached you | Mark the order paid and fulfil it |
| `pending` | Not mined yet, or not enough confirmations | Answer "try again shortly" (HTTP 202) |
| `failed` | The transaction reverted; no money moved | Release the hash; the customer can pay again |
| `underpaid` | Some SC arrived, but less than expected | Record it, don't fulfil, follow your policy |

## Python verifier

No web3 library needed, just `requests` and the raw Ethereum JSON-RPC API. The same approach works from PHP, Ruby, Go or anything else that can send an HTTP POST.

```python title="verify_payment.py"
from decimal import Decimal

import requests

RPC_URL = "https://ethereum-sepolia-rpc.publicnode.com"
TECTONIC_SC = "0xea262fb18992dde398a5b6fa7a4f879ffb262ac1"
TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
MIN_CONFIRMATIONS = 2


def rpc(method, params):
    response = requests.post(RPC_URL, json={"jsonrpc": "2.0", "id": 1, "method": method, "params": params}, timeout=15)
    response.raise_for_status()
    body = response.json()
    if "error" in body:
        raise RuntimeError(body["error"])
    return body["result"]


def verify_payment(tx_hash, merchant_address, expected_amount):
    receipt = rpc("eth_getTransactionReceipt", [tx_hash])
    if receipt is None:
        return {"status": "pending", "reason": "Transaction not found or not mined yet"}
    if receipt["status"] != "0x1":
        return {"status": "failed", "reason": "Transaction reverted"}

    latest = int(rpc("eth_blockNumber", []), 16)
    confirmations = latest - int(receipt["blockNumber"], 16) + 1
    if confirmations < MIN_CONFIRMATIONS:
        return {"status": "pending", "reason": f"{confirmations} of {MIN_CONFIRMATIONS} confirmations"}

    merchant_topic = "0x" + merchant_address.lower().removeprefix("0x").rjust(64, "0")
    received = sum(
        int(log["data"], 16)
        for log in receipt["logs"]
        if log["address"].lower() == TECTONIC_SC
        and len(log["topics"]) == 3
        and log["topics"][0] == TRANSFER_TOPIC
        and log["topics"][2].lower() == merchant_topic
    )

    expected = int(Decimal(str(expected_amount)) * 10**18)
    status = "paid" if received >= expected else "underpaid"
    return {"status": status, "received": received, "expected": expected, "payer": receipt["from"]}
```

`TRANSFER_TOPIC` is the fingerprint of the standard ERC-20 `Transfer(address,address,uint256)` event. Its second indexed topic (`topics[2]`) is the recipient, padded to 32 bytes, and `data` holds the amount.

## How many confirmations?

A transaction's **confirmations** are the number of blocks from its block up to the newest one, inclusive. One confirmation means it's in the latest block. Each block after that makes it harder to undo.

| Order value | Suggested `MIN_CONFIRMATIONS` |
|---|---|
| Testnet, demos | 1 to 2 |
| Everyday goods | 2 to 3 |
| High value, or irreversible digital delivery | wait for the block to be **finalized** (about 15 minutes on Ethereum) |

To wait for finality with viem, compare against the finalized block instead of the latest: `client.getBlock({ blockTag: 'finalized' })`.

## One payment, one order

A real payment's hash is public the moment it's broadcast. Without protection, someone could submit *another customer's* hash against their own order. The fix is simple and absolute: **each transaction hash may settle at most one order**.

- Store the hash on the order, and give that column a **unique constraint** in your database.
- Claim the hash *before* you verify, so two simultaneous requests can't both succeed. Release it only if the transaction turns out to have reverted.

```sql
ALTER TABLE orders ADD COLUMN payment_tx_hash TEXT UNIQUE;
```

<details>
<summary><b>Deep dive:</b> Extra hardening for high-value stores</summary>

- **Unique amounts.** Add a tiny per-order fraction to the price, such as `49.000317` SC instead of `49`. Now even a hash submitted against the wrong order fails the amount check. `StablePay.Config` accepts decimal numbers, and the SDK converts them exactly.
- **Payer binding.** Record which wallet address the customer connected, and require `receipt.from` to match. It stops hash-swapping between customers, though shoppers who switch wallets mid-checkout will need support.
- **Expiry.** Give orders a payment window (say 30 minutes). Payments for expired orders go to manual review instead of auto-fulfilment, which also protects you if your prices change.

</details>

## Handling underpayments

On the ETH path, the price can move in the seconds between the widget's final quote and the moment the transaction executes. The widget re-quotes right before signing and rounds up, so this is rare, but it can happen. The widget detects it and calls `onTransactionUnderpaid` with the shortfall, and your verifier returns `underpaid`.

Decide your policy in advance. Common choices:

1. **Tolerance.** Accept payments within a tiny tolerance (for example 0.5%) as paid, and absorb the difference as a cost of doing business. Implement it by lowering `expected` before comparing.
2. **Top-up.** Keep the order open, and ask the customer to pay the shortfall. Since the first payment is already recorded on the order, the second one can be added to it.
3. **Refund.** Return what arrived to `receipt.from` and cancel the order.

## Watching your address instead

Polling per order is the simplest approach. If you'd rather reconcile in bulk (a nightly job, or a worker that runs every minute), ask the chain for every SC transfer to your address in a block range:

```js title="watchPayments.js"
import { createPublicClient, http, parseAbiItem, formatUnits } from 'viem'
import { sepolia } from 'viem/chains'

const TECTONIC_SC = '0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1'
const MERCHANT_ADDRESS = '0xYourReceivingAddress'
const transfer = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')

const client = createPublicClient({ chain: sepolia, transport: http('https://ethereum-sepolia-rpc.publicnode.com') })

const latest = await client.getBlockNumber()
const logs = await client.getLogs({
  address: TECTONIC_SC,
  event: transfer,
  args: { to: MERCHANT_ADDRESS },
  fromBlock: latest - 5000n,
  toBlock: latest,
})

for (const log of logs) {
  console.log(log.blockNumber, log.transactionHash, formatUnits(log.args.value, 18), 'SC from', log.args.from)
}
```

Match each log's `transactionHash` against orders awaiting payment. Store the last block you processed and continue from there next time. Most public RPC endpoints limit how many blocks one `getLogs` call may span, so scan in chunks of a few thousand blocks.

## Recap

- The rule: sum the SC `Transfer` events **from the Tectonic contract** **to your address** in a **successful** receipt.
- It works for both the SC path and the ETH path, in any language.
- Wait for enough confirmations for your order value.
- Each transaction hash settles at most one order: enforce it with a unique constraint.
- Decide your underpayment policy before you need it.
