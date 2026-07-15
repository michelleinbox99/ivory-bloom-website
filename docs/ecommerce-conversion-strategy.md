# Ivory & Bloom Atelier — Ecommerce Conversion Strategy (UX Blueprint)

Approved blueprint. Status tags: **[LIVE]** shipped · **[ENHANCE]** exists but weak ·
**[GAP]** missing. Companion: `design-system.md`, `homepage-wireframe.md`,
`seo-growth-strategy.md`.

## Shopping journey vs. current site

| Stage | Need | Status |
|---|---|---|
| Visitor lands | "Is this for a wedding like mine?" | Strong — hero, trust strip, founder story |
| Product discovery | Browse by what they're shopping for | Strong — Collections index + 7 category pages |
| Trust | "Can I trust a one-woman atelier?" | Good but uneven — **no reviews on product pages** |
| Customization | "My colors, my party?" | Good — shade chips, free color match, made-to-order |
| Purchase | Commit via consultation, not cart | Good — `?interest=` prefill + lead-time messaging |

**Verdict:** the funnel is structurally complete. The conversion gaps are all in **Trust**
and **final Purchase** — proof at the point of decision, and reassurance right before the click.

## Product-page anatomy (marked against what's live)

1. Page hero (eyebrow · H1 · price line) — **[LIVE]**
2. Product storytelling (split image + craft narrative + checklist) — **[LIVE]**
3. Customization options (shade chips + free color match) — **[LIVE]**; **[ENHANCE]** visual named-swatch strip, monogram note where true
4. Product photography (lookbook strip) — **[LIVE]**; **[GAP]** real detail-macro + process shots + per-SKU photography
5. Reviews per collection (2–3 filtered + aggregate) — **[GAP]**, content-gated (highest ROI)
6. Shipping / made-to-order confidence (lead-time note) — **[LIVE]**; **[ENHANCE]** a compact "what to expect" trust row
7. Contextual FAQ (2–3 category Q&As + FAQPage schema) — **[GAP]**
8. CTA row (Begin Your Custom Order + quiet Etsy) — **[LIVE]**
9. Related products (cross-sell trio) — **[LIVE]**

### Four real gaps, ranked by impact
1. **Per-collection reviews** — proof at decision. Content-gated on the Love Notes effort.
2. **Real product & process photography** — the #1 content gap (see design-system.md).
3. **Contextual FAQ blocks + FAQPage schema** — pure build, no content dependency. Do first.
4. **Shipping-confidence trust row** — pure build, quick win.

## CTA strategy
- Primary everywhere: "Begin Your Custom Order" → product-aware consultation.
- Max three CTAs per page (luxury restraint): early (price+CTA), mid (after proof), cross-sell.
- Micro-reassurance under every primary CTA: lead-time line (live) + **[GAP]** "quote first, no obligation."
- **[GAP, optional]** sticky mobile "Begin Your Custom Order" bar on long collection scrolls.

## Collections & wedding categories
- **[ENHANCE]** "Shop by Wedding Role" (Bride/Bridesmaids/Flower Girl/Ring Bearer) and a "Gifts" lens — merchandising re-cuts of existing pages, good for UX + SEO.
- **[ENHANCE]** "Build Your Bridal Party Set" guided path → one richer, higher-value consultation.

## Email capture & reassurance
- **[LIVE]** Style Notes newsletter. **[ENHANCE]** add a lead magnet — a downloadable "Wedding Color & Shade Guide" (converts better than "subscribe," ties to SEO).
- Reassurance stack: made-to-order trust row + "quote first, no obligation" + maker's reassurance (live on About) + per-page reviews. Together these dismantle the "custom = risky" objection.

## Recommended build order (all pure-code, no content dependency)
① contextual FAQ + FAQPage schema on collection pages → ② shipping-confidence trust row →
③ "no obligation, quote first" CTA note → ④ per-collection review component (activate when reviews land) →
⑤ "Shop by Role / Gifts" merchandising cuts.
