'use client';
import { useState } from 'react';
import { C, DEMO } from './tokens';
import { Textarea, Input, Btn, VoiceBtn, DocOutput } from './ui';
import { buildNarrativeSystem, buildCTISystem } from './prompts';

const DOC_FIELDS = [
  { key: 'dischargeSummary', label: 'Discharge Summary' },
  { key: 'hp', label: 'History & Physical' },
  { key: 'palliativeCare', label: 'Palliative Care Note' },
  { key: 'specialistNote', label: 'Specialist Note' },
  { key: 'woundCare', label: 'Wound Care Note' },
  { key: 'labs', label: 'Lab Results' },
];

const EMPTY_DOCS = { dischargeSummary: '', hp: '', palliativeCare: '', specialistNote: '', woundCare: '', labs: '' };

export default function AdmissionEngine({ onBack }) {
  const [stage, setStage] = useState(1);
  const [primaryDx, setPrimaryDx] = useState('');
  const [secondaryDx, setSecondaryDx] = useState('');
  const [docs, setDocs] = useState(EMPTY_DOCS);
  const [encounter, setEncounter] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [narrative, setNarrative] = useState('');
  const [cti, setCti] = useState('');
  const [error, setError] = useState('');

  const loadDemo = () => {
    setPrimaryDx(DEMO.primaryDx);
    setSecondaryDx(DEMO.secondaryDx);
    setDocs(DEMO.docs);
    setEncounter(DEMO.encounter);
  };

  const reset = () => {
    setStage(1); setPrimaryDx(''); setSecondaryDx('');
    setDocs(EMPTY_DOCS); setEncounter('');
    setNarrative(''); setCti(''); setError('');
  };

  const docCount = Object.values(docs).filter(v => v.trim()).length;

  const generate = async () => {
    if (!primaryDx.trim() || !encounter.trim()) {
      setError('Primary diagnosis and encounter narrative are required.');
      return;
    }
    setError(''); setLoading(true); setStage(4); setNarrative(''); setCti('');
    try {
      setLoadingMsg('Generating Admission Narrative… (step 1 of 2)');
      const r1 = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: buildNarrativeSystem(primaryDx, secondaryDx, docs, encounter),
          messages: [{ role: 'user', content: 'Generate the Admission Narrative now.' }],
        }),
      });
      const d1 = await r1.json();
      const narr = d1.content?.[0]?.text || '';
      if (!narr) throw new Error('Empty narrative response');
      setNarrative(narr);

      setLoadingMsg('Generating Certificate of Terminal Illness… (step 2 of 2)');
      const r2 = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: buildCTISystem(primaryDx, secondaryDx, docs, encounter, narr),
          messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }],
        }),
      });
      const d2 = await r2.json();
      const ctiText = d2.content?.[0]?.text || '';
      if (!ctiText) throw new Error('Empty CTI response');
      setCti(ctiText);
    } catch (e) {
      setError('Generation failed: ' + e.message + '. Please try again.');
      setStage(3);
    } finally {
      setLoading(false); setLoadingMsg('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`
        textarea::placeholder, input::placeholder { color: rgba(196,168,130,0.3); }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(196,168,130,0.2); border-radius: 3px; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
      `}</style>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>

        {/* Header */}
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
              ‹ PLATFORM HOME
            </button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>ADMISSION ENGINE</div>
            <div style={{ fontSize: '20px', color: C.text }}>New Patient Admission</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Btn variant="secondary" onClick={loadDemo}>Load Demo Patient</Btn>
            {(stage > 1 || primaryDx) && <Btn variant="ghost" onClick={reset}>Reset</Btn>}
          </div>
        </div>

        {/* Progress bar */}
        {stage < 4 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {[{ n: 1, l: 'Diagnosis' }, { n: 2, l: 'Records' }, { n: 3, l: 'Encounter' }].map(s => (
              <div key={s.n} onClick={() => s.n < stage && setStage(s.n)} style={{ flex: 1, cursor: s.n < stage ? 'pointer' : 'default' }}>
                <div style={{ height: '2px', background: s.n <= stage ? C.gold : C.border, marginBottom: '5px' }} />
                <div style={{ fontSize: '10px', letterSpacing: '2px', fontFamily: C.mono, color: s.n === stage ? C.gold : s.n < stage ? C.goldDim : 'rgba(196,168,130,0.25)' }}>
                  {s.n}. {s.l.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>
            ⚠ {error}
          </div>
        )}

        {/* Stage 1: Diagnosis */}
        {stage === 1 && (
          <div>
            <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px', fontSize: '12px', color: C.goldDim, fontFamily: C.mono, lineHeight: 1.6 }}>
              ℹ The physician determines the primary terminal diagnosis. ClarityChart organizes all documentation around this diagnosis.
            </div>
            <div style={{ fontSize: '11px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>
              PRIMARY TERMINAL DIAGNOSIS <span style={{ color: '#e07070' }}>*</span>
            </div>
            <Input value={primaryDx} onChange={setPrimaryDx} placeholder="e.g., Chronic diastolic heart failure (HFpEF), end-stage" />
            <div style={{ fontSize: '11px', color: C.goldDim, fontFamily: C.mono, letterSpacing: '2px', marginTop: '22px', marginBottom: '8px' }}>
              SECONDARY / CONTRIBUTING DIAGNOSES
            </div>
            <Textarea value={secondaryDx} onChange={setSecondaryDx} placeholder="e.g., CKD stage 4, Type 2 diabetes mellitus, hypertension..." rows={3} />
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={() => { if (!primaryDx.trim()) { setError('Primary diagnosis is required.'); return; } setError(''); setStage(2); }}>
                Continue → Records
              </Btn>
            </div>
          </div>
        )}

        {/* Stage 2: Records */}
        {stage === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: C.goldDim }}>Paste text from available records. All fields optional.</div>
              <div style={{ fontSize: '11px', fontFamily: C.mono, color: docCount > 0 ? C.green : C.goldDim }}>{docCount}/6 loaded</div>
            </div>
            {DOC_FIELDS.map(({ key, label }) => (
              <div key={key} style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '1.5px', color: docs[key].trim() ? C.gold : C.textDim, marginBottom: '6px' }}>
                  {docs[key].trim() ? '✓ ' : '○ '}{label.toUpperCase()}
                </div>
                <Textarea value={docs[key]} onChange={v => setDocs(d => ({ ...d, [key]: v }))} placeholder={`Paste ${label}...`} rows={docs[key].trim() ? 4 : 2} mono />
              </div>
            ))}
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={() => setStage(1)}>← Back</Btn>
              <Btn onClick={() => setStage(3)}>Continue → Encounter</Btn>
            </div>
          </div>
        )}

        {/* Stage 3: Encounter */}
        {stage === 3 && (
          <div>
            <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px', fontSize: '12px', color: C.goldDim, fontFamily: C.mono, lineHeight: 1.6 }}>
              Describe findings from the admission visit — functional status, systems review, goals of care, FAST/PPS/KPS scores, family present. Voice or text.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '2px', color: C.gold }}>
                ADMISSION ENCOUNTER NARRATIVE <span style={{ color: '#e07070' }}>*</span>
              </div>
              <VoiceBtn onTranscript={t => setEncounter(p => p ? p + ' ' + t : t)} />
            </div>
            <Textarea value={encounter} onChange={setEncounter} placeholder="Dictate or type the admission encounter narrative..." rows={12} />
            <div style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginTop: '20px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: C.goldDim, fontFamily: C.mono, marginBottom: '10px' }}>READY TO GENERATE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: C.textDim }}>
                <div>Primary Dx: <span style={{ color: C.text }}>{primaryDx.substring(0, 40)}{primaryDx.length > 40 ? '...' : ''}</span></div>
                <div>Records: <span style={{ color: docCount > 0 ? C.green : C.textDim }}>{docCount} of 6 loaded</span></div>
                <div>Encounter: <span style={{ color: encounter.trim() ? C.green : '#e07070' }}>{encounter.trim() ? '✓ Ready' : '⚠ Required'}</span></div>
                <div>Output: <span style={{ color: C.gold }}>Narrative + CTI</span></div>
              </div>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={() => setStage(2)}>← Back</Btn>
              <Btn onClick={generate} disabled={!encounter.trim()} style={{ padding: '12px 32px' }}>
                Generate Documents →
              </Btn>
            </div>
          </div>
        )}

        {/* Stage 4: Output */}
        {stage === 4 && (
          <div>
            {loading && (
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '40px', textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '20px' }}>{loadingMsg}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ${i * 0.2}s infinite ease-in-out` }} />
                  ))}
                </div>
              </div>
            )}
            {narrative && <DocOutput title="Admission Narrative" content={narrative} />}
            {cti && <DocOutput title="Certificate of Terminal Illness" content={cti} />}
            {!loading && narrative && cti && (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <Btn variant="secondary" onClick={() => setStage(3)}>← Edit Inputs</Btn>
                <Btn variant="secondary" onClick={reset}>New Admission</Btn>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
