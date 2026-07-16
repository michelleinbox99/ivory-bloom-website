/* ============================================================
   Ivory & Bloom Atelier — Product Catalog
   Signature ready-to-order pieces available for direct purchase.
   Custom/bespoke work still routes through the consultation flow.

   Shape is WooCommerce-migration-ready: `sku`/`slug` map to WC
   product identity, `variants` to attributes, `tags` to product
   tags, `seoTitle`/`seoDescription` to Yoast fields, and the
   editorial copy blocks (story/features/materials/care) to the
   long description. `bestseller`/`isNew` drive merchandising
   (badges, sorts, homepage strips). Every `image` is a real
   photograph from images/ — add new products only when a real
   photo exists for them. `salePrice` (optional) is shown struck
   through against `price` when present; none are on sale today.

   Prices marked PLACEHOLDER below are anchored to neighboring
   pieces but not yet confirmed by the atelier.
   ============================================================ */

(function () {
  'use strict';

  var SHIPPING_NOTE = 'Made to order in Gainesville, Virginia. Current lead time 2–3 weeks, then ships worldwide.';

  var products = [
    {
      id: 'flower-girl-headband-001',
      sku: 'IB-FG-HB-001',
      slug: 'flower-girl-headband',
      name: 'Ivory Garden Heirloom Flower Girl Headband',
      collection: 'Flower Girl Collection',
      category: 'Flower Girl Collection',
      price: 185,
      seoTitle: 'Ivory Garden Heirloom Flower Girl Headband | Ivory & Bloom Atelier',
      seoDescription: 'A handcrafted floral heirloom headband for flower girls — personalized with her name and your wedding date.',
      url: 'collections/flower-girl-headband.html',
      image: 'images/flowergirl-set.jpg',
      altText: 'Ivory Garden heirloom flower girl headband with hand-shaped everlasting florals and pearls',
      shortDescription: 'A handcrafted floral heirloom designed for the little moments that become lifelong memories.',
      story: 'She will wear it for one walk down one aisle — and keep it for every anniversary after. Each bloom is shaped by hand, petal by petal, so the headband she wore at five is still whole when she shows it to her own flower girl someday.',
      features: ['Hand-shaped everlasting florals', 'Freshwater pearl accents', 'Adjustable silk or velvet ribbon tie', 'Personalized with her name and your date'],
      materials: 'Air-dry clay florals, freshwater pearls, satin and velvet ribbon',
      care: 'Store lightly stuffed in its keepsake box, away from moisture and prolonged direct sun.',
      shipping: SHIPPING_NOTE,
      personalization: ['Flower girl name', 'Wedding date', 'Gift note'],
      variants: [{ name: 'Ivory' }, { name: 'Blush' }, { name: 'Sage' }],
      ribbons: ['Silk Ribbon', 'Velvet Ribbon'],
      sizes: ['Toddler', 'Child', 'Custom'],
      personalizable: true,
      tags: ['flower girl', 'headband', 'heirloom', 'personalized', 'ivory', 'blush', 'sage', 'ceremony', 'keepsake'],
      bestseller: true,
      inventory: true
    },
    {
      id: 'proposal-box-signature',
      sku: 'IB-PR-BX-001',
      slug: 'proposal-box',
      name: 'Signature Proposal Box',
      collection: 'Wedding Proposal Collection',
      category: 'Bridesmaid Collection',
      price: 96.99,
      seoTitle: 'Signature Bridesmaid Proposal Box | Ivory & Bloom Atelier',
      seoDescription: 'A keepsake bridesmaid proposal box in your palette — build it with handmade satin scrunchies, a personalized mug, and everlasting flowers.',
      url: 'collections/proposal-box.html',
      image: 'images/bridesmaids-pastel.jpg',
      altText: 'Bridesmaids in pastel dresses — the Signature Proposal Box is matched to your palette',
      shortDescription: 'The “will you be my bridesmaid?” moment, boxed — a keepsake box in your palette, ready to build with handmade touches.',
      story: 'Asking is its own little ceremony. The box arrives in her color, filled with pieces made by the same hands that will make her wedding-day accessories — so the question and the day match.',
      features: ['Keepsake box in your palette', 'Build-your-box handmade add-ons', 'Handwritten gift note card included'],
      materials: 'Rigid keepsake box, satin lining, hand-tied ribbon',
      care: 'The box is the keepsake — wipe gently with a dry cloth.',
      shipping: SHIPPING_NOTE,
      personalization: ['Her name', 'Gift note'],
      variants: [{ name: 'Ivory' }, { name: 'Blush' }, { name: 'Sage' }],
      tags: ['proposal', 'bridesmaid', 'gift box', 'will you be my bridesmaid', 'personalized', 'gift'],
      bestseller: true,
      inventory: true
    },
    {
      id: 'flower-girl-set-ivory-garden',
      sku: 'IB-FG-SET-001',
      slug: 'flower-girl-set',
      name: 'Ivory Garden Flower Girl Set',
      collection: 'Flower Girl Collection',
      category: 'Flower Girl Sets',
      price: 85,
      seoTitle: 'Ivory Garden Flower Girl Set — Crown & Petal Pouch | Ivory & Bloom Atelier',
      seoDescription: 'A hand-shaped everlasting crown and pearl-handle petal pouch for flower girls ages three to eight, made to order in your palette.',
      url: 'collections/flower-girl-sets.html',
      image: 'images/hero-flowergirl-garden.jpg',
      altText: 'Flower girl wearing the Ivory Garden set — everlasting crown and pearl-handle petal pouch — in a garden',
      shortDescription: 'A hand-shaped everlasting crown and pearl-handle petal pouch, sized for ages three to eight.',
      story: 'The set she carries down the aisle — and keeps long after. Built to survive a five-year-old, made beautiful enough for the photographs her family will frame.',
      features: ['Everlasting crown with adjustable ribbon ties', 'Spill-resistant pearl-handle petal pouch', 'Sized for ages three to eight'],
      materials: 'Air-dry clay florals, duchess satin, freshwater pearls, ribbon',
      care: 'Store the crown flat and the pouch lightly stuffed; keep dry.',
      shipping: SHIPPING_NOTE,
      personalization: ['Colorway matched to your palette'],
      variants: [{ name: 'Ivory Classic' }, { name: 'Blush Garden' }, { name: 'Champagne Bloom' }],
      tags: ['flower girl', 'set', 'crown', 'petal pouch', 'basket', 'ivory', 'blush', 'champagne', 'ceremony'],
      bestseller: true,
      inventory: true
    },
    {
      id: 'bridal-pouch-pearl-handle',
      sku: 'IB-BR-PCH-001',
      slug: 'bridal-pouch',
      name: 'Pearl-Handle Satin Bridal Pouch',
      collection: 'Bride Collection',
      category: 'Bridal Pouches',
      price: 48,
      seoTitle: 'Pearl-Handle Satin Bridal Pouch | Ivory & Bloom Atelier',
      seoDescription: 'Duchess satin bridal pouch with a hand-strung pearl handle, made to order in Ivory, Blush, or Champagne.',
      url: 'collections/bridal-pouches.html',
      image: 'images/hero-pouch-florals.jpg',
      altText: 'Pearl-handle satin bridal pouch styled with florals on a reception table',
      shortDescription: 'Duchess satin pouch with a hand-strung pearl handle — carried down the aisle, kept for decades.',
      story: 'Every bride carries something. Lipstick, vows, her grandmother’s handkerchief — this is the piece that holds them, sewn in the shade of her dress and strung with pearls one at a time.',
      features: ['Hand-strung pearl handle', 'Duchess satin, self-lined', 'Drawstring closure that holds its gather'],
      materials: 'Duchess satin, glass pearls, cotton lining',
      care: 'Store lightly stuffed to hold its shape; spot-clean only.',
      shipping: SHIPPING_NOTE,
      personalization: ['Colorway matched to your palette'],
      variants: [{ name: 'Ivory' }, { name: 'Blush' }, { name: 'Champagne' }],
      tags: ['bride', 'pouch', 'purse', 'satin', 'pearl', 'ivory', 'blush', 'champagne', 'reception'],
      bestseller: true,
      inventory: true
    },
    {
      id: 'flower-crown-heirloom',
      sku: 'IB-CR-001',
      slug: 'flower-crown',
      name: 'Heirloom Flower Crown',
      collection: 'Bride Collection',
      category: 'Flower Crowns',
      price: 58,
      seoTitle: 'Heirloom Flower Crown — Everlasting Bridal Crown | Ivory & Bloom Atelier',
      seoDescription: 'Everlasting florals shaped petal by petal on an adjustable ribbon-tie band. Ivory & Pearl, Blush Garden, or Sage & Cream.',
      url: 'collections/flower-crowns.html',
      image: 'images/crown-detail.jpg',
      altText: 'Handmade flower crown with pearl and everlasting florals, detail view',
      shortDescription: 'Everlasting florals shaped petal by petal on an adjustable ribbon-tie band.',
      story: 'Fresh flowers wilt by the reception. These are shaped from clay, petal by petal, to catch the light on your walk down the aisle — and to hold their shape long after the fresh ones are gone.',
      features: ['Hand-shaped everlasting florals', 'Adjustable ribbon-tie band — one size, tied to fit', 'Freshwater pearl accents'],
      materials: 'Air-dry clay florals, freshwater pearls, silk ribbon',
      care: 'Store flat in its box; handle by the band, not the blooms.',
      shipping: SHIPPING_NOTE,
      personalization: ['Colorway matched to your palette'],
      variants: [{ name: 'Ivory & Pearl' }, { name: 'Blush Garden' }, { name: 'Sage & Cream' }],
      tags: ['bride', 'crown', 'flower crown', 'boho', 'garden wedding', 'ivory', 'blush', 'sage', 'ceremony'],
      isNew: false,
      inventory: true
    },
    {
      id: 'bridesmaid-satin-pouch',
      sku: 'IB-BM-PCH-001',
      slug: 'bridesmaid-pouch',
      name: 'Bridesmaid Satin Pouch',
      collection: 'Bridesmaid Collection',
      category: 'Bridesmaid Collection',
      price: 44,
      seoTitle: 'Bridesmaid Satin Pouch — Coordinated Party Gift | Ivory & Bloom Atelier',
      seoDescription: 'Coordinated satin bridesmaid pouch dyed to your wedding palette — Ivory, Blush, Champagne, or Sage. Priced per pouch.',
      url: 'collections/bridesmaid-collection.html',
      image: 'images/hero-bridesmaids-pouch-gift.jpg',
      altText: 'Bridesmaids holding coordinated satin pouch gifts',
      shortDescription: 'The coordinated party gift — one satin pouch, dyed to your palette. Order one per bridesmaid.',
      story: 'Six dresses, six shades, one palette — each pouch can match its wearer’s dress exactly or alternate through your colors, in exactly the quantities your party calls for.',
      features: ['Dyed to your palette', 'Order any quantity — priced per pouch', 'Coordinates with flower girl and bridal pieces'],
      materials: 'Duchess satin, cotton lining, ribbon drawstring',
      care: 'Store lightly stuffed; spot-clean only.',
      shipping: SHIPPING_NOTE,
      personalization: ['Colorway per bridesmaid'],
      variants: [{ name: 'Ivory' }, { name: 'Blush' }, { name: 'Champagne' }, { name: 'Sage' }],
      tags: ['bridesmaid', 'pouch', 'gift', 'party', 'satin', 'ivory', 'blush', 'champagne', 'sage'],
      inventory: true
    },
    {
      id: 'hair-flowers-trio',
      sku: 'IB-CR-HF-003',
      slug: 'hair-flowers-trio',
      name: 'Everlasting Hair Flowers, Set of Three',
      collection: 'Bride Collection',
      category: 'Flower Crowns',
      price: 38,
      seoTitle: 'Everlasting Hair Flowers, Set of Three | Ivory & Bloom Atelier',
      seoDescription: 'Three hand-shaped everlasting blooms on pins, worn scattered through an updo. Ivory & Pearl or Blush Garden.',
      url: 'collections/flower-crowns.html',
      image: 'images/crown-editorial.jpg',
      altText: 'Everlasting hair flowers styled through a bridal updo',
      shortDescription: 'Three hand-shaped blooms on pins — worn scattered through an updo or clustered at the nape.',
      story: 'For the bride who wants flowers in her hair without a full crown — three blooms, placed wherever her stylist loves the light.',
      features: ['Three hand-shaped blooms', 'Secure pin backing', 'Wearable together or scattered'],
      materials: 'Air-dry clay florals, freshwater pearls, metal pins',
      care: 'Store in the box provided; handle by the pin.',
      shipping: SHIPPING_NOTE,
      personalization: ['Colorway matched to your palette'],
      variants: [{ name: 'Ivory & Pearl' }, { name: 'Blush Garden' }],
      tags: ['bride', 'hair flowers', 'hair pins', 'updo', 'ivory', 'blush', 'ceremony'],
      isNew: true,
      inventory: true
    },

    /* ---- New pieces (PLACEHOLDER prices — confirm before launch) ---- */
    {
      id: 'flower-girl-petal-pouch',
      sku: 'IB-FG-PP-002',
      slug: 'petal-pouch',
      name: 'Pearl-Handle Petal Pouch',
      collection: 'Flower Girl Collection',
      category: 'Flower Girl Sets',
      price: 38, /* PLACEHOLDER */
      seoTitle: 'Pearl-Handle Petal Pouch for Flower Girls | Ivory & Bloom Atelier',
      seoDescription: 'A spill-resistant satin petal pouch with a pearl handle, sized for small hands — the modern flower girl basket that becomes a keepsake.',
      url: 'collections/flower-girl-sets.html',
      image: 'images/flowergirls-bench.jpg',
      altText: 'Flower girls sitting on a stone bench holding satin petal pouches',
      shortDescription: 'The modern petal basket — spill-resistant, easy for small hands, and a keepsake after the day.',
      story: 'Baskets tip. Pouches don’t. Sized for hands that are still learning to be careful, and lovely enough to hold hair ties for the next ten years.',
      features: ['Spill-resistant structured opening', 'Pearl handle sized for small hands', 'Keepsake after the wedding'],
      materials: 'Duchess satin, glass pearls, cotton lining',
      care: 'Store lightly stuffed; spot-clean only.',
      shipping: SHIPPING_NOTE,
      personalization: ['Colorway matched to your palette'],
      variants: [{ name: 'Ivory' }, { name: 'Blush' }, { name: 'Sage' }],
      tags: ['flower girl', 'petal pouch', 'basket', 'petals', 'ceremony', 'keepsake', 'ivory', 'blush', 'sage'],
      isNew: true,
      inventory: true
    },
    {
      id: 'bridal-crown-lavender',
      sku: 'IB-CR-002',
      slug: 'lavender-crown',
      name: 'Lavender Fields Bridal Crown',
      collection: 'Bride Collection',
      category: 'Flower Crowns',
      price: 68, /* PLACEHOLDER */
      seoTitle: 'Lavender Fields Bridal Crown — Everlasting Lavender | Ivory & Bloom Atelier',
      seoDescription: 'An everlasting lavender crown for garden and vineyard weddings, hand-shaped and pearl-dotted, tied to fit with silk ribbon.',
      url: 'collections/flower-crowns.html',
      image: 'images/bride-lavender-crown.jpg',
      altText: 'Bride wearing an everlasting lavender crown in golden light',
      shortDescription: 'Everlasting lavender and cream blooms for garden and vineyard weddings — tied to fit with silk ribbon.',
      story: 'For weddings the color of late summer — sprigs of everlasting lavender that will never dry out or drop, dotted with pearls where the light lands.',
      features: ['Everlasting lavender sprigs', 'Cream accent blooms with pearls', 'Adjustable silk ribbon tie'],
      materials: 'Air-dry clay florals, freshwater pearls, silk ribbon',
      care: 'Store flat in its box; handle by the band.',
      shipping: SHIPPING_NOTE,
      personalization: ['Accent shade matched to your palette'],
      variants: [{ name: 'Lavender & Cream' }, { name: 'Lavender & Blush' }],
      tags: ['bride', 'crown', 'lavender', 'purple', 'vineyard', 'garden wedding', 'boho', 'ceremony'],
      isNew: true,
      inventory: true
    },
    {
      id: 'satin-scrunchie-set',
      sku: 'IB-BM-SCR-001',
      slug: 'scrunchie-set',
      name: 'Handmade Satin Scrunchie Set',
      collection: 'Bridesmaid Collection',
      category: 'Bridesmaid Collection',
      price: 15.99,
      seoTitle: 'Handmade Satin Scrunchie Set — Bridesmaid Gift | Ivory & Bloom Atelier',
      seoDescription: 'Satin scrunchies sewn from the same fabric as our pouches, matched to your wedding colors — the getting-ready gift your party will actually keep using.',
      url: 'collections/bridesmaid-collection.html',
      image: 'images/insta-1.jpg',
      altText: 'Satin scrunchie set styled in a gift box with roses',
      shortDescription: 'Sewn from the same satin as her pouch, matched to your wedding colors — the getting-ready gift she’ll keep using.',
      story: 'The morning-of photographs deserve better than drugstore elastics. Sewn from the same duchess satin as the pouches, in the same dye lot as your palette.',
      features: ['Set of satin scrunchies', 'Same dye lot as your other pieces', 'Gentle on styled hair'],
      materials: 'Duchess satin, soft elastic core',
      care: 'Hand wash cold, air dry.',
      shipping: SHIPPING_NOTE,
      personalization: ['Colorway matched to your palette'],
      variants: [{ name: 'Ivory' }, { name: 'Blush' }, { name: 'Sage' }],
      tags: ['bridesmaid', 'scrunchie', 'hair', 'getting ready', 'gift', 'satin', 'proposal', 'ivory', 'blush', 'sage'],
      isNew: true,
      inventory: true
    },

    /* ---- Add-ons (ride along with a parent piece; hidden from grids) ---- */
    {
      id: 'gift-packaging-heirloom',
      sku: 'IB-AD-GIFT-001',
      slug: 'gift-packaging',
      name: 'Heirloom Gift Packaging',
      collection: 'Luxury Gift Boxes',
      category: 'Add-Ons',
      price: 12,
      url: 'collections/flower-girl-headband.html',
      image: 'images/insta-2.jpg',
      altText: 'Keepsake gift box with satin lining and hand-tied ribbon',
      shortDescription: 'Satin-lined keepsake box, hand-tied ribbon, and a written note card.',
      description: 'Satin-lined keepsake box, hand-tied ribbon, and a written note card.',
      shipping: SHIPPING_NOTE,
      variants: [{ name: 'Standard' }],
      tags: ['gift', 'packaging', 'keepsake box'],
      addon: true,
      inventory: true
    },
    {
      id: 'proposal-addon-scrunchies',
      sku: 'IB-AD-SCR-001',
      slug: 'proposal-scrunchies',
      name: 'Handmade Scrunchies',
      collection: 'Wedding Proposal Collection',
      category: 'Proposal Box Add-Ons',
      price: 15.99,
      url: 'collections/proposal-box.html',
      image: 'images/insta-1.jpg',
      altText: 'Handmade satin scrunchies in a proposal gift box',
      shortDescription: 'Satin scrunchies matched to her purse or your wedding color theme.',
      description: 'Satin scrunchies matched to her purse or your wedding color theme.',
      shipping: SHIPPING_NOTE,
      variants: [{ name: 'Standard' }],
      tags: ['proposal', 'scrunchie', 'add-on'],
      addon: true,
      inventory: true
    },
    {
      id: 'proposal-addon-mug',
      sku: 'IB-AD-MUG-001',
      slug: 'proposal-mug',
      name: 'Personalized Mug',
      collection: 'Wedding Proposal Collection',
      category: 'Proposal Box Add-Ons',
      price: 34.99,
      url: 'collections/proposal-box.html',
      image: 'images/insta-2.jpg',
      altText: 'Ceramic mug hand-lettered with a bridesmaid’s name',
      shortDescription: 'Ceramic mug hand-lettered with her name.',
      description: 'Ceramic mug hand-lettered with her name.',
      shipping: SHIPPING_NOTE,
      variants: [{ name: 'Standard' }],
      tags: ['proposal', 'mug', 'personalized', 'add-on'],
      addon: true,
      inventory: true
    },
    {
      id: 'proposal-addon-flowers',
      sku: 'IB-AD-FLR-001',
      slug: 'proposal-flowers',
      name: 'Everlasting Flower Arrangement',
      collection: 'Wedding Proposal Collection',
      category: 'Proposal Box Add-Ons',
      price: 45.99,
      url: 'collections/proposal-box.html',
      image: 'images/insta-4.jpg',
      altText: 'Small everlasting flower arrangement for a proposal box',
      shortDescription: 'A small hand-shaped arrangement that never wilts.',
      description: 'A small hand-shaped arrangement that never wilts.',
      shipping: SHIPPING_NOTE,
      variants: [{ name: 'Standard' }],
      tags: ['proposal', 'flowers', 'everlasting', 'add-on'],
      addon: true,
      inventory: true
    }
  ];

  /* Back-fill `description` (used by cart/search) from shortDescription
     so older callers keep working without duplicating copy above. */
  for (var i = 0; i < products.length; i++) {
    if (!products[i].description) products[i].description = products[i].shortDescription || '';
  }

  function getProduct(id) {
    for (var j = 0; j < products.length; j++) {
      if (products[j].id === id) return products[j];
    }
    return null;
  }

  window.IvoryBloom = window.IvoryBloom || {};
  window.IvoryBloom.products = products;
  window.IvoryBloom.getProduct = getProduct;
})();
