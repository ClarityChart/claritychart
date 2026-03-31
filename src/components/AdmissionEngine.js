'use client';
import { useState, useRef } from 'react';
import { C } from './tokens';
import { Textarea, Input, Btn, VoiceBtn, DocOutput } from './ui';
import { buildNarrativeSystem, buildCTISystem } from './prompts';
import { DEMO_PATIENTS, PATIENT_LIST } from './demoPatients';

const EMPTY_DOCS = { dischargeSummary: '', hp: '', palliativeCare: '', specialistNote: '', woundCare: '', labs: '' };

const DOC_FIELDS = [
  { key: 'dischargeSummary', label: 'Discharge Summary' },
  { key: 'hp', label: 'History & Physical' },
  { key: 'palliativeCare', label: 'Palliative Care Note' },
  { key: 'specialistNote', label: 'Specialist Note' },
  { key: 'woundCare', label: 'Wound Care Note' },
  { key: 'labs', label: 'Lab Results' },
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
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
            PLATFORM HOME
          </button>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>ADMISSION ENGINE</div>
          <div style={{ fontSize: '20px', color: C.text }}>New Patient Admission</div>
          <div style={{ fontSize: '12px', color: C.goldDim, marginTop: '4px', fontStyle: 'italic' }}>Choose how you would like to proceed</div>
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
        <div style={{ fontSize: '24px', color: C.gold }}>{icon}</div>
        <span style={{ fontSize: '10px', color: badgeColor, background: `${badgeColor}18`, border: `1px solid ${badgeColor}40`, borderRadius: '10px', padding: '2px 10px', fontFamily: C.mono, letterSpacing: '1px' }}>{badge}</span>
      </div>
      <div style={{ fontSize: '16px', color: C.text, marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '11px', color: C.goldDim, fontFamily: C.mono, letterSpacing: '1px', marginBottom: '12px' }}>{subtitle}</div>
      <div style={{ fontSize: '12px', color: C.textDim, lineHeight: 1.6, fontStyle: 'italic' }}>{description}</div>
      <div style={{ marginTop: '20px', fontSize: '11px', color: hov ? C.gold : C.border, fontFamily: C.mono, letterSpacing: '1px', transition: 'color 0.15s' }}>
        ENTER {title.toUpperCase()} →
      </div>
    </div>
  );
}

function DemoMode({ onBack, onBackHome }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [droppedDocs, setDroppedDocs] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [encounter, setEncounter] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [narrative, setNarrative] = useState('');
  const [cti, setCti] = useState('');
  const [error, setError] = useState('');
  const [stage, setStage] = useState('select'); // select | build | output

  const patient = selectedPatient ? DEMO_PATIENTS[selectedPatient] : null;

  const selectPatient = (id) => {
    setSelectedPatient(id);
    setDroppedDocs([]);
    setEncounter('');
    setNarrative('');
    setCti('');
    setError('');
    setStage('build');
  };

  const handleDragStart = (doc) => setDragging(doc);
  const handleDragEnd = () => setDragging(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (dragging && !droppedDocs.find(d => d.id === dragging.id)) {
      setDroppedDocs(prev => [...prev, dragging]);
      if (!encounter && patient) setEncounter(patient.encounter);
    }
    setDragging(null);
  };

  const removeDoc = (docId) => setDroppedDocs(prev => prev.filter(d => d.id !== docId));

  const loadAll = () => {
    if (patient) {
      setDroppedDocs([...patient.documents]);
      setEncounter(patient.encounter);
    }
  };

  const generate = async () => {
    if (!patient) return;
    if (droppedDocs.length === 0) { setError('Add at least one document to the workspace before generating.'); return; }
    if (!encounter.trim()) { setError('Encounter narrative is required.'); return; }

    // Build docs object from dropped documents
    const docs = { dischargeSummary: '', hp: '', palliativeCare: '', specialistNote: '', woundCare: '', labs: '' };
    droppedDocs.forEach(doc => {
      const field = docTypeToField(doc.type);
      docs[field] = docs[field] ? docs[field] + '\n\n' + doc.content : doc.content;
    });

    setError(''); setLoading(true); setStage('output'); setNarrative(''); setCti('');
    try {
      setLoadingMsg('Generating Admission Narrative… (step 1 of 2)');
      const r1 = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildNarrativeSystem(patient.diagnosis, patient.secondaryDx, docs, encounter),
          messages: [{ role: 'user', content: 'Generate the Admission Narrative now.' }]
        })
      });
      const d1 = await r1.json();
      const narr = (d1.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!narr) throw new Error('Empty narrative response');
      setNarrative(narr);

      setLoadingMsg('Generating Certificate of Terminal Illness… (step 2 of 2)');
      const r2 = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildCTISystem(patient.diagnosis, patient.secondaryDx, docs, encounter, narr),
          messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }]
        })
      });
      const d2 = await r2.json();
      setCti((d2.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, ''));
    } catch (e) {
      setError('Generation failed. Please try again.');
      setStage('build');
    } finally {
      setLoading(false); setLoadingMsg('');
    }
  };

  const reset = () => {
    setStage('select'); setSelectedPatient(null); setDroppedDocs([]);
    setEncounter(''); setNarrative(''); setCti(''); setError('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`
        textarea::placeholder{color:rgba(196,168,130,0.3)}textarea:focus{outline:none}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}
        @keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        .doc-card{transition:all 0.15s;cursor:grab}
        .doc-card:hover{border-color:rgba(196,168,130,0.4)!important;background:rgba(196,168,130,0.08)!important}
        .doc-card:active{cursor:grabbing}
      `}</style>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 28px 80px' }}>

        {/* Header */}
        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
              ADMISSION ENGINE
            </button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>DEMO MODE</div>
            <div style={{ fontSize: '20px', color: C.text }}>
              {stage === 'select' ? 'Select Demo Patient' : stage === 'build' ? (patient?.name + ' — ' + patient?.diagnosis.substring(0, 40) + '...') : 'Generated Documents'}
            </div>
          </div>
          {stage !== 'select' && <Btn variant="ghost" onClick={reset}>← Patients</Btn>}
        </div>

        {/* Patient Selection */}
        {stage === 'select' && (
          <div>
            <div style={{ fontSize: '13px', color: C.goldDim, marginBottom: '24px', fontStyle: 'italic' }}>
              Select a patient to load their chart documents. Drag documents into the workspace, then generate.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PATIENT_LIST.map(id => {
                const p = DEMO_PATIENTS[id];
                return (
                  <div key={id} onClick={() => selectPatient(id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px', background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.bgCardHover; e.currentTarget.style.borderColor = C.borderHover; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.bgCard; e.currentTarget.style.borderColor = C.border; }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '2px', background: `${p.color}18`, border: `1px solid ${p.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: p.color, fontFamily: C.mono, flexShrink: 0 }}>
                      {p.name}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', color: C.text, marginBottom: '4px' }}>{p.diagnosis}</div>
                      <div style={{ fontSize: '12px', color: C.goldDim, fontFamily: C.mono }}>{p.tagline}</div>
                    </div>
                    <div style={{ fontSize: '11px', color: C.goldDim, fontFamily: C.mono }}>{p.documents.length} documents</div>
                    <div style={{ fontSize: '16px', color: C.border }}>›</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Build Stage */}
        {stage === 'build' && patient && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>

              {/* Left: Available documents */}
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: C.goldDim, fontFamily: C.mono, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>CHART DOCUMENTS</span>
                  <button onClick={loadAll} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '9px', letterSpacing: '1px', padding: '3px 10px', borderRadius: '2px' }}>
                    LOAD ALL
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {patient.documents.map(doc => {
                    const isDropped = droppedDocs.find(d => d.id === doc.id);
                    return (
                      <div key={doc.id}
                        className="doc-card"
                        draggable={!isDropped}
                        onDragStart={() => !isDropped && handleDragStart(doc)}
                        onDragEnd={handleDragEnd}
                        style={{
                          padding: '10px 14px', background: isDropped ? 'rgba(76,175,130,0.06)' : C.bgCard,
                          border: `1px solid ${isDropped ? C.greenBorder : C.border}`,
                          borderRadius: '2px', opacity: isDropped ? 0.5 : 1,
                          cursor: isDropped ? 'default' : 'grab',
                          display: 'flex', alignItems: 'center', gap: '10px',
                        }}>
                        <span style={{ fontSize: '14px', flexShrink: 0 }}>
                          {isDropped ? '✓' : '⠿'}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', color: isDropped ? C.green : C.text, fontFamily: C.mono, letterSpacing: '0.5px' }}>{doc.type}</div>
                          <div style={{ fontSize: '10px', color: C.goldDim }}>{doc.date}</div>
                        </div>
                        {!isDropped && <span style={{ fontSize: '10px', color: C.goldDim, fontFamily: C.mono }}>drag →</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Drop zone */}
              <div>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: C.goldDim, fontFamily: C.mono, marginBottom: '12px' }}>
                  WORKSPACE ({droppedDocs.length} documents)
                </div>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{
                    minHeight: '240px', border: `2px dashed ${dragOver ? C.gold : C.border}`,
                    borderRadius: '2px', padding: '16px', transition: 'all 0.15s',
                    background: dragOver ? 'rgba(196,168,130,0.06)' : 'rgba(0,0,0,0.1)',
                  }}>
                  {droppedDocs.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '180px', color: C.goldDim, fontFamily: C.mono, fontSize: '11px', letterSpacing: '1px', textAlign: 'center', gap: '8px' }}>
                      <div style={{ fontSize: '24px', opacity: 0.4 }}>⊕</div>
                      <div>DRAG DOCUMENTS HERE</div>
                      <div style={{ fontSize: '10px', opacity: 0.6 }}>or click LOAD ALL to add all documents</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {droppedDocs.map(doc => (
                        <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(196,168,130,0.06)', border: `1px solid ${C.border}`, borderRadius: '2px' }}>
                          <span style={{ fontSize: '12px', color: C.green }}>✓</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', color: C.text, fontFamily: C.mono }}>{doc.type}</div>
                            <div style={{ fontSize: '10px', color: C.goldDim }}>{doc.date}</div>
                          </div>
                          <button onClick={() => removeDoc(doc.id)} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Encounter narrative */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: C.gold, fontFamily: C.mono, marginBottom: '8px' }}>
                ADMISSION ENCOUNTER NARRATIVE <span style={{ color: '#e07070' }}>*</span>
              </div>
              <div style={{ position: 'relative' }}>
                <Textarea value={encounter} onChange={setEncounter} placeholder="Dictate or type the admission encounter narrative..." rows={8} />
                <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                  <VoiceBtn onTranscript={t => setEncounter(p => p ? p + ' ' + t : t)} />
                </div>
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>
                {error}
              </div>
            )}

            {/* Generate */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', color: C.textDim, fontFamily: C.mono }}>
                {droppedDocs.length} document{droppedDocs.length !== 1 ? 's' : ''} in workspace · {encounter.trim() ? '✓ Encounter ready' : '⚠ Encounter required'}
              </div>
              <Btn onClick={generate} disabled={droppedDocs.length === 0 || !encounter.trim()} style={{ padding: '12px 32px' }}>
                Generate Documents →
              </Btn>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '20px' }}>{loadingMsg}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}
            </div>
          </div>
        )}

        {/* Output */}
        {stage === 'output' && !loading && (
          <div>
            {narrative && <DocOutput title="Admission Narrative" content={narrative} />}
            {cti && <DocOutput title="Certificate of Terminal Illness" content={cti} />}
            {narrative && cti && (
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <Btn variant="secondary" onClick={() => { setStage('build'); setNarrative(''); setCti(''); }}>← Edit</Btn>
                <Btn variant="secondary" onClick={reset}>New Patient</Btn>
              </div>
            )}
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
  const [encounter, setEncounter] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [narrative, setNarrative] = useState('');
  const [cti, setCti] = useState('');
  const [error, setError] = useState('');

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
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildNarrativeSystem(primaryDx, secondaryDx, docs, encounter),
          messages: [{ role: 'user', content: 'Generate the Admission Narrative now.' }]
        })
      });
      const d1 = await r1.json();
      const narr = (d1.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, '');
      if (!narr) throw new Error('Empty narrative response');
      setNarrative(narr);

      setLoadingMsg('Generating Certificate of Terminal Illness… (step 2 of 2)');
      const r2 = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 4000,
          system: buildCTISystem(primaryDx, secondaryDx, docs, encounter, narr),
          messages: [{ role: 'user', content: 'Generate the Certificate of Terminal Illness now.' }]
        })
      });
      const d2 = await r2.json();
      setCti((d2.content?.[0]?.text || '').replace(/\*\*/g, '').replace(/\*/g, ''));
    } catch (e) {
      setError('Generation failed. Please try again.');
      setStage(3);
    } finally {
      setLoading(false); setLoadingMsg('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.serif, color: C.text }}>
      <style>{`textarea::placeholder,input::placeholder{color:rgba(196,168,130,0.3)}textarea:focus,input:focus{outline:none}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(196,168,130,0.2);border-radius:3px}@keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}`}</style>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 28px 80px' }}>

        <div style={{ padding: '28px 0 24px', borderBottom: `1px solid ${C.border}`, marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.goldDim, cursor: 'pointer', fontFamily: C.mono, fontSize: '10px', letterSpacing: '2px', padding: 0, marginBottom: '12px', display: 'block' }}>
              ADMISSION ENGINE
            </button>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: C.goldDim, fontFamily: C.mono, marginBottom: '4px' }}>CLINICAL MODE</div>
            <div style={{ fontSize: '20px', color: C.text }}>New Patient Admission</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {(stage > 1 || primaryDx) && <Btn variant="ghost" onClick={reset}>Reset</Btn>}
          </div>
        </div>

        {stage < 4 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
            {[{n:1,l:'Diagnosis'},{n:2,l:'Records'},{n:3,l:'Encounter'}].map(s => (
              <div key={s.n} onClick={() => s.n < stage && setStage(s.n)} style={{ flex: 1, cursor: s.n < stage ? 'pointer' : 'default' }}>
                <div style={{ height: '2px', background: s.n <= stage ? C.gold : C.border, marginBottom: '5px' }} />
                <div style={{ fontSize: '10px', letterSpacing: '2px', fontFamily: C.mono, color: s.n === stage ? C.gold : s.n < stage ? C.goldDim : 'rgba(196,168,130,0.25)' }}>{s.n}. {s.l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        )}

        {error && <div style={{ background: 'rgba(224,112,112,0.08)', border: '1px solid rgba(224,112,112,0.3)', borderRadius: '2px', padding: '10px 16px', color: '#e07070', fontSize: '12px', fontFamily: C.mono, marginBottom: '20px' }}>{error}</div>}

        {stage === 1 && (
          <div>
            <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px', fontSize: '12px', color: C.goldDim, fontFamily: C.mono, lineHeight: 1.6 }}>
              The physician determines the primary terminal diagnosis. ClarityChart organizes all documentation around this diagnosis.
            </div>
            <div style={{ fontSize: '11px', color: C.gold, fontFamily: C.mono, letterSpacing: '2px', marginBottom: '8px' }}>PRIMARY TERMINAL DIAGNOSIS <span style={{ color: '#e07070' }}>*</span></div>
            <Input value={primaryDx} onChange={setPrimaryDx} placeholder="e.g., Chronic diastolic heart failure (HFpEF), end-stage" />
            <div style={{ fontSize: '11px', color: C.goldDim, fontFamily: C.mono, letterSpacing: '2px', marginTop: '22px', marginBottom: '8px' }}>SECONDARY / CONTRIBUTING DIAGNOSES</div>
            <Textarea value={secondaryDx} onChange={setSecondaryDx} placeholder="e.g., CKD stage 4, Type 2 diabetes mellitus, hypertension..." rows={3} />
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
              <Btn onClick={() => { if (!primaryDx.trim()) { setError('Primary diagnosis is required.'); return; } setError(''); setStage(2); }}>Continue → Records</Btn>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: C.goldDim }}>Paste text from available records. All fields optional.</div>
              <div style={{ fontSize: '11px', fontFamily: C.mono, color: docCount > 0 ? C.green : C.goldDim }}>{docCount}/6 loaded</div>
            </div>
            {DOC_FIELDS.map(({key, label}) => (
              <div key={key} style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '1.5px', color: docs[key].trim() ? C.gold : C.textDim, marginBottom: '6px' }}>
                  {docs[key].trim() ? '✓ ' : '○ '}{label.toUpperCase()}
                </div>
                <Textarea value={docs[key]} onChange={v => setDocs(d => ({...d,[key]:v}))} placeholder={`Paste ${label}...`} rows={docs[key].trim() ? 4 : 2} mono />
              </div>
            ))}
            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={() => setStage(1)}>← Back</Btn>
              <Btn onClick={() => setStage(3)}>Continue → Encounter</Btn>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div>
            <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginBottom: '24px', fontSize: '12px', color: C.goldDim, fontFamily: C.mono, lineHeight: 1.6 }}>
              Describe findings from the admission visit — functional status, systems review, goals of care, FAST/PPS/KPS scores, family present. Voice or text.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '11px', fontFamily: C.mono, letterSpacing: '2px', color: C.gold }}>ADMISSION ENCOUNTER NARRATIVE <span style={{ color: '#e07070' }}>*</span></div>
              <VoiceBtn onTranscript={t => setEncounter(p => p ? p + ' ' + t : t)} />
            </div>
            <Textarea value={encounter} onChange={setEncounter} placeholder="Dictate or type the admission encounter narrative..." rows={12} />
            <div style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${C.border}`, borderRadius: '2px', padding: '14px 18px', marginTop: '20px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: C.goldDim, fontFamily: C.mono, marginBottom: '10px' }}>READY TO GENERATE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: C.textDim }}>
                <div>Primary Dx: <span style={{ color: C.text }}>{primaryDx.substring(0,40)}{primaryDx.length>40?'...':''}</span></div>
                <div>Records: <span style={{ color: docCount > 0 ? C.green : C.textDim }}>{docCount} of 6 loaded</span></div>
                <div>Encounter: <span style={{ color: encounter.trim() ? C.green : '#e07070' }}>{encounter.trim() ? '✓ Ready' : '⚠ Required'}</span></div>
                <div>Output: <span style={{ color: C.gold }}>Narrative + CTI</span></div>
              </div>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <Btn variant="secondary" onClick={() => setStage(2)}>← Back</Btn>
              <Btn onClick={generate} disabled={!encounter.trim()} style={{ padding: '12px 32px' }}>Generate Documents →</Btn>
            </div>
          </div>
        )}

        {stage === 4 && (
          <div>
            {loading && (
              <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '40px', textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '3px', color: C.gold, fontFamily: C.mono, marginBottom: '20px' }}>{loadingMsg}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.gold, animation: `bounce 1.2s ${i*0.2}s infinite ease-in-out` }} />)}
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
// cache bust Tue Mar 31 07:43:28 PDT 2026
