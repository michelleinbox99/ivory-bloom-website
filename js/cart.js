/* ============================================================
   Ivory & Bloom Atelier — Cart Engine
   Vanilla JS, no dependencies. localStorage persistence, luxury
   slide-in drawer, header bag badge, fly-to-cart animation,
   wishlist toggle, and cart-page rendering hooks.

   Public API (window.IBCart):
     add(productId, variantName, qty)
     remove(productId, variantName)
     setQty(productId, variantName, qty)
     clear()
     getItems()          -> hydrated line items
     getTotals()         -> { subtotal, tax, total, count }
     openDrawer() / closeDrawer()

   WooCommerce migration notes: line items key on product id +
   variant (maps to variation id), totals mirror wc cart totals,
   and all mutations funnel through save() for easy replacement
   with Store API calls later.
   ============================================================ */

(function () {
  'use strict';

  var CART_KEY = 'ib_cart_v1';
  var WISHLIST_KEY = 'ib_wishlist_v1';
  var TAX_RATE = 0.08; // estimated; final tax calculated at checkout

  /* Resolve the site root from this script's own src so paths work
     from root pages ("./") and nested pages ("../") alike. */
  var ROOT = (function () {
    var el = document.currentScript;
    if (!el) {
      var scripts = document.querySelectorAll('script[src]');
      for (var i = 0; i < scripts.length; i++) {
        if (/js\/cart\.js/.test(scripts[i].getAttribute('src'))) { el = scripts[i]; break; }
      }
    }
    if (!el) return './';
    return el.getAttribute('src').replace(/js\/cart\.js.*$/, '') || './';
  })();

  var fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  /* ---------- state ---------- */

  function load(key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  var items = load(CART_KEY);       // [{ id, variant, qty }]
  var wishlist = load(WISHLIST_KEY); // [{ id, variant }]

  function save() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    render();
  }

  function saveWishlist() {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); } catch (e) {}
  }

  function findIndex(id, variant) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id && items[i].variant === variant) return i;
    }
    return -1;
  }

  function hydrate(line) {
    var p = window.IvoryBloom.getProduct(line.id);
    if (!p) return null;
    return {
      id: line.id,
      variant: line.variant,
      qty: line.qty,
      name: p.name,
      category: p.category,
      price: p.price,
      image: ROOT + p.image,
      url: ROOT + p.url,
      lineTotal: p.price * line.qty
    };
  }

  function getItems() {
    var out = [];
    for (var i = 0; i < items.length; i++) {
      var h = hydrate(items[i]);
      if (h) out.push(h);
    }
    return out;
  }

  function round2(n) { return Math.round(n * 100) / 100; }

  /* Shipping estimate from IB_CONFIG.shipping (flat rate with a
     free-shipping threshold). Returns null when no config is
     present, in which case the UI says "Calculated at checkout". */
  function getShipping(subtotal) {
    var cfg = (window.IB_CONFIG && window.IB_CONFIG.shipping) || null;
    if (!cfg || subtotal <= 0) return null;
    return subtotal >= cfg.freeThreshold ? 0 : cfg.flatRate;
  }

  /* "Arrives Aug 4 – Aug 18" from lead time + transit windows */
  function deliveryEstimate() {
    var cfg = (window.IB_CONFIG && window.IB_CONFIG.shipping) || null;
    if (!cfg || !cfg.leadTimeDays) return '';
    var soon = new Date(), late = new Date();
    soon.setDate(soon.getDate() + cfg.leadTimeDays[0] + cfg.transitDays[0]);
    late.setDate(late.getDate() + cfg.leadTimeDays[1] + cfg.transitDays[1]);
    var f = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
    return f.format(soon) + ' – ' + f.format(late);
  }

  function getTotals() {
    var subtotal = 0, count = 0;
    var hydrated = getItems();
    for (var i = 0; i < hydrated.length; i++) {
      subtotal += hydrated[i].lineTotal;
      count += hydrated[i].qty;
    }
    subtotal = round2(subtotal);
    var taxRate = (window.IB_CONFIG && window.IB_CONFIG.taxRate) || TAX_RATE;
    var tax = round2(subtotal * taxRate);
    var shipping = getShipping(subtotal);
    var total = round2(subtotal + tax + (shipping || 0));
    return { subtotal: subtotal, tax: tax, shipping: shipping, total: total, count: count };
  }

  function add(id, variant, qty) {
    qty = qty || 1;
    var idx = findIndex(id, variant);
    if (idx > -1) items[idx].qty += qty;
    else items.push({ id: id, variant: variant, qty: qty });
    save();
    pulseBadge();
  }

  function remove(id, variant) {
    var idx = findIndex(id, variant);
    if (idx > -1) { items.splice(idx, 1); save(); }
  }

  function setQty(id, variant, qty) {
    var idx = findIndex(id, variant);
    if (idx === -1) return;
    if (qty < 1) items.splice(idx, 1);
    else items[idx].qty = Math.min(qty, 20);
    save();
  }

  function clear() { items = []; save(); }

  function inWishlist(id, variant) {
    for (var i = 0; i < wishlist.length; i++) {
      if (wishlist[i].id === id && wishlist[i].variant === variant) return true;
    }
    return false;
  }

  function toggleWishlist(id, variant) {
    for (var i = 0; i < wishlist.length; i++) {
      if (wishlist[i].id === id && wishlist[i].variant === variant) {
        wishlist.splice(i, 1);
        saveWishlist();
        return false;
      }
    }
    wishlist.push({ id: id, variant: variant });
    saveWishlist();
    return true;
  }

  /* ---------- drawer & badge DOM ---------- */

  var drawer, overlay, drawerBody, drawerFooter, lastFocus;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function buildShell() {
    overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.addEventListener('click', closeDrawer);

    drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Your Collection — shopping cart');
    drawer.innerHTML =
      '<div class="cart-drawer-head">' +
      '  <div>' +
      '    <h2 class="cart-drawer-title">Your Collection</h2>' +
      '    <p class="cart-drawer-sub">Handcrafted pieces waiting for your special moment.</p>' +
      '  </div>' +
      '  <button class="cart-drawer-close" aria-label="Close cart">&times;</button>' +
      '</div>' +
      '<div class="cart-drawer-body"></div>' +
      '<div class="cart-drawer-footer"></div>';

    drawer.querySelector('.cart-drawer-close').addEventListener('click', closeDrawer);
    drawerBody = drawer.querySelector('.cart-drawer-body');
    drawerFooter = drawer.querySelector('.cart-drawer-footer');

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('open')) return;
      if (e.key === 'Escape') closeDrawer();
      if (e.key === 'Tab') trapFocus(e);
    });

    /* Mobile sticky bag bar */
    var bar = document.createElement('button');
    bar.className = 'cart-mobile-bar';
    bar.setAttribute('aria-label', 'View your cart');
    bar.innerHTML = bagSvg() + '<span class="cart-mobile-bar-label">Your Collection</span><span class="cart-mobile-bar-count"></span>';
    bar.addEventListener('click', openDrawer);
    document.body.appendChild(bar);
  }

  function bagSvg() {
    return '<svg class="cart-bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">' +
      '<path d="M5.5 8.5h13l-1 12h-11l-1-12z" stroke-linejoin="round"/>' +
      '<path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" stroke-linecap="round"/></svg>';
  }

  function trapFocus(e) {
    var focusables = drawer.querySelectorAll('button, a[href], input, select, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }

  function openDrawer() {
    lastFocus = document.activeElement;
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.classList.add('cart-open');
    var closeBtn = drawer.querySelector('.cart-drawer-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.classList.remove('cart-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function lineItemHtml(it) {
    return (
      '<div class="cart-line" data-id="' + esc(it.id) + '" data-variant="' + esc(it.variant) + '">' +
      '  <a href="' + esc(it.url) + '" class="cart-line-img"><img src="' + esc(it.image) + '" alt="" loading="lazy"></a>' +
      '  <div class="cart-line-meta">' +
      '    <div class="cart-line-name">' + esc(it.name) + '</div>' +
      '    <div class="cart-line-variant">' + esc(it.variant) + '</div>' +
      '    <div class="cart-qty" role="group" aria-label="Quantity for ' + esc(it.name) + '">' +
      '      <button class="cart-qty-btn" data-act="dec" aria-label="Decrease quantity">&minus;</button>' +
      '      <span class="cart-qty-num" aria-live="polite">' + it.qty + '</span>' +
      '      <button class="cart-qty-btn" data-act="inc" aria-label="Increase quantity">+</button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="cart-line-right">' +
      '    <div class="cart-line-price">' + fmt.format(it.lineTotal) + '</div>' +
      '    <button class="cart-line-remove" data-act="remove" aria-label="Remove ' + esc(it.name) + ' from cart">Remove</button>' +
      '  </div>' +
      '</div>'
    );
  }

  function emptyHtml() {
    return (
      '<div class="cart-empty">' +
      '  <div class="cart-empty-bloom" aria-hidden="true">' +
      '    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.2">' +
      '      <circle cx="32" cy="26" r="6"/>' +
      '      <path d="M32 20c0-6 4-9 4-9M32 20c0-6-4-9-4-9M26 24c-5-2-9 0-9 0M38 24c5-2 9 0 9 0M32 32v18M32 40c-4-2-8-1-8-1M32 44c4-2 8-1 8-1" stroke-linecap="round"/>' +
      '    </svg>' +
      '  </div>' +
      '  <p class="cart-empty-msg">Your collection is waiting.</p>' +
      '  <a href="' + ROOT + 'collections/index.html" class="btn-primary">Explore Bridal Collection</a>' +
      '</div>'
    );
  }

  function summaryHtml(t, context) {
    var checkoutBtn = context === 'drawer'
      ? '<a href="' + ROOT + 'cart.html" class="btn-outline-dark cart-summary-btn">Review Collection</a>' +
        '<a href="' + ROOT + 'checkout.html" class="btn-primary cart-summary-btn">Proceed to Checkout</a>'
      : '<a href="' + ROOT + 'checkout.html" class="btn-primary cart-summary-btn">Proceed to Checkout</a>';
    var shipRow = t.shipping === null
      ? '<span class="cart-summary-soft">Calculated at checkout</span>'
      : (t.shipping === 0
        ? '<span class="cart-summary-num" style="color: var(--success);">Free</span>'
        : '<span class="cart-summary-num">' + fmt.format(t.shipping) + '</span>');
    var freeNote = '';
    if (t.shipping !== null && t.shipping > 0 && window.IB_CONFIG && window.IB_CONFIG.shipping) {
      var away = window.IB_CONFIG.shipping.freeThreshold - t.subtotal;
      if (away > 0) freeNote = '<div class="cart-summary-row"><span class="cart-summary-soft">' +
        fmt.format(away) + ' away from free shipping</span><span></span></div>';
    }
    var eta = deliveryEstimate();
    return (
      '<div class="cart-summary">' +
      '  <div class="cart-summary-row"><span>Subtotal</span><span class="cart-summary-num">' + fmt.format(t.subtotal) + '</span></div>' +
      '  <div class="cart-summary-row"><span>Estimated shipping</span>' + shipRow + '</div>' + freeNote +
      '  <div class="cart-summary-row"><span>Estimated tax</span><span class="cart-summary-num">' + fmt.format(t.tax) + '</span></div>' +
      '  <div class="cart-summary-row cart-summary-total"><span>Total</span><span class="cart-summary-num">' + fmt.format(t.total) + '</span></div>' +
      '  <div class="cart-summary-actions">' + checkoutBtn + '</div>' +
      '  <p class="cart-summary-note">Each piece is made by hand, one at a time.' +
      (eta ? ' Estimated arrival: ' + eta + '.' : ' Current lead time: 2&ndash;3 weeks.') + '</p>' +
      '</div>'
    );
  }

  function bindLineActions(container) {
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      var line = btn.closest('.cart-line');
      if (!line) return;
      var id = line.getAttribute('data-id');
      var variant = line.getAttribute('data-variant');
      var idx = findIndex(id, variant);
      var qty = idx > -1 ? items[idx].qty : 0;
      var act = btn.getAttribute('data-act');
      if (act === 'inc') setQty(id, variant, qty + 1);
      else if (act === 'dec') setQty(id, variant, qty - 1);
      else if (act === 'remove') {
        line.classList.add('removing');
        setTimeout(function () { remove(id, variant); }, 280);
      }
    });
  }

  /* ---------- badge ---------- */

  function renderBadge() {
    var t = getTotals();
    var badges = document.querySelectorAll('.cart-count');
    for (var i = 0; i < badges.length; i++) {
      badges[i].textContent = t.count;
      badges[i].classList.toggle('has-items', t.count > 0);
    }
    var bar = document.querySelector('.cart-mobile-bar');
    if (bar) {
      bar.classList.toggle('visible', t.count > 0);
      var n = bar.querySelector('.cart-mobile-bar-count');
      if (n) n.textContent = t.count + (t.count === 1 ? ' piece' : ' pieces') + ' · ' + fmt.format(t.total);
    }
  }

  function pulseBadge() {
    var badges = document.querySelectorAll('.cart-count');
    for (var i = 0; i < badges.length; i++) {
      badges[i].classList.remove('pulse');
      void badges[i].offsetWidth; // restart animation
      badges[i].classList.add('pulse');
    }
  }

  /* ---------- fly-to-cart ---------- */

  function flyToCart(sourceImg) {
    var target = document.querySelector('.cart-toggle') || document.querySelector('.cart-mobile-bar.visible');
    if (!sourceImg || !target) return;
    var s = sourceImg.getBoundingClientRect();
    var t = target.getBoundingClientRect();
    var ghost = sourceImg.cloneNode(false);
    ghost.className = 'cart-fly-ghost';
    ghost.style.cssText = 'position:fixed;z-index:2000;border-radius:50%;object-fit:cover;pointer-events:none;' +
      'left:' + s.left + 'px;top:' + s.top + 'px;width:' + s.width + 'px;height:' + s.height + 'px;' +
      'transition:all 0.7s cubic-bezier(0.55, 0, 0.3, 1);opacity:0.95;';
    document.body.appendChild(ghost);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        ghost.style.left = (t.left + t.width / 2 - 14) + 'px';
        ghost.style.top = (t.top + t.height / 2 - 14) + 'px';
        ghost.style.width = '28px';
        ghost.style.height = '28px';
        ghost.style.opacity = '0.25';
      });
    });
    setTimeout(function () { ghost.remove(); }, 750);
  }

  /* ---------- add-to-cart / wishlist buttons ---------- */

  function selectedVariant(scope, product) {
    var sel = scope ? scope.querySelector('.product-variant-select') : null;
    if (sel && sel.value) return sel.value;
    return product.variants && product.variants.length ? product.variants[0].name : 'Standard';
  }

  function bindProductButtons() {
    document.addEventListener('click', function (e) {
      var addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        var p = window.IvoryBloom.getProduct(addBtn.getAttribute('data-add-to-cart'));
        if (!p || addBtn.classList.contains('is-added')) return;
        var scope = addBtn.closest('.product-block');
        add(p.id, selectedVariant(scope, p), 1);
        flyToCart(scope ? scope.querySelector('img') : null);

        var original = addBtn.innerHTML;
        addBtn.classList.add('is-added');
        addBtn.innerHTML = '<svg class="cart-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path class="cart-check-path" d="M4 12.5l5 5L20 6.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Added to Your Collection';
        setTimeout(function () {
          addBtn.classList.remove('is-added');
          addBtn.innerHTML = original;
        }, 2200);
        setTimeout(openDrawer, 800);
        return;
      }

      var wishBtn = e.target.closest('[data-add-to-wishlist]');
      if (wishBtn) {
        var wp = window.IvoryBloom.getProduct(wishBtn.getAttribute('data-add-to-wishlist'));
        if (!wp) return;
        var wScope = wishBtn.closest('.product-block');
        var saved = toggleWishlist(wp.id, selectedVariant(wScope, wp));
        wishBtn.classList.toggle('is-saved', saved);
        wishBtn.setAttribute('aria-pressed', saved ? 'true' : 'false');
        wishBtn.innerHTML = saved ? '&#10084; Saved to Wishlist' : '&#9825; Add to Wishlist';
      }
    });

    /* Restore wishlist button states on load */
    var wishBtns = document.querySelectorAll('[data-add-to-wishlist]');
    for (var i = 0; i < wishBtns.length; i++) {
      var p = window.IvoryBloom.getProduct(wishBtns[i].getAttribute('data-add-to-wishlist'));
      if (!p) continue;
      var scope = wishBtns[i].closest('.product-block');
      if (inWishlist(p.id, selectedVariant(scope, p))) {
        wishBtns[i].classList.add('is-saved');
        wishBtns[i].setAttribute('aria-pressed', 'true');
        wishBtns[i].innerHTML = '&#10084; Saved to Wishlist';
      }
    }
  }

  /* ---------- cart page ---------- */

  function renderCartPage() {
    var pageItems = document.getElementById('cartPageItems');
    var pageSummary = document.getElementById('cartPageSummary');
    if (!pageItems || !pageSummary) return;

    var hydrated = getItems();
    var t = getTotals();

    if (!hydrated.length) {
      pageItems.innerHTML = emptyHtml();
      pageSummary.innerHTML = '';
      pageSummary.parentElement.classList.add('cart-page-empty');
      return;
    }
    pageSummary.parentElement.classList.remove('cart-page-empty');
    var html = '';
    for (var i = 0; i < hydrated.length; i++) html += lineItemHtml(hydrated[i]);
    pageItems.innerHTML = html;
    pageSummary.innerHTML = summaryHtml(t, 'page');
  }

  function renderRecommendations() {
    var mount = document.getElementById('cartRecommendations');
    if (!mount) return;
    var inCart = {};
    for (var i = 0; i < items.length; i++) inCart[items[i].id] = true;
    var excl = mount.getAttribute('data-exclude');
    if (excl) inCart[excl] = true;
    var picks = [];
    var all = window.IvoryBloom.products;
    for (var j = 0; j < all.length && picks.length < 3; j++) {
      if (!inCart[all[j].id] && !all[j].addon) picks.push(all[j]);
    }
    var html = '';
    for (var k = 0; k < picks.length; k++) {
      var p = picks[k];
      html +=
        '<div class="cart-rec-card">' +
        '  <a href="' + ROOT + esc(p.url) + '" class="cart-rec-img"><img src="' + ROOT + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
        '  <div class="cart-rec-meta">' +
        '    <div class="cart-rec-name">' + esc(p.name) + '</div>' +
        '    <div class="cart-rec-price">' + fmt.format(p.price) + '</div>' +
        '    <button class="btn-add-cart btn-add-cart-sm" data-add-to-cart="' + esc(p.id) + '">Add to Cart</button>' +
        '  </div>' +
        '</div>';
    }
    mount.innerHTML = html;
  }

  /* ---------- render ---------- */

  function render() {
    renderBadge();
    if (drawerBody) {
      var hydrated = getItems();
      if (!hydrated.length) {
        drawerBody.innerHTML = emptyHtml();
        drawerFooter.innerHTML = '';
      } else {
        var html = '';
        for (var i = 0; i < hydrated.length; i++) html += lineItemHtml(hydrated[i]);
        drawerBody.innerHTML = html;
        drawerFooter.innerHTML = summaryHtml(getTotals(), 'drawer');
      }
    }
    renderCartPage();
    renderRecommendations();
  }

  /* Sync across tabs */
  window.addEventListener('storage', function (e) {
    if (e.key === CART_KEY) {
      items = load(CART_KEY);
      render();
    }
  });

  function init() {
    buildShell();
    bindLineActions(drawerBody);
    var pageItems = document.getElementById('cartPageItems');
    if (pageItems) bindLineActions(pageItems);
    var toggles = document.querySelectorAll('.cart-toggle');
    for (var i = 0; i < toggles.length; i++) toggles[i].addEventListener('click', openDrawer);
    bindProductButtons();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.IBCart = {
    add: add,
    remove: remove,
    setQty: setQty,
    clear: clear,
    getItems: getItems,
    getTotals: getTotals,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    getWishlist: function () { return wishlist.slice(); },
    inWishlist: inWishlist,
    toggleWishlist: toggleWishlist,
    format: function (n) { return fmt.format(n); }
  };
})();
