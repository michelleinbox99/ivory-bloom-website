# Ivory & Bloom Atelier — Website 2.0 Homepage Wireframe & Content Strategy

Approved creative direction for the homepage. The homepage is engineered around a
five-stage journey — **Discover → Trust → Imagine → Connect → Purchase** — and a bride
can convert at any point after Trust rather than being forced to the bottom.

## Section order (top → bottom)

| # | Section | Journey | Background | Status |
|---|---|---|---|---|
| — | Fixed nav (transparent → frosts on scroll) | — | — | live |
| 1 | Luxury Hero (full-bleed carousel) | Discover | dark | live |
| — | Trust strip (4 product-attribute icons) | Trust | white band | live |
| 2 | Founder Introduction (`#story`) | Trust | linen | live |
| 3 | Handmade Craftsmanship Story (`#craftsmanship`) | Trust | parchment | copy refined |
| 5 | Why Brides Choose Us (`#why`) | Trust | linen | **new** |
| 4 | Signature Collections (`#collections`) | Imagine | white | live |
| 6 | Real Wedding Inspiration (`#inspiration`) | Imagine | linen | **new (replaces filterable lookbook)** |
| 7 | Customer Reviews | Connect | white | live |
| 8 | Wedding Journal (`#journal`) | Connect | linen | live |
| 9 | Email Capture — "Style Notes" (`#newsletter`) | Connect | parchment | **new homepage section (promoted from footer)** |
| 10 | Final Luxury CTA (photo banner) | Purchase | photo | live |
| — | Consultation form (`#consultation`) — the purchase act | Purchase | white | live |
| — | Footer (Instagram · newsletter · nav · quiet Etsy) | — | white | live |

Backgrounds strictly alternate so no two adjacent sections share a field:
`linen · parchment · linen · white · linen · white · linen · parchment · photo · white`.

## Why this order differs slightly from the numbered brief

Collections (4) is placed immediately after the trust cluster (2, 3, 5) rather than
after "Why Brides Choose Us" only — so a decided bride (~30% arrive ready) reaches
product fast, while Real Weddings, Reviews, and Journal deepen desire for the
undecided. Scroll order stays: Hero → Founder → Craft → Why → Collections → Real
Weddings → Reviews → Journal → Email → Final CTA → Consultation.

## What changed from the previous homepage

- **Craftsmanship moved up** to directly follow the Founder (was after Collections), so
  the Trust cluster reads as one continuous argument before product.
- **New "Why Brides Choose Us"** four-pillar section: Experience · Handmade Quality ·
  Custom Service · Personal Attention. The thin top trust strip stays as reinforcement
  (product attributes); the pillars answer objections (reasons to trust).
- **Filterable Lookbook replaced** by "Real Wedding Inspiration" — an editorial trio
  linking to the `real-weddings/` pages (built in Phase D). The old filter widget's
  imagery survives on the collection pages' lookbook strips and the Real Weddings
  pages. `js/gallery.js` is retired (it was the widget's only consumer sitewide).
- **Standalone Personalization section removed** from the homepage; its themes (free
  color matching, made-to-order, coordinated sets) are carried by the new Why pillars
  and remain in full on every collection page.
- **Email capture promoted** out of the footer into its own homepage section before the
  Final CTA. The footer newsletter remains on every page; `js/newsletter.js` now drives
  any number of `.js-newsletter` forms on a page.

## Per-section intent

Each section is documented in the creative brief the user approved; the load-bearing
rules for future edits:

- **Hero** — one `<h1>` only (slide 1); primary CTA → Collections, secondary → the
  consultation. Two paths, no hard sell above the fold.
- **Founder / Craftsmanship** — build trust before price; Craftsmanship foregrounds the
  three proofs: hand-shaped clay flowers, custom-to-your-palette designs, and stitched
  attention to detail. Ideal future home for process photography (current gap).
- **Why Brides Choose Us** — scannable objection-handling for skimmers; four brass-icon
  pillars, centered.
- **Collections** — the primary browse-to-buy gateway; cards link to real collection
  pages whose CTAs pre-fill the consultation (`?interest=`).
- **Real Wedding Inspiration** — let her imagine her own day; editorial cards, minimal
  text, invitation for past brides to submit.
- **Reviews** — real, named, schema-backed only. Never invented.
- **Journal** — authority + SEO + return visits for a 12–18 month consideration cycle.
- **Email Capture** — the low-commitment "yes" for browsers not ready to inquire.
- **Final CTA → Consultation** — the primary conversion; everything above makes this
  click feel inevitable.
