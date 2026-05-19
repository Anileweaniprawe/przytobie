# PrzyTobie — Twój Osobisty Kompas w Leczeniu Raka Piersi

**PrzyTobie** to empatyczna aplikacja towarzysząca (patient companion), zaprojektowana dla pacjentek przechodzących przez proces diagnostyki i leczenia raka piersi. Aplikacja łączy nowoczesną technologię z delikatnym, wspierającym designem, aby przeprowadzić pacjentkę „za rękę” przez każdy etap choroby.

---

## ✨ Wizja i Estetyka: "Liquid Glass"
Aplikacja została zaprojektowana w unikalnym stylu **iOS 26 / Liquid Glass**. Charakteryzuje się on:
- **Miękkością i Przejrzystością**: Wykorzystanie `backdrop-filter: blur()`, subtelnych cieni i gradientów.
- **Empatyczną Paletą Barw**: Połączenie odcieni *Plum*, *Salmon*, *Blush* i *Cream* (zdefiniowanych w `lib/theme.js`).
- **Płynnymi Animacjami**: Interfejs „żyje” dzięki animacjom `fadeUp` i pulsującym punktom interaktywnym.
- **Mobile-First**: Optymalizacja pod kątem przeglądarek mobilnych (dostęp przez QR kod), z dedykowaną ramką iPhone dla widoku desktopowego.

---

## 🚀 Kluczowe Funkcje

### 1. Dynamiczny Dashboard Adaptacyjny
Serce aplikacji, które zmienia się w zależności od **etapu leczenia** pacjentki. System rozpoznaje 5 głównych faz:
- **Badania** (np. biopsja, USG)
- **Diagnostyka** (oczekiwanie na wyniki, konsylium)
- **Leczenie Operacyjne**
- **Leczenie Okołooperacyjne** (chemioterapia, radioterapia)
- **Rehabilitacja i Powrót do życia**

### 2. Interaktywna Oś Czasu (Timeline)
Wizualna mapa drogi pacjentki. Pozwala na:
- Śledzenie postępów (punkty zaliczone, aktywne i przyszłe).
- Rozwijanie szczegółów każdego etapu (Sekcja „Co teraz?”, „Pytania do lekarza”).
- Szybki dostęp do bazy wiedzy specyficznej dla danego momentu leczenia.

### 3. Asystentka BCU (Inteligentny Chat)
Moduł wsparcia oparty na interfejsie czatu, który:
- Odpowiada na najczęstsze pytania o terminy medyczne.
- Podpowiada, jak przygotować się do badań.
- Oferuje gotowe sugestie pytań, które warto zadać lekarzowi.

### 4. Inteligentne Narzędzia Codzienne
- **Lokalizator Placówek (FindClinic)**: Mapa certyfikowanych Breast Cancer Units (BCU) z informacją o odległości.
- **Checklisty Przygotowawcze**: Personalizowane listy „Co zabrać na badanie/konsylium”.
- **Raportowanie Objawów**: Prosty system monitorowania samopoczucia i skutków ubocznych leczenia.
- **Zarządzanie Dokumentacją**: Szybki podgląd wyników badań i nadchodzących wizyt.

---

## 🧬 Inteligencja Medyczna
Aplikacja posiada wbudowaną logikę domenową (`lib/treatment.js`), która uwzględnia:
- **Podtypy biologiczne nowotworu**: Luminalny A/B, HER2+, TNBC (Trójujemny).
- **Personalizację treści**: Dostosowanie edukacji i ścieżki leczenia do konkretnego profilu pacjentki.
- **Lokalne standardy**: Skupienie na ścieżce pacjenta w polskich placówkach BCU.

---

## 🛠 Stos Technologiczny
- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18 (Client Components)
- **Stylizacja**: Vanilla CSS + Design Tokens (Theming Engine)
- **Mapy**: Leaflet (OpenStreetMap/CartoDB)
- **Ikony**: Custom Inline SVG (brak ciężkich bibliotek zewnętrznych)
- **Stan**: LocalStorage persistence (działa bez backendu)

---

## 📂 Struktura Projektu
- `/app`: Logika routingu i główne widoki (Dashboard, Onboarding, Timeline).
- `/components`: Moduły interfejsu i ekrany funkcyjne (`screens.js`).
- `/lib`: Definicje wizualne (`theme.js`) oraz logika medyczna (`treatment.js`).
- `brand.jsx`: Kompletny system identyfikacji wizualnej (Logo, Marki).
- `ios-frame.jsx`: Wrapper symulujący urządzenie mobilne.

---

## 🏁 Uruchomienie Projektu

```bash
# Instalacja zależności
npm install

# Uruchomienie trybu deweloperskiego
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

---
*Projekt stworzony z myślą o wsparciu pacjentek onkologicznych — bo nikt nie powinien przechodzić przez to sam.*
