---
title: Welcome to StablePay
description: A checkout button that settles payments straight against Tectonic stablecoin contracts. No processor, no backend, no custody.
section: Get started
---

# Welcome to StablePay

StablePay is a checkout widget you drop into your store. Your customer clicks **Pay with StablePay**, signs **one** transaction in their wallet, and stablecoins land in **your** wallet. That is the whole product.

There is no StablePay account to open, no API key to guard, no server of ours sitting between you and your money. The widget talks directly to the [Tectonic](https://github.com/StabilityNexus/Tectonic-EVM-Contracts) stablecoin contracts from your customer's browser.

<!-- widget:checkout-preview -->

## You will learn

- What StablePay does, and what it deliberately does not do
- The two ways a customer can pay you
- Where Tectonic fits in
- Which page to read next, depending on who you are

## The idea in one sentence

**A checkout is just a transaction.**

With a card processor, "getting paid" is a long chain of promises: the processor authorises, settles days later, holds a reserve, and may reverse the payment weeks after the sale. With StablePay, the payment *is* the transaction your customer signs. Once it is confirmed on-chain, the stablecoins are in your wallet and nobody can pull them back.

```text
Card checkout:      customer → processor → acquirer → network → bank → you   (days)
StablePay checkout: customer ──────── one signed transaction ──────────→ you   (seconds)
```

## Two ways to pay, one way to get paid

Your prices are always in **stablecoins** (Tectonic's `SC`, which tracks the US dollar). Your customer can pay with either:

| The customer pays with | What happens on-chain | You receive |
|---|---|---|
| **SC** (the stablecoin) | A plain ERC-20 transfer from their wallet to yours | Exactly the invoice, in SC |
| **ETH** (the chain's native coin) | They send ETH to the Tectonic contract, which **mints** fresh SC straight to your address | Exactly the invoice, in SC |

That second row is the magic trick. Your customer can hold only ETH, and you still never touch a volatile asset: the conversion happens inside the same transaction they sign.

> [!NOTE]
> The widget works out the ETH price for you from Tectonic's on-chain oracle, rounds it up so you are never short, and re-checks it the instant before your customer signs.

## What StablePay is not

It helps to be precise about this, because it changes how you build your store:

- **Not a custodian.** StablePay never holds funds. There is nothing to withdraw.
- **Not a backend.** There is no StablePay server and no webhook. Your own server confirms payments by reading the blockchain, and we show you exactly how in [Verifying payments](./08-verify-payments.md).
- **Not a processor.** There are no chargebacks, and no fees going to StablePay. Tectonic itself charges a small protocol fee on minting (currently 0.2% in total), which the customer pays as part of the ETH price.

## Where Tectonic fits in

StablePay is the checkout. **Tectonic** is the money.

Tectonic is a decentralized stablecoin protocol by Stability Nexus. Its contract holds a reserve of ETH and issues `SC` against it at the price reported by a Chainlink oracle. It was designed so that a payment is never refused and the peg has an automatic way to recover. Two of its mechanisms, stability fees and triggered redemptions, matter to you as a merchant holding SC, and we explain both in plain language in [Meet Tectonic](./05-tectonic.md).

> [!IMPORTANT]
> Tectonic is currently live on the **Ethereum Sepolia testnet** and its contracts are pre-audit. Treat everything here as a pilot: integrate, test with testnet ETH, and keep an eye on the [networks page](./14-networks.md) for mainnet deployments.

## Where to go next

**I want to see it working in five minutes.**
Start with the [Quick start](./02-quick-start.md).

**I run a store and want to add StablePay to it.**
Follow the step-by-step [Tutorial: Add StablePay to your store](./07-integration-guide.md). It assumes nothing beyond "I can edit my website's code".

**I want to understand it before I build.**
Read [Thinking in StablePay](./03-thinking-in-stablepay.md), then [How a payment works](./04-how-a-payment-works.md) and [Meet Tectonic](./05-tectonic.md).

**I need the exact props and methods.**
Jump to the [Widget API reference](./12-widget-api.md).

## Recap

- StablePay is a checkout widget; the payment is a single on-chain transaction.
- You price in SC. Customers pay in SC or ETH; you always receive SC.
- There is no StablePay server or custody, so *your* server verifies payments on-chain.
- Tectonic is the stablecoin protocol underneath, live on Sepolia today.
