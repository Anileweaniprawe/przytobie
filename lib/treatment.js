import { PT } from './theme';

export const SUBTYPES = [
  { id: 'lum_a', label: 'Luminalny A', color: PT.plumSoft },
  { id: 'lum_b_neg', label: 'Luminalny B (HER2-)', color: PT.plum },
  { id: 'lum_b_pos', label: 'Luminalny B (HER2+)', color: PT.plumDeep },
  { id: 'her2_pos', label: 'Nieluminalny HER2+', color: PT.salmon },
  { id: 'tnbc', label: 'Potrójnie ujemny (TNBC)', color: PT.salmonDeep },
];

/**
 * Generic treatment path that applies to all subtypes initially.
 * Individual treatment plans are determined by a multidisciplinary tumor board (konsylium)
 * based on subtype, stage, and patient profile.
 */
export const GENERIC_PATH = [
  { id: 'diag', t: 'Diagnostyka', d: 'Wyniki, badania obrazowe i dokładny profil nowotworu.' },
  { id: 'cons', t: 'Konsylium', d: 'Twój zespół lekarzy analizuje wyniki i przygotowuje optymalny plan leczenia.' },
  { id: 'treat', t: 'Leczenie', d: 'Realizacja ścieżki: może obejmować chirurgię, leczenie systemowe lub radioterapię.' },
  { id: 'rehab', t: 'Rehabilitacja i wsparcie', d: 'Powrót do pełni sił pod opieką specjalistów.' },
];

export function getStepsForSubtype(subtypeId) {
  // Returns generic path as treatment is individualized by medical professionals
  return GENERIC_PATH;
}
