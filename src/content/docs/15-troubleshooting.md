---
title: Troubleshooting & FAQ
description: Every message the widget can show, what causes it, and how to fix it. Plus answers to the questions merchants ask most.
section: Reference
---

# Troubleshooting & FAQ

Find the message you're seeing, read the cause, apply the fix. Messages are quoted exactly as StablePay shows them.

## Installing and building

<details>
<summary><code>Cannot read properties of null (reading 'useState')</code> or "Invalid hook call"</summary>

**Cause:** your app and StablePay are using two different copies of React. This happens with React 19 apps, because StablePay's package asks for React 18.

**Fix:** add the `overrides` block to your `package.json`, then reinstall:

```json
"overrides": {
  "stablepay-sdk": { "react": "$react", "react-dom": "$react-dom" }
}
```

```bash
rm -rf node_modules package-lock.json
npm install
```

Check with `npm ls react`: every line should show the same version.

</details>

<details>
<summary><code>Failed to resolve import "viem"</code> (or <code>"react"</code>) from <code>…/stablepay-sdk/dist/esm/index.js</code></summary>

**Cause:** StablePay was installed as a *link* to another folder, so your bundler looks for its dependencies in that folder.

**Fix:** reinstall with `--install-links`, which copies the package into your `node_modules`:

```bash
npm install --install-links ../StablePay/tectonic-sdk ../StablePay/stablepay-sdk
```

</details>

<details>
<summary><code>ENOENT: Could not read package.json … node_modules/tectonic-sdk/package.json</code></summary>

**Cause:** `stablepay-sdk` was installed on its own. It needs `tectonic-sdk` installed alongside it.

**Fix:** install both in **one** command, `tectonic-sdk` first, exactly as above.

</details>

<details>
<summary>The widget appears as unstyled text and plain dropdowns</summary>

**Cause:** the stylesheet isn't loaded.

**Fix:** import it once, next to where you use the widget: `import 'stablepay-sdk/dist/esm/styles.css'`. For the drop-in script build, include `stablepay-checkout.css` with a `<link>` tag.

</details>

<details>
<summary>I installed <code>stablepay-sdk</code> from npm, and the network list or behaviour doesn't match these docs</summary>

**Cause:** the npm registry currently carries an older release that predates Tectonic.

**Fix:** install from the StablePay repository as described in [the tutorial, step 3](./07-integration-guide.md#step-3-install-stablepay), until the Tectonic release is published to npm.

</details>

## Configuration

| Message | Cause | Fix |
|---|---|---|
| `Receiving address is required` | `receivingAddress` is empty or undefined | Usually an environment variable that isn't set. Log it before creating the `Config` |
| `Invalid network: <key>` | A key in `amounts` isn't a supported network | Use `sepolia` (see [Networks](./14-networks.md)) |
| `Invalid stablecoin amount for network sepolia` | The price isn't a positive **number** | Pass `Number(price)`; strings such as `'12'` are rejected |

## In the widget

| Message | Cause | Fix |
|---|---|---|
| `No wallet found. Please install a Web3 wallet.` | The browser has no `window.ethereum` | Install MetaMask (or any EIP-1193 wallet), then reload |
| `Failed to fetch transaction details. Please try again.` | The RPC endpoint couldn't be reached or returned an error | Check the connection; try again. Ad blockers and strict corporate firewalls can block RPC endpoints |
| `Initializing transaction...` never goes away | Same as above, or the network is very slow | Reload; check the browser console for the underlying error |
| `Please select a network first` | **Connect Wallet** was clicked before choosing a network | Choose the network, then the token |
| `Wrong network detected. Please switch to Sepolia` | The wallet changed network mid-checkout | Switch back in the wallet, or click Pay and accept the switch prompt |
| `User rejected switching to Sepolia. Please switch manually in MetaMask.` | The customer declined the network switch | Switch in the wallet manually, then try again |
| `User rejected adding Sepolia to MetaMask. Please add it manually.` | The wallet didn't know Sepolia, and the customer declined adding it | Accept the prompt, or enable test networks in the wallet settings |
| `Failed to connect wallet. Please open MetaMask to login.` | The wallet is locked or the request was dismissed | Unlock the wallet and click Connect again |

## While paying

| Message | Cause | Fix |
|---|---|---|
| `Transaction failed: User denied transaction` | The customer clicked *Reject* in the wallet | Nothing to fix; they can click Pay again |
| `Transaction failed: … insufficient funds …` | Not enough ETH for the payment plus gas | Top up the wallet (on Sepolia, from a faucet) |
| `Transaction failed: Transaction reverted on-chain.` | The contract rejected the transaction | Open the transaction on Etherscan to see the reason, then see below |
| `Tectonic: this payment cannot go through right now. The protocol is below its critical reserve ratio…` | The protocol is in its critical band and the mint would revert | Try again later, or pay with SC if you hold it |
| `Payment confirmed, but the merchant was credited X SC instead of Y SC…` | The price or fee moved between the quote and execution | The widget called `onTransactionUnderpaid`. Follow your [underpayment policy](./08-verify-payments.md#handling-underpayments) |
| `Network mismatch. MetaMask is on chain …` | The wallet ended up on a different chain than the one selected | Switch the wallet to the selected network and try again |

<details>
<summary>The transaction reverted with <code>ChainlinkInvertingOracle: stale answer</code></summary>

The price oracle hasn't received an update within its one-day staleness window, so Tectonic refuses to price anything. Every SC transfer reads the price too (to compute stability fees), so both payment paths are affected until the feed updates. There's nothing to fix on your side: wait for the oracle to update.

</details>

## On your server

| Symptom | Cause | Fix |
|---|---|---|
| Verification stays `pending` | The hash isn't mined yet, or hasn't reached `MIN_CONFIRMATIONS` | Keep polling; a Sepolia block takes about 12 seconds |
| Verification says `underpaid` with `received: 0n` | The transaction paid someone else, or it's not a StablePay payment at all | Check the address the order used. Don't fulfil |
| A real payment is `underpaid` by a tiny fraction | The ETH price moved between quote and execution | Apply your [underpayment policy](./08-verify-payments.md#handling-underpayments) |
| `Do not know how to serialize a BigInt` | A `bigint` was passed to `JSON.stringify` | Convert with `.toString()` or `formatUnits(value, 18)` first |
| RPC requests fail or are rate-limited | Public endpoints have limits | Use your own RPC provider; set `RPC_URL` |

## FAQ

<details>
<summary>Do I need a backend at all?</summary>

To **take** a payment, no: the widget works on a static page. To **sell** safely, yes: something you control has to confirm the payment on-chain before you ship. That can be a full server, a serverless function, or even a manual check on Etherscan for a handful of orders.

</details>

<details>
<summary>Does StablePay charge fees?</summary>

No. StablePay is open-source code on your page. When a customer pays with ETH, Tectonic charges its protocol fees on the mint (0.2% in total on Sepolia today), and that is already included in the quote the customer sees. Paying with SC involves no protocol fee. Customers always pay the network's gas.

</details>

<details>
<summary>Can a customer get a chargeback?</summary>

No. On-chain payments are final. Refunds are something you choose to do, by sending a new payment back. See [Getting paid](./06-getting-paid.md#refunds).

</details>

<details>
<summary>What does SC track, and where does the price come from?</summary>

SC tracks the US dollar. Tectonic's oracle reads Chainlink's ETH/USD price feed and inverts it, to answer "how much ETH is one dollar?". That number prices every mint.

</details>

<details>
<summary>Why did my SC balance go down without me doing anything?</summary>

Either a **stability fee** was charged (the reserve ratio was at or below 1.5), or a **triggered redemption** converted some or all of your SC to ETH (the ratio was below 1.1). Check your address on Etherscan for `ChargedStabilityFee` or `Redeemed` events. [Meet Tectonic](./05-tectonic.md) explains both.

</details>

<details>
<summary>Which wallets work?</summary>

Any browser wallet that injects the standard `window.ethereum` provider, such as MetaMask, Rabby, Brave Wallet or Coinbase Wallet's extension. Mobile customers can use their wallet app's built-in browser.

</details>

<details>
<summary>Can I accept payments on mainnet?</summary>

Not yet. Tectonic is live on Sepolia, with Ethereum Classic and Base planned. Watch [Networks & contracts](./14-networks.md).

</details>

<details>
<summary>Where do I report a bug or ask a question?</summary>

Open an issue on [StablePay's GitHub](https://github.com/DjedAlliance/StablePay/issues).

</details>
