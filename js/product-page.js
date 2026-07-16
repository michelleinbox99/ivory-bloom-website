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
    if (picked('pdp-color')) parts.push(picked('pdp-color'));
    if (picked('pdp-size')) parts.push(picked('pdp-size'));
    var girl = fieldVal('pdpFlowerGirlName');
    var date = fieldVal('pdpWeddingDate');
    if (girl) parts.push('For ' + girl);
    if (date) parts.push(date);
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

  var addBtn = root.querySelector('[data-pdp-add]');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      if (!flashAdded(addBtn, 'Added to Your Collection')) return;
      window.IBCart.add(addBtn.getAttribute('data-pdp-add'), composedVariant(), 1);
      setTimeout(window.IBCart.openDrawer, 800);
    });
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
