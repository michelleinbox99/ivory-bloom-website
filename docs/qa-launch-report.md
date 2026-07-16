# Production Readiness Audit — QA & Launch Report

**Date:** July 16, 2026 · **Pages audited:** 37 built pages · **Auditor:** automated scans + live browser (Chromium) functional testing

## Launch recommendation

**GO for launch** as an order-request boutique (checkout delivers orders
to the atelier inbox; payment arranged personally). Two placeholder
values need Michelle's confirmation before launch — see Critical.

---

## Critical (confirm before launch)

1. **Placeholder shipping policy** — `js/config.js` ships $8 flat /
   free over $150. Confirm or edit these two numbers.
2. **Placeholder prices on 3 newest products** — Petal Pouch $38,
   Lavender Crown $68 (Scrunchie Set $15.99 matches the confirmed
   add-on price). Confirm or edit in `js/products.js` + the matching
   collection-page blocks/schema.

## Fixed during this audit

- **404.html loaded a nonexistent `js/nav.js`** (broken script on the
  error page) → now loads `js/ui.js`. Re-scan: **0 broken internal
  links or assets across all 37 pages.**
- **Missing legal pages** → created `/terms.html` and
  `/accessibility.html` (accessibility statement), linked in the footer
  on every page.

## Functional testing (live browser, all PASS)

| Flow | Result |
|---|---|
| Add to cart (shop grid, collection blocks, both PDPs, featured strip) | ✅ |
| Quantity + / −, remove, empty-state ("Your collection is waiting.") | ✅ |
| Cart persistence across reload/navigation (localStorage) | ✅ |
| Drawer: slide-in, focus trap, Esc close, focus restore | ✅ |
| Checkout: inline validation, order POSTs to Formspree inbox with full items/personalization/totals, confirmation state, duplicate-submit guard | ✅ (POST intercepted + inspected in test) |
| Shipping engine: $8 under threshold, "$X away from free shipping", Free at $150+, arrival date range | ✅ |
| Search: products, tags ("boho", "lavender"), pages, ?q= links, no-results fallback | ✅ |
| Wishlist: save/remove from any card, wishlist page, empty state | ✅ |
| Cookie consent: banner only when a tag ID configured; Accept loads tag, Essential-Only never loads it, choice persisted | ✅ (both paths verified) |
| Mobile (375px): bottom-sheet drawer, sticky bag bar, menu, no horizontal scroll | ✅ |
| Header holds one line at 1009 / 1280 / 1520 px | ✅ |
| Console errors on every page type tested | ✅ none |

## SEO (automated scan, all 37 pages)

Titles ✅ unique on every page · descriptions ✅ · canonical-or-noindex ✅
every page · exactly one h1 per page ✅ · `lang="en"` ✅ · all images
have alt text ✅ · sitemap entries all resolve to real files ✅ ·
robots.txt valid with sitemap pointer ✅ · Product/Breadcrumb/FAQ/
LocalBusiness/Review schema present; **no invented ratings anywhere** ·
cart/checkout/search/wishlist/legal pages noindexed ✅

## Security

.htaccess: X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
gzip, cache-control tiers ✅ · forms: honeypot spam protection +
client validation ✅ · no secrets in repo (config.js holds only
public/publishable IDs by design) ✅ · payment: **no card data is ever
collected on-site** — that is the correct security posture until
Stripe-hosted payment links are adopted.
Deferred (needs backend/host): CSP header (would need per-host tuning
for Formspree/fonts), rate limiting, CAPTCHA. HTTPS is enforced by the
hosting plan + hsts-ready headers can be added at the host.

## Accessibility (WCAG 2.1 AA targeted)

Keyboard: full nav, drawer focus trap + Esc + restore ✅ · visible
focus (`:focus-visible` brass outline sitewide) ✅ · labeled inputs,
`role="alert"` errors, `aria-live` grids, `aria-pressed` wishlist
buttons, ARIA-labeled icon buttons ✅ · 44–48px touch targets ✅ ·
`prefers-reduced-motion` honored ✅ · public commitment + contact
path published at /accessibility.html ✅
**Honest limit:** no screen-reader session was run; recommend one
NVDA pass after launch.

## Performance

Static site, no framework, ~30KB total JS across 8 files, lazy-loaded
images with width/height (no CLS), srcset on heavy photography, gzip +
long-cache headers. **Honest limit:** Lighthouse cannot run in this
environment — run it on the production URL (target 90+; nothing in the
architecture predicts otherwise). Largest known cost: hero images
(~6.5MB image library, already responsive-sized).

## Browser coverage

Tested: Chromium (desktop + 375px mobile emulation). **Not tested:**
Safari, Firefox, real iOS/Android — the JS is ES5-compatible and
CSS uses widely-supported features, but do a 10-minute manual pass on
a real iPhone before announcing.

## Error handling

404 page ✅ branded, fixed script · empty cart / wishlist / search all
have styled, on-brand states ✅ · checkout failure shows accessible
retry message with direct email fallback ✅ · 500/offline pages: not
applicable on static hosting (host serves its own 500; site works
without JS for all content pages).

---

# Launch checklist

## Before flipping DNS
- [ ] Confirm shipping numbers in js/config.js and prices for the 3 new products
- [ ] Upload everything (including .htaccess) to the Apache host
- [ ] Verify HTTPS + redirect http→https at the host
- [ ] Send one real test order through /checkout.html — confirm the "NEW ORDER REQUEST" email arrives
- [ ] Send one consultation + one newsletter signup — confirm delivery
- [ ] Visit /nonexistent-page — confirm branded 404
- [ ] Run Lighthouse on the live URL (Performance/SEO/A11y/Best Practices)
- [ ] 10-minute pass on a real iPhone (drawer, checkout, menu)

## Within the first week
- [ ] Submit sitemap.xml in Google Search Console; validate schema via Rich Results Test
- [ ] Create GA4 (+ optionally Clarity) and paste IDs into js/config.js — cookie banner activates automatically
- [ ] Watch the inbox: every order request needs a same-day personal reply (site promises it)
- [ ] One NVDA/VoiceOver screen-reader pass

## Rollback & backup
- Git is the backup: every launch state is a commit on `website-2.0-redesign`.
  Tag the deployed commit (`git tag launch-YYYYMMDD`) before each upload.
- Rollback = re-upload the previous tag's files (static hosting, no
  migrations — rollback is total and instant).
- Keep the Formspree inbox as the order-of-record until WooCommerce.

## Maintenance
- New product = entry in js/products.js + block/schema on its collection page + `build.ps1`
- Prices/policy = js/config.js and products.js, upload — no rebuild needed for js-only edits
- Monthly: re-run Lighthouse, check Search Console coverage, refresh lead-time copy if it changes
