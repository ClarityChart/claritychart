'use client';
import { useState, useRef } from 'react';
import { C } from './tokens';
import { Textarea, Input, Btn, VoiceBtn, DocOutput, TopNav, ErrorBox, Collapsible, ProgressLoader, EditableDraft, BackBtn, ProgressSteps, useUnsavedWarning } from './ui';
import { buildNarrativeSystem, buildCTISystem, buildRecordSummarySystem, buildNarrativeEditSystem } from './prompts';
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

// Map document types to form fields
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
  const [mode, setMode] = useState(null); // null=choose, 'demo', 'clinical'

  if (mode === 'demo') return <DemoMode onBack={() => setMode(null)} onBackHome={onBack} />;
  if (mode === 'clinical') return <ClinicalMode onBack={() => setMode(null)} onBackHome={onBack} />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}`}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '48px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '16px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
            PLATFORM HOME
          </button>
          <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '4px' }}>ADMISSION ENGINE</div>
          <div style={{ fontSize: 'clamp(30px,2.8vw,36px)', color: '#f0e8dc', fontWeight: '800', letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>New Patient Admission</div>
          <div style={{ fontSize: '17px', color: C.gold, marginTop: '4px', fontStyle: 'italic' }}>Choose how you would like to proceed</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
        </div>
      </div>
    </div>
  );
}

function ModeCard({ title, subtitle, description, badge, badgeColor, icon, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? C.bgCardHover : C.bgCard, border: `1px solid ${hov ? C.borderHover : C.border}`, borderRadius: '2px', padding: '28px 24px', cursor: 'pointer', transition: 'all 0.15s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ fontSize: '28px', color: C.gold }}>{icon}</div>
        <span style={{ fontSize: '16px', color: badgeColor, background: `${badgeColor}18`, border: `1px solid ${badgeColor}40`, borderRadius: '10px', padding: '2px 10px', fontFamily: C.mono, letterSpacing: '1px' }}>{badge}</span>
      </div>
      <div style={{ fontSize: '20px', color: C.text, marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '17px', color: '#f0e8dc', fontFamily: C.sans, fontWeight: '600', letterSpacing: '1px', marginBottom: '12px' }}>{subtitle}</div>
      <div style={{ fontSize: '19px', color: '#c8b8a8', fontWeight: '400', lineHeight: 1.6, fontStyle: 'italic' }}>{description}</div>
      <div style={{ marginTop: '20px', fontSize: '15px', color: hov ? C.gold : C.border, fontFamily: C.mono, letterSpacing: '1px', transition: 'color 0.15s' }}>
        ENTER {title.toUpperCase()} →
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
        background: hov ? '#344f6e' : '#2d4460',
        border: `1px solid ${hov ? 'rgba(196,168,130,0.6)' : 'rgba(196,168,130,0.3)'}`,
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
      <div style={{ fontSize: '20px', color: hov ? '#d4b896' : 'rgba(196,168,130,0.4)' }}>›</div>
    </div>
  );
}

function DemoMode({ onBack, onBackHome }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [droppedDocs, setDroppedDocs] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [recordSummaries, setRecordSummaries] = useState('');
  const [encounter, setEncounter] = useState('');
  const [narrative, setNarrative] = useState('');
  const [editRequest, setEditRequest] = useState('');
  const [cti, setCti] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('select'); // select | build | encounter | narrative | cti

  const patient = selectedPatient ? DEMO_PATIENTS[selectedPatient] : null;

  const selectPatient = (id) => {
    setSelectedPatient(id);
    setDroppedDocs([]); setRecordSummaries(''); setEncounter('');
    setNarrative(''); setEditRequest(''); setCti(''); setError('');
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

  // Build docs object from dropped documents
  const buildDocs = () => {
    const docs = { dischargeSummary: '', hp: '', palliativeCare: '', specialistNote: '', woundCare: '', labs: '', imaging: '' };
    droppedDocs.forEach(doc => {
      const field = docTypeToField(doc.type);
      docs[field] = docs[field] ? docs[field] + '\n\n' + doc.content : doc.content;
    });
    return docs;
  };

  // Stage build -> encounter: summarize records
  const summarizeAndContinue = async () => {
    if (!patient || droppedDocs.length === 0) { setStage('encounter'); return; }
    setLoading(true); setLoadingMsg('Summarizing chart documents...');
    try {
      const docText = droppedDocs.map(d => `=== ${d.type.toUpperCase()} (${d.date}) ===\n${d.content}`).join('\n\n');
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 2000,
          system: buildRecordSummarySystem(),
          messages: [{ role: 'user', content: `Summarize these medical records:\n\n${docText}` }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      setRecordSummaries(text);
      setEncounter(patient.encounter);
      setStage('encounter');
    } catch (e) {
      setRecordSummaries('');
      setEncounter(patient?.encounter || '');
      setStage('encounter');
    } finally { setLoading(false); setLoadingMsg(''); }
  };

  // Generate narrative
  const generateNarrative = async () => {
    if (!patient) return;
    setError(''); setLoading(true); setLoadingMsg('Generating Admission Narrative...');
    const docs = buildDocs();
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildNarrativeSystem(patient.diagnosis, patient.secondaryDx, docs, encounter),
          messages: [{ role: 'user', content: 'Generate the Admission Narrative now.' }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setNarrative(text); setStage('narrative');
    } catch (e) { setError('Generation failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  // Apply edits
  const applyEdits = async () => {
    if (!editRequest.trim()) return;
    setLoading(true); setLoadingMsg('Applying edits...');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildNarrativeEditSystem(narrative, editRequest),
          messages: [{ role: 'user', content: 'Apply the requested edits now.' }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setNarrative(text); setEditRequest('');
    } catch (e) { setError('Edit failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  // Generate CTI
  const generateCTI = async () => {
    if (!patient) return;
    setLoading(true); setLoadingMsg('Generating Certificate of Terminal Illness...'); setCti(''); setStage('cti');
    const docs = buildDocs();
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildCTISystem(patient.diagnosis, patient.secondaryDx, docs, encounter, narrative),
          messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setCti(text);
    } catch (e) { setError('CTI generation failed. Please try again.'); setStage('narrative'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const reset = () => {
    setStage('select'); setSelectedPatient(null); setDroppedDocs([]);
    setRecordSummaries(''); setEncounter(''); setNarrative('');
    setEditRequest(''); setCti(''); setError('');
  };

  const stageLabels = { select: 1, build: 2, encounter: 3, narrative: 4, cti: 5 };
  const stageTitles = ['Patient', 'Documents', 'Encounter', 'Narrative', 'CTI'];
  const currentStageNum = stageLabels[stage] || 1;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`
        textarea::placeholder{color:rgba(196,168,130,0.3)}textarea:focus{outline:none}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}
        @keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        @keyframes voicePulse{0%,100%{box-shadow:0 0 0 2px rgba(220,80,80,0.3)}50%{box-shadow:0 0 0 5px rgba(220,80,80,0.1)}}
        .doc-card{transition:all 0.15s;cursor:grab}.doc-card:hover{border-color:rgba(196,168,130,0.4)!important;background:rgba(196,168,130,0.08)!important}
      `}</style>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 28px 80px' }}>

        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <TopNav onHome={onBack} moduleName='Admission Engine' />
            <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '4px' }}>DEMO MODE</div>
            <div style={{ fontSize: 'clamp(30px,2.8vw,36px)', color: '#f0e8dc', fontWeight: '800', letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>
              {stage === 'select' && 'Select Demo Patient'}
              {stage === 'build' && (patient?.name + ' — Documents')}
              {stage === 'encounter' && 'Admission Encounter'}
              {stage === 'narrative' && 'Admission Narrative'}
              {stage === 'cti' && 'Certificate of Terminal Illness'}
            </div>
          </div>
          {stage !== 'select' && <Btn variant="ghost" onClick={reset}>← Patients</Btn>}
        </div>

        {stage !== 'select' && (
          <ProgressSteps
            steps={stageTitles}
            current={currentStageNum - 1}
            onStepClick={(i) => {
              const stageMap = ['select', 'build', 'encounter', 'narrative', 'cti'];
              if (i < currentStageNum - 1) setStage(stageMap[i + 1]);
            }}
          />
        )}

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
                        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(196,168,130,0.06)', border: `1px solid ${C.border}`, borderRadius: '2px' }}>
                          <span style={{ fontSize: '16px', color: C.green }}>✓</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '18px', color: C.text, fontFamily: C.mono }}>{doc.type}</div>
                            <div style={{ fontSize: '16px', color: C.gold }}>{doc.date}</div>
                          </div>
                          <button onClick={() => removeDoc(doc.id)} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontSize: '18px', padding: '0 4px' }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={summarizeAndContinue} disabled={droppedDocs.length === 0} style={{ padding: '12px 32px' }}>
                {droppedDocs.length > 0 ? 'Summarize & Continue →' : 'Add Documents First'}
              </Btn>
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
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <BackBtn onClick={() => setStage('build')} label="Documents" />
              <Btn onClick={generateNarrative} disabled={!encounter.trim()} style={{ padding: '12px 32px' }}>Generate Admission Narrative →</Btn>
            </div>
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
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '24px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <BackBtn onClick={() => setStage('encounter')} label="Encounter" />
              <div style={{ display: 'flex', gap: '12px' }}>
                <Btn variant="secondary" onClick={reset}>New Patient</Btn>
                <Btn onClick={generateCTI} style={{ padding: '12px 24px' }}>Create Certificate of Terminal Illness →</Btn>
              </div>
            </div>
          </div>
        )}

        {stage === 'cti' && !loading && (
          <div>
            {cti && <DocOutput title="Certificate of Terminal Illness" content={cti} />}
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
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <BackBtn onClick={() => setStage('narrative')} label="Narrative" />
              <Btn variant="secondary" onClick={reset}>New Patient</Btn>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ClinicalMode({ onBack, onBackHome }) {
  const [stage, setStage] = useState(1);
  const [primaryDx, setPrimaryDx] = useState('');
  const [secondaryDx, setSecondaryDx] = useState('');
  const [docs, setDocs] = useState(EMPTY_DOCS);
  const [recordSummaries, setRecordSummaries] = useState('');
  const [encounter, setEncounter] = useState('');
  const [narrative, setNarrative] = useState('');
  const [editRequest, setEditRequest] = useState('');
  const [cti, setCti] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setStage(1); setPrimaryDx(''); setSecondaryDx('');
    setDocs(EMPTY_DOCS); setRecordSummaries(''); setEncounter('');
    setNarrative(''); setEditRequest(''); setCti(''); setError('');
  };

  const docCount = Object.values(docs).filter(v => v.trim()).length;

  // Stage 2 -> 3: summarize records automatically
  const summarizeAndContinue = async () => {
    if (docCount === 0) { setStage(3); return; }
    setLoading(true); setLoadingMsg('Summarizing uploaded records...');
    try {
      const docText = DOC_FIELDS
        .filter(f => docs[f.key]?.trim())
        .map(f => `=== ${f.label.toUpperCase()} ===\n${docs[f.key]}`)
        .join('\n\n');
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 2000,
          system: buildRecordSummarySystem(),
          messages: [{ role: 'user', content: `Summarize these medical records:\n\n${docText}` }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      setRecordSummaries(text);
      setStage(3);
    } catch (e) {
      setRecordSummaries('');
      setStage(3);
    } finally { setLoading(false); setLoadingMsg(''); }
  };

  // Stage 3 -> 4: generate admission narrative
  const generateNarrative = async () => {
    if (!encounter.trim()) { setError('Encounter narrative is required.'); return; }
    setError(''); setLoading(true); setLoadingMsg('Generating Admission Narrative...');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildNarrativeSystem(primaryDx, secondaryDx, docs, encounter),
          messages: [{ role: 'user', content: 'Generate the Admission Narrative now.' }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setNarrative(text); setStage(4);
    } catch (e) { setError('Generation failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  // Stage 4: apply edits to narrative
  const applyEdits = async () => {
    if (!editRequest.trim()) return;
    setLoading(true); setLoadingMsg('Applying edits...');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildNarrativeEditSystem(narrative, editRequest),
          messages: [{ role: 'user', content: 'Apply the requested edits to the narrative now.' }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setNarrative(text); setEditRequest('');
    } catch (e) { setError('Edit failed. Please try again.'); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  // Stage 4 -> 5: generate CTI
  const generateCTI = async () => {
    setLoading(true); setLoadingMsg('Generating Certificate of Terminal Illness...'); setCti(''); setStage(5);
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildCTISystem(primaryDx, secondaryDx, docs, encounter, narrative),
          messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }]
        })
      });
      const d = await r.json();
      const text = (d.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!text) throw new Error('Empty');
      setCti(text);
    } catch (e) { setError('CTI generation failed. Please try again.'); setStage(4); }
    finally { setLoading(false); setLoadingMsg(''); }
  };

  const stageLabels = ['Diagnosis', 'Records', 'Encounter', 'Narrative', 'CTI'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`textarea::placeholder,input::placeholder{color:rgba(196,168,130,0.3)}textarea:focus,input:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}@keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        @keyframes voicePulse{0%,100%{box-shadow:0 0 0 2px rgba(220,80,80,0.3)}50%{box-shadow:0 0 0 5px rgba(220,80,80,0.1)}}`}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>

        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <TopNav onHome={onBack} moduleName='Admission Engine' />
            <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '4px' }}>CLINICAL MODE</div>
            <div style={{ fontSize: 'clamp(30px,2.8vw,36px)', color: '#f0e8dc', fontWeight: '800', letterSpacing: '-0.5px', fontFamily: 'Georgia, serif' }}>
              {stage === 1 && 'Diagnosis'}
              {stage === 2 && 'Upload Records'}
              {stage === 3 && 'Admission Encounter'}
              {stage === 4 && 'Admission Narrative'}
              {stage === 5 && 'Certificate of Terminal Illness'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {stage > 1 && <Btn variant="ghost" onClick={reset}>Reset</Btn>}
          </div>
        </div>

        <ProgressSteps
            steps={stageLabels}
            current={Math.min(stage - 1, stageLabels.length - 1)}
            onStepClick={(i) => { if (i + 1 < stage) setStage(i + 1); }}
          />

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
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={() => { if (!primaryDx.trim()) { setError('Primary diagnosis is required.'); return; } setError(''); setStage(2); }}>Continue → Records</Btn>
            </div>
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
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
              <BackBtn onClick={() => setStage(1)} label="Diagnosis" />
              <Btn onClick={summarizeAndContinue}>
                {docCount > 0 ? 'Summarize Records & Continue →' : 'Continue → Encounter'}
              </Btn>
            </div>
          </div>
        )}

        {stage === 3 && !loading && (
          <div>
            {/* Diagnoses summary */}
            <div style={{ background: 'rgba(196,168,130,0.04)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px' }}>
              <div style={{ fontSize: '16px', letterSpacing: '2px', color: C.gold, fontWeight: '700', textTransform: 'uppercase', fontFamily: C.mono, marginBottom: '10px' }}>DIAGNOSES</div>
              <div style={{ fontSize: '17px', color: C.text, marginBottom: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Primary: </span>{primaryDx}</div>
              {secondaryDx && <div style={{ fontSize: '19px', color: '#c8b8a8', fontWeight: '400', marginTop: '4px' }}><span style={{ color: C.goldDim, fontSize: '15px', fontFamily: C.mono }}>Secondary: </span>{secondaryDx}</div>}
            </div>

            {/* Record summaries */}
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

            {/* Encounter narrative */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '15px', fontFamily: C.mono, letterSpacing: '2px', color: C.gold }}>
                ADMISSION ENCOUNTER NARRATIVE <span style={{ color: '#e07070' }}>*</span>
              </div>
              <VoiceBtn onTranscript={t => setEncounter(p => p ? p + ' ' + t : t)} />
            </div>
            <Textarea value={encounter} onChange={setEncounter} placeholder="Describe findings from the admission visit — functional assessment, systems review, goals of care discussion, FAST/PPS/KPS scores, family present..." rows={12} />

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <BackBtn onClick={() => setStage(2)} label="Records" />
              <Btn onClick={generateNarrative} disabled={!encounter.trim()} style={{ padding: '12px 32px' }}>Generate Admission Narrative →</Btn>
            </div>
          </div>
        )}

        {stage === 4 && !loading && (
          <div>
            {/* Transcribed encounter - collapsible */}
            <Collapsible title="Transcribed Encounter Narrative" defaultOpen={false}>
              <div style={{ background: 'rgba(10,20,32,0.8)', borderRadius: '2px', padding: '14px 16px', maxHeight: '200px', overflowY: 'auto', fontSize: '19px', color: '#c8b8a8', fontWeight: '400', lineHeight: 1.7, fontFamily: C.serif, whiteSpace: 'pre-wrap' }}>
                {encounter}
              </div>
            </Collapsible>

            {/* Drafted narrative */}
            {narrative && (
              <div style={{ marginBottom: '28px' }}>
                <DocOutput title="Admission Narrative — Draft" content={narrative} />
              </div>
            )}

            {/* Edit request box */}
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

            {/* Three action buttons */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '24px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <BackBtn onClick={() => setStage(1)} label="Edit Inputs" />
              <div style={{ display: 'flex', gap: '12px' }}>
                <Btn variant="secondary" onClick={reset}>New Admission</Btn>
                <Btn onClick={generateCTI} style={{ padding: '12px 24px' }}>Create Certificate of Terminal Illness →</Btn>
              </div>
            </div>
          </div>
        )}

        {stage === 5 && !loading && (
          <div>
            {cti && <DocOutput title="Certificate of Terminal Illness" content={cti} />}

            {/* Admission Narrative for reference */}
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

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <BackBtn onClick={() => setStage(4)} label="Narrative" />
              <Btn variant="secondary" onClick={reset}>New Admission</Btn>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
