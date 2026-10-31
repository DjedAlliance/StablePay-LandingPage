---
title: Widget API reference
description: Every export of stablepay-sdk, with props, options, return values and the exact shape of the payment object.
section: Reference
---

# Widget API reference

Everything `stablepay-sdk` exports. Most stores only ever use the first three: `Config`, `NetworkSelector` and `Widget`.

```js
import StablePay from 'stablepay-sdk'
import 'stablepay-sdk/dist/esm/styles.css'

// or, tree-shakeable named imports:
import { Config, NetworkSelector, Widget } from 'stablepay-sdk'
```

| Export | Kind | Use it for |
|---|---|---|
| [`Config`](#stablepayconfig) | class | Your receiving address and prices |
| [`NetworkSelector`](#stablepaynetworkselector) | class | The networks a customer may pay on |
| [`Widget`](#stablepaywidget) | React component | The complete checkout |
| [`Transaction`](#stablepaytransaction) | class | Headless checkouts |
| [`TectonicAdapter`](#stablepaytectonicadapter) | class | Direct protocol reads (tests, dashboards) |
| [`networksConfig`](#stablepaynetworksconfig) | object | The network registry |
| `PayButton`, `Dialog`, `NetworkDropdown` | React components | Building blocks used by `Widget` |

---

## `StablePay.Config`

```js
new StablePay.Config({ receivingAddress, amounts, blacklist })
```

| Option | Type | Required | Description |
|---|---|---|---|
| `receivingAddress` | `string` | **yes** | The address that receives every payment |
| `amounts` | `{ [networkKey]: { stablecoin: number } }` | yes, in practice | The price in SC, per network. Example: `{ sepolia: { stablecoin: 12 } }` |
| `blacklist` | `number[]` | no | Chain IDs to hide from the network list |

The constructor **validates immediately** and throws:

| Error | Cause |
|---|---|
| `Receiving address is required` | `receivingAddress` missing or empty |
| `Invalid network: <key>` | A key in `amounts` is not in [`networksConfig`](#stablepaynetworksconfig) |
| `Invalid stablecoin amount for network <key>` | `stablecoin` is missing, not a `number`, or `≤ 0` |

> [!WARNING]
> `stablecoin` must be a JavaScript **number**. `'12'` (a string) is rejected. Fractions are fine (`12.5`), but keep them to the precision you mean: the SDK converts the number's decimal representation exactly.

Methods: `getReceivingAddress()`, `getBlacklist()`, `getTokenAmount(networkKey)`.

---

## `StablePay.NetworkSelector`

```js
const networkSelector = new StablePay.NetworkSelector(config)
```

Holds the networks a customer may choose (every registry entry not in `blacklist`) and remembers the current choice. Pass the **same instance** to the widget for the life of a checkout; in React, create it inside `useMemo`.

| Member | Description |
|---|---|
| `availableNetworks` | `{ [networkKey]: networkConfig }` after the blacklist |
| `selectedNetwork` | The chosen key, or `null` |
| `selectNetwork(key)` | Selects a network (`null` resets). Returns `true` on success |
| `getSelectedNetworkConfig()` | The chosen network's config, or `null` |
| `getReceivingAddress()` | From the `Config` |
| `getTokenAmount()` | The SC price for the selected network |

---

## `<StablePay.Widget>`

```jsx
<StablePay.Widget
  networkSelector={networkSelector}
  buttonSize="medium"
  onTransactionComplete={(payment) => {}}
  onTransactionUnderpaid={(payment) => {}}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `networkSelector` | `NetworkSelector` | required | From `new StablePay.NetworkSelector(config)` |
| `buttonSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the button and the dialog |
| `onTransactionComplete` | `(payment) => void` | none | Called after a confirmed payment that delivered at least the invoiced SC |
| `onTransactionUnderpaid` | `(payment) => void` | none | Called after a confirmed ETH payment that minted **less** than the invoice |
| `onSuccess` | `(payment) => void` | none | Older name for `onTransactionComplete`, used only if that prop is absent |

The widget renders the **Pay with StablePay** button. Clicking it opens the dialog. Closing the dialog resets the customer's selections. The widget never calls your callbacks for rejected, failed or reverted transactions; it shows the error to the customer instead.

### The payment object

`onTransactionComplete` receives:

| Field | Type | Example | Meaning |
|---|---|---|---|
| `txHash` | `string` | `'0x86d6…0587'` | The payment transaction. **Send this to your server.** |
| `network` | `string` | `'sepolia'` | Network key |
| `token` | `'stablecoin' \| 'native'` | `'native'` | What the customer chose to pay with |
| `amount` | `string \| number` | `'0.00536048'` | What the **customer paid**, in `tokenSymbol` |
| `tokenSymbol` | `string` | `'ETH'` | Currency of `amount` |
| `amountReceived` | `number` | `12` | What **you** were invoiced and received, in SC |
| `receivedSymbol` | `string` | `'SC'` | Always the stablecoin symbol |
| `receivingAddress` | `string` | `'0x5aF3…c9E1'` | Where the SC went |

> [!NOTE]
> On the ETH path, `amount` is the ETH paid and `amountReceived` is the SC invoice. On the SC path they are the same number. Reconcile your books against `amountReceived`, and better still against what your server measured on-chain.

`onTransactionUnderpaid` receives the same fields, except:

| Field | Meaning |
|---|---|
| `amountInvoiced` | What you asked for, in SC |
| `amountReceived` | What Tectonic actually minted to you, in SC (a string) |
| `shortfall` | `amountInvoiced − amountReceived`, in SC (a string) |

---

## `StablePay.Transaction`

The widget's engine, for [headless checkouts](./11-customizing.md#level-3-headless).

```js
const transaction = new StablePay.Transaction(StablePay.networksConfig.sepolia)
await transaction.init()
```

| Method | Returns | Description |
|---|---|---|
| `init()` | `Promise` | Reads protocol parameters. Call once before anything else |
| `quoteNativePayment(amountSC)` | `Promise<Quote>` | ETH needed for the merchant to receive `amountSC` (pass a decimal **string**, such as `'12'`) |
| `handleTradeDataBuySc(amountSC)` | `Promise<string>` | Same quote, as a display string only |
| `buyStablecoins(payer, receiver, value)` | `Promise<Tx>` | Builds the `mint(receiver)` transaction. `value` must be `quote.requiredBC` (a `bigint`) |
| `buildTransferTx({ from, to, amount })` | `Tx` | Builds an SC `transfer`. `amount` is a `bigint` in base units |
| `verifyNativePayment({ receipt, receiver, expectedSC })` | `Check` | Sums `Minted` events to `receiver` and compares with `expectedSC` |
| `getWarnings()` | `Promise<Warning[]>` | Reserve-health warnings (empty when healthy). Never throws |
| `getStablecoinAddress()` | `string` | The SC token address (the Tectonic contract) |
| `getDecimals()` | `number` | SC decimals (18) |
| `getBlockchainDetails()` | `object` | Addresses, decimals and symbol, for diagnostics |

**Types**

```ts
type Quote = {
  amountSC: bigint             // invoice, base units
  requiredBC: bigint           // exact wei to send
  requiredBCFormatted: string  // for display, 8 decimals
  scPrice: bigint              // wei per 1 SC (oracle)
}

type Tx = { to: string; from: string; value: bigint; data: string; gas?: bigint }

type Check = {
  ok: boolean
  minted: bigint
  expected: bigint
  shortfall: bigint
  mintedFormatted: string
  shortfallFormatted: string
}

type Warning = { level: 'info' | 'warning'; message: string }
```

`buyStablecoins` estimates gas and pads it by 50%. If estimation fails while Tectonic is below its critical reserve ratio, it throws `Tectonic: this payment cannot go through right now…` rather than asking the customer to sign a transaction that would revert.

---

## `StablePay.TectonicAdapter`

The thin layer between `Transaction` and the [Tectonic SDK](./13-tectonic-sdk.md). Most code never needs it; it is exported for tests and dashboards.

| Method | Description |
|---|---|
| `new TectonicAdapter(networkConfig)` | Throws if `tectonicAddress` is missing or the zero address |
| `init()` | Reads and caches protocol parameters |
| `getEffectiveBalance(account)` | `{ raw, effective, formatted }`: the balance before and after accrued stability fees |
| `getWarnings()` | As above |
| `quoteNativePayment`, `buildMintTx`, `buildTransferTx`, `verifyNativePayment`, `getDetails` | Used by `Transaction` |

---

## `StablePay.networksConfig`

The registry of supported networks:

```js
{
  sepolia: {
    uri: 'https://ethereum-sepolia-rpc.publicnode.com',
    chainId: 11155111,
    tectonicAddress: '0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1',
    tokens: {
      stablecoin: { symbol: 'SC', address: '0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1', decimals: 18, isDirectTransfer: true },
      native: { symbol: 'ETH', decimals: 18, isNative: true },
    },
  },
}
```

The keys (`sepolia`) are what you use in `Config.amounts`. `tokens.stablecoin.address` always equals `tectonicAddress`, because the Tectonic contract is the SC token.

## Package details

| | |
|---|---|
| Bundles | ES module (`dist/esm/index.js`) and UMD (`dist/umd/index.js`, global `StablePay`) |
| Stylesheet | `stablepay-sdk/dist/esm/styles.css` |
| Runtime peers | `react`, `react-dom`, `viem` (resolved from your app) |
| Wallets | Any EIP-1193 wallet injected as `window.ethereum` |
