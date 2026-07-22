# Kampania Google Ads — NUTRI-GARD (gotowa do wklejenia)

Konto Ads: **764-021-0990** · Strona docelowa: **https://lp.fenix.net.pl/nutri-gard/**

> ⚠️ Zasada prawna: w reklamach NIE piszemy „leczy wrzody/kwasicę". Tylko „wspiera / dla koni
> narażonych na…". Słowo „wrzody" można mieć jako SŁOWO KLUCZOWE (czego ludzie szukają),
> ale nie jako obietnicę w tekście reklamy.

## Ustawienia kampanii

- **Nazwa:** `NG | Search | PL`
- **Typ:** Sieć wyszukiwania (tylko Search — odznacz „Uwzględnij partnerów w sieci wyszukiwania" i „sieć reklamową", żeby budżet nie uciekał)
- **Budżet dzienny:** 30 zł
- **Strategia ustalania stawek:** na start **„Maksymalizuj liczbę kliknięć" z limitem CPC 1,50 zł** (kontrola kosztu, zbieramy dane). Po ~2 tyg. i min. 15–20 konwersjach → przełączyć na „Maksymalizuj liczbę konwersji". NIE włączać tCPA na start (nauka z GO NATIVE, issue #7).
- **Lokalizacja:** Polska. WAŻNE: w ustawieniach lokalizacji wybierz „Obecność: osoby w tym miejscu" (nie „zainteresowanie") — inaczej płacisz za kliknięcia spoza PL.
- **Język:** polski
- **Auto-tagowanie:** włączone (domyślnie) — daje GCLID i połączenie z GA4, nie trzeba UTM-ów.

## Grupy reklam, słowa kluczowe (dopasowanie do wyrażenia = "...")

**AG1 — Marka / produkt**
- `[nutri-gard]` (dopasowanie ścisłe)
- `"nutri gard koń"`
- `"foran nutri-gard"`
- `"foran equine"`

**AG2 — Trawienie / żołądek**
- `"suplement na trawienie dla konia"`
- `"suplement na żołądek konia"`
- `"probiotyk dla konia"`
- `"prebiotyk dla konia"`
- `"zakwaszenie żołądka u konia"`

**AG3 — Objawy / problemy**
- `"koń nie chce jeść"`
- `"słaby apetyt u konia"`
- `"koń traci kondycję"`
- `"suplement na wrzody u koni"`

**AG4 — Konie sportowe**
- `"suplement dla koni sportowych"`
- `"suplement dla konia wyścigowego"`
- `"wsparcie jelit konia"`

## Wykluczające słowa kluczowe (dodaj na poziomie kampanii)

pies · psa · kot · kota · dla psa · dla kota · człowiek · ludzi · dla ludzi · przepis ·
olx · allegro · używane · praca · za darmo · forum · opinie · wikipedia

## Reklama elastyczna (RSA) — jedna wspólna dla wszystkich grup

**Nagłówki (15, każdy ≤30 znaków — zweryfikowane):**
1. Nutri-Gard dla Twojego konia
2. Suplement na trawienie konia
3. Foran Nutri-Gard
4. Wsparcie żołądka i jelit
5. Zdrowe jelita, lepsza forma
6. Postbiotyk + prebiotyki
7. Dla koni sportowych
8. Smak jabłkowy, chętnie jedzą
9. Potwierdzone badaniem
10. Oficjalny dystrybutor Foran
11. Kup w sklepie w pobliżu
12. 11 sklepów w Polsce
13. Wsparcie trawienia konia
14. Na stres i słaby apetyt
15. Doradztwo: 887 735 100

**Opisy (4, każdy ≤90 znaków — zweryfikowane):**
1. Zaawansowany suplement Foran Nutri-Gard wspiera żołądek i jelita konia każdego dnia.
2. Postbiotyki, prebiotyki i witaminy z grupy B w smacznej, jabłkowej formule.
3. Dla koni narażonych na stres, słaby apetyt i spadki kondycji. Sprawdź, gdzie kupić.
4. Oficjalny dystrybutor Foran w Polsce. Kup w jednym z 11 sklepów partnerskich.

**Docelowy URL:** https://lp.fenix.net.pl/nutri-gard/
**Wyświetlany URL:** lp.fenix.net.pl / nutri-gard

## Rozszerzenia

**Linki do podstron (sitelinks) — jedna strona, ale różne sekcje (kotwice):**
- Gdzie kupić → https://lp.fenix.net.pl/nutri-gard/#sklepy
- Badanie skuteczności → https://lp.fenix.net.pl/nutri-gard/#badanie
- Dawkowanie i skład → https://lp.fenix.net.pl/nutri-gard/#dawkowanie
- Napisz do nas → https://lp.fenix.net.pl/nutri-gard/#kontakt

**Objaśnienia (callouts):** Oficjalny dystrybutor · Smak jabłkowy · Bezpieczny w zawodach · Doradztwo BOK

**Rozszerzenie połączeń:** 887 735 100 (BOK)

## PRZED startem (kolejność w panelu)

1. **Rozliczenia:** konto 764-021-0990 musi mieć dodaną metodę płatności (Ustawienia → Płatności).
2. **Połącz GA4 z Google Ads:** w GA4 (Fenix LP) → Administracja → Połączone usługi → Google Ads → połącz konto 764-021-0990.
3. **Import konwersji:** Google Ads → Cele → Konwersje → „+ Nowa" → import z GA4 → zaznacz `contact_form_submit`, `tel_click`, `store_contact_click`. Ustaw `contact_form_submit` jako główną (Podstawową), resztę jako Dodatkowe.
4. Dopiero potem uruchom kampanię (żeby od 1. dnia mierzyć konwersje).
