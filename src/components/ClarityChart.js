'use client';
import { useState } from 'react';
import { supabase } from './supabase-client';
import { C } from './tokens';
import AdmissionEngine from './AdmissionEngine';
import RNVisitNote from './RNVisitNote';
import RecertSuite from './RecertSuite';

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
        display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 18px', width: '100%',
        background: hov && active ? C.bgCardHover : C.bgCard,
        border: `1.5px solid ${hov && active ? C.gold : C.border}`,
        borderRadius: '6px', cursor: active ? 'pointer' : 'default',
        textAlign: 'left', transition: 'all 0.15s',
        opacity: mod.status === 'queued' ? 0.45 : 1, marginBottom: '4px',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 'clamp(18px, 1.5vw, 20px)', fontWeight: active ? '600' : 'normal', color: active ? C.text : C.textDim, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {mod.label}
          <span style={{ fontSize: '15px', color: sc.c, background: sc.bg, border: `1px solid ${sc.b}`, borderRadius: '10px', padding: '1px 7px', fontFamily: C.mono, letterSpacing: '1px' }}>
            {sc.l}
          </span>
        </div>
        <div style={{ fontSize: '17px', color: C.gold, fontStyle: 'italic' }}>{mod.desc}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}>
        {mod.outputs.map(o => (
          <span key={o} style={{ fontSize: '16px', color: '#b8966a', fontFamily: C.mono, fontWeight: '500', whiteSpace: 'nowrap' }}>→ {o}</span>
        ))}
      </div>
      {active && (
        <span style={{ color: hov ? C.gold : '#a09070', fontSize: '22px', marginLeft: '4px', transition: 'all 0.15s', transform: hov ? 'translateX(2px)' : 'none', display: 'inline-block' }}>›</span>
      )}
    </button>
  );
}

export default function ClarityChart() {
  const [view, setView] = useState('home');

  const handleSignOut = async () => {
    const { supabase } = await import('./supabase-client');
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (view === 'admission-engine') return <AdmissionEngine onBack={() => setView('home')} />;
  if (view === 'rn-visit-note') return <RNVisitNote onBack={() => setView('home')} />;
  if (view === 'recert-suite') return <RecertSuite onBack={() => setView('home')} />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.sans, color: C.text }}>
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(196,168,130,0.2); border-radius: 3px; }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `linear-gradient(${C.goldFaint} 1px,transparent 1px),linear-gradient(90deg,${C.goldFaint} 1px,transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none', opacity: 0.4 }} />

      <div style={{ position: 'relative', maxWidth: '1060px', margin: '0 auto', padding: '0 32px 60px' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '36px 0 28px', borderBottom: `1px solid ${C.border}`, marginBottom: '44px' }}>
          <div>
            <div style={{ fontSize: '16px', letterSpacing: '4px', color: '#c8b8a4', fontFamily: C.mono, marginBottom: '4px' }}>CLINICAL DOCUMENTATION PLATFORM</div>
            <div style={{ fontSize: 'clamp(28px, 3vw, 38px)', color: C.text }}>Clarity<span style={{ color: C.gold }}>Chart</span></div>
            <div style={{ fontSize: '20px', color: '#9a8c78', marginTop: '8px', fontStyle: 'italic', fontFamily: C.sans, fontWeight: '400' }}>Built exclusively for hospice</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(196,168,130,0.08)', border: `1px solid ${C.border}`, borderRadius: '20px', padding: '5px 14px', fontSize: '15px', color: C.gold, fontFamily: C.mono }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
              Admission Engine Online
            </div>
            <button onClick={handleSignOut} style={{
              background: 'none', border: '1px solid rgba(196,168,130,0.3)',
              borderRadius: '4px', color: '#9a8c78', cursor: 'pointer',
              fontFamily: C.mono, fontSize: '12px', letterSpacing: '1px',
              padding: '5px 12px', transition: 'all 0.15s',
            }}>SIGN OUT</button>
          </div>
        </header>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(196,168,130,0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '44px' }}>
          {[{ v: '1', l: 'Module Ready' }, { v: '6', l: 'Record Types' }, { v: '2', l: 'Documents Out' }, { v: '< 60s', l: 'Demo Time' }].map((s, i) => (
            <div key={i} style={{ background: C.bg, padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', color: C.gold, fontStyle: 'italic', marginBottom: '4px' }}>{s.v}</div>
              <div style={{ fontSize: '14px', letterSpacing: '2px', color: C.textFaint, textTransform: 'uppercase', fontFamily: C.mono }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div style={{ fontSize: '17px', letterSpacing: '3px', color: '#d4b896', fontFamily: C.mono, fontWeight: 'bold', marginBottom: '18px' }}>DOCUMENTATION MODULES</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>

          {/* Admission Pathway */}
          <div style={{ background: '#2d4460', border: `1px solid rgba(196,168,130,0.25)`, borderRadius: '6px' }}>
            <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,168,130,0.1)', border: `1px solid rgba(196,168,130,0.25)`, borderRadius: '6px', fontSize: '18px' }}>✦</div>
              <div>
                <div style={{ fontSize: 'clamp(18px, 1.5vw, 20px)', color: C.text }}>Admission Pathway</div>
                <div style={{ fontSize: '18px', color: C.gold, fontFamily: C.mono }}>New patient enrollment</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px' }}>
              <ModCard mod={{ label: 'Admission Engine', desc: 'Narrative + CTI from uploaded records', status: 'complete', outputs: ['Admission Narrative', 'CTI'] }} onClick={() => setView('admission-engine')} />
              <div style={{ fontSize: '16px', color: '#a09070', fontFamily: C.mono, letterSpacing: '1px', padding: '6px 14px 4px' }}>RECORDS → ENCOUNTER → NARRATIVE + CTI</div>
            </div>
          </div>

          {/* Ongoing Care Pathway */}
          <div style={{ background: '#2d4460', border: `1px solid rgba(196,168,130,0.25)`, borderRadius: '6px' }}>
            <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(74,144,164,0.15)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.blueDim, border: `1px solid ${C.blueBorder}`, borderRadius: '6px', fontSize: '18px' }}>◎</div>
              <div>
                <div style={{ fontSize: 'clamp(18px, 1.5vw, 20px)', color: C.text }}>Ongoing Care Pathway</div>
                <div style={{ fontSize: '16px', color: '#5aaac0', fontFamily: C.mono }}>Visit notes · Recertification</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px' }}>
              {[
                { label: 'RN Visit Note', desc: '10 clinical scenarios, voice or text', status: 'complete', outputs: ['Structured Visit Note'] },
                { label: 'Recertification Suite', desc: 'RN → MD sequential pipeline', status: 'complete', outputs: ['RN Recert', 'Physician Recert'] },
                
              ].map(mod => <ModCard key={mod.label} mod={mod} onClick={mod.status === 'complete' ? () => setView(mod.label === 'RN Visit Note' ? 'rn-visit-note' : mod.label === 'Recertification Suite' ? 'recert-suite' : null) : null} />)}
              <div style={{ fontSize: '16px', color: '#a09070', fontFamily: C.mono, letterSpacing: '1px', padding: '6px 14px 4px' }}>VISIT NOTES → RN RECERT → MD RECERT</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid rgba(196,168,130,0.1)`, marginTop: '48px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '15px', color: 'rgba(196,168,130,0.4)', fontFamily: C.mono }}>CLARITYCHART · HOSPICE DOCUMENTATION PLATFORM · BETA</div>
          <div style={{ fontSize: '15px', color: 'rgba(196,168,130,0.4)', fontFamily: C.mono }}>FOR CLINICAL USE · NOT FOR DIAGNOSTIC DECISIONS</div>
        </div>
      </div>
    </div>
  );
}
