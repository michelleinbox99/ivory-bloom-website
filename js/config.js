/* ============================================================
   Ivory & Bloom Atelier — Site Services Configuration
   ONE place to connect production services. Every ID below is
   empty by default; a service activates only when its ID is
   filled in AND (for marketing/analytics) the visitor has
   accepted cookies. See docs/launch-services.md for the exact
   steps to create each account and find each ID.
   ============================================================ */

window.IB_CONFIG = {

  /* ---- Order delivery (LIVE — same Formspree inbox as the
     consultation form) ---- */
  orderEndpoint: 'https://formspree.io/f/xzdnpdab',

  /* ---- Payments (Stripe) ----
     Static hosting path: create Payment Links in the Stripe
     dashboard (no server needed; Apple Pay & Google Pay included
     automatically on Stripe-hosted pages). Until then, checkout
     delivers order requests by email and Michelle arranges
     payment personally. */
  stripePublishableKey: '',   // pk_test_... then pk_live_...

  /* ---- Shipping estimates (PLACEHOLDER rates — confirm) ----
     Real-time USPS/UPS/FedEx rates require a backend or the
     WooCommerce migration; until then the cart shows this
     honest flat-rate policy. */
  shipping: {
    flatRate: 8,            // USD, PLACEHOLDER
    freeThreshold: 150,     // free shipping at/above this subtotal, PLACEHOLDER
    leadTimeDays: [14, 21], // made-to-order window (matches site copy: 2-3 weeks)
    transitDays: [3, 5]     // domestic transit after shipment
  },

  /* ---- Tax ----
     Shown as an estimate; exact destination-based tax should be
     calculated by Stripe Tax / WooCommerce at real checkout. */
  taxRate: 0.08,

  /* ---- Analytics & marketing (all load ONLY after cookie
     consent, and only when an ID is present) ---- */
  ga4MeasurementId: '',       // G-XXXXXXXXXX
  gtmContainerId: '',         // GTM-XXXXXXX (use GTM *or* GA4 direct, not both)
  clarityProjectId: '',       // from clarity.microsoft.com
  metaPixelId: '',            // from Meta Events Manager
  pinterestTagId: '',         // from Pinterest Ads
  klaviyoPublicKey: ''        // Klaviyo "public API key" / site ID
};
