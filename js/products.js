/* ============================================================
   Ivory & Bloom Atelier — Product Catalog
   Signature ready-to-order pieces available for direct purchase.
   Custom/bespoke work still routes through the consultation flow.

   Shape is WooCommerce-migration-ready: `id` maps to SKU/slug,
   `variants` map to product attributes, `inventory` to stock status.
   Image paths are site-root-relative; cart.js resolves them against
   document.body.dataset.root (set per page by the build).
   ============================================================ */

(function () {
  'use strict';

  var products = [
    {
      id: 'flower-girl-headband-001',
      name: 'Ivory Garden Heirloom Flower Girl Headband',
      category: 'Flower Girl Collection',
      price: 185,
      image: 'images/flowergirl-set.jpg',
      url: 'collections/flower-girl-headband.html',
      description: 'A handcrafted floral heirloom designed for the little moments that become lifelong memories.',
      variants: [
        { name: 'Ivory' },
        { name: 'Blush' },
        { name: 'Sage' }
      ],
      ribbons: ['Silk Ribbon', 'Velvet Ribbon'],
      sizes: ['Toddler', 'Child', 'Custom'],
      personalizable: true,
      inventory: true
    },
    {
      id: 'gift-packaging-heirloom',
      name: 'Heirloom Gift Packaging',
      category: 'Add-Ons',
      price: 12,
      image: 'images/insta-2.jpg',
      url: 'collections/flower-girl-headband.html',
      description: 'Satin-lined keepsake box, hand-tied ribbon, and a written note card.',
      variants: [{ name: 'Standard' }],
      addon: true,
      inventory: true
    },
    {
      id: 'proposal-box-signature',
      name: 'Signature Proposal Box',
      category: 'Bridesmaid Collection',
      price: 96.99,
      image: 'images/bridesmaids-pastel.jpg',
      url: 'collections/proposal-box.html',
      description: 'The "will you be my bridesmaid?" moment, boxed — a keepsake box in your palette, ready to build with handmade touches.',
      variants: [
        { name: 'Ivory' },
        { name: 'Blush' },
        { name: 'Sage' }
      ],
      inventory: true
    },
    {
      id: 'proposal-addon-scrunchies',
      name: 'Handmade Scrunchies',
      category: 'Proposal Box Add-Ons',
      price: 15.99,
      image: 'images/insta-1.jpg',
      url: 'collections/proposal-box.html',
      description: 'Satin scrunchies matched to her purse or your wedding color theme.',
      variants: [{ name: 'Standard' }],
      addon: true,
      inventory: true
    },
    {
      id: 'proposal-addon-mug',
      name: 'Personalized Mug',
      category: 'Proposal Box Add-Ons',
      price: 34.99,
      image: 'images/insta-2.jpg',
      url: 'collections/proposal-box.html',
      description: 'Ceramic mug hand-lettered with her name.',
      variants: [{ name: 'Standard' }],
      addon: true,
      inventory: true
    },
    {
      id: 'proposal-addon-flowers',
      name: 'Everlasting Flower Arrangement',
      category: 'Proposal Box Add-Ons',
      price: 45.99,
      image: 'images/insta-4.jpg',
      url: 'collections/proposal-box.html',
      description: 'A small hand-shaped arrangement that never wilts.',
      variants: [{ name: 'Standard' }],
      addon: true,
      inventory: true
    },
    {
      id: 'flower-girl-set-ivory-garden',
      name: 'Ivory Garden Flower Girl Set',
      category: 'Flower Girl Sets',
      price: 85,
      image: 'images/hero-flowergirl-garden.jpg',
      url: 'collections/flower-girl-sets.html',
      description: 'A hand-shaped everlasting crown and pearl-handle petal pouch, sized for ages three to eight.',
      variants: [
        { name: 'Ivory Classic' },
        { name: 'Blush Garden' },
        { name: 'Champagne Bloom' }
      ],
      inventory: true
    },
    {
      id: 'bridal-pouch-pearl-handle',
      name: 'Pearl-Handle Satin Bridal Pouch',
      category: 'Bridal Pouches',
      price: 48,
      image: 'images/hero-pouch-florals.jpg',
      url: 'collections/bridal-pouches.html',
      description: 'Duchess satin pouch with a hand-strung pearl handle — carried down the aisle, kept for decades.',
      variants: [
        { name: 'Ivory' },
        { name: 'Blush' },
        { name: 'Champagne' }
      ],
      inventory: true
    },
    {
      id: 'flower-crown-heirloom',
      name: 'Heirloom Flower Crown',
      category: 'Flower Crowns',
      price: 58,
      image: 'images/crown-detail.jpg',
      url: 'collections/flower-crowns.html',
      description: 'Everlasting florals shaped petal by petal on an adjustable ribbon-tie band.',
      variants: [
        { name: 'Ivory & Pearl' },
        { name: 'Blush Garden' },
        { name: 'Sage & Cream' }
      ],
      inventory: true
    },
    {
      id: 'bridesmaid-satin-pouch',
      name: 'Bridesmaid Satin Pouch',
      category: 'Bridesmaid Collection',
      price: 44,
      image: 'images/hero-bridesmaids-pouch-gift.jpg',
      url: 'collections/bridesmaid-collection.html',
      description: 'The coordinated party gift — one satin pouch, dyed to your palette. Order one per bridesmaid.',
      variants: [
        { name: 'Ivory' },
        { name: 'Blush' },
        { name: 'Champagne' },
        { name: 'Sage' }
      ],
      inventory: true
    },
    {
      id: 'hair-flowers-trio',
      name: 'Everlasting Hair Flowers, Set of Three',
      category: 'Flower Crowns',
      price: 38,
      image: 'images/crown-editorial.jpg',
      url: 'collections/flower-crowns.html',
      description: 'Three hand-shaped blooms on pins — worn scattered through an updo or clustered at the nape.',
      variants: [
        { name: 'Ivory & Pearl' },
        { name: 'Blush Garden' }
      ],
      inventory: true
    }
  ];

  function getProduct(id) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) return products[i];
    }
    return null;
  }

  window.IvoryBloom = window.IvoryBloom || {};
  window.IvoryBloom.products = products;
  window.IvoryBloom.getProduct = getProduct;
})();
