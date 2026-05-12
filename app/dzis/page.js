'use client';
import Link from 'next/link';
import Mark from '@/components/Mark';
import { PT } from '@/lib/theme';

const tasks = [
  { label: 'Przyjmij leki',       time: '8:00',  done: true },
  { label: 'Wizyta u onkologa',   time: '14:30', active: true },
  { label: 'Wyniki morfologii',   time: 'dziś',  done: false },
];

export default function DzisPage() {
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
      {/* top bar */}
      <div className="fade-up" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mark size={32}/>
          <span style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontWeight: 600, fontSize: 16, color: PT.plum,
          }}>Dziś</span>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: PT.blush,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-manrope), system-ui',
          fontWeight: 600, fontSize: 15, color: PT.plum,
        }}>A</div>
      </div>

      {/* greeting */}
      <p className="fade-up" style={{
        fontFamily: 'var(--font-newsreader), Georgia, serif',
        fontStyle: 'italic',
        fontSize: 27, lineHeight: 1.3,
        color: PT.plum,
        letterSpacing: '-0.01em',
        marginBottom: 24,
        animationDelay: '0.06s',
      }}>
        Jutro ważny dzień,<br/>
        <span style={{ color: PT.plumSoft }}>jesteśmy przy Tobie.</span>
      </p>

      {/* message card */}
      <div className="fade-up" style={{
        background: PT.plum,
        borderRadius: 24,
        padding: '20px 22px',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
        animationDelay: '0.12s',
      }}>
        <div style={{
          position: 'absolute', top: -24, right: -24,
          width: 130, height: 130, borderRadius: '50%',
          background: `${PT.salmon}22`,
          pointerEvents: 'none',
        }}/>
        <div style={{
          fontSize: 11, fontWeight: 600,
          letterSpacing: '0.06em',
          color: `${PT.inkOnDark}70`,
          textTransform: 'uppercase',
          marginBottom: 10,
          fontFamily: 'var(--font-manrope), system-ui',
        }}>
          Wiadomość od zespołu
        </div>
        <p style={{
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontStyle: 'italic',
          fontSize: 16, lineHeight: 1.55,
          color: PT.inkOnDark,
          letterSpacing: '-0.005em',
          position: 'relative', zIndex: 1,
        }}>
          „Pamiętaj, że możesz zadać nam pytanie w każdej chwili. Jesteśmy tu dla Ciebie."
        </p>
        <div style={{
          marginTop: 12,
          fontSize: 12,
          color: `${PT.inkOnDark}60`,
          fontFamily: 'var(--font-manrope), system-ui',
        }}>
          dr Monika Wiśniewska
        </div>
      </div>

      {/* today's tasks */}
      <div style={{
        fontFamily: 'var(--font-manrope), system-ui',
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.07em',
        color: 'rgba(58,42,63,0.45)',
        textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        Na dziś
      </div>

      <div className="fade-up" style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        animationDelay: '0.18s',
      }}>
        {tasks.map((task, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: task.active ? PT.salmon
                       : task.done  ? `${PT.lilacDeep}25`
                       : PT.paper,
            borderRadius: 18,
            padding: '14px 18px',
            boxShadow: task.active ? `0 8px 20px -6px ${PT.salmon}60` : 'none',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 15, flexShrink: 0,
              background: task.done   ? PT.lilacDeep
                         : task.active ? `${PT.cream}40`
                         : 'rgba(58,42,63,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {task.done && (
                <svg width="13" height="13" viewBox="0 0 14 14">
                  <path d="M3 7.5l3 3 5-6" fill="none" stroke={PT.cream}
                        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontWeight: 600, fontSize: 15,
                color: task.active ? PT.cream : PT.plum,
                letterSpacing: '-0.01em',
                textDecoration: task.done ? 'line-through' : 'none',
                opacity: task.done ? 0.6 : 1,
              }}>{task.label}</div>
              <div style={{
                fontSize: 13,
                color: task.active ? `${PT.cream}85` : 'rgba(58,42,63,0.45)',
                marginTop: 2,
                fontFamily: 'var(--font-manrope), system-ui',
              }}>{task.time}</div>
            </div>
            {task.active && (
              <svg width="7" height="13" viewBox="0 0 8 14" fill="none">
                <path d="M1 1l6 6-6 6" stroke={PT.cream} strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        ))}
      </div>

      <div style={{ height: 8 }}/>

      <Link href="/" style={{ textDecoration: 'none', marginTop: 28 }}>
        <button style={{
          width: '100%',
          appearance: 'none',
          border: `1.5px solid rgba(58,42,63,0.14)`,
          background: 'transparent',
          color: PT.plumSoft,
          height: 52, borderRadius: 26,
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 15, fontWeight: 500,
        }}>
          ← Wróć na start
        </button>
      </Link>
    </div>
  );
}
