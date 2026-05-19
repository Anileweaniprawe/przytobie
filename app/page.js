'use client';
import Link from 'next/link';
import { PT } from '@/lib/theme';

export default function WelcomePage() {
  return (
    <div className="page-bg" style={{
      width: '100%',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 'max(env(safe-area-inset-top, 0px), 24px)',
      paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
      paddingLeft: 32,
      paddingRight: 32,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* warm halo */}
      <div style={{
        position: 'absolute',
        top: -80, left: '50%',
        transform: 'translateX(-50%)',
        width: 480, height: 480,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${PT.salmon}22 0%, transparent 65%)`,
        pointerEvents: 'none',
      }}/>

      <div className="fade-up" style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* logo + tagline */}
        <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src="/logo.png" 
            alt="PrzyTobie" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 12px 24px rgba(58,42,63,0.12))'
            }} 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 15 }}>
          <span style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 40, lineHeight: 1,
            letterSpacing: '-0.025em',
            color: PT.plum, whiteSpace: 'nowrap',
          }}>
            <span style={{ fontWeight: 400 }}>Przy</span>
            <span style={{ fontWeight: 600 }}>Tobie</span>
          </span>
          <p style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontStyle: 'italic',
            fontSize: 18, lineHeight: 1.4,
            color: PT.plumSoft,
            textAlign: 'center',
            letterSpacing: '-0.005em',
            margin: 0,
          }}>
            Na każdym kroku.
          </p>
        </div>

        {/* buttons — directly below, no gap */}
        <div style={{
          width: '100%',
          display: 'flex', flexDirection: 'column', gap: 10,
          marginTop: 40,
          animationDelay: '0.15s',
        }}>
          <Link href="/onboarding" style={{ textDecoration: 'none' }}>
            <button style={{
              width: '100%',
              appearance: 'none', border: 0,
              background: PT.plum, color: PT.cream,
              height: 54, borderRadius: 27,
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 16, fontWeight: 600,
              letterSpacing: '-0.01em',
              boxShadow: '0 10px 22px -8px rgba(58,42,63,0.4)',
            }}>
              Zacznij ze mną
            </button>
          </Link>
          <button style={{
            appearance: 'none', border: 0, background: 'transparent',
            color: PT.plum, height: 44, borderRadius: 22,
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 15, fontWeight: 500, opacity: 0.65,
          }}>
            Mam już konto
          </button>
          <p style={{
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 11, fontWeight: 400,
            color: 'rgba(58,42,63,0.4)',
            textAlign: 'center',
            letterSpacing: '0.005em',
            margin: 0,
          }}>
            Twoja prywatność jest chroniona. Zawsze.
          </p>
        </div>
      </div>
    </div>
  );
}
