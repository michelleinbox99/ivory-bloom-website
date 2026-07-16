# Ivory & Bloom Atelier — Growth & Marketing Playbook

The operating manual for growing the atelier after launch. Builds on
[seo-growth-strategy.md](seo-growth-strategy.md) (keyword map, schema,
E-E-A-T) — this document adds the content calendar, channel systems,
email flows, conversion priorities, and seasonal cadence.

**Honesty note:** targets like "+300% traffic" can't be promised — what
this playbook does is set up the measurement (GA4 + Search Console per
docs/launch-services.md), the baseline, and the weekly motions that
compound. Everything here is executable by one person in ~5 focused
hours/week.

---

## Phase 1 — SEO Content Engine (the Journal)

Cadence: **2 posts/month.** Every post: BlogPosting + BreadcrumbList
schema (pattern already live), author byline "Michelle" linked to
/about.html, links UP to its pillar and OUT to its collection, one
2:3 Pinterest-ready image.

### Next 12 articles (priority order)

| # | Working title / slug | Target keyword | Links to | FAQ angle | Pinterest pin title |
|---|---|---|---|---|---|
| 1 | Bridesmaid Proposal Box Ideas She'll Actually Keep — `bridesmaid-proposal-box-ideas` | bridesmaid proposal box ideas (high intent) | /collections/proposal-box.html | "What goes in a proposal box?" | "What to Put in a Bridesmaid Proposal Box (That Isn't Junk)" |
| 2 | What Are Everlasting Clay Flowers? — `what-are-everlasting-clay-flowers` | clay flowers wedding | /collections/flower-crowns.html, /our-craft.html | "Do clay flowers look real?" | "The Wedding Flowers That Never Wilt" |
| 3 | Flower Girl Basket Alternatives — `flower-girl-basket-alternatives` | flower girl basket alternatives | /collections/flower-girl-sets.html (petal pouch) | "What can a flower girl carry instead of a basket?" | "7 Flower Girl Basket Alternatives Brides Love" |
| 4 | Flower Girl Gift Ideas by Age — `flower-girl-gift-ideas` | flower girl gifts (transactional) | headband PDP, flower-girl-sets | "What do you give a 4-year-old flower girl?" | "Flower Girl Gifts She'll Keep Forever, by Age" |
| 5 | Wedding Color Palettes by Season — `wedding-color-palettes-by-season` | wedding color palettes 2027 | matched-to-your-palette, choosing-your-shade (pillar) | "How do I pick wedding colors?" | "Wedding Color Palettes by Season: A Maker's Guide" |
| 6 | Getting-Ready Photos: What to Have on Hand — `getting-ready-photo-checklist` | getting ready wedding photos | scrunchie set, bridesmaid collection | "What do bridesmaids wear getting ready?" | "The Getting-Ready Checklist Photographers Wish You Had" |
| 7 | Ring Bearer Pillow Alternatives — `ring-bearer-pillow-alternatives` | ring bearer pillow alternatives | /collections/ring-bearer-accessories.html | "What can a ring bearer carry?" | "Ring Bearer Ideas Beyond the Pillow" |
| 8 | Wedding Keepsakes That Actually Last — `wedding-keepsakes-that-last` | wedding keepsake ideas | personalized-keepsakes, headband PDP | "What's worth keeping from a wedding?" | "Wedding Keepsakes Your Daughter Will Want Someday" |
| 9 | How to Ask Your Bridesmaids (Timeline + Etiquette) — `how-to-ask-bridesmaids` | how to ask bridesmaids | proposal-box PDP | "When do you ask your bridesmaids?" | "When (and How) to Ask Your Bridesmaids" |
| 10 | Lavender Wedding Ideas — `lavender-wedding-ideas` | lavender wedding theme | lavender crown PDP block, flower-crowns | "What colors go with lavender?" | "A Lavender Wedding, Down to the Crown" |
| 11 | What to Put in Bridesmaid Gift Bags — `bridesmaid-gift-bag-ideas` | bridesmaid gift ideas | bridesmaid collection, scrunchies | "How much to spend per bridesmaid?" | "Bridesmaid Gifts Under $50 That Feel Expensive" |
| 12 | Heirloom Wedding Accessories: A Buyer's Guide — `heirloom-wedding-accessories-guide` | heirloom wedding accessories | shop.html, about.html | "What makes something an heirloom?" | "How to Buy Wedding Pieces That Outlast the Day" |

Article template (already the house pattern): SEO title ≤60 chars ·
meta description ≤155 with keyword + invitation, not urgency · 2:3
featured image with descriptive filename · 2-question FAQ block with
FAQPage schema · CTA = quiet consultation or collection link
("invites rather than urges").

## Phase 2 — Pinterest System (primary discovery channel for bridal)

- **Claim the domain** in Pinterest Business → enables Rich Pins
  (Product schema is already live on PDPs — product pins get live
  price automatically).
- **Boards (8):** Flower Girl Ideas · Bridesmaid Proposal & Gifts ·
  Bridal Accessories · Wedding Color Palettes · Lavender & Garden
  Weddings · Everlasting Flowers · Real Weddings: Ivory & Bloom ·
  Getting Ready.
- **Cadence:** 5 pins/week (3 product/lifestyle, 2 journal). Every
  journal post yields 2–3 pin variants (different image crop + title).
- **Pin anatomy:** 2:3 image → keyword-front-loaded title (see table
  above) → description = 2 sentences with long-tail keyword + soft CTA
  → link to the *specific* PDP or article, never the homepage.
- **Seasonal pushes:** pin 45–60 days ahead of the season (Pinterest
  planning lead time): March for summer weddings, September for
  spring proposals ("will you be my bridesmaid" peaks Dec–Feb —
  proposal box pins start November).
- Tag ID slot already wired: `pinterestTagId` in js/config.js
  (consent-gated).

## Phase 3 — Instagram (@shopivoryandbloom)

Pillars (weekly rotation, 3–4 posts + 2 stories/week):
1. **Hands making things** (reels of shaping petals/stringing pearls —
   the single highest-trust content type for this brand)
2. **Finished-piece editorial** (product on parchment/linen, brand palette)
3. **Real weddings / customer photos** (with permission, tag the bride)
4. **Quiet expertise** (carousel versions of journal tips)

House rules: captions in first person, name materials, no discount
language ever; alt text on every post; hashtag set = 5 niche
(#flowergirlcrown #bridesmaidproposalbox #everlastingflowers
#handmadebridal #weddingkeepsake) + 3 broad; CTA is "link in bio →
the exact PDP," rotate the link with the pillar. Highlights: How It's
Made · Colors · Flower Girls · Reviews · FAQ.

## Phase 4 — Email (Klaviyo, key already slotted in config.js)

Flows to build in Klaviyo's dashboard, in priority order:
1. **Welcome (3 emails):** the founder story → how color matching
   works → the signature pieces. No discount; the gift is the
   *free color-matching* offer.
2. **Browse/cart follow-up (1 email, 24h):** "Still thinking about
   [piece]? Here's how it's made." (Klaviyo onsite tracking provides
   this once the key is live.)
3. **Post-purchase (3):** confirmation warmth → care instructions for
   their exact piece → 3 weeks later, the review request (this is how
   the headband gets its first real reviews).
4. **Wedding countdown:** collect wedding date at consultation/checkout
   (add optional field later) → timeline-triggered notes ("6 weeks out:
   who's carrying what?").
5. **Anniversary (1 year):** "A year ago your pieces walked down the
   aisle" → keepsake/gift angle. This is the CLV engine for a
   once-in-a-lifetime purchase brand — anniversaries, vow renewals,
   and *her friends' weddings*.
Segments: wedding date · collection interest (which PDP they browsed) ·
purchased vs. inquired. Referral mechanic that fits the brand: "give
your bridesmaids' future weddings a gift" — personal code in the
post-purchase flow, not a points program (points/VIP tiers read as
mall-brand, conflict with atelier positioning — deliberately skipped).

## Phase 5 — Conversion priorities (most already live)

Live already: trust badges band, real 1,500+ review proof, shipping
transparency + free-shipping progress bar, gift packaging add-on,
cross-sells ("You May Also Love"), recently viewed, wishlist, sticky
mobile cart bar, honest lead-time messaging.

Remaining, in expected-impact order:
1. **Real product photography for add-ons** (mug, scrunchies currently
   reuse Instagram shots) — photography is the #1 conversion lever for
   luxury.
2. **Wedding-date field at checkout** (optional) — powers countdown
   flow + rush-order triage.
3. **Bundle framing:** "complete the flower girl" (headband + petal
   pouch) as a suggested pair on both PDPs — no discount needed,
   convenience is the offer.
4. **Deliberately NOT doing:** exit-intent popups and countdown timers —
   they directly violate the brand rule ("invites rather than urges");
   an exit popup on a $185 heirloom purchase cheapens the exact trust
   the price depends on.

## Phases 6–12 — Roadmap (needs platforms/backend; do not fake)

| Item | Unlocks at |
|---|---|
| Order tracking, accounts, wedding dashboard | WooCommerce migration |
| Loyalty points / VIP tiers | Skipped by brand decision (see Phase 4) |
| Photo/video review collection | Post-purchase flow (Phase 4.3) + Etsy imports |
| Analytics dashboard | GA4 + Search Console (launch-services.md) — review monthly: sessions, top landing pages, conversion to order-request, AOV from order emails |
| Wholesale/planner portal, gift cards, registry | WooCommerce phase |
| Google Merchant Center / Pinterest Shopping | Needs live checkout (Stripe links) first |
| Etsy cross-sell | Live today: keep Etsy for ready-made, site for custom — links already in place both directions |

## The weekly rhythm (the whole system in 5 hours)

- **Mon (1h):** 1 journal post drafted or published (alternating weeks)
- **Tue (30m):** 5 pins scheduled from existing images/posts
- **Wed (1h):** 1 reel (hands making things) + 1 story
- **Thu (30m):** answer inquiries; note recurring questions → future FAQ/article
- **Fri (1h):** email flow building (until done), then campaign/segment review
- **Monthly (1h):** GA4/Search Console review; update bestseller flags in products.js to match reality
