---
title: Getting paid
description: What to do after the stablecoins land. Checking your real balance, redeeming SC for ETH, issuing refunds, and keeping your books straight.
section: Learn
---

# Getting paid

A payment is confirmed and SC is sitting at your receiving address. Now what? This page is for the merchant side of the counter: seeing what you hold, turning it into ETH when you want to, refunding customers, and recording everything properly.

## You will learn

- How to see your *real* SC balance, net of stability fees
- How to redeem SC for ETH, from a browser or from code
- How to issue a refund
- Which on-chain events to record for clean accounting

## Where your money is

Your money is at your **receiving address**, the one you put in `StablePay.Config`. There is no StablePay balance and nothing to withdraw. Add SC to your wallet to see it:

| Field | Value (Sepolia) |
|---|---|
| Token address | `0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1` |
| Symbol | `SC` |
| Decimals | `18` |

> [!TIP]
> Use a **dedicated** receiving address for your store, not your personal wallet. Your books stay clean, every incoming SC transfer is a sale, and you can protect it with a hardware wallet or a multisig without changing how you shop personally.

## Your real balance

Most of the time, the number in your wallet is exactly right. But while Tectonic's reserve ratio is at or below its safe threshold, a stability fee accrues on every SC balance and is only *burned* the next time your SC moves. Until then, `balanceOf` slightly overstates what you hold. The contract tells you the true figure:

**In the browser:** open the [Tectonic contract on Etherscan](https://sepolia.etherscan.io/address/0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1#readContract), go to **Read Contract**, and call `balanceOfAfterStabilityFee` with your address. The answer is in base units: divide by 10^18.

**In code**, with the Tectonic SDK that ships alongside StablePay:

```js title="balance.mjs"
import { TectonicClient, fromBaseUnits } from 'tectonic-sdk'

const tectonic = new TectonicClient({
  address: '0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
})
await tectonic.init()

const { raw, effective } = await tectonic.getBalance('0xYourReceivingAddress')
console.log('wallet shows :', fromBaseUnits(raw, 18, 6), 'SC')
console.log('you really own:', fromBaseUnits(effective, 18, 6), 'SC')
```

## What you can do with SC

### Hold it

SC tracks the dollar, so holding it is like keeping dollars in a drawer, with Tectonic's weather (see [Meet Tectonic](./05-tectonic.md)): a small daily fee while reserves are low, and the possibility of a triggered redemption to ETH if they become critical.

### Spend it

SC is a standard ERC-20 token. You can pay suppliers, staff or partners in SC from any wallet, and they can accept it with StablePay too.

### Redeem it for ETH

Any SC holder can hand SC back to Tectonic and receive ETH at the current redemption price, minus the protocol fee (0.2% on Sepolia today).

**From the browser:**

1. Open the [Tectonic contract on Etherscan](https://sepolia.etherscan.io/address/0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1#writeContract) and go to **Write Contract**.
2. Click **Connect to Web3** and connect your receiving wallet.
3. Find `redeem`. Enter:
   - `amountSC`: the amount **in base units**. For 10 SC type `10000000000000000000` (10 followed by 18 zeros).
   - `receiver`: the address that should receive the ETH (usually your own).
4. Click **Write** and confirm in your wallet.

> [!WARNING]
> Etherscan does not convert decimals for you. Typing `10` redeems 10 *base units*, which is 0.00000000000000001 SC. Count your zeros, or use the SDK below.

**From code**, preview the payout, then build the transaction for your wallet to sign:

```js title="redeem.mjs"
const quote = await tectonic.quoteRedeem('10')        // 10 SC, as a decimal string
console.log('you will receive', quote.payoutBCFormatted, 'ETH')

const tx = tectonic.buildRedeemTx({
  from: '0xYourReceivingAddress',
  amountSC: quote.amountSC,                           // bigint, base units
})
// Send `tx` with your wallet client, e.g. viem's walletClient.sendTransaction(tx)
```

## Refunds

Payments are final on-chain, so a refund is a new payment in the other direction. The customer's address is the `from` of their payment transaction (visible on Etherscan, or in the receipt your server fetched while verifying).

- **They paid in SC:** send the same SC amount back with a normal token transfer from your wallet.
- **They paid in ETH:** you received SC, not ETH. Refund in SC (simplest, and exactly the invoice value), or redeem SC and send ETH if your policy promises a refund in the original currency. Decide this policy up front and write it on your checkout page.

> [!NOTE]
> Refund to the address that paid, not to an address someone types into a support email. Anyone can claim to be a customer; only the paying address is on-chain evidence.

## Keeping your books

Everything that happens to your SC is an event on the Tectonic contract. These are the ones worth recording:

| You see | It means |
|---|---|
| `Transfer(from: customer, to: you, value)` | A customer paid you in SC |
| `Transfer(from: 0x0000…0000, to: you, value)` together with `Minted(minter, receiver: you, amountSC, amountBC)` | A customer paid in ETH and Tectonic minted SC to you |
| `Transfer(from: you, to: 0x0000…0000, value)` with `ChargedStabilityFee(holder: you, feeAmount)` | A stability fee was burned from your balance |
| `Redeemed(redeemer: you, receiver: you, amountSC, amountBC)` inside a `ForcedRedemptions` transaction you did not send | A triggered redemption converted your SC to ETH |

For each sale, store at least the **order ID**, **transaction hash**, **SC received**, **block number** and **timestamp**. Your server already reads most of this while [verifying the payment](./08-verify-payments.md).

## Recap

- Your SC sits at your receiving address; add the token to your wallet to see it.
- `balanceOfAfterStabilityFee` gives your true balance while fees accrue.
- Redeem SC for ETH on Etherscan (mind the 18 decimals) or with `quoteRedeem` + `buildRedeemTx`.
- Refunds are new payments back to the paying address.
- Record Transfer, Minted, ChargedStabilityFee and Redeemed events for clean books.
