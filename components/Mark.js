'use client';
import { PT } from '@/lib/theme';

export default function Mark({
  size = 120,
  variant = 'embrace',
  outer   = PT.blush,
  inner   = PT.lilacDeep,
  accent  = PT.salmonDeep,
  mono,
  noAccent = false,
}) {
  const A = mono || outer;
  const B = mono || inner;
  const C = mono || accent;

  if (variant === 'path') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="PrzyTobie">
        <path d="M 18 92 Q 60 14 102 60" fill="none" stroke={B} strokeWidth="3"
              strokeLinecap="round" strokeDasharray="0.1 9" opacity="0.45"/>
        <circle cx="22" cy="86" r="7"  fill={B} opacity="0.55"/>
        <circle cx="45" cy="48" r="9"  fill={A}/>
        <circle cx="74" cy="34" r="11" fill={A}/>
        {!noAccent && <circle cx="100" cy="58" r="13" fill={C}/>}
      </svg>
    );
  }

  if (variant === 'hands') {
    return (
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="PrzyTobie">
        <path d="M 18 52 C 18 90, 50 100, 60 92" fill="none" stroke={A} strokeWidth="14" strokeLinecap="round"/>
        <path d="M 102 52 C 102 90, 70 100, 60 92" fill="none" stroke={B} strokeWidth="14" strokeLinecap="round"/>
        {!noAccent && (
          <path d="M 60 38 C 53 30, 40 33, 40 46 C 40 58, 60 72, 60 72 C 60 72, 80 58, 80 46 C 80 33, 67 30, 60 38 Z"
                fill={C}/>
        )}
      </svg>
    );
  }

  const figure = 'M 0 -38 C -16 -38, -20 -12, -10 18 Q 0 26 10 18 C 20 -12, 16 -38, 0 -38 Z';
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label="PrzyTobie">
      <g transform="translate(46 72) rotate(-14)"><path d={figure} fill={A}/></g>
      <g transform="translate(74 72) rotate(14)"><path d={figure} fill={B}/></g>
      {!noAccent && (
        <path d="M 60 26 C 55 20, 46 22, 46 31 C 46 41, 60 50, 60 50 C 60 50, 74 41, 74 31 C 74 22, 65 20, 60 26 Z"
              fill={C}/>
      )}
    </svg>
  );
}
