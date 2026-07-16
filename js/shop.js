/* ============================================================
   Ivory & Bloom Atelier — Shop / Search / Wishlist / Featured
   One shared catalog card renderer, activated by page hooks:
     #shopGrid          — /shop.html grid with filters + sort
     #searchPage        — /search.html instant search
     #wishlistGrid      — /wishlist.html saved pieces
     #featuredProducts  — homepage featured strip
   Requires products.js + cart.js loaded first.
   ============================================================ */

(function () {
  'use strict';

  if (!window.IvoryBloom || !window.IBCart) return;

  var ROOT = (function () {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src');
      if (/js\/shop\.js/.test(src)) return src.replace(/js\/shop\.js.*$/, '') || './';
    }
    return './';
  })();

  var fmt = window.IBCart.format;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function sellable() {
    return window.IvoryBloom.products.filter(function (p) { return !p.addon; });
  }

  function defaultVariant(p) {
    return p.variants && p.variants.length ? p.variants[0].name : 'Standard';
  }

  /* ---------- shared card ---------- */

  function cardHtml(p) {
    var saved = window.IBCart.inWishlist(p.id, defaultVariant(p));
    var badge = p.bestseller ? '<span class="shop-card-badge">Best Seller</span>'
      : (p.isNew ? '<span class="shop-card-badge shop-card-badge-new">New</span>' : '');
    return (
      '<div class="shop-card" data-id="' + esc(p.id) + '">' +
      '  <a href="' + ROOT + esc(p.url) + '" class="shop-card-img">' +
      '    <img src="' + ROOT + esc(p.image) + '" alt="' + esc(p.altText || p.name) + '" loading="lazy">' +
      '  </a>' + badge +
      '  <button class="shop-card-wish' + (saved ? ' is-saved' : '') + '" data-wish-toggle="' + esc(p.id) + '"' +
      '    aria-label="' + (saved ? 'Remove from wishlist' : 'Save to wishlist') + '" aria-pressed="' + saved + '">' +
      (saved ? '&#10084;' : '&#9825;') +
      '  </button>' +
      '  <div class="shop-card-meta">' +
      '    <div class="shop-card-collection">' + esc(p.category) + '</div>' +
      '    <a href="' + ROOT + esc(p.url) + '" class="shop-card-name">' + esc(p.name) + '</a>' +
      '    <div class="shop-card-price">' + fmt(p.price) + '</div>' +
      '    <div class="shop-card-actions">' +
      '      <button class="btn-add-cart btn-add-cart-sm" data-add-to-cart="' + esc(p.id) + '">Add to Cart</button>' +
      '      <a href="' + ROOT + esc(p.url) + '" class="shop-card-view">View Piece &#8594;</a>' +
      '    </div>' +
      '  </div>' +
      '</div>'
    );
  }

  function renderCards(mount, list, emptyHtml) {
    if (!list.length) {
      mount.innerHTML = emptyHtml || '<p class="shop-empty">Nothing here yet.</p>';
      return;
    }
    var html = '';
    for (var i = 0; i < list.length; i++) html += cardHtml(list[i]);
    mount.innerHTML = html;
  }

  /* Wishlist hearts (event delegation, coexists with cart.js handlers) */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-wish-toggle]');
    if (!btn) return;
    var p = window.IvoryBloom.getProduct(btn.getAttribute('data-wish-toggle'));
    if (!p) return;
    var saved = window.IBCart.toggleWishlist(p.id, defaultVariant(p));
    btn.classList.toggle('is-saved', saved);
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    btn.setAttribute('aria-label', saved ? 'Remove from wishlist' : 'Save to wishlist');
    btn.innerHTML = saved ? '&#10084;' : '&#9825;';
    /* On the wishlist page, removal should take the card away */
    if (!saved && btn.closest('#wishlistGrid')) renderWishlist();
  });

  /* ---------- /shop ---------- */

  function initShop() {
    var grid = document.getElementById('shopGrid');
    if (!grid) return;

    var state = { category: 'All', sort: 'featured' };

    function apply() {
      var list = sellable();
      if (state.category !== 'All') {
        list = list.filter(function (p) { return p.category === state.category; });
      }
      if (state.sort === 'price-asc') list = list.slice().sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === 'price-desc') list = list.slice().sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === 'name') list = list.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
      else if (state.sort === 'best') list = list.slice().sort(function (a, b) { return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0); });
      else if (state.sort === 'new') list = list.slice().sort(function (a, b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); });
      renderCards(grid, list,
        '<p class="shop-empty">No pieces in this collection yet &mdash; <a href="' + ROOT + 'index.html#consultation">ask about a custom commission</a>.</p>');
      var count = document.getElementById('shopCount');
      if (count) count.textContent = list.length + (list.length === 1 ? ' piece' : ' pieces');
    }

    /* Collection filter pills, built from the catalog itself */
    var cats = ['All'];
    sellable().forEach(function (p) {
      if (cats.indexOf(p.category) === -1) cats.push(p.category);
    });
    var filterMount = document.getElementById('shopFilters');
    if (filterMount) {
      var fh = '';
      cats.forEach(function (c, i) {
        fh += '<label class="pdp-pill shop-filter-pill"><input type="radio" name="shop-cat" value="' + esc(c) + '"' +
          (i === 0 ? ' checked' : '') + '>' + esc(c) + '</label>';
      });
      filterMount.innerHTML = fh;
      filterMount.addEventListener('change', function (e) {
        if (e.target.name === 'shop-cat') { state.category = e.target.value; apply(); }
      });
    }

    var sortSel = document.getElementById('shopSort');
    if (sortSel) {
      sortSel.addEventListener('change', function () { state.sort = sortSel.value; apply(); });
    }

    apply();
  }

  /* ---------- /search ---------- */

  /* Static pages worth surfacing alongside catalog matches */
  var PAGES = [
    { title: 'The Collections', url: 'collections/index.html', words: 'collections browse all pieces' },
    { title: 'Bespoke Commissions', url: 'collections/bespoke-commissions.html', words: 'custom bespoke one of a kind commission' },
    { title: 'Matched to Your Palette', url: 'collections/matched-to-your-palette.html', words: 'color matching palette custom colors shade' },
    { title: 'Bouquets & Boutonnieres', url: 'collections/bouquets-boutonnieres.html', words: 'bouquet boutonniere everlasting florals' },
    { title: 'Ring Bearer Accessories', url: 'collections/ring-bearer-accessories.html', words: 'ring bearer pillow boys' },
    { title: 'Personalized Keepsakes', url: 'collections/personalized-keepsakes.html', words: 'keepsake gift personalized' },
    { title: 'FAQ — Turnaround, Shipping & Care', url: 'faq.html', words: 'faq questions shipping turnaround care sizing' },
    { title: 'Shipping & Returns', url: 'shipping-returns.html', words: 'shipping returns delivery policy' },
    { title: 'Our Story', url: 'about.html', words: 'about michelle founder story atelier' },
    { title: 'Love Notes — Reviews', url: 'love-notes.html', words: 'reviews ratings testimonials love notes' },
    { title: 'The Journal', url: 'journal/index.html', words: 'journal blog guides inspiration' }
  ];

  function initSearch() {
    var page = document.getElementById('searchPage');
    if (!page) return;
    var input = document.getElementById('searchInput');
    var productMount = document.getElementById('searchProducts');
    var pageMount = document.getElementById('searchPages');
    var status = document.getElementById('searchStatus');

    function run(q) {
      q = q.trim().toLowerCase();
      if (q.length < 2) {
        renderCards(productMount, sellable());
        pageMount.innerHTML = '';
        status.textContent = 'Browse every piece, or start typing to search.';
        return;
      }
      var prods = sellable().filter(function (p) {
        var hay = p.name + ' ' + p.category + ' ' + (p.collection || '') + ' ' +
          p.description + ' ' + (p.tags ? p.tags.join(' ') : '');
        return hay.toLowerCase().indexOf(q) > -1;
      });
      var pages = PAGES.filter(function (pg) {
        return (pg.title + ' ' + pg.words).toLowerCase().indexOf(q) > -1;
      });
      if (!prods.length && !pages.length) {
        status.textContent = 'No matches for “' + q + '” — a few pieces brides love instead:';
        renderCards(productMount, sellable().slice(0, 3));
        pageMount.innerHTML = '<p class="shop-empty">Looking for something custom? <a href="' + ROOT +
          'index.html#consultation">Begin a consultation</a> and we’ll make it in your colors.</p>';
        return;
      }
      status.textContent = prods.length + (prods.length === 1 ? ' piece' : ' pieces') +
        (pages.length ? ' and ' + pages.length + (pages.length === 1 ? ' page' : ' pages') : '') + ' found';
      renderCards(productMount, prods, '');
      var ph = '';
      pages.forEach(function (pg) {
        ph += '<a class="search-page-link" href="' + ROOT + pg.url + '">' + esc(pg.title) + ' &#8594;</a>';
      });
      pageMount.innerHTML = ph;
    }

    var t;
    input.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () { run(input.value); }, 120);
    });

    /* Popular searches */
    page.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-search-term]');
      if (!chip) return;
      input.value = chip.getAttribute('data-search-term');
      input.focus();
      run(input.value);
    });

    /* ?q= support */
    var m = location.search.match(/[?&]q=([^&]*)/);
    if (m && m[1]) input.value = decodeURIComponent(m[1].replace(/\+/g, ' '));
    run(input.value || '');
  }

  /* ---------- /wishlist ---------- */

  function renderWishlist() {
    var grid = document.getElementById('wishlistGrid');
    if (!grid) return;
    var saved = window.IBCart.getWishlist();
    var list = [];
    saved.forEach(function (w) {
      var p = window.IvoryBloom.getProduct(w.id);
      if (p && !p.addon) list.push(p);
    });
    renderCards(grid, list,
      '<div class="cart-empty">' +
      '  <p class="cart-empty-msg">Nothing saved yet &mdash; your favorites will wait for you here.</p>' +
      '  <a href="' + ROOT + 'shop.html" class="btn-primary">Explore the Shop</a>' +
      '</div>');
  }

  /* ---------- homepage featured (best sellers first) ---------- */

  function initFeatured() {
    var mount = document.getElementById('featuredProducts');
    if (!mount) return;
    var best = sellable().filter(function (p) { return p.bestseller; });
    var rest = sellable().filter(function (p) { return !p.bestseller; });
    renderCards(mount, best.concat(rest).slice(0, 3));
  }

  /* ---------- recently viewed ---------- */

  var RECENT_KEY = 'ib_recent_v1';

  function getRecent() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
    catch (e) { return []; }
  }

  /* Called by product-page.js when a PDP is opened */
  function recordView(id) {
    var list = getRecent().filter(function (x) { return x !== id; });
    list.unshift(id);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 8))); } catch (e) {}
  }

  function initRecent() {
    var mount = document.getElementById('recentlyViewed');
    if (!mount) return;
    var exclude = mount.getAttribute('data-exclude');
    var list = [];
    getRecent().forEach(function (id) {
      if (id === exclude) return;
      var p = window.IvoryBloom.getProduct(id);
      if (p && !p.addon) list.push(p);
    });
    var section = mount.closest('section');
    if (!list.length) {
      if (section) section.hidden = true;
      return;
    }
    if (section) section.hidden = false;
    renderCards(mount, list.slice(0, 3));
  }

  window.IBShop = { recordView: recordView };

  function init() {
    initShop();
    initSearch();
    renderWishlist();
    initFeatured();
    initRecent();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
