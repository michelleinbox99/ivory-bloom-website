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
    var shipRow = (t.shipping === null || t.shipping === undefined)
      ? '<span class="cart-summary-soft">Calculated at checkout</span>'
      : (t.shipping === 0
        ? '<span class="cart-summary-num" style="color: var(--success);">Free</span>'
        : '<span class="cart-summary-num">' + window.IBCart.format(t.shipping) + '</span>');
    html += '</div>' +
      '<div class="cart-summary">' +
      '  <div class="cart-summary-row"><span>Subtotal</span><span class="cart-summary-num">' + window.IBCart.format(t.subtotal) + '</span></div>' +
      '  <div class="cart-summary-row"><span>Estimated shipping</span>' + shipRow + '</div>' +
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

  function orderPayload() {
    var lines = window.IBCart.getItems().map(function (it) {
      return it.qty + 'x ' + it.name + ' [' + it.variant + '] — ' + window.IBCart.format(it.lineTotal);
    });
    var t = window.IBCart.getTotals();
    return {
      _subject: 'NEW ORDER REQUEST — Ivory & Bloom Atelier (' + window.IBCart.format(t.total) + ')',
      orderItems: lines.join('\n'),
      subtotal: window.IBCart.format(t.subtotal),
      estimatedShipping: (t.shipping === null || t.shipping === undefined) ? 'TBD' : window.IBCart.format(t.shipping),
      estimatedTax: window.IBCart.format(t.tax),
      estimatedTotal: window.IBCart.format(t.total),
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value.trim(),
      zip: form.zip.value.trim()
    };
  }

  var submitting = false;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitting) return;
    var inputs = form.querySelectorAll('input[name]');
    var allOk = true, firstBad = null;
    for (var i = 0; i < inputs.length; i++) {
      if (!validateField(inputs[i])) {
        allOk = false;
        if (!firstBad) firstBad = inputs[i];
      }
    }
    if (!allOk) { firstBad.focus(); return; }

    /* Stripe integration point: when IB_CONFIG.stripePublishableKey is
       set, redirect to Stripe-hosted checkout here instead (Apple Pay /
       Google Pay come built in). Until then the order request is
       delivered to the atelier inbox via Formspree. */
    var endpoint = (window.IB_CONFIG && window.IB_CONFIG.orderEndpoint) || '';
    var submitBtn = form.querySelector('button[type="submit"]');
    var t = window.IBCart.getTotals();
    var email = form.email.value.replace(/</g, '&lt;');

    function confirm() {
      document.getElementById('checkoutMain').innerHTML =
        '<div class="checkout-confirmation">' +
        '<h2>Thank you — your request is with the atelier.</h2>' +
        '<p>Online payment opens soon. Until then, we’ve received your ' + t.count +
        (t.count === 1 ? ' piece' : ' pieces') + ' (' + window.IBCart.format(t.total) +
        ' estimated) and Michelle will reach out to <em>' + email +
        '</em> within one business day to complete your order personally.</p>' +
        '<a href="index.html" class="btn-outline-dark">Return Home</a>' +
        '</div>';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (!endpoint) { confirm(); return; }

    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Your Request…';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload())
    }).then(function (res) {
      if (!res.ok) throw new Error('send failed');
      confirm();
    }).catch(function () {
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Place Order Request';
      var err = form.querySelector('.checkout-submit-error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'checkout-submit-error field-error-msg';
        err.style.display = 'block';
        err.setAttribute('role', 'alert');
        submitBtn.parentElement.appendChild(err);
      }
      err.textContent = 'Something went wrong sending your request. Please try again, or email michelleinbox99@gmail.com directly.';
    });
  });

  renderSummary();
})();
