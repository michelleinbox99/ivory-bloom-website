/* ============================================================
   Ivory & Bloom Atelier — Consent & Service Loader
   GDPR-style cookie consent banner + gated loading of analytics
   and marketing tags. No tag loads before the visitor accepts,
   and no tag loads at all until its ID is filled in js/config.js.
   Declining stores the choice and nothing is ever loaded.
   Styles are injected here so every page (including the script-
   light journal pages) needs only this file + config.js.
   ============================================================ */

(function () {
  'use strict';

  var CFG = window.IB_CONFIG || {};
  var CONSENT_KEY = 'ib_consent_v1';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  /* ---------- tag loaders (called only with consent + ID) ---------- */

  function addScript(src, attrs) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    if (attrs) for (var k in attrs) s.setAttribute(k, attrs[k]);
    document.head.appendChild(s);
    return s;
  }

  function loadServices() {
    if (CFG.gtmContainerId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      addScript('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(CFG.gtmContainerId));
    } else if (CFG.ga4MeasurementId) {
      addScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CFG.ga4MeasurementId));
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', CFG.ga4MeasurementId, { anonymize_ip: true });
    }

    if (CFG.clarityProjectId) {
      (function (c, l, a, r, i) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        var t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        var y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', CFG.clarityProjectId);
    }

    if (CFG.metaPixelId) {
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v;
        s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CFG.metaPixelId);
      window.fbq('track', 'PageView');
    }

    if (CFG.pinterestTagId) {
      (function (e) {
        if (!window.pintrk) {
          window.pintrk = function () { window.pintrk.queue.push(Array.prototype.slice.call(arguments)); };
          var n = window.pintrk; n.queue = []; n.version = '3.0';
          var t = document.createElement('script'); t.async = !0; t.src = e;
          var r = document.getElementsByTagName('script')[0]; r.parentNode.insertBefore(t, r);
        }
      })('https://s.pinimg.com/ct/core.js');
      window.pintrk('load', CFG.pinterestTagId);
      window.pintrk('page');
    }

    if (CFG.klaviyoPublicKey) {
      addScript('https://static.klaviyo.com/onsite/js/' + encodeURIComponent(CFG.klaviyoPublicKey) + '/klaviyo.js');
    }
  }

  function anyServiceConfigured() {
    return !!(CFG.gtmContainerId || CFG.ga4MeasurementId || CFG.clarityProjectId ||
      CFG.metaPixelId || CFG.pinterestTagId || CFG.klaviyoPublicKey);
  }

  /* ---------- banner ---------- */

  var BANNER_CSS =
    '.ib-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:2100;max-width:560px;margin:0 auto;' +
    'background:#FAF6F3;border:1px solid #CBBBA9;border-radius:2px;box-shadow:0 8px 24px rgba(51,37,30,0.12);' +
    'padding:20px 22px;font-family:Jost,sans-serif;color:#4A3B33;font-size:13.5px;font-weight:300;line-height:1.6;}' +
    '.ib-consent p{margin:0 0 14px;}' +
    '.ib-consent a{color:#9C7360;text-decoration:underline;text-underline-offset:3px;}' +
    '.ib-consent-actions{display:flex;gap:10px;flex-wrap:wrap;}' +
    '.ib-consent-btn{min-height:44px;padding:10px 22px;border-radius:2px;font-family:Jost,sans-serif;' +
    'font-size:11.5px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;}' +
    '.ib-consent-accept{background:#C59F8B;border:1px solid #C59F8B;color:#fff;}' +
    '.ib-consent-accept:hover{background:#33251E;border-color:#33251E;}' +
    '.ib-consent-decline{background:transparent;border:1px solid #CBBBA9;color:#4A3B33;}' +
    '.ib-consent-decline:hover{border-color:#33251E;}' +
    '.ib-consent-btn:focus-visible{outline:2px solid #C59F8B;outline-offset:2px;}';

  function root() {
    /* derive site root from this script's own src */
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src');
      if (/js\/services\.js/.test(src)) return src.replace(/js\/services\.js.*$/, '') || './';
    }
    return './';
  }

  function showBanner() {
    var style = document.createElement('style');
    style.textContent = BANNER_CSS;
    document.head.appendChild(style);

    var el = document.createElement('div');
    el.className = 'ib-consent';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML =
      '<p>We use a few cookies to understand how brides find and use the atelier — never to sell your data. ' +
      'Essential features (your cart, your wishlist) work either way. ' +
      '<a href="' + root() + 'privacy.html">Privacy</a></p>' +
      '<div class="ib-consent-actions">' +
      '<button class="ib-consent-btn ib-consent-accept">Accept</button>' +
      '<button class="ib-consent-btn ib-consent-decline">Essential Only</button>' +
      '</div>';

    el.querySelector('.ib-consent-accept').addEventListener('click', function () {
      setConsent('accepted');
      el.remove();
      loadServices();
    });
    el.querySelector('.ib-consent-decline').addEventListener('click', function () {
      setConsent('declined');
      el.remove();
    });

    document.body.appendChild(el);
  }

  function init() {
    var consent = getConsent();
    if (consent === 'accepted') { loadServices(); return; }
    if (consent === 'declined') return;
    /* No decision yet: only interrupt the visitor if there is
       actually something to consent to. */
    if (anyServiceConfigured()) showBanner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.IBConsent = {
    status: getConsent,
    reset: function () { try { localStorage.removeItem(CONSENT_KEY); } catch (e) {} }
  };
})();
