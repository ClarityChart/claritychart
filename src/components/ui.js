'use client';
import { useState, useRef, useEffect } from 'react';
import { C } from './tokens';

export function Textarea({ value, onChange, placeholder, rows = 4, mono }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        background: 'rgba(0,0,0,0.35)',
        border: `1px solid ${C.border}`,
        borderRadius: '3px',
        color: C.text,
        padding: '12px 14px',
        fontFamily: mono ? C.mono : C.serif,
        fontSize: mono ? '12px' : '14px',
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
        background: 'rgba(0,0,0,0.35)',
        border: `1px solid ${C.border}`,
        borderRadius: '3px',
        color: C.text,
        padding: '11px 14px',
        fontFamily: C.serif,
        fontSize: '14px',
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
  const variants = {
    primary: {
      background: disabled ? 'rgba(196,168,130,0.3)' : hov ? '#d4b892' : C.gold,
      color: '#0f1923', border: 'none',
    },
    secondary: {
      background: hov ? 'rgba(196,168,130,0.1)' : 'transparent',
      color: C.gold,
      border: `1px solid ${hov ? C.borderHover : C.border}`,
    },
    ghost: { background: 'transparent', color: C.goldDim, border: 'none' },
    danger: { background: 'transparent', color: '#e07070', border: '1px solid rgba(224,112,112,0.3)' },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '11px 24px',
        borderRadius: '3px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: C.mono,
        fontSize: '12px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        transition: 'all 0.15s',
        opacity: disabled ? 0.45 : 1,
        ...variants[variant],
        ...style,
      }}
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
    if (!SR) {
      alert('Voice input requires Chrome or Edge. Please switch browsers or type your response.');
      return;
    }
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
      background: on ? 'rgba(220,80,80,0.12)' : 'rgba(196,168,130,0.08)',
      border: `1px solid ${on ? 'rgba(220,80,80,0.5)' : C.border}`,
      borderRadius: '3px',
      color: on ? '#e07070' : C.gold,
      padding: '8px 16px',
      cursor: 'pointer',
      fontFamily: C.mono,
      fontSize: '11px',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      transition: 'all 0.15s',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
        background: on ? '#e07070' : C.gold,
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
      background: 'rgba(224,112,112,0.1)',
      border: '1px solid rgba(224,112,112,0.4)',
      borderLeft: '4px solid #e07070',
      borderRadius: '3px',
      padding: '14px 18px',
      color: '#e07070',
      fontSize: '14px',
      fontFamily: C.serif,
      marginBottom: '20px',
      lineHeight: 1.5,
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    }}>
      <span style={{ fontSize: '18px', flexShrink: 0 }}>⚠</span>
      <span>{message}</span>
    </div>
  );
}

export function DocOutput({ title, content, badge }) {
  const [copyState, setCopyState] = useState('idle');
  const copy = async () => {
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(content);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 3000);
    } catch { setCopyState('idle'); }
  };
  const rendered = content.split('\n').map((line, i) => {
    line = line.replace(/\*\*/g, '').replace(/\*/g, '');
    const isHeader = /^[A-Z][A-Z\s\/\(\)\-,:.]{4,}$/.test(line.trim()) && line.trim().length > 3;
    if (isHeader) return (
      <div key={i} style={{ color: C.gold, fontFamily: C.mono, fontSize: '12px', letterSpacing: '2px', marginTop: '22px', marginBottom: '6px', paddingBottom: '4px', borderBottom: `1px solid rgba(196,168,130,0.15)` }}>{line}</div>
    );
    if (!line.trim()) return <div key={i} style={{ height: '7px' }} />;
    return <div key={i} style={{ color: C.textDim, fontSize: '14px', lineHeight: 1.85 }}>{line}</div>;
  });
  return (
    <div style={{ background: 'rgba(20,32,45,0.98)', border: `1px solid rgba(196,168,130,0.25)`, borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: '15px' }}>{title}</span>
          {badge && <span style={{ fontSize: '10px', color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: '10px', padding: '2px 8px', fontFamily: C.mono }}>{badge}</span>}
        </div>
        <button onClick={copy} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 18px',
          borderRadius: '3px', border: `1px solid ${copyState === 'copied' ? C.greenBorder : C.border}`,
          background: copyState === 'copied' ? C.greenDim : 'transparent',
          color: copyState === 'copied' ? C.green : C.gold,
          cursor: 'pointer', fontFamily: C.mono, fontSize: '11px', letterSpacing: '1px', transition: 'all 0.2s',
        }}>
          {copyState === 'copied' ? '✓ Copied to clipboard' : copyState === 'copying' ? 'Copying...' : '⎘ Copy'}
        </button>
      </div>
      <div style={{ padding: '22px 26px', maxHeight: '560px', overflowY: 'auto', fontFamily: C.serif }}>{rendered}</div>
    </div>
  );
}

export function EditableDraft({ title, value, onChange, badge }) {
  const [copyState, setCopyState] = useState('idle');
  const copy = async () => {
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(value);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 3000);
    } catch { setCopyState('idle'); }
  };
  return (
    <div style={{ background: 'rgba(20,32,45,0.98)', border: `1px solid rgba(196,168,130,0.25)`, borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: '15px' }}>{title}</span>
          {badge && <span style={{ fontSize: '10px', color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: '10px', padding: '2px 8px', fontFamily: C.mono }}>{badge}</span>}
          <span style={{ fontSize: '11px', color: C.goldDim, fontFamily: C.mono }}>✎ editable</span>
        </div>
        <button onClick={copy} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 18px',
          borderRadius: '3px', border: `1px solid ${copyState === 'copied' ? C.greenBorder : C.border}`,
          background: copyState === 'copied' ? C.greenDim : 'transparent',
          color: copyState === 'copied' ? C.green : C.gold,
          cursor: 'pointer', fontFamily: C.mono, fontSize: '11px', letterSpacing: '1px', transition: 'all 0.2s',
        }}>
          {copyState === 'copied' ? '✓ Copied to clipboard' : '⎘ Copy'}
        </button>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', minHeight: '420px',
          background: 'transparent', border: 'none', outline: 'none',
          padding: '22px 26px', color: C.textDim,
          fontSize: '14px', lineHeight: 1.85,
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
      background: 'rgba(12,20,28,0.97)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid rgba(196,168,130,0.15)`,
      padding: '0 clamp(16px,3vw,32px)',
      height: '54px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <button onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span style={{ fontSize: 'clamp(15px,2vw,18px)', color: C.text, fontFamily: C.serif }}>
          Clarity<span style={{ color: C.gold }}>Chart</span>
        </span>
        <span style={{ fontSize: '10px', color: 'rgba(196,168,130,0.4)', fontFamily: C.mono, letterSpacing: '1.5px', paddingLeft: '12px', borderLeft: `1px solid rgba(196,168,130,0.2)` }}>
          ← HOME
        </span>
      </button>
      {moduleName && (
        <span style={{ fontSize: '11px', color: C.goldDim, fontFamily: C.mono, letterSpacing: '2px', textTransform: 'uppercase' }}>
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
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'none',
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius: '3px',
        color: hov ? C.gold : C.goldDim,
        padding: '9px 18px', cursor: 'pointer',
        fontFamily: C.mono, fontSize: '11px', letterSpacing: '1.5px',
        transition: 'all 0.15s',
      }}>
      ‹ {label}
    </button>
  );
}

export function ProgressSteps({ steps, current, onStepClick }) {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = done && onStepClick;
        return (
          <div key={i} onClick={() => clickable && onStepClick(i)}
            style={{ flex: 1, cursor: clickable ? 'pointer' : 'default' }}
            title={clickable ? `Return to ${label}` : ''}>
            <div style={{
              height: '3px', borderRadius: '2px',
              background: active ? C.gold : done ? C.goldDim : C.border,
              marginBottom: '6px', transition: 'background 0.2s',
            }} />
            <div style={{
              fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '1.5px',
              fontFamily: C.mono, transition: 'color 0.2s',
              color: active ? C.gold : done ? C.goldDim : 'rgba(196,168,130,0.3)',
              textDecoration: clickable ? 'underline' : 'none',
              textDecorationColor: 'rgba(196,168,130,0.3)',
            }}>
              {i + 1}. {label.toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProgressLoader({ steps, currentStep, message }) {
  return (
    <div style={{
      background: 'rgba(20,32,45,0.98)',
      border: `1px solid rgba(196,168,130,0.25)`,
      borderRadius: '4px',
      padding: '40px clamp(20px,4vw,48px)',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '12px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '32px' }}>
        {message || 'GENERATING...'}
      </div>
      {steps && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '400px', margin: '0 auto' }}>
          {steps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${done ? C.green : active ? C.gold : C.border}`,
                  background: done ? C.green : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: done ? '#0f1923' : active ? C.gold : C.goldDim,
                  transition: 'all 0.4s',
                }}>
                  {done ? '✓' : active ? '◉' : i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ height: '4px', background: 'rgba(196,168,130,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px', transition: 'width 0.6s ease',
                      background: done ? C.green : active ? C.gold : 'transparent',
                      width: done ? '100%' : active ? '65%' : '0%',
                    }} />
                  </div>
                </div>
                <div style={{
                  fontSize: '12px', fontFamily: C.mono, letterSpacing: '1px',
                  color: done ? C.green : active ? C.gold : C.goldDim,
                  minWidth: '160px', textAlign: 'left',
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
        width: '100%', background: 'rgba(196,168,130,0.05)',
        border: `1px solid ${C.border}`, borderRadius: open ? '3px 3px 0 0' : '3px',
        padding: '11px 16px', cursor: 'pointer', color: C.goldDim,
        fontFamily: C.mono, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
        transition: 'all 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,168,130,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(196,168,130,0.05)'}
      >
        <span>{title}</span>
        <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', fontSize: '14px' }}>▾</span>
      </button>
      {open && (
        <div style={{ border: `1px solid ${C.border}`, borderTop: 'none', borderRadius: '0 0 3px 3px', padding: '16px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function useUnsavedWarning(hasContent) {
  useEffect(() => {
    const handler = (e) => {
      if (hasContent) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasContent]);
}
