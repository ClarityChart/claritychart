'use client';
import { useState, useRef, useEffect } from 'react';
import { C } from './tokens';

const FONT_BASE = 'clamp(14px, 1.4vw, 16px)';
const FONT_SM = 'clamp(12px, 1.1vw, 13px)';
const FONT_LG = 'clamp(16px, 1.8vw, 20px)';
const FONT_MONO = 'clamp(11px, 1vw, 12px)';

export function Textarea({ value, onChange, placeholder, rows = 4, mono }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        background: 'rgba(0,0,0,0.4)',
        border: `1px solid ${C.border}`,
        borderRadius: '4px',
        color: C.text,
        padding: '12px 16px',
        fontFamily: mono ? C.mono : C.serif,
        fontSize: mono ? FONT_MONO : FONT_BASE,
        lineHeight: 1.65,
        resize: 'vertical',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => e.target.style.borderColor = C.gold}
      onBlur={e => e.target.style.borderColor = C.border}
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
        background: 'rgba(0,0,0,0.4)',
        border: `1px solid ${C.border}`,
        borderRadius: '4px',
        color: C.text,
        padding: '11px 16px',
        fontFamily: C.serif,
        fontSize: FONT_BASE,
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => e.target.style.borderColor = C.gold}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

export function Btn({ children, onClick, variant = 'primary', disabled, style }) {
  const [hov, setHov] = useState(false);
  const base = {
    padding: '11px 24px',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: C.mono,
    fontSize: FONT_MONO,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    transition: 'all 0.15s',
    opacity: disabled ? 0.4 : 1,
    border: 'none',
  };
  const variants = {
    primary: { background: disabled ? '#5a4a3a' : hov ? '#d4b892' : C.gold, color: '#0f1923' },
    secondary: { background: hov ? 'rgba(196,168,130,0.15)' : 'transparent', color: C.gold, border: `1px solid ${hov ? C.gold : C.border}` },
    ghost: { background: 'transparent', color: C.goldDim },
    danger: { background: 'transparent', color: '#e07070', border: '1px solid rgba(224,112,112,0.4)' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[variant], ...style }}>
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
      display: 'flex', alignItems: 'center', gap: '8px',
      background: on ? 'rgba(220,80,80,0.15)' : 'rgba(196,168,130,0.1)',
      border: `1px solid ${on ? 'rgba(220,80,80,0.6)' : C.border}`,
      borderRadius: '4px', color: on ? '#ff8080' : C.gold,
      padding: '9px 18px', cursor: 'pointer', fontFamily: C.mono,
      fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase',
      transition: 'all 0.15s', whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: '9px', height: '9px', borderRadius: '50%', flexShrink: 0,
        background: on ? '#ff8080' : C.gold,
        animation: on ? 'voicePulse 1s infinite' : 'none',
      }} />
      {on ? '■ Stop Recording' : `🎙 ${label}`}
    </button>
  );
}

export function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div style={{
      background: 'rgba(224,112,112,0.12)', border: '1px solid rgba(224,112,112,0.5)',
      borderLeft: '4px solid #e07070', borderRadius: '4px',
      padding: '14px 18px', color: '#ff9090', fontSize: FONT_BASE,
      fontFamily: C.serif, marginBottom: '20px', lineHeight: 1.6,
      display: 'flex', alignItems: 'flex-start', gap: '12px',
    }}>
      <span style={{ fontSize: '20px', flexShrink: 0, lineHeight: 1 }}>⚠</span>
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
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '8px 20px', borderRadius: '4px',
      border: `1px solid ${state === 'copied' ? C.greenBorder : C.border}`,
      background: state === 'copied' ? C.greenDim : 'transparent',
      color: state === 'copied' ? C.green : C.gold,
      cursor: 'pointer', fontFamily: C.mono, fontSize: FONT_MONO,
      letterSpacing: '1px', transition: 'all 0.2s', whiteSpace: 'nowrap',
    }}>
      {state === 'copied' ? <><span>✓</span> Copied!</> : state === 'copying' ? 'Copying...' : <><span>⎘</span> Copy Note</>}
    </button>
  );
}

export function DocOutput({ title, content, badge }) {
  const rendered = content.split('\n').map((line, i) => {
    line = line.replace(/\*\*/g, '').replace(/\*/g, '');
    const isHeader = /^[A-Z][A-Z\s\/\(\)\-,:.]{4,}$/.test(line.trim()) && line.trim().length > 3;
    if (isHeader) return (
      <div key={i} style={{ color: C.gold, fontFamily: C.mono, fontSize: FONT_MONO, letterSpacing: '2px', marginTop: '24px', marginBottom: '8px', paddingBottom: '6px', borderBottom: `1px solid rgba(196,168,130,0.2)` }}>{line}</div>
    );
    if (!line.trim()) return <div key={i} style={{ height: '8px' }} />;
    return <div key={i} style={{ color: C.textDim, fontSize: FONT_BASE, lineHeight: 1.85 }}>{line}</div>;
  });
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '4px', overflow: 'hidden', marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: FONT_LG, fontFamily: C.serif }}>{title}</span>
          {badge && <span style={{ fontSize: '10px', color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: '12px', padding: '2px 10px', fontFamily: C.mono }}>{badge}</span>}
        </div>
        <CopyBtn getText={() => content} />
      </div>
      <div style={{ padding: '24px 28px', maxHeight: '580px', overflowY: 'auto', fontFamily: C.serif }}>{rendered}</div>
    </div>
  );
}

export function EditableDraft({ title, value, onChange, badge }) {
  return (
    <div style={{ background: C.bgCard, border: `2px solid ${C.gold}`, borderRadius: '4px', overflow: 'hidden', marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderBottom: `1px solid ${C.border}`, background: 'rgba(196,168,130,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: FONT_LG, fontFamily: C.serif }}>{title}</span>
          {badge && <span style={{ fontSize: '10px', color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: '12px', padding: '2px 10px', fontFamily: C.mono }}>{badge}</span>}
          <span style={{ fontSize: '11px', color: C.gold, fontFamily: C.mono, background: 'rgba(196,168,130,0.1)', padding: '2px 10px', borderRadius: '3px', border: `1px solid rgba(196,168,130,0.3)` }}>✎ Click to edit</span>
        </div>
        <CopyBtn getText={() => value} />
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', minHeight: '400px',
          background: 'rgba(196,168,130,0.03)', border: 'none', outline: 'none',
          padding: '24px 28px', color: C.textDim,
          fontSize: FONT_BASE, lineHeight: 1.85,
          fontFamily: C.serif, resize: 'vertical', boxSizing: 'border-box',
          cursor: 'text',
        }}
      />
    </div>
  );
}

export function TopNav({ onHome, moduleName }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#1e3045',
      borderBottom: `3px solid #d4b896`,
      padding: '0 clamp(16px,3vw,32px)',
      height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
    }}>
      <button onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span style={{ fontSize: 'clamp(17px,2vw,22px)', color: C.text, fontFamily: C.serif, fontWeight: 'bold' }}>
          Clarity<span style={{ color: C.gold }}>Chart</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: C.gold, fontFamily: C.mono, fontWeight: 'bold', letterSpacing: '1px', paddingLeft: '14px', borderLeft: `2px solid rgba(196,168,130,0.5)` }}>
          ← HOME
        </span>
      </button>
      {moduleName && (
        <span style={{ fontSize: '13px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
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
        display: 'flex', alignItems: 'center', gap: '8px',
        background: hov ? 'rgba(196,168,130,0.15)' : 'rgba(196,168,130,0.06)',
        border: `2px solid ${hov ? C.gold : 'rgba(196,168,130,0.5)'}`,
        borderRadius: '4px', color: hov ? C.text : C.gold,
        padding: '10px 22px', cursor: 'pointer',
        fontFamily: C.mono, fontSize: '13px', letterSpacing: '1.5px',
        fontWeight: 'bold', transition: 'all 0.15s',
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
              background: active ? C.gold : done ? 'rgba(196,168,130,0.6)' : 'rgba(196,168,130,0.15)',
              transition: 'background 0.3s',
            }} />
            <div style={{
              fontSize: FONT_MONO, letterSpacing: '1px', fontFamily: C.mono,
              color: active ? C.gold : done ? C.text : 'rgba(196,168,130,0.4)',
              textDecoration: clickable ? 'underline' : 'none',
              textDecorationColor: 'rgba(196,168,130,0.4)',
              transition: 'color 0.2s',
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
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: '4px', padding: 'clamp(28px,4vw,48px)', textAlign: 'center',
    }}>
      <div style={{ fontSize: '13px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '36px', textTransform: 'uppercase' }}>
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
                  border: `2px solid ${done ? C.green : active ? C.gold : 'rgba(196,168,130,0.2)'}`,
                  background: done ? C.green : active ? 'rgba(196,168,130,0.1)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', color: done ? '#0f1923' : active ? C.gold : 'rgba(196,168,130,0.3)',
                  transition: 'all 0.4s',
                  flexShrink: 0,
                }}>
                  {done ? '✓' : active ? '◉' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '5px', background: 'rgba(196,168,130,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
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
                  fontSize: FONT_MONO, fontFamily: C.mono, letterSpacing: '1px',
                  color: done ? C.green : active ? C.gold : 'rgba(196,168,130,0.35)',
                  minWidth: '160px', textAlign: 'left',
                  transition: 'color 0.3s',
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
        width: '100%', background: open ? 'rgba(196,168,130,0.1)' : 'rgba(196,168,130,0.05)',
        border: `1px solid ${C.border}`, borderRadius: open ? '4px 4px 0 0' : '4px',
        padding: '12px 18px', cursor: 'pointer', color: C.textDim,
        fontFamily: C.mono, fontSize: FONT_MONO, letterSpacing: '2px', textTransform: 'uppercase',
        transition: 'all 0.15s',
      }}>
        <span>{title}</span>
        <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', fontSize: '16px', color: C.gold }}>▾</span>
      </button>
      {open && (
        <div style={{ border: `1px solid ${C.border}`, borderTop: 'none', borderRadius: '0 0 4px 4px', padding: '18px', background: 'rgba(0,0,0,0.2)' }}>
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
