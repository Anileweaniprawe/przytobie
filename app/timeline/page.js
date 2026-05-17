'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PT } from '@/lib/theme';

// ─── Timeline palette ─────────────────────────────────────────
const TC = {
  sageLine:   '#A8C5A0',
  sageBg:     '#EAF2E7',
  sageIcon:   '#4E7E4C',
  roseLine:   '#4AAAC6',
  roseBg:     '#E4F2FA',
  roseIcon:   '#3A90B5',
  grayLine:   '#D0C8C0',
  grayBg:     '#EDE8E3',
  grayIcon:   'rgba(58,42,63,0.28)',
};

// ─── Icons ────────────────────────────────────────────────────
function Icon({ name, size = 20, color, sw = 1.8 }) {
  const d = {
    search:    <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    dna:       <><path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6M6 12h.01M18 12h.01"/></>,
    hospital:  <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></>,
    pill:      <><rect x="7" y="2" width="10" height="20" rx="5"/><line x1="7" y1="12" x2="17" y2="12"/></>,
    leaf:      <path d="M17 8C8 10 5.9 16.17 3.82 22.8L5.71 23l1-2.3A4.49 4.49 0 008 21C19 21 22 3 22 3c-1 2-8 3-9 8-2 0-4.5 1-6 3.5.5-2 4-5 6-5z"/>,
    sun:       <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    chevron:   <polyline points="9 18 15 12 9 6"/>,
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    chat:      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {d[name]}
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────
const STAGES = [
  {
    id: 1, icon: 'search',
    label: 'Badania',
    subtitle: 'Mammografia, USG, biopsja',
    textDone: 'Ten etap masz już za sobą. Pierwsze badania pozwoliły na wstępną ocenę zmian.',
    textActive: 'Jesteś na etapie badań diagnostycznych. Mammografia i USG to podstawa dalszych kroków.',
    textUpcoming: 'To pierwszy krok — badania obrazowe, które pozwalają na wstępną ocenę zmian.',
  },
  {
    id: 2, icon: 'dna',
    label: 'Diagnostyka',
    subtitle: 'Biopsja, wyniki, konsultacje',
    textDone: 'Biopsja i wyniki badań pozwoliły postawić dokładną diagnozę. To był trudny etap oczekiwania.',
    textActive: 'Teraz najważniejsze jest postawienie dokładnej diagnozy. Czekanie na wyniki biopsji bywa trudne, ale to klucz do dobrego planu leczenia.',
    textUpcoming: 'Jeśli badania obrazowe wykażą taką potrzebę, kolejnym krokiem będzie dokładniejsza diagnostyka, np. biopsja.',
  },
  {
    id: 3, icon: 'hospital',
    label: 'Leczenie operacyjne',
    subtitle: 'Konsylium · Operacja',
    special: true,
    textDone: 'Operacja i pobyt w szpitalu są już za Tobą. Teraz Twój organizm potrzebuje czasu na regenerację.',
    textActive: 'Twój zespół BCU przygotowuje plan leczenia. Pierwszym krokiem jest konsylium wielodyscyplinarne i przygotowanie do operacji.',
    textUpcoming: 'Na podstawie wyników diagnostyki, zespół lekarzy zaplanuje optymalny dla Ciebie zabieg operacyjny.',
  },
  {
    id: 4, icon: 'pill',
    label: 'Leczenie okołooperacyjne',
    subtitle: 'Chemioterapia · Radioterapia · Hormonoterapia',
    textDone: 'Główne leczenie onkologiczne zostało zakończone. To wielki sukces na Twojej ścieżce.',
    textActive: 'To etap leczenia wspomagającego, który ma na celu zniszczenie ewentualnych pozostałych komórek nowotworowych. Szczegóły omówisz z onkologiem.',
    textUpcoming: 'Zależnie od typu nowotworu i wyniku operacji, lekarz może zalecić chemioterapię, radioterapię lub leczenie hormonalne.',
  },
  {
    id: 5, icon: 'leaf',
    label: 'Opieka po leczeniu',
    subtitle: 'Rehabilitacja · Wizyty kontrolne',
    textDone: 'Jesteś pod stałą opieką i regularnie się badasz. To daje spokój i poczucie bezpieczeństwa.',
    textActive: 'Skupiamy się na powrocie do sprawności. Regularne kontrole i rehabilitacja to teraz Twoi sprzymierzeńcy.',
    textUpcoming: 'Po zakończeniu aktywnego leczenia przejdziesz pod stałą opiekę poradni, by monitorować stan zdrowia i wspierać regenerację.',
  },
  {
    id: 6, icon: 'sun',
    label: 'Powrót do życia',
    subtitle: 'Rekonstrukcja · Wsparcie długoterminowe',
    textDone: 'Wróciłaś do swoich aktywności z nową siłą. Pamiętaj, że zawsze możesz liczyć na wsparcie społeczności.',
    textActive: 'To czas na odzyskiwanie pełni sił i planowanie przyszłości. Możesz też rozważyć zabiegi rekonstrukcyjne.',
    textUpcoming: 'Z czasem choroba stanie się tylko wspomnieniem, a Ty wrócisz do pełnej aktywności życiowej i zawodowej.',
  },
];

const QUESTIONS = [
  'Co dokładnie obejmuje operacja?',
  'Jakie są dostępne metody chirurgiczne?',
  'Jak długo potrwa hospitalizacja?',
  'Co muszę przygotować przed zabiegiem?',
];

// ─── Single stage row ─────────────────────────────────────────
function StageRow({ stage, activeStage, isExpanded, onToggle, isLast, questionsOpen, setQuestionsOpen }) {
  const done     = stage.id < activeStage;
  const active   = stage.id === activeStage;
  const upcoming = stage.id > activeStage;

  const displayText = done ? stage.textDone : active ? stage.textActive : stage.textUpcoming;

  const nodeBg    = done ? TC.sageBg   : active ? TC.roseBg   : TC.grayBg;
  const nodeColor = done ? TC.sageIcon : active ? TC.roseIcon : TC.grayIcon;

  const connectorColor  = done ? TC.sageLine : active ? TC.roseLine : TC.grayLine;
  const connectorDashed = upcoming;

  const labelColor    = upcoming ? 'rgba(58,42,63,0.38)' : PT.plum;
  const subtitleColor = upcoming ? 'rgba(58,42,63,0.28)' : 'rgba(58,42,63,0.5)';

  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>

      {/* ── LEFT: track ── */}
      <div style={{
        width: 48, flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 10,
      }}>
        {/* node */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {active && (
            <div style={{
              position: 'absolute', inset: -7,
              borderRadius: '50%',
              border: `2px solid ${TC.roseLine}`,
              animation: 'pulseRing 2.2s ease-in-out infinite',
              opacity: 0.5,
            }}/>
          )}
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: nodeBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            {done
              ? <Icon name="check" size={16} color={TC.sageIcon} sw={2.5}/>
              : <Icon name={stage.icon} size={17} color={nodeColor}/>
            }
          </div>
        </div>
        {/* connector below node */}
        {!isLast && (
          <div style={{
            flex: 1,
            width: connectorDashed ? 0 : 2,
            minHeight: 20,
            marginTop: 4,
            background: connectorDashed ? 'none' : connectorColor,
            borderLeft: connectorDashed ? `2px dashed ${connectorColor}` : 'none',
          }}/>
        )}
      </div>

      {/* ── RIGHT: card ── */}
      <div style={{
        flex: 1,
        paddingBottom: isLast ? 0 : 12,
        paddingRight: 2,
      }}>
        {/* tap target: header */}
        <button
          onClick={onToggle}
          style={{
            width: '100%', appearance: 'none', border: 0,
            background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 14px 8px 8px',
            borderRadius: 16,
            background: active && isExpanded
              ? 'rgba(201,110,122,0.05)'
              : isExpanded
              ? 'rgba(58,42,63,0.03)'
              : 'transparent',
          }}
        >
          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 2 }}>
              <span style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontWeight: active ? 700 : done ? 600 : 500,
                fontSize: 15, letterSpacing: '-0.01em',
                color: labelColor,
              }}>{stage.label}</span>
              {active && (
                <span style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 10, fontWeight: 700,
                  background: TC.roseLine, color: '#fff',
                  borderRadius: 999, padding: '2px 8px',
                  letterSpacing: '0.03em',
                }}>Jesteś tutaj</span>
              )}
            </div>
            <div style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 12, color: subtitleColor,
              letterSpacing: '-0.005em',
            }}>{stage.subtitle}</div>
          </div>
          <div style={{
            flexShrink: 0,
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.22s',
            opacity: upcoming ? 0.3 : 0.5,
          }}>
            <Icon name="chevron" size={15} color={PT.plumSoft}/>
          </div>
        </button>

        {/* expanded body */}
        {isExpanded && (
          <div style={{ paddingLeft: 8, paddingRight: 14, paddingBottom: 4 }}>
            {stage.special && active ? (
              // ── Stage 3 special ──────────────────────────
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* "co teraz?" block */}
                <div style={{
                  background: PT.paper, borderRadius: 14,
                  padding: '13px 15px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'rgba(58,42,63,0.38)', marginBottom: 7,
                  }}>Co teraz?</div>
                  <p style={{
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 14, lineHeight: 1.6,
                    color: PT.plumSoft, margin: 0,
                  }}>{displayText}</p>
                </div>

                {/* pytania do lekarza */}
                <div style={{
                  border: `1px solid rgba(58,42,63,0.1)`,
                  borderRadius: 14, overflow: 'hidden',
                  background: PT.cream,
                }}>
                  <button
                    onClick={e => { e.stopPropagation(); setQuestionsOpen(v => !v); }}
                    style={{
                      width: '100%', appearance: 'none', border: 0,
                      background: 'transparent', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '12px 14px', textAlign: 'left',
                    }}
                  >
                    <Icon name="chat" size={16} color={PT.plumSoft}/>
                    <span style={{
                      flex: 1,
                      fontFamily: 'var(--font-manrope), system-ui',
                      fontWeight: 600, fontSize: 14,
                      color: PT.plum, letterSpacing: '-0.01em',
                    }}>Pytania do lekarza</span>
                    <div style={{
                      transform: questionsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}>
                      <Icon name="chevron" size={14} color={PT.plumSoft}/>
                    </div>
                  </button>

                  {questionsOpen && (
                    <div style={{ borderTop: '1px solid rgba(58,42,63,0.07)' }}>
                      {QUESTIONS.map((q, i) => (
                        <div key={i} style={{
                          padding: '11px 14px',
                          borderBottom: i < QUESTIONS.length - 1 ? '1px solid rgba(58,42,63,0.06)' : 'none',
                          fontFamily: 'var(--font-manrope), system-ui',
                          fontSize: 13, lineHeight: 1.5,
                          color: PT.plumSoft,
                          display: 'flex', alignItems: 'flex-start', gap: 8,
                        }}>
                          <div style={{ width: 4, height: 4, borderRadius: 2, background: TC.roseLine, marginTop: 7, flexShrink: 0 }}/>
                          {q}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* zapytaj asystentkę */}
                <button
                  onClick={() => console.log('open chat')}
                  style={{
                    width: '100%', appearance: 'none', border: 0,
                    background: TC.roseLine, color: '#fff',
                    height: 46, borderRadius: 23,
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 14, fontWeight: 600,
                    letterSpacing: '-0.01em', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    boxShadow: `0 8px 20px -6px ${TC.roseLine}70`,
                  }}
                >
                  <Icon name="chat" size={15} color="#fff"/>
                  Zapytaj asystentkę
                </button>
              </div>
            ) : (
              // ── Regular expanded ─────────────────────────
              <p style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 14, lineHeight: 1.6,
                color: upcoming ? 'rgba(58,42,63,0.42)' : PT.plumSoft,
                margin: '4px 0 8px',
              }}>{displayText}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page content ─────────────────────────────────────────────
function TimelineContent() {
  const searchParams   = useSearchParams();
  const urlStage       = Math.min(6, Math.max(1, parseInt(searchParams.get('stage') ?? '3', 10)));
  const dashParam      = searchParams.get('dash');
  const dashStage      = Math.min(5, Math.max(1,
    parseInt(dashParam) ||
    (typeof window !== 'undefined' ? parseInt(localStorage.getItem('userStage')) : 0) ||
    1
  ));

  const [activeStage,    setActiveStage]    = useState(urlStage);
  const [expanded,       setExpanded]       = useState(urlStage);
  const [questionsOpen,  setQuestionsOpen]  = useState(false);

  function switchStage(n) {
    setActiveStage(n);
    setExpanded(n);
    setQuestionsOpen(false);
  }

  function toggleExpanded(id) {
    setExpanded(prev => prev === id ? null : id);
    if (id !== activeStage) setQuestionsOpen(false);
  }

  return (
    <>
      <style>{`
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.45); opacity: 0; }
        }
      `}</style>

      <div className="page-bg" style={{
        minHeight: '100dvh',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 32px)',
      }}>

        {/* ── Header (matches Dashboard height/padding) ──── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          paddingTop: 'max(env(safe-area-inset-top, 0px), 52px)',
          paddingBottom: 4,
          paddingLeft: 20, paddingRight: 20,
        }}>
          <Link href={`/dashboard?stage=${dashStage}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 18,
              background: PT.paper,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="arrowLeft" size={18} color={PT.plumSoft}/>
            </div>
          </Link>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontWeight: 700, fontSize: 17,
              color: PT.plum, letterSpacing: '-0.02em',
            }}>Moja ścieżka leczenia</div>
            <div style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontStyle: 'italic', fontSize: 13,
              color: 'rgba(58,42,63,0.45)', marginTop: 1,
            }}>Przy Tobie na każdym kroku</div>
          </div>
        </div>

        {/* ── Subtitle ─────────────────────────────────── */}
        <div style={{
          paddingLeft: 20, paddingRight: 20,
          paddingTop: 20, paddingBottom: 6,
        }}>
          <p style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontStyle: 'italic', fontSize: 21, lineHeight: 1.3,
            color: PT.plum, letterSpacing: '-0.01em', margin: 0,
          }}>
            Każdy etap jest krokiem<br/>
            <span style={{ color: PT.plumSoft }}>bliżej do siebie.</span>
          </p>
        </div>

        {/* ── Progress pill ────────────────────────────── */}
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 14, paddingBottom: 4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: TC.roseBg,
            borderRadius: 999, padding: '6px 14px',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: TC.roseLine, flexShrink: 0 }}/>
            <span style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 12, fontWeight: 600,
              color: TC.roseIcon, letterSpacing: '-0.01em',
            }}>
              Etap {activeStage} z {STAGES.length}
            </span>
          </div>
        </div>

        {/* ── Timeline ─────────────────────────────────── */}
        <div style={{ padding: '16px 20px 8px' }}>
          {STAGES.map((stage, idx) => (
            <StageRow
              key={stage.id}
              stage={stage}
              activeStage={activeStage}
              isExpanded={expanded === stage.id}
              onToggle={() => toggleExpanded(stage.id)}
              isLast={idx === STAGES.length - 1}
              questionsOpen={questionsOpen}
              setQuestionsOpen={setQuestionsOpen}
            />
          ))}
        </div>

        {/* ── Demo switcher ────────────────────────────── */}
        <div style={{
          margin: '16px 20px 0',
          background: PT.night,
          borderRadius: 16,
          padding: '12px 14px',
        }}>
          <div style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(251,245,238,0.3)', marginBottom: 10,
          }}>Demo — aktywny etap</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {STAGES.map(s => (
              <button key={s.id} onClick={() => switchStage(s.id)} style={{
                appearance: 'none', border: 0,
                background: activeStage === s.id ? TC.roseLine : 'rgba(255,255,255,0.1)',
                color: activeStage === s.id ? '#fff' : 'rgba(251,245,238,0.55)',
                borderRadius: 999, height: 28,
                paddingLeft: 11, paddingRight: 11,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 11, fontWeight: 600,
                cursor: 'pointer', transition: 'background 0.18s',
              }}>
                {s.id}
              </button>
            ))}
          </div>
          <Link href={`/dashboard?stage=${Math.min(5, activeStage)}`} style={{ textDecoration: 'none' }}>
            <div style={{
              marginTop: 10,
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 11, color: 'rgba(251,245,238,0.35)',
              cursor: 'pointer',
            }}>
              Wróć do dashboardu →
            </div>
          </Link>
        </div>

        <div style={{ height: 24 }}/>
      </div>
    </>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={null}>
      <TimelineContent/>
    </Suspense>
  );
}
