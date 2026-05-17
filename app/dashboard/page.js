'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PT } from '@/lib/theme';
import {
  FindClinic, Checklist, ChatScreen, DocumentsScreen,
  BookVisit, ReportSymptom, MyResults, SupportScreen, RehabPlan, PartnersScreen,
  AppointmentDetail,
} from '@/components/screens';

// ─── SVG icon set ─────────────────────────────────────────────
function Icon({ name, size = 20, color = PT.plumSoft, strokeWidth = 1.8 }) {
  const p = {
    hospital:    <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></>,
    clipboard:   <><path d="M9 2h6a1 1 0 010 2H9a1 1 0 010-2z"/><path d="M7 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-2"/><path d="M9 12h6M9 16h4"/></>,
    chat:        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
    document:    <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></>,
    microscope:  <><line x1="6" y1="22" x2="6" y2="12"/><path d="M11 22H3"/><path d="M8 12a5 5 0 005-5V3l4 4-4 2v3a5 5 0 01-5 5z"/></>,
    heart:       <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    folder:      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>,
    map:         <><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></>,
    calendar:    <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    chart:       <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    alert:       <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    leaf:        <path d="M17 8C8 10 5.9 16.17 3.82 22.8L5.71 23l1-2.3A4.49 4.49 0 008 21C19 21 22 3 22 3c-1 2-8 3-9 8-2 0-4.5 1-6 3.5.5-2 4-5 6-5z"/>,
    users:       <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    sparkle:     <><path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z"/></>,
    check:       <polyline points="20 6 9 17 4 12"/>,
    bell:        <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    arrow:       <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {p[name] ?? null}
    </svg>
  );
}

// ─── Stage configuration ──────────────────────────────────────
const STAGE_META = [
  { id: 1, label: 'Skierowanie' },
  { id: 2, label: 'Biopsja' },
  { id: 3, label: 'Diagnoza' },
  { id: 4, label: 'Leczenie' },
  { id: 5, label: 'Rehabilitacja' },
];

const STAGE_DATA = {
  1: {
    heroGradient: 'linear-gradient(145deg, #FDF0E8 0%, #F5D5C8 100%)',
    heroDotColor: PT.salmon,
    heroTitle: 'Twój pierwszy krok jest już za Tobą',
    heroSubtitle: 'Następny: Umów mammografię lub USG piersi',
    heroCTA: 'Znajdź placówkę',
    grid: [
      { label: 'Gdzie się zbadać',     icon: 'hospital'  },
      { label: 'Co zabrać na badanie', icon: 'clipboard' },
      { label: 'Zapytaj asystentkę',   icon: 'chat'      },
      { label: 'Twoje skierowanie',    icon: 'document'  },
    ],
  },
  2: {
    heroGradient: 'linear-gradient(145deg, #EEF2F8 0%, #D8E4F0 100%)',
    heroDotColor: '#7096C8',
    heroTitle: 'Czekanie jest najtrudniejsze. Jesteś na właściwej drodze.',
    heroSubtitle: 'Wyniki biopsji — wpisz datę odbioru:',
    heroCTA: 'Ustaw przypomnienie',
    hasDateInput: true,
    grid: [
      { label: 'Co oznacza biopsja',        icon: 'microscope' },
      { label: 'Pytania do lekarza',         icon: 'chat'       },
      { label: 'Wsparcie psychologiczne',    icon: 'heart'      },
      { label: 'Moje dokumenty',             icon: 'folder'     },
    ],
  },
  3: {
    heroGradient: 'linear-gradient(145deg, #F0EEF8 0%, #D8D0F0 100%)',
    heroDotColor: PT.lilacDeep,
    heroTitle: 'Masz plan. Teraz krok po kroku.',
    heroSubtitle: 'Następny krok: Konsylium wielodyscyplinarne',
    heroCTA: 'Co to jest konsylium?',
    grid: [
      { label: 'Moja ścieżka leczenia',  icon: 'map'       },
      { label: 'Umów wizytę',            icon: 'calendar'  },
      { label: 'Co zabrać na konsylium', icon: 'clipboard' },
      { label: 'Zapytaj asystentkę',     icon: 'chat'      },
    ],
  },
  4: {
    heroGradient: 'linear-gradient(145deg, #F0F4EE 0%, #D4E8D0 100%)',
    heroDotColor: '#5A9E6A',
    heroTitle: 'Jutro: Chemioterapia, cykl 3/6',
    heroSubtitle: '09:00 · Salve Medica, ul. Inflancka 3',
    heroCTA: 'Szczegóły wizyty',
    grid: [
      { label: 'Zgłoś objaw',   icon: 'alert'    },
      { label: 'Moje wyniki',   icon: 'chart'    },
      { label: 'Wizyty',        icon: 'calendar' },
      { label: 'Wsparcie',      icon: 'heart'    },
    ],
    hasSymptomCheckin: true,
  },
  5: {
    heroGradient: 'linear-gradient(145deg, #EEF8F4 0%, #C8E8DC 100%)',
    heroDotColor: '#3A8C68',
    heroTitle: 'Najtrudniejsza część za Tobą. Teraz wracasz do siebie.',
    heroSubtitle: 'Następna wizyta kontrolna: za 3 tygodnie',
    heroCTA: 'Mój plan rehabilitacji',
    grid: [
      { label: 'Plan rehabilitacji', icon: 'leaf'     },
      { label: 'Grupy wsparcia',     icon: 'users'    },
      { label: 'Pytania do lekarza', icon: 'chat'     },
      { label: 'Zadbaj o siebie',    icon: 'sparkle'  },
    ],
    hasPostTreatment: true,
  },
};

// ─── Sub-components ───────────────────────────────────────────

function Header() {
  const dateStr = new Date().toLocaleDateString('pl-PL', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
  const [userName, setUserName] = useState('Agnieszko');
  useEffect(() => {
    const stored = localStorage.getItem('userName');
    if (stored) setUserName(stored);
  }, []);
  const initial = userName[0]?.toUpperCase() ?? 'A';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      paddingTop: 'max(env(safe-area-inset-top, 0px), 52px)',
      paddingBottom: 4,
      paddingLeft: 20, paddingRight: 20,
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 21, flexShrink: 0,
        background: `linear-gradient(135deg, ${PT.blush}, ${PT.lilac})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-manrope), system-ui',
        fontWeight: 700, fontSize: 17, color: PT.plum,
      }}>{initial}</div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontWeight: 600, fontSize: 16,
          color: PT.plum, letterSpacing: '-0.01em',
        }}>Cześć, {userName}</div>
        <div style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 12, color: 'rgba(58,42,63,0.45)',
          marginTop: 1, textTransform: 'capitalize',
        }}>{dateStr}</div>
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: 18,
        background: PT.paper,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="bell" size={18} color={PT.plumSoft}/>
      </div>
    </div>
  );
}

function HeroCard({ data, onCTA }) {
  const [date, setDate] = useState('');
  const [bellSet, setBellSet] = useState(false);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const dismissRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('biopsyReminder');
    if (saved) { 
      setDate(saved); 
      setBellSet(true); 
      setIsSaved(true);
    }
    return () => { if (dismissRef.current) clearTimeout(dismissRef.current); };
  }, []);

  function handleBell() {
    if (!date) {
      setShake(true);
      setTimeout(() => setShake(false), 380);
      return;
    }
    localStorage.setItem('biopsyReminder', date);
    setBellSet(true);
    setIsSaved(true);
    const d = new Date(date + 'T00:00:00');
    const formatted = d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' });
    setToast(formatted);
    setToastVisible(true);
    if (dismissRef.current) clearTimeout(dismissRef.current);
    dismissRef.current = setTimeout(() => setToastVisible(false), 3000);
  }

  const isBiopsy = data.hasDateInput;
  const currentCTA = (isBiopsy) ? (isSaved ? () => setIsSaved(false) : handleBell) : onCTA;
  const ctaLabel = (isBiopsy && isSaved) ? 'Zmień datę' : data.heroCTA;

  // Format date for display
  const displayDate = date ? new Date(date + 'T00:00:00').toLocaleDateString('pl-PL', { 
    day: 'numeric', month: 'long', year: 'numeric' 
  }) : '';

  return (
    <div style={{
      margin: '16px 16px 0',
      borderRadius: 24,
      background: data.heroGradient,
      padding: '22px 22px 20px',
      boxShadow: '0 2px 16px rgba(58,42,63,0.07)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-4px); }
          40%      { transform: translateX(4px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* decorative halo */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 180, height: 180, borderRadius: '50%',
        background: 'rgba(255,255,255,0.35)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        fontFamily: 'var(--font-newsreader), Georgia, serif',
        fontStyle: 'italic',
        fontSize: 19, lineHeight: 1.35,
        color: PT.plum, letterSpacing: '-0.01em',
        marginBottom: 10, position: 'relative',
      }}>
        {data.heroTitle}
      </div>

      {data.hasDateInput ? (
        <div style={{ marginBottom: 14, position: 'relative' }}>
          <p style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 13, color: PT.plumSoft, marginBottom: 8,
          }}>{isSaved ? 'Twoje przypomnienie:' : data.heroSubtitle}</p>
          
          {isSaved ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.4)',
              borderRadius: 14, padding: '10px 16px',
              width: 'fit-content',
              border: '1px solid rgba(255,255,255,0.5)',
            }}>
              <Icon name="calendar" size={16} color={PT.plum}/>
              <span style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 15, fontWeight: 700, color: PT.plum,
              }}>{displayDate}</span>
            </div>
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.65)',
              borderRadius: 12, padding: '0 14px',
              border: `1.5px solid ${shake ? 'rgba(201,110,122,0.5)' : 'rgba(58,42,63,0.1)'}`,
              animation: shake ? 'shake 0.38s ease' : 'none',
              transition: 'border-color 0.2s',
            }}>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{
                  flex: 1, height: 42, border: 'none', background: 'transparent',
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 14, color: PT.plum, outline: 'none',
                }}
              />
              <button
                onClick={handleBell}
                style={{
                  appearance: 'none', border: 0, background: 'none',
                  padding: 4, cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                  transition: 'transform 0.15s',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24"
                     fill={bellSet ? `${PT.salmon}40` : 'none'}
                     stroke={bellSet ? PT.salmon : 'rgba(58,42,63,0.4)'}
                     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        <p style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 13, color: PT.plumSoft,
          marginBottom: 16, lineHeight: 1.5, position: 'relative',
        }}>{data.heroSubtitle}</p>
      )}

      <button
        onClick={currentCTA}
        style={{
          appearance: 'none', border: 0,
          background: PT.plum, color: PT.cream,
          height: 42, borderRadius: 21,
          paddingLeft: 20, paddingRight: 20,
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', gap: 6,
          cursor: currentCTA ? 'pointer' : 'default',
          boxShadow: '0 6px 16px -4px rgba(58,42,63,0.3)',
          position: 'relative',
        }}
      >
        {ctaLabel}
        <Icon name={isBiopsy && isSaved ? 'sparkle' : 'arrow'} size={14} color={PT.cream} strokeWidth={2.2}/>
      </button>

      {/* Toast */}
      {toast !== null && (
        <div style={{
          position: 'fixed', bottom: 88, right: 16, zIndex: 1000,
          background: '#fff',
          borderRadius: 14, padding: '12px 16px',
          boxShadow: '0 4px 20px rgba(58,42,63,0.15)',
          maxWidth: 240,
          display: 'flex', alignItems: 'center', gap: 10,
          opacity: toastVisible ? 1 : 0,
          transform: toastVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          animation: toastVisible ? 'toastIn 0.3s ease both' : 'none',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 14, flexShrink: 0,
            background: '#EAF2E7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="#4E7E4C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontWeight: 600, fontSize: 13, color: PT.plum,
              letterSpacing: '-0.01em',
            }}>Przypomnienie ustawione</div>
            <div style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 12, color: PT.plumSoft, marginTop: 1,
            }}>{toast}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function PathStrip({ currentStage }) {
  return (
    <div style={{
      margin: '18px 16px 0',
      background: PT.paper,
      borderRadius: 20,
      padding: '16px 18px',
    }}>
      <div style={{
        fontFamily: 'var(--font-manrope), system-ui',
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.07em', textTransform: 'uppercase',
        color: 'rgba(58,42,63,0.4)', marginBottom: 14,
      }}>Twoja ścieżka</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
        {STAGE_META.map((stage, idx) => {
          const done   = stage.id < currentStage;
          const active = stage.id === currentStage;
          const upcoming = stage.id > currentStage;
          const isLast = idx === STAGE_META.length - 1;

          return (
            <div key={stage.id} style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
              {/* node + label */}
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6, flex: 1,
              }}>
                {/* circle */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {active && (
                    <div style={{
                      position: 'absolute',
                      width: 30, height: 30, borderRadius: 15,
                      background: PT.salmon,
                      opacity: 0.25,
                      animation: 'pulse 2s ease-in-out infinite',
                    }}/>
                  )}
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    background: done   ? PT.lilacDeep
                               : active ? PT.salmon
                               : 'transparent',
                    border: upcoming ? `1.5px dashed rgba(58,42,63,0.22)` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1,
                  }}>
                    {done && <Icon name="check" size={11} color="#fff" strokeWidth={2.5}/>}
                    {active && <div style={{ width: 7, height: 7, borderRadius: 4, background: '#fff' }}/>}
                  </div>
                </div>
                {/* label */}
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 9.5, fontWeight: active ? 700 : 500,
                  color: active ? PT.plum : done ? PT.plumSoft : 'rgba(58,42,63,0.35)',
                  textAlign: 'center', lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}>{stage.label}</div>
              </div>

              {/* connector line */}
              {!isLast && (
                <div style={{
                  height: 1.5, flex: 0,
                  width: 0, marginTop: 10,
                  borderTop: done
                    ? `2px solid ${PT.lilacDeep}`
                    : '1.5px dashed rgba(58,42,63,0.18)',
                  alignSelf: 'flex-start',
                  flexGrow: 0,
                  minWidth: 8,
                }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuickGrid({ items, onItemClick }) {
  return (
    <div style={{ margin: '14px 16px 0' }}>
      <div style={{
        fontFamily: 'var(--font-manrope), system-ui',
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.07em', textTransform: 'uppercase',
        color: 'rgba(58,42,63,0.4)', marginBottom: 10,
      }}>Szybkie akcje</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
      }}>
        {items.map((item, i) => (
          <button key={i} onClick={() => onItemClick(item)} style={{
            appearance: 'none', border: 0,
            background: PT.paper,
            borderRadius: 18,
            padding: '16px 14px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-start', gap: 10,
            cursor: 'pointer', textAlign: 'left',
            boxShadow: '0 1px 4px rgba(58,42,63,0.06)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 11,
              background: PT.cream,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={item.icon} size={18} color={PT.plumSoft}/>
            </div>
            <span style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontWeight: 600, fontSize: 13,
              color: PT.plum, lineHeight: 1.3,
              letterSpacing: '-0.005em',
            }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const MOODS = [
  { score: 5, label: 'Świetnie',   arc: 'M 5 10 Q 10 16 19 10', eyes: true  },
  { score: 4, label: 'Dobrze',     arc: 'M 6 11 Q 10 15 18 11', eyes: true  },
  { score: 3, label: 'Tak sobie',  arc: 'M 7 12 H 17',          eyes: true  },
  { score: 2, label: 'Słabo',      arc: 'M 6 14 Q 10 10 18 14', eyes: true  },
  { score: 1, label: 'Źle',        arc: 'M 5 15 Q 10 9 19 15',  eyes: true  },
];

function MoodFace({ mood, selected, onClick }) {
  const c = selected ? PT.plum : 'rgba(58,42,63,0.55)';
  return (
    <button onClick={onClick} style={{
      appearance: 'none', border: 0, background: 'none',
      cursor: 'pointer', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 5, padding: '4px 0',
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 23,
        background: selected ? PT.blush : PT.cream,
        border: selected ? `2px solid ${PT.blushDeep}` : '2px solid transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.18s',
        transform: selected ? 'scale(1.1)' : 'scale(1)',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="1.6"/>
          <circle cx="9"  cy="10" r="1.2" fill={c}/>
          <circle cx="15" cy="10" r="1.2" fill={c}/>
          <path d={mood.arc} stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
      <span style={{
        fontFamily: 'var(--font-manrope), system-ui',
        fontSize: 10, fontWeight: selected ? 600 : 400,
        color: selected ? PT.plum : 'rgba(58,42,63,0.45)',
        letterSpacing: '-0.01em',
      }}>{mood.label}</span>
    </button>
  );
}

function SymptomCheckin() {
  const [mood, setMood] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div style={{
      margin: '14px 16px 0',
      background: PT.paper,
      borderRadius: 22,
      padding: '18px 18px 16px',
    }}>
      {isSubmitted ? (
        <div className="fade-up" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', padding: '4px 0 8px',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 24,
            background: `${PT.salmon}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill={PT.salmon} />
            </svg>
          </div>
          <div style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontWeight: 600, fontSize: 15,
            color: PT.plum, marginBottom: 6,
            letterSpacing: '-0.01em',
          }}>Dziękujemy!</div>
          <p style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 13, color: 'rgba(58,42,63,0.55)',
            lineHeight: 1.45, margin: 0, padding: '0 10px',
          }}>
            Twoja odpowiedź trafiła do koordynatorki BCU. Jesteśmy tu dla Ciebie.
          </p>
        </div>
      ) : (
        <>
          <div style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontWeight: 600, fontSize: 15,
            color: PT.plum, marginBottom: 4,
            letterSpacing: '-0.01em',
          }}>Jak się dziś czujesz?</div>
          <p style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 12, color: 'rgba(58,42,63,0.45)',
            marginBottom: 16,
          }}>Twoja odpowiedź trafi do koordynatorki BCU</p>
          <div style={{
            display: 'flex', justifyContent: 'space-between', paddingLeft: 2, paddingRight: 2,
          }}>
            {MOODS.map(m => (
              <MoodFace
                key={m.score}
                mood={m}
                selected={mood === m.score}
                onClick={() => setMood(m.score)}
              />
            ))}
          </div>
          {mood && (
            <button
              onClick={() => setIsSubmitted(true)}
              style={{
                width: '100%',
                appearance: 'none', border: 0,
                background: PT.plum, color: PT.cream,
                height: 40, borderRadius: 20,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 14, fontWeight: 600,
                cursor: 'pointer', marginTop: 14,
              }}
            >
              Wyślij
            </button>
          )}
        </>
      )}
    </div>
  );
}

const POST_TREATMENT_CHIPS = [
  { 
    label: 'Amazonki',          
    icon: 'heart',
    description: 'Stowarzyszenie Amazonki to ruch na rzecz kobiet po leczeniu raka piersi, oferujący wsparcie psychologiczne, rehabilitację oraz pomoc w powrocie do zdrowia.',
    url: 'https://amazonkifederacja.pl'
  },
  { label: 'Peruki onkologiczne', icon: 'sparkle' },
  { label: 'Tatuaż medyczny',   icon: 'leaf'     },
];

function PostTreatmentCard() {
  const [showInfo, setShowInfo] = useState(null);

  return (
    <>
      <div style={{
        margin: '14px 16px 0',
        background: `linear-gradient(145deg, #EEF8F4, #C8E8DC)`,
        borderRadius: 22,
        padding: '18px 18px 16px',
      }}>
        <div style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontWeight: 600, fontSize: 15,
          color: PT.plum, letterSpacing: '-0.01em',
          marginBottom: 2,
        }}>Opieka po leczeniu</div>
        <p style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 12, color: 'rgba(58,42,63,0.5)',
          marginBottom: 14,
        }}>Zasoby, które mogą Ci pomóc</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {POST_TREATMENT_CHIPS.map((chip, i) => (
            <button 
              key={i} 
              onClick={() => chip.description && setShowInfo(chip)}
              style={{
                appearance: 'none',
                border: '1.5px solid rgba(58,42,63,0.14)',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 999, height: 36,
                paddingLeft: 14, paddingRight: 14,
                display: 'flex', alignItems: 'center', gap: 7,
                cursor: chip.description ? 'pointer' : 'default',
                transition: 'all 0.15s ease',
              }}
              onMouseDown={e => { if(chip.description) e.currentTarget.style.transform = 'scale(0.96)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Icon name={chip.icon} size={14} color={PT.plumSoft}/>
              <span style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 13, fontWeight: 500,
                color: PT.plum, letterSpacing: '-0.005em',
              }}>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {showInfo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          {/* Backdrop */}
          <div 
            onClick={() => setShowInfo(null)}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(58,42,63,0.4)',
              backdropFilter: 'blur(10px)',
              transition: 'opacity 0.3s ease',
            }} 
          />
          
          {/* Modal Content */}
          <div className="fade-up" style={{
            position: 'relative', width: '100%', maxWidth: 340,
            background: '#fff', borderRadius: 28,
            padding: 24, boxShadow: '0 20px 40px rgba(58,42,63,0.2)',
          }}>
             <div style={{ 
               width: 48, height: 48, borderRadius: 24, 
               background: '#F0F7F5', display: 'flex', 
               alignItems: 'center', justifyContent: 'center',
               marginBottom: 18 
             }}>
               <Icon name={showInfo.icon} size={24} color={PT.plum}/>
             </div>
             
             <h3 style={{
               fontFamily: 'var(--font-manrope), system-ui',
               fontSize: 19, fontWeight: 700, color: PT.plum,
               marginBottom: 10, letterSpacing: '-0.02em'
             }}>{showInfo.label}</h3>
             
             <p style={{
               fontFamily: 'var(--font-manrope), system-ui',
               fontSize: 14, lineHeight: 1.6, color: 'rgba(58,42,63,0.7)',
               marginBottom: 28
             }}>{showInfo.description}</p>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
               <a 
                 href={showInfo.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{
                   height: 50, borderRadius: 25, background: PT.plum,
                   color: '#fff', display: 'flex', alignItems: 'center',
                   justifyContent: 'center', textDecoration: 'none',
                   fontFamily: 'var(--font-manrope), system-ui',
                   fontSize: 15, fontWeight: 600,
                 }}
               >Dowiedz się więcej</a>
               
               <button 
                 onClick={() => setShowInfo(null)}
                 style={{
                   height: 44, background: 'none', border: 0,
                   color: PT.plumSoft, fontFamily: 'var(--font-manrope), system-ui',
                   fontSize: 14, fontWeight: 500, cursor: 'pointer'
                 }}
               >Zamknij</button>
             </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Inner page (reads URL params) ───────────────────────────
function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stageParam = searchParams.get('stage');
  const initialStage = Math.min(5, Math.max(1,
    parseInt(stageParam) ||
    (typeof window !== 'undefined' ? parseInt(localStorage.getItem('userStage')) : 0) ||
    1
  ));
  const [stage, setStage] = useState(initialStage);

  useEffect(() => {
    if (stageParam) localStorage.setItem('userStage', stageParam);
  }, [stageParam]);
  const [screen, setScreen] = useState('dashboard');
  const [checklistType, setChecklistType] = useState('badanie');
  const [chatTopic, setChatTopic] = useState(null);
  const data = STAGE_DATA[stage];

  const back = () => { setScreen('dashboard'); setChatTopic(null); };

  function handleTileClick(item) {
    const label = item.label;
    if (label === 'Moja ścieżka leczenia') {
      router.push(`/timeline?stage=${stage}&dash=${stage}`);
      return;
    }
    const nav = {
      'Gdzie się zbadać':        () => setScreen('find-clinic'),
      'Co zabrać na badanie':    () => { setChecklistType('badanie');   setScreen('checklist'); },
      'Zapytaj asystentkę':      () => { setChatTopic(null); setScreen('chat'); },
      'Twoje skierowanie':       () => setScreen('documents'),
      'Co oznacza biopsja':      () => { setChatTopic('Co oznacza biopsja?'); setScreen('chat'); },
      'Pytania do lekarza':      () => { setChatTopic(null); setScreen('chat'); },
      'Wsparcie psychologiczne': () => setScreen('support'),
      'Moje dokumenty':          () => setScreen('documents'),
      'Umów wizytę':             () => setScreen('book-visit'),
      'Co zabrać na konsylium':  () => { setChecklistType('konsylium'); setScreen('checklist'); },
      'Zgłoś objaw':             () => setScreen('report-symptom'),
      'Moje wyniki':             () => setScreen('my-results'),
      'Wizyty':                  () => setScreen('book-visit'),
      'Wsparcie':                () => setScreen('support'),
      'Plan rehabilitacji':      () => setScreen('rehab-plan'),
      'Grupy wsparcia':          () => setScreen('support'),
      'Zadbaj o siebie':         () => setScreen('partners'),
    };
    nav[label]?.();
  }

  if (screen === 'find-clinic')    return <FindClinic onBack={back}/>;
  if (screen === 'checklist')      return <Checklist type={checklistType} onBack={back}/>;
  if (screen === 'chat')           return <ChatScreen onBack={back} initialMessage={chatTopic}/>;
  if (screen === 'documents')      return <DocumentsScreen onBack={back}/>;
  if (screen === 'book-visit')     return <BookVisit onBack={back}/>;
  if (screen === 'report-symptom') return <ReportSymptom onBack={back}/>;
  if (screen === 'my-results')     return <MyResults onBack={back}/>;
  if (screen === 'support')        return <SupportScreen onBack={back}/>;
  if (screen === 'rehab-plan')     return <RehabPlan onBack={back}/>;
  if (screen === 'partners')            return <PartnersScreen onBack={back} onOpenChat={() => setScreen('chat')}/>;
  if (screen === 'appointment-detail')  return <AppointmentDetail onBack={back} onOpenChat={() => setScreen('chat')}/>;

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50%       { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
      <div className="page-bg" style={{
        minHeight: '100dvh',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 32px)',
      }}>
        <Header/>
        <HeroCard data={data} onCTA={
          stage === 1 ? () => setScreen('find-clinic') :
          stage === 3 ? () => { setChatTopic('Co to jest konsylium?'); setScreen('chat'); } :
          stage === 4 ? () => setScreen('appointment-detail') : 
          stage === 5 ? () => setScreen('rehab-plan') : undefined
        }/>
        <PathStrip currentStage={stage}/>
        <QuickGrid items={data.grid} onItemClick={handleTileClick}/>
        {data.hasSymptomCheckin && <SymptomCheckin/>}
        {data.hasPostTreatment  && <PostTreatmentCard/>}

        {/* demo strip — only visible during presentation */}
        <div style={{
          margin: '28px 16px 0',
          padding: '12px 14px',
          background: PT.night,
          borderRadius: 16,
        }}>
          <div style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(251,245,238,0.3)', marginBottom: 10,
          }}>Demo — zmień etap</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {STAGE_META.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)} style={{
                appearance: 'none', border: 0,
                background: stage === s.id ? PT.salmon : 'rgba(255,255,255,0.1)',
                color: stage === s.id ? '#fff' : 'rgba(251,245,238,0.55)',
                borderRadius: 999, height: 30,
                paddingLeft: 12, paddingRight: 12,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 12, fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}>
                {s.id}. {s.label}
              </button>
            ))}
          </div>
          <Link href="/onboarding" style={{ textDecoration: 'none' }}>
            <div style={{
              marginTop: 10,
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 11, color: 'rgba(251,245,238,0.35)',
              cursor: 'pointer',
            }}>
              Wróć do onboardingu →
            </div>
          </Link>
        </div>

        <div style={{ height: 24 }}/>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent/>
    </Suspense>
  );
}
