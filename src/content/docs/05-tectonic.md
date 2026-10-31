---
title: Meet Tectonic
description: The stablecoin protocol underneath StablePay, explained in five ideas, with a live view of the Sepolia deployment and a playground for the reserve ratio.
section: Learn
---

# Meet Tectonic

StablePay is the checkout. **Tectonic** is the money. Every SC your customers pay you was issued by Tectonic, and Tectonic's rules decide how that SC behaves while you hold it. This page explains the protocol in five ideas. No finance degree required.

## You will learn

- What backs SC, and how the reserve ratio measures its health
- Where the mint and redeem prices come from
- What stability fees and triggered redemptions are, and when they happen
- How to read the live state of the Sepolia deployment

Here is Tectonic on Sepolia right now:

<!-- widget:live-stats -->

## Idea 1: One reserve, two coins

The Tectonic contract holds a pile of ETH: the **reserve**. Against that reserve it issues two tokens:

| Token | Symbol | What it is | Who wants it |
|---|---|---|---|
| **StableCoin** | `SC` | Tracks 1 US dollar. Always redeemable for a dollar's worth of ETH (or a fair share of the reserve). | Merchants and their customers |
| **EquityCoin** | `RC` | A share of whatever the reserve holds *beyond* what SC needs. | People who want leveraged exposure to ETH, and to earn the protocol's fees |

Anybody can send ETH to the contract and **mint** either coin at the current price, and anybody can **redeem** either coin back for ETH. There is no gatekeeper, no allow-list and no company in the middle.

> [!NOTE]
> The Tectonic contract **is** the SC token, an ERC-20 at the protocol's own address. The EquityCoin is a separate ERC-20 deployed by Tectonic. That's why StablePay's network config uses the same address for "Tectonic" and for "the stablecoin".

## Idea 2: The reserve ratio is the health bar

Three numbers describe the protocol at any moment:

```text
Reserve      R = ETH held by the contract
Liabilities  L = SC supply × SC redemption price      (what SC holders could claim)
Equity       E = R − L                                (what belongs to EquityCoin holders)

Reserve ratio  r = R / L
```

If `r = 1.5`, the reserve holds 150% of what all SC holders could ever claim. The extra 50% is equity, a cushion that absorbs ETH price drops before SC is affected. Tectonic compares `r` with three thresholds, fixed when the contract is deployed:

| Threshold | Sepolia value | What happens below it |
|---|---|---|
| **Safe** | 1.5 | SC holders start paying a small **stability fee** |
| **Critical** | 1.1 | **Triggered redemptions** run before mints |
| **Super-critical** | 1.05 | The floor. The redemption price drops so the ratio can never fall below this |

Drag the slider to see what each band means:

<!-- widget:reserve-playground -->

## Idea 3: Prices come from an oracle, with a safety floor

- **Mint price.** Minting 1 SC costs exactly 1 dollar of ETH, according to the oracle. On Sepolia the oracle is Chainlink's ETH/USD feed, inverted to answer "how much ETH is one dollar?".
- **Redemption price.** Redeeming 1 SC normally pays out the same 1 dollar of ETH. But if the reserve ever got so thin that paying everyone in full would push the ratio below the super-critical floor, the redemption price becomes `R / (1.05 × supply)` instead: everyone gets an equal, fair share, and the reserve can never be drained by whoever redeems first.
- **Equity price.** `E / EquityCoin supply`: each EquityCoin is a slice of the cushion.

Every mint and redemption pays the protocol fee: `fee` (0.1% on Sepolia, stays in the reserve and grows equity) plus `devFee` (0.1% on Sepolia, sent to the protocol's dev fee receiver).

<details>
<summary><b>Deep dive:</b> Why can't SC "depeg" the way other stablecoins have?</summary>

A stablecoin "depegs" when holders can't get a dollar's worth of value out of it. Tectonic attacks this from three sides at once:

1. **It always lets you redeem.** There is no ratio below which redemptions are blocked; the redemption price simply becomes a fair share of the reserve, so nobody profits from a bank run.
2. **It always lets you mint.** Many reserve-backed designs stop minting when reserves are low, which removes the very buyers who would restore the peg. Tectonic never refuses a mint. That's also why a StablePay checkout is never turned away.
3. **It repairs itself.** Stability fees gently shrink SC supply when the ratio is low, and triggered redemptions shrink it decisively when the ratio is critical. Both push `r` back up.

</details>

## Idea 4: Stability fees, a gentle squeeze

While `r` is at or below the **safe** threshold, every SC balance accrues a small daily fee. The lower the ratio, the higher the fee:

```text
dailyFee(r) = 0                                          if r > 1.5
            = (1.5 − r) / (1.5 − 1.05) × 0.0548%         if r ≤ 1.5
```

The maximum is **0.0548% per day** (about 20% per year), reached only at the super-critical floor. At `r = 1.4` the fee is about 0.012% per day: 12 SC held for 30 days would shrink by roughly 0.04 SC.

The fee is charged lazily. Tectonic remembers when it last charged each holder, and burns the accrued fee from their balance the next time their SC moves (a transfer, a mint to them, a redemption). Until then, your wallet shows the full `balanceOf`, which slightly overstates what you really hold. Ask the contract for the truth:

```js
// The balance you'd actually have after the fee is charged.
await tectonic.read.balanceOfAfterStabilityFee([merchantAddress])
```

> [!TIP]
> The fee is a feature for you as a merchant, not just a cost. It nudges SC holders to redeem or spend while reserves are low, which is what brings the ratio back above 1.5 and stops the fee.

## Idea 5: Triggered redemptions, a decisive fix

If `r` drops below **critical** (1.1), Tectonic doesn't wait. Before it processes any new mint (and after any EquityCoin redemption), it picks SC holders, starting from a pseudo-random position in its holder list, and redeems their **entire** SC balance into ETH at the current redemption price, until the ratio is healthy again or 100 holders have been processed.

For the holders involved, this is not a confiscation. They receive the ETH their SC was worth at that moment, minus the normal redemption fee, with no liquidation penalty. But it means a merchant holding SC during a crisis may find that balance turned into ETH without having clicked anything.

> [!WARNING]
> If you hold SC, expect this possibility. When StablePay detects the critical band at checkout, it shows the customer and you a warning. Your accounting should treat an incoming ETH transfer from the Tectonic contract as a possible triggered redemption of your SC. See [Getting paid](./06-getting-paid.md).

<details>
<summary><b>Deep dive:</b> Who pays the gas for triggered redemptions?</summary>

Triggered redemptions run inside somebody else's transaction, usually a mint, so that customer's transaction does more work and costs more gas. Tectonic refunds the transaction's originator part of that gas from the reserve, capped at 0.1% of the value redeemed. This is also why StablePay estimates gas for every mint and adds 50% headroom instead of using a fixed gas limit: the amount of work depends on the state of the chain at the exact moment the transaction runs.

</details>

## How it all started

A Tectonic deployment has to begin somewhere. The constructor requires a small ETH payment (0.01 ETH on Sepolia) that seeds both coins: half backs an initial SC supply, half becomes initial equity. Nobody owns these seed coins, so nobody can ever redeem them, which keeps the reserve and both supplies permanently above zero. Every deployment therefore starts at a reserve ratio of exactly **2**.

## Recap

- Tectonic holds an ETH reserve and issues SC (tracks USD) and EquityCoin (the cushion).
- The reserve ratio `r = R / L` is the health bar; thresholds 1.5, 1.1 and 1.05 define its bands.
- Mint price comes from the oracle. Redemption price has a floor that makes runs pointless.
- Below 1.5, SC balances pay a small daily stability fee. Below 1.1, triggered redemptions convert SC to ETH at full value.
- StablePay checks the band on every checkout and warns when either mechanism is active.
