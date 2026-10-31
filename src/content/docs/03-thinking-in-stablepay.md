---
title: Thinking in StablePay
description: The mental model that makes every integration decision obvious. Five ideas, one store, no jargon.
section: Get started
---

# Thinking in StablePay

If you have integrated a card processor before, some of your instincts will lead you astray here. Not because StablePay is complicated, but because there is *less* of it. This page walks through five ideas, using an imaginary store, that will make every later decision feel obvious.

## You will learn

- Why the browser can take the payment but must not *confirm* it
- Why your wallet address is your whole merchant account
- How prices, quotes and receipts relate to each other
- What changes when the money arrives as a stablecoin

Meet **Northwind Mugs**, a small online shop. Priya runs it. A customer, Sam, wants a blue mug for **12 dollars**.

## Idea 1: Your price is a stablecoin amount

Priya doesn't price the mug "in crypto". She prices it at **12 SC**. SC is Tectonic's stablecoin and it tracks the US dollar, so 12 SC is 12 dollars.

```js
amounts: { sepolia: { stablecoin: 12 } }
```

That number is the *only* price Priya ever writes down. If Sam pays with ETH, StablePay works out the ETH amount at the moment of payment. Priya never deals with exchange rates, and never reprices her catalogue when ETH moves.

> [!TIP]
> Think of the ETH amount as a **quote**, not a price. Prices live in your catalogue and don't move. Quotes live in the widget, are computed from the on-chain oracle, and are only valid for a short time. That is why the widget re-quotes right before Sam signs.

## Idea 2: Your address *is* your merchant account

To accept cards, Priya would fill in an application, wait for approval, and receive API keys. To accept StablePay, she needs a wallet address:

```js
receivingAddress: '0x5aF3...c9E1'
```

That's the whole onboarding. There is no StablePay account, no dashboard login, no approval step. Whoever controls that address controls the money, so Priya treats the wallet's recovery phrase the way she would treat the keys to the shop.

> [!WARNING]
> Double-check this address. A payment sent to a mistyped address cannot be recalled by anyone. Use an address you control, and test it with a small payment first (the [Quick start](./02-quick-start.md) is perfect for this).

## Idea 3: The widget is the cashier, the blockchain is the till

When Sam clicks **Pay with StablePay**, the widget acts like a cashier. It works out the amount, asks Sam's wallet to sign, waits for the transaction to confirm, and announces "paid!". The money itself never passes through the widget, through Priya's server, or through StablePay. It goes from Sam's wallet straight into the till: the blockchain.

```text
            ┌─────────── Sam's browser ───────────┐
Sam ──────▶ │  StablePay widget  ──▶  Sam's wallet │ ──▶ Tectonic contract ──▶ Priya's address
            └─────────────────────────────────────┘          (on-chain)
```

This is why StablePay has no outage that can stop Priya getting paid, and no chargebacks. Once the transaction is confirmed, it is final.

## Idea 4: The browser takes the payment, your server confirms it

This is the one idea people miss, so here it is in bold: **never ship an order just because the browser said "paid".**

The widget runs on Sam's computer. Sam (or anyone) can open the developer tools and call your "payment complete" code with a made-up transaction hash. So the widget's `onTransactionComplete` callback is a *hint*: "a payment probably happened, here is the transaction hash". Priya's server takes that hash and checks the blockchain itself:

1. Did this transaction succeed?
2. Did it send at least **12 SC** to **Priya's address**?
3. Has this transaction hash already been used for a different order?

Only if all three answers are right does the order move to "paid".

```js
onTransactionComplete={({ txHash }) => {
  // Not "mark as paid". Instead: "please go and check".
  fetch(`/api/orders/${orderId}/confirm`, {
    method: 'POST',
    body: JSON.stringify({ txHash }),
  })
}}
```

The check takes about twenty lines of code, and [Verifying payments](./08-verify-payments.md) gives you all twenty.

<details>
<summary><b>Deep dive:</b> Why doesn't StablePay send me a webhook?</summary>

A webhook needs a server that watches the blockchain and calls you. Somebody would have to run that server, keep it online, and you would have to trust it. That is exactly the middleman StablePay exists to remove.

The blockchain already *is* a shared, tamper-proof record of every payment. Your server can ask it directly, through any Ethereum RPC endpoint, whether a transaction paid you. Same answer, no middleman, nothing extra to trust.

If you would rather not run a check per order, you can also watch your address for incoming SC transfers and match them to orders. [Verifying payments](./08-verify-payments.md) covers both approaches.

</details>

## Idea 5: You are paid in a stablecoin, so learn its weather

When the payment lands, Priya holds 12 SC. Most of the time SC behaves like digital dollars sitting in a wallet. But SC is issued by Tectonic, a protocol with its own "weather", and two kinds of weather affect holders:

- **When reserves run low**, holders pay a small daily **stability fee**, so a held balance shrinks slowly until reserves recover.
- **When reserves run very low**, the protocol performs **triggered redemptions**: it converts some holders' SC back into ETH, at full value and with no penalty, to restore its health.

Neither is a bug; they are how Tectonic keeps the peg safe. The widget warns you on the checkout screen whenever either one is active. As a merchant, you decide whether to hold SC, spend it, or redeem it for ETH. [Getting paid](./06-getting-paid.md) explains the options, and [Meet Tectonic](./05-tectonic.md) lets you play with the numbers.

## Putting it together

Here is Priya's whole integration, in the shape every StablePay store ends up with:

| Where | What | Trusted? |
|---|---|---|
| Catalogue / database | `mug.price = 12` (SC) | ✅ yours |
| Checkout page | `<StablePay.Widget>` configured with Priya's address and 12 SC | ❌ runs on Sam's machine |
| `onTransactionComplete` | Sends the `txHash` to Priya's server | ❌ a hint, not proof |
| Priya's server | Reads the transaction from the chain and checks amount, recipient and uniqueness | ✅ yours |
| Order system | Marks the order paid and ships the mug | ✅ yours |

## Try it yourself

<details>
<summary><b>Challenge 1:</b> Sam's payment says "confirmed", but Priya's server says it found only 11.99 SC. What could have happened, and what should the store do?</summary>

The most likely story: Sam paid with ETH, and between the final quote and the moment the transaction was included in a block, the oracle price or the protocol fee moved slightly. The widget detects this case itself. It calls `onTransactionUnderpaid` instead of `onTransactionComplete`, and shows Sam a message asking him to contact the merchant.

The store should not mark the order as paid. It should record the payment, compute the shortfall, and either ask for the difference or decide to absorb a tiny gap as a business policy. See [Handling underpayments](./08-verify-payments.md#handling-underpayments).

</details>

<details>
<summary><b>Challenge 2:</b> A visitor posts to <code>/api/orders/42/confirm</code> with the transaction hash of somebody else's real payment to Priya. How does Priya's server avoid shipping two mugs?</summary>

Step 3 of the check: the server stores each transaction hash it has accepted, with a unique constraint, and refuses a hash that is already attached to another order. One payment can settle one order, never two.

</details>

## Recap

- Prices are fixed SC amounts. ETH amounts are short-lived quotes.
- Your receiving address is your entire merchant account. Guard its keys.
- The widget moves money from the customer's wallet to yours; nothing in between.
- The browser's "paid" is a hint. Your server confirms against the chain before fulfilling.
- SC has protocol "weather" (stability fees, triggered redemptions). Know it, and plan what you do with your balance.
