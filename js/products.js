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
