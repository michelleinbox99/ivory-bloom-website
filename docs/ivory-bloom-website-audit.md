# Ivory & Bloom Atelier — Website Audit

**Scope:** UX, Visual Design, Accessibility, Performance, SEO, Conversion Optimization, Code Quality
**Site:** ivoryandbloom.shop
**Date:** July 11, 2026
**Pages reviewed:** 8 of 8 (homepage + 6 journal posts + journal index)
**Status:** Diagnosis only — no code changes made

A cross-functional review of the live site (`index.html`, the seven-page journal, and all supporting CSS/JS/assets) against the standard a premium, handmade bridal brand should hold itself to.

---

## 1. Scorecard

| Category | Score |
|---|---|
| **Overall** | **71 / 100** |
| Visual Design | 88 / 100 |
| UX | 78 / 100 |
| Mobile Experience | 74 / 100 |
| SEO | 64 / 100 |
| Conversion Optimization | 62 / 100 |
| Performance | 58 / 100 |

---

## 2. Executive Summary

Visually, this is one of the stronger handmade-brand sites we'd expect to see at this scale — the Cormorant/Jost pairing, the cinematic hero, the restrained brass-and-espresso palette, and the editorial gallery all read as considered, not templated. Copy voice is consistent and warm throughout, and alt text, unique page titles, and form validation are all handled to a standard most small-business sites skip entirely.

Three things are quietly capping the ceiling:

1. **The consultation form doesn't deliver.** The site's only lead-capture mechanism is wired to a placeholder Formspree endpoint, so every inquiry submitted today disappears silently.
2. **Every purchase path leaves the site.** All "Shop" and product CTAs exit directly to Etsy; there is no on-site cart, checkout, or email capture, so the site functions as a beautiful brochure funneling 100% of purchase intent off-domain.
3. **~6.9MB of unoptimized, non-responsive images** (with no `width`/`height` attributes) sit on a hero-driven homepage, which will show up directly in Core Web Vitals and mobile load time.

None of these are large rebuilds. They're the difference between a site that *looks* premium and one that also performs and converts like it.

### By the numbers

| Metric | Value |
|---|---|
| Total image weight | 6.9 MB |
| Unused / dead image assets | ~2.4 MB |
| Images with width/height set | 0 of 60+ |
| Journal posts with `og:image` | 0 of 6 |
| Pages with `twitter:card` | 0 of 8 |
| Google Font weight variants loaded | 10 |
| CSS + JS files (unminified) | 12 |
| Contact form delivery | Not connected |
| On-site checkout | None (Etsy only) |
| Newsletter / lead capture | None |

---

## 3. Prioritized Findings

### Critical (3)

**1. The contact form does not deliver inquiries** — *Conversion*
The only lead-capture mechanism on the site posts to a placeholder Formspree endpoint. Every visitor who fills it out today sees a friendly confirmation or error, but the message is never delivered.
*Where:* `js/contact.js:11` — `FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'`

**2. Every purchase path leaves the site, with nothing captured first** — *IA / Conversion*
"Shop," every gallery item, every collection card, and both banner CTAs link out to Etsy. There is no on-site cart, checkout, or product page, and no email is captured before the visitor leaves the domain — the site can't retarget, nurture, or measure purchase intent it generates.
*Where:* `index.html` — 15 outbound Etsy links across `#shop`, `#collections`, gallery, footer

**3. 6.9MB of images with no responsive sizing and no next-gen formats** — *Performance*
Every image ships as a single full-size JPEG with no `srcset`/`sizes` and no WebP/AVIF fallback. A phone on a hotel wifi connection researching flower girl baskets downloads the same 300–550KB files a 4K desktop would.
*Where:* `index.html` — all `<img>` tags; `/images/*.jpg`

### High (5)

**4. The hero carousel likely defeats its own lazy-loading** — *Performance*
All 7 hero slides are absolutely positioned at the same box (`inset: 0`). Because "offscreen" is a geometric heuristic, browsers may treat every slide as immediately visible and fetch the full ~2MB of hero imagery on load, regardless of the `loading="lazy"` attribute on slides 2–7.
*Where:* `css/03-hero.css:9-10`; `index.html:107-219`

**5. Contact form fields have no visible labels** — *Accessibility*
Name, Email, Service, and Message rely on placeholder text plus `aria-label` only. Placeholders vanish the moment someone types, fail WCAG's guidance against placeholder-as-label, and sit at a contrast ratio (`#A8988B` on white) that's hard to read even before typing starts.
*Where:* `index.html:497-522`

**6. No review/rating structured data despite displaying reviews prominently** — *SEO*
The homepage shows "4.9/5 · 246 reviews" front and center, but there's no `AggregateRating` or `Review` schema, so none of that social proof is eligible to show as a star rating in Google search results.
*Where:* `index.html:556-580` (reviews-strip, no accompanying schema)

**7. No social preview image on any journal post** — *SEO*
Only the homepage sets `og:image`; none of the 6 journal posts do, and no page anywhere sets a `twitter:card`. For a highly visual brand whose own footer links to Pinterest, sharing a journal post today produces a text-only link preview.
*Where:* `journal/*.html` — 0 of 6 posts

**8. No newsletter or lightweight lead capture** — *Conversion*
Wedding accessory shopping is a long-consideration purchase (often 12–18 months out). The only conversion path is a full consultation form; there's nothing for a visitor who's browsing early and isn't ready to submit a project brief yet.
*Where:* Site-wide — no email capture field exists

### Medium (9)

**9. Two sections cover nearly the same ground** — *IA*
The "Collections" grid (4 cards) and "Explore Every Collection" atelier grid (5 cards) both browse-by-category with different visual treatments, adding scroll length without new information. Nav order (Shop, then Collections) also doesn't match the order the sections actually appear on the page.
*Where:* `index.html:259-314` vs. `402-460`

**10. Ring bearer accessories and personalized keepsakes are named specialties with no content** — *IA / SEO*
Neither category appears anywhere — not in the gallery filters, the collection grids, or the journal — despite being part of the brand's core positioning. That's both a missed on-site merchandising opportunity and unclaimed search territory.
*Where:* Site-wide — no matches for "ring bearer" or "keepsake" as a category

**11. Sitemap and canonical tag disagree on the journal hub's URL** — *SEO*
`sitemap.xml` lists `.../journal/`, while the page itself declares its canonical as `.../journal/index.html`. Small, but it's exactly the kind of mismatch that splits ranking signals between two URL forms of the same page.
*Where:* `sitemap.xml:4`; `journal/index.html:8`

**12. ~2.4MB of unused images live in the repo** — *Code Quality*
Six pouch-color swatches, four generic `hero-N.jpg` files, and three `journal-*.jpg` files aren't referenced from any page. Dead weight today, and a trap for a future edit that assumes they're live.
*Where:* `/images/pouch-*.jpg`, `hero-1.jpg`–`hero-4.jpg`, `journal-embrace.jpg`, `journal-bridesmaids.jpg`, `journal-flowergirls.jpg`

**13. Heading hierarchy skips a level** — *Accessibility / SEO*
Atelier collection cards jump straight to `<h4>` under a section `<h2>`, with no `<h3>` in between — a real (if minor) screen-reader navigation snag.
*Where:* `index.html:424, 434, 444, 454, 464` (`<h4>` inside `.atelier-card-body`)

**14. Inline styles duplicate an existing button class** — *Code Quality*
Two "outline" CTAs carry hand-written inline styles that just re-implement the existing `.btn-outline-dark` rule — contradicting the README's own "structure + content only, no inline CSS" architecture note and giving the codebase two divergent ways to build the same button.
*Where:* `index.html:311, 639`

**15. The Theme Customizer lets any visitor repaint the brand** — *Visual Design*
A neat engineering feature, but worth a deliberate decision: a luxury brand's palette is usually part of its trust signal, and a raw "switch the site's brand colors" widget cuts against that tight identity. If it stays, it should be reframed (e.g. a wedding "mood palette" preview) rather than exposed as a literal theme switcher.
*Where:* `js/customizer.js`; `css/07-customizer.css`

**16. 10 font weight/style variants loaded for 2 families** — *Performance*
Cormorant loads 6 weight/style combinations and Jost loads 4, across a render-blocking third-party request — more variety than the page's own type scale actually uses.
*Where:* `index.html:39` (Google Fonts URL)

**17. No FAQ content anywhere on the site** — *SEO / Conversion*
Turnaround time, the customization process, shipping windows, and care instructions are exactly the questions a consultation-form submitter is asking before they'll commit — and exactly the kind of content that earns FAQ rich results in search.
*Where:* Site-wide — no FAQ section or schema

### Minor (5)

**18. Two tap targets sit under the 44×44px guideline** — *Mobile / Accessibility*
The hamburger icon (~26×21px visual area) and the back-to-top button (40×40px) are both a bit tight for a comfortable thumb tap.
*Where:* `css/02-header-nav.css:80`; `css/06-footer.css:38`

**19. No breadcrumb navigation or schema on journal posts** — *SEO / IA*
Each post links "back" only via the header logo or Journal nav item — there's no breadcrumb trail, and no `BreadcrumbList` markup for search result display.
*Where:* `journal/*.html`

**20. Pricing is inconsistent between the two collection sections** — *Conversion*
The Collections grid shows "From $48" style pricing; the visually similar Atelier Cards grid (bouquets, boutonnieres, bridesmaid collection) shows none at all.
*Where:* `index.html:267-308` vs. `409-460`

**21. No custom 404 page** — *Code Quality*
Not present in the file tree — a broken or mistyped link currently falls back to the host's default error page.
*Where:* Repo root

**22. CSS and JS ship unminified, as 12 separate requests** — *Performance*
Deliberate per the README (each numbered file maps to a concern), but worth bundling/minifying for production once the file layout stabilizes.
*Where:* 7 CSS files + 5 JS files loaded individually

---

## 4. Category Notes

Shorter observations that round out the findings above but didn't independently rank as standalone issues.

### Information Architecture
- Single-page homepage with anchor navigation is appropriate at this catalog size — no need for a multi-page shop yet.
- Journal is well-organized: unique titles/descriptions per post, working client-side pagination, sensible related-post links.
- Footer navigation duplicates header navigation exactly — fine, but a "Shipping & Care" or "FAQ" link would add real new footer value.

### Visual Design
- Type pairing (Cormorant display / Jost body) and the espresso-brass-terracotta palette are cohesive and genuinely feel luxury, not generic-elegant.
- Micro-interactions (hover reveals, Ken Burns hero, gallery caption fades) are tasteful and restrained, not overdone.
- Spacing rhythm is consistent section-to-section on the homepage; the journal's separate `blog.css` uses a slightly different scale, which is noticeable if you move between the two.

### User Experience
- Mobile menu, hero swipe gestures, and keyboard hero navigation are all implemented — above the bar for a static site.
- Contact form has good live validation and honeypot spam protection; the only gap is the missing endpoint (see Critical).
- `prefers-reduced-motion` is respected consistently across hero, reveals, and the journal — a genuinely nice accessibility touch most sites skip.

### Performance
- `fetchpriority="high"` is correctly set on the LCP hero image — good instinct, undermined by the image's raw file size.
- No explicit `width`/`height` on any `<img>` across the entire site risks layout shift (CLS) as each image loads in.
- Scripts are correctly deferred to the end of `<body>`, so JS isn't blocking first paint.

### SEO
- Every page has a unique, well-written title and meta description — genuinely uncommon to see done this consistently.
- Alt text throughout is descriptive and specific, not decorative filler — a real strength for image search.
- `robots.txt` and `sitemap.xml` are both clean and correctly linked; sitemap could add `<lastmod>` dates for freshness signals.

### Conversion Optimization
- Trust strip (hand-stitched, free color matching, made to order, ships worldwide) is well-placed directly under the hero.
- Reviews strip is real and specific (named reviewers, verifiable Etsy link) rather than generic testimonial copy.
- No lead-time or made-to-order turnaround messaging appears near any CTA — for handmade goods, "when will this arrive" is often the actual objection stopping a click.

### Code Quality
- Numbered CSS files and documented load order (README ADR-2) make the cascade easy to reason about for a small static site.
- Honeypot + client-side validation in `contact.js` is clean, readable, and appropriately commented.
- `journal/blog.css` intentionally duplicates design tokens from `css/01-base.css` (documented as ADR-3) — workable today, but a rebrand requires remembering to edit both files.

---

## 5. Next Steps

No files have been modified. See [`website-2.0-roadmap.md`](./website-2.0-roadmap.md) for the phased implementation plan derived from these findings.
