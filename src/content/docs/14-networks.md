---
title: Networks & contracts
description: Where StablePay runs today, every contract address and protocol parameter, and the on-chain events you can listen for.
section: Reference
---

# Networks & contracts

## Supported networks

| Network | Key | Chain ID | Status |
|---|---|---|---|
| Ethereum Sepolia (testnet) | `sepolia` | `11155111` | ✅ Live |
| Ethereum Classic | | `61` | Planned |
| Base | | `8453` | Planned |

> [!IMPORTANT]
> Sepolia is a **test network**. Its ETH comes free from faucets and has no value, so SC there has no value either. Tectonic's contracts are pre-audit. Use Sepolia to build and pilot your integration; mainnet networks will appear here, and in the SDK's `networksConfig`, when they are deployed.

<!-- widget:live-stats -->

## Ethereum Sepolia

### Contracts

| Contract | Address |
|---|---|
| **Tectonic** (also the **SC** token) | [`0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1`](https://sepolia.etherscan.io/address/0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1) |
| **EquityCoin** (`RC`) | [`0x22B2f0CAf598B9E5FCf888fB89eD50c2F4735F1a`](https://sepolia.etherscan.io/address/0x22B2f0CAf598B9E5FCf888fB89eD50c2F4735F1a) |
| **Oracle** (Chainlink ETH/USD, inverted) | [`0x4f007748666F2b941AA014E5a2a41841e681A32b`](https://sepolia.etherscan.io/address/0x4f007748666F2b941AA014E5a2a41841e681A32b) |
| Chainlink ETH/USD feed used by the oracle | [`0x694AA1769357215DE4FAC081bf1f309aDC325306`](https://sepolia.etherscan.io/address/0x694AA1769357215DE4FAC081bf1f309aDC325306) |

All three Tectonic contracts are verified on Etherscan, so you can read them and call them from the **Read Contract** and **Write Contract** tabs.

### Protocol parameters

| Parameter | Value | Meaning |
|---|---|---|
| `fee` | `1e15` (0.1%) | Charged on every mint and redemption; stays in the reserve |
| `devFee` | `1e15` (0.1%) | Charged on every mint and redemption; sent to the dev fee receiver. Can be changed by the contract's `dev` |
| `safeReserveRatio` | `1.5e18` (1.5) | At or below this, SC balances accrue a stability fee |
| `criticalReserveRatio` | `1.1e18` (1.1) | Below this, triggered redemptions run |
| `superCriticalReserveRatio` | `1.05e18` (1.05) | The floor of the reserve ratio |
| `maxDailyStabilityFee` | `5.48e14` (0.0548% per day) | Stability fee at the floor; scales down linearly to 0 at the safe ratio |
| `numRedemptionIterations` | `100` | Maximum holders redeemed per triggered-redemption sweep |
| Oracle `maxStaleness` | `86400` s (1 day) | Older oracle answers are rejected |
| Deployment seed | `0.01` ETH | Starting reserve; the deployment began at a reserve ratio of 2 |
| Deployed at block | `12027502` | Use as `fromBlock` when scanning events |

### SC token details

| | |
|---|---|
| Name / symbol | `StableCoin` / `SC` |
| Decimals | `18` |
| Tracks | 1 US dollar (via the oracle) |

### RPC endpoints

The SDK uses `https://ethereum-sepolia-rpc.publicnode.com` by default. It's fine for development. For production, use an RPC provider with an uptime guarantee, or your own node, especially on your server where you [verify payments](./08-verify-payments.md).

## Events

Tectonic is an ERC-20, so it emits the standard `Transfer` event, plus its own:

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);

event Minted(address indexed minter, address indexed receiver, uint256 amountSC, uint256 amountBC);
event Redeemed(address indexed redeemer, address indexed receiver, uint256 amountSC, uint256 amountBC);
event MintedEquityCoins(address indexed minter, address indexed receiver, uint256 amountEC, uint256 amountBC);
event RedeemedEquityCoins(address indexed redeemer, address indexed receiver, uint256 amountEC, uint256 amountBC);

event ForcedRedemptions(uint256 totalRedeemedAmountSC, uint256 initialRatio, uint256 finalRatio, address indexed origin, uint256 refund);
event ChargedStabilityFee(address indexed holder, uint256 feeAmount);
event BatchChargedStabilityFee(uint256 start, uint256 iterations, uint256 totalFeeAmount, address indexed origin, uint256 refund);
```

| Event | When you'll see it |
|---|---|
| `Transfer(customer → you)` | A customer paid you in SC |
| `Minted(…, receiver: you, …)` + `Transfer(0x0 → you)` | A customer paid you in ETH |
| `ChargedStabilityFee(you, fee)` + `Transfer(you → 0x0)` | A stability fee was charged on your balance |
| `ForcedRedemptions(…)` + `Redeemed(you, you, …)` | A triggered redemption converted your SC to ETH |

## Key contract functions

| Function | Who calls it | What it does |
|---|---|---|
| `mint(address receiver)` *payable* | StablePay's ETH path | Mints SC to `receiver` for the ETH sent, after fees |
| `transfer(address to, uint256 amount)` | StablePay's SC path | Standard ERC-20 transfer |
| `redeem(uint256 amountSC, address receiver)` | Holders | Burns SC and sends ETH to `receiver` |
| `balanceOfAfterStabilityFee(address)` *view* | Dashboards | A balance net of accrued stability fees |
| `ratio()`, `R()`, `L()`, `E()` *view* | Dashboards | Reserve ratio, reserve, liabilities and equity |
| `scPriceMint()`, `scPriceRedeem()` *view* | Quotes | Wei per 1 SC |
| `stabilityFee()` *view* | Dashboards | Current daily stability fee rate, scaled by 1e18 |

The full source is in the [Tectonic-EVM-Contracts repository](https://github.com/StabilityNexus/Tectonic-EVM-Contracts), and every deployment, with its constructor parameters, is recorded in its [`Deployments.md`](https://github.com/StabilityNexus/Tectonic-EVM-Contracts/blob/main/Deployments.md).
