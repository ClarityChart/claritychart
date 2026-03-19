'use client';
import { useState } from 'react';
import { C } from './tokens';
import { Textarea, Input, Btn, VoiceBtn, DocOutput } from './ui';
import { DECLINE_DOMAINS, buildRNRecertSystem, buildMDRecertSystem } from './recertPrompts';

const EMPTY_INPUTS = {
  diagnosis: '', patientId: '', certPeriod: '', lastBaseline: '',
  fast: '', pps: '', kps: '', weight: '', vitals: '',
  nutritional: '', functional: '', cognitive: '', mobility: '',
  cardiopulmonary: '', skin: '', pain: '', sleep: '', psychosocial: '',
};

const EMPTY_MD = {
  mdObservations: '', f2fCompleted: false, f2fDate: '', f2fFindings: '',
};

export default function RecertSuite({ onBack }) {
  const [stage, setStage] = useState(1);
  const [inputs, setInputs] = useState(EMPTY_INPUTS);
  const [mdInputs, setMdInputs] = useState(EMPTY_MD);
  const [rnNarrative, setRnNarrative] = useState('');
  const [mdNote, setMdNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');

  const setField = (key, val) => setInputs(p => ({ ...p, [key]: val }));
  const setMdField = (key, val) => setMdInputs(p => ({ ...p, [key]: val }));
  const filledDomains = DECLINE_DOMAINS.filter(d => inputs[d.key]?.trim()).length;

  const reset = () => {
    setStage(1); setInputs(EMPTY_INPUTS); setMdInputs(EMPTY_MD);
    setRnNarrative(''); setMdNote(''); setError('');
  };

  const generateRNNarrative = async () => {
    if (!inputs.diagnosis.trim()) { setError('Physician admitting diagnosis is required.'); return; }
    if (filledDomains === 0) { setError('Please complete at least one decline domain.'); return; }
    setError(''); setLoading(true); setLoadingMsg('Generating RN Recertification Narrative...');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildRNRecertSystem(inputs),
          messages: [{ role: 'user', content: 'Generate the RN Recertification Narrative now.' }] }),
      });
      const d = await r.json();
      const text = d.content?.[0]?.text || '';
      if (!text) throw new Error('Empty response');
      setRnNarrative(text); setStage(2);
    } catch (e) {
      setError('Generation failed. Please try again.');
    } finally { setLoading(false); setLoadingMsg(''); }
  };

  const generateMDNote = async () => {
    setError(''); setLoading(true); setStage(4); setMdNote('');
    setLoadingMsg('Generating Physician Recertification Note...');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildMDRecertSystem({ ...inputs, ...mdInputs }, rnNarrative),
          messages: [{ role: 'user', content: 'Generate the Physician Recertification Note now.' }] }),
      });
      const d = await r.json();
      const text = d.content?.[0]?.text || '';
      if (!text) throw new Error('Empty response');
      setMdNote(text);
    } catch (e) {
      setError('Generation failed. Please try again.'); setStage(3);
    } finally { setLoading(false); setLoadingMsg(''); }
  };

  const stageLabels = ['RN Assessment', 'RN Review', 'Physician Input'];

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

        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
              ‹ PLATFORM HOME
            </button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>RECERTIFICATION SUITE</div>
            <div style={{ fontSize: '20px', color: C.text }}>
              {stage === 1 ? 'RN Assessment Input' : stage === 2 ? 'RN Narrative Review' : stage === 3 ? 'Physician Input' : 'Recertification Documents'}
            </div>
            <div style={{ fontSize: '12px', color: C.goldDim, marginTop: '4px', fontStyle: 'italic' }}>
              {stage === 1 && 'Complete decline domains to generate RN narrative'}
              {stage === 2 && 'Review and edit before advancing to physician stage'}
              {stage === 3 && 'Add physician observations to generate recertification note'}
              {stage === 4 && 'RN Recert Narrative + Physician Recertification Note'}
            </div>
          </div>
          <Btn variant="ghost" onClick={reset}>Reset</Btn>
        </div>

        {stage < 4 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {stageLabels.map((label, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: '2px', background: i + 1 <= stage ? C.gold : C.border, marginBottom: '5px' }} />
                <div style={{ fontSize: '10px', letterSpacing: '2px', fontFamily: C.mono, color: i + 1 === stage ? C.gold : i + 1 < stage ? C.goldDim : 'rgba(196,168,130,0.25)' }}>
                  {i + 1}. {label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        )}

        {stage === 2 && (
          <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '12px 18px', marginBottom: '24px', fontSize: '12px', color: C.goldDim, fontFamily: C.mono, lineHeight: 1.6 }}>
            ⚠ Review and edit the RN narrative below before proceeding. The physician note cannot be generated until this step is confirmed.
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>
            ⚠ {error}
          </div>
        )}

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

        {stage === 1 && !loading && (
          <div>
            <SectionLabel>Patient Information</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
              <Field label="Physician Admitting Diagnosis *">
                <Input value={inputs.diagnosis} onChange={v => setField('diagnosis', v)} placeholder="e.g., Alzheimer's dementia, end-stage" />
              </Field>
              <Field label="Patient Identifier">
                <Input value={inputs.patientId} onChange={v => setField('patientId', v)} placeholder="e.g., initials or MRN" />
              </Field>
              <Field label="Certification Period">
                <Input value={inputs.certPeriod} onChange={v => setField('certPeriod', v)} placeholder="e.g., 02/15/2026 - 04/15/2026" />
              </Field>
              <Field label="Last Recert Baseline">
                <Input value={inputs.lastBaseline} onChange={v => setField('lastBaseline', v)} placeholder="e.g., FAST 6d, PPS 40%, wt 118 lbs" />
              </Field>
            </div>
            <SectionLabel>Objective Data</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '16px' }}>
              <Field label="FAST Score"><Input value={inputs.fast} onChange={v => setField('fast', v)} placeholder="e.g., 6e" /></Field>
              <Field label="PPS %"><Input value={inputs.pps} onChange={v => setField('pps', v)} placeholder="e.g., 40%" /></Field>
              <Field label="KPS %"><Input value={inputs.kps} onChange={v => setField('kps', v)} placeholder="e.g., 40%" /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              <Field label="Weight / Trend"><Input value={inputs.weight} onChange={v => setField('weight', v)} placeholder="e.g., 106 lbs, down 4 lbs from last period" /></Field>
              <Field label="Vitals"><Input value={inputs.vitals} onChange={v => setField('vitals', v)} placeholder="e.g., BP 98/60, HR 72, RR 18, O2 94% RA" /></Field>
            </div>
            <SectionLabel>Decline Domain Assessment</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '2px', background: C.border, borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: C.gold, width: `${(filledDomains / DECLINE_DOMAINS.length) * 100}%`, transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontSize: '11px', fontFamily: C.mono, color: C.goldDim }}>{filledDomains}/{DECLINE_DOMAINS.length} domains</div>
            </div>
            {DECLINE_DOMAINS.map((domain) => (
              <div key={domain.key} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '1.5px', color: inputs[domain.key]?.trim() ? C.gold : C.textDim }}>
                    {inputs[domain.key]?.trim() ? '✓ ' : '○ '}{domain.label.toUpperCase()}
                  </div>
                  <VoiceBtn onTranscript={t => setField(domain.key, inputs[domain.key] ? inputs[domain.key] + ' ' + t : t)} />
                </div>
                <Textarea value={inputs[domain.key] || ''} onChange={v => setField(domain.key, v)} placeholder={domain.placeholder} rows={inputs[domain.key]?.trim() ? 3 : 2} />
              </div>
            ))}
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={generateRNNarrative} disabled={!inputs.diagnosis.trim() || filledDomains === 0} style={{ padding: '12px 32px' }}>
                Generate RN Narrative →
              </Btn>
            </div>
          </div>
        )}

        {stage === 2 && !loading && (
          <div>
            <div style={{ marginBottom: '8px', fontSize: '12px', color: C.goldDim }}>
              Edit the narrative below as needed. All changes will carry forward to the physician note.
            </div>
            <Textarea value={rnNarrative} onChange={setRnNarrative} rows={20} />
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Btn variant="secondary" onClick={() => setStage(1)}>← Edit Assessment</Btn>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '11px', color: C.goldDim, fontFamily: C.mono, fontStyle: 'italic' }}>Review complete?</div>
                <Btn onClick={() => setStage(3)} style={{ padding: '12px 32px' }}>Confirmed — Proceed to Physician →</Btn>
              </div>
            </div>
          </div>
        )}

        {stage === 3 && !loading && (
          <div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${C.border}`, borderRadius: '2px', marginBottom: '28px', overflow: 'hidden' }}>
              <div style={{ padding: '10px 18px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '1.5px', color: C.goldDim }}>RN NARRATIVE — CONFIRMED</div>
                <span style={{ fontSize: '9px', color: C.green, background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: '10px', padding: '2px 8px', fontFamily: C.mono }}>LOCKED</span>
              </div>
              <div style={{ padding: '16px 18px', maxHeight: '160px', overflowY: 'auto', fontSize: '12px', color: C.textDim, lineHeight: 1.6, fontFamily: C.serif }}>
                {rnNarrative.substring(0, 400)}...
              </div>
            </div>

            <SectionLabel>Face-to-Face Encounter</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <input type="checkbox" checked={mdInputs.f2fCompleted} onChange={e => setMdField('f2fCompleted', e.target.checked)}
                style={{ accentColor: C.gold, width: '16px', height: '16px', cursor: 'pointer' }} />
              <label style={{ fontSize: '13px', color: C.text, cursor: 'pointer' }} onClick={() => setMdField('f2fCompleted', !mdInputs.f2fCompleted)}>
                Face-to-face encounter completed this certification period
              </label>
            </div>
            {mdInputs.f2fCompleted && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '20px' }}>
                <Field label="F2F Date"><Input value={mdInputs.f2fDate} onChange={v => setMdField('f2fDate', v)} placeholder="e.g., 03/10/2026" /></Field>
                <Field label="F2F Clinical Findings">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1 }}><Textarea value={mdInputs.f2fFindings} onChange={v => setMdField('f2fFindings', v)} placeholder="Describe clinical findings..." rows={3} /></div>
                    <VoiceBtn onTranscript={t => setMdField('f2fFindings', mdInputs.f2fFindings ? mdInputs.f2fFindings + ' ' + t : t)} />
                  </div>
                </Field>
              </div>
            )}

            <SectionLabel>Additional Clinical Observations</SectionLabel>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div style={{ flex: 1 }}>
                <Textarea value={mdInputs.mdObservations} onChange={v => setMdField('mdObservations', v)} placeholder="Any additional physician observations not captured in the RN narrative..." rows={4} />
              </div>
              <VoiceBtn onTranscript={t => setMdField('mdObservations', mdInputs.mdObservations ? mdInputs.mdObservations + ' ' + t : t)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={() => setStage(2)}>← RN Review</Btn>
              <Btn onClick={generateMDNote} style={{ padding: '12px 32px' }}>Generate Physician Recert Note →</Btn>
            </div>
          </div>
        )}

        {stage === 4 && !loading && (
          <div>
            {rnNarrative && <DocOutput title="RN Recertification Narrative" content={rnNarrative} />}
            {mdNote && <DocOutput title="Physician Recertification Note" content={mdNote} />}
            {rnNarrative && mdNote && (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <Btn variant="secondary" onClick={() => setStage(3)}>← Edit Physician Input</Btn>
                <Btn variant="secondary" onClick={reset}>New Recertification</Btn>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, textTransform: 'uppercase', fontFamily: C.mono, borderBottom: `1px solid ${C.border}`, paddingBottom: '8px', marginBottom: '16px', marginTop: '28px' }}>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '1px', color: C.goldDim, marginBottom: '6px' }}>
        {label.toUpperCase()}
      </div>
      {children}
    </div>
  );
}
