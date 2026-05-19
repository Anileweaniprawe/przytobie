'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Mark from '@/components/Mark';
import { PT } from '@/lib/theme';
import { getStepsForSubtype, SUBTYPES } from '@/lib/treatment';

export default function SciezkaPage() {
  const [userName, setUserName] = useState('Pacjentko');
  const [subtype, setSubtype] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const sub = localStorage.getItem('userSubtype');
    if (name) setUserName(name);
    if (sub) {
      setSubtype(sub);
      setSteps(getStepsForSubtype(sub));
    } else {
      // Default steps if no subtype selected
      setSteps([
        { t: 'Pierwsze badanie',   d: 'Zrozum, co Cię czeka.',            done: true },
        { t: 'Diagnostyka',        d: 'Wyniki, badania obrazowe i profile.', done: true },
        { t: 'Konsylium',          d: 'Wielodyscyplinarny zespół ustali plan.', active: true },
        { t: 'Leczenie',           d: 'Indywidualna ścieżka terapeutyczna.' },
        { t: 'Wsparcie',           d: 'Opieka w trakcie i po leczeniu.' },
        { t: 'Rehabilitacja',      d: 'Powrót do siebie, w swoim tempie.' },
      ]);
    }
  }, []);

  const currentSubtype = SUBTYPES.find(s => s.id === subtype);

  return (
    <div className="page-bg" style={{
      width: '100%',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'max(env(safe-area-inset-top, 0px), 52px)',
      paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 36px)',
      paddingLeft: 20,
      paddingRight: 20,
    }}>
      <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Mark size={36}/>
        <span style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontWeight: 600, fontSize: 18, color: PT.plum,
        }}>PrzyTobie</span>
      </div>

      <div className="fade-up" style={{ marginTop: 18, animationDelay: '0.05s' }}>
        <p style={{
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontStyle: 'italic',
          fontSize: 26, lineHeight: 1.25,
          color: PT.plum,
          letterSpacing: '-0.01em',
        }}>
          Dzień dobry, {userName}.<br/>
          <span style={{ color: PT.plumSoft }}>Oto Twoja ścieżka.</span>
        </p>
        
        {currentSubtype && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 12,
            background: `${currentSubtype.color}15`,
            marginTop: 12,
            border: `1px solid ${currentSubtype.color}30`
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: currentSubtype.color }} />
            <span style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 12,
              fontWeight: 600,
              color: currentSubtype.color,
              textTransform: 'uppercase',
              letterSpacing: '0.02em'
            }}>
              Podtyp: {currentSubtype.label}
            </span>
          </div>
        )}
      </div>

      <div className="fade-up" style={{
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        animationDelay: '0.12s',
      }}>
        {/* vertical guide line */}
        <div style={{
          position: 'absolute',
          left: 15, top: 14, bottom: 14,
          width: 2,
          background: `linear-gradient(${PT.blushDeep}, ${PT.lilac} 40%, ${PT.cream})`,
          borderRadius: 1,
        }}/>

        {steps.map((s, i) => {
          // Simplified logic for active/done for demo purposes
          // In a real app, this would be based on actual progress
          const isDone = i === 0;
          const isActive = i === 1;

          return (
            <div key={i} style={{
              display: 'flex', gap: 16,
              alignItems: 'flex-start',
              padding: '12px 0',
              position: 'relative',
            }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: 16, flexShrink: 0,
                background: isActive ? PT.salmon : isDone ? PT.lilacDeep : PT.paper,
                border: isActive ? `2px solid ${PT.salmonDeep}` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isActive ? `0 0 0 6px ${PT.salmon}25` : 'none',
                zIndex: 1,
                transition: 'all 0.3s'
              }}>
                {isDone && (
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d="M3 7.5l3 3 5-6" fill="none" stroke={PT.cream}
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {isActive && (
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: PT.cream }}/>
                )}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 16,
                  color: isDone || isActive ? PT.plum : PT.plumSoft,
                  letterSpacing: '-0.005em',
                }}>{s.t}</div>
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 13, fontWeight: 400,
                  color: 'rgba(58,42,63,0.55)',
                  marginTop: 2,
                }}>{s.d}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fade-up" style={{ marginTop: 'auto', paddingTop: 24, animationDelay: '0.2s' }}>
        <p style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 13,
          color: 'rgba(58,42,63,0.4)',
          textAlign: 'center',
          marginBottom: 16,
          padding: '0 20px',
          lineHeight: 1.4
        }}>
          Pamiętaj, że to ogólny schemat. Twoje konsylium dopasuje go idealnie do Ciebie.
        </p>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            appearance: 'none', border: 0,
            background: PT.plum, color: PT.cream,
            height: 56, borderRadius: 28,
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 17, fontWeight: 600,
            letterSpacing: '-0.01em',
            boxShadow: `0 10px 22px -8px rgba(58,42,63,0.4)`,
          }}>
            Przejdź do dzisiaj →
          </button>
        </Link>
      </div>
    </div>
  );
}
