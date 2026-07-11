// ===== Atelier gallery: category filtering =====

(function () {
  const filterBar = document.querySelector('.gallery-filters');
  if (!filterBar) return;
  const filters = Array.from(filterBar.querySelectorAll('.gallery-filter'));
  const items = Array.from(document.querySelectorAll('.gallery-item'));

  function applyFilter(category) {
    items.forEach(item => {
      const match = category === 'all' || item.dataset.category === category;
      if (match) {
        item.classList.remove('is-hidden');
        // allow display to apply before removing fade
        requestAnimationFrame(() => item.classList.remove('is-fading'));
      } else {
        item.classList.add('is-fading');
        setTimeout(() => item.classList.add('is-hidden'), 300);
      }
    });
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => {
        f.classList.toggle('active', f === btn);
        f.setAttribute('aria-selected', String(f === btn));
      });
      applyFilter(btn.dataset.filter);
    });
  });
})();
