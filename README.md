# Fenix LP — landing page kampanii (Fenix Horse)

Statyczne landing page pod kampanie Google Ads dla produktów jeździeckich.
Docelowy adres: **https://lp.fenix.net.pl/** (GitHub Pages). Projekt osobny od GO NATIVE.

## Jak to działa

- `template.html` — jeden wspólny szablon (wygląd wszystkich landingów).
- `content/*.json` — treść: **jeden plik = jeden landing** (teksty, atuty produktu, lista sklepów).
- `build.mjs` — skleja szablon z treścią do `dist/<slug>/index.html`.

## Nowy landing (dla Kasi)

1. Skopiuj istniejący plik w `content/`, np. `kaski-uvex.json` → `siodla-marki-x.json`.
2. Zmień `slug` (będzie adresem: `lp.fenix.net.pl/<slug>`) i wypełnij teksty.
3. Sklepy: nazwa, adres, telefon + współrzędne `lat`/`lng` (z Google Maps: PPM na pinezce → kopiuj współrzędne).
4. `node build.mjs` — wygeneruje stronę. Po wypchnięciu do repo GitHub Actions opublikuje ją automatycznie.

## Podgląd lokalny

```
node build.mjs
npx http-server dist -p 8123
```
→ http://localhost:8123/kaski-uvex/

## TODO wdrożeniowe

- [ ] Repo na GitHubie (osobne od gonative) + workflow deploy na GitHub Pages
- [ ] DNS: CNAME `lp.fenix.net.pl` → GitHub Pages (panel Google, gdzie jest domena)
- [ ] Nowe GA4 property + nowy kontener GTM (osobne od GO NATIVE!) — snippet do `template.html`
- [ ] Baner zgód Consent Mode v2
- [ ] Podpięcie konwersji pod konto Google Ads „fenix" (kampania Uvex)
- [ ] Prawdziwe zdjęcia produktów + realna lista sklepów partnerskich
