'use client';
import { streamGenerate } from '../lib/streamGenerate';
import { useState, useRef } from 'react';
import { C } from './tokens';
import { TopNav, ErrorBox, EditableDraft, BackBtn, Btn, ProgressSteps, ProgressLoader } from './ui';

const SCENARIOS = {
  routine: {
    name: "Routine Stable Visit", icon: "🩺",
    hint: "No significant changes — ongoing monitoring and support",
    prompts: [
      "General appearance, location found, and behavior upon arrival",
      "Cognitive and behavioral status vs. baseline",
      "Pain — verbal report and observable signs of discomfort",
      "Systems review — CV (rhythm, edema), respiratory (breath sounds, SpO2), GI/GU (BM, continence), skin (integrity, new findings)",
      "ADL status (bathing, dressing, toileting, transfers, feeding) — level of assistance vs. baseline",
      "Oral intake, appetite, weight trend, and hydration",
      "Mobility and fall risk",
      "Family/caregiver status and staff communication — concerns, education provided, instructions given"
    ]
  },
  pain: {
    name: "Uncontrolled / Worsening Pain", icon: "⚠️",
    hint: "New or escalating pain requiring assessment and intervention",
    prompts: [
      "Pain location, quality, severity (0-10), onset and duration — new or escalating?",
      "Observable signs of discomfort beyond verbal report",
      "Current analgesic regimen (scheduled and PRN) — what was tried today and response",
      "Intervention or medication change made or ordered; physician notification and orders received",
      "Systems review — CV, respiratory, skin, GI/GU (note anything relevant to pain etiology)",
      "ADL status — impact of pain on function and participation in care",
      "Patient and family understanding of pain management plan",
      "Follow-up plan and monitoring timeframe"
    ]
  },
  respiratory: {
    name: "Respiratory Distress", icon: "🫁",
    hint: "Increased dyspnea, secretions, or change in respiratory status",
    prompts: [
      "Respiratory rate, effort, work of breathing, and lung sounds",
      "SpO2 current vs. baseline; oxygen delivery method and flow rate",
      "Secretion status — type, volume, color, and management",
      "Patient's subjective report of dyspnea or air hunger",
      "CV status — heart rate, rhythm, edema (relevant to respiratory etiology)",
      "Medications used or ordered; physician notification and orders received",
      "ADL tolerance — any change in exertional capacity or functional status",
      "Family awareness, emotional status, and education provided"
    ]
  },
  dying: {
    name: "Active Dying / Imminent Death", icon: "🕊️",
    hint: "Patient showing signs of imminent death — hours to days",
    prompts: [
      "Level of consciousness and responsiveness — to voice, touch, stimulation",
      "Breathing pattern — rate, rhythm, Cheyne-Stokes, jaw breathing, apneic periods",
      "Skin changes — mottling (location, extent), cyanosis, temperature, color",
      "CV status — heart rate, rhythm, peripheral perfusion; oral secretions and management",
      "Urine output (color, amount, last void) and last bowel movement",
      "Comfort medications — what is ordered, administered, and effectiveness",
      "ADL status — fully dependent, position of comfort, repositioning",
      "Family present — who, emotional state, understanding of process, education and support provided"
    ]
  },
  decline: {
    name: "Acute Decline Visit", icon: "📉",
    hint: "Significant functional or cognitive change from established baseline",
    prompts: [
      "Specific change observed or reported that prompted this visit",
      "Functional and ADL status today vs. last visit — what changed and over what timeframe",
      "Cognitive and behavioral changes from baseline",
      "Systems review — CV, respiratory, skin, GI/GU — findings supporting decline",
      "Vital sign and weight/intake changes of clinical significance",
      "Family and staff observations supporting the decline",
      "Physician notification — findings communicated and orders received",
      "Interventions implemented; follow-up plan and visit frequency"
    ]
  },
  skin: {
    name: "Skin Breakdown / Wound", icon: "🩹",
    hint: "New or worsening pressure injury, MASD, skin tear, or wound",
    prompts: [
      "Wound location, type (pressure injury, MASD, skin tear), stage, and dimensions",
      "Wound bed — tissue type, color, moisture; exudate (amount, color, odor); periwound condition",
      "Wound care performed today per orders",
      "Contributing factors — moisture, incontinence, pressure, nutrition, mobility",
      "Broader skin survey — any new findings or changes to other areas",
      "Systems review — CV (perfusion, edema), GI/GU (continence), nutritional status",
      "ADL and mobility status — repositioning frequency, transfer method, pressure relief in place",
      "Staff and family education — what was taught and understanding verbalized"
    ]
  },
  fall: {
    name: "Fall or Injury", icon: "🚨",
    hint: "Post-fall assessment, injury evaluation, and safety planning",
    prompts: [
      "Date, time, circumstances — witnessed or unwitnessed; patient's account if available",
      "Head-to-toe injury assessment — findings by region",
      "Neurological and mental status post-fall; vital signs obtained",
      "Pain assessment related to injury",
      "Systems review — CV, respiratory, skin (abrasions, hematoma, swelling)",
      "ADL and mobility status post-fall vs. baseline",
      "Physician and family notification — time, findings reported, orders received",
      "Contributing factors identified; safety plan modifications discussed or implemented"
    ]
  },
  nutrition: {
    name: "Nutritional Decline", icon: "🍽️",
    hint: "Significant intake reduction, weight loss, or feeding concerns",
    prompts: [
      "Oral intake percentage and trend across recent visits; frequency of skipped meals",
      "Current weight with date, comparison to prior weights with dates",
      "Appetite status and meal behaviors; hydration status",
      "Dysphagia assessment — swallowing safety, diet texture, liquid consistency",
      "Supplements offered and acceptance; mid-arm circumference if measured",
      "Physical signs of malnutrition — cachexia, muscle wasting, skin changes",
      "ADL status relevant to feeding — self-feeding ability, cueing, positioning",
      "Family understanding and goals around nutrition; comfort-focused feeding discussed if appropriate"
    ]
  },
  behavioral: {
    name: "Behavioral / Psychological Crisis", icon: "💬",
    hint: "Agitation, anxiety, behavioral disturbance, or caregiver crisis",
    prompts: [
      "Specific behaviors — type, frequency, duration, severity, and identified triggers",
      "Patient's verbal and nonverbal communication",
      "Medications for agitation/anxiety (scheduled and PRN) — administered today and response",
      "Non-pharmacological interventions attempted and effectiveness",
      "Systems review — CV, respiratory, skin, GI/GU (rule out physical etiology)",
      "ADL status — impact of behavior on care delivery; safety assessment",
      "Family distress level, coping, and support provided",
      "Physician notification — findings communicated, orders received; follow-up plan"
    ]
  },
  goals: {
    name: "Goals of Care / Family Meeting", icon: "🤝",
    hint: "Prognosis discussion, comfort redirection, or advance directive review",
    prompts: [
      "Participants present — family members, facility staff, interdisciplinary team",
      "Prognosis and clinical status shared; family's understanding and emotional response",
      "Patient's expressed wishes and values if able to participate",
      "Advance directive and POLST reviewed — current status and any changes",
      "Current clinical status summary — CV, respiratory, functional, nutritional",
      "ADL and functional status — current dependence level relevant to goals discussion",
      "Goals, care priorities, and specific interventions accepted or declined",
      "Spiritual/psychosocial needs identified; follow-up plan and IDG notification"
    ]
  }
};

const SYSTEM_PROMPT = `You are an expert hospice clinical documentation specialist with deep knowledge of Medicare hospice regulations, CMS Conditions of Participation, and hospice nursing documentation standards. You write exclusively in the voice of an experienced hospice RN.

CRITICAL REQUIREMENTS:
1. Write in third-person clinical narrative — never use "I"
2. Open with a single line identifying the patient by initials, age, primary diagnosis, and visit type
3. Follow immediately with vital signs as a clean labeled list
4. On the next line after vitals, include: 'Active care plans addressed today include: [list the specific topics addressed during this visit, e.g. pain, constipation, falls/safety, anxiety/agitation, grief, wound care, dyspnea, nutrition, caregiver support — based on the scenario and clinical information provided]'
5. Then organize clinical findings under ALL CAPS section headers. Use only headers relevant to information provided. Standard headers: GENERAL APPEARANCE, NEUROLOGICAL/COGNITIVE, PAIN MANAGEMENT, SKIN/INTEGUMENTARY, CARDIOVASCULAR, RESPIRATORY, GASTROINTESTINAL/GENITOURINARY, MOBILITY/FALLS RISK, NUTRITION/HYDRATION, PSYCHOSOCIAL/FAMILY, STAFF COMMUNICATION
6. Only include sections for which clinical information was provided — never fabricate or assume findings
7. Use precise, hospice-appropriate clinical language throughout
8. Preserve all specific numbers, measurements, dates, and clinical observations exactly as provided
9. Give the most detailed documentation to the section most relevant to the visit scenario type
10. Do NOT include any conclusion about hospice eligibility, appropriateness, prognosis, or anticipated time of death — these belong exclusively in the CTI and Physician Recertification Note, never in a visit note
11. Do NOT add disclaimers, meta-commentary, or AI-generated notices
11. The note must read as if written by a skilled hospice RN immediately following the visit`;

const LOADING_STEPS = ['Analyzing clinical details', 'Structuring by system', 'Applying hospice-specific language', 'Finalizing note'];

export default function RNVisitNote({ onBack }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    initials: '', age: '', dx: '', setting: '', carePlans: '',
    temp: '', spo2: '', bp: '', hr: '', rr: '', pain: '', narrative: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [noteOutput, setNoteOutput] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef(null);
  const loadingRef = useRef(null);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const sc = selected ? SCENARIOS[selected] : null;

  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setError('Voice input requires Chrome or Edge.'); return; }
    if (isRecording) { recognitionRef.current?.stop(); return; }
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = 'en-US';
    let final = form.narrative;
    rec.onstart = () => setIsRecording(true);
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript + ' ';
        else interim += e.results[i][0].transcript;
      }
      upd('narrative', final + interim);
    };
    rec.onend = () => { setIsRecording(false); upd('narrative', final); };
    recognitionRef.current = rec;
    rec.start();
  };

  const generate = async () => {
    if (!form.initials || !form.dx || !form.narrative) {
      setError('Please fill in Patient Initials, Primary Diagnosis, and Visit Summary before generating.');
      return;
    }
    setError(''); setLoading(true); setLoadingStep(0);
    let cur = 0;
    loadingRef.current = setInterval(() => {
      if (cur < 3) { cur++; setLoadingStep(cur); }
      else clearInterval(loadingRef.current);
    }, 950);

    const userPrompt = `Generate a hospice nursing visit note.

SCENARIO: ${sc.name}
PATIENT: ${form.initials}${form.age ? ', ' + form.age + '-year-old' : ''}
PRIMARY DIAGNOSIS: ${form.dx}
${form.setting ? 'CARE SETTING: ' + form.setting : ''}
${form.carePlans ? 'ACTIVE CARE PLANS: ' + form.carePlans : ''}

VITAL SIGNS:
${form.temp ? 'Temperature: ' + form.temp + 'F' : ''}
${form.spo2 ? 'SpO2: ' + form.spo2 : ''}
${form.bp ? 'Blood Pressure: ' + form.bp : ''}
${form.hr ? 'Heart Rate: ' + form.hr : ''}
${form.rr ? 'Respiratory Rate: ' + form.rr + ' breaths/min' : ''}
${form.pain ? 'Pain: ' + form.pain : ''}

NURSES CLINICAL SUMMARY:
${form.narrative}`;

    try {
      const text = await streamGenerate({
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
        max_tokens: 4000,
      });
      if (!text) throw new Error('Empty response');
      setNoteOutput(text.replace(/\*\*/g, '').replace(/\*/g, ''));
      setStep(3);
    } catch (e) {
      setError('Error generating note. Please try again.');
    } finally {
      setLoading(false);
      clearInterval(loadingRef.current);
    }
  };

  const resetAll = () => {
    setStep(1); setSelected(null);
    setForm({ initials:'',age:'',dx:'',setting:'',carePlans:'',temp:'',spo2:'',bp:'',hr:'',rr:'',pain:'',narrative:'' });
    setNoteOutput(''); setError('');
  };

  const rnSteps = ['Scenario', 'Clinical Details', 'Visit Note'];
  const rnStepIndex = step - 1;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: C.sans, color: C.text }}>
      <TopNav onHome={onBack} moduleName="RN Visit Note" />
      <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 28px 80px' }}>

        <div style={{ paddingTop: '28px', marginBottom: '28px' }}>
          <ProgressSteps
            steps={['Scenario', 'Clinical Details', 'Visit Note']}
            current={step - 1}
            onStepClick={i => { if (i < step - 1) setStep(i + 1); }}
          />
        </div>

        {step === 1 && (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '28px' }}>
            <div style={{ fontSize: 'clamp(20px,2vw,24px)', color: C.text, fontFamily: C.serif, marginBottom: '6px' }}>What type of visit is this?</div>
            <div style={{ fontSize: '15px', color: C.textFaint, marginBottom: '24px', fontStyle: 'italic' }}>
              Select the scenario that best describes today's visit.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {Object.entries(SCENARIOS).map(([key, scenario]) => (
                <div key={key} onClick={() => setSelected(key)} style={{
                  border: `1px solid ${selected === key ? C.gold : C.border}`,
                  borderLeft: `3px solid ${selected === key ? C.gold : 'transparent'}`,
                  borderRadius: '6px', padding: '12px 14px', cursor: 'pointer',
                  background: selected === key ? 'rgba(196,168,130,0.07)' : 'rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'flex-start', gap: '10px', transition: 'all 0.15s',
                }}>
                  <span style={{ fontSize: '18px', flexShrink: 0, lineHeight: 1.3 }}>{scenario.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', color: selected === key ? C.text : C.textDim, fontWeight: '600', marginBottom: '2px' }}>{scenario.name}</div>
                    <div style={{ fontSize: '13px', color: C.goldDim, fontStyle: 'italic', lineHeight: 1.4 }}>{scenario.hint}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', paddingTop: '20px', borderTop: `1px solid rgba(196,168,130,0.15)` }}>
              <Btn onClick={() => setStep(2)} disabled={!selected}>Continue →</Btn>
            </div>
          </div>
        )}

        {step === 2 && !loading && (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '28px' }}>
            <div style={{ fontSize: 'clamp(20px,2vw,24px)', color: C.text, fontFamily: C.serif, marginBottom: '4px' }}>Clinical Details</div>
            <div style={{ fontSize: '15px', color: C.textFaint, marginBottom: '24px', fontStyle: 'italic' }}>
              Fill in what you observed. Speak freely in the narrative — the AI will structure it.
            </div>

            {sc && (
              <div style={{ background: C.goldFaint, border: `1px solid ${C.goldBorder}`, borderLeft: `3px solid ${C.gold}`, borderRadius: '6px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{sc.icon}</span>
                <div>
                  <div style={{ fontSize: '15px', color: C.text, fontWeight: '600' }}>{sc.name}</div>
                  <div style={{ fontSize: '13px', color: C.goldDim, fontStyle: 'italic', marginTop: '2px' }}>{sc.hint}</div>
                </div>
              </div>
            )}

            <FieldDivider>Patient Information</FieldDivider>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
              <FormField label="Patient Initials *">
                <FormInput value={form.initials} onChange={v => upd('initials', v)} placeholder="e.g. BB" />
              </FormField>
              <FormField label="Age">
                <FormInput value={form.age} onChange={v => upd('age', v)} placeholder="e.g. 87" />
              </FormField>
              <FormField label="Primary Diagnosis *">
                <FormInput value={form.dx} onChange={v => upd('dx', v)} placeholder="e.g. End-stage dementia, Alzheimers type" />
              </FormField>
              <FormField label="Care Setting">
                <select value={form.setting} onChange={e => upd('setting', e.target.value)} style={{ width: '100%', background: '#243650', border: `1.5px solid ${C.border}`, borderRadius: '6px', color: form.setting ? C.text : 'rgba(196,168,130,0.38)', padding: '10px 14px', fontFamily: C.sans, fontSize: '15px', outline: 'none', cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onFocus={e => { e.target.style.borderColor = C.gold; }}
                  onBlur={e => { e.target.style.borderColor = C.border; }}>
                  <option value="" style={{ background: '#1a2535' }}>Select...</option>
                  {['Memory care facility','Skilled nursing facility','Assisted living facility','Private home','Family home','Residential hospice'].map(o => <option key={o} style={{ background: '#1a2535' }}>{o}</option>)}
                </select>
              </FormField>
              <FormField label="Active Care Plans">
                <FormInput value={form.carePlans} onChange={v => upd('carePlans', v)} placeholder="e.g. Pain, Skin Breakdown, Falls/Safety" />
              </FormField>
            </div>

            <FieldDivider>Vital Signs</FieldDivider>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '8px' }}>
              {[
                ['temp','Temperature (F)','e.g. 97.4'],
                ['spo2','SpO2','e.g. 96% on room air'],
                ['bp','Blood Pressure','e.g. 122/75 or unable to obtain'],
                ['hr','Heart Rate','e.g. 62 bpm irregular'],
                ['rr','Respiratory Rate','e.g. 16'],
                ['pain','Pain Score (0-10)','e.g. 0, denies pain / 6/10'],
              ].map(([k, lbl, ph]) => (
                <FormField key={k} label={lbl}>
                  <FormInput value={form[k]} onChange={v => upd(k, v)} placeholder={ph} />
                </FormField>
              ))}
            </div>

            <FieldDivider>Clinical Narrative *</FieldDivider>
            {sc && (
              <div style={{ background: 'rgba(196,168,130,0.05)', border: `1px solid ${C.navBorder}`, borderRadius: '6px', padding: '14px 16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: C.goldDim, fontFamily: C.mono, marginBottom: '10px', textTransform: 'uppercase' }}>Speak to these points</div>
                {sc.prompts.map((p, i) => (
                  <div key={i} style={{ fontSize: '14px', color: C.textDim, marginBottom: '5px', display: 'flex', gap: '10px', lineHeight: 1.5 }}>
                    <span style={{ color: C.goldDim, flexShrink: 0 }}>→</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            )}

            <FormField label="Your Visit Summary *">
              <div style={{ position: 'relative' }}>
                <textarea
                  value={form.narrative}
                  onChange={e => upd('narrative', e.target.value)}
                  rows={9}
                  placeholder="Describe what you observed and did during the visit. Speak naturally — include patient appearance, behavior, any changes from last visit, interventions, family interactions, and staff communications."
                  style={{ width: '100%', background: '#243650', border: `1.5px solid ${C.border}`, borderRadius: '6px', color: C.text, padding: '12px 14px', paddingBottom: '52px', fontFamily: C.sans, fontSize: '15px', lineHeight: 1.65, resize: 'vertical', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s, box-shadow 0.15s' }}
                  onFocus={e => { e.target.style.borderColor = C.gold; e.target.style.boxShadow = '0 0 0 3px rgba(196,168,130,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none'; }}
                />
                <button onClick={toggleVoice} style={{
                  position: 'absolute', right: '10px', bottom: '10px',
                  background: isRecording ? 'rgba(240,128,128,0.15)' : 'rgba(196,168,130,0.1)',
                  border: `1.5px solid ${isRecording ? C.redBorder : C.goldBorder}`,
                  borderRadius: '6px', color: isRecording ? C.red : C.gold,
                  padding: '5px 14px', cursor: 'pointer', fontFamily: C.mono,
                  fontSize: '12px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px',
                  textTransform: 'uppercase', fontWeight: '600',
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: isRecording ? C.red : C.gold, flexShrink: 0 }} />
                  {isRecording ? 'Stop' : 'Dictate'}
                </button>
              </div>
            </FormField>

            <ErrorBox message={error} />


          </div>
        )}

        {loading && (
          <ProgressLoader
            steps={LOADING_STEPS}
            currentStep={loadingStep}
            message="Drafting your visit note..."
          />
        )}

        {step === 2 && !loading && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '20px', borderTop: `1px solid rgba(196,168,130,0.15)` }}>
            <BackBtn onClick={() => setStep(1)} label="Scenarios" />
            <Btn onClick={generate} disabled={!form.narrative?.trim()} style={{ padding: '12px 32px' }}>
              Generate Visit Note →
            </Btn>
          </div>
        )}

        {step === 3 && !loading && noteOutput && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <BackBtn onClick={() => setStep(2)} label="Edit Clinical Details" />
              <BackBtn onClick={() => setStep(1)} label="Change Scenario" />
            </div>
            <EditableDraft title="RN Visit Note" value={noteOutput} onChange={setNoteOutput} badge="DRAFT" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <Btn variant="secondary" onClick={() => { setStep(1); setNoteOutput(''); }}>New Note</Btn>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function FieldDivider({ children }) {
  return (
    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.goldDim, padding: '16px 0 8px', borderBottom: `1px solid ${C.navBorder}`, marginBottom: '16px', fontFamily: C.mono }}>
      {children}
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <label style={{ fontSize: '11px', fontWeight: 600, color: C.textFaint, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: C.mono }}>{label}</label>
      {children}
    </div>
  );
}

function FormInput({ value, onChange, placeholder }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ background: '#243650', border: `1.5px solid ${C.border}`, borderRadius: '6px', color: C.text, padding: '10px 14px', fontFamily: C.sans, fontSize: '15px', outline: 'none', width: '100%', transition: 'border-color 0.15s, box-shadow 0.15s' }}
      onFocus={e => { e.target.style.borderColor = C.gold; e.target.style.boxShadow = '0 0 0 3px rgba(196,168,130,0.1)'; }}
      onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none'; }}
    />
  );
}
