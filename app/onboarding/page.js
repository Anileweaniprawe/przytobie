'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Mark from '@/components/Mark';
import { PT } from '@/lib/theme';

const STAGE_NUMBER = {
  skierowanie:   1,
  biopsja:       2,
  diagnoza:      3,
  leczenie:      4,
  rehabilitacja: 5,
};

const STAGES = [
  {
    id: 'skierowanie',
    label: 'Właśnie dostałam skierowanie na badanie',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 12h6M9 16h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'biopsja',
    label: 'Czekam na wyniki biopsji',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'diagnoza',
    label: 'Mam diagnozę — zaczynam leczenie',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
              stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'leczenie',
    label: 'Jestem w trakcie leczenia',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C7 17 3 13.5 3 9a5 5 0 019-3 5 5 0 019 3c0 4.5-4 8-9 12z"
              stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'rehabilitacja',
    label: 'Skończyłam leczenie — rehabilitacja',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function Checkmark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.25)"/>
      <path d="M5 9.5l3 3 5-6" stroke="#fff" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [step2Active, setStep2Active] = useState(false);
  const nameRef = useRef(null);

  const stageNum = STAGE_NUMBER[selected];
  const nameValid = name.trim().length >= 2;

  useEffect(() => {
    if (step === 2) {
      // Brief delay before activating step-2 button — prevents mobile ghost-click
      // (phantom tap landing on the new button at the same position as step-1 button)
      const t = setTimeout(() => {
        setStep2Active(true);
        nameRef.current?.focus();
      }, 350);
      return () => clearTimeout(t);
    } else {
      setStep2Active(false);
    }
  }, [step]);

  function goToStep2() {
    if (selected) setStep(2);
  }

  function finish() {
    if (step !== 2 || !step2Active || !nameValid) return;
    const trimmed = name.trim();
    localStorage.setItem('userName', trimmed);
    localStorage.setItem('userStage', String(stageNum));
    router.push('/dashboard?stage=' + stageNum);
  }

  return (
    <div className="page-bg" style={{
      width: '100%',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'max(env(safe-area-inset-top, 0px), 52px)',
      paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 32px)',
      paddingLeft: 20,
      paddingRight: 20,
      position: 'relative',
    }}>

      {/* header row — same for both steps */}
      <div className="fade-up" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 36,
        position: 'relative', zIndex: 1,
      }}>
        <Mark size={30}/>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              height: 6,
              width: step > i ? 28 : 14,
              borderRadius: 3,
              background: step > i ? PT.plum : 'rgba(58,42,63,0.15)',
              transition: 'width 0.3s, background 0.3s',
            }}/>
          ))}
          <span style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 12, fontWeight: 500,
            color: 'rgba(58,42,63,0.4)',
            marginLeft: 4,
          }}>{step} / 2</span>
        </div>
      </div>

      {/* ── STEP 1: stage selection ── */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="fade-up" style={{
            marginBottom: 28, position: 'relative', zIndex: 1,
            animationDelay: '0.05s',
          }}>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: PT.salmon, marginBottom: 10,
            }}>Krok 1 z 2</p>
            <h1 style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontStyle: 'italic',
              fontSize: 30, lineHeight: 1.2,
              color: PT.plum, letterSpacing: '-0.02em', fontWeight: 500,
            }}>
              Na jakim etapie<br/>jesteś?
            </h1>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 14, lineHeight: 1.5,
              color: 'rgba(58,42,63,0.5)', marginTop: 8,
            }}>
              Dzięki temu dopasuję wsparcie do Twojej sytuacji.
            </p>
          </div>

          <div className="fade-up" style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            position: 'relative', zIndex: 1,
            animationDelay: '0.1s',
          }}>
            {STAGES.map((stage, idx) => {
              const isSelected = selected === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelected(stage.id)}
                  style={{
                    appearance: 'none',
                    border: isSelected
                      ? `2px solid ${PT.salmonDeep}`
                      : `1.5px solid rgba(58,42,63,0.09)`,
                    borderRadius: 18,
                    padding: '15px 18px',
                    background: isSelected
                      ? `linear-gradient(135deg, ${PT.salmon} 0%, ${PT.salmonDeep} 100%)`
                      : PT.paper,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 14,
                    textAlign: 'left',
                    boxShadow: isSelected
                      ? `0 8px 24px -6px ${PT.salmon}70`
                      : '0 1px 4px rgba(58,42,63,0.06)',
                    transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.3, 1)',
                    transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                    animationDelay: `${0.1 + idx * 0.04}s`,
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                    background: isSelected ? 'rgba(255,255,255,0.2)' : PT.cream,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isSelected ? PT.cream : PT.plumSoft,
                    transition: 'all 0.2s',
                  }}>
                    {stage.icon}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: 14.5, lineHeight: 1.35,
                    color: isSelected ? PT.cream : PT.plum,
                    flex: 1, letterSpacing: '-0.005em',
                    transition: 'color 0.2s',
                  }}>
                    {stage.label}
                  </span>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: isSelected ? 'none' : '1.5px solid rgba(58,42,63,0.18)',
                    transition: 'all 0.2s',
                  }}>
                    {isSelected && <Checkmark/>}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="fade-up" style={{
            marginTop: 24, position: 'relative', zIndex: 1,
            animationDelay: '0.35s',
          }}>
            <button
              type="button"
              onClick={goToStep2}
              disabled={!selected}
              style={{
                width: '100%',
                appearance: 'none', border: 0,
                background: selected ? PT.plum : 'rgba(58,42,63,0.1)',
                color: selected ? PT.cream : 'rgba(58,42,63,0.35)',
                height: 56, borderRadius: 28,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em',
                cursor: selected ? 'pointer' : 'default',
                boxShadow: selected ? '0 10px 24px -8px rgba(58,42,63,0.4)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.3, 1)',
                transform: selected ? 'translateY(0)' : 'translateY(2px)',
              }}
            >
              Dalej
            </button>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 12, color: 'rgba(58,42,63,0.4)',
              textAlign: 'center', marginTop: 14,
            }}>
              Możesz to zmienić w dowolnym momencie.
            </p>
          </div>
        </div>
      )}

      {/* ── STEP 2: name input ── */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="fade-up" style={{
            marginBottom: 40, position: 'relative', zIndex: 1,
            animationDelay: '0.05s',
          }}>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: PT.salmon, marginBottom: 10,
            }}>Krok 2 z 2</p>
            <h1 style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontStyle: 'italic',
              fontSize: 30, lineHeight: 1.2,
              color: PT.plum, letterSpacing: '-0.02em', fontWeight: 500,
            }}>
              Jak masz na imię?
            </h1>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 14, lineHeight: 1.5,
              color: 'rgba(58,42,63,0.5)', marginTop: 8,
            }}>
              Użyjemy go, żeby aplikacja czuła się jak Twoja.
            </p>
          </div>

          <div className="fade-up" style={{ animationDelay: '0.1s', position: 'relative', zIndex: 1 }}>
            <input
              ref={nameRef}
              type="text"
              autoComplete="off"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && finish()}
              placeholder="Wpisz swoje imię"
              style={{
                width: '100%', height: 68,
                borderRadius: 22,
                border: `1.5px solid rgba(58,42,63,0.12)`,
                background: '#fff',
                paddingLeft: 24, paddingRight: 24,
                fontFamily: 'var(--font-newsreader), Georgia, serif',
                fontSize: 26,
                color: PT.plum,
                textAlign: 'center',
                outline: 'none',
                boxShadow: '0 2px 16px rgba(58,42,63,0.07)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          </div>

          <div className="fade-up" style={{
            marginTop: 24, position: 'relative', zIndex: 1,
            animationDelay: '0.18s',
          }}>
            <button
              type="button"
              onClick={finish}
              disabled={!step2Active || !nameValid}
              style={{
                width: '100%',
                appearance: 'none', border: 0,
                background: (step2Active && nameValid) ? PT.plum : 'rgba(58,42,63,0.1)',
                color: (step2Active && nameValid) ? PT.cream : 'rgba(58,42,63,0.35)',
                height: 56, borderRadius: 28,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em',
                cursor: (step2Active && nameValid) ? 'pointer' : 'default',
                boxShadow: (step2Active && nameValid) ? '0 10px 24px -8px rgba(58,42,63,0.4)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.3, 1)',
              }}
            >
              Dalej
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
