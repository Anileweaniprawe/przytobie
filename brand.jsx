// PrzyTobie — brand mark, lockups, palette, type, welcome screen.

// ─────────────────────────────────────────────────────────────
// Palette (oklch in CSS; hex fallbacks below for SVG fills)
// ─────────────────────────────────────────────────────────────
const PT = {
  cream:    '#FBF5EE',   // background, off-white with warm cast
  paper:    '#F4ECE2',   // secondary surface
  blush:    '#F2C9CC',   // pudrowy róż — primary brand
  blushDeep:'#E0A6AE',
  lilac:    '#C9B6D6',   // ciepły fiolet
  lilacDeep:'#A98EB8',
  salmon:   '#E89B82',   // łosoś — akcent / CTA
  salmonDeep:'#D87A60',
  plum:     '#3A2A3F',   // głęboki aubergine — tekst
  plumSoft: '#5E4A60',
  inkOnDark:'#FBF1E6',   // tekst na ciemnym
  night:    '#241924',   // ciemne tło (aubergine night)
};

// ─────────────────────────────────────────────────────────────
// The mark — multiple variants. Pick via `variant` prop.
//   "embrace" (default) — two soft figures leaning together; the
//      negative space between them reads as a heart.
//   "path"   — gentle ascending arc of stepping stones; the leading
//      stone is accented. Literal "na każdym kroku".
//   "hands"  — two cupped curves cradling a small heart.
// All variants share the same color slots so palette swaps are
// symmetric across them.
// ─────────────────────────────────────────────────────────────
function Mark({
  size = 120,
  variant = 'embrace',
  outer  = PT.blush,
  inner  = PT.lilacDeep,
  accent = PT.salmonDeep,
  mono,
  noAccent = false,
}) {
  const A = mono || outer;
  const B = mono || inner;
  const C = mono || accent;

  if (variant === 'path') {
    // Ascending arc with 4 stepping stones, last one accented.
    return (
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="PrzyTobie">
        <path d="M 18 92 Q 60 14 102 60"
              fill="none" stroke={B} strokeWidth="3"
              strokeLinecap="round" strokeDasharray="0.1 9"
              opacity="0.45"/>
        <circle cx="22" cy="86" r="7"  fill={B} opacity="0.55"/>
        <circle cx="45" cy="48" r="9"  fill={A}/>
        <circle cx="74" cy="34" r="11" fill={A}/>
        {!noAccent && <circle cx="100" cy="58" r="13" fill={C}/>}
      </svg>
    );
  }

  if (variant === 'hands') {
    // Two cupped curves opening upward, cradling a heart.
    return (
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="PrzyTobie">
        {/* left cup */}
        <path d="M 18 52 C 18 90, 50 100, 60 92"
              fill="none" stroke={A} strokeWidth="14" strokeLinecap="round"/>
        {/* right cup */}
        <path d="M 102 52 C 102 90, 70 100, 60 92"
              fill="none" stroke={B} strokeWidth="14" strokeLinecap="round"/>
        {/* heart cradled inside */}
        {!noAccent && (
          <path d="M 60 38
                   C 53 30, 40 33, 40 46
                   C 40 58, 60 72, 60 72
                   C 60 72, 80 58, 80 46
                   C 80 33, 67 30, 60 38 Z"
                fill={C}/>
        )}
      </svg>
    );
  }

  // "embrace" — two leaning figures, heart in the negative space between.
  // Each figure is a soft teardrop body; they overlap at the base and tilt
  // toward each other, like two people in a side hug.
  const figure = "M 0 -38 C -16 -38, -20 -12, -10 18 Q 0 26 10 18 C 20 -12, 16 -38, 0 -38 Z";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="PrzyTobie">
      <g transform="translate(46 72) rotate(-14)">
        <path d={figure} fill={A}/>
      </g>
      <g transform="translate(74 72) rotate(14)">
        <path d={figure} fill={B}/>
      </g>
      {/* heart floating above the meeting point */}
      {!noAccent && (
        <path d="M 60 26
                 C 55 20, 46 22, 46 31
                 C 46 41, 60 50, 60 50
                 C 60 50, 74 41, 74 31
                 C 74 22, 65 20, 60 26 Z"
              fill={C}/>
      )}
    </svg>
  );
}

// Logotype: "Przy" in regular weight, "Tobie" in semibold, no space, single
// color block. The capitalization mirrors the way the app refers to itself —
// "Przy" + "Tobie" reads as "by you" with both words capitalised, so the
// stress falls on Tobie.
function Wordmark({ size = 56, color = PT.plum, weightDelta = 200 }) {
  return (
    <span style={{
      fontFamily: '"Manrope", system-ui, sans-serif',
      fontSize: size, lineHeight: 1, letterSpacing: '-0.025em',
      color, whiteSpace: 'nowrap',
    }}>
      <span style={{ fontWeight: 400 }}>Przy</span>
      <span style={{ fontWeight: 400 + weightDelta }}>Tobie</span>
    </span>
  );
}

function Tagline({ size = 18, color, italic = true }) {
  return (
    <span style={{
      fontFamily: '"Newsreader", "Iowan Old Style", Georgia, serif',
      fontStyle: italic ? 'italic' : 'normal',
      fontWeight: 400, fontSize: size, lineHeight: 1.25,
      letterSpacing: '-0.005em',
      color: color || PT.plumSoft,
    }}>
      Przy Tobie na każdym kroku
    </span>
  );
}

// Horizontal lockup: icon + wordmark, optional tagline below
function Lockup({
  iconSize = 88, wordSize = 64, gap = 22,
  color, palette, tagline = true, dark = false,
}) {
  const c = color || (dark ? PT.inkOnDark : PT.plum);
  const tagColor = dark ? 'rgba(251,241,230,0.72)' : 'rgba(58,42,63,0.6)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      <Mark size={iconSize} {...(palette || {})}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Wordmark size={wordSize} color={c}/>
        {tagline && (
          <div style={{ marginLeft: 1 }}>
            <Tagline size={wordSize * 0.28} color={tagColor}/>
          </div>
        )}
      </div>
    </div>
  );
}

// Stacked lockup — for app store, splash, square contexts
function StackLockup({
  iconSize = 120, wordSize = 44, color, dark = false, tagline = true,
}) {
  const c = color || (dark ? PT.inkOnDark : PT.plum);
  const tagColor = dark ? 'rgba(251,241,230,0.72)' : 'rgba(58,42,63,0.6)';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 22,
    }}>
      <Mark size={iconSize}/>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 8,
      }}>
        <Wordmark size={wordSize} color={c}/>
        {tagline && <Tagline size={wordSize * 0.36} color={tagColor}/>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App icon (rounded square, iOS 26 corner radius ≈ 22% of size)
// ─────────────────────────────────────────────────────────────
function AppIcon({
  size = 180, bg, outer, inner, accent, mono, gradient,
  label, sublabel,
}) {
  const r = size * 0.224;
  const inkOnBg = (bg === PT.night || bg === PT.plum) ? PT.cream : PT.plum;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: size, height: size, borderRadius: r,
        background: gradient || bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 14px 30px -10px rgba(58,42,63,0.22), 0 1px 0 rgba(255,255,255,0.4) inset',
        position: 'relative', overflow: 'hidden',
      }}>
        <Mark size={size * 0.66} outer={outer} inner={inner} accent={accent} mono={mono}/>
      </div>
      {label && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Manrope", system-ui', fontSize: 13, fontWeight: 600,
            color: PT.plum, letterSpacing: '-0.005em',
          }}>{label}</div>
          {sublabel && (
            <div style={{
              fontFamily: '"Manrope", system-ui', fontSize: 11, fontWeight: 400,
              color: 'rgba(58,42,63,0.55)', marginTop: 3,
            }}>{sublabel}</div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Color swatch
// ─────────────────────────────────────────────────────────────
function Swatch({ name, hex, oklch, role, ink = PT.plum }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      width: 168,
    }}>
      <div style={{
        height: 168, borderRadius: 18, background: hex,
        boxShadow: '0 1px 0 rgba(58,42,63,0.06) inset, 0 2px 12px -4px rgba(58,42,63,0.12)',
      }}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{
          fontFamily: '"Manrope", system-ui', fontSize: 14, fontWeight: 600,
          color: ink, letterSpacing: '-0.01em',
        }}>{name}</div>
        <div style={{
          fontFamily: '"Manrope", system-ui', fontSize: 11, fontWeight: 400,
          color: 'rgba(58,42,63,0.55)',
        }}>{role}</div>
        <div style={{
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 11, color: 'rgba(58,42,63,0.7)', marginTop: 4,
        }}>{hex.toUpperCase()}</div>
        <div style={{
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 10, color: 'rgba(58,42,63,0.45)',
        }}>{oklch}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Type specimen
// ─────────────────────────────────────────────────────────────
function TypeRow({ family, weight, size, label, sample, italic, lh = 1.15 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '170px 1fr',
      gap: 32, alignItems: 'baseline',
      padding: '20px 0', borderTop: '1px solid rgba(58,42,63,0.08)',
    }}>
      <div>
        <div style={{
          fontFamily: '"Manrope", system-ui', fontSize: 11, fontWeight: 600,
          color: PT.plum, textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>{label}</div>
        <div style={{
          fontFamily: '"Manrope", system-ui', fontSize: 11, color: 'rgba(58,42,63,0.55)',
          marginTop: 4,
        }}>{family} · {weight} · {size}px</div>
      </div>
      <div style={{
        fontFamily: family.includes('Newsreader') ? '"Newsreader", Georgia, serif'
                                                  : '"Manrope", system-ui, sans-serif',
        fontWeight: weight, fontSize: size, lineHeight: lh,
        fontStyle: italic ? 'italic' : 'normal',
        color: PT.plum, letterSpacing: size > 40 ? '-0.025em' : '-0.005em',
      }}>{sample}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Welcome screen (inside iOS frame)
// ─────────────────────────────────────────────────────────────
function WelcomeScreen() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `radial-gradient(120% 80% at 50% 0%, ${PT.blush} 0%, ${PT.paper} 55%, ${PT.cream} 100%)`,
      display: 'flex', flexDirection: 'column', position: 'relative',
      paddingTop: 110, paddingBottom: 36, paddingLeft: 28, paddingRight: 28,
      boxSizing: 'border-box',
    }}>
      {/* soft warm halo */}
      <div style={{
        position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
        width: 520, height: 520, borderRadius: '50%',
        background: `radial-gradient(circle, ${PT.salmon}30 0%, transparent 60%)`,
        pointerEvents: 'none',
      }}/>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 36,
                    position: 'relative', zIndex: 1 }}>
        <Mark size={140}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <Wordmark size={44} color={PT.plum}/>
          <div style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontStyle: 'italic', fontSize: 19, lineHeight: 1.4,
            color: PT.plumSoft, textAlign: 'center', maxWidth: 280,
            letterSpacing: '-0.005em',
          }}>
            Przy Tobie<br/>na każdym kroku.
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 12,
        position: 'relative', zIndex: 1,
      }}>
        <button style={{
          appearance: 'none', border: 0,
          background: PT.plum, color: PT.cream,
          height: 56, borderRadius: 28, padding: '0 28px',
          fontFamily: '"Manrope", system-ui', fontSize: 17, fontWeight: 600,
          letterSpacing: '-0.01em', cursor: 'pointer',
          boxShadow: '0 10px 22px -8px rgba(58,42,63,0.4)',
        }}>Zacznij ze mną</button>
        <button style={{
          appearance: 'none', border: 0, background: 'transparent',
          color: PT.plum, height: 48, borderRadius: 24,
          fontFamily: '"Manrope", system-ui', fontSize: 15, fontWeight: 500,
          cursor: 'pointer', opacity: 0.7,
        }}>Mam już konto</button>
        <div style={{
          fontFamily: '"Manrope", system-ui', fontSize: 12, fontWeight: 400,
          color: 'rgba(58,42,63,0.45)', textAlign: 'center', marginTop: 4,
          letterSpacing: '0.005em',
        }}>
          Twoja prywatność jest chroniona. Zawsze.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Onboarding-next screen (second mock to show identity in product)
// ─────────────────────────────────────────────────────────────
function PathScreen() {
  const steps = [
    { t: 'Pierwsze badanie',   d: 'Zrozum, co Cię czeka.',           done: true },
    { t: 'Diagnostyka',        d: 'Wyniki, badania i profile.',      done: true },
    { t: 'Konsylium',          d: 'Wielodyscyplinarny zespół ustali plan.', active: true },
    { t: 'Leczenie',           d: 'Indywidualna ścieżka terapeutyczna.' },
    { t: 'Wsparcie',           d: 'Opieka w trakcie i po leczeniu.' },
    { t: 'Rehabilitacja',      d: 'Powrót do siebie, w swoim tempie.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%', background: PT.cream,
      display: 'flex', flexDirection: 'column',
      padding: '100px 24px 28px', boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <Mark size={36}/>
        <div style={{ fontFamily: '"Manrope", system-ui', fontWeight: 600, fontSize: 18, color: PT.plum }}>
          PrzyTobie
        </div>
      </div>
      <div style={{
        fontFamily: '"Newsreader", Georgia, serif', fontStyle: 'italic',
        fontSize: 26, lineHeight: 1.25, color: PT.plum, marginTop: 18,
        letterSpacing: '-0.01em',
      }}>
        Dzień dobry, Anno.<br/>
        <span style={{ color: PT.plumSoft }}>Oto Twoja ścieżka.</span>
      </div>

      <div style={{
        marginTop: 28, flex: 1,
        display: 'flex', flexDirection: 'column', gap: 0,
        position: 'relative',
      }}>
        {/* vertical guide line */}
        <div style={{
          position: 'absolute', left: 15, top: 14, bottom: 14,
          width: 2, background: `linear-gradient(${PT.blushDeep}, ${PT.lilac} 40%, ${PT.cream})`,
          borderRadius: 1,
        }}/>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
            padding: '12px 0', position: 'relative',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 16, flexShrink: 0,
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
                fontFamily: '"Manrope", system-ui', fontWeight: s.active ? 600 : 500,
                fontSize: 16, color: s.done || s.active ? PT.plum : PT.plumSoft,
                letterSpacing: '-0.005em',
              }}>{s.t}</div>
              <div style={{
                fontFamily: '"Manrope", system-ui', fontSize: 13, fontWeight: 400,
                color: 'rgba(58,42,63,0.55)', marginTop: 2,
              }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  PT, Mark, Wordmark, Tagline, Lockup, StackLockup, AppIcon, Swatch, TypeRow,
  WelcomeScreen, PathScreen,
});
