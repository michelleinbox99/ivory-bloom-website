// ===== Contact form: validation, honeypot, and submission =====

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const FORM_ENDPOINT = 'https://formspree.io/f/xzdnpdab';

  const submitBtn = document.getElementById('contactSubmitBtn');
  const statusEl = document.getElementById('formStatus');
  const honeypot = document.getElementById('companyWebsite');
  let isSubmitting = false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const requiredFields = [
    { id: 'contactName', validate: v => v.trim().length > 0 },
    { id: 'email', validate: v => emailRegex.test(v.trim()) },
    { id: 'service', validate: v => v.trim().length > 0 },
    { id: 'message', validate: v => v.trim().length >= 5 },
  ];

  // Select placeholder color state
  const serviceSel = document.getElementById('service');
  if (serviceSel) {
    serviceSel.addEventListener('change', () => serviceSel.classList.toggle('has-value', serviceSel.value !== ''));
  }

  function setFieldError(field, hasError) {
    field.classList.toggle('field-error', hasError);
    field.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  }

  function validateForm() {
    let isValid = true;
    requiredFields.forEach(({ id, validate }) => {
      const field = document.getElementById(id);
      const ok = validate(field.value);
      setFieldError(field, !ok);
      if (!ok) isValid = false;
    });
    return isValid;
  }

  // Live validation: clear error state as the person fixes a field
  requiredFields.forEach(({ id, validate }) => {
    const field = document.getElementById(id);
    field.addEventListener('input', () => {
      if (field.classList.contains('field-error') && validate(field.value)) {
        setFieldError(field, false);
      }
    });
    field.addEventListener('blur', () => {
      if (field.value.trim().length > 0) {
        setFieldError(field, !validate(field.value));
      }
    });
  });

  function showStatus(type, message) {
    statusEl.className = 'form-status show ' + type;
    const icon = type === 'success'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l2.25 2.25 4.5-4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>';
    statusEl.innerHTML = icon + '<span>' + message + '</span>';
  }

  function clearStatus() {
    statusEl.className = 'form-status';
    statusEl.innerHTML = '';
  }

  function setLoading(loading) {
    isSubmitting = loading;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('is-loading', loading);
    submitBtn.querySelector('.btn-label').textContent = loading ? 'Sending...' : 'Send Your Request';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (isSubmitting) return; // prevent duplicate submissions

    clearStatus();

    // Honeypot check: if this hidden field has a value, silently treat as spam
    if (honeypot && honeypot.value.trim() !== '') {
      showStatus('success', "Thank you! Your message has been sent. We'll be in touch soon.");
      form.reset();
      return;
    }

    if (!validateForm()) {
      showStatus('error', 'Please fill in all required fields correctly before sending.');
      const firstInvalid = form.querySelector('.field-error');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
      // Endpoint not yet configured — let the site owner know in-console without breaking UX for visitors.
      console.warn('Contact form: set FORM_ENDPOINT to your real Formspree endpoint to enable email delivery.');
    }

    setLoading(true);

    const formData = new FormData(form);
    // Basic input sanitization: trim whitespace on all text values before sending
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') formData.set(key, value.trim());
    }
    formData.set('_subject', 'New Wedding Inquiry from Ivory & Bloom Atelier Website');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showStatus('success', "Thank you! Your message has been sent. We'll be in touch within 1-2 business days.");
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      showStatus('error', "Something went wrong sending your message. Please try again, or email us directly at michelleinbox99@gmail.com.");
    } finally {
      setLoading(false);
    }
  });
})();
