'use client';
import { streamGenerate } from '../lib/streamGenerate';
import { useState, useRef } from 'react';
import { C } from './tokens';
import { Textarea, Input, Btn, VoiceBtn, DocOutput, TopNav, ErrorBox, Collapsible, ProgressLoader, EditableDraft, BackBtn, ProgressSteps, useUnsavedWarning, PageShell, DocModal } from './ui';
import { buildNarrativeSystem, buildCTISystem, buildRecordSummarySystem, buildNarrativeEditSystem, buildCTIEditSystem } from './prompts';
import { DEMO_PATIENTS, PATIENT_LIST } from './demoPatients';

const EMPTY_DOCS = { dischargeSummary: '', hp: '', palliativeCare: '', specialistNote: '', woundCare: '', labs: '', imaging: '' };

const DOC_FIELDS = [
  { key: 'dischargeSummary', label: 'Discharge Summaries', placeholder: 'Paste one or more discharge summaries. Include date of each hospitalization.' },
  { key: 'hp', label: 'History & Physicals', placeholder: 'Paste one or more H&P documents.' },
  { key: 'specialistNote', label: 'Specialist Notes', placeholder: 'Paste specialist notes. Include note type and date.' },
  { key: 'labs', label: 'Lab Results', placeholder: 'Paste lab results with dates.' },
  { key: 'imaging', label: 'Imaging Studies', placeholder: 'Paste imaging reports (CT, MRI, X-ray, echo, etc.) with dates.' },
  { key: 'woundCare', label: 'Wound Care Notes', placeholder: 'Paste wound care notes if applicable.' },
  { key: 'palliativeCare', label: 'Palliative Care / Goals of Care Notes', placeholder: 'Paste palliative care or goals of care notes if available.' },
];

function docTypeToField(type) {
  const t = type.toLowerCase();
  if (t.includes('discharge')) return 'dischargeSummary';
  if (t.includes('history') || t.includes('h&p')) return 'hp';
  if (t.includes('palliative') || t.includes('goals')) return 'palliativeCare';
  if (t.includes('specialist') || t.includes('neurology') || t.includes('vascular') || t.includes('speech')) return 'specialistNote';
  if (t.includes('wound')) return 'woundCare';
  if (t.includes('lab')) return 'labs';
  return 'specialistNote';
}

export default function AdmissionEngine({ onBack }) {
  const [mode, setMode] = useState(null);

  if (mode === 'demo') return <DemoMode onBack={() => setMode(null)} onBackHome={onBack} />;
  if (mode === 'clinical') return <ClinicalMode onBack={() => setMode(null)} onBackHome={onBack} />;
  if (mode === 'physician-cti') return <PhysicianCTIMode onBack={() => setMode(null)} onBackHome={onBack} />;

  return (
    <PageShell
      onHome={onBack}
      moduleName="Admission Engine"
      badge="Admission Engine"
      title="New Patient Admission"
      subtitle="Choose how you would like to proceed"
      hideProgress={true}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <ModeCard
          title="Demo Mode"
          subtitle="See ClarityChart in action"
          description="Select from three pre-loaded patient cases. Drag chart documents into the workspace and watch ClarityChart generate the Admission Narrative and CTI in real time."
          badge="3 Demo Patients"
          badgeColor={C.gold}
          icon="✦"
          onClick={() => setMode('demo')}
        />
        <ModeCard
          title="Clinical Mode"
          subtitle="Enter a real patient"
          description="Enter physician diagnosis, paste records from the patient chart, and provide the admission encounter narrative. For clinical use with real patient data."
          badge="Clinical Use"
          badgeColor={C.green}
          icon="◈"
          onClick={() => setMode('clinical')}
        />
        <ModeCard
          title="Physician CTI Mode"
          subtitle="CTI from completed narrative"
          description="Enter diagnosis, paste chart records, then provide the completed Admission Narrative. ClarityChart generates the physician CTI with full edit support."
          badge="Physician"
          badgeColor={C.blue}
          icon="◉"
          onClick={() => setMode('physician-cti')}
        />
      </div>
    </PageShell>
  );
}

function ModeCard({ title, subtitle, description, badge, badgeColor, icon, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? C.bgCardHover : C.bgCard, border: `1px solid ${hov ? C.gold : C.border}`, borderTop: `3px solid ${C.gold}`, borderRadius: '8px', padding: '28px 24px', cursor: 'pointer', transition: 'all 0.15s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ fontSize: '28px', color: C.gold }}>{icon}</div>
        <span style={{ fontSize: '16px', color: badgeColor, background: `${badgeColor}18`, border: `1px solid ${badgeColor}40`, borderRadius: '10px', padding: '2px 10px', fontFamily: C.mono, letterSpacing: '1px' }}>{badge}</span>
      </div>
      <div style={{ fontSize: '18px', color: C.text, fontWeight: '700', fontFamily: C.serif, marginBottom: '3px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: C.gold, fontFamily: C.mono, letterSpacing: '0.5px', marginBottom: '12px' }}>{subtitle}</div>
      <div style={{ fontSize: '15px', color: C.textDim, lineHeight: 1.65 }}>{description}</div>
      <div style={{ marginTop: '20px', fontSize: '12px', color: hov ? C.gold : C.textFaint, fontFamily: C.mono, letterSpacing: '1.5px', transition: 'color 0.15s', textTransform: 'uppercase' }}>
        Enter {title} →
      </div>
    </div>
  );
}

function PatientCard({ id, p, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '20px',
        padding: '20px 24px',
        background: hov ? C.bgCardHover : C.bgCard,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius: '6px', cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: `${p.color}28`, border: `1px solid ${p.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: p.color, fontFamily: C.mono, flexShrink: 0, fontWeight: '700' }}>{p.name}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '18px', color: '#f0e8dc', marginBottom: '4px', fontWeight: '600' }}>{p.diagnosis}</div>
        <div style={{ fontSize: '15px', color: 'rgba(196,168,130,0.8)', fontFamily: C.mono, marginBottom: '3px' }}>{p.tagline}</div>
        {p.snapshot && <div style={{ fontSize: '13px', color: 'rgba(196,168,130,0.5)', fontFamily: C.mono }}>{p.snapshot}</div>}
      </div>
      <div style={{ fontSize: '14px', color: 'rgba(196,168,130,0.6)', fontFamily: C.mono }}>{p.documents.length} docs</div>
      <div style={{ fontSize: '20px', color: hov ? C.gold : C.border }}>›</div>
    </div>
  );
}

function DemoMode({ onBack, onBackHome }) {
  const summariesRef = useRef('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [droppedDocs, setDroppedDocs] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [recordSummaries, setRecordSummaries] = useState('');
  const [encounter, setEncounter] = useState('');
  const [narrative, setNarrative] = useState('');
  const [editRequest, setEditRequest] = useState('');
  const [cti, setCti] = useState('');
  const [ctiEditRequest, setCtiEditRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('select');
  const [viewingDoc, setViewingDoc] = useState(null);

  const patient = selectedPatient ? DEMO_PATIENTS[selectedPatient] : null;

  const selectPatient = (id) => {
    setSelectedPatient(id);
    setDroppedDocs([]); setRecordSummaries(''); setEncounter('');
    setNarrative(''); setEditRequest(''); setCti(''); setCtiEditRequest(''); setError('');
    summariesRef.current = '';
    setStage('build');
  };

  const handleDragStart = (doc) => setDragging(doc);
  const handleDragEnd = () => setDragging(null);

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    if (dragging && !droppedDocs.find(d => d.id === dragging.id)) {
      setDroppedDocs(prev => [...prev, dragging]);
    }
    setDragging(null);
  };

  const removeDoc = (docId) => setDroppedDocs(prev => prev.filter(d => d.id !== docId));

  const loadAll = () => {
    if (patient) setDroppedDocs([...patient.documents]);
  };

  const buildDocs = () => {
    const docs = { dischargeSummary: '', hp: '', palliativeCare: '', specialistNote: '', woundCare: '', labs: '', imaging: '' };
    droppedDocs.forEach(doc => {
      const field = docTypeToField(doc.type);
      docs[field] = docs[field] ? docs[field] + '\n\n' + doc.content : doc.content;
    });
    return docs;
  };

  const summarizeAndContinue = async () => {
    if (!patient || droppedDocs.length === 0) { setStage('encounter'); return; }
    setLoading(true); setLoadingMsg('Summarizing chart documents...');
    try {
      const docText = droppedDocs.map(d => `=== ${d.type.toUpperCase()} (${d.date}) ===\n${d.content}`).join('\n\n');
      const text = await streamGenerate({
        system: buildRecordSummarySystem(),
        messages: [{ role: 'user', content: `Summarize these medical records:\n\n${docText}` }],
        max_tokens: 2000,
      });
      summariesRef.current = text;
      setRecordSummaries(text);
      setEncounter(patient.encounter);
      setStage('encounter');
    } catch (e) {
      summariesRef.current = '';
      setRecordSummaries('');
      setEncounter(patient?.encounter || '');
      setStage('encounter');
    } finally { setLoading(false); setLoadingMsg(''); }
  };

  const generateNarrative = async () => {
    if (!patient) return;
    setError(''); setLoading(true); setLoadingMsg('Generating Admission Narrative...');
    const effectiveSummaries = summariesRef.current || recordSummaries;
    const docs = effectiveSummaries ? { summaries: effectiveSummaries } : buildDocs();
    try {
      const text = await streamGenerate({
        system: buildNarrativeSystem(patient.diagnosis, patient.secondaryDx, docs, encounter),
        messages: [{ role: 'user', content: 'Generate the Admission Narrative now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setNarrative(text); setStage('narrative');
    } catch (e) { setError(e.message || 'Generation failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const applyEdits = async () => {
    if (!editRequest.trim()) return;
    setLoading(true); setLoadingMsg('Applying edits...');
    try {
      const text = await streamGenerate({
        system: buildNarrativeEditSystem(narrative, editRequest),
        messages: [{ role: 'user', content: 'Apply the requested edits now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setNarrative(text); setEditRequest('');
    } catch (e) { setError(e.message || 'Edit failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const generateCTI = async () => {
    if (!patient) return;
    setLoading(true); setLoadingMsg('Generating Certificate of Terminal Illness...'); setCti(''); setStage('cti');
    const docs = buildDocs();
    try {
      const text = await streamGenerate({
        system: buildCTISystem(patient.diagnosis, patient.secondaryDx, docs, encounter, narrative),
        messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setCti(text);
    } catch (e) { setError(e.message || 'CTI generation failed. Please try again.'); setStage('narrative'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const applyCTIEdits = async () => {
    if (!ctiEditRequest.trim()) return;
    setLoading(true); setLoadingMsg('Applying edits...');
    try {
      const text = await streamGenerate({
        system: buildCTIEditSystem(cti, ctiEditRequest),
        messages: [{ role: 'user', content: 'Apply the requested edits now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setCti(text); setCtiEditRequest('');
    } catch (e) { setError(e.message || 'Edit failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const reset = () => {
    setStage('select'); setSelectedPatient(null); setDroppedDocs([]);
    setRecordSummaries(''); setEncounter(''); setNarrative('');
    setEditRequest(''); setCti(''); setCtiEditRequest(''); setError('');
    summariesRef.current = '';
  };

  const stageTitles = ['Patient', 'Documents', 'Encounter', 'Narrative', 'CTI'];
  const stageIndex = { select: 0, build: 1, encounter: 2, narrative: 3, cti: 4 };
  const currentStageIndex = stageIndex[stage] ?? 0;

  const demoTitlesDisplay = {
    select: 'Select Demo Patient',
    build: patient?.name + ' — Documents',
    encounter: 'Admission Encounter',
    narrative: 'Admission Narrative',
    cti: 'Certificate of Terminal Illness',
  };
  const demoPrimaryActions = {
    build: { action: summarizeAndContinue, label: 'Summarize & Continue →', disabled: droppedDocs.length === 0 },
    encounter: { action: generateNarrative, label: 'Generate Admission Narrative →', disabled: !encounter.trim() },
    narrative: { action: generateCTI, label: 'Create Certificate of Terminal Illness →', disabled: false },
  };
  const demoBackTargets = { build: 'select', encounter: 'build', narrative: 'encounter', cti: 'narrative' };
  const demoBackLabels = { build: 'Patients', encounter: 'Documents', narrative: 'Encounter', cti: 'Narrative' };

  return (
    <PageShell
      onHome={onBackHome}
      moduleName="Admission Engine"
      badge="DEMO MODE"
      steps={stageTitles}
      currentStep={currentStageIndex}
      onStepClick={(i) => {
        const stageArr = ['select', 'build', 'encounter', 'narrative', 'cti'];
        if (i < currentStageIndex) setStage(stageArr[i]);
      }}
      title={demoTitlesDisplay[stage]}
      onBack={stage !== 'select' ? () => setStage(demoBackTargets[stage]) : onBack}
      backLabel={stage !== 'select' ? demoBackLabels[stage] : 'Admission Engine'}
      primaryAction={!loading && demoPrimaryActions[stage]?.action}
      primaryLabel={demoPrimaryActions[stage]?.label}
      primaryDisabled={demoPrimaryActions[stage]?.disabled}
      secondaryAction={stage === 'narrative' || stage === 'cti' ? reset : null}
      secondaryLabel={stage === 'narrative' || stage === 'cti' ? 'New Patient' : null}
    >
      <style>{`.doc-card{transition:all 0.15s;cursor:grab}.doc-card:hover{border-color:rgba(196,168,130,0.4)!important;background:rgba(196,168,130,0.08)!important}`}</style>
      <div>
        <ErrorBox message={error} />

        {loading && (
          <ProgressLoader
            message={loadingMsg}
            steps={['Summarizing documents', 'Generating narrative', 'Creating CTI']}
            currentStep={loadingMsg.includes('Summariz') ? 0 : loadingMsg.includes('Narrative') ? 1 : loadingMsg.includes('CTI') || loadingMsg.includes('Certificate') ? 2 : 0}
          />
        )}

        {stage === 'select' && (
          <div>
            <div style={{ fontSize: '17px', color: C.goldDim, marginBottom: '24px', fontStyle: 'italic' }}>Select a patient to load their chart documents.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PATIENT_LIST.map(id => {
                const p = DEMO_PATIENTS[id];
                return (
                  <PatientCard key={id} id={id} p={p} onClick={() => selectPatient(id)} />
                );
              })}
            </div>
          </div>
        )}

        {stage === 'build' && !loading && patient && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
              <div>
                <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>CHART DOCUMENTS</span>
                  <button onClick={loadAll} style={{ background: C.gold, border: 'none', color: '#0f1923', cursor: 'pointer', fontFamily: C.mono, fontSize: '16px', letterSpacing: '1px', padding: '6px 14px', borderRadius: '2px', fontWeight: 'bold' }}>Load All Documents</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {patient.documents.map(doc => {
                    const isDropped = droppedDocs.find(d => d.id === doc.id);
                    return (
                      <div key={doc.id} className="doc-card" draggable={!isDropped} onDragStart={() => !isDropped && handleDragStart(doc)} onDragEnd={handleDragEnd}
                        style={{ padding: '10px 14px', background: isDropped ? 'rgba(76,175,130,0.06)' : C.bgCard, border: `1px solid ${isDropped ? C.greenBorder : C.border}`, borderRadius: '2px', opacity: isDropped ? 0.5 : 1, cursor: isDropped ? 'default' : 'grab', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px', flexShrink: 0 }}>{isDropped ? '✓' : '⠿'}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '16px', color: isDropped ? C.green : C.text, fontFamily: C.mono }}>{doc.type}</div>
                          <div style={{ fontSize: '16px', color: C.gold }}>{doc.date}</div>
                        </div>
                        {!isDropped && <span style={{ fontSize: '16px', color: C.gold, fontFamily: C.mono }}>drag →</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '12px' }}>WORKSPACE ({droppedDocs.length} documents)</div>
                <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
                  style={{ minHeight: '240px', border: `2px dashed ${dragOver ? C.gold : C.border}`, borderRadius: '2px', padding: '16px', transition: 'all 0.15s', background: dragOver ? 'rgba(196,168,130,0.06)' : 'rgba(0,0,0,0.1)' }}>
                  {droppedDocs.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '180px', color: C.goldDim, fontFamily: C.mono, fontSize: '15px', letterSpacing: '1px', textAlign: 'center', gap: '8px' }}>
                      <div style={{ fontSize: '28px', opacity: 0.4 }}>⊕</div>
                      <div>DRAG DOCUMENTS HERE</div>
                      <div style={{ fontSize: '16px', opacity: 0.6 }}>or click LOAD ALL</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {droppedDocs.map(doc => (
                        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(196,168,130,0.06)', border: `1px solid ${C.border}`, borderRadius: '6px' }}>
                          <span style={{ fontSize: '16px', color: C.green }}>✓</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '18px', color: C.text, fontFamily: C.mono, fontWeight: '600' }}>{doc.type}</div>
                            <div style={{ fontSize: '14px', color: C.goldDim }}>{doc.date}</div>
                          </div>
                          <button onClick={() => setViewingDoc(doc)} style={{ background: 'rgba(196,168,130,0.1)', border: `1px solid rgba(196,168,130,0.3)`, borderRadius: '4px', color: C.gold, cursor: 'pointer', fontSize: '13px', padding: '3px 10px', fontFamily: C.mono, marginRight: '4px' }}>view</button>
                          <button onClick={() => removeDoc(doc.id)} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontSize: '18px', padding: '0 4px' }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {stage === 'encounter' && !loading && (
          <div>
            <div style={{ background: 'rgba(196,168,130,0.04)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px' }}>
              <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '10px' }}>DIAGNOSES</div>
              <div style={{ fontSize: '17px', color: C.text, marginBottom: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Primary: </span>{patient?.diagnosis}</div>
              {patient?.secondaryDx && <div style={{ fontSize: '19px', color: '#c8b8a8', fontWeight: '400', marginTop: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Secondary: </span>{patient?.secondaryDx}</div>}
            </div>

            {recordSummaries && (
              <div style={{ background: 'rgba(74,144,164,0.06)', border: `1px solid ${C.blueBorder}`, borderRadius: '2px', padding: '16px 18px', marginBottom: '24px' }}>
                <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.blue, fontFamily: C.mono, marginBottom: '12px' }}>RECORD SUMMARIES</div>
                {recordSummaries.split('\n').map((line, i) => {
                  const isHeader = line.startsWith('[') && line.endsWith(']');
                  if (isHeader) return <div key={i} style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '1px', marginTop: '14px', marginBottom: '4px' }}>{line}</div>;
                  if (!line.trim()) return <div key={i} style={{ height: '4px' }} />;
                  return <div key={i} style={{ fontSize: '19px', color: '#c8b8a8', fontWeight: '400', lineHeight: 1.6 }}>{line}</div>;
                })}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '15px', fontFamily: C.mono, letterSpacing: '2px', color: C.gold }}>ADMISSION ENCOUNTER NARRATIVE</div>
              <VoiceBtn onTranscript={t => setEncounter(p => p ? p + ' ' + t : t)} />
            </div>
            <Textarea value={encounter} onChange={setEncounter} placeholder="Describe findings from the admission visit..." rows={12} />
          </div>
        )}

        {stage === 'narrative' && !loading && (
          <div>
            <Collapsible title="Transcribed Encounter Narrative" defaultOpen={false}>
              <div style={{ background: 'rgba(10,20,32,0.8)', borderRadius: '2px', padding: '14px 16px', maxHeight: '200px', overflowY: 'auto', fontSize: '19px', color: '#c8b8a8', fontWeight: '400', lineHeight: 1.7, fontFamily: C.serif, whiteSpace: 'pre-wrap' }}>{encounter}</div>
            </Collapsible>
            {narrative && <div style={{ marginBottom: '28px' }}><EditableDraft title="Admission Narrative — Draft" value={narrative} onChange={setNarrative} badge="DRAFT" /></div>}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>REQUEST EDITS</div>
              <div style={{ fontSize: '17px', color: C.gold, marginBottom: '8px', fontStyle: 'italic' }}>Describe any changes needed — the AI will revise the narrative accordingly.</div>
              <Textarea value={editRequest} onChange={setEditRequest} placeholder="e.g., Change the weight to 118 lbs. Add that patient has a stage 2 sacral wound..." rows={4} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <Btn variant="secondary" onClick={applyEdits} disabled={!editRequest.trim()}>Apply Edits</Btn>
              </div>
            </div>
          </div>
        )}

        {stage === 'cti' && !loading && (
          <div>
            {cti && <DocOutput title="Certificate of Terminal Illness" content={cti} />}
            {cti && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>REQUEST EDITS</div>
                <div style={{ fontSize: '15px', color: C.textDim, marginBottom: '8px', fontStyle: 'italic' }}>Describe any changes needed — the AI will revise the CTI accordingly.</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <Textarea value={ctiEditRequest} onChange={setCtiEditRequest} placeholder="e.g., Change the EF to 35%. Add that patient has a history of COPD. Adjust the prognostic statement..." rows={3} />
                  </div>
                  <VoiceBtn onTranscript={t => setCtiEditRequest(p => p ? p + ' ' + t : t)} />
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Btn variant="secondary" onClick={applyCTIEdits} disabled={!ctiEditRequest.trim()}>Apply Edits</Btn>
                </div>
              </div>
            )}
            {narrative && (
              <div style={{ marginTop: '28px' }}>
                <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '12px' }}>ADMISSION NARRATIVE — FOR REFERENCE</div>
                <div style={{ background: 'rgba(10,20,32,0.7)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '20px 24px', maxHeight: '400px', overflowY: 'auto', fontFamily: C.serif }}>
                  {narrative.split('\n').map((line, i) => {
                    const isHeader = /^[A-Z][A-Z\s\/\(\)\-,]{4,}$/.test(line.trim()) && line.trim().length > 3;
                    if (isHeader) return <div key={i} style={{ color: C.gold, fontFamily: C.mono, fontSize: '15px', letterSpacing: '2px', marginTop: '18px', marginBottom: '5px', paddingBottom: '4px', borderBottom: `1px solid rgba(196,168,130,0.12)` }}>{line}</div>;
                    if (!line.trim()) return <div key={i} style={{ height: '6px' }} />;
                    return <div key={i} style={{ color: C.textDim, fontSize: '17px', lineHeight: 1.75 }}>{line}</div>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <DocModal doc={viewingDoc} onClose={() => setViewingDoc(null)} />
    </PageShell>
  );
}

function PhysicianCTIMode({ onBack, onBackHome }) {
  const [stage, setStage] = useState(1);
  const [primaryDx, setPrimaryDx] = useState('');
  const [secondaryDx, setSecondaryDx] = useState('');
  const [docs, setDocs] = useState(EMPTY_DOCS);
  const [admissionNarrative, setAdmissionNarrative] = useState('');
  const [cti, setCti] = useState('');
  const [ctiEditRequest, setCtiEditRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setStage(1); setPrimaryDx(''); setSecondaryDx('');
    setDocs(EMPTY_DOCS); setAdmissionNarrative(''); setCti('');
    setCtiEditRequest(''); setError('');
  };

  const docCount = Object.values(docs).filter(v => v.trim()).length;

  const generateCTI = async () => {
    setError(''); setLoading(true); setLoadingMsg('Generating Certificate of Terminal Illness...'); setCti(''); setStage(4);
    try {
      const text = await streamGenerate({
        system: buildCTISystem(primaryDx, secondaryDx, docs, '', admissionNarrative),
        messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setCti(text);
    } catch (e) { setError(e.message || 'CTI generation failed. Please try again.'); setStage(3); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const applyEdits = async () => {
    if (!ctiEditRequest.trim()) return;
    setLoading(true); setLoadingMsg('Applying edits...');
    try {
      const text = await streamGenerate({
        system: buildCTIEditSystem(cti, ctiEditRequest),
        messages: [{ role: 'user', content: 'Apply the requested edits now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setCti(text); setCtiEditRequest('');
    } catch (e) { setError(e.message || 'Edit failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const stageLabels = ['Diagnosis', 'Records', 'Narrative', 'CTI'];

  const titles = {
    1: 'Diagnosis',
    2: 'Chart Records',
    3: 'Admission Narrative',
    4: 'Certificate of Terminal Illness',
  };

  const primaryActions = {
    1: { action: () => { setError(''); setStage(2); }, label: 'Continue → Records', disabled: !primaryDx.trim() },
    2: { action: () => setStage(3), label: 'Continue → Narrative' },
    3: { action: generateCTI, label: 'Generate Certificate of Terminal Illness →', disabled: !admissionNarrative.trim() },
  };

  const backActions = {
    1: onBack,
    2: () => setStage(1),
    3: () => setStage(2),
    4: () => setStage(3),
  };

  const backLabels = {
    1: 'Admission Engine',
    2: 'Diagnosis',
    3: 'Records',
    4: 'Narrative',
  };

  return (
    <PageShell
      onHome={onBackHome}
      moduleName="Admission Engine"
      badge="PHYSICIAN CTI MODE"
      steps={stageLabels}
      currentStep={stage - 1}
      onStepClick={(i) => { if (i + 1 < stage) setStage(i + 1); }}
      title={titles[stage]}
      onBack={backActions[stage]}
      backLabel={backLabels[stage]}
      primaryAction={!loading && primaryActions[stage]?.action}
      primaryLabel={primaryActions[stage]?.label}
      primaryDisabled={primaryActions[stage]?.disabled}
      secondaryAction={stage === 4 ? reset : null}
      secondaryLabel={stage === 4 ? 'New Admission' : null}
    >
      <ErrorBox message={error} />

      {loading && (
        <ProgressLoader
          message={loadingMsg}
          steps={['Processing records', 'Generating CTI']}
          currentStep={loadingMsg.includes('CTI') || loadingMsg.includes('Certificate') ? 1 : 0}
        />
      )}

      {stage === 1 && !loading && (
        <div>
          <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px', fontSize: '17px', color: '#f0e8dc', fontFamily: C.sans, fontWeight: '600', lineHeight: 1.6 }}>
            Enter the physician-determined terminal diagnosis. ClarityChart will generate the CTI using the completed Admission Narrative and chart records.
          </div>
          <div style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>PRIMARY TERMINAL DIAGNOSIS <span style={{ color: '#e07070' }}>*</span></div>
          <Input value={primaryDx} onChange={setPrimaryDx} placeholder="e.g., Chronic diastolic heart failure (HFpEF), end-stage" />
          <div style={{ fontSize: '15px', fontFamily: C.mono, letterSpacing: '2px', color: C.textDim, marginTop: '22px', marginBottom: '8px' }}>SECONDARY / CONTRIBUTING DIAGNOSES</div>
          <Textarea value={secondaryDx} onChange={setSecondaryDx} placeholder="e.g., CKD stage 4, Type 2 diabetes mellitus, hypertension..." rows={3} />
        </div>
      )}

      {stage === 2 && !loading && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontSize: '17px', color: C.gold, fontStyle: 'italic' }}>Paste relevant chart records. All fields optional — records improve CTI accuracy.</div>
            <div style={{ fontSize: '15px', fontFamily: C.mono, color: docCount > 0 ? C.green : C.goldDim }}>{docCount}/{DOC_FIELDS.length} loaded</div>
          </div>
          {DOC_FIELDS.map(({key, label, placeholder}) => (
            <div key={key} style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontFamily: C.mono, letterSpacing: '1.5px', color: docs[key]?.trim() ? C.gold : C.textDim, marginBottom: '6px' }}>
                {docs[key]?.trim() ? '✓ ' : '○ '}{label.toUpperCase()}
              </div>
              <Textarea value={docs[key] || ''} onChange={v => setDocs(d => ({...d,[key]:v}))} placeholder={placeholder} rows={docs[key]?.trim() ? 4 : 2} mono />
            </div>
          ))}
        </div>
      )}

      {stage === 3 && !loading && (
        <div>
          <div style={{ background: 'rgba(196,168,130,0.04)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px' }}>
            <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '10px' }}>DIAGNOSES</div>
            <div style={{ fontSize: '17px', color: C.text, marginBottom: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Primary: </span>{primaryDx}</div>
            {secondaryDx && <div style={{ fontSize: '19px', color: '#c8b8a8', fontWeight: '400', marginTop: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Secondary: </span>{secondaryDx}</div>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '15px', fontFamily: C.mono, letterSpacing: '2px', color: C.gold }}>
              ADMISSION NARRATIVE <span style={{ color: '#e07070' }}>*</span>
            </div>
            <VoiceBtn onTranscript={t => setAdmissionNarrative(p => p ? p + ' ' + t : t)} />
          </div>
          <div style={{ fontSize: '15px', color: C.textDim, marginBottom: '12px' }}>Paste the completed RN Admission Narrative, or dictate it directly.</div>
          <Textarea value={admissionNarrative} onChange={setAdmissionNarrative} placeholder="Paste the completed admission narrative here..." rows={16} />
        </div>
      )}

      {stage === 4 && !loading && (
        <div>
          {cti && <DocOutput title="Certificate of Terminal Illness" content={cti} />}
          <div style={{ marginTop: '28px', marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>REQUEST EDITS</div>
            <div style={{ fontSize: '17px', color: C.textDim, marginBottom: '8px', fontStyle: 'italic' }}>Describe any changes needed — the AI will revise the CTI accordingly.</div>
            <Textarea value={ctiEditRequest} onChange={setCtiEditRequest} placeholder="e.g., Change the EF to 35%. Add that patient has a history of COPD. Adjust the prognostic statement..." rows={4} />
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
              <Btn variant="secondary" onClick={applyEdits} disabled={!ctiEditRequest.trim()}>Apply Edits</Btn>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

function ClinicalMode({ onBack, onBackHome }) {
  const summariesRef = useRef('');
  const [stage, setStage] = useState(1);
  const [primaryDx, setPrimaryDx] = useState('');
  const [secondaryDx, setSecondaryDx] = useState('');
  const [docs, setDocs] = useState(EMPTY_DOCS);
  const [recordSummaries, setRecordSummaries] = useState('');
  const [encounter, setEncounter] = useState('');
  const [narrative, setNarrative] = useState('');
  const [editRequest, setEditRequest] = useState('');
  const [cti, setCti] = useState('');
  const [ctiEditRequest, setCtiEditRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setStage(1); setPrimaryDx(''); setSecondaryDx('');
    setDocs(EMPTY_DOCS); setRecordSummaries(''); setEncounter('');
    setNarrative(''); setEditRequest(''); setCti(''); setCtiEditRequest(''); setError('');
    summariesRef.current = '';
  };

  const docCount = Object.values(docs).filter(v => v.trim()).length;

  const summarizeAndContinue = async () => {
    if (docCount === 0) { setStage(3); return; }
    setLoading(true); setLoadingMsg('Summarizing uploaded records...');
    try {
      const docText = DOC_FIELDS
        .filter(f => docs[f.key]?.trim())
        .map(f => `=== ${f.label.toUpperCase()} ===\n${docs[f.key]}`)
        .join('\n\n');
      const text = await streamGenerate({
        system: buildRecordSummarySystem(),
        messages: [{ role: 'user', content: `Summarize these medical records:\n\n${docText}` }],
        max_tokens: 2000,
      });
      summariesRef.current = text;
      setRecordSummaries(text);
      setStage(3);
    } catch (e) {
      summariesRef.current = '';
      setRecordSummaries('');
      setStage(3);
    } finally { setLoading(false); setLoadingMsg(''); }
  };

  const generateNarrative = async () => {
    if (!encounter.trim()) { setError('Encounter narrative is required.'); return; }
    setError(''); setLoading(true); setLoadingMsg('Generating Admission Narrative...');
    const effectiveSummaries = summariesRef.current || recordSummaries;
    try {
      const text = await streamGenerate({
        system: buildNarrativeSystem(primaryDx, secondaryDx, effectiveSummaries ? { summaries: effectiveSummaries } : docs, encounter),
        messages: [{ role: 'user', content: 'Generate the Admission Narrative now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setNarrative(text); setStage(4);
    } catch (e) { setError(e.message || 'Generation failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const applyEdits = async () => {
    if (!editRequest.trim()) return;
    setLoading(true); setLoadingMsg('Applying edits...');
    try {
      const text = await streamGenerate({
        system: buildNarrativeEditSystem(narrative, editRequest),
        messages: [{ role: 'user', content: 'Apply the requested edits to the narrative now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setNarrative(text); setEditRequest('');
    } catch (e) { setError(e.message || 'Edit failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const generateCTI = async () => {
    setLoading(true); setLoadingMsg('Generating Certificate of Terminal Illness...'); setCti(''); setStage(5);
    try {
      const text = await streamGenerate({
        system: buildCTISystem(primaryDx, secondaryDx, docs, encounter, narrative),
        messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setCti(text);
    } catch (e) { setError(e.message || 'CTI generation failed. Please try again.'); setStage(4); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const applyCTIEdits = async () => {
    if (!ctiEditRequest.trim()) return;
    setLoading(true); setLoadingMsg('Applying edits...');
    try {
      const text = await streamGenerate({
        system: buildCTIEditSystem(cti, ctiEditRequest),
        messages: [{ role: 'user', content: 'Apply the requested edits now.' }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty');
      setCti(text); setCtiEditRequest('');
    } catch (e) { setError(e.message || 'Edit failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const stageLabels = ['Diagnosis', 'Records', 'Encounter', 'Narrative', 'CTI'];

  const clinicalTitles = {
    1: 'Diagnosis',
    2: 'Upload Records',
    3: 'Admission Encounter',
    4: 'Admission Narrative',
    5: 'Certificate of Terminal Illness',
  };

  const clinicalPrimary = {
    1: { action: () => { setError(''); setStage(2); }, label: 'Continue → Records', disabled: !primaryDx.trim() },
    2: { action: summarizeAndContinue, label: docCount > 0 ? 'Summarize Records & Continue →' : 'Continue → Encounter' },
    3: { action: generateNarrative, label: 'Generate Admission Narrative →', disabled: !encounter.trim() },
    4: { action: generateCTI, label: 'Create Certificate of Terminal Illness →' },
  };

  const clinicalBack = {
    1: onBack,
    2: () => setStage(1),
    3: () => setStage(2),
    4: () => setStage(1),
    5: () => setStage(4),
  };

  const clinicalBackLabel = {
    1: 'Admission Engine',
    2: 'Diagnosis',
    3: 'Records',
    4: 'Edit Inputs',
    5: 'Narrative',
  };

  const clinicalSecondary = {
    4: { action: reset, label: 'New Admission' },
    5: { action: reset, label: 'New Admission' },
  };

  return (
    <PageShell
      onHome={onBackHome}
      moduleName="Admission Engine"
      badge="CLINICAL MODE"
      steps={stageLabels}
      currentStep={stage - 1}
      onStepClick={(i) => { if (i + 1 < stage) setStage(i + 1); }}
      title={clinicalTitles[stage]}
      onBack={clinicalBack[stage]}
      backLabel={clinicalBackLabel[stage]}
      primaryAction={!loading && clinicalPrimary[stage]?.action}
      primaryLabel={clinicalPrimary[stage]?.label}
      primaryDisabled={clinicalPrimary[stage]?.disabled}
      secondaryAction={clinicalSecondary[stage]?.action}
      secondaryLabel={clinicalSecondary[stage]?.label}
    >
      <style>{`textarea::placeholder,input::placeholder{color:rgba(196,168,130,0.3)}textarea:focus,input:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}@keyframes voicePulse{0%,100%{box-shadow:0 0 0 2px rgba(220,80,80,0.3)}50%{box-shadow:0 0 0 5px rgba(220,80,80,0.1)}}`}</style>

      <ErrorBox message={error} />

      {loading && (
        <ProgressLoader
          message={loadingMsg}
          steps={['Analyzing records', 'Generating narrative', 'Creating CTI']}
          currentStep={loadingMsg.includes('Summariz') ? 0 : loadingMsg.includes('Narrative') ? 1 : loadingMsg.includes('CTI') || loadingMsg.includes('Certificate') ? 2 : 0}
        />
      )}

      {stage === 1 && !loading && (
        <div>
          <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px', fontSize: '17px', color: '#f0e8dc', fontFamily: C.sans, fontWeight: '600', lineHeight: 1.6 }}>
            The physician determines the primary terminal diagnosis. ClarityChart organizes all documentation around this diagnosis.
          </div>
          <div style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>PRIMARY TERMINAL DIAGNOSIS <span style={{ color: '#e07070' }}>*</span></div>
          <Input value={primaryDx} onChange={setPrimaryDx} placeholder="e.g., Chronic diastolic heart failure (HFpEF), end-stage" />
          <div style={{ fontSize: '17px', color: '#f0e8dc', fontFamily: C.sans, fontWeight: '600', letterSpacing: '2px', marginTop: '22px', marginBottom: '8px' }}>SECONDARY / CONTRIBUTING DIAGNOSES</div>
          <Textarea value={secondaryDx} onChange={setSecondaryDx} placeholder="e.g., CKD stage 4, Type 2 diabetes mellitus, hypertension..." rows={3} />
        </div>
      )}

      {stage === 2 && !loading && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontSize: '17px', color: C.gold, fontStyle: 'italic' }}>Paste text from available records. All fields optional. Include dates where possible.</div>
            <div style={{ fontSize: '15px', fontFamily: C.mono, color: docCount > 0 ? C.green : C.goldDim }}>{docCount}/{DOC_FIELDS.length} loaded</div>
          </div>
          {DOC_FIELDS.map(({key, label, placeholder}) => (
            <div key={key} style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '15px', fontFamily: C.mono, letterSpacing: '1.5px', color: docs[key]?.trim() ? C.gold : C.textDim, marginBottom: '6px' }}>
                {docs[key]?.trim() ? '✓ ' : '○ '}{label.toUpperCase()}
              </div>
              <Textarea value={docs[key] || ''} onChange={v => setDocs(d => ({...d,[key]:v}))} placeholder={placeholder} rows={docs[key]?.trim() ? 4 : 2} mono />
            </div>
          ))}
        </div>
      )}

      {stage === 3 && !loading && (
        <div>
          <div style={{ background: 'rgba(196,168,130,0.04)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px' }}>
            <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '10px' }}>DIAGNOSES</div>
            <div style={{ fontSize: '17px', color: C.text, marginBottom: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Primary: </span>{primaryDx}</div>
            {secondaryDx && <div style={{ fontSize: '19px', color: '#c8b8a8', fontWeight: '400', marginTop: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Secondary: </span>{secondaryDx}</div>}
          </div>

          {recordSummaries && (
            <div style={{ background: 'rgba(74,144,164,0.06)', border: `1px solid ${C.blueBorder}`, borderRadius: '2px', padding: '16px 18px', marginBottom: '24px' }}>
              <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.blue, fontFamily: C.mono, marginBottom: '12px' }}>RECORD SUMMARIES</div>
              {recordSummaries.split('\n').map((line, i) => {
                const isHeader = line.startsWith('[') && line.endsWith(']');
                if (isHeader) return <div key={i} style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '1px', marginTop: '14px', marginBottom: '4px' }}>{line}</div>;
                if (!line.trim()) return <div key={i} style={{ height: '4px' }} />;
                return <div key={i} style={{ fontSize: '19px', color: '#c8b8a8', fontWeight: '400', lineHeight: 1.6 }}>{line}</div>;
              })}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '15px', fontFamily: C.mono, letterSpacing: '2px', color: C.gold }}>
              ADMISSION ENCOUNTER NARRATIVE <span style={{ color: '#e07070' }}>*</span>
            </div>
            <VoiceBtn onTranscript={t => setEncounter(p => p ? p + ' ' + t : t)} />
          </div>
          <Textarea value={encounter} onChange={setEncounter} placeholder="Describe findings from the admission visit — functional assessment, systems review, goals of care discussion, FAST/PPS/KPS scores, family present..." rows={12} />
        </div>
      )}

      {stage === 4 && !loading && (
        <div>
          <Collapsible title="Transcribed Encounter Narrative" defaultOpen={false}>
            <div style={{ background: 'rgba(10,20,32,0.8)', borderRadius: '2px', padding: '14px 16px', maxHeight: '200px', overflowY: 'auto', fontSize: '19px', color: '#c8b8a8', fontWeight: '400', lineHeight: 1.7, fontFamily: C.serif, whiteSpace: 'pre-wrap' }}>
              {encounter}
            </div>
          </Collapsible>

          {narrative && (
            <div style={{ marginBottom: '28px' }}>
              <DocOutput title="Admission Narrative — Draft" content={narrative} />
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>REQUEST EDITS</div>
            <div style={{ fontSize: '17px', color: C.gold, marginBottom: '8px', fontStyle: 'italic' }}>
              Describe any changes needed — the AI will revise the narrative accordingly.
            </div>
            <Textarea value={editRequest} onChange={setEditRequest} placeholder="e.g., Change the weight to 118 lbs. Add that patient has a stage 2 sacral wound. Remove the mention of prior hospitalization in 2024..." rows={4} />
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
              <Btn variant="secondary" onClick={applyEdits} disabled={!editRequest.trim()}>Apply Edits</Btn>
            </div>
          </div>
        </div>
      )}

      {stage === 5 && !loading && (
        <div>
          {cti && <DocOutput title="Certificate of Terminal Illness" content={cti} />}
          {cti && (
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '15px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>REQUEST EDITS</div>
              <div style={{ fontSize: '15px', color: C.textDim, marginBottom: '8px', fontStyle: 'italic' }}>Describe any changes needed — the AI will revise the CTI accordingly.</div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <Textarea value={ctiEditRequest} onChange={setCtiEditRequest} placeholder="e.g., Change the EF to 35%. Add that patient has a history of COPD. Adjust the prognostic statement..." rows={3} />
                </div>
                <VoiceBtn onTranscript={t => setCtiEditRequest(p => p ? p + ' ' + t : t)} />
              </div>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <Btn variant="secondary" onClick={applyCTIEdits} disabled={!ctiEditRequest.trim()}>Apply Edits</Btn>
              </div>
            </div>
          )}

          {narrative && (
            <div style={{ marginTop: '28px' }}>
              <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '12px' }}>ADMISSION NARRATIVE — FOR REFERENCE</div>
              <div style={{ background: 'rgba(10,20,32,0.7)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '20px 24px', maxHeight: '400px', overflowY: 'auto', fontFamily: C.serif }}>
                {narrative.split('\n').map((line, i) => {
                  const isHeader = /^[A-Z][A-Z\s\/\(\)\-,]{4,}$/.test(line.trim()) && line.trim().length > 3;
                  if (isHeader) return <div key={i} style={{ color: C.gold, fontFamily: C.mono, fontSize: '15px', letterSpacing: '2px', marginTop: '18px', marginBottom: '5px', paddingBottom: '4px', borderBottom: `1px solid rgba(196,168,130,0.12)` }}>{line}</div>;
                  if (!line.trim()) return <div key={i} style={{ height: '6px' }} />;
                  return <div key={i} style={{ color: C.textDim, fontSize: '17px', lineHeight: 1.75 }}>{line}</div>;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}
