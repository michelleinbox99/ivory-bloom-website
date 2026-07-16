/* ============================================================
   Ivory & Bloom Atelier — Product Detail Page
   Composes the chosen color / size / personalization into the
   cart line's variant string (maps to WooCommerce order-item
   meta on migration) and drives the two PDP CTAs.
   Expects: .pdp root, [data-pdp-add], optional [data-pdp-gift],
   input[name="pdp-color"], input[name="pdp-size"],
   #pdpWeddingDate, #pdpFlowerGirlName.
   ============================================================ */

(function () {
  'use strict';

  var root = document.querySelector('.pdp');
  if (!root || !window.IBCart) return;

  /* Record this product for "Recently Viewed" strips (shop.js) */
  var pdpAddBtn = root.querySelector('[data-pdp-add]');
  if (pdpAddBtn && window.IBShop) {
    window.IBShop.recordView(pdpAddBtn.getAttribute('data-pdp-add'));
  }

  function picked(name) {
    var el = root.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }

  function fieldVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function composedVariant() {
    var parts = [];
    /* Every checked radio across the option fieldsets, in page order —
       palette, ribbon, size, and any group added later. */
    var checked = root.querySelectorAll('.pdp-options input[type="radio"]:checked');
    for (var i = 0; i < checked.length; i++) parts.push(checked[i].value);
    var girl = fieldVal('pdpFlowerGirlName') || fieldVal('pdpRecipientName');
    var date = fieldVal('pdpWeddingDate');
    var note = fieldVal('pdpGiftNote');
    if (girl) parts.push('For ' + girl);
    if (date) parts.push(date);
    if (note) parts.push('Gift note: “' + note + '”');
    return parts.join(' · ');
  }

  function flashAdded(btn, label) {
    if (btn.classList.contains('is-added')) return false;
    var original = btn.innerHTML;
    btn.classList.add('is-added');
    btn.innerHTML = '<svg class="cart-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path class="cart-check-path" d="M4 12.5l5 5L20 6.5" stroke-linecap="round" stroke-linejoin="round"/></svg> ' + label;
    setTimeout(function () {
      btn.classList.remove('is-added');
      btn.innerHTML = original;
    }, 2200);
    return true;
  }

  /* Build-your-box add-ons: checkboxes marked data-pdp-addon="<product-id>".
     Checked add-ons ride along with the main Add to Cart as their own
     line items, and the [data-pdp-total] readout tracks the running total. */
  function checkedAddons() {
    return root.querySelectorAll('input[data-pdp-addon]:checked');
  }

  function refreshTotal(baseId) {
    var readout = root.querySelector('[data-pdp-total]');
    if (!readout || !window.IvoryBloom) return;
    var base = window.IvoryBloom.getProduct(baseId);
    var total = base ? base.price : 0;
    var boxes = checkedAddons();
    for (var i = 0; i < boxes.length; i++) {
      var p = window.IvoryBloom.getProduct(boxes[i].getAttribute('data-pdp-addon'));
      if (p) total += p.price;
    }
    readout.textContent = window.IBCart.format(total);
  }

  var addBtn = root.querySelector('[data-pdp-add]');
  if (addBtn) {
    var baseId = addBtn.getAttribute('data-pdp-add');
    addBtn.addEventListener('click', function () {
      if (!flashAdded(addBtn, 'Added to Your Collection')) return;
      window.IBCart.add(baseId, composedVariant(), 1);
      var boxes = checkedAddons();
      for (var i = 0; i < boxes.length; i++) {
        var id = boxes[i].getAttribute('data-pdp-addon');
        var forName = fieldVal('pdpFlowerGirlName') || fieldVal('pdpRecipientName');
        var variant = (id === 'proposal-addon-mug' && forName) ? 'For ' + forName : 'Standard';
        window.IBCart.add(id, variant, 1);
      }
      setTimeout(window.IBCart.openDrawer, 800);
    });

    var addonBoxes = root.querySelectorAll('input[data-pdp-addon]');
    for (var b = 0; b < addonBoxes.length; b++) {
      addonBoxes[b].addEventListener('change', function () { refreshTotal(baseId); });
    }
    refreshTotal(baseId);
  }

  var giftBtn = root.querySelector('[data-pdp-gift]');
  if (giftBtn) {
    giftBtn.addEventListener('click', function () {
      if (!flashAdded(giftBtn, 'Gift Packaging Added')) return;
      window.IBCart.add(giftBtn.getAttribute('data-pdp-gift'), 'Standard', 1);
    });
  }

  /* "Custom" size: reveal the gentle note about confirming measurements */
  var note = document.getElementById('pdpCustomNote');
  if (note) {
    var sizeInputs = root.querySelectorAll('input[name="pdp-size"]');
    for (var i = 0; i < sizeInputs.length; i++) {
      sizeInputs[i].addEventListener('change', function () {
        note.hidden = picked('pdp-size') !== 'Custom';
      });
    }
  }
})();
