'use client';
import { useState } from 'react';
import { C } from './tokens';
import AdmissionEngine from './AdmissionEngine';

function ModCard({ mod, onClick }) {
  const [hov, setHov] = useState(false);
  const active = mod.status === 'complete';
  const sc = {
    complete: { l: 'Ready', c: C.green, bg: C.greenDim, b: C.greenBorder },
    soon: { l: 'Coming Soon', c: C.blue, bg: C.blueDim, b: C.blueBorder },
    queued: { l: 'Planned', c: 'rgba(138,138,154,0.8)', bg: 'rgba(138,138,154,0.08)', b: 'rgba(138,138,154,0.2)' },
  }[mod.status];

  return (
    <button
      onClick={active ? onClick : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', width: '100%',
        background: hov && active ? C.bgCardHover : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hov && active ? C.borderHover : C.border}`,
        borderRadius: '2px', cursor: active ? 'pointer' : 'default',
        textAlign: 'left', transition: 'all 0.15s',
        opacity: mod.status === 'queued' ? 0.45 : 1, marginBottom: '4px',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '13px', color: active ? C.text : C.textDim, marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {mod.label}
          <span style={{ fontSize: '9px', color: sc.c, background: sc.bg, border: `1px solid ${sc.b}`, borderRadius: '10px', padding: '1px 7px', fontFamily: C.mono, letterSpacing: '1px' }}>
            {sc.l}
          </span>
        </div>
        <div style={{ fontSize: '11px', color: C.goldDim, fontStyle: 'italic' }}>{mod.desc}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}>
        {mod.outputs.map(o => (
          <span key={o} style={{ fontSize: '9px', color: 'rgba(196,168,130,0.35)', fontFamily: C.mono, whiteSpace: 'nowrap' }}>→ {o}</span>
        ))}
      </div>
      {active && (
        <span style={{ color: hov ? C.gold : C.border, fontSize: '16px', marginLeft: '4px', transition: 'all 0.15s', transform: hov ? 'translateX(2px)' : 'none', display: 'inline-block' }}>›</span>
      )}
    </button>
  );
}

export default function ClarityChart() {
  const [view, setView] = useState('home');

  if (view === 'admission-engine') return <AdmissionEngine onBack={() => setView('home')} />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(196,168,130,0.2); border-radius: 3px; }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `linear-gradient(${C.goldFaint} 1px,transparent 1px),linear-gradient(90deg,${C.goldFaint} 1px,transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none', opacity: 0.4 }} />

      <div style={{ position: 'relative', maxWidth: '1060px', margin: '0 auto', padding: '0 32px 60px' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '36px 0 28px', borderBottom: `1px solid ${C.border}`, marginBottom: '44px' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '4px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>CLINICAL DOCUMENTATION PLATFORM</div>
            <div style={{ fontSize: '26px', color: C.text }}>Clarity<span style={{ color: C.gold }}>Chart</span></div>
            <div style={{ fontSize: '12px', color: 'rgba(196,168,130,0.45)', marginTop: '4px', fontStyle: 'italic' }}>Built exclusively for hospice</div>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(196,168,130,0.08)', border: `1px solid ${C.border}`, borderRadius: '20px', padding: '5px 14px', fontSize: '11px', color: C.gold, fontFamily: C.mono }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
            Admission Engine Online
          </div>
        </header>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(196,168,130,0.1)', borderRadius: '2px', overflow: 'hidden', marginBottom: '44px' }}>
          {[{ v: '1', l: 'Module Ready' }, { v: '6', l: 'Record Types' }, { v: '2', l: 'Documents Out' }, { v: '< 60s', l: 'Demo Time' }].map((s, i) => (
            <div key={i} style={{ background: C.bg, padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', color: C.gold, fontStyle: 'italic', marginBottom: '4px' }}>{s.v}</div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: C.goldDim, textTransform: 'uppercase', fontFamily: C.mono }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '18px' }}>DOCUMENTATION MODULES</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>

          {/* Admission Pathway */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px' }}>
            <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,168,130,0.1)', border: `1px solid rgba(196,168,130,0.25)`, borderRadius: '2px', fontSize: '14px' }}>✦</div>
              <div>
                <div style={{ fontSize: '13px', color: C.text }}>Admission Pathway</div>
                <div style={{ fontSize: '10px', color: C.goldDim, fontFamily: C.mono }}>New patient enrollment</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px' }}>
              <ModCard mod={{ label: 'Admission Engine', desc: 'Narrative + CTI from uploaded records', status: 'complete', outputs: ['Admission Narrative', 'CTI'] }} onClick={() => setView('admission-engine')} />
              <div style={{ fontSize: '10px', color: 'rgba(196,168,130,0.25)', fontFamily: C.mono, letterSpacing: '1px', padding: '6px 14px 4px' }}>RECORDS → ENCOUNTER → NARRATIVE + CTI</div>
            </div>
          </div>

          {/* Ongoing Care Pathway */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px' }}>
            <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(74,144,164,0.15)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.blueDim, border: `1px solid ${C.blueBorder}`, borderRadius: '2px', fontSize: '14px' }}>◎</div>
              <div>
                <div style={{ fontSize: '13px', color: C.text }}>Ongoing Care Pathway</div>
                <div style={{ fontSize: '10px', color: 'rgba(74,144,164,0.5)', fontFamily: C.mono }}>Visit notes · Recertification</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px' }}>
              {[
                { label: 'RN Visit Note', desc: '10 clinical scenarios, voice or text', status: 'soon', outputs: ['Structured Visit Note'] },
                { label: 'Recertification Suite', desc: 'RN → MD sequential pipeline', status: 'soon', outputs: ['RN Recert', 'Physician Recert'] },
                { label: 'Face-to-Face Note', desc: 'Physician attestation document', status: 'queued', outputs: ['F2F Visit Note'] },
              ].map(mod => <ModCard key={mod.label} mod={mod} onClick={null} />)}
              <div style={{ fontSize: '10px', color: 'rgba(196,168,130,0.25)', fontFamily: C.mono, letterSpacing: '1px', padding: '6px 14px 4px' }}>VISIT NOTES → RN RECERT → MD RECERT</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid rgba(196,168,130,0.1)`, marginTop: '48px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '10px', color: 'rgba(196,168,130,0.2)', fontFamily: C.mono }}>CLARITYCHART · HOSPICE DOCUMENTATION PLATFORM · BETA</div>
          <div style={{ fontSize: '10px', color: 'rgba(196,168,130,0.2)', fontFamily: C.mono }}>FOR CLINICAL USE · NOT FOR DIAGNOSTIC DECISIONS</div>
        </div>
      </div>
    </div>
  );
}
