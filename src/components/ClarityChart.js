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
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '14px 16px', width: '100%',
        background: hov && active ? C.bgCardHover : 'transparent',
        border: `1px solid ${hov && active ? C.goldBorder : 'transparent'}`,
        borderRadius: '6px', cursor: active ? 'pointer' : 'default',
        textAlign: 'left', transition: 'all 0.15s',
        opacity: mod.status === 'queued' ? 0.4 : 1,
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '16px', fontWeight: active ? '600' : 'normal', color: active ? C.text : C.textDim, marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {mod.label}
          <span style={{ fontSize: '11px', color: sc.c, background: sc.bg, border: `1px solid ${sc.b}`, borderRadius: '10px', padding: '1px 8px', fontFamily: C.mono, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
            {sc.l}
          </span>
        </div>
        <div style={{ fontSize: '14px', color: C.goldDim, fontStyle: 'italic' }}>{mod.desc}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', flexShrink: 0 }}>
        {mod.outputs.map(o => (
          <span key={o} style={{ fontSize: '12px', color: C.goldDim, fontFamily: C.mono, whiteSpace: 'nowrap' }}>→ {o}</span>
        ))}
      </div>
      {active && (
        <span style={{ color: hov ? C.gold : C.textFaint, fontSize: '20px', flexShrink: 0, transition: 'all 0.15s', transform: hov ? 'translateX(2px)' : 'none', display: 'inline-block' }}>›</span>
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
      {/* Subtle grid pattern */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `linear-gradient(${C.navBorder} 1px,transparent 1px),linear-gradient(90deg,${C.navBorder} 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none', opacity: 0.6 }} />

      <div style={{ position: 'relative', maxWidth: '1020px', margin: '0 auto', padding: '0 32px 64px' }}>

        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '40px 0 28px', borderBottom: `1px solid ${C.border}`, marginBottom: '40px' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '4px', color: C.textFaint, fontFamily: C.mono, textTransform: 'uppercase', marginBottom: '8px' }}>Clinical Documentation Platform</div>
            <div style={{ fontSize: 'clamp(30px, 3.2vw, 42px)', color: C.text, fontFamily: C.serif, lineHeight: 1.1 }}>
              Clarity<span style={{ color: C.gold }}>Chart</span>
            </div>
            <div style={{ fontSize: '16px', color: C.textFaint, marginTop: '8px', fontStyle: 'italic' }}>Built exclusively for hospice</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: C.goldFaint, border: `1px solid ${C.navBorder}`, borderRadius: '20px', padding: '6px 14px', fontSize: '13px', color: C.textDim, fontFamily: C.mono }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.green, boxShadow: `0 0 6px ${C.green}`, flexShrink: 0 }} />
              All systems online
            </div>
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
                fontFamily: C.mono, fontSize: '11px', letterSpacing: '1.5px',
                padding: '6px 12px', transition: 'all 0.15s', textTransform: 'uppercase',
              }}>Sign Out</button>
          </div>
        </header>

        {/* Module section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, textTransform: 'uppercase', fontWeight: '700' }}>Documentation Modules</div>
          <div style={{ flex: 1, height: '1px', background: C.navBorder }} />
        </div>

        {/* Modules grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

          {/* Admission Pathway */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px 14px', borderBottom: `1px solid ${C.navBorder}`, display: 'flex', alignItems: 'center', gap: '12px', background: C.goldFaint }}>
              <div style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,168,130,0.1)', border: `1px solid ${C.goldBorder}`, borderRadius: '6px', fontSize: '14px', color: C.gold, flexShrink: 0 }}>✦</div>
              <div>
                <div style={{ fontSize: '15px', color: C.text, fontWeight: '600', fontFamily: C.sans }}> Admission Pathway</div>
                <div style={{ fontSize: '12px', color: C.goldDim, fontFamily: C.mono, marginTop: '1px' }}>New patient enrollment</div>
              </div>
            </div>
            <div style={{ padding: '8px 10px 12px' }}>
              <ModCard mod={{ label: 'Admission Engine', desc: 'Narrative + CTI from uploaded records', status: 'complete', outputs: ['Admission Narrative', 'CTI'] }} onClick={() => setView('admission-engine')} />
              <div style={{ fontSize: '11px', color: C.textFaint, fontFamily: C.mono, letterSpacing: '1px', padding: '2px 16px 0', textTransform: 'uppercase' }}>Records → Encounter → Narrative + CTI</div>
            </div>
          </div>

          {/* Ongoing Care Pathway */}
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px 14px', borderBottom: `1px solid rgba(90,170,192,0.15)`, display: 'flex', alignItems: 'center', gap: '12px', background: C.goldFaint }}>
              <div style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.blueDim, border: `1px solid ${C.blueBorder}`, borderRadius: '6px', fontSize: '14px', color: C.blue, flexShrink: 0 }}>◎</div>
              <div>
                <div style={{ fontSize: '15px', color: C.text, fontWeight: '600', fontFamily: C.sans }}>Ongoing Care Pathway</div>
                <div style={{ fontSize: '12px', color: C.blue, fontFamily: C.mono, marginTop: '1px' }}>Visit notes · Recertification</div>
              </div>
            </div>
            <div style={{ padding: '8px 10px 12px' }}>
              {[
                { label: 'RN Visit Note', desc: '10 clinical scenarios, voice or text', status: 'complete', outputs: ['Structured Visit Note'] },
                { label: 'Recertification Suite', desc: 'RN → F2F → Physician pipeline', status: 'complete', outputs: ['RN Recert', 'Physician Recert'] },
              ].map(mod => (
                <ModCard
                  key={mod.label}
                  mod={mod}
                  onClick={mod.status === 'complete' ? () => setView(
                    mod.label === 'RN Visit Note' ? 'rn-visit-note' :
                    mod.label === 'Recertification Suite' ? 'recert-suite' : null
                  ) : null}
                />
              ))}
              <div style={{ fontSize: '11px', color: C.textFaint, fontFamily: C.mono, letterSpacing: '1px', padding: '2px 16px 0', textTransform: 'uppercase' }}>Visit Notes → RN Recert → MD Recert</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${C.navBorder}`, marginTop: '52px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '11px', color: 'rgba(196,168,130,0.3)', fontFamily: C.mono, letterSpacing: '1.5px', textTransform: 'uppercase' }}>ClarityChart · Hospice Documentation Platform · Beta</div>
          <div style={{ fontSize: '11px', color: 'rgba(196,168,130,0.3)', fontFamily: C.mono, letterSpacing: '1px', textTransform: 'uppercase' }}>For Clinical Use · Not for Diagnostic Decisions</div>
        </div>
      </div>
    </div>
  );
}
