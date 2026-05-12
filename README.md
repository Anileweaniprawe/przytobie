# PrzyTobie

Aplikacja towarzysząca dla pacjentek z rakiem piersi. Demo hackathonowe — Next.js, dostępne przez QR kod w przeglądarce mobilnej.

---

## Technologie

- **Next.js 14** (App Router, `'use client'`)
- **React 18** — `useState`, `useRef`, `Suspense`
- **Google Fonts** — Manrope (UI) + Newsreader (akcenty kursywą)
- **Inline SVG** — żadnych zewnętrznych bibliotek ikon
- **CSS** — globals.css z radialnym gradientem tła, animacje `fadeUp` / `screenFadeIn`
- Deploy: **Vercel**

Na desktopie aplikacja wyświetla się w ramce telefonu (390×844 px) wycentrowanej na szarym tle.

---

## Struktura plików

```
app/
  page.js              # Ekran powitalny (/)
  layout.js            # Fonty, meta, wrapper .app-shell
  globals.css          # Reset, tło gradientowe, animacje, ramka desktop
  onboarding/page.js   # Onboarding — wybór etapu (/onboarding)
  dashboard/page.js    # Dashboard główny (/dashboard?stage=1–5)
  timeline/page.js     # Oś czasu leczenia (/timeline?stage=1–6&dash=1–5)
  sciezka/page.js      # Ekran "Ścieżka" (legacy, /sciezka)
  dzis/page.js         # Ekran "Dziś" (legacy, /dzis)

components/
  Mark.js              # Logo SVG (3 warianty: embrace, path, hands)
  screens.js           # 10 ekranów podrzędnych (router useState w dashboardzie)

lib/
  theme.js             # Paleta kolorów PT (plum, cream, blush, lilac, salmon…)
```

---

## Ekrany i nawigacja

### 1. Ekran powitalny `/`
- Logo Mark + wordmark „PrzyTobie" + tagline „Na każdym kroku."
- Przycisk „Zacznij ze mną" → `/onboarding`
- Przycisk „Mam już konto" (dekoracyjny, bez akcji)

### 2. Onboarding `/onboarding`
Krok 1/2 — wybór etapu leczenia. 5 kart:

| Etap | Nazwa |
|------|-------|
| 1 | Skierowanie |
| 2 | Biopsja |
| 3 | Diagnoza |
| 4 | Leczenie |
| 5 | Rehabilitacja |

Przycisk „Dalej" → `/dashboard?stage=N`

### 3. Dashboard `/dashboard?stage=1–5`
Główny hub — 5 wariantów zależnych od etapu (`?stage=`).

**Wspólne elementy:**
- Header z awatarem, imieniem „Agnieszko" i dzisiejszą datą
- Karta Hero z tytułem, podtytułem i CTA
- Pasek postępu ścieżki leczenia (5 kroków)
- Siatka 4 szybkich akcji (2×2)
- Demo-pasek do przełączania etapów (ciemny, na dole)

**Specyficzne dla etapów:**
- Etap 2: pole daty odbioru wyników biopsji z dzwonkiem
- Etap 4: widget „Jak się dziś czujesz?" — 5 buziek nastrojowych
- Etap 5: karta „Opieka po leczeniu" z chipami (Amazonki, Peruki, Tatuaż medyczny)

**Nawigacja z siatki szybkich akcji (router useState):**

| Kafelek | Docelowy ekran |
|---------|----------------|
| Gdzie się zbadać | FindClinic |
| Co zabrać na badanie | Checklist (typ: badanie) |
| Co zabrać na konsylium | Checklist (typ: konsylium) |
| Twoje skierowanie | DocumentsScreen |
| Moje dokumenty | DocumentsScreen |
| Zapytaj asystentkę / Pytania do lekarza / Co oznacza biopsja | ChatScreen |
| Moja ścieżka leczenia | `/timeline?stage=N` (nawigacja URL) |
| Umów wizytę / Wizyty | BookVisit |
| Wsparcie psychologiczne / Wsparcie / Grupy wsparcia | SupportScreen |
| Zgłoś objaw | ReportSymptom |
| Moje wyniki | MyResults |
| Plan rehabilitacji | RehabPlan |
| Zadbaj o siebie | PartnersScreen |

### 4. Oś czasu `/timeline?stage=1–6&dash=N`
Pionowa oś czasu leczenia — 6 etapów klinicznych:

1. Wykrycie i badania
2. Diagnostyka
3. Leczenie operacyjne
4. Leczenie uzupełniające
5. Opieka po leczeniu
6. Powrót do życia

- Węzły: zrobione (fiolet + ptaszek) / aktywny (pulsujący łosoś) / przyszłe (przerywana linia)
- Akordeon — kliknięcie etapu rozwija kartę z opisem
- **Etap 3 (aktywny domyślnie)**: blok „Co teraz?", rozwijana sekcja „Pytania do lekarza", przycisk „Zapytaj asystentkę"
- Strzałka wstecz → `/dashboard?stage=N`
- Demo-pasek do przełączania etapów 1–6

---

## Ekrany podrzędne (`components/screens.js`)

Wszystkie 10 ekranów używają wspólnych komponentów `ScreenHeader`, `Wrap`, `Card`, `SectionLabel` i zestawu ikon SVG.

| # | Komponent | Opis |
|---|-----------|------|
| 1 | **FindClinic** | 3 certyfikowane placówki BCU z odległością, przycisk „Zadzwoń" |
| 2 | **Checklist** | Lista rzeczy do zabrania (typ: badanie / konsylium), checkboxy z paskiem postępu |
| 3 | **ChatScreen** | Czat z Asystentką BCU — 3 predefiniowane wiadomości, 3 chipy podpowiedzi z gotowymi odpowiedziami, pole tekstowe |
| 4 | **DocumentsScreen** | 3 dokumenty z kolorowym ikonem, przycisk „Dodaj dokument" |
| 5 | **BookVisit** | 2 nadchodzące wizyty z kolorowym paskiem bocznym, przycisk „Dodaj wizytę" |
| 6 | **ReportSymptom** | 4 poziomy nasilenia objawów, pole tekstowe, stan sukcesu po wysłaniu |
| 7 | **MyResults** | 3 wyniki z akordeonem, statusy „Nowy" / „Przeczytany" |
| 8 | **SupportScreen** | 3 karty wsparcia: Amazonki, Psycholog BCU, OnkoCafe |
| 9 | **RehabPlan** | 3 aktywności tygodniowe z kropkami postępu (Fizjoterapia, Spacer, Dieta) |
| 10 | **PartnersScreen** | 8 partnerów w 4 kategoriach, filtry chipami, różne typy przycisków akcji, stały pasek dolny |

### PartnersScreen — szczegóły
Kategorie i typy przycisków:

| Kategoria | Partnerzy | Typ akcji |
|-----------|-----------|-----------|
| Tatuaż medyczny | Studio Anety Kowalskiej (BCU), MedInk | telefon + czat / Booksy |
| Peruki | Dom Mody Sylwia (NFZ), Oncohair Polska | telefon + czat / zewnętrzny URL |
| Wsparcie psychologiczne | OmeaLife, OnkoCafe, Amazonki | zewnętrzny URL |
| Rehabilitacja | Centrum Zdrowia Ursynów | Booksy + telefon |

- Filtrowanie natychmiastowe, scroll do góry przy zmianie filtru
- Opis karty: 2 linie z togglem „więcej / mniej"
- Stan pusty: ikona lupy + przycisk „Zapytaj asystentkę"
- Sticky pasek dolny: „Nie znalazłaś? Zapytaj asystentkę" → otwiera ChatScreen

---

## System designu

**Kolory (`lib/theme.js`):**

| Token | Wartość | Użycie |
|-------|---------|--------|
| `cream` | `#FBF5EE` | tło jasne |
| `paper` | `#F4ECE2` | karty, paski |
| `blush` | `#F2C9CC` | akcent różowy jasny |
| `blushDeep` | `#E0A6AE` | akcent różowy głęboki |
| `lilac` | `#C9B6D6` | akcent liliowy jasny |
| `lilacDeep` | `#A98EB8` | akcent liliowy głęboki |
| `salmon` | `#E89B82` | akcent ciepły / aktywny węzeł |
| `salmonDeep` | `#D87A60` | akcent ciepły głęboki |
| `plum` | `#3A2A3F` | tekst główny, przyciski |
| `plumSoft` | `#5E4A60` | tekst drugorzędny |
| `night` | `#241924` | tło demo-paska |

**Tło:** `radial-gradient(120% 80% at 50% 0%, #EBE1F5 0%, #F2EBF6 38%, #F6EEE9 65%, #FBF5EE 100%)`

**Fonty:**
- **Manrope** 300–800 — UI, etykiety, przyciski
- **Newsreader** 400–600 italic — tytuły emocjonalne, cytaty

**Animacje CSS:**
- `fadeUp` 0.45s — wejście ekranu powitalnego
- `screenFadeIn` 0.15s — wejście ekranów podrzędnych (`.screen-enter`)
- `pulse` / `pulseRing` — aktywny węzeł na osi czasu

---

## Uruchomienie lokalne

```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy

Vercel — push na `main` uruchamia automatyczny deploy.
