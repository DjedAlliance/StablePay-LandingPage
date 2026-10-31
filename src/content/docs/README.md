# StablePay documentation

Source for the documentation published on the StablePay website at `/docs`. Each file is plain GitHub-flavoured Markdown and reads well on GitHub as well as on the site.

## Pages

| # | Page | Section |
|---|---|---|
| 01 | [Welcome to StablePay](01-introduction.md) | Get started |
| 02 | [Quick start](02-quick-start.md) | Get started |
| 03 | [Thinking in StablePay](03-thinking-in-stablepay.md) | Get started |
| 04 | [How a payment works](04-how-a-payment-works.md) | Learn |
| 05 | [Meet Tectonic](05-tectonic.md) | Learn |
| 06 | [Getting paid](06-getting-paid.md) | Learn |
| 07 | [Tutorial: Add StablePay to your store](07-integration-guide.md) | Guides |
| 08 | [Verifying payments](08-verify-payments.md) | Guides |
| 09 | [Next.js](09-nextjs.md) | Guides |
| 10 | [Any website](10-any-website.md) | Guides |
| 11 | [Customizing the checkout](11-customizing.md) | Guides |
| 12 | [Widget API reference](12-widget-api.md) | Reference |
| 13 | [Tectonic SDK reference](13-tectonic-sdk.md) | Reference |
| 14 | [Networks & contracts](14-networks.md) | Reference |
| 15 | [Troubleshooting & FAQ](15-troubleshooting.md) | Reference |
| 16 | [Glossary](16-glossary.md) | Reference |

## Conventions

- **Front matter** sets each page's `title`, `description` and sidebar `section`. The numeric file prefix sets the order; the site's URL drops it (`07-integration-guide.md` → `/docs/integration-guide`).
- **Links** between pages use relative file names (`./08-verify-payments.md#handling-underpayments`), which work on GitHub and are rewritten by the site.
- **Callouts** use GitHub alert syntax: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`.
- **Deep dives and challenges** use `<details><summary>…</summary>` blocks, with a blank line after `<summary>` and before `</details>`.
- **"You will learn"** and **"Recap"** headings are styled as boxes on the site.
- **Code titles** go after the language: ` ```js title="server/index.js" `.
- **Interactive widgets** are HTML comments such as `<!-- widget:live-stats -->`. GitHub hides them; the site renders the widget. A Mermaid block directly after a widget comment is the GitHub fallback and is replaced by the widget on the site.

Available widgets: `checkout-preview`, `payment-flow`, `quote-calculator`, `live-stats`, `reserve-playground`, `tutorial-map`.

## Keeping the site in sync

The website reads its copy of these files from `StablePay-LandingPage/src/content/docs/`. After editing a page here, copy it there:

```bash
cp documentation/stablepay-docs/*.md StablePay-LandingPage/src/content/docs/
```

Every code sample in the guides was run against the live Sepolia deployment when it was written (October 2026). If the contracts or SDK change, re-run the tutorial end to end.
