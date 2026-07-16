# Luxury Add-to-Cart System

Vanilla JS/CSS cart matching the site's zero-dependency static architecture.
No build tooling, no npm — ships as plain files to Apache shared hosting.

## Files

| File | Role |
|------|------|
| `js/products.js` | Product catalog (`window.IvoryBloom.products`). WooCommerce-ready shape: id → SKU/slug, variants → attributes, inventory → stock status. |
| `js/cart.js` | Cart engine: localStorage state, slide-in drawer, header bag badge, fly-to-cart animation, wishlist toggle, cart-page rendering. Public API on `window.IBCart`. |
| `js/checkout.js` | Checkout form validation + order summary. Stripe mounts later at `#stripePaymentElement`. |
| `css/14-cart.css` | 15th CSS layer. Tokens only, no raw hex. |
| `src/pages/cart.html` → `/cart.html` | "Your Bridal Collection" page (noindex). |
| `src/pages/checkout.html` → `/checkout.html` | Customer info + shipping + payment placeholder (noindex). |
| `src/partials/homepage-header.html` | Bag icon + `.cart-count` badge in `header-actions`. |

Product blocks (`.product-block` with `data-add-to-cart` / `data-add-to-wishlist`
buttons and Product/Offer JSON-LD) live on the four fixed-price collection pages:
flower-girl-sets, bridal-pouches, flower-crowns (×2 products), bridesmaid-collection.
Consultation-priced pages (bespoke, keepsakes, ring bearer, bouquets, palette)
deliberately keep the quote-first flow. Journal pages use the minimal editorial
header and carry no cart.

## How it works

- **State**: `localStorage` keys `ib_cart_v1` (cart) and `ib_wishlist_v1` (wishlist).
  Line items key on `id + variant`. Cross-tab sync via the `storage` event.
- **Totals**: subtotal + estimated tax (8%, labeled "Estimated"); shipping
  "Calculated at checkout".
- **Paths**: `cart.js` derives the site root from its own `<script src>` prefix,
  so the same catalog works from root and nested pages.
- **Drawer**: injected by JS on every page that loads `cart.js`. Right slide-in
  (400ms) on desktop, bottom sheet ≤768px. `role="dialog"`, focus trap, Esc to
  close, focus restored on close.
- **Mobile**: sticky bottom bar (`.cart-mobile-bar`) appears when the cart has
  items; all touch targets ≥44–48px.
- **Checkout**: validates name/email/address/ZIP inline; submitting shows an
  atelier confirmation (no payment processed).

## Adding a product

1. Add the object to `js/products.js` (copy an existing entry).
2. Add a `.product-block` section to the collection page in `src/pages/collections/`
   with `data-add-to-cart="<id>"` / `data-add-to-wishlist="<id>"` buttons and a
   `.product-variant-select` whose options match the catalog variants.
3. Add matching Product JSON-LD to that page's `<head>`.
4. Run `powershell -File scripts/build.ps1`.

## WooCommerce migration notes

All mutations funnel through `save()` in `cart.js` — replace with WC Store API
calls (`/wc/store/v1/cart/*`) in one place. Product ids map to slugs/SKUs,
variants to variation attributes. Coupons/accounts/orders were intentionally
left server-side for the WC phase.

## Testing checklist

- [ ] Add to Cart on each of the 4 collection pages → button flips to "Added to Your Collection" with checkmark, thumbnail flies to bag, drawer opens
- [ ] Badge count bounces with gold glow on add
- [ ] Drawer: +/− quantity, Remove (fade-out), totals update
- [ ] Refresh page / close browser / reopen → cart persists
- [ ] `/cart.html`: items editable, order summary correct, "You May Also Love" shows 3 pieces not in cart
- [ ] Empty cart → "Your collection is waiting." + Explore button; mobile bar hides
- [ ] `/checkout.html`: empty submit shows inline errors and focuses first bad field; valid submit shows confirmation
- [ ] Mobile (375px): drawer is a bottom sheet, sticky bottom bar shows count + total
- [ ] Keyboard: Tab stays inside open drawer, Esc closes, focus returns to trigger
- [ ] `noindex` present on cart/checkout; Product schema validates in Rich Results Test
- [ ] No console errors on index, collections, cart, checkout
