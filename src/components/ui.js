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
      }}
      onFocus={e => e.target.style.borderColor = C.gold}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

export function Btn({ children, onClick, variant = 'primary', disabled, style }) {
  const variants = {
    primary: { background: C.gold, color: '#0f1923', border: 'none' },
    secondary: { background: 'transparent', color: C.gold, border: `1px solid ${C.border}` },
    ghost: { background: 'transparent', color: C.goldDim, border: 'none' },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        padding: '10px 22px', borderRadius: '2px', cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: C.mono, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
        transition: 'all 0.15s', opacity: disabled ? 0.4 : 1, ...variants[variant], ...style,
      }}
    >
      {children}
    </button>
  );
}

export function VoiceBtn({ onTranscript }) {
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  const toggle = () => {
    if (on) { ref.current?.stop(); setOn(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice input requires Chrome or Edge.'); return; }
    const r = new SR();
    r.continuous = true; r.interimResults = false;
    r.onresult = e => onTranscript(Array.from(e.results).map(x => x[0].transcript).join(' '));
    r.onend = () => setOn(false);
    r.start(); ref.current = r; setOn(true);
  };
  return (
    <button onClick={toggle} style={{
      background: on ? 'rgba(220,80,80,0.15)' : 'rgba(196,168,130,0.08)',
      border: `1px solid ${on ? 'rgba(220,80,80,0.4)' : C.border}`,
      borderRadius: '2px', color: on ? '#e07070' : C.goldDim,
      padding: '6px 14px', cursor: 'pointer', fontFamily: C.mono,
      fontSize: '10px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px',
    }}>
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: on ? '#e07070' : C.goldDim,
        boxShadow: on ? '0 0 6px #e07070' : 'none',
      }} />
      {on ? 'STOP' : 'DICTATE'}
    </button>
  );
}

export function DocOutput({ title, content }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', overflow: 'hidden', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: C.text, fontSize: '14px' }}>{title}</span>
          <span style={{ fontSize: '9px', color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: '10px', padding: '2px 8px', fontFamily: C.mono, letterSpacing: '1px' }}>COMPLETE</span>
        </div>
        <Btn variant="secondary" onClick={copy} style={{ padding: '5px 14px', fontSize: '10px' }}>
          {copied ? '✓ Copied' : 'Copy'}
        </Btn>
      </div>
      <div style={{ padding: '20px 24px', maxHeight: '480px', overflowY: 'auto', fontFamily: C.serif }}>
        {content.split('\n').map((line, i) => {
          const isHeader = /^[A-Z][A-Z\s\/\(\)\-,]{4,}$/.test(line.trim()) && line.trim().length > 3;
          if (isHeader) return (
            <div key={i} style={{ color: C.gold, fontFamily: C.mono, fontSize: '11px', letterSpacing: '2px', marginTop: '22px', marginBottom: '6px', paddingBottom: '4px', borderBottom: `1px solid ${C.goldFaint}` }}>
              {line}
            </div>
          );
          if (!line.trim()) return <div key={i} style={{ height: '6px' }} />;
          return <div key={i} style={{ color: C.textDim, fontSize: '13px', lineHeight: 1.75 }}>{line}</div>;
        })}
      </div>
    </div>
  );
}
