/* ============================================================
   Ivory & Bloom Atelier — Checkout (Stripe-ready placeholder)
   Renders the order summary from the cart, validates the
   customer/shipping form, and shows a confirmation state.
   No payment is processed — the payment section is a labeled
   placeholder where Stripe Elements mounts later:
     stripe.elements().create('payment').mount('#stripePaymentElement')
   ============================================================ */

(function () {
  'use strict';

  var form = document.getElementById('checkoutForm');
  var summaryMount = document.getElementById('checkoutSummary');
  if (!form || !summaryMount || !window.IBCart) return;

  function renderSummary() {
    var itemsList = window.IBCart.getItems();
    var t = window.IBCart.getTotals();

    if (!itemsList.length) {
      document.getElementById('checkoutMain').innerHTML =
        '<div class="checkout-confirmation">' +
        '<h2>Your collection is waiting.</h2>' +
        '<p>There is nothing to check out just yet — every heirloom begins with a first piece.</p>' +
        '<a href="collections/index.html" class="btn-primary">Explore Bridal Collection</a>' +
        '</div>';
      return;
    }

    var html = '<div class="cart-page-summary-head">Order Summary</div><div class="cart-drawer-body">';
    for (var i = 0; i < itemsList.length; i++) {
      var it = itemsList[i];
      html +=
        '<div class="cart-line">' +
        '  <span class="cart-line-img"><img src="' + it.image + '" alt="" loading="lazy"></span>' +
        '  <div class="cart-line-meta">' +
        '    <div class="cart-line-name">' + it.name + '</div>' +
        '    <div class="cart-line-variant">' + it.variant + ' &middot; Qty ' + it.qty + '</div>' +
        '  </div>' +
        '  <div class="cart-line-right"><div class="cart-line-price">' + window.IBCart.format(it.lineTotal) + '</div></div>' +
        '</div>';
    }
    html += '</div>' +
      '<div class="cart-summary">' +
      '  <div class="cart-summary-row"><span>Subtotal</span><span class="cart-summary-num">' + window.IBCart.format(t.subtotal) + '</span></div>' +
      '  <div class="cart-summary-row"><span>Shipping</span><span class="cart-summary-soft">Calculated at checkout</span></div>' +
      '  <div class="cart-summary-row"><span>Estimated tax</span><span class="cart-summary-num">' + window.IBCart.format(t.tax) + '</span></div>' +
      '  <div class="cart-summary-row cart-summary-total"><span>Total</span><span class="cart-summary-num">' + window.IBCart.format(t.total) + '</span></div>' +
      '</div>';
    summaryMount.innerHTML = html;
  }

  var validators = {
    firstName: function (v) { return v.trim().length > 0 || 'Please share your first name.'; },
    lastName:  function (v) { return v.trim().length > 0 || 'Please share your last name.'; },
    email:     function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.'; },
    phone:     function (v) { return v.trim() === '' || /^[\d\s()+.\-]{7,20}$/.test(v.trim()) || 'Please enter a valid phone number.'; },
    address:   function (v) { return v.trim().length > 3 || 'Please enter your street address.'; },
    city:      function (v) { return v.trim().length > 0 || 'Please enter your city.'; },
    state:     function (v) { return v.trim().length > 0 || 'Please enter your state.'; },
    zip:       function (v) { return /^\d{5}(-\d{4})?$/.test(v.trim()) || 'Please enter a valid ZIP code.'; }
  };

  function validateField(input) {
    var check = validators[input.name];
    if (!check) return true;
    var result = check(input.value);
    var field = input.closest('.checkout-field');
    var msg = field ? field.querySelector('.field-error-msg') : null;
    var ok = result === true;
    input.classList.toggle('field-error', !ok);
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (field) field.classList.toggle('has-error', !ok);
    if (msg && !ok) msg.textContent = result;
    return ok;
  }

  form.addEventListener('blur', function (e) {
    if (e.target.name && validators[e.target.name]) validateField(e.target);
  }, true);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var inputs = form.querySelectorAll('input[name]');
    var allOk = true, firstBad = null;
    for (var i = 0; i < inputs.length; i++) {
      if (!validateField(inputs[i])) {
        allOk = false;
        if (!firstBad) firstBad = inputs[i];
      }
    }
    if (!allOk) { firstBad.focus(); return; }

    /* Stripe integration point: create PaymentIntent server-side,
       confirm here. For now, show the atelier confirmation state. */
    var t = window.IBCart.getTotals();
    document.getElementById('checkoutMain').innerHTML =
      '<div class="checkout-confirmation">' +
      '<h2>Thank you — your request is with the atelier.</h2>' +
      '<p>Online payment opens soon. Until then, we’ve noted your ' + t.count +
      (t.count === 1 ? ' piece' : ' pieces') + ' (' + window.IBCart.format(t.total) +
      ' estimated) and Michelle will reach out to <em>' + form.email.value.replace(/</g, '&lt;') +
      '</em> within one business day to complete your order personally.</p>' +
      '<a href="index.html" class="btn-outline-dark">Return Home</a>' +
      '</div>';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  renderSummary();
})();
