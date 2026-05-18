# Specyfikacja: Zmiana koloru aktywnego etapu na Łososiowy

**Data:** 2026-05-18
**Status:** Zaakceptowane
**Autor:** Gemini CLI

## Cel
Zmiana koloru aktywnego etapu leczenia z obecnego niebieskiego na ciepły odcień łososiowy. Zmiana dotyczy zarówno głównego widoku (Dashboard), jak i widoku szczegółowego (Timeline).

## Proponowana Paleta
Zastępujemy obecne niebieskie kolory (`#7BBCD8`, `#4AAAC6`) nowymi odcieniami łososiowymi, które lepiej oddają ciepły i empatyczny charakter aplikacji.

| Nazwa | Stary Kolor (Niebieski) | Nowy Kolor (Łososiowy) | Zastosowanie |
| :--- | :--- | :--- | :--- |
| **Salmon** | `#7BBCD8` | `#E68A8A` | Kropki, ikony, główne akcenty |
| **SalmonDeep** | `#4AAAC6` | `#D16B6B` | Linie łączące, tekst na jasnym tle |
| **SalmonBg** | `#E4F2FA` | `#FCEEEE` | Tła pigułek, aktywne sekcje |

## Zakres Zmian

### 1. `lib/theme.js`
Aktualizacja tokenów kolorystycznych w centralnym pliku motywu.
- Zmiana `PT.salmon` na `#E68A8A`
- Zmiana `PT.salmonDeep` na `#D16B6B`

### 2. `app/timeline/page.js`
Aktualizacja lokalnej palety `TC` (Timeline Colors), która obecnie używa aliasów "rose" dla niebieskich odcieni.
- `TC.roseLine`: `#D16B6B`
- `TC.roseBg`: `#FCEEEE`
- `TC.roseIcon`: `#B15252` (ciemniejszy odcień dla czytelności tekstu/ikon)

### 3. Weryfikacja wizualna
- **Dashboard:** Kropka "Twoja ścieżka" powinna pulsować na łososiowo.
- **Timeline:** Pigułka "Etap X z 6" oraz linia postępu powinny być łososiowe.
- **Timeline:** Przycisk "Zapytaj asystentkę" powinien mieć łososiowe tło.

## Kryteria Sukcesu
- Brak pozostałości niebieskiego koloru w elementach oznaczających "aktywność" lub "postęp".
- Zachowanie czytelności tekstu (odpowiedni kontrast łososiowego z tłem).
- Spójność kolorystyczna między Dashboardem a widokiem szczegółów.
