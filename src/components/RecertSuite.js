'use client';
import { useState } from 'react';
import { C } from './tokens';
import { Textarea, Input, Btn, VoiceBtn, DocOutput } from './ui';
import { DECLINE_DOMAINS, buildPriorExtractionSystem, buildRNRecertSystem, buildF2FSystem, buildMDRecertSystem } from './recertPrompts';

const EMPTY_INPUTS = {
  diagnosis: '', patientId: '', age: '', sex: '', certPeriod: '', lastBaseline: '',
  fast: '', pps: '', kps: '', weight: '', vitals: '',
  nutritional: '', functional: '', cognitive: '', mobility: '',
  cardiopulmonary: '', skin: '', pain: '', sleep: '', psychosocial: '',
};

const EMPTY_MD = { mdObservations: '', priorMDNote: '' };
const EMPTY_F2F = { f2fDate: '', f2fConductedBy: '', f2fFindings: '' };

export default function RecertSuite({ onBack }) {
  const [pathway, setPathway] = useState(null); // null=select, 'rn', 'f2f', 'md'

  if (pathway === 'rn') return <RNPathway onBack={() => setPathway(null)} onBackHome={onBack} />;
  if (pathway === 'f2f') return <F2FPathway onBack={() => setPathway(null)} onBackHome={onBack} />;
  if (pathway === 'md') return <MDPathway onBack={() => setPathway(null)} onBackHome={onBack} />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}`}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '48px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
            PLATFORM HOME
          </button>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>RECERTIFICATION SUITE</div>
          <div style={{ fontSize: '20px', color: C.text }}>Select Your Pathway</div>
          <div style={{ fontSize: '12px', color: C.goldDim, marginTop: '4px', fontStyle: 'italic' }}>Each clinician completes their portion independently</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <PathwayCard
            title="RN Recertification Note"
            role="Hospice RN"
            description="Complete the nine-domain decline assessment. Review and finalize the RN Recertification Narrative. Optionally paste a prior recert note for interval comparison."
            outputs={['RN Recertification Narrative']}
            color={C.gold}
            onClick={() => setPathway('rn')}
          />
          <PathwayCard
            title="Face-to-Face Encounter Note"
            role="Physician · NP · PA"
            description="Enter clinical findings from the face-to-face encounter. Generate the F2F attestation note confirming continued decline related to the terminal diagnosis."
            outputs={['Face-to-Face Encounter Note']}
            color={C.blue}
            onClick={() => setPathway('f2f')}
          />
          <PathwayCard
            title="Physician Recertification Note"
            role="Physician · Medical Director"
            description="Paste the completed RN Recert narrative and F2F note. Add any additional observations. Generate the Physician Recertification Note synthesizing both documents."
            outputs={['Physician Recertification Note']}
            color={C.green}
            onClick={() => setPathway('md')}
          />
        </div>
      </div>
    </div>
  );
}

function PathwayCard({ title, role, description, outputs, color, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px', background: hov ? C.bgCardHover : C.bgCard, border: `1px solid ${hov ? C.borderHover : C.border}`, borderRadius: '2px', cursor: 'pointer', transition: 'all 0.15s' }}>
      <div style={{ width: '4px', alignSelf: 'stretch', background: color, borderRadius: '2px', flexShrink: 0, opacity: 0.6 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <div style={{ fontSize: '15px', color: C.text }}>{title}</div>
          <span style={{ fontSize: '10px', color: color, background: `${color}18`, border: `1px solid ${color}40`, borderRadius: '10px', padding: '1px 8px', fontFamily: C.mono, letterSpacing: '0.5px' }}>{role}</span>
        </div>
        <div style={{ fontSize: '12px', color: C.textDim, lineHeight: 1.5, fontStyle: 'italic', marginBottom: '8px' }}>{description}</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {outputs.map(o => <span key={o} style={{ fontSize: '10px', color: C.goldDim, fontFamily: C.mono }}>→ {o}</span>)}
        </div>
      </div>
      <span style={{ color: hov ? C.gold : C.border, fontSize: '20px', transition: 'all 0.15s' }}>›</span>
    </div>
  );
}

function RNPathway({ onBack, onBackHome }) {
  const [stage, setStage] = useState(0);
  const [priorNote, setPriorNote] = useState('');
  const [priorSummaries, setPriorSummaries] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const [inputs, setInputs] = useState({ ...{ diagnosis: '', patientId: '', age: '', sex: '', certPeriod: '', lastBaseline: '', fast: '', pps: '', kps: '', weight: '', vitals: '' }, ...Object.fromEntries(DECLINE_DOMAINS.map(d => [d.key, ''])) });
  const [rnNarrative, setRnNarrative] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setField = (key, val) => setInputs(p => ({ ...p, [key]: val }));
  const filledDomains = DECLINE_DOMAINS.filter(d => inputs[d.key]?.trim()).length;

  const extractPrior = async () => {
    if (!priorNote.trim()) { setStage(1); return; }
    setExtracting(true); setError('');
    try {
      const r = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, system: buildPriorExtractionSystem(), messages: [{ role: 'user', content: 'Extract domain summaries from this prior RN Recertification Narrative:\n\n' + priorNote }] }) });
      const d = await r.json();
      const text = d.content?.[0]?.text || '';
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
      setPriorSummaries(parsed); setStage(1);
    } catch (e) { setError('Could not extract prior summaries. Proceeding without.'); setStage(1); }
    finally { setExtracting(false); }
  };

  const generateRN = async () => {
    if (!inputs.diagnosis.trim()) { setError('Diagnosis is required.'); return; }
    if (filledDomains === 0) { setError('Complete at least one decline domain.'); return; }
    setError(''); setLoading(true);
    try {
      const r = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4000, system: buildRNRecertSystem(inputs, priorSummaries), messages: [{ role: 'user', content: 'Generate the RN Recertification Narrative now.' }] }) });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setRnNarrative(text); setStage(2);
    } catch (e) { setError('Generation failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const stageLabels = ['Prior Note', 'RN Assessment', 'Review & Done'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`textarea::placeholder,input::placeholder{color:rgba(196,168,130,0.3)}textarea:focus,input:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}@keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}`}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>RECERTIFICATION SUITE</button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '4px' }}>RN PATHWAY</div>
            <div style={{ fontSize: '20px', color: C.text }}>{stage === 0 ? 'Prior Note' : stage === 1 ? 'RN Assessment' : 'RN Narrative Review'}</div>
          </div>
          <Btn variant="ghost" onClick={() => { setStage(0); setRnNarrative(''); setError(''); }}>Reset</Btn>
        </div>

        {stage < 3 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {stageLabels.map((label, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{ height: '2px', background: i <= stage ? C.gold : C.border, marginBottom: '5px' }} />
                <div style={{ fontSize: '10px', letterSpacing: '2px', fontFamily: C.mono, color: i === stage ? C.gold : i < stage ? C.goldDim : 'rgba(196,168,130,0.25)' }}>{i+1}. {label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        )}

        {error && <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>{error}</div>}

        {(loading || extracting) && (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '20px' }}>{extracting ? 'ANALYZING PRIOR NOTE...' : 'GENERATING RN NARRATIVE...'}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}
            </div>
          </div>
        )}

        {stage === 0 && !extracting && (
          <div>
            <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px', fontSize: '12px', color: C.goldDim, fontFamily: C.mono, lineHeight: 1.6 }}>
              Paste the prior RN Recert note to display last period status above each domain. Skip for first recertifications.
            </div>
            <div style={{ fontSize: '11px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>PRIOR RN RECERTIFICATION NARRATIVE</div>
            <Textarea value={priorNote} onChange={setPriorNote} placeholder="Paste prior RN Recertification Narrative here..." rows={12} />
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="ghost" onClick={() => setStage(1)}>Skip — No Prior Note</Btn>
              <Btn onClick={extractPrior} disabled={!priorNote.trim()} style={{ padding: '12px 32px' }}>Analyze Prior Note →</Btn>
            </div>
          </div>
        )}

        {stage === 1 && !loading && (
          <div>
            {priorSummaries && (
              <div style={{ background: 'rgba(76,175,130,0.06)', border: `1px solid ${C.greenBorder}`, borderRadius: '2px', padding: '12px 18px', marginBottom: '24px', fontSize: '12px', color: C.green, fontFamily: C.mono, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>✓</span><span>Prior note analyzed — last period status shown above each domain</span>
              </div>
            )}
            <SectionLabel>Patient Information</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <Field label="Physician Admitting Diagnosis *"><Input value={inputs.diagnosis} onChange={v => setField('diagnosis', v)} placeholder="e.g., Alzheimer's dementia, end-stage" /></Field>
              <Field label="Patient Identifier"><Input value={inputs.patientId} onChange={v => setField('patientId', v)} placeholder="e.g., initials or MRN" /></Field>
              <Field label="Age"><Input value={inputs.age} onChange={v => setField('age', v)} placeholder="e.g., 82" /></Field>
              <Field label="Sex"><Input value={inputs.sex} onChange={v => setField('sex', v)} placeholder="e.g., Female" /></Field>
              <Field label="Certification Period"><Input value={inputs.certPeriod} onChange={v => setField('certPeriod', v)} placeholder="e.g., 04/16/2026 - 06/15/2026" /></Field>
              <Field label="Last Recert Baseline"><Input value={inputs.lastBaseline} onChange={v => setField('lastBaseline', v)} placeholder="e.g., FAST 6d, PPS 40%, wt 118 lbs" /></Field>
            </div>
            <SectionLabel>Objective Data</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '16px' }}>
              <Field label="FAST"><Input value={inputs.fast} onChange={v => setField('fast', v)} placeholder="e.g., 6e" /></Field>
              <Field label="PPS %"><Input value={inputs.pps} onChange={v => setField('pps', v)} placeholder="e.g., 40%" /></Field>
              <Field label="KPS %"><Input value={inputs.kps} onChange={v => setField('kps', v)} placeholder="e.g., 40%" /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
              <Field label="Weight / Trend"><Input value={inputs.weight} onChange={v => setField('weight', v)} placeholder="e.g., 112 lbs, down 6 lbs" /></Field>
              <Field label="Vitals"><Input value={inputs.vitals} onChange={v => setField('vitals', v)} placeholder="e.g., BP 98/60, HR 72" /></Field>
            </div>
            <SectionLabel>Decline Domain Assessment</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '2px', background: C.border, borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: C.gold, width: `${(filledDomains / DECLINE_DOMAINS.length) * 100}%`, transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontSize: '11px', fontFamily: C.mono, color: C.goldDim }}>{filledDomains}/{DECLINE_DOMAINS.length} domains</div>
            </div>
            {DECLINE_DOMAINS.map((domain) => {
              const prior = priorSummaries?.[domain.key];
              const hasPrior = prior && prior !== 'Not documented in prior note.';
              return (
                <div key={domain.key} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: hasPrior ? '6px' : '8px' }}>
                    <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '1.5px', color: inputs[domain.key]?.trim() ? C.gold : C.textDim }}>
                      {inputs[domain.key]?.trim() ? '✓ ' : '○ '}{domain.label.toUpperCase()}
                    </div>
                    <VoiceBtn onTranscript={t => setField(domain.key, inputs[domain.key] ? inputs[domain.key] + ' ' + t : t)} />
                  </div>
                  {hasPrior && (
                    <div style={{ background: 'rgba(74,144,164,0.08)', border: `1px solid ${C.blueBorder}`, borderRadius: '2px', padding: '8px 12px', marginBottom: '8px', fontSize: '12px', color: C.blue, fontFamily: C.mono, lineHeight: 1.5 }}>
                      <span style={{ fontSize: '10px', letterSpacing: '1px', opacity: 0.7 }}>LAST PERIOD: </span>{prior}
                    </div>
                  )}
                  <Textarea value={inputs[domain.key] || ''} onChange={v => setField(domain.key, v)} placeholder={domain.placeholder} rows={inputs[domain.key]?.trim() ? 3 : 2} />
                </div>
              );
            })}
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={() => setStage(0)}>← Prior Note</Btn>
              <Btn onClick={generateRN} disabled={!inputs.diagnosis.trim() || filledDomains === 0} style={{ padding: '12px 32px' }}>Generate RN Narrative →</Btn>
            </div>
          </div>
        )}

        {stage === 2 && !loading && (
          <div>
            <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '12px 18px', marginBottom: '16px', fontSize: '12px', color: C.goldDim, fontFamily: C.mono, lineHeight: 1.6 }}>
              Review and edit the narrative before finalizing. Use Copy to share with the physician for the recertification note.
            </div>
            <Textarea value={rnNarrative} onChange={setRnNarrative} rows={22} />
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={() => setStage(1)}>← Edit Assessment</Btn>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Btn variant="secondary" onClick={() => { navigator.clipboard.writeText(rnNarrative); }}>Copy Note</Btn>
                <Btn variant="secondary" onClick={onBackHome}>Done — Return Home</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function F2FPathway({ onBack, onBackHome }) {
  const [inputs, setInputs] = useState({ diagnosis: '', patientId: '', age: '', sex: '', certPeriod: '', fast: '', pps: '', kps: '', weight: '', f2fDate: '', f2fConductedBy: '', f2fFindings: '' });
  const [f2fNote, setF2fNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setField = (key, val) => setInputs(p => ({ ...p, [key]: val }));

  const generate = async () => {
    if (!inputs.f2fDate.trim() || !inputs.f2fFindings.trim()) { setError('Date and clinical findings are required.'); return; }
    setError(''); setLoading(true);
    try {
      const r = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 2000, system: buildF2FSystem(inputs), messages: [{ role: 'user', content: 'Generate the Face-to-Face Encounter Note now.' }] }) });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setF2fNote(text);
    } catch (e) { setError('Generation failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const reset = () => { setInputs({ diagnosis: '', patientId: '', age: '', sex: '', certPeriod: '', fast: '', pps: '', kps: '', weight: '', f2fDate: '', f2fConductedBy: '', f2fFindings: '' }); setF2fNote(''); setError(''); };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`textarea::placeholder,input::placeholder{color:rgba(196,168,130,0.3)}textarea:focus,input:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}@keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}`}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>RECERTIFICATION SUITE</button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.blue, fontFamily: C.mono, marginBottom: '4px' }}>F2F PATHWAY</div>
            <div style={{ fontSize: '20px', color: C.text }}>Face-to-Face Encounter Note</div>
            <div style={{ fontSize: '12px', color: C.goldDim, marginTop: '4px', fontStyle: 'italic' }}>Physician · Nurse Practitioner · Physician Assistant</div>
          </div>
          {(f2fNote || inputs.f2fFindings) && <Btn variant="ghost" onClick={reset}>Reset</Btn>}
        </div>

        {error && <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>{error}</div>}

        {loading && (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '20px' }}>GENERATING FACE-TO-FACE NOTE...</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}
            </div>
          </div>
        )}

        {!f2fNote && !loading && (
          <div>
            <SectionLabel>Patient Information</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <Field label="Primary Diagnosis *"><Input value={inputs.diagnosis} onChange={v => setField('diagnosis', v)} placeholder="e.g., End-stage COPD" /></Field>
              <Field label="Patient Identifier"><Input value={inputs.patientId} onChange={v => setField('patientId', v)} placeholder="e.g., initials or MRN" /></Field>
              <Field label="Age"><Input value={inputs.age} onChange={v => setField('age', v)} placeholder="e.g., 74" /></Field>
              <Field label="Sex"><Input value={inputs.sex} onChange={v => setField('sex', v)} placeholder="e.g., Male" /></Field>
              <Field label="Certification Period"><Input value={inputs.certPeriod} onChange={v => setField('certPeriod', v)} placeholder="e.g., 04/16/2026 - 06/15/2026" /></Field>
            </div>

            <SectionLabel>Functional Scales</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' }}>
              <Field label="FAST"><Input value={inputs.fast} onChange={v => setField('fast', v)} placeholder="e.g., 7f" /></Field>
              <Field label="PPS %"><Input value={inputs.pps} onChange={v => setField('pps', v)} placeholder="e.g., 30%" /></Field>
              <Field label="KPS %"><Input value={inputs.kps} onChange={v => setField('kps', v)} placeholder="e.g., 30%" /></Field>
              <Field label="Weight"><Input value={inputs.weight} onChange={v => setField('weight', v)} placeholder="e.g., 112 lbs" /></Field>
            </div>

            <SectionLabel>Encounter Details</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <Field label="Date of Encounter *"><Input value={inputs.f2fDate} onChange={v => setField('f2fDate', v)} placeholder="e.g., 04/10/2026" /></Field>
              <Field label="Conducted By"><Input value={inputs.f2fConductedBy} onChange={v => setField('f2fConductedBy', v)} placeholder="e.g., Dr. Smith / NP Jones" /></Field>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '2px', color: C.gold }}>CLINICAL FINDINGS <span style={{ color: '#e07070' }}>*</span></div>
              <VoiceBtn onTranscript={t => setField('f2fFindings', inputs.f2fFindings ? inputs.f2fFindings + ' ' + t : t)} />
            </div>
            <Textarea value={inputs.f2fFindings} onChange={v => setField('f2fFindings', v)} placeholder="Describe clinical findings confirming continued decline related to the terminal diagnosis — functional status, systems findings, significant observations..." rows={10} />

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={generate} disabled={!inputs.f2fDate.trim() || !inputs.f2fFindings.trim()} style={{ padding: '12px 32px' }}>Generate F2F Note →</Btn>
            </div>
          </div>
        )}

        {f2fNote && !loading && (
          <div>
            <DocOutput title="Face-to-Face Encounter Note" content={f2fNote} />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Btn variant="secondary" onClick={reset}>New F2F Note</Btn>
              <Btn variant="secondary" onClick={onBackHome}>Return Home</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MDPathway({ onBack, onBackHome }) {
  const [inputs, setInputs] = useState({ diagnosis: '', patientId: '', age: '', sex: '', certPeriod: '', fast: '', pps: '', kps: '', weight: '', mdObservations: '', priorMDNote: '' });
  const [rnNarrative, setRnNarrative] = useState('');
  const [f2fNote, setF2fNote] = useState('');
  const [mdNote, setMdNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setField = (key, val) => setInputs(p => ({ ...p, [key]: val }));

  const generate = async () => {
    if (!rnNarrative.trim()) { setError('RN Recertification Narrative is required.'); return; }
    setError(''); setLoading(true);
    try {
      const r = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 4000, system: buildMDRecertSystem(inputs, rnNarrative, f2fNote), messages: [{ role: 'user', content: 'Generate the Physician Recertification Note now.' }] }) });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setMdNote(text);
    } catch (e) { setError('Generation failed. Please try again.'); }
    finally { setLoading(false); }
  };

  const reset = () => { setInputs({ diagnosis: '', patientId: '', age: '', sex: '', certPeriod: '', fast: '', pps: '', kps: '', weight: '', mdObservations: '', priorMDNote: '' }); setRnNarrative(''); setF2fNote(''); setMdNote(''); setError(''); };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`textarea::placeholder,input::placeholder{color:rgba(196,168,130,0.3)}textarea:focus,input:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}@keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}`}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>RECERTIFICATION SUITE</button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.green, fontFamily: C.mono, marginBottom: '4px' }}>PHYSICIAN PATHWAY</div>
            <div style={{ fontSize: '20px', color: C.text }}>Physician Recertification Note</div>
            <div style={{ fontSize: '12px', color: C.goldDim, marginTop: '4px', fontStyle: 'italic' }}>Paste RN narrative and F2F note — generate physician recertification</div>
          </div>
          {(mdNote || rnNarrative) && <Btn variant="ghost" onClick={reset}>Reset</Btn>}
        </div>

        {error && <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>{error}</div>}

        {loading && (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '20px' }}>GENERATING PHYSICIAN RECERTIFICATION NOTE...</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}
            </div>
          </div>
        )}

        {!mdNote && !loading && (
          <div>
            <SectionLabel>Patient Information</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <Field label="Primary Diagnosis"><Input value={inputs.diagnosis} onChange={v => setField('diagnosis', v)} placeholder="e.g., End-stage dementia" /></Field>
              <Field label="Patient Identifier"><Input value={inputs.patientId} onChange={v => setField('patientId', v)} placeholder="e.g., initials or MRN" /></Field>
              <Field label="Age"><Input value={inputs.age} onChange={v => setField('age', v)} placeholder="e.g., 82" /></Field>
              <Field label="Sex"><Input value={inputs.sex} onChange={v => setField('sex', v)} placeholder="e.g., Female" /></Field>
              <Field label="Certification Period"><Input value={inputs.certPeriod} onChange={v => setField('certPeriod', v)} placeholder="e.g., 04/16/2026 - 06/15/2026" /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' }}>
              <Field label="FAST"><Input value={inputs.fast} onChange={v => setField('fast', v)} placeholder="e.g., 7f" /></Field>
              <Field label="PPS %"><Input value={inputs.pps} onChange={v => setField('pps', v)} placeholder="e.g., 30%" /></Field>
              <Field label="KPS %"><Input value={inputs.kps} onChange={v => setField('kps', v)} placeholder="e.g., 30%" /></Field>
              <Field label="Weight"><Input value={inputs.weight} onChange={v => setField('weight', v)} placeholder="e.g., 112 lbs" /></Field>
            </div>

            <SectionLabel>RN Recertification Narrative <span style={{ color: '#e07070' }}>*</span></SectionLabel>
            <div style={{ fontSize: '12px', color: C.goldDim, marginBottom: '8px', fontStyle: 'italic' }}>Paste the completed RN Recertification Narrative — this is the primary source for the physician note.</div>
            <Textarea value={rnNarrative} onChange={setRnNarrative} placeholder="Paste RN Recertification Narrative here..." rows={10} />

            <SectionLabel>Face-to-Face Encounter Note</SectionLabel>
            <div style={{ fontSize: '12px', color: C.goldDim, marginBottom: '8px', fontStyle: 'italic' }}>Optional — paste the F2F note if completed. It will inform the physician recertification argument.</div>
            <Textarea value={f2fNote} onChange={setF2fNote} placeholder="Paste Face-to-Face Encounter Note here (if completed)..." rows={6} />

            <SectionLabel>Prior Physician Recertification Note</SectionLabel>
            <div style={{ fontSize: '12px', color: C.goldDim, marginBottom: '8px', fontStyle: 'italic' }}>Optional — paste prior physician recert note for interval comparison.</div>
            <Textarea value={inputs.priorMDNote} onChange={v => setField('priorMDNote', v)} placeholder="Paste prior Physician Recertification Note here (optional)..." rows={5} />

            <SectionLabel>Additional Clinical Observations</SectionLabel>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '28px' }}>
              <div style={{ flex: 1 }}>
                <Textarea value={inputs.mdObservations} onChange={v => setField('mdObservations', v)} placeholder="Any additional observations not captured in the RN or F2F notes..." rows={4} />
              </div>
              <VoiceBtn onTranscript={t => setField('mdObservations', inputs.mdObservations ? inputs.mdObservations + ' ' + t : t)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={generate} disabled={!rnNarrative.trim()} style={{ padding: '12px 32px' }}>Generate Physician Recert Note →</Btn>
            </div>
          </div>
        )}

        {mdNote && !loading && (
          <div>
            <DocOutput title="Physician Recertification Note" content={mdNote} />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Btn variant="secondary" onClick={reset}>New Note</Btn>
              <Btn variant="secondary" onClick={onBackHome}>Return Home</Btn>
            </div>
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
