'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PT } from '@/lib/theme';
import { SUBTYPES } from '@/lib/treatment';

const STAGE_NUMBER = {
  badania:       1,
  biopsja:       2,
  diagnoza:      3,
  leczenie:      4,
  rehabilitacja: 5,
};

const STAGES = [
  {
    id: 'badania',
    label: 'Jestem na etapie badań',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'biopsja',
    label: 'Jestem w trakcie diagnostyki',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'diagnoza',
    label: 'Mam diagnozę, czekam na plan',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m8.5 8.5 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'leczenie',
    label: 'Jestem w trakcie aktywnego leczenia',
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
  const [subtype, setSubtype] = useState(null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [step2Active, setStep2Active] = useState(false);
  const nameRef = useRef(null);

  const stageNum = STAGE_NUMBER[selected];
  const nameValid = name.trim().length >= 2;
  const hasDiagnosis = stageNum >= 3 && stageNum <= 4;
  const totalSteps = hasDiagnosis ? 3 : 2;

  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => {
        setStep2Active(true);
        nameRef.current?.focus();
      }, 350);
      return () => clearTimeout(t);
    }
  }, [step]);

  function goToStep2() {
    if (selected) setStep(2);
  }

  function nextOrFinish() {
    if (step === 2) {
      if (!nameValid) return;
      if (hasDiagnosis) {
        setStep(3);
      } else {
        finish();
      }
    } else if (step === 3) {
      if (subtype) finish();
    }
  }

  function finish() {
    const trimmed = name.trim();
    localStorage.setItem('userName', trimmed);
    localStorage.setItem('userStage', String(stageNum));
    if (subtype) {
      localStorage.setItem('userSubtype', subtype);
    }
    router.push('/dashboard?stage=' + stageNum);
  }

  return (
    <div className="page-bg" style={{
      width: '100%', minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      paddingTop: 'max(env(safe-area-inset-top, 0px), 52px)',
      paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 32px)',
      paddingLeft: 20, paddingRight: 20, position: 'relative',
    }}>

      {/* header row */}
      <div className="fade-up" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 36, position: 'relative', zIndex: 1,
      }}>
        <img src="/logo.png" alt="PrzyTobie" style={{ height: 32, width: 'auto', objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
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
          }}>{step} / {totalSteps}</span>
        </div>
      </div>

      {/* ── STEP 1: stage selection ── */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="fade-up" style={{ marginBottom: 28 }}>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: PT.salmon, marginBottom: 10,
            }}>Krok 1 z {totalSteps}</p>
            <h1 style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif', fontStyle: 'italic',
              fontSize: 30, lineHeight: 1.2, color: PT.plum, letterSpacing: '-0.02em', fontWeight: 500,
            }}>Na jakim etapie<br/>jesteś?</h1>
          </div>

          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STAGES.map((stage) => {
              const isSelected = selected === stage.id;
              return (
                <button key={stage.id} onClick={() => setSelected(stage.id)} style={{
                  appearance: 'none', border: isSelected ? `2px solid ${PT.salmonDeep}` : `1.5px solid rgba(58,42,63,0.09)`,
                  borderRadius: 18, padding: '15px 18px', background: isSelected ? `linear-gradient(135deg, ${PT.salmon} 0%, ${PT.salmonDeep} 100%)` : PT.paper,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                  transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.3, 1)',
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 14, background: isSelected ? 'rgba(255,255,255,0.2)' : PT.cream,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: isSelected ? PT.cream : PT.plumSoft,
                  }}>{stage.icon}</div>
                  <span style={{ fontWeight: isSelected ? 600 : 500, fontSize: 14.5, color: isSelected ? PT.cream : PT.plum, flex: 1 }}>{stage.label}</span>
                  {isSelected && <Checkmark/>}
                </button>
              );
            })}
          </div>

          <button onClick={goToStep2} disabled={!selected} style={{
            marginTop: 24, width: '100%', height: 56, borderRadius: 28, background: selected ? PT.plum : 'rgba(58,42,63,0.1)',
            color: selected ? PT.cream : 'rgba(58,42,63,0.35)', border: 0, fontWeight: 600,
          }}>Dalej</button>
        </div>
      )}

      {/* ── STEP 2: name input ── */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="fade-up" style={{ marginBottom: 40 }}>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: PT.salmon, marginBottom: 10,
            }}>Krok 2 z {totalSteps}</p>
            <h1 style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif', fontStyle: 'italic',
              fontSize: 30, lineHeight: 1.2, color: PT.plum, letterSpacing: '-0.02em', fontWeight: 500,
            }}>Jak masz na imię?</h1>
          </div>

          <input ref={nameRef} type="text" value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && nextOrFinish()} placeholder="Wpisz swoje imię"
            style={{
              width: '100%', height: 68, borderRadius: 22, border: `1.5px solid rgba(58,42,63,0.12)`,
              background: '#fff', padding: '0 24px', fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontSize: 26, color: PT.plum, textAlign: 'center', outline: 'none',
            }}
          />

          <button onClick={nextOrFinish} disabled={!nameValid} style={{
            marginTop: 24, width: '100%', height: 56, borderRadius: 28, background: nameValid ? PT.plum : 'rgba(58,42,63,0.1)',
            color: nameValid ? PT.cream : 'rgba(58,42,63,0.35)', border: 0, fontWeight: 600,
          }}>{hasDiagnosis ? 'Ostatni krok' : 'Zaczynajmy'}</button>
        </div>
      )}

      {/* ── STEP 3: subtype selection ── */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="fade-up" style={{ marginBottom: 28 }}>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: PT.salmon, marginBottom: 10,
            }}>Krok 3 z 3</p>
            <h1 style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif', fontStyle: 'italic',
              fontSize: 30, lineHeight: 1.2, color: PT.plum, letterSpacing: '-0.02em', fontWeight: 500,
            }}>Czy znasz swój<br/>podtyp biologiczny?</h1>
            <p style={{ fontSize: 14, color: 'rgba(58,42,63,0.5)', marginTop: 8 }}>To pozwoli nam przygotować Twoją osobistą ścieżkę leczenia.</p>
          </div>

          <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SUBTYPES.map((sub) => {
              const isSelected = subtype === sub.id;
              return (
                <button key={sub.id} onClick={() => setSubtype(sub.id)} style={{
                  appearance: 'none', border: isSelected ? `2px solid ${sub.color}` : `1.5px solid rgba(58,42,63,0.09)`,
                  borderRadius: 18, padding: '15px 18px', background: isSelected ? sub.color : PT.paper,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                  transition: 'all 0.2s',
                }}>
                  <span style={{ fontWeight: isSelected ? 600 : 500, fontSize: 14.5, color: isSelected ? PT.cream : PT.plum, flex: 1 }}>{sub.label}</span>
                  {isSelected && <Checkmark/>}
                </button>
              );
            })}
            <button onClick={() => setSubtype('unknown')} style={{
              appearance: 'none', border: subtype === 'unknown' ? `2px solid ${PT.plum}` : `1.5px solid rgba(58,42,63,0.09)`,
              borderRadius: 18, padding: '15px 18px', background: subtype === 'unknown' ? PT.plum : PT.paper,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
              transition: 'all 0.2s', marginTop: 8
            }}>
              <span style={{ fontWeight: subtype === 'unknown' ? 600 : 500, fontSize: 14.5, color: subtype === 'unknown' ? PT.cream : PT.plum, flex: 1 }}>Nie wiem jeszcze / Czekam na wyniki</span>
              {subtype === 'unknown' && <Checkmark/>}
            </button>
          </div>

          <button onClick={finish} disabled={!subtype} style={{
            marginTop: 24, width: '100%', height: 56, borderRadius: 28, background: subtype ? PT.plum : 'rgba(58,42,63,0.1)',
            color: subtype ? PT.cream : 'rgba(58,42,63,0.35)', border: 0, fontWeight: 600,
          }}>Zaczynajmy</button>
        </div>
      )}
    </div>
  );
}
