// ===== Atelier Customizer: accent theme switching =====

const themes = [
  {
    id: 'blush-pearl-cocoa', name: 'Blush Pearl & Cocoa',
    desc: 'Ultra-romantic palette — soft rose undertones with deep chocolate text.',
    vars: { '--espresso': '#33251E', '--parchment': '#FAF6F3', '--brass': '#C59F8B', '--terracotta-rose': '#9C7360', '--moss': '#8A9A7E', '--linen': '#F1E5DE', '--white': '#FFFFFF', '--ink-soft': '#4A3B33' },
    palette: ['#FCF8F7', '#F1E5DE', '#E5D5CD', '#C59F8B', '#33251E']
  },
  {
    id: 'atelier-dusk', name: 'Atelier at Dusk',
    desc: 'Warm and dramatic — deep espresso with antique brass gold.',
    vars: { '--espresso': '#1C1815', '--parchment': '#FAF8F4', '--brass': '#C9A961', '--terracotta-rose': '#8B6F5C', '--moss': '#4A5D4E', '--linen': '#EFE8DA', '--white': '#FFFFFF', '--ink-soft': '#332C25' },
    palette: ['#FAF8F4', '#EFE8DA', '#C9A961', '#8B6F5C', '#1C1815']
  },
  {
    id: 'champagne-sage', name: 'Champagne & Sage',
    desc: 'Fresh and garden-bright — ivory linen with champagne gold and sage.',
    vars: { '--espresso': '#2D2420', '--parchment': '#F8F5EE', '--brass': '#D4AF7A', '--terracotta-rose': '#B76E79', '--moss': '#8A9A7E', '--linen': '#EFE7D6', '--white': '#FFFFFF', '--ink-soft': '#3D342C' },
    palette: ['#F8F5EE', '#EFE7D6', '#D4AF7A', '#8A9A7E', '#2D2420']
  },
  {
    id: 'ivory-noir', name: 'Ivory & Noir',
    desc: 'Crisp and modern-luxe — bright ivory with graphite and dusty plum.',
    vars: { '--espresso': '#211E1F', '--parchment': '#FAF8F6', '--brass': '#B08D6A', '--terracotta-rose': '#8F6A73', '--moss': '#6B7268', '--linen': '#ECE7DF', '--white': '#FFFFFF', '--ink-soft': '#332F2E' },
    palette: ['#FAF8F6', '#ECE7DF', '#B08D6A', '#8F6A73', '#211E1F']
  }
];
const THEME_KEY = 'ivoryBloomTheme';
function applyTheme(theme) {
  Object.entries(theme.vars).forEach(([key, val]) => document.documentElement.style.setProperty(key, val));
  document.querySelectorAll('.theme-card').forEach(card => card.classList.toggle('is-active', card.dataset.themeId === theme.id));
}
function saveTheme(id) { try { localStorage.setItem(THEME_KEY, id); } catch (e) {} }
function loadSavedThemeId() { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } }
function buildThemeCards() {
  const list = document.getElementById('themeCardList');
  const savedId = loadSavedThemeId() || 'blush-pearl-cocoa';
  themes.forEach(theme => {
    const card = document.createElement('div');
    card.className = 'theme-card';
    card.dataset.themeId = theme.id;
    if (theme.id === savedId) card.classList.add('is-active');
    const swatches = theme.palette.map(c => `<span class="theme-swatch" style="background:${c}"></span>`).join('');
    card.innerHTML = `
      <div class="theme-card-top">
        <span class="theme-card-name">${theme.name}</span>
        <span class="theme-active-badge">&#10003; Active</span>
      </div>
      <div class="theme-card-desc">${theme.desc}</div>
      <div class="theme-palette"><span class="theme-palette-label">Palette</span>${swatches}</div>
    `;
    card.addEventListener('click', () => { applyTheme(theme); saveTheme(theme.id); });
    list.appendChild(card);
  });
  const activeTheme = themes.find(t => t.id === savedId) || themes[0];
  applyTheme(activeTheme);
}
buildThemeCards();

const customizerToggle = document.getElementById('customizerToggle');
const customizerPanel = document.getElementById('customizerPanel');
customizerToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = customizerPanel.classList.toggle('open');
  customizerToggle.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', (e) => {
  if (!customizerPanel.contains(e.target) && !customizerToggle.contains(e.target)) {
    customizerPanel.classList.remove('open');
    customizerToggle.setAttribute('aria-expanded', 'false');
  }
});
