---
title: Tectonic SDK reference
description: The JavaScript library StablePay uses to talk to Tectonic. Read prices and reserve health, quote mints and redemptions, build transactions, and check receipts.
section: Reference
---

# Tectonic SDK reference

`tectonic-sdk` is a small JavaScript library for one deployed Tectonic contract. StablePay's widget is built on it, and you can use it directly for dashboards, accounting jobs, redemption scripts or tests. It depends only on [viem](https://viem.sh).

```js
import { TectonicClient, fromBaseUnits, RESERVE_HEALTH } from 'tectonic-sdk'
```

It lives in the `tectonic-sdk` folder of the StablePay repository. Install it the way the [tutorial](./07-integration-guide.md#step-3-install-stablepay) installs it: `npm install --install-links ../StablePay/tectonic-sdk`.

> [!NOTE]
> **Units.** Every amount the SDK returns is a `bigint` in **base units** (1 SC = `10n ** 18n`, 1 ETH = `10n ** 18n` wei). Inputs accept a decimal **string** (`'12.5'`), a safe-integer **number** (`12`), or a `bigint` that is already in base units. Fractional numbers like `12.5` are rejected on purpose, because they may already have been rounded by floating point. Fees and ratios are scaled by `D = 10n ** 18n`, so a ratio of `1.5` is `1500000000000000000n`.

## `TectonicClient`

```js
const tectonic = new TectonicClient({
  address: '0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
})
await tectonic.init()
```

| Option | Type | Description |
|---|---|---|
| `address` | `string` | The Tectonic contract (which is also the SC token). Required |
| `rpcUrl` | `string` | RPC endpoint. Required unless `publicClient` is given |
| `chain` | viem `Chain` | Optional chain object |
| `publicClient` | viem `PublicClient` | Optional pre-built client, used instead of `rpcUrl` |

### `init()`

Reads and caches the contract's fixed parameters, and returns them:

```js
{
  fee: 1000000000000000n,                       // 0.1%
  devFee: 1000000000000000n,                    // 0.1%, re-read on every quote
  decimals: 18,
  superCriticalReserveRatio: 1050000000000000000n,
  criticalReserveRatio: 1100000000000000000n,
  safeReserveRatio: 1500000000000000000n,
  equityCoin: '0x22B2f0CAf598B9E5FCf888fB89eD50c2F4735F1a',
  oracle: '0x4f007748666F2b941AA014E5a2a41841e681A32b',
  symbol: 'SC',
}
```

Prices and ratios are deliberately **not** cached: they change every block. If the address isn't a Tectonic contract on that chain, `init()` throws `Failed to read Tectonic contract at …` with the likely causes.

### Reading state

| Method | Returns |
|---|---|
| `scPriceMint()` | `bigint`: wei per 1 SC when minting (the oracle price) |
| `scPriceRedeem()` | `bigint`: wei per 1 SC when redeeming (oracle price, or the fair-share floor) |
| `getState()` | `{ reserve, liabilities, equity, ratio, totalSupply }` |
| `getReserveHealth()` | `{ health, ratio, dailyStabilityFeeRate }`, where `health` is one of `RESERVE_HEALTH` |
| `getBalance(account)` | `{ raw, effective }`: `balanceOf`, and the balance after accrued stability fees |

```js
const { health, ratio } = await tectonic.getReserveHealth()
if (health === RESERVE_HEALTH.CRITICAL) {
  console.warn('Triggered redemptions are active at ratio', fromBaseUnits(ratio, 18, 4))
}
```

### Quotes

| Method | Answers | Returns |
|---|---|---|
| `quoteMint(amountSC)` | How much ETH mints `amountSC`? | `{ amountSC, amountSCFormatted, requiredBC, requiredBCFormatted, scPriceMint }` |
| `quotePayment(amountBC)` | How much SC does `amountBC` ETH mint? | `{ amountBC, amountSC, amountSCFormatted }` |
| `quoteRedeem(amountSC)` | How much ETH does redeeming `amountSC` pay? | `{ amountSC, payoutBC, payoutBCFormatted, scPriceRedeem }` |

```js
const quote = await tectonic.quoteMint('12')
quote.requiredBC           // 5360487671942010n (exact wei to send)
quote.requiredBCFormatted  // '0.00536048'
```

`quoteMint` rounds **up** and adds one wei, so the receiver is never short. See [How an ETH quote is calculated](./04-how-a-payment-works.md#how-an-eth-quote-is-calculated).

### Building transactions

These return plain transaction objects (`{ to, from, value, data, gas? }`) for any wallet to send, for example with viem's `walletClient.sendTransaction({ ...tx, account })`.

| Method | Contract call |
|---|---|
| `buildMintTx({ payer, receiver, value })` | `mint(receiver)` with `value` wei. Estimates gas ×1.5; async |
| `buildTransferTx({ from, to, amount })` | `transfer(to, amount)` on the SC token |
| `buildRedeemTx({ from, receiver, amountSC })` | `redeem(amountSC, receiver ?? from)` |

`buildMintTx` throws a clear error instead of returning a transaction when gas estimation fails while the protocol is below its critical reserve ratio, because that mint would revert.

### Checking receipts

| Method | Returns |
|---|---|
| `mintedToReceiver(receipt, receiver)` | `bigint`: total SC minted to `receiver` in this receipt (from `Minted` events) |
| `verifyMint({ receipt, receiver, expectedSC })` | `{ ok, minted, expected, shortfall }` |

## Pricing functions

Pure arithmetic with no network access. They mirror the contract operation by operation, which makes them ideal for tests and for showing prices without an RPC round-trip once you have the inputs.

| Function | Description |
|---|---|
| `stablecoinsForPayment(amountBC, scPriceMint, fees)` | SC minted by a payment, exactly as the contract computes it |
| `requiredPaymentForStablecoins(amountSC, scPriceMint, fees)` | Inverse: ETH needed, rounded up, plus 1 wei |
| `payoutForRedemption(amountSC, scPriceRedeem, fees)` | ETH paid out by a redemption, after fees |
| `netFactor({ fee, devFee })` | `D − fee − devFee`; throws if fees would consume the whole payment |
| `totalFeePercent({ fee, devFee })` | Display string, such as `'0.20'` |
| `toBaseUnits(value, decimals)` | `'1.5'` → `1500000000000000000n`, with no floating point |
| `fromBaseUnits(value, decimals, displayDecimals?)` | `1500000000000000000n` → `'1.5'` |
| `ceilDiv(a, b)` | Ceiling division for positive bigints |

`fees` is `{ fee, devFee }` as returned by `init()`.

## Constants

| Constant | Value | Meaning |
|---|---|---|
| `D` | `10n ** 18n` | Fixed-point denominator for fees and ratios |
| `BC_DECIMALS`, `SC_DECIMALS` | `18` | Decimals of ETH and SC |
| `ROUNDING_SAFETY_WEI` | `1n` | Added to every mint quote |
| `GAS_LIMIT_MULTIPLIER_PERCENT` | `150n` | Gas padding for mints |
| `RESERVE_HEALTH` | `HEALTHY`, `FEE_ACCRUING`, `CRITICAL` | Health bands: above safe, between critical and safe, below critical |
| `TECTONIC_ABI` | array | The contract ABI, as a JS module |

## Scripts

From the `tectonic-sdk` folder:

```bash title="terminal"
npm test        # unit tests for the pricing maths and the client
npm run smoke   # read-only checks against the live Sepolia deployment
```

`npm run smoke` reads the deployment's parameters and state, takes a quote, and confirms that the quote mints at least the invoiced amount. Pass `--mint` with a funded `PRIVATE_KEY` in the environment to also send a real test mint.
