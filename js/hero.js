// ===== Hero cinematic slider =====

(function () {
  const heroSection = document.getElementById('hero');
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsContainer = document.getElementById('heroDots');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  const curNumEl = document.getElementById('heroCurNum');
  const totalNumEl = document.getElementById('heroTotalNum');
  const total = slides.length;
  const SLIDE_DURATION = 6500; // ms per slide
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer = null;
  let progressRAF = null;
  let progressStart = null;
  let isPaused = false;

  totalNumEl.textContent = String(total).padStart(2, '0');

  // Build pagination dots with inner progress-fill span
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1} of ${total}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if (i === 0) dot.classList.add('active');
    const fill = document.createElement('span');
    fill.className = 'fill';
    dot.appendChild(fill);
    dot.addEventListener('click', () => goTo(i, true));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.querySelectorAll('button'));

  // Only the active slide + the next one in sequence carry a real src (set in HTML).
  // The rest sit on data-src/data-srcset until the carousel is about to reach them,
  // since loading="lazy" doesn't help here — every slide occupies the same box.
  function preloadSlide(index) {
    const img = slides[index] && slides[index].querySelector('.hero-media img');
    if (!img || !img.dataset.src) return;
    img.src = img.dataset.src;
    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
    delete img.dataset.src;
    delete img.dataset.srcset;
  }

  function restartKenBurns(slide) {
    const img = slide.querySelector('.hero-media img');
    if (!img || prefersReducedMotion) return;
    const cls = img.classList.contains('kb-in') ? 'kb-in' : 'kb-out';
    img.classList.remove(cls);
    // Force reflow so the animation restarts cleanly
    void img.offsetWidth;
    img.classList.add(cls);
  }

  function setDotProgress(pct) {
    const fill = dots[current] && dots[current].querySelector('.fill');
    if (fill) fill.style.width = pct + '%';
  }

  function clearAllDotFills() {
    dots.forEach(d => { const f = d.querySelector('.fill'); if (f) f.style.width = '0%'; });
  }

  function goTo(index, isManual) {
    if (index === current) return;
    const nextIndex = (index + total) % total;

    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = nextIndex;
    preloadSlide(current);
    preloadSlide((current + 1) % total);

    slides[current].classList.add('active');
    slides[current].setAttribute('aria-hidden', 'false');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
    curNumEl.textContent = String(current + 1).padStart(2, '0');

    restartKenBurns(slides[current]);
    clearAllDotFills();
    startProgress();

    if (isManual) restartAutoplay();
  }

  function next() { goTo(current + 1, false); }
  function prev() { goTo(current - 1, true); }

  function startProgress() {
    cancelAnimationFrame(progressRAF);
    progressStart = null;
    if (prefersReducedMotion) return;
    function step(ts) {
      if (isPaused) { progressStart = null; progressRAF = requestAnimationFrame(step); return; }
      if (!progressStart) progressStart = ts;
      const elapsed = ts - progressStart;
      const pct = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setDotProgress(pct);
      if (pct < 100) progressRAF = requestAnimationFrame(step);
    }
    progressRAF = requestAnimationFrame(step);
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => { if (!isPaused) next(); }, SLIDE_DURATION);
    startProgress();
  }
  function restartAutoplay() { startAutoplay(); }

  prevBtn.addEventListener('click', () => goTo(current - 1, true));
  nextBtn.addEventListener('click', () => goTo(current + 1, true));

  // Pause on hover / keyboard focus, resume on leave
  ['mouseenter', 'focusin'].forEach(evt => heroSection.addEventListener(evt, () => { isPaused = true; }));
  ['mouseleave', 'focusout'].forEach(evt => heroSection.addEventListener(evt, () => { isPaused = false; }));

  // Keyboard navigation when hero is focused
  heroSection.setAttribute('tabindex', '-1');
  heroSection.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1, true);
    if (e.key === 'ArrowLeft') goTo(current - 1, true);
  });

  // Swipe support
  let touchStartX = null;
  heroSection.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; isPaused = true; }, { passive: true });
  heroSection.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? goTo(current + 1, true) : goTo(current - 1, true); }
    touchStartX = null;
    isPaused = false;
  }, { passive: true });

  // Kick off first Ken Burns + autoplay
  restartKenBurns(slides[0]);
  startAutoplay();
})();
