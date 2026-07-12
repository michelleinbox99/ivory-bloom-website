// ===== Footer newsletter (Style Notes): lightweight email capture =====
// Loaded by the site-footer partial on every non-journal page. Uses the same
// Formspree endpoint as the inquiry form, tagged so signups are easy to filter.

(function () {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const FORM_ENDPOINT = 'https://formspree.io/f/xzdnpdab';

  const emailInput = document.getElementById('nlEmail');
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusEl = document.getElementById('nlStatus');
  const honeypot = document.getElementById('nlWebsite');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isSubmitting = false;

  function showStatus(type, message) {
    statusEl.className = 'fq-news-status show ' + type;
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

    const email = emailInput.value.trim();
    if (!emailRegex.test(email)) {
      showStatus('error', 'Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;

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
      submitBtn.disabled = false;
    }
  });
})();
