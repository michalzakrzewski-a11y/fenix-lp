// Generator landing page'y: content/*.json + template.html -> dist/<slug>/index.html
// Uruchomienie: node build.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync, cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const template = readFileSync(join(root, 'template.html'), 'utf8');

const storesSectionTpl = (data) => `
<section id="sklepy">
  <div class="wrap">
    <h2>${data.storesHeading}</h2>
    <p class="prose">${data.storesIntro || ''}</p>
    <div class="stores-grid">
      <div id="map"></div>
      <div class="store-list">${(data.stores || []).map(s =>
        `<div class="store"><h3>${s.name}</h3><p>${s.address}</p><a href="tel:${s.phone.replace(/\s/g, '')}">${s.phone}</a>${s.email ? ` · <a href="mailto:${s.email}">${s.email}</a>` : ''}</div>`
      ).join('\n')}</div>
    </div>
  </div>
</section>`;

const mapScriptTpl = (data) => `
<script>window.L_DISABLE_3D = true;</script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
const stores = ${JSON.stringify(data.stores)};
const map = L.map('map', {
  zoomAnimation: false, fadeAnimation: false, markerZoomAnimation: false,
  scrollWheelZoom: false,           // kółko myszy przewija stronę, nie zoomuje mapy
  dragging: !L.Browser.mobile       // na telefonie strona przewija się palcem nad mapą
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const markers = stores.map(s =>
  L.marker([s.lat, s.lng]).addTo(map)
    .bindPopup(\`<b>\${s.name}</b><br>\${s.address}<br><a href="tel:\${s.phone.replace(/\\s/g,'')}">\${s.phone}</a>\`)
);
map.fitBounds(L.featureGroup(markers).getBounds().pad(0.12));
document.querySelectorAll('.store').forEach((el, i) => {
  el.addEventListener('click', () => {
    map.setView([stores[i].lat, stores[i].lng], 13);
    markers[i].openPopup();
    window.dataLayer && window.dataLayer.push({event: 'store_click', store_name: stores[i].name});
  });
});
</script>`;

// data.theme (opcjonalne) -> nadpisanie zmiennych CSS; klucze jak w :root bez "--"
const themeCssTpl = (theme) => {
  const vars = Object.entries(theme)
    .map(([k, v]) => `--${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}`)
    .join(';');
  return `:root{${vars}}`;
};

const contactStripTpl = (c) => `
<section class="contact-strip" id="kontakt">
  <div class="wrap">
    <div>
      <h2>${c.heading}</h2>
      <p>${c.text || ''}</p>
    </div>
    <div class="contact-actions">
      <a class="tel" href="tel:${c.phone.replace(/\s/g, '')}" data-gtm="contact-tel">☎ ${c.phone}</a>
      <a class="mail" href="mailto:${c.email}" data-gtm="contact-mail">${c.email}</a>
    </div>
  </div>
</section>`;

const files = readdirSync(join(root, 'content')).filter(f => f.endsWith('.json'));
for (const file of files) {
  const data = JSON.parse(readFileSync(join(root, 'content', file), 'utf8'));

  const featuresHtml = (data.features || []).map(f =>
    `<div class="feature"><h3>${f.title}</h3><p>${f.text}</p></div>`
  ).join('\n');

  const galleryHtml = (data.gallery || []).map(g =>
    `<img src="${g.src}" alt="${g.alt}" loading="lazy">`
  ).join('\n');

  const tablesHtml = (data.tables || []).map(t => `
    <div class="tbl"><h3>${t.heading}</h3><table>${t.rows.map(r =>
      `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`
    ).join('')}</table>${t.note ? `<p class="note">${t.note}</p>` : ''}</div>`
  ).join('\n');

  const hasStores = (data.stores || []).length > 0;
  const hasTables = (data.tables || []).length > 0;

  let html = template;
  if (!hasTables) html = html.replace(/<section id="dawkowanie">[\s\S]*?<\/section>/, '');
  html = html
    .replaceAll('{{topLogoHtml}}', data.topLogo
      ? `<img class="brand-logo" src="${data.topLogo}" alt="${data.topLogoAlt || ''}">`
      : `<div class="logo">Fenix <b>Horse</b></div>`)
    .replaceAll('{{heroImageHtml}}', data.heroImage
      ? `<div class="hero-img"><img src="${data.heroImage}" alt="${data.heroImageAlt || data.heroTitle}" fetchpriority="high"></div>`
      : '')
    .replaceAll('{{galleryHtml}}', galleryHtml)
    .replaceAll('{{featuresHtml}}', featuresHtml)
    .replaceAll('{{tablesHtml}}', tablesHtml)
    .replaceAll('{{themeCss}}', data.theme ? themeCssTpl(data.theme) : '')
    .replaceAll('{{contactStrip}}', data.contact ? contactStripTpl(data.contact) : '')
    .replaceAll('{{heroNoteHtml}}', data.heroNote ? `<p class="hero-note">${data.heroNote}</p>` : '')
    .replaceAll('{{ctaHref}}', data.ctaHref || (hasStores ? '#sklepy' : 'https://fenix.net.pl'))
    .replaceAll('{{storesSection}}', hasStores ? storesSectionTpl(data) : '')
    .replaceAll('{{mapScript}}', hasStores ? mapScriptTpl(data) : '');

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') html = html.replaceAll(`{{${key}}}`, value);
  }

  const leftover = html.match(/{{\w+}}/g);
  if (leftover) throw new Error(`${file}: brak wartości dla ${[...new Set(leftover)].join(', ')}`);

  const outDir = join(root, 'dist', data.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`✓ dist/${data.slug}/index.html`);
}

// Grafiki wspólne
if (existsSync(join(root, 'assets'))) {
  cpSync(join(root, 'assets'), join(root, 'dist', 'assets'), { recursive: true });
  console.log('✓ dist/assets/');
}

// Root bez sluga -> przekierowanie na stronę główną Fenix Horse
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist', 'index.html'),
  '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=https://fenix.net.pl/"><title>Fenix Horse</title><a href="https://fenix.net.pl/">fenix.net.pl</a>');

console.log(`Gotowe: ${files.length} landing(ów).`);
