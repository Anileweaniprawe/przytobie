'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { PT } from '@/lib/theme';

const DynamicMap = dynamic(() => import('./Map'), { ssr: false });

// ─── Icons ────────────────────────────────────────────────────
function Icon({ name, size = 20, color, sw = 1.8, fill = 'none' }) {
  const d = {
    arrowLeft: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
    check:     <polyline points="20 6 9 17 4 12"/>,
    phone:     <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 016 17a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>,
    document:  <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></>,
    upload:    <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
    chat:      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
    send:      <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    heart:     <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    leaf:      <path d="M17 8C8 10 5.9 16.17 3.82 22.8L5.71 23l1-2.3A4.49 4.49 0 008 21C19 21 22 3 22 3c-1 2-8 3-9 8-2 0-4.5 1-6 3.5.5-2 4-5 6-5z"/>,
    link:      <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
    calendar:  <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    chevron:   <polyline points="9 18 15 12 9 6"/>,
    plus:      <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    alert:     <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    chart:     <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    users:     <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    sparkle:   <><path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z"/></>,
    textfile:     <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    mapPin:       <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    externalLink: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    search:       <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    star:         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
         stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {d[name] ?? null}
    </svg>
  );
}

// ─── Shared layout pieces ─────────────────────────────────────
function ScreenHeader({ title, onBack }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      paddingTop: 'max(env(safe-area-inset-top, 0px), 52px)',
      paddingBottom: 8,
      paddingLeft: 10, paddingRight: 20,
    }}>
      <button onClick={onBack} style={{
        width: 44, height: 44, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        appearance: 'none', border: 0, background: 'transparent', cursor: 'pointer',
      }}>
        <Icon name="arrowLeft" size={20} color={PT.plum}/>
      </button>
      <span style={{
        fontFamily: 'var(--font-manrope), system-ui',
        fontWeight: 700, fontSize: 17,
        color: PT.plum, letterSpacing: '-0.02em',
      }}>{title}</span>
    </div>
  );
}

function Wrap({ title, onBack, children, noPad }) {
  return (
    <div className="page-bg screen-enter" style={{
      width: '100%', minHeight: '100dvh',
      paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 32px)',
    }}>
      <ScreenHeader title={title} onBack={onBack}/>
      <div style={noPad ? {} : { paddingLeft: 20, paddingRight: 20 }}>
        {children}
      </div>
    </div>
  );
}

function Card({ children, style, ...props }) {
  return (
    <div 
      style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 1px 8px rgba(58,42,63,0.07)',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-manrope), system-ui',
      fontSize: 11, fontWeight: 600,
      letterSpacing: '0.07em', textTransform: 'uppercase',
      color: 'rgba(58,42,63,0.4)',
      marginBottom: 10, marginTop: 20,
    }}>{children}</div>
  );
}

// ─── 1. FindClinic ────────────────────────────────────────────
const CLINICS = [
  {
    name: 'Wojewódzkie Wielospecjalistyczne Centrum Onkologii i Traumatologii im. M. Kopernika',
    city: 'ul. Pabianicka 62, Łódź', dist: '1.2 km', phone: '+48 42 689 52 00',
    lat: 51.7245, lng: 19.4447,
    rating: 4.0, reviews: 603,
    bcu: true
  },
  {
    name: 'Instytut Centrum Zdrowia Matki Polki',
    city: 'ul. Rzgowska 281/289, Łódź', dist: '4.5 km', phone: '+48 42 271 20 00',
    lat: 51.7061, lng: 19.4831,
    rating: 4.2, reviews: 58,
    bcu: true
  },
  {
    name: 'Salve Medica',
    city: 'ul. Szparagowa 10, Łódź', dist: '8.1 km', phone: '+48 42 254 64 00',
    lat: 51.8020, lng: 19.3900,
    rating: 4.6, reviews: 47,
    bcu: false
  },
  {
    name: 'Szpital MSWiA',
    city: 'ul. Północna 42, Łódź', dist: '3.4 km', phone: '+48 42 634 11 00',
    lat: 51.7785, lng: 19.4673,
    rating: 4.5, reviews: 19,
    bcu: false
  },
  {
    name: 'Uniwersytecki Szpital Kliniczny nr 2 Uniwersytetu Medycznego w Łodzi',
    city: 'ul. Stefana Żeromskiego 113, Łódź', dist: '2.1 km', phone: '+48 42 639 34 00',
    lat: 51.7589, lng: 19.4475,
    rating: 3.9, reviews: 10,
    bcu: false
  },
  {
    name: 'Centralny Szpital Kliniczny Uniwersytetu Medycznego w Łodzi',
    city: 'ul. Pomorska 251, Łódź', dist: '7.4 km', phone: '+48 42 675 72 98',
    lat: 51.7788, lng: 19.5113,
    rating: 3.9, reviews: 5,
    bcu: false
  }
];

export function FindClinic({ onBack }) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState('list'); // 'list' | 'map'

  const filteredClinics = CLINICS.filter(c => {
    const q = query.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
  });

  return (
    <Wrap title="Znajdź placówkę" onBack={onBack} noPad={view === 'map'}>
      {view === 'list' && (
        <>
          {/* Wyszukiwarka */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#fff', borderRadius: 20,
            padding: '0 16px', height: 44,
            border: '1.5px solid rgba(58,42,63,0.12)',
            marginBottom: 8,
          }}>
            <Icon name="search" size={18} color="rgba(58,42,63,0.4)"/>
            <input
              type="text"
              placeholder="Szukaj po mieście lub nazwie..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                flex: 1, border: 'none', background: 'transparent',
                outline: 'none', fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 14, color: PT.plum,
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
            <SectionLabel>{query ? 'Wyniki wyszukiwania' : 'W pobliżu'}</SectionLabel>
            <button 
              onClick={() => setView('map')}
              style={{
                appearance: 'none', background: 'transparent', border: 0,
                color: PT.salmon, fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
                padding: 0, marginBottom: 10
              }}>
              <Icon name="mapPin" size={14} color={PT.salmon}/> Pokaż na mapie
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredClinics.length > 0 ? filteredClinics.map((c, i) => (
              <Card key={i} style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                  <span style={{
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontWeight: 600, fontSize: 14, color: PT.plum,
                    lineHeight: 1.35, flex: 1,
                  }}>
                    {c.name}

                  </span>
                  <span style={{
                    flexShrink: 0,
                    background: PT.blush, color: PT.plum,
                    borderRadius: 999, padding: '3px 10px',
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 11, fontWeight: 600,
                  }}>{c.dist}</span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 12, color: 'rgba(58,42,63,0.45)', marginBottom: 8,
                }}>{c.city}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
                  <Icon name="star" size={14} color="#F5B800" fill="#F5B800"/>
                  <span style={{ fontFamily: 'var(--font-manrope), system-ui', fontSize: 13, fontWeight: 700, color: PT.plum }}>{c.rating}</span>
                  <span style={{ fontFamily: 'var(--font-manrope), system-ui', fontSize: 12, color: 'rgba(58,42,63,0.4)' }}>({c.reviews} ocen)</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`tel:${c.phone}`} style={{
                    appearance: 'none', textDecoration: 'none',
                    border: `1.5px solid ${PT.plum}`,
                    background: 'transparent', color: PT.plum,
                    height: 36, borderRadius: 18,
                    paddingLeft: 16, paddingRight: 16,
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    <Icon name="phone" size={13} color={PT.plum}/>
                    Zadzwoń
                  </a>
                  <button 
                    onClick={() => setView('map')}
                    style={{
                      appearance: 'none',
                      border: `1.5px solid rgba(58,42,63,0.12)`,
                      background: 'transparent', color: PT.plumSoft,
                      height: 36, borderRadius: 18,
                      paddingLeft: 16, paddingRight: 16,
                      fontFamily: 'var(--font-manrope), system-ui',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}>
                    <Icon name="mapPin" size={13} color={PT.plumSoft}/>
                    Mapa
                  </button>
                </div>
              </Card>
            )) : (
              <div style={{
                textAlign: 'center', padding: '30px 20px',
                fontFamily: 'var(--font-manrope), system-ui',
                color: 'rgba(58,42,63,0.4)', fontSize: 14,
              }}>
                Brak wyników dla "{query}"
              </div>
            )}
          </div>
        </>
      )}

      {view === 'map' && (
        <div style={{ position: 'relative', height: 'calc(100vh - 120px)', marginTop: '-8px' }}>
          <DynamicMap clinics={CLINICS} />
          
          <button 
            onClick={() => setView('list')}
            style={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              appearance: 'none', border: 0,
              background: PT.plum, color: PT.cream,
              borderRadius: 26, height: 48,
              paddingLeft: 24, paddingRight: 24,
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(58,42,63,0.4)',
            }}>
            <Icon name="arrowLeft" size={16} color={PT.cream}/>
            Powrót do listy
          </button>
        </div>
      )}
    </Wrap>
  );
}

// ─── 2. Checklist ─────────────────────────────────────────────
const CHECKLIST_ITEMS = {
  badanie: [
    'Skierowanie od lekarza pierwszego kontaktu',
    'Dowód osobisty lub paszport',
    'Poprzednie wyniki badań mammograficznych lub USG',
    'Karta ubezpieczenia zdrowotnego (NFZ)',
    'Luźna, wygodna bluzka lub top',
  ],
  konsylium: [
    'Wyniki biopsji (oryginał lub kopia)',
    'Wyniki badań obrazowych — TK, MRI, USG',
    'Lista przyjmowanych leków',
    'Skierowanie na konsylium wielodyscyplinarne',
    'Dowód osobisty',
    'Notatnik z pytaniami do lekarza',
  ],
};

export function Checklist({ type, onBack }) {
  const items = CHECKLIST_ITEMS[type] ?? CHECKLIST_ITEMS.badanie;
  const title = type === 'konsylium' ? 'Co zabrać na konsylium' : 'Co zabrać na badanie';
  const [checked, setChecked] = useState({});

  function toggle(i) {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  }

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <Wrap title={title} onBack={onBack}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
      }}>
        <div style={{
          height: 4, flex: 1, borderRadius: 2,
          background: 'rgba(58,42,63,0.1)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${(doneCount / items.length) * 100}%`,
            background: PT.salmon,
            borderRadius: 2,
            transition: 'width 0.3s',
          }}/>
        </div>
        <span style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 12, color: 'rgba(58,42,63,0.45)',
          whiteSpace: 'nowrap',
        }}>{doneCount} / {items.length}</span>
      </div>

      <SectionLabel>Lista rzeczy</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            style={{
              appearance: 'none', cursor: 'pointer', textAlign: 'left',
              background: checked[i] ? `${PT.lilac}20` : '#fff',
              border: checked[i] ? `1.5px solid ${PT.lilacDeep}` : '1.5px solid transparent',
              borderRadius: 16,
              padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: checked[i] ? 'none' : '0 1px 6px rgba(58,42,63,0.07)',
              transition: 'all 0.18s',
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 11, flexShrink: 0,
              background: checked[i] ? PT.lilacDeep : 'transparent',
              border: checked[i] ? 'none' : `1.5px solid rgba(58,42,63,0.2)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.18s',
            }}>
              {checked[i] && <Icon name="check" size={12} color="#fff" sw={2.5}/>}
            </div>
            <span style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 14, fontWeight: 500,
              color: checked[i] ? 'rgba(58,42,63,0.45)' : PT.plum,
              textDecoration: checked[i] ? 'line-through' : 'none',
              lineHeight: 1.4,
              transition: 'color 0.18s',
            }}>{item}</span>
          </button>
        ))}
      </div>
    </Wrap>
  );
}

// ─── 3. ChatScreen ────────────────────────────────────────────
const CHAT_REPLIES = [
  { from: 'u', text: 'Mam pytanie o konsylium wielodyscyplinarne' },
  { from: 'a', text: 'Oczywiście. Konsylium to spotkanie specjalistów — onkologa, chirurga, radiologa i patologa — którzy wspólnie ustalają najlepszy plan leczenia. Zazwyczaj trwa 30–60 minut i możesz zadawać pytania oraz wyrażać swoje oczekiwania.' },
];

const CHIPS = ['Jak się przygotować?', 'Co zabrać?', 'Kiedy dostanę wyniki?'];

const CHIP_REPLIES = {
  'Jak się przygotować?': 'Wyśpij się dzień wcześniej, zjedz lekki posiłek i przygotuj listę pytań. Możesz zabrać bliską osobę — pomoże zapamiętać informacje.',
  'Co zabrać?':           'Zabierz wyniki biopsji i badań obrazowych, skierowanie, dowód osobisty oraz listę przyjmowanych leków.',
  'Kiedy dostanę wyniki?': 'Zazwyczaj koordynatorka BCU kontaktuje się w ciągu 2–3 dni roboczych po konsylium z ustalonym planem leczenia.',
};

export function ChatScreen({ onBack, initialMessage }) {
  const [messages, setMessages] = useState(() => {
    const name = typeof window !== 'undefined' ? (localStorage.getItem('userName') || 'Agnieszko') : 'Agnieszko';
    
    // We start with a base greeting
    const baseMsgs = [
      { from: 'a', text: `Cześć ${name}, jestem Twoją asystentką BCU. W czym mogę Ci dziś pomóc?` },
    ];

    // If there is an initial message requested from outside (e.g. from the Dashboard CTA)
    if (initialMessage) {
      baseMsgs.push({ from: 'u', text: initialMessage });
      // Provide a standard response for this topic
      baseMsgs.push({ from: 'a', text: CHIP_REPLIES[initialMessage] ?? 'Konsylium to spotkanie specjalistów — onkologa, chirurga, radiologa i patologa — którzy wspólnie ustalają najlepszy plan leczenia. Zazwyczaj trwa 30–60 minut i możesz zadawać pytania oraz wyrażać swoje oczekiwania.' });
    } else {
      // If no initialMessage, just load the default chat history mockup
      baseMsgs.push(...CHAT_REPLIES);
    }
    
    return baseMsgs;
  });
  const [input, setInput] = useState('');
  const [chipsUsed, setChipsUsed] = useState(!!initialMessage);

  function send(text) {
    if (!text.trim()) return;
    setMessages(m => [
      ...m,
      { from: 'u', text },
      { from: 'a', text: CHIP_REPLIES[text] ?? 'Dziękuję za pytanie. Koordynatorka BCU skontaktuje się z Tobą wkrótce.' },
    ]);
    setChipsUsed(true);
    setInput('');
  }

  return (
    <div className="page-bg screen-enter" style={{
      width: '100%', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
    }}>
      <ScreenHeader title="Asystentka BCU" onBack={onBack}/>

      {/* messages */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '8px 20px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: m.from === 'u' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '82%',
              background: m.from === 'u' ? PT.plum : '#fff',
              color: m.from === 'u' ? PT.cream : PT.plum,
              borderRadius: m.from === 'u' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '11px 15px',
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 14, lineHeight: 1.55,
              boxShadow: '0 1px 4px rgba(58,42,63,0.08)',
            }}>{m.text}</div>
          </div>
        ))}

        {!chipsUsed && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {CHIPS.map(chip => (
              <button key={chip} onClick={() => send(chip)} style={{
                appearance: 'none',
                border: '1.5px solid rgba(58,42,63,0.14)',
                background: '#fff', color: PT.plum,
                borderRadius: 999, height: 34,
                paddingLeft: 14, paddingRight: 14,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}>{chip}</button>
            ))}
          </div>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--font-manrope), system-ui',
        fontSize: 11, color: 'rgba(58,42,63,0.35)',
        textAlign: 'center', padding: '6px 20px',
      }}>
        Asystentka nie zastępuje konsultacji medycznej
      </div>

      {/* input */}
      <div style={{
        padding: '8px 20px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 20px)',
        display: 'flex', gap: 10,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Napisz wiadomość..."
          style={{
            flex: 1, height: 44, borderRadius: 22,
            border: '1.5px solid rgba(58,42,63,0.12)',
            background: '#fff',
            padding: '0 16px',
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 14, color: PT.plum, outline: 'none',
          }}
        />
        <button
          onClick={() => send(input)}
          style={{
            width: 44, height: 44, borderRadius: 22, flexShrink: 0,
            appearance: 'none', border: 0,
            background: input.trim() ? PT.plum : 'rgba(58,42,63,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'default',
            transition: 'background 0.2s',
          }}
        >
          <Icon name="send" size={16} color={input.trim() ? PT.cream : 'rgba(58,42,63,0.3)'}/>
        </button>
      </div>
    </div>
  );
}

// ─── 4. DocumentsScreen ───────────────────────────────────────
const DOCUMENTS = [
  { name: 'Skierowanie na mammografię', date: '12 mar 2025', type: 'Skierowanie', color: PT.blush },
  { name: 'Wynik biopsji gruboigłowej', date: '28 mar 2025', type: 'Wynik badania', color: PT.lilac },
  { name: 'Karta ubezpieczenia NFZ',    date: 'aktywna',     type: 'Ubezpieczenie', color: '#C5DEC0' },
];

export function DocumentsScreen({ onBack }) {
  return (
    <Wrap title="Moje dokumenty" onBack={onBack}>
      <SectionLabel>Zapisane dokumenty</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DOCUMENTS.map((doc, i) => (
          <Card key={i} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: doc.color + '50',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="textfile" size={18} color={PT.plum}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontWeight: 600, fontSize: 14, color: PT.plum,
                marginBottom: 2, letterSpacing: '-0.01em',
              }}>{doc.name}</div>
              <div style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 11, color: 'rgba(58,42,63,0.45)',
              }}>{doc.date}</div>
            </div>
            <span style={{
              flexShrink: 0,
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 11, fontWeight: 600,
              background: 'rgba(58,42,63,0.06)',
              color: PT.plumSoft,
              borderRadius: 999, padding: '3px 10px',
            }}>{doc.type}</span>
          </Card>
        ))}
      </div>

      <button style={{
        width: '100%', marginTop: 20,
        appearance: 'none',
        border: `1.5px dashed rgba(58,42,63,0.2)`,
        background: 'transparent',
        borderRadius: 18, height: 52,
        fontFamily: 'var(--font-manrope), system-ui',
        fontSize: 14, fontWeight: 600,
        color: PT.plumSoft, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <Icon name="upload" size={16} color={PT.plumSoft}/>
        Dodaj dokument
      </button>
    </Wrap>
  );
}

// ─── 5. BookVisit ─────────────────────────────────────────────
const VISITS = [
  {
    name:    'Konsylium wielodyscyplinarne',
    date:    'śr. 14 maja 2025',
    time:    '10:30',
    doctor:  'dr M. Kowalska',
    place:   'Centrum Onkologii, Warszawa',
    accent:  PT.lilac,
  },
  {
    name:    'Wizyta kontrolna — onkolog',
    date:    'pon. 19 maja 2025',
    time:    '14:00',
    doctor:  'dr A. Wiśniewska',
    place:   'Poliklinika BCU',
    accent:  PT.blush,
  },
];

export function BookVisit({ onBack }) {
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return <AddVisitWizard onBack={() => setShowWizard(false)} onComplete={() => setShowWizard(false)} />;
  }

  return (
    <Wrap title="Wizyty" onBack={onBack}>
      <SectionLabel>Nadchodzące</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {VISITS.map((v, i) => (
          <Card key={i} style={{ overflow: 'visible' }}>
            <div style={{ display: 'flex' }}>
              <div style={{
                width: 6, flexShrink: 0,
                background: v.accent,
                borderRadius: '20px 0 0 20px',
              }}/>
              <div style={{ padding: '16px 16px 16px 14px', flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontWeight: 700, fontSize: 15, color: PT.plum,
                  marginBottom: 6, letterSpacing: '-0.01em',
                }}>{v.name}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {[
                    { icon: 'calendar', text: `${v.date} · ${v.time}` },
                    { icon: 'users',    text: v.doctor },
                    { icon: 'link',     text: v.place },
                  ].map((row, j) => (
                    <div key={j} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <Icon name={row.icon} size={13} color="rgba(58,42,63,0.4)"/>
                      <span style={{
                        fontFamily: 'var(--font-manrope), system-ui',
                        fontSize: 12, color: 'rgba(58,42,63,0.55)',
                      }}>{row.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <button 
        onClick={() => setShowWizard(true)}
        style={{
        width: '100%', marginTop: 20,
        appearance: 'none', border: 0,
        background: PT.plum, color: PT.cream,
        borderRadius: 26, height: 52,
        fontFamily: 'var(--font-manrope), system-ui',
        fontSize: 15, fontWeight: 600, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: '0 8px 20px -6px rgba(58,42,63,0.35)',
      }}>
        <Icon name="plus" size={17} color={PT.cream}/>
        Dodaj wizytę
      </button>
    </Wrap>
  );
}

// ─── 6. AddVisitWizard ────────────────────────────────────────
const WIZARD_DOCTORS = [
  { id: 'd1', name: 'dr M. Kowalska', spec: 'Onkolog', place: 'Centrum Onkologii', color: PT.lilac, lat: 51.7245, lng: 19.4447, rating: 4.8, reviews: 124, price: 250 },
  { id: 'd2', name: 'dr A. Wiśniewska', spec: 'Chirurg', place: 'Poliklinika BCU', color: PT.blush, lat: 51.7589, lng: 19.4475, rating: 4.9, reviews: 310, price: 300 },
  { id: 'd3', name: 'dr J. Nowak', spec: 'Radiolog', place: 'Szpital Wojewódzki', color: PT.salmon, lat: 51.7785, lng: 19.4673, rating: 4.5, reviews: 85, price: 200 },
  { id: 'd4', name: 'dr K. Zieliński', spec: 'Radioterapeuta', place: 'Centrum Onkologii', color: PT.creamDeep, lat: 51.7245, lng: 19.4447, rating: 4.7, reviews: 156, price: 280 },
  { id: 'd5', name: 'dr M. Mazur', spec: 'Chirurg onkolog', place: 'Salve Medica', color: PT.lilacDeep, lat: 51.8020, lng: 19.3900, rating: 5.0, reviews: 420, price: 350 },
  { id: 'd6', name: 'dr E. Wójcik', spec: 'Onkolog kliniczny', place: 'Instytut CZMP', color: PT.blushDeep, lat: 51.7061, lng: 19.4831, rating: 4.6, reviews: 92, price: 220 }
];

export function AddVisitWizard({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ doctor: null, date: null, time: null });
  const [isSuccess, setIsSuccess] = useState(false);
  const [viewStep1, setViewStep1] = useState('list'); // 'list' | 'map'

  const MOCK_DATES = ['14 maja', '15 maja', '16 maja', '17 maja', '18 maja'];
  const MOCK_TIMES = ['09:00', '10:30', '12:15', '14:00', '15:30'];
  const [activeDate, setActiveDate] = useState(MOCK_DATES[0]);

  const handleSelectDoctor = (doc) => {
    setFormData({ ...formData, doctor: doc });
    setStep(2);
    setViewStep1('list'); // reset for next time
  };

  const handleSelectTime = (time) => {
    setFormData({ ...formData, date: activeDate, time: time });
    setStep(3);
  };

  const handleConfirm = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onComplete && onComplete(formData);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <Wrap title="Dodaj wizytę" onBack={onBack}>
        <div style={{ textAlign: 'center', marginTop: 60, animation: 'fadeUp 0.4s ease' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#EAF2E7', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4E7E4C' }}>
            <Icon name="check" size={40} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-newsreader), serif', fontStyle: 'italic', color: PT.plum, fontSize: 28, marginBottom: 12 }}>Wizyta zaplanowana</h2>
          <p style={{ color: 'rgba(58,42,63,0.7)', lineHeight: 1.5 }}>
            {formData.date} o {formData.time}<br/>
            {formData.doctor?.name}
          </p>
          <button onClick={onBack} style={{ marginTop: 40, background: PT.plum, color: PT.cream, border: 'none', padding: '16px 32px', borderRadius: 30, fontWeight: 600, width: '100%', cursor: 'pointer' }}>
            Wróć do wizyt
          </button>
        </div>
      </Wrap>
    );
  }

  return (
    <Wrap title="Dodaj wizytę" onBack={step === 1 ? onBack : () => setStep(step - 1)} noPad={step === 1 && viewStep1 === 'map'}>
      {step === 1 && (
        <>
          {viewStep1 === 'list' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <SectionLabel>Wybierz specjalistę</SectionLabel>
                <button 
                  onClick={() => setViewStep1('map')}
                  style={{
                    appearance: 'none', background: 'transparent', border: 0,
                    color: PT.salmon, fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: 0, marginBottom: 10
                  }}>
                  <Icon name="mapPin" size={14} color={PT.salmon}/> Szukaj na mapie
                </button>
              </div>
              {WIZARD_DOCTORS.map(doc => (
                <Card key={doc.id} style={{ cursor: 'pointer' }} onClick={() => handleSelectDoctor(doc)}>
                  <div style={{ display: 'flex', padding: 16, alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: doc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="users" size={24} color={PT.plum} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ fontWeight: 700, color: PT.plum, fontSize: 15 }}>{doc.name}</div>
                        <div style={{ fontWeight: 700, color: PT.plum, fontSize: 15 }}>{doc.price} zł</div>
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(58,42,63,0.6)', marginBottom: 4 }}>{doc.spec} • {doc.place}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon name="star" size={12} color="#F5B800" fill="#F5B800"/>
                        <span style={{ fontSize: 12, fontWeight: 700, color: PT.plum }}>{doc.rating}</span>
                        <span style={{ fontSize: 12, color: 'rgba(58,42,63,0.4)' }}>({doc.reviews} opinii)</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div style={{ position: 'relative', height: 'calc(100vh - 120px)', marginTop: '-8px' }}>
              <DynamicMap 
                clinics={WIZARD_DOCTORS.map(d => ({ ...d, city: d.place, dist: 'Wybierz' }))} 
                userLocation={[51.7592, 19.4560]}
              />
              <div style={{ 
                position: 'absolute', bottom: 32, left: 20, right: 20, zIndex: 10,
                display: 'flex', justifyContent: 'center'
              }}>
                <button 
                  onClick={() => setViewStep1('list')}
                  style={{
                    appearance: 'none', border: 0,
                    background: PT.plum, color: PT.cream,
                    borderRadius: 26, height: 48,
                    paddingLeft: 24, paddingRight: 24,
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 8px 24px rgba(58,42,63,0.4)',
                  }}>
                  <Icon name="arrowLeft" size={16} color={PT.cream}/>
                  Powrót do listy
                </button>
              </div>
              
              {/* Overlay info for map selection */}
              <div style={{
                position: 'absolute', top: 20, left: 20, right: 20, zIndex: 10,
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
                padding: '12px 16px', borderRadius: 16, border: '1px solid rgba(58,42,63,0.1)',
                textAlign: 'center', pointerEvents: 'none'
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: PT.plum }}>Wybierz lekarza na mapie</div>
                <div style={{ fontSize: 11, color: 'rgba(58,42,63,0.6)' }}>Kliknij w pineskę, aby zobaczyć szczegóły</div>
              </div>
            </div>
          )}
        </>
      )}
      {step === 2 && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(58,42,63,0.6)' }}>Wybrany specjalista</div>
              <div style={{ fontWeight: 700, color: PT.plum }}>{formData.doctor?.name}</div>
            </div>
            <button onClick={() => setStep(1)} style={{ background: 'transparent', border: '1px solid rgba(58,42,63,0.1)', borderRadius: 16, padding: '4px 12px', fontSize: 12, color: PT.plum, cursor: 'pointer' }}>Zmień</button>
          </div>

          <SectionLabel>Wybierz dzień</SectionLabel>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, margin: '0 -24px', padding: '0 24px 12px 24px', WebkitOverflowScrolling: 'touch' }}>
            {MOCK_DATES.map(d => (
              <button key={d} onClick={() => setActiveDate(d)} style={{
                flexShrink: 0, padding: '12px 20px', borderRadius: 16, border: 'none',
                background: activeDate === d ? PT.plum : 'rgba(255,255,255,0.5)',
                color: activeDate === d ? PT.cream : PT.plum,
                fontWeight: 600, cursor: 'pointer',
                boxShadow: activeDate === d ? '0 4px 12px rgba(58,42,63,0.2)' : 'none'
              }}>
                {d}
              </button>
            ))}
          </div>

          <SectionLabel style={{ marginTop: 12 }}>Wybierz godzinę</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {MOCK_TIMES.map(t => (
              <button key={t} onClick={() => handleSelectTime(t)} style={{
                background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(58,42,63,0.05)',
                padding: 16, borderRadius: 16, color: PT.plum, fontWeight: 700,
                cursor: 'pointer', backdropFilter: 'blur(10px)'
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 3 && (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          <SectionLabel>Podsumowanie</SectionLabel>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: 'rgba(58,42,63,0.6)', marginBottom: 4 }}>Kiedy</div>
                <div style={{ fontWeight: 700, color: PT.plum, fontSize: 16 }}>{formData.date}, godz. {formData.time}</div>
              </div>
              <div style={{ height: 1, background: 'rgba(58,42,63,0.05)', margin: '0 -20px 16px -20px' }} />
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: 'rgba(58,42,63,0.6)', marginBottom: 4 }}>Z kim i gdzie</div>
                <div style={{ fontWeight: 700, color: PT.plum }}>{formData.doctor?.name}</div>
                <div style={{ fontSize: 14, color: 'rgba(58,42,63,0.8)' }}>{formData.doctor?.place}</div>
              </div>

              {/* Map Preview */}
              <div style={{ 
                height: 120, borderRadius: 16, overflow: 'hidden', 
                position: 'relative', border: '1px solid rgba(58,42,63,0.05)' 
              }}>
                <DynamicMap 
                  clinics={CLINICS.filter(c => c.name.includes(formData.doctor?.place) || formData.doctor?.place.includes(c.name))} 
                  userLocation={
                    CLINICS.find(c => c.name.includes(formData.doctor?.place) || formData.doctor?.place.includes(c.name))
                    ? [
                        CLINICS.find(c => c.name.includes(formData.doctor?.place) || formData.doctor?.place.includes(c.name)).lat,
                        CLINICS.find(c => c.name.includes(formData.doctor?.place) || formData.doctor?.place.includes(c.name)).lng
                      ]
                    : [51.7592, 19.4560]
                  }
                />
              </div>
            </div>
          </Card>
          
          <button onClick={handleConfirm} style={{
            width: '100%', marginTop: 32, border: 0, background: PT.plum, color: PT.cream,
            borderRadius: 26, height: 56, fontSize: 16, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 8px 20px -6px rgba(58,42,63,0.35)'
          }}>
            Potwierdź wizytę
          </button>
        </div>
      )}
    </Wrap>
  );
}

// ─── 7. ReportSymptom ─────────────────────────────────────────
const SEVERITIES = [
  { level: 1, label: 'Łagodny',      desc: 'Ledwo odczuwalny',                bg: '#EAF2E7', border: '#A8C5A0', text: '#4E7E4C' },
  { level: 2, label: 'Umiarkowany',  desc: 'Wyraźny, ale tolerowany',          bg: '#FFF8E8', border: '#D4B870', text: '#8A6E30' },
  { level: 3, label: 'Silny',        desc: 'Utrudnia codzienne czynności',     bg: '#FFF0E8', border: '#E8946A', text: '#9A5030' },
  { level: 4, label: 'Bardzo silny', desc: 'Wymaga pilnej konsultacji',         bg: '#FFF0F0', border: '#E88080', text: '#9A3030' },
];

export function ReportSymptom({ onBack }) {
  const [severity, setSeverity] = useState(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Wrap title="Zgłoś objaw" onBack={onBack}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '60vh', gap: 20, textAlign: 'center',
        }}>
          <div style={{
            width: 68, height: 68, borderRadius: 34,
            background: '#EAF2E7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="check" size={30} color="#4E7E4C" sw={2.5}/>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontStyle: 'italic',
              fontSize: 22, lineHeight: 1.3,
              color: PT.plum, marginBottom: 10,
            }}>
              Koordynatorka BCU<br/>zostanie powiadomiona
            </p>
            <p style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 14, color: PT.plumSoft,
            }}>
              Odezwiemy się do Ciebie wkrótce.
            </p>
          </div>
        </div>
      </Wrap>
    );
  }

  return (
    <Wrap title="Zgłoś objaw" onBack={onBack}>
      <SectionLabel>Nasilenie</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SEVERITIES.map(s => (
          <button
            key={s.level}
            onClick={() => setSeverity(s.level)}
            style={{
              appearance: 'none', cursor: 'pointer', textAlign: 'left',
              background: severity === s.level ? s.bg : '#fff',
              border: `1.5px solid ${severity === s.level ? s.border : 'rgba(58,42,63,0.1)'}`,
              borderRadius: 16, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              transition: 'all 0.18s',
              boxShadow: severity === s.level ? 'none' : '0 1px 6px rgba(58,42,63,0.06)',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 16, flexShrink: 0,
              background: severity === s.level ? s.border : 'rgba(58,42,63,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-manrope), system-ui',
              fontWeight: 700, fontSize: 14,
              color: severity === s.level ? '#fff' : 'rgba(58,42,63,0.4)',
              transition: 'all 0.18s',
            }}>{s.level}</div>
            <div>
              <div style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontWeight: 600, fontSize: 14,
                color: severity === s.level ? s.text : PT.plum,
              }}>{s.label}</div>
              <div style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 12, color: 'rgba(58,42,63,0.45)', marginTop: 1,
              }}>{s.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <SectionLabel>Opis objawów</SectionLabel>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Opisz dokładnie, co czujesz..."
        rows={4}
        style={{
          width: '100%', borderRadius: 16,
          border: '1.5px solid rgba(58,42,63,0.12)',
          background: '#fff', padding: '14px 16px',
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 14, color: PT.plum, lineHeight: 1.5,
          resize: 'none', outline: 'none',
        }}
      />

      <button
        disabled={!severity}
        onClick={() => setSubmitted(true)}
        style={{
          width: '100%', marginTop: 20,
          appearance: 'none', border: 0,
          background: severity ? '#4AAAC6' : 'rgba(58,42,63,0.1)',
          color: severity ? '#fff' : 'rgba(58,42,63,0.3)',
          borderRadius: 26, height: 52,
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 15, fontWeight: 600,
          cursor: severity ? 'pointer' : 'default',
          transition: 'all 0.2s',
          boxShadow: severity ? '0 8px 20px -6px rgba(201,110,122,0.45)' : 'none',
        }}
      >
        Wyślij do koordynatorki
      </button>
    </Wrap>
  );
}

// ─── 7. MyResults ─────────────────────────────────────────────
const RESULTS = [
  {
    name:   'Morfologia krwi',
    date:   '10 kwi 2025',
    status: 'Nowy',
    detail: 'Hemoglobina 11.2 g/dl (norma: 12–16). Leukocyty 3.8 tys/µl (norma: 4–10). Płytki krwi 187 tys/µl. Wynik do omówienia z lekarzem.',
  },
  {
    name:   'TK klatki piersiowej',
    date:   '28 mar 2025',
    status: 'Przeczytany',
    detail: 'Brak cech rozsiewu w obrębie klatki piersiowej i jamy brzusznej. Węzły chłonne pachowe do 8 mm po stronie lewej.',
  },
  {
    name:   'Wynik biopsji gruboigłowej',
    date:   '15 mar 2025',
    status: 'Przeczytany',
    detail: 'Inwazyjny rak piersi — typ przewodowy NST. Stopień złośliwości G2. ER+, PR+, HER2−. Ki-67: 18%.',
  },
];

export function MyResults({ onBack }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <Wrap title="Moje wyniki" onBack={onBack}>
      <SectionLabel>Wyniki badań</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {RESULTS.map((r, i) => (
          <Card key={i}>
            <button
              onClick={() => setExpanded(e => e === i ? null : i)}
              style={{
                width: '100%', appearance: 'none', border: 0,
                background: 'transparent', cursor: 'pointer',
                padding: '15px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
                textAlign: 'left',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontWeight: 600, fontSize: 14, color: PT.plum,
                  marginBottom: 3,
                }}>{r.name}</div>
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 12, color: 'rgba(58,42,63,0.45)',
                }}>{r.date}</div>
              </div>
              <span style={{
                flexShrink: 0,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 11, fontWeight: 700,
                background: r.status === 'Nowy' ? `${PT.salmon}30` : 'rgba(58,42,63,0.06)',
                color: r.status === 'Nowy' ? PT.salmonDeep : 'rgba(58,42,63,0.4)',
                borderRadius: 999, padding: '3px 10px',
              }}>{r.status}</span>
              <div style={{
                transform: expanded === i ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s', flexShrink: 0,
              }}>
                <Icon name="chevron" size={15} color="rgba(58,42,63,0.35)"/>
              </div>
            </button>
            {expanded === i && (
              <div style={{
                padding: '0 16px 16px',
                borderTop: '1px solid rgba(58,42,63,0.06)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 13, lineHeight: 1.6,
                  color: PT.plumSoft, marginTop: 12,
                }}>{r.detail}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Wrap>
  );
}

// ─── 8. SupportScreen ─────────────────────────────────────────
const SUPPORT_CARDS = [
  {
    title:  'Stowarzyszenie Amazonki',
    desc:   'Ogólnopolska sieć wsparcia dla kobiet po leczeniu raka piersi. Grupy lokalne w całej Polsce.',
    action: 'Odwiedź stronę',
    icon:   'heart',
    bg:     `${PT.blush}40`,
  },
  {
    title:  'Psycholog BCU',
    desc:   'Bezpłatne wsparcie psychologiczne dla pacjentek w ramach centrum onkologicznego.',
    action: 'Zadzwoń',
    icon:   'phone',
    bg:     `${PT.lilac}35`,
  },
  {
    title:  'OnkoCafe',
    desc:   'Forum i grupy wsparcia online. Rozmowy z kobietami, które przeszły przez podobne doświadczenia.',
    action: 'Dołącz',
    icon:   'users',
    bg:     '#EAF2E7',
  },
];

export function SupportScreen({ onBack }) {
  return (
    <Wrap title="Wsparcie" onBack={onBack}>
      <p style={{
        fontFamily: 'var(--font-newsreader), Georgia, serif',
        fontStyle: 'italic',
        fontSize: 18, lineHeight: 1.4,
        color: PT.plumSoft, marginBottom: 4,
      }}>
        Nie musisz przechodzić przez to sama.
      </p>
      <SectionLabel>Zasoby</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SUPPORT_CARDS.map((c, i) => (
          <Card key={i} style={{ padding: '18px 18px 16px' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                background: c.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={c.icon} size={18} color={PT.plumSoft}/>
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontWeight: 600, fontSize: 15, color: PT.plum,
                  marginBottom: 4,
                }}>{c.title}</div>
                <p style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 13, lineHeight: 1.5,
                  color: 'rgba(58,42,63,0.55)', margin: 0,
                }}>{c.desc}</p>
              </div>
            </div>
            <button style={{
              appearance: 'none',
              border: `1.5px solid rgba(58,42,63,0.15)`,
              background: 'transparent', color: PT.plum,
              height: 36, borderRadius: 18,
              paddingLeft: 16, paddingRight: 16,
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>{c.action}</button>
          </Card>
        ))}
      </div>
    </Wrap>
  );
}

// ─── 9. RehabPlan ─────────────────────────────────────────────
const REHAB_WEEKS = [
  {
    title: 'Fizjoterapia',
    days:  'Pon, Śr, Pt',
    desc:  'Ćwiczenia rehabilitacyjne ramienia i obręczy barkowej — 30 min.',
    done:  [true, false, false],
    color: '#EAF2E7',
    dot:   '#A8C5A0',
  },
  {
    title: 'Spacer',
    days:  'Wt, Czw',
    desc:  'Marsz w umiarkowanym tempie — 20 minut, najlepiej w parku.',
    done:  [true, true],
    color: `${PT.blush}40`,
    dot:   PT.blushDeep,
  },
  {
    title: 'Dieta',
    days:  'Codziennie',
    desc:  'Produkty bogate w białko i żelazo. Ogranicz cukry proste.',
    done:  [true, true, true, true, false],
    color: `${PT.lilac}35`,
    dot:   PT.lilacDeep,
  },
];

export function RehabPlan({ onBack }) {
  return (
    <Wrap title="Plan rehabilitacji" onBack={onBack}>
      <p style={{
        fontFamily: 'var(--font-newsreader), Georgia, serif',
        fontStyle: 'italic',
        fontSize: 17, lineHeight: 1.45,
        color: PT.plumSoft, marginBottom: 4,
      }}>
        Powrót do siebie — w swoim tempie.
      </p>
      <SectionLabel>Ten tydzień</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {REHAB_WEEKS.map((item, i) => (
          <Card key={i} style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                background: item.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="leaf" size={18} color={PT.plumSoft}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontWeight: 600, fontSize: 15, color: PT.plum,
                  }}>{item.title}</div>
                  <span style={{
                    flexShrink: 0,
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 11, fontWeight: 600,
                    color: 'rgba(58,42,63,0.45)',
                    background: 'rgba(58,42,63,0.06)',
                    borderRadius: 999, padding: '3px 9px',
                  }}>{item.days}</span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-manrope), system-ui',
                  fontSize: 13, lineHeight: 1.5,
                  color: 'rgba(58,42,63,0.55)',
                  margin: '4px 0 12px',
                }}>{item.desc}</p>
                {/* progress dots */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {item.done.map((done, j) => (
                    <div key={j} style={{
                      width: 10, height: 10, borderRadius: 5,
                      background: done ? item.dot : 'rgba(58,42,63,0.1)',
                      transition: 'background 0.2s',
                    }}/>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Wrap>
  );
}

// ─── 10. PartnersScreen ───────────────────────────────────────

const PARTNER_FILTERS = ['Wszystkie', 'Tatuaż medyczny', 'Peruki', 'Wsparcie psychologiczne', 'Rehabilitacja'];

const PARTNERS = [
  {
    id: 1,
    name: 'Studio Tatuażu Medycznego — Aneta Kowalska',
    category: 'Tatuaż medyczny',
    location: 'Warszawa, Mokotów',
    description: 'Specjalizacja: rekonstrukcja areoli po mastektomii. Doświadczenie 8 lat, współpraca z oddziałami onkologicznymi.',
    badge: 'Polecane przez BCU',
    badgeColor: '#4AAAC6',
    phone: '+48 600 000 001',
    bookingType: 'phone',
    tags: ['Tatuaż medyczny'],
  },
  {
    id: 2,
    name: 'MedInk — Tatuaż Onkologiczny',
    category: 'Tatuaż medyczny',
    location: 'Kraków, Śródmieście',
    description: 'Tatuaż paramedyczny i rekonstrukcja. Bezpłatna konsultacja wstępna. NFZ: usługa prywatna.',
    badge: null,
    phone: '+48 600 000 002',
    bookingType: 'booksy',
    booksyUrl: 'https://booksy.com/pl-pl/s/pl/tattoo?q=tatua%C5%BC+medyczny+krak%C3%B3w',
    tags: ['Tatuaż medyczny'],
  },
  {
    id: 3,
    name: 'Peruki Onkologiczne — Dom Mody Sylwia',
    category: 'Peruki',
    location: 'Warszawa, Wola',
    description: 'Peruki naturalne i syntetyczne dla kobiet w trakcie i po chemioterapii. Możliwość dofinansowania z NFZ.',
    badge: 'Dofinansowanie NFZ',
    badgeColor: '#6B9E9E',
    phone: '+48 600 000 003',
    bookingType: 'phone',
    tags: ['Peruki'],
  },
  {
    id: 4,
    name: 'Oncohair Polska',
    category: 'Peruki',
    location: 'Gdańsk / online',
    description: 'Peruki onkologiczne, akcesoria, chusty. Sklep online i salon stacjonarny. Wysyłka w 24h.',
    badge: null,
    phone: null,
    bookingType: 'url',
    externalUrl: 'https://oncohair.pl',
    tags: ['Peruki'],
  },
  {
    id: 5,
    name: 'Fundacja OmeaLife — Wsparcie Psychologiczne',
    category: 'Wsparcie psychologiczne',
    location: 'Gdańsk + online',
    description: 'Bezpłatne konsultacje z psychoonkologiem dla kobiet z rakiem piersi. Zapisy przez fundację.',
    badge: 'Bezpłatne',
    badgeColor: '#A8C5A0',
    phone: '575 752 763',
    bookingType: 'url',
    externalUrl: 'https://omealife.pl',
    tags: ['Wsparcie psychologiczne'],
  },
  {
    id: 6,
    name: 'OnkoCafe — Klub Pacjenta',
    category: 'Wsparcie psychologiczne',
    location: 'Warszawa + online',
    description: 'Grupy wsparcia, warsztaty, psycholog, dietetyk. Spotkania stacjonarne i online dla pacjentek w każdym etapie.',
    badge: 'Bezpłatne',
    badgeColor: '#A8C5A0',
    phone: null,
    bookingType: 'url',
    externalUrl: 'https://onkocafe.pl',
    tags: ['Wsparcie psychologiczne'],
  },
  {
    id: 7,
    name: 'Fizjoterapia Onkologiczna — Centrum Zdrowia',
    category: 'Rehabilitacja',
    location: 'Warszawa, Ursynów',
    description: 'Fizjoterapia po mastektomii, drenaż limfatyczny, ćwiczenia ramienia. NFZ i prywatnie.',
    badge: 'NFZ + prywatnie',
    badgeColor: '#6B9E9E',
    phone: '+48 600 000 007',
    bookingType: 'booksy',
    booksyUrl: 'https://booksy.com/pl-pl/s/pl/physiotherapy',
    tags: ['Rehabilitacja'],
  },
  {
    id: 8,
    name: 'Amazonki — Grupy Wsparcia',
    category: 'Wsparcie psychologiczne',
    location: '210 klubów w całej Polsce',
    description: 'Największa sieć wsparcia dla kobiet po raku piersi. Znajdź klub w swoim mieście.',
    badge: 'Bezpłatne',
    badgeColor: '#A8C5A0',
    phone: '+48 790 324 914',
    bookingType: 'url',
    externalUrl: 'https://amazonkifederacja.pl',
    tags: ['Wsparcie psychologiczne'],
  },
];

const TEAL = '#4A8E8E';
const TEAL_BORDER = '#6B9E9E';

function ActionButtons({ partner, onOpenChat }) {
  const btnBase = {
    appearance: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-manrope), system-ui',
    fontSize: 13, fontWeight: 600,
    height: 38, borderRadius: 19,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  };

  if (partner.bookingType === 'phone') {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <a href={`tel:${partner.phone}`} style={{
          flex: 1, textDecoration: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          height: 38, borderRadius: 19,
          border: `1.5px solid ${PT.plum}`,
          color: PT.plum,
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 13, fontWeight: 600,
        }}>
          <Icon name="phone" size={13} color={PT.plum}/>
          Zadzwoń
        </a>
        <button
          onClick={onOpenChat}
          style={{ ...btnBase, flex: 1, border: 0, background: '#4AAAC6', color: '#fff' }}
        >
          <Icon name="chat" size={13} color="#fff"/>
          Zapytaj
        </button>
      </div>
    );
  }

  if (partner.bookingType === 'booksy') {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => window.open(partner.booksyUrl, '_blank')}
          style={{ ...btnBase, flex: 1, border: 0, background: TEAL, color: '#fff' }}
        >
          Umów przez Booksy
        </button>
        {partner.phone && (
          <a href={`tel:${partner.phone}`} style={{
            flexShrink: 0, textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            height: 38, borderRadius: 19,
            paddingLeft: 14, paddingRight: 14,
            border: `1.5px solid ${PT.plum}`,
            color: PT.plum,
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 13, fontWeight: 600,
          }}>
            <Icon name="phone" size={13} color={PT.plum}/>
            Zadzwoń
          </a>
        )}
      </div>
    );
  }

  if (partner.bookingType === 'url') {
    return (
      <button
        onClick={() => window.open(partner.externalUrl, '_blank')}
        style={{
          ...btnBase,
          width: '100%', border: `1.5px solid ${TEAL_BORDER}`,
          background: 'transparent', color: TEAL,
        }}
      >
        Odwiedź stronę
        <Icon name="externalLink" size={13} color={TEAL}/>
      </button>
    );
  }

  return null;
}

function PartnerCard({ partner, isExpanded, onToggle, onOpenChat }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      padding: '16px 16px 14px',
      boxShadow: '0 1px 8px rgba(58,42,63,0.07)',
    }}>
      {/* category + badge */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 8, marginBottom: 10,
      }}>
        <span style={{
          background: '#E4F2FA', color: '#4AAAC6',
          borderRadius: 10, padding: '3px 10px',
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 11, fontWeight: 600, flexShrink: 0,
        }}>{partner.category}</span>
        {partner.badge && (
          <span style={{
            background: partner.badgeColor, color: '#fff',
            borderRadius: 999, padding: '3px 10px',
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 11, fontWeight: 600, flexShrink: 0,
          }}>{partner.badge}</span>
        )}
      </div>

      {/* name */}
      <div style={{
        fontFamily: 'var(--font-manrope), system-ui',
        fontWeight: 600, fontSize: 15,
        color: PT.plum, letterSpacing: '-0.01em',
        lineHeight: 1.35, marginBottom: 6,
      }}>{partner.name}</div>

      {/* location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
        <Icon name="mapPin" size={12} color="rgba(58,42,63,0.4)" sw={1.6}/>
        <span style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 12, color: 'rgba(58,42,63,0.5)',
        }}>{partner.location}</span>
      </div>

      {/* description with clamp */}
      <div style={{ marginBottom: 14 }}>
        <p style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 13, lineHeight: 1.55,
          color: 'rgba(58,42,63,0.65)',
          margin: 0,
          ...(!isExpanded ? {
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } : {}),
        }}>{partner.description}</p>
        <button
          onClick={onToggle}
          style={{
            appearance: 'none', border: 0, background: 'none',
            padding: 0, marginTop: 3, cursor: 'pointer',
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 12, fontWeight: 600, color: '#4AAAC6',
          }}
        >{isExpanded ? 'mniej' : 'więcej'}</button>
      </div>

      <ActionButtons partner={partner} onOpenChat={onOpenChat}/>
    </div>
  );
}

export function PartnersScreen({ onBack, onOpenChat }) {
  const [activeFilter, setActiveFilter] = useState('Wszystkie');
  const [expanded, setExpanded] = useState({});
  const topRef = useRef(null);

  const filtered = activeFilter === 'Wszystkie'
    ? PARTNERS
    : PARTNERS.filter(p => p.tags.includes(activeFilter));

  function changeFilter(f) {
    setActiveFilter(f);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="page-bg screen-enter" style={{ width: '100%', minHeight: '100dvh' }}>
      <style>{`.pt-chips::-webkit-scrollbar { display: none; }`}</style>
      <div ref={topRef}/>
      <ScreenHeader title="Opieka po leczeniu" onBack={onBack}/>

      {/* intro */}
      <div style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 14 }}>
        <p style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 13, color: 'rgba(58,42,63,0.5)',
          lineHeight: 1.5, margin: 0,
        }}>
          Sprawdzone miejsca i usługi dla kobiet po leczeniu raka piersi.
        </p>
      </div>

      {/* filter chips */}
      <div
        className="pt-chips"
        style={{
          display: 'flex', gap: 8,
          overflowX: 'auto',
          paddingLeft: 20, paddingRight: 20, paddingBottom: 2,
          scrollbarWidth: 'none',
        }}
      >
        {PARTNER_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => changeFilter(f)}
            style={{
              flexShrink: 0, height: 34, borderRadius: 17,
              paddingLeft: 14, paddingRight: 14,
              appearance: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 13, fontWeight: 500,
              background: activeFilter === f ? '#4AAAC6' : '#fff',
              color: activeFilter === f ? '#fff' : '#6B6B6B',
              border: activeFilter === f ? 'none' : '1px solid #E0E0E0',
              transition: 'background 0.15s, color 0.15s',
            }}
          >{f}</button>
        ))}
      </div>

      {/* cards */}
      <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 18, paddingBottom: 100 }}>
        {filtered.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
            padding: '52px 0', gap: 16,
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 30,
              background: 'rgba(58,42,63,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="search" size={26} color="rgba(58,42,63,0.25)" sw={1.6}/>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontWeight: 600, fontSize: 15,
                color: PT.plum, marginBottom: 6,
              }}>Brak wyników dla tej kategorii</p>
              <p style={{
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 13, color: 'rgba(58,42,63,0.5)',
                lineHeight: 1.5, margin: 0,
              }}>Zapytaj asystentkę — pomoże znaleźć odpowiednie miejsce</p>
            </div>
            <button
              onClick={onOpenChat}
              style={{
                appearance: 'none', border: 0,
                background: PT.plum, color: PT.cream,
                height: 44, borderRadius: 22,
                paddingLeft: 22, paddingRight: 22,
                fontFamily: 'var(--font-manrope), system-ui',
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 8px 20px -6px rgba(58,42,63,0.3)',
              }}
            >Zapytaj asystentkę</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(p => (
              <PartnerCard
                key={p.id}
                partner={p}
                isExpanded={!!expanded[p.id]}
                onToggle={() => setExpanded(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        )}
      </div>

      {/* sticky bottom bar */}
      <div style={{
        position: 'sticky', bottom: 0,
        paddingTop: 20, paddingLeft: 20, paddingRight: 20,
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 20px)',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(251,245,238,0.94) 32%, rgba(251,245,238,0.99) 100%)',
      }}>
        <button
          onClick={onOpenChat}
          style={{
            width: '100%', height: 50,
            appearance: 'none',
            border: '1px solid #E0E0E0',
            background: '#fff',
            borderRadius: 25,
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 15, fontWeight: 600,
            color: '#4AAAC6',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 2px 12px rgba(58,42,63,0.08)',
          }}
        >
          <Icon name="chat" size={16} color="#4AAAC6"/>
          Nie znalazłaś? Zapytaj asystentkę
        </button>
      </div>
    </div>
  );
}

// ─── 11. AppointmentDetail ────────────────────────────────────

const APPT_ITEMS = [
  'Dowód osobisty',
  'Karta PESEL / ubezpieczenia',
  'Wyniki ostatnich badań krwi',
  'Wygodne ubranie z krótkim rękawem',
  'Coś do jedzenia i picia',
  'Ktoś bliski (jeśli możliwe)',
];

export function AppointmentDetail({ onBack, onOpenChat }) {
  const [checked, setChecked] = useState({});
  const [calendarAdded, setCalendarAdded] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('visitAdded') === 'true'
  );

  const checkedCount = Object.values(checked).filter(Boolean).length;

  function toggle(i) {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  }

  function addToCalendar() {
    localStorage.setItem('visitAdded', 'true');
    setCalendarAdded(true);
  }

  return (
    <Wrap title="Szczegóły wizyty" onBack={onBack}>

      {/* visit card with salmon left border */}
      <Card style={{ overflow: 'visible', marginBottom: 0 }}>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: 6, flexShrink: 0,
            background: PT.salmon,
            borderRadius: '20px 0 0 20px',
          }}/>
          <div style={{ padding: '16px 16px 16px 14px', flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontWeight: 700, fontSize: 16,
              color: PT.plum, letterSpacing: '-0.01em',
              marginBottom: 10,
            }}>Chemioterapia — cykl 3/6</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { icon: 'calendar', text: 'Jutro, 13 maja 2026 · 09:00' },
                { icon: 'users',    text: 'dr Anna Wiśniewska — Onkolog' },
                { icon: 'mapPin',   text: 'Salve Medica, ul. Inflancka 3, Warszawa' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Icon name={row.icon} size={13} color="rgba(58,42,63,0.4)" sw={1.6}/>
                  <span style={{
                    fontFamily: 'var(--font-manrope), system-ui',
                    fontSize: 13, color: PT.plumSoft,
                  }}>{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <SectionLabel>Co zabrać</SectionLabel>

      {/* progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{
          height: 4, flex: 1, borderRadius: 2,
          background: 'rgba(58,42,63,0.1)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${(checkedCount / APPT_ITEMS.length) * 100}%`,
            background: PT.salmon, borderRadius: 2,
            transition: 'width 0.3s',
          }}/>
        </div>
        <span style={{
          fontFamily: 'var(--font-manrope), system-ui',
          fontSize: 12, color: 'rgba(58,42,63,0.45)',
          whiteSpace: 'nowrap',
        }}>{checkedCount} / {APPT_ITEMS.length} zaznaczonych</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {APPT_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            style={{
              appearance: 'none', cursor: 'pointer', textAlign: 'left',
              background: checked[i] ? `${PT.lilac}20` : '#fff',
              border: checked[i] ? `1.5px solid ${PT.lilacDeep}` : '1.5px solid transparent',
              borderRadius: 16, padding: '13px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: checked[i] ? 'none' : '0 1px 6px rgba(58,42,63,0.07)',
              transition: 'all 0.18s',
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
              background: checked[i] ? PT.lilacDeep : 'transparent',
              border: checked[i] ? 'none' : `1.5px solid rgba(58,42,63,0.2)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.18s',
            }}>
              {checked[i] && <Icon name="check" size={12} color="#fff" sw={2.5}/>}
            </div>
            <span style={{
              fontFamily: 'var(--font-manrope), system-ui',
              fontSize: 14, fontWeight: 500,
              color: checked[i] ? 'rgba(58,42,63,0.45)' : PT.plum,
              textDecoration: checked[i] ? 'line-through' : 'none',
              lineHeight: 1.4, transition: 'color 0.18s',
            }}>{item}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={calendarAdded ? undefined : addToCalendar}
          style={{
            width: '100%', height: 52, borderRadius: 26,
            appearance: 'none',
            border: calendarAdded ? 'none' : `1.5px solid ${PT.plum}`,
            background: calendarAdded ? PT.plum : 'transparent',
            color: calendarAdded ? PT.cream : PT.plum,
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 15, fontWeight: 600,
            cursor: calendarAdded ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.25s',
            boxShadow: calendarAdded ? '0 8px 20px -6px rgba(58,42,63,0.3)' : 'none',
          }}
        >
          {calendarAdded && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke={PT.cream} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
          {calendarAdded ? 'Dodano do kalendarza' : 'Dodaj do kalendarza'}
        </button>

        <button
          onClick={onOpenChat}
          style={{
            width: '100%', height: 44,
            appearance: 'none', border: 0, background: 'transparent',
            color: PT.plumSoft,
            fontFamily: 'var(--font-manrope), system-ui',
            fontSize: 14, fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <Icon name="chat" size={15} color={PT.plumSoft}/>
          Zapytaj asystentkę
        </button>
      </div>
    </Wrap>
  );
}
