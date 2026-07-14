// Generator landing page'y: content/*.json + template.html -> dist/<slug>/index.html
// Uruchomienie: node build.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const template = readFileSync(join(root, 'template.html'), 'utf8');

const files = readdirSync(join(root, 'content')).filter(f => f.endsWith('.json'));
for (const file of files) {
  const data = JSON.parse(readFileSync(join(root, 'content', file), 'utf8'));

  const featuresHtml = (data.features || []).map(f =>
    `<div class="feature"><h3>${f.title}</h3><p>${f.text}</p></div>`
  ).join('\n');

  const storesHtml = (data.stores || []).map(s =>
    `<div class="store"><h3>${s.name}</h3><p>${s.address}</p><a href="tel:${s.phone.replace(/\s/g, '')}">${s.phone}</a></div>`
  ).join('\n');

  let html = template
    .replaceAll('{{featuresHtml}}', featuresHtml)
    .replaceAll('{{storesHtml}}', storesHtml)
    .replaceAll('{{storesJson}}', JSON.stringify(data.stores || []));

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
// Root bez sluga -> przekierowanie na stronę główną Fenix Horse
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist', 'index.html'),
  '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=https://fenix.net.pl/"><title>Fenix Horse</title><a href="https://fenix.net.pl/">fenix.net.pl</a>');

console.log(`Gotowe: ${files.length} landing(ów).`);
