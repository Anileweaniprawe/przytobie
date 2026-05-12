'use client';
import Link from 'next/link';
import Mark from '@/components/Mark';
import { PT } from '@/lib/theme';

const steps = [
  { t: 'Pierwsze badanie',   d: 'Zrozum, co Cię czeka.',            done: true },
  { t: 'Diagnostyka',        d: 'Wyniki, pytania, kontekst.',        done: true },
  { t: 'Decyzja o leczeniu', d: 'Plan przygotowany razem z Tobą.',   active: true },
  { t: 'Operacja',           d: 'Krok po kroku — bez niespodzianek.' },
  { t: 'Leczenie',           d: 'Wsparcie w trudnych dniach.' },
  { t: 'Rehabilitacja',      d: 'Powrót do siebie, w swoim tempie.' },
];

export default function SciezkaPage() {
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

      <p className="fade-up" style={{
        fontFamily: 'var(--font-newsreader), Georgia, serif',
        fontStyle: 'italic',
        fontSize: 26, lineHeight: 1.25,
        color: PT.plum,
        marginTop: 18,
        letterSpacing: '-0.01em',
        animationDelay: '0.05s',
      }}>
        Dzień dobry, Anno.<br/>
        <span style={{ color: PT.plumSoft }}>Oto Twoja ścieżka.</span>
      </p>

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

        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16,
            alignItems: 'flex-start',
            padding: '12px 0',
            position: 'relative',
          }}>
            <div style={{
              width: 32, height: 32,
              borderRadius: 16, flexShrink: 0,
              background: s.active ? PT.salmon : s.done ? PT.lilacDeep : PT.paper,
              border: s.active ? `2px solid ${PT.salmonDeep}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: s.active ? `0 0 0 6px ${PT.salmon}25` : 'none',
              zIndex: 1,
            }}>
              {s.done && (
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M3 7.5l3 3 5-6" fill="none" stroke={PT.cream}
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {s.active && (
                <div style={{ width: 10, height: 10, borderRadius: 5, background: PT.cream }}/>
              )}
            </div>
            <div style={{ paddingTop: 4 }}>
              <div style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontWeight: s.active ? 600 : 500,
                fontSize: 16,
                color: s.done || s.active ? PT.plum : PT.plumSoft,
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
        ))}
      </div>

      <Link href="/dzis" style={{ textDecoration: 'none', marginTop: 24 }} className="fade-up">
        <button style={{
          width: '100%',
          appearance: 'none', border: 0,
          background: PT.salmon, color: PT.cream,
          height: 56, borderRadius: 28,
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 17, fontWeight: 600,
          letterSpacing: '-0.01em',
          boxShadow: `0 10px 22px -8px ${PT.salmon}90`,
        }}>
          Zobacz, co dziś →
        </button>
      </Link>
    </div>
  );
}
