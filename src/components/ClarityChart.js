'use client';
import { useState } from 'react';
import { supabase } from './supabase-client';
import { C } from './tokens';
import AdmissionEngine from './AdmissionEngine';
import RNVisitNote from './RNVisitNote';
import RecertSuite from './RecertSuite';

function OutputTag({ label }) {
  return (
    <span style={{
      fontSize: '13px', color: C.gold,
      background: 'rgba(196,168,130,0.12)',
      border: `1px solid ${C.goldBorder}`,
      borderRadius: '4px', padding: '3px 10px',
      fontFamily: C.mono, whiteSpace: 'nowrap', fontWeight: '500',
    }}>
      {label}
    </span>
  );
}

function FlowLine({ steps, outputs }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px 4px', flexWrap: 'wrap' }}>
      {steps.map((step, i) => (
        <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: C.textFaint, fontFamily: C.mono }}>{step}</span>
          <span style={{ fontSize: '13px', color: 'rgba(196,168,130,0.35)' }}>›</span>
        </span>
      ))}
      <span style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap' }}>
        {outputs.map(o => <OutputTag key={o} label={o} />)}
      </span>
    </div>
  );
}

function ModCard({ mod, onClick }) {
  const [hov, setHov] = useState(false);
  const active = mod.status === 'complete';
  const sc = {
    soon: { l: 'Coming Soon', c: C.blue, bg: C.blueDim, b: C.blueBorder },
    queued: { l: 'Planned', c: 'rgba(138,138,154,0.8)', bg: 'rgba(138,138,154,0.08)', b: 'rgba(138,138,154,0.2)' },
  }[mod.status];

  return (
    <button
      onClick={active ? onClick : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '16px 18px', width: '100%',
        background: hov && active ? C.bgCardHover : 'transparent',
        border: `1px solid ${hov && active ? C.goldBorder : 'transparent'}`,
        borderRadius: '6px', cursor: active ? 'pointer' : 'default',
        textAlign: 'left', transition: 'all 0.15s',
        opacity: active ? 1 : 0.4,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '19px', fontWeight: '600', color: active ? C.text : C.textDim }}>
            {mod.label}
          </span>
          {sc && (
            <span style={{ fontSize: '12px', color: sc.c, background: sc.bg, border: `1px solid ${sc.b}`, borderRadius: '10px', padding: '1px 8px', fontFamily: C.mono, whiteSpace: 'nowrap' }}>
              {sc.l}
            </span>
          )}
        </div>
        <div style={{ fontSize: '16px', color: C.textFaint }}>{mod.desc}</div>
      </div>
      {active && (
        <span style={{ color: hov ? C.gold : C.textFaint, fontSize: '22px', flexShrink: 0, transition: 'all 0.15s', transform: hov ? 'translateX(2px)' : 'none', display: 'inline-block' }}>›</span>
      )}
    </button>
  );
}

export default function ClarityChart() {
  const [view, setView] = useState('home');
  const [signOutHov, setSignOutHov] = useState(false);

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
      <div style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 32px 64px' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '40px 0 28px', borderBottom: `1px solid ${C.border}`, marginBottom: '44px' }}>
          <div>
            <div style={{ fontSize: '13px', letterSpacing: '4px', color: C.textFaint, fontFamily: C.mono, textTransform: 'uppercase', marginBottom: '6px' }}>Clinical Documentation Platform</div>
            <div style={{ fontSize: 'clamp(30px, 3.2vw, 42px)', color: C.text, fontFamily: C.serif, lineHeight: 1.1 }}>
              Clarity<span style={{ color: C.gold }}>Chart</span>
            </div>
            <div style={{ fontSize: '18px', color: C.textFaint, marginTop: '8px', fontStyle: 'italic' }}>Built exclusively for hospice</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleSignOut}
              onMouseEnter={() => setSignOutHov(true)}
              onMouseLeave={() => setSignOutHov(false)}
              style={{
                background: 'none',
                border: `1px solid ${signOutHov ? C.goldBorder : C.navBorder}`,
                borderRadius: '4px',
                color: signOutHov ? C.textDim : C.textFaint,
                cursor: 'pointer',
                fontFamily: C.mono, fontSize: '12px', letterSpacing: '1.5px',
                padding: '6px 14px', transition: 'all 0.15s', textTransform: 'uppercase',
              }}>Sign Out</button>
          </div>
        </header>

        {/* Module section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '14px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, textTransform: 'uppercase', fontWeight: '700' }}>Documentation Modules</div>
          <div style={{ flex: 1, height: '1px', background: C.navBorder }} />
        </div>

        {/* Modules grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>

          {/* Admission Pathway */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px 16px', borderBottom: `1px solid ${C.navBorder}`, display: 'flex', alignItems: 'center', gap: '14px', background: C.goldFaint }}>
              <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,168,130,0.1)', border: `1px solid ${C.goldBorder}`, borderRadius: '6px', fontSize: '18px', color: C.gold, flexShrink: 0 }}>✦</div>
              <div>
                <div style={{ fontSize: '20px', color: C.text, fontWeight: '600' }}>Admission Pathway</div>
                <div style={{ fontSize: '15px', color: C.goldDim, fontFamily: C.mono, marginTop: '2px' }}>New patient enrollment</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px 16px' }}>
              <ModCard
                mod={{ label: 'Admission Engine', desc: 'Generate documentation from chart records and encounter notes', status: 'complete' }}
                onClick={() => setView('admission-engine')}
              />
              <FlowLine
                steps={['Chart Records', 'Encounter Notes']}
                outputs={['Admission Narrative', 'CTI']}
              />
            </div>
          </div>

          {/* Ongoing Care Pathway */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px 16px', borderBottom: `1px solid rgba(90,170,192,0.15)`, display: 'flex', alignItems: 'center', gap: '14px', background: C.goldFaint }}>
              <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.blueDim, border: `1px solid ${C.blueBorder}`, borderRadius: '6px', fontSize: '18px', color: C.blue, flexShrink: 0 }}>◎</div>
              <div>
                <div style={{ fontSize: '20px', color: C.text, fontWeight: '600' }}>Ongoing Care Pathway</div>
                <div style={{ fontSize: '15px', color: C.blue, fontFamily: C.mono, marginTop: '2px' }}>Visit notes · Recertification</div>
              </div>
            </div>
            <div style={{ padding: '10px 12px 16px' }}>
              <ModCard
                mod={{ label: 'RN Visit Note', desc: '10 clinical scenarios, voice or text input', status: 'complete' }}
                onClick={() => setView('rn-visit-note')}
              />
              <FlowLine steps={['Clinical Scenario', 'Visit Details']} outputs={['Structured Visit Note']} />
              <div style={{ height: '1px', background: C.navBorder, margin: '10px 18px' }} />
              <ModCard
                mod={{ label: 'Recertification Suite', desc: 'Sequential RN → F2F → Physician workflow', status: 'complete' }}
                onClick={() => setView('recert-suite')}
              />
              <FlowLine steps={['Decline Assessment', 'F2F Encounter']} outputs={['RN Recert Narrative', 'Physician Recert Note']} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${C.navBorder}`, marginTop: '52px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: 'rgba(196,168,130,0.3)', fontFamily: C.mono, letterSpacing: '1.5px', textTransform: 'uppercase' }}>ClarityChart · Hospice Documentation Platform · Beta</div>
          <div style={{ fontSize: '13px', color: 'rgba(196,168,130,0.3)', fontFamily: C.mono, letterSpacing: '1px', textTransform: 'uppercase' }}>For Clinical Use · Not for Diagnostic Decisions</div>
        </div>
      </div>
    </div>
  );
}
