# Ivory & Bloom — Website 2.0 Roadmap

Derived from [`ivory-bloom-website-audit.md`](./ivory-bloom-website-audit.md). This is a planning document — no website files have been changed yet.

---

## Current Scores

| Category | Score |
|---|---|
| **Overall** | **71 / 100** |
| Visual Design | 88 / 100 |
| UX | 78 / 100 |
| Mobile Experience | 74 / 100 |
| SEO | 64 / 100 |
| Conversion Optimization | 62 / 100 |
| Performance | 58 / 100 |

Visual craft is the clear strength. Performance and conversion architecture are the clear ceiling.

---

## Critical Issues (fix first — actively losing business)

1. **Contact form doesn't deliver.** `js/contact.js:11` still points at a placeholder Formspree endpoint (`YOUR_FORM_ID`). Every consultation inquiry submitted today is silently lost.
2. **No on-site purchase or lead capture.** All "Shop" and product CTAs exit straight to Etsy — no cart, no checkout, no email capture before the visitor leaves the domain.
3. **6.9MB of unoptimized images**, no responsive `srcset`, no WebP/AVIF — directly hurts Core Web Vitals and mobile load time.

## High Priority Issues

4. **Hero carousel likely defeats its own lazy-loading** — all 7 slides sit at the same absolutely-positioned box, so `loading="lazy"` may not actually prevent eager loading of ~2MB of hero imagery.
5. **Contact form has no visible field labels** — placeholder-as-label fails WCAG guidance and has weak contrast.
6. **No AggregateRating/Review schema** despite showing "4.9/5 · 246 reviews" on the homepage — a missed rich-snippet opportunity.
7. **No `og:image`/`twitter:card` on any journal post** — shares (especially to Pinterest) show no preview image.
8. **No newsletter or lightweight lead capture** — the only conversion path is a full consultation form, with nothing for early-stage browsers.

*(Full Medium/Minor findings — 14 additional issues — are in the audit doc.)*

---

## Recommended Implementation Order

**Phase 1 — Stop the leak** *(Week 1)*
Wire up the real Formspree endpoint and verify delivery. Fix the sitemap/canonical mismatch on the journal hub. Add `og:image` + `twitter:card` to all 6 journal posts.

**Phase 2 — Performance foundation** *(Weeks 1–2)*
Convert images to WebP with JPEG fallback; add responsive `srcset`/`sizes`; add `width`/`height` to every `<img>`; restructure the hero slider to eagerly fetch only the active + next slide; delete ~2.4MB of unused image assets.

**Phase 3 — Accessible forms & structure** *(Week 2)*
Add visible labels to all contact fields, raise placeholder contrast, fix the heading-level skip on atelier cards, enlarge sub-44px tap targets.

**Phase 4 — Structured data & rich results** *(Week 3)*
Add AggregateRating/Review schema, BreadcrumbList on journal posts, LocalBusiness schema (supports the "handmade in Virginia" local-SEO angle).

**Phase 5 — Information architecture cleanup** *(Weeks 3–4)*
Merge or clearly differentiate the Collections grid and Atelier Cards grid; standardize pricing display across all category cards; realign nav order with on-page section order.

**Phase 6 — Content depth** *(Weeks 4–5)*
Add a Ring Bearer Accessories category/gallery tag/journal post and a Personalized Keepsakes/Gifts category; publish an FAQ section (turnaround, customization, shipping, care) with FAQPage schema.

**Phase 7 — Lead capture & nurture** *(Week 5)*
Add a lightweight newsletter signup (e.g. a style-guide download) distinct from the full consultation form, for visitors not yet ready to submit a project brief.

**Phase 8 — Conversion polish** *(Week 6)*
Add lead-time/made-to-order messaging near every CTA; reconcile the two inline-styled outline buttons into the existing `.btn-outline-dark` class; evaluate an "as seen in" trust row if credentials support one.

**Phase 9 — Brand & visual refinement** *(Weeks 6–7)*
Decide the fate of the Theme Customizer (retire, or reframe as a mood-palette preview); trim Google Fonts to weights actually used; reconcile homepage/journal spacing and type scale into one shared system.

**Phase 10 — Performance & code hardening** *(Weeks 7–8)*
Minify/bundle CSS and JS; add a custom 404 page; confirm cache-control headers in `.htaccess`; re-run Lighthouse/PageSpeed and a WCAG pass to confirm score movement; formalize the README's manual QA steps into a repeatable checklist.

---

## Status

Awaiting approval before any implementation begins. Once approved, work should proceed phase by phase — each phase is scoped to be independently shippable.
