'use client';
import { useState, useRef, useEffect } from 'react';
import { C } from './tokens';

const F = {
  mono: '15px',
  sm: 'clamp(16px, 1.4vw, 18px)',
  base: 'clamp(19px, 1.8vw, 21px)',
  lg: 'clamp(23px, 2.2vw, 26px)',
  xl: 'clamp(30px, 3vw, 38px)',
};

export function Textarea({ value, onChange, placeholder, rows = 4, mono }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        background: '#ffffff',
        border: `1.5px solid ${C.border}`,
        borderRadius: '6px',
        color: C.text,
        padding: '12px 16px',
        fontFamily: mono ? C.mono : C.sans,
        fontSize: mono ? F.mono : F.base,
        lineHeight: 1.65,
        resize: 'vertical',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
      }}
      onFocus={e => {
        e.target.style.borderColor = C.gold;
        e.target.style.boxShadow = `0 0 0 3px rgba(139,105,20,0.12), inset 0 1px 2px rgba(0,0,0,0.04)`;
      }}
      onBlur={e => {
        e.target.style.borderColor = C.border;
        e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)';
      }}
    />
  );
}

export function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        background: '#ffffff',
        border: `1.5px solid ${C.border}`,
        borderRadius: '6px',
        color: C.text,
        padding: '11px 16px',
        fontFamily: C.sans,
        fontSize: F.base,
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
      }}
      onFocus={e => {
        e.target.style.borderColor = C.gold;
        e.target.style.boxShadow = `0 0 0 3px rgba(139,105,20,0.12)`;
      }}
      onBlur={e => {
        e.target.style.borderColor = C.border;
        e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.04)';
      }}
    />
  );
}

export function Btn({ children, onClick, variant = 'primary', disabled, style }) {
  const [hov, setHov] = useState(false);
  const base = {
    padding: '11px 24px',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: C.mono,
    fontSize: F.mono,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: '600',
    transition: 'all 0.15s',
    opacity: disabled ? 0.45 : 1,
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  };
  const variants = {
    primary: {
      background: disabled ? '#d1d5db' : hov ? '#6d5210' : C.gold,
      color: '#ffffff',
      boxShadow: disabled ? 'none' : hov ? '0 2px 8px rgba(139,105,20,0.35)' : '0 1px 4px rgba(139,105,20,0.25)',
    },
    secondary: {
      background: hov ? C.goldLight : '#ffffff',
      color: C.gold,
      border: `1.5px solid ${hov ? C.gold : C.goldBorder}`,
      boxShadow: hov ? '0 1px 4px rgba(139,105,20,0.15)' : 'none',
    },
    ghost: {
      background: hov ? '#f3f4f6' : 'transparent',
      color: C.textFaint,
      border: `1px solid ${hov ? C.border : 'transparent'}`,
    },
    danger: {
      background: hov ? C.redDim : 'transparent',
      color: C.red,
      border: `1.5px solid ${C.redBorder}`,
    },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}

export function VoiceBtn({ onTranscript, label = 'Dictate' }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  const toggle = () => {
    if (on) { ref.current?.stop(); setOn(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input requires Chrome or Edge browser.'); return; }
    const r = new SR();
    r.continuous = true; r.interimResults = false; r.lang = 'en-US';
    r.onresult = e => onTranscript(Array.from(e.results).map(x => x[0].transcript).join(' '));
    r.onend = () => setOn(false);
    r.onerror = () => setOn(false);
    r.start(); ref.current = r; setOn(true);
  };
  return (
    <button onClick={toggle} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      background: on ? '#fff1f2' : C.goldLight,
      border: `1.5px solid ${on ? C.redBorder : C.goldBorder}`,
      borderRadius: '6px',
      color: on ? C.red : C.gold,
      padding: '9px 18px', cursor: 'pointer',
      fontFamily: C.mono, fontSize: F.mono, letterSpacing: '1px',
      fontWeight: '600', textTransform: 'uppercase',
      transition: 'all 0.15s', whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
        background: on ? C.red : C.gold,
        animation: on ? 'voicePulse 1s infinite' : 'none',
      }} />
      {on ? '■ Stop' : `🎙 ${label}`}
    </button>
  );
}

export function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div style={{
      background: C.redDim,
      border: `1px solid ${C.redBorder}`,
      borderLeft: `4px solid ${C.red}`,
      borderRadius: '6px',
      padding: '14px 18px', color: C.red,
      fontSize: F.base, fontFamily: C.sans,
      marginBottom: '20px', lineHeight: 1.55,
      display: 'flex', alignItems: 'flex-start', gap: '12px',
    }}>
      <span style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1 }}>⚠</span>
      <span>{message}</span>
    </div>
  );
}

function CopyBtn({ getText }) {
  const [state, setState] = useState('idle');
  const copy = async () => {
    setState('copying');
    try {
      await navigator.clipboard.writeText(getText());
      setState('copied');
      setTimeout(() => setState('idle'), 3000);
    } catch { setState('idle'); }
  };
  return (
    <button onClick={copy} style={{
      display: 'inline-flex', alignItems: 'center', gap: '7px',
      padding: '8px 18px', borderRadius: '6px',
      border: `1.5px solid ${state === 'copied' ? C.greenBorder : C.border}`,
      background: state === 'copied' ? C.greenDim : '#ffffff',
      color: state === 'copied' ? C.green : C.textFaint,
      cursor: 'pointer', fontFamily: C.mono, fontSize: F.mono,
      letterSpacing: '1px', fontWeight: '600',
      transition: 'all 0.2s', whiteSpace: 'nowrap',
    }}>
      {state === 'copied' ? '✓ Copied!' : state === 'copying' ? 'Copying...' : '⎘ Copy Note'}
    </button>
  );
}

export function DocOutput({ title, content, badge }) {
  const rendered = content.split('\n').map((line, i) => {
    line = line.replace(/\*\*/g, '').replace(/\*/g, '');
    const isHeader = /^[A-Z][A-Z\s\/\(\)\-,:.]{4,}$/.test(line.trim()) && line.trim().length > 3;
    if (isHeader) return (
      <div key={i} style={{
        color: C.gold, fontFamily: C.mono, fontSize: F.mono,
        fontWeight: '700', letterSpacing: '1.5px',
        marginTop: '24px', marginBottom: '8px', paddingBottom: '6px',
        borderBottom: `2px solid ${C.goldLight}`,
        textTransform: 'uppercase',
      }}>{line}</div>
    );
    if (!line.trim()) return <div key={i} style={{ height: '8px' }} />;
    return <div key={i} style={{ color: C.textDim, fontSize: F.base, lineHeight: 1.85, fontFamily: C.serif }}>{line}</div>;
  });
  return (
    <div style={{
      background: C.bgCard, border: `1.5px solid ${C.border}`,
      borderTop: `4px solid ${C.gold}`,
      borderRadius: '8px', overflow: 'hidden', marginBottom: '28px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', borderBottom: `1px solid ${C.border}`,
        background: C.goldLight,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: F.lg, fontFamily: C.sans, fontWeight: '600' }}>{title}</span>
          {badge && (
            <span style={{
              fontSize: '11px', color: C.green, background: C.greenDim,
              border: `1px solid ${C.greenBorder}`, borderRadius: '12px',
              padding: '2px 10px', fontFamily: C.mono, fontWeight: '600',
            }}>{badge}</span>
          )}
        </div>
        <CopyBtn getText={() => content} />
      </div>
      <div style={{ padding: '24px 28px', maxHeight: '580px', overflowY: 'auto' }}>{rendered}</div>
    </div>
  );
}

export function EditableDraft({ title, value, onChange, badge }) {
  return (
    <div style={{
      background: C.bgCard, border: `2.5px solid ${C.gold}`,
      borderRadius: '8px', overflow: 'hidden', marginBottom: '28px',
      boxShadow: '0 4px 12px rgba(122,92,15,0.18)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', borderBottom: `1px solid ${C.border}`,
        background: C.goldLight,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: F.lg, fontFamily: C.sans, fontWeight: '600' }}>{title}</span>
          {badge && (
            <span style={{
              fontSize: '11px', color: C.green, background: C.greenDim,
              border: `1px solid ${C.greenBorder}`, borderRadius: '12px',
              padding: '2px 10px', fontFamily: C.mono, fontWeight: '600',
            }}>{badge}</span>
          )}
          <span style={{
            fontSize: '12px', color: C.gold, fontFamily: C.mono, fontWeight: '600',
            background: 'rgba(139,105,20,0.08)', padding: '2px 10px',
            borderRadius: '4px', border: `1px solid ${C.goldBorder}`,
          }}>✎ Click to edit</span>
        </div>
        <CopyBtn getText={() => value} />
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', minHeight: '420px',
          background: '#ffffff', border: 'none', outline: 'none',
          padding: '24px 28px', color: C.textDim,
          fontSize: F.base, lineHeight: 1.85,
          fontFamily: C.serif, resize: 'vertical', boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export function TopNav({ onHome, moduleName }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: C.bgNav,
      borderBottom: `3px solid ${C.gold}`,
      padding: '0 clamp(20px,3vw,40px)',
      height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    }}>
      <button onClick={onHome} style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      }}>
        <span style={{ fontSize: 'clamp(18px,2vw,22px)', color: '#f0e8d8', fontFamily: C.serif, fontWeight: 'bold' }}>
          Clarity<span style={{ color: C.goldBorder }}>Chart</span>
        </span>
        <span style={{
          fontSize: '13px', color: C.goldBorder, fontFamily: C.mono,
          fontWeight: '600', letterSpacing: '1px',
          paddingLeft: '16px', borderLeft: `2px solid rgba(196,168,130,0.4)`,
        }}>
          ← HOME
        </span>
      </button>
      {moduleName && (
        <span style={{
          fontSize: '12px', color: '#c4b898', fontFamily: C.mono,
          letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600',
        }}>
          {moduleName}
        </span>
      )}
    </div>
  );
}

export function BackBtn({ onClick, label = 'Back' }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: hov ? C.goldLight : '#ffffff',
        border: `1.5px solid ${hov ? C.gold : C.border}`,
        borderRadius: '6px', color: hov ? C.gold : C.textFaint,
        padding: '10px 20px', cursor: 'pointer',
        fontFamily: C.mono, fontSize: F.mono,
        fontWeight: '600', letterSpacing: '1px',
        transition: 'all 0.15s',
      }}>
      ‹ {label}
    </button>
  );
}

export function ProgressSteps({ steps, current, onStepClick }) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '36px' }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = done && onStepClick;
        return (
          <div key={i} onClick={() => clickable && onStepClick(i)}
            style={{ flex: 1, cursor: clickable ? 'pointer' : 'default' }}>
            <div style={{
              height: '4px', borderRadius: '2px', marginBottom: '8px',
              background: active ? C.gold : done ? C.goldBorder : C.border,
              transition: 'background 0.3s',
            }} />
            <div style={{
              fontSize: F.mono, letterSpacing: '1px', fontFamily: C.mono,
              fontWeight: active ? '700' : done ? '600' : '400',
              color: active ? C.gold : done ? C.textDim : C.textFaint,
              textDecoration: clickable ? 'underline' : 'none',
              textDecorationColor: C.goldBorder,
            }}>
              {i + 1}. {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProgressLoader({ steps, currentStep, message }) {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => { setAnimKey(k => k + 1); }, [currentStep]);
  return (
    <div style={{
      background: C.bgCard, border: `1.5px solid ${C.border}`,
      borderTop: `4px solid ${C.gold}`,
      borderRadius: '8px', padding: 'clamp(28px,4vw,48px)',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        fontSize: F.mono, letterSpacing: '2px', color: C.gold,
        fontFamily: C.mono, fontWeight: '700', marginBottom: '36px',
        textTransform: 'uppercase',
      }}>
        {message || 'Generating...'}
      </div>
      {steps && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px', margin: '0 auto' }}>
          {steps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${done ? C.green : active ? C.gold : C.border}`,
                  background: done ? C.greenDim : active ? C.goldLight : '#f9fafb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: '700',
                  color: done ? C.green : active ? C.gold : C.textFaint,
                  transition: 'all 0.4s',
                }}>
                  {done ? '✓' : active ? '◉' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '5px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      key={`${animKey}-${i}`}
                      style={{
                        height: '100%', borderRadius: '3px',
                        background: done ? C.green : active ? C.gold : 'transparent',
                        width: done ? '100%' : '0%',
                        animation: active ? 'progressFill 1.8s ease-out forwards' : 'none',
                        transition: done ? 'none' : 'width 0.5s',
                      }}
                    />
                  </div>
                </div>
                <div style={{
                  fontSize: F.mono, fontFamily: C.mono, fontWeight: '600',
                  color: done ? C.green : active ? C.gold : C.textFaint,
                  minWidth: '160px', textAlign: 'left', transition: 'color 0.3s',
                }}>
                  {step}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', background: open ? C.goldLight : '#f9fafb',
        border: `1px solid ${open ? C.goldBorder : C.border}`,
        borderRadius: open ? '6px 6px 0 0' : '6px',
        padding: '12px 18px', cursor: 'pointer', color: C.textDim,
        fontFamily: C.mono, fontSize: F.mono, fontWeight: '600',
        letterSpacing: '1.5px', textTransform: 'uppercase',
        transition: 'all 0.15s',
      }}>
        <span>{title}</span>
        <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', fontSize: '16px', color: C.gold }}>▾</span>
      </button>
      {open && (
        <div style={{
          border: `1px solid ${C.goldBorder}`, borderTop: 'none',
          borderRadius: '0 0 6px 6px', padding: '20px',
          background: '#ffffff',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function useUnsavedWarning(hasContent) {
  useEffect(() => {
    const handler = (e) => { if (hasContent) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasContent]);
}
