---
title: Glossary
description: Plain-language definitions of every term used in these docs.
section: Reference
---

# Glossary

**Address.** A wallet's public identifier, such as `0x5aF3…c9E1`. Safe to share. Your receiving address is the one you give StablePay.

**Base units.** The smallest indivisible amount of a token. SC and ETH both have 18 decimals, so 1 SC is `1000000000000000000` base units. Code handles amounts in base units to stay exact.

**Basecoin.** The chain's native currency that backs Tectonic's reserve. On Sepolia, ETH.

**Confirmations.** How many blocks have been added since (and including) the block with your transaction. More confirmations make a payment harder to undo.

**Critical reserve ratio.** 1.1 on Sepolia. Below it, Tectonic runs triggered redemptions before mints.

**Dev fee (`devFee`).** Part of the protocol fee on mints and redemptions, sent to the protocol's dev fee receiver. 0.1% on Sepolia; adjustable by the contract's `dev` role.

**Direct transfer.** The SC payment path: the customer sends SC straight to you with an ERC-20 `transfer`.

**Effective balance.** An SC balance minus the stability fee it has accrued but not yet paid. Read it with `balanceOfAfterStabilityFee`.

**EquityCoin (`RC`).** Tectonic's second token: a share of the reserve beyond what SC needs. Its holders earn the protocol's fees and absorb ETH price moves.

**ERC-20.** The standard interface for tokens on Ethereum-compatible chains. SC is an ERC-20.

**Fee (`fee`).** The part of the protocol fee that stays in Tectonic's reserve. 0.1% on Sepolia.

**Gas.** The network fee for executing a transaction, always paid in the chain's native coin by whoever sends it.

**Liabilities (`L`).** SC supply × redemption price: what all SC holders together could claim.

**Mint.** Creating new tokens. StablePay's ETH path calls Tectonic's `mint(receiver)` to create SC directly for you.

**Native path.** The ETH payment path: the customer sends ETH, and Tectonic mints SC to you.

**Network key.** The short name of a network in StablePay's registry, such as `sepolia`. Used in `Config.amounts`.

**Oracle.** A contract that reports an off-chain price on-chain. Tectonic's oracle reports how much ETH one US dollar costs, from Chainlink's ETH/USD feed.

**Quote.** The ETH amount needed, right now, for you to receive a given SC amount. Short-lived; the widget refreshes it before signing.

**Receipt.** The record of a mined transaction: whether it succeeded, which block it's in, and the events it emitted.

**Redeem.** Handing SC (or EquityCoin) back to Tectonic in exchange for ETH from the reserve.

**Reserve (`R`).** The ETH held by the Tectonic contract.

**Reserve ratio (`r`).** `R / L`. Tectonic's health bar: 1.5 means the reserve holds 150% of what SC holders could claim.

**RPC endpoint.** A URL that lets software read from and send to a blockchain. Your server needs one to verify payments.

**Safe reserve ratio.** 1.5 on Sepolia. At or below it, SC balances accrue a stability fee.

**SC.** Tectonic's stablecoin (`StableCoin`), tracking 1 US dollar. The Tectonic contract address is also the SC token address.

**Seed.** The ETH sent when Tectonic was deployed. It created unowned SC and EquityCoin so that the reserve and supplies can never fall to zero.

**Sepolia.** Ethereum's public test network. Its coins are free and have no value.

**Stability fee.** A small daily fee on SC balances while the reserve ratio is at or below the safe threshold, up to 0.0548% per day at the floor. It's burned from balances the next time they move.

**Super-critical reserve ratio.** 1.05 on Sepolia. The floor of the reserve ratio; below it the redemption price becomes a fair share of the reserve.

**Tectonic.** The decentralized stablecoin protocol, by Stability Nexus, that issues SC. StablePay settles every payment against it.

**Transaction hash (`txHash`).** The unique ID of a transaction. The widget hands it to your code, and your server uses it to verify the payment.

**Triggered redemption.** When the reserve ratio is below critical, Tectonic redeems SC holders' balances into ETH at the current redemption price until the ratio recovers. Holders receive full value minus the normal fee, with no penalty.

**Wallet.** Software that holds your keys and signs transactions, such as MetaMask.
