// lib/knowledge-base.js

export const KNOWLEDGE_BASE = [
  {
    term: "Amputacja piersi (Mastektomia)",
    definition: "operacja chirurgiczna mająca na celu usunięcie piersi zajętej przez nowotwór. Jest stosowana w sytuacjach, kiedy nie ma możliwości przeprowadzenia operacji oszczędzającej.",
    tags: ["mastektomia", "operacja", "pierś"]
  },
  {
    term: "Badanie immunohistochemiczne (IHC)",
    definition: "Specjalistyczne badanie laboratoryjne wyciętej tkanki pozwalające określić dokładny profil biologiczny nowotworu. Określa obecność receptorów hormonalnych (ER, PR), nadekspresję białka HER2 oraz indeks podziałów komórkowych Ki-67, co bezpośrednio decyduje o doborze terapii.",
    tags: ["immunohistochemia", "HER2"]
  },
  {
    term: "BCU – Breast Cancer Unit",
    definition: "wielodyscyplinarny zespół zajmujący się pacjentami z rakiem piersi. W skład takiego zespołu wchodzą m.in. onkolodzy, chirurdzy onkologiczni, specjaliści od chemioterapii i radioterapii, psycholodzy kliniczni, rehabilitanci.",
    tags: ["specjaliści", "BCU", "oddział", "zespół"]
  },
  {
    term: "„Biała chemia”",
    definition: "potoczne określenie na chemioterpię opartą na lekach z grupy taksamów. Jest zazwyczaj dobrze tolerowana przez pacjentki.",
    tags: ["chemia", "chemioterapia", "biała"]
  },
  {
    term: "Biopsja gruboigłowa",
    definition: "zabieg polegający na wprowadzeniu igły w miejsce chorobowo zmienione, w znieczuleniu miejscowym. Igłę wprowadza się zazwyczaj kilkukrotnie, tak aby pobrać większą ilość materiału. Pobrane tkanki bada lekarz – patomorfolog. Wynikiem jego pracy jest wynik badania histopatologicznego (hist-pat).",
    tags: ["biopsja", "diagnostyka", "badania", "hist-pat"]
  },
  {
    term: "Chemioterapia",
    definition: "metoda leczenia farmakologicznego nowotowru piersi. Zazwyczaj przyjmowana w cyklach 1-2 dni przyjmowania leku, 2 tygodnie przerwy. Często jest obarczona skutkami ubocznymi, ale u części pacjentek jest jedyną szansą na wyleczenie.",
    tags: ["chemioterapia", "lek", "cykl"]
  },
  {
    term: "„Czerwona chemia”",
    definition: "potoczne określenie na chemioterpię opartą na antracyklinach (np doksorubicynę). Nazwa pochodzi od jasnoczeronego koloru preparatów. Jednym z jej skutków ubocznych jest odwracalne wypadanie włosów, które po około 2-5 miesiącach po zakończonym leczeniu zaczynają odrastać.",
    tags: ["chemia", "czerwona", "łysienie"]
  },
  {
    term: "HER2",
    definition: "jest to białko obecne na powierzchni komórek nowotworowych w raku piersi. Białko HER2 odpowiada za wzrost i podział komórek, zarówno zdrowych jak i nowotworowych. Część nowotworów wykazują za dużą ilość tego białka na powierzchni komórek. Z tego względu wyróżniamy nowotwory HER2 dodatnie (te które mają za dużą ilość) oraz ujemne (te co mają ilość normalną). Rak piersi HER2+ wykazują szybszy wzrost.",
    tags: ["HER2", "białko", "receptor", "wzrost"]
  },
  {
    term: "Hormonoterapia",
    definition: "forma leczenia podtrzymującego mająca na celu ograniczenie ryzyka nawrotu dla raków hormonowrażliwych.",
    tags: ["hormony", "estrogeny", "leczenie"]
  },
  {
    term: "Indeks Ki-67",
    definition: "wartość procentowa określająca, jak wiele komórek jest aktualnie w fazie podziału. Wysoki indeks Ki-67 świadczy o wysokiej dynamice wzrostu guza.",
    tags: ["indeks", "podział", "wzrost"]
  },
  {
    term: "Immunoterapia",
    definition: "nowoczesna metoda leczenia polegająca na stymulacji własnego układu immunologicznego, tak aby zaczął niszczyć komórki nowotworowe. Niestety nie wszystkie typy oraz stadia zaawansowania nowotworu nadają się do leczenia tą metodą.",
    tags: ["leczenie", "immunologia", "immunoterapia"]
  },
  {
    term: "Karta DILO",
    definition: "(Karta Diagnostyki i Leczenia Onkologicznego) to dokument w ramach systemu NFZ, który uprawnia pacjenta do wejścia na ścieżkę szybkiej terapii onkologicznej i znosi limity finansowe na badania. Działa jak priorytetowe skierowanie.",
    tags: ["DILO", "skierowanie", "dokumentacja"]
  },
  {
    term: "Konsylium onkologiczne",
    definition: "zespół lekarzy różnych specjalizacji, którzy wspólnie podejmują decyzje o dalszej formie leczenia, w oparciu o wyniki badań i stan zdrowia pacjentki.",
    tags: ["konsylium", "zespół"]
  },
  {
    term: "Leczenie adjuwantowe (uzupełniające)",
    definition: "Postępowanie terapeutyczne (chemioterapia, radioterapia, hormonoterapia) wdrożone po radykalnej operacji chirurgicznej. Jego celem jest zniszczenie potencjalnych mikroprzerzutów krążących w organizmie, co drastycznie obniża ryzyko wznowy.",
    tags: ["leczenie", "chemioterapia", "radioterapia"]
  },
  {
    term: "Leczenie neoadjuwantowe (przedoperacyjne)",
    definition: "Terapia systemowa (chemioterapia lub hormonoterapia) podawaną pacjentce przed planowaną operacją. Służy zmniejszeniu wymiarów guza.",
    tags: ["chemioterapia", "leczenie", "operacja"]
  },
  {
    term: "Neuropatia obwodowa",
    definition: "Uszkodzenie nerwów obwodowych będące częstym powikłaniem po chemioterapii. Objawia się mrowieniem, drętwieniem lub pieczeniem palców dłoni i stóp, co należy bezwzględnie zgłaszać lekarzowi w celu ewentualnej modyfikacji dawki leku.",
    tags: ["objaw", "ból", "chemioterapia"]
  },
  {
    term: "Radioterapia",
    definition: "Leczenie miejscowe z użyciem precyzyjnie skierowanych wiązek promieniowania jonizującego wysokiej energii w celu zniszczenia komórek rakowych.",
    tags: ["leczenie", "radioterapia"]
  },
  {
    term: "Rak luminalny / Hormonozależny",
    definition: "Najczęstszy typ biologiczny raka piersi (ok. 70% przypadków), charakteryzujący się obecnością receptorów dla estrogenu i progesteronu.",
    tags: ["typ", "rak", "hormonalny"]
  },
  {
    term: "Rak przedinwazyjny (DCIS - Ductal Carcinoma In Situ)",
    definition: "Najwcześniejsza forma raka piersi (tzw. rak nieinwazyjny lub stadium 0), w której zmienione komórki znajdują się wyłącznie wewnątrz przewodów mlekowych. DCIS nie ma zdolności dawania przerzutów odległych i jest niemal w 100% wyleczalny drogą zabiegu chirurgicznego.",
    tags: ["rak", "operacja", "stadium"]
  },
  {
    term: "Remisja",
    definition: "Stan, w którym w wyniku przeprowadzonego leczenia onkologicznego wszelkie dostępne metody diagnostyczne (badania obrazowe, krew) nie wykazują obecności aktywnych komórek nowotworowych w organizmie. Długofalowe utrzymanie pełnej remisji jest tożsame z klinicznym wyleczeniem.",
    tags: ["wyleczenie", "choroba", "leczenie", "remisja"]
  },
  {
    term: "Stopień złośliwości histologicznej",
    definition: "Trzystopniowa skala (G1-G3) określająca stopień zróżnicowania komórek nowotworu pod mikroskopem w porównaniu do zdrowych tkanek. G1 oznacza raka nisko złośliwego, natomiast G3 oznacza raka wysoko złośliwego.",
    tags: ["złośliwość", "skala"]
  },
  {
    term: "Węzeł wartowniczy",
    definition: "Pierwszy węzeł chłonny na anatomicznej drodze spływu limfy z obszaru guza piersi. Podczas operacji jest on lokalizowany i wycinany w pierwszej kolejności; jeśli jest wolny od komórek raka, pozwala to uniknąć usuwania całej grupy węzłów pachowych.",
    tags: ["węzeł", "operacja", "przerzuty"]
  }
];

export const getAllTags = () => {
  const tagsSet = new Set();
  KNOWLEDGE_BASE.forEach(item => {
    item.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};
