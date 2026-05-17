import { PT } from './theme';

export const SUBTYPES = [
  { id: 'lum_a', label: 'Luminalny A', color: PT.plumSoft },
  { id: 'lum_b_neg', label: 'Luminalny B (HER2-)', color: PT.plum },
  { id: 'lum_b_pos', label: 'Luminalny B (HER2+)', color: PT.plumDeep },
  { id: 'her2_pos', label: 'Nieluminalny HER2+', color: PT.salmon },
  { id: 'tnbc', label: 'Potrójnie ujemny (TNBC)', color: PT.salmonDeep },
];

export const TREATMENT_STEPS = {
  lum_a: [
    { id: 'diag', t: 'Diagnostyka', d: 'Potwierdzenie podtypu Luminalny A.' },
    { id: 'surg', t: 'Chirurgia (BCT)', d: 'Zabieg oszczędzający i węzeł wartowniczy.' },
    { id: 'radio', t: 'Radioterapia', d: 'Utrwalenie efektu leczenia.' },
    { id: 'horm', t: 'Hormonoterapia', d: 'Długofalowa ochrona (np. Tamoksyfen).' },
  ],
  lum_b_neg: [
    { id: 'diag', t: 'Diagnostyka', d: 'Podtyp Luminalny B HER2-.' },
    { id: 'chemo', t: 'Chemioterapia', d: 'Zmniejszenie ryzyka nawrotu.' },
    { id: 'surg', t: 'Chirurgia', d: 'Usunięcie zmiany z marginesem.' },
    { id: 'radio', t: 'Radioterapia', d: 'Ochrona miejscowa.' },
    { id: 'horm', t: 'Hormonoterapia', d: 'Wsparcie hormonalne.' },
  ],
  lum_b_pos: [
    { id: 'diag', t: 'Diagnostyka', d: 'Podtyp Luminalny B HER2+.' },
    { id: 'chemo_her2', t: 'Chemioterapia + Trastuzumab', d: 'Leczenie celowane i systemowe.' },
    { id: 'surg', t: 'Chirurgia', d: 'Kluczowy etap leczenia.' },
    { id: 'radio', t: 'Radioterapia', d: 'Kontynuacja ścieżki.' },
    { id: 'horm', t: 'Hormonoterapia', d: 'Blokada receptorów.' },
  ],
  her2_pos: [
    { id: 'diag', t: 'Diagnostyka', d: 'Podtyp Nieluminalny HER2+.' },
    { id: 'chemo_her2', t: 'Chemioterapia + Trastuzumab', d: 'Uderzenie w receptory HER2.' },
    { id: 'surg', t: 'Chirurgia', d: 'Usunięcie resztkowej zmiany.' },
    { id: 'radio', t: 'Radioterapia', d: 'Zakończenie leczenia miejscowego.' },
  ],
  tnbc: [
    { id: 'diag', t: 'Diagnostyka', d: 'Podtyp Potrójnie ujemny.' },
    { id: 'chemo_immuno', t: 'Chemioterapia ± Immunoterapia', d: 'Intensywne leczenie systemowe.' },
    { id: 'surg', t: 'Chirurgia', d: 'Ocena odpowiedzi na leczenie.' },
    { id: 'radio', t: 'Radioterapia', d: 'Ostatni etap walki.' },
  ],
};

export function getStepsForSubtype(subtypeId) {
  return TREATMENT_STEPS[subtypeId] || [
    { t: 'Pierwsze badanie',   d: 'Zrozum, co Cię czeka.' },
    { t: 'Diagnostyka',        d: 'Wyniki, pytania, kontekst.' },
    { t: 'Leczenie',           d: 'Wsparcie w trudnych dniach.' },
    { t: 'Rehabilitacja',      d: 'Powrót do siebie.' },
  ];
}
