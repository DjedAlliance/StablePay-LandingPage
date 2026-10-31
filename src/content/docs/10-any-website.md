---
title: Any website
description: Not using React? Build StablePay into one script and one stylesheet, then drop it into plain HTML, PHP, WordPress or any page you control.
section: Guides
---

# Any website

Your store doesn't need to be a React app. In this guide you build StablePay once into a single JavaScript file and a single CSS file. After that, adding a checkout to any page is three lines of HTML:

```html
<link rel="stylesheet" href="/stablepay/stablepay-checkout.css">
<div data-stablepay-checkout data-address="0xYourReceivingAddress" data-amount="12"></div>
<script src="/stablepay/stablepay-checkout.js"></script>
```

## You will learn

- How to package the widget as a drop-in script
- How to place a checkout with HTML attributes
- How to listen for payments from plain JavaScript
- How to use it from PHP and WordPress

## Step 1: Create a small build project

This folder exists only to produce the two files. It doesn't need to live inside your website. Create it **next to** a clone of the StablePay repository:

```bash title="terminal"
git clone https://github.com/DjedAlliance/StablePay.git
mkdir stablepay-checkout
cd stablepay-checkout
```

Create `package.json`:

```json title="stablepay-checkout/package.json"
{
  "name": "stablepay-checkout",
  "private": true,
  "type": "module",
  "scripts": { "build": "vite build" },
  "overrides": {
    "stablepay-sdk": { "react": "$react", "react-dom": "$react-dom" }
  }
}
```

Install React, the build tool and StablePay:

```bash title="terminal"
npm install react@18 react-dom@18
npm install -D vite @vitejs/plugin-react
npm install --install-links ../StablePay/tectonic-sdk ../StablePay/stablepay-sdk
```

## Step 2: Write the loader

Create `src/stablepay-checkout.jsx`. It finds every element marked `data-stablepay-checkout`, renders a widget into it, and fires DOM events when a payment completes:

```jsx title="stablepay-checkout/src/stablepay-checkout.jsx"
import { createRoot } from 'react-dom/client'
import StablePay from 'stablepay-sdk'
import 'stablepay-sdk/dist/esm/styles.css'

function mount(target, options) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element) throw new Error(`StablePayCheckout: no element matches ${target}`)

  const { receivingAddress, amount, network = 'sepolia', buttonSize = 'medium' } = options

  const config = new StablePay.Config({
    receivingAddress,
    amounts: { [network]: { stablecoin: Number(amount) } },
  })
  const networkSelector = new StablePay.NetworkSelector(config)

  const emit = (name, detail) => {
    element.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }))
  }

  const root = createRoot(element)
  root.render(
    <StablePay.Widget
      networkSelector={networkSelector}
      buttonSize={buttonSize}
      onTransactionComplete={(payment) => {
        options.onPaid?.(payment)
        emit('stablepay:paid', payment)
      }}
      onTransactionUnderpaid={(payment) => {
        options.onUnderpaid?.(payment)
        emit('stablepay:underpaid', payment)
      }}
    />
  )
  return () => root.unmount()
}

function mountAll() {
  document.querySelectorAll('[data-stablepay-checkout]').forEach((element) => {
    if (element.dataset.stablepayMounted) return
    element.dataset.stablepayMounted = 'true'
    mount(element, {
      receivingAddress: element.dataset.address,
      amount: element.dataset.amount,
      network: element.dataset.network,
      buttonSize: element.dataset.size,
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAll)
} else {
  mountAll()
}

window.StablePayCheckout = { mount, mountAll }
```

## Step 3: Configure the build

Create `vite.config.js`. It tells Vite to produce one self-contained script, with React bundled inside:

```js title="stablepay-checkout/vite.config.js"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    lib: {
      entry: 'src/stablepay-checkout.jsx',
      name: 'StablePayCheckout',
      formats: ['iife'],
      fileName: () => 'stablepay-checkout.js',
      cssFileName: 'stablepay-checkout',
    },
  },
})
```

Build it:

```bash title="terminal"
npm run build
```

You get two files in `dist/`:

```text
dist/stablepay-checkout.css   ~11 kB
dist/stablepay-checkout.js    ~490 kB (≈150 kB gzipped)
```

Copy both into your website, for example into a `/stablepay/` folder.

## Step 4: Add a checkout to a page

```html title="checkout.html"
<link rel="stylesheet" href="/stablepay/stablepay-checkout.css">

<h1>Blue Mug: 12 SC</h1>

<div
  id="pay"
  data-stablepay-checkout
  data-address="0xYourReceivingAddress"
  data-amount="12"
  data-order-id="1001"
></div>

<script src="/stablepay/stablepay-checkout.js"></script>
<script>
  document.getElementById('pay').addEventListener('stablepay:paid', async (event) => {
    const orderId = event.currentTarget.dataset.orderId
    await fetch(`/api/orders/${orderId}/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ txHash: event.detail.txHash }),
    })
  })
</script>
```

The attributes:

| Attribute | Required | Meaning |
|---|---|---|
| `data-stablepay-checkout` | yes | Marks the element; the widget renders inside it |
| `data-address` | yes | Your receiving address |
| `data-amount` | yes | The price in SC, for example `12` or `12.5` |
| `data-network` | no | Network key, default `sepolia` |
| `data-size` | no | `small`, `medium` (default) or `large` |

`event.detail` carries the same payment object described in the [Widget API](./12-widget-api.md#the-payment-object), and the event bubbles, so you can also listen on `document`.

> [!IMPORTANT]
> As always, the `stablepay:paid` event is a **hint**. Your backend must verify `event.detail.txHash` on-chain before fulfilling the order. [Verifying payments](./08-verify-payments.md) has a dependency-free Python version you can port to PHP or any other language in a few minutes.

## Content added after page load

If your page inserts the checkout element later (a cart drawer, a single-page app), call the loader yourself:

```js
StablePayCheckout.mountAll()
// or, with full control:
const unmount = StablePayCheckout.mount('#pay', {
  receivingAddress: '0xYourReceivingAddress',
  amount: 12,
  onPaid: (payment) => console.log(payment.txHash),
})
```

## PHP

Print the order's total from the server, so the browser can't change it:

```php title="checkout.php"
<div
  data-stablepay-checkout
  data-address="<?= htmlspecialchars(getenv('MERCHANT_ADDRESS')) ?>"
  data-amount="<?= htmlspecialchars($order->total) ?>"
  data-order-id="<?= htmlspecialchars($order->id) ?>"
></div>
```

## WordPress

1. Upload `stablepay-checkout.js` and `stablepay-checkout.css` to your theme, for example to `wp-content/themes/your-theme/stablepay/`.
2. Load them from your theme's `functions.php`:

   ```php title="functions.php"
   add_action('wp_enqueue_scripts', function () {
       $base = get_stylesheet_directory_uri() . '/stablepay/';
       wp_enqueue_style('stablepay-checkout', $base . 'stablepay-checkout.css');
       wp_enqueue_script('stablepay-checkout', $base . 'stablepay-checkout.js', [], null, true);
   });
   ```

3. On the page where customers pay, add a **Custom HTML** block containing the `<div data-stablepay-checkout …>` element from step 4.

> [!NOTE]
> Hosted checkout pages, like those of some e-commerce platforms, don't allow custom scripts. You can still place StablePay on pages you *do* control, such as a "Pay with crypto" page linked from the order confirmation email.

## Recap

- One small build turns StablePay into `stablepay-checkout.js` and `stablepay-checkout.css`.
- Any element with `data-stablepay-checkout` becomes a checkout.
- Listen for `stablepay:paid`, send `txHash` to your backend, and verify it there.
