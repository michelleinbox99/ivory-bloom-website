// ===== Newsletter ("Style Notes"): lightweight email capture =====
// Drives every form.js-newsletter on the page (footer strip + homepage section),
// so the same capture can appear more than once. Uses the same Formspree endpoint
// as the inquiry form, tagged formType=newsletter so signups are easy to filter.

(function () {
  const forms = document.querySelectorAll('form.js-newsletter');
  if (!forms.length) return;

  const FORM_ENDPOINT = 'https://formspree.io/f/xzdnpdab';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(function (form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const statusEl = form.querySelector('[data-newsletter-status]');
    const honeypot = form.querySelector('input[name="companyWebsite"]');
    let isSubmitting = false;

    // Toggle classes rather than overwrite className, so each form keeps its own
    // base status class (.fq-news-status / .capture-status) for positioning.
    function showStatus(type, message) {
      if (!statusEl) return;
      statusEl.classList.remove('success', 'error');
      statusEl.classList.add('show', type);
      statusEl.textContent = message;
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (isSubmitting) return;

      // Honeypot: silently accept bot submissions without sending anything
      if (honeypot && honeypot.value.trim() !== '') {
        showStatus('success', 'Thank you — you are on the list.');
        form.reset();
        return;
      }

      const email = emailInput ? emailInput.value.trim() : '';
      if (!emailRegex.test(email)) {
        showStatus('error', 'Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      isSubmitting = true;
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData();
      formData.set('email', email);
      formData.set('formType', 'newsletter');
      formData.set('_subject', 'New Style Notes signup — ivoryandbloom.shop');

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Submission failed');
        showStatus('success', 'Thank you — you are on the list. A letter arrives only when there is something worth writing.');
        form.reset();
      } catch (err) {
        showStatus('error', 'Something went wrong. Please try again, or email michelleinbox99@gmail.com.');
      } finally {
        isSubmitting = false;
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
})();
