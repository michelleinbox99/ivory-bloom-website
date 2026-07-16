# Launch Services — Setup Guide

Every third-party service the site is prepared for, what Michelle must do
to activate each one, and what deliberately waits for the WooCommerce
migration. All IDs go in **one file: `js/config.js`** (then run
`powershell -File scripts/build.ps1`? — no; `js/` files ship as-is, no
rebuild needed).

Nothing loads for visitors until (a) its ID is filled in and (b) for
analytics/marketing tags, the visitor accepts the cookie notice. The
cookie banner only appears once at least one tag ID is configured.

## Working today (no setup needed)

- **Order requests** — checkout delivers the full order (items, variants,
  personalization, totals, customer + shipping details) to the same
  Formspree inbox as the consultation form, subject line
  "NEW ORDER REQUEST — …". Reply to the customer to arrange payment.
- **Shipping estimates** — flat rate **$8**, free at/above **$150**
  (PLACEHOLDERS — edit `shipping` in config.js to your real policy),
  with an estimated-arrival date range computed from the 2–3 week lead
  time plus transit.
- **Cookie consent** — GDPR-style banner, Accept / Essential Only,
  choice persisted, privacy page updated.

## Accounts to create (each ~15 minutes)

| Service | Where | What to paste into config.js |
|---|---|---|
| **Stripe** | stripe.com → activate account | `stripePublishableKey` (pk_test_ first). **Static-hosting path:** create a Payment Link per product in the Stripe dashboard — no server needed, and Apple Pay/Google Pay/cards come built in. Turn on **Stripe Tax** there for real destination-based US sales tax. |
| **Google Analytics 4** | analytics.google.com → create property | `ga4MeasurementId` (G-…) |
| **Google Tag Manager** (optional, instead of GA4 direct) | tagmanager.google.com | `gtmContainerId` (GTM-…) |
| **Search Console** | search.google.com/search-console → verify domain, submit sitemap.xml | nothing — DNS/HTML verification |
| **Microsoft Clarity** | clarity.microsoft.com | `clarityProjectId` |
| **Meta Pixel** | Meta Events Manager | `metaPixelId` |
| **Pinterest Tag** | ads.pinterest.com | `pinterestTagId` |
| **Klaviyo** | klaviyo.com → account → API keys | `klaviyoPublicKey` (public/site key). Flows (welcome, abandoned cart, post-purchase…) are built inside Klaviyo's dashboard; the site-side hook is this one key. |

## Deliberately deferred to WooCommerce migration

These need a server/backend and should NOT be faked on a static site:
real payment capture in-page, customer accounts + password reset, admin
dashboard (orders/customers/inventory), coupons & gift cards, real-time
USPS/UPS/FedEx rates, exact destination tax, transactional email
sequences (order/shipping confirmations — today the Formspree order
email + Michelle's personal reply covers this), CAPTCHA + rate limiting
(forms already have honeypot spam protection; .htaccess already sets
security headers).

## Already in place (SEO/security)

sitemap.xml (submit to Search Console), robots.txt, canonical URLs,
Open Graph/Twitter cards, Product/Breadcrumb/FAQ/LocalBusiness schema,
.htaccess security headers + gzip + caching, honeypot spam protection,
client-side form validation, noindex on cart/checkout/search/wishlist.
