'use client';
import { useState, useRef } from 'react';
import { C } from './tokens';

export function Textarea({ value, onChange, placeholder, rows = 4, mono }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%', background: 'rgba(0,0,0,0.3)', border: `1px solid ${C.border}`,
        borderRadius: '2px', color: C.text, padding: '12px 14px',
        fontFamily: mono ? C.mono : C.serif, fontSize: mono ? '11px' : '13px',
        lineHeight: 1.6, resize: 'vertical', outline: 'none', boxSizing: 'border-box',
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
        width: '100%', background: 'rgba(0,0,0,0.3)', border: `1px solid ${C.border}`,
        borderRadius: '2px', color: C.text, padding: '10px 14px',
        fontFamily: C.serif, fontSize: '13px', outline: 'none', boxSizing: 'border-box',
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
    primary: { background: disabled ? 'rgba(196,168,130,0.3)' : hov ? '#d4b892' : C.gold, color: '#0f1923', border: 'none' },
    secondary: { background: hov ? 'rgba(196,168,130,0.08)' : 'transparent', color: C.gold, border: `1px solid ${hov ? C.borderHover : C.border}` },
    ghost: { background: 'transparent', color: C.goldDim, border: 'none' },
    danger: { background: 'transparent', color: '#e07070', border: '1px solid rgba(224,112,112,0.3)' },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '10px 22px', borderRadius: '2px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: C.mono, fontSize: '11px', letterSpacing: '2px',
        textTransform: 'uppercase', transition: 'all 0.15s',
        opacity: disabled ? 0.45 : 1,
        ...variants[variant], ...style,
      }}
    >
      {children}
    </button>
  );
}

// Standardized voice button — consistent across all modules
export function VoiceBtn({ onTranscript, label = 'Dictate' }) {
  const [on, setOn] = useState(false);
  const [supported, setSupported] = useState(true);
  const ref = useRef(null);

  const toggle = () => {
    if (on) { ref.current?.stop(); setOn(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      alert('Voice input requires Chrome or Edge browser. Please switch browsers or type your response.');
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
    <button
      onClick={toggle}
      title={on ? 'Stop recording' : 'Click to dictate'}
      style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        background: on ? 'rgba(220,80,80,0.12)' : 'rgba(196,168,130,0.08)',
        border: `1px solid ${on ? 'rgba(220,80,80,0.5)' : C.border}`,
        borderRadius: '2px', color: on ? '#e07070' : C.gold,
        padding: '7px 14px', cursor: 'pointer', fontFamily: C.mono,
        fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
        transition: 'all 0.15s', whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
        background: on ? '#e07070' : C.gold,
        boxShadow: on ? '0 0 0 2px rgba(220,80,80,0.3)' : 'none',
        animation: on ? 'voicePulse 1s infinite' : 'none',
      }} />
      {on ? 'Stop' : `🎙 ${label}`}
    </button>
  );
}

// Improved error display — more prominent
export function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div style={{
      background: 'rgba(224,112,112,0.1)', border: '1px solid rgba(224,112,112,0.4)',
      borderLeft: '3px solid #e07070', borderRadius: '2px',
      padding: '12px 16px', color: '#e07070', fontSize: '13px',
      fontFamily: C.serif, marginBottom: '20px', lineHeight: 1.5,
      display: 'flex', alignItems: 'flex-start', gap: '10px',
    }}>
      <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠</span>
      <span>{message}</span>
    </div>
  );
}

// Document output with improved copy confirmation
export function DocOutput({ title, content, badge }) {
  const [copyState, setCopyState] = useState('idle'); // idle | copying | copied

  const copy = async () => {
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(content);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 3000);
    } catch {
      setCopyState('idle');
    }
  };

  const rendered = content.split('\n').map((line, i) => {
    line = line.replace(/\*\*/g, '').replace(/\*/g, '');
    const isHeader = /^[A-Z][A-Z\s\/\(\)\-,:.]{4,}$/.test(line.trim()) && line.trim().length > 3;
    if (isHeader) return (
      <div key={i} style={{
        color: C.gold, fontFamily: C.mono, fontSize: '11px', letterSpacing: '2px',
        marginTop: '22px', marginBottom: '6px', paddingBottom: '4px',
        borderBottom: `1px solid rgba(196,168,130,0.15)`,
      }}>{line}</div>
    );
    if (!line.trim()) return <div key={i} style={{ height: '7px' }} />;
    return <div key={i} style={{ color: C.textDim, fontSize: '14px', lineHeight: 1.8 }}>{line}</div>;
  });

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: '2px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 20px', borderBottom: `1px solid ${C.border}`,
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: '14px' }}>{title}</span>
          {badge && (
            <span style={{
              fontSize: '9px', color: C.green, background: C.greenDim,
              border: `1px solid ${C.greenBorder}`, borderRadius: '10px',
              padding: '2px 8px', fontFamily: C.mono, letterSpacing: '1px',
            }}>{badge}</span>
          )}
        </div>
        <button
          onClick={copy}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 16px', borderRadius: '2px',
            border: `1px solid ${copyState === 'copied' ? C.greenBorder : C.border}`,
            background: copyState === 'copied' ? C.greenDim : 'transparent',
            color: copyState === 'copied' ? C.green : C.gold,
            cursor: 'pointer', fontFamily: C.mono, fontSize: '10px',
            letterSpacing: '1px', transition: 'all 0.2s',
          }}
        >
          {copyState === 'copied' ? (
            <><span>✓</span> Copied to clipboard</>
          ) : copyState === 'copying' ? (
            'Copying...'
          ) : (
            <><span>⎘</span> Copy</>
          )}
        </button>
      </div>
      <div style={{ padding: '20px 24px', maxHeight: '560px', overflowY: 'auto', fontFamily: C.serif }}>
        {rendered}
      </div>
    </div>
  );
}

// Persistent top navigation bar
export function TopNav({ onHome, moduleName }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(15,25,35,0.95)', backdropFilter: 'blur(8px)',
      borderBottom: `1px solid rgba(196,168,130,0.12)`,
      padding: '0 32px', height: '52px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <button
        onClick={onHome}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        <span style={{ fontSize: '16px', color: C.text, fontFamily: C.serif }}>
          Clarity<span style={{ color: C.gold }}>Chart</span>
        </span>
        <span style={{
          fontSize: '9px', color: 'rgba(196,168,130,0.4)',
          fontFamily: C.mono, letterSpacing: '1px', paddingLeft: '10px',
          borderLeft: `1px solid rgba(196,168,130,0.2)`,
        }}>
          HOME
        </span>
      </button>
      {moduleName && (
        <span style={{
          fontSize: '10px', color: C.goldDim, fontFamily: C.mono,
          letterSpacing: '2px', textTransform: 'uppercase',
        }}>
          {moduleName}
        </span>
      )}
    </div>
  );
}

// Hook to warn before leaving with unsaved content
export function useUnsavedWarning(hasContent) {
  if (typeof window !== 'undefined') {
    window.onbeforeunload = hasContent ? () => 'You have unsaved content. Are you sure you want to leave?' : null;
  }
}

// Collapsible section component
export function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', background: 'rgba(196,168,130,0.04)',
          border: `1px solid ${C.border}`, borderRadius: '2px',
          padding: '10px 16px', cursor: 'pointer', color: C.goldDim,
          fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px',
          textTransform: 'uppercase', transition: 'all 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,168,130,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(196,168,130,0.04)'}
      >
        <span>{title}</span>
        <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', fontSize: '12px' }}>▾</span>
      </button>
      {open && (
        <div style={{ border: `1px solid ${C.border}`, borderTop: 'none', borderRadius: '0 0 2px 2px', padding: '16px' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// Progress bar loader — replaces spinner
export function ProgressLoader({ steps, currentStep, message }) {
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: '2px', padding: '32px 40px', textAlign: 'center',
    }}>
      <div style={{ fontSize: '12px', letterSpacing: '2px', color: C.gold, fontFamily: C.mono, marginBottom: '24px' }}>
        {message || 'GENERATING...'}
      </div>
      {steps && steps.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '360px', margin: '0 auto 24px' }}>
          {steps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${done ? C.green : active ? C.gold : C.border}`,
                  background: done ? C.green : active ? 'rgba(196,168,130,0.15)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: done ? '#0f1923' : active ? C.gold : C.goldDim,
                  transition: 'all 0.3s',
                }}>
                  {done ? '✓' : i + 1}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ height: '3px', background: C.border, borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '2px', transition: 'width 0.5s ease',
                      background: done ? C.green : active ? C.gold : 'transparent',
                      width: done ? '100%' : active ? '60%' : '0%',
                    }} />
                  </div>
                </div>
                <div style={{
                  fontSize: '11px', fontFamily: C.mono, letterSpacing: '1px',
                  color: done ? C.green : active ? C.gold : C.goldDim,
                  minWidth: '140px', textAlign: 'left',
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

// Editable draft — plain text, clean paste into EHR
export function EditableDraft({ title, value, onChange, badge }) {
  const [copied, setCopied] = useState('idle');

  const copy = async () => {
    setCopied('copying');
    try {
      await navigator.clipboard.writeText(value);
      setCopied('copied');
      setTimeout(() => setCopied('idle'), 3000);
    } catch { setCopied('idle'); }
  };

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: '2px', overflow: 'hidden', marginBottom: '24px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 20px', borderBottom: `1px solid ${C.border}`,
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: '14px' }}>{title}</span>
          {badge && <span style={{ fontSize: '9px', color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: '10px', padding: '2px 8px', fontFamily: C.mono }}>{badge}</span>}
          <span style={{ fontSize: '10px', color: C.goldDim, fontFamily: C.mono, letterSpacing: '1px' }}>✎ editable</span>
        </div>
        <button onClick={copy} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 16px',
          borderRadius: '2px', border: `1px solid ${copied === 'copied' ? C.greenBorder : C.border}`,
          background: copied === 'copied' ? C.greenDim : 'transparent',
          color: copied === 'copied' ? C.green : C.gold,
          cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '1px', transition: 'all 0.2s',
        }}>
          {copied === 'copied' ? '✓ Copied to clipboard' : copied === 'copying' ? 'Copying...' : '⎘ Copy'}
        </button>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', minHeight: '400px', background: 'transparent',
          border: 'none', outline: 'none', padding: '20px 24px',
          color: C.textDim, fontSize: '14px', lineHeight: 1.8,
          fontFamily: C.serif, resize: 'vertical', boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

// Consistent back button for all pages
export function BackBtn({ onClick, label = 'Back' }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'none', border: `1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius: '2px', color: hov ? C.gold : C.goldDim,
        padding: '8px 16px', cursor: 'pointer', fontFamily: C.mono,
        fontSize: '11px', letterSpacing: '1.5px', transition: 'all 0.15s',
      }}
    >
      ‹ {label}
    </button>
  );
}

// Clickable progress steps
export function ProgressSteps({ steps, current, onStepClick }) {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '32px' }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = done && onStepClick;
        return (
          <div
            key={i}
            onClick={() => clickable && onStepClick(i)}
            style={{ flex: 1, cursor: clickable ? 'pointer' : 'default' }}
            title={clickable ? `Go back to ${label}` : ''}
          >
            <div style={{
              height: '3px',
              background: active ? C.gold : done ? C.goldDim : C.border,
              marginBottom: '6px', borderRadius: '2px', transition: 'background 0.2s',
            }} />
            <div style={{
              fontSize: '9px', letterSpacing: '1.5px', fontFamily: C.mono,
              color: active ? C.gold : done ? C.goldDim : 'rgba(196,168,130,0.25)',
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
