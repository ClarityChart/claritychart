'use client';
import { useState, useRef } from 'react';
import { C } from './tokens';
import { TopNav, ErrorBox, EditableDraft, BackBtn, Btn, PageShell, ProgressSteps } from './ui';

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
4. Then organize clinical findings under ALL CAPS section headers. Use only headers relevant to information provided. Standard headers: GENERAL APPEARANCE, NEUROLOGICAL/COGNITIVE, PAIN MANAGEMENT, SKIN/INTEGUMENTARY, CARDIOVASCULAR, RESPIRATORY, GASTROINTESTINAL/GENITOURINARY, MOBILITY/FALLS RISK, NUTRITION/HYDRATION, PSYCHOSOCIAL/FAMILY, STAFF COMMUNICATION
5. Only include sections for which clinical information was provided — never fabricate or assume findings
6. Use precise, hospice-appropriate clinical language throughout
7. Preserve all specific numbers, measurements, dates, and clinical observations exactly as provided
8. Give the most detailed documentation to the section most relevant to the visit scenario type
9. Do NOT include any conclusion about hospice eligibility, appropriateness, prognosis, or anticipated time of death — these belong exclusively in the CTI and Physician Recertification Note, never in a visit note
10. Do NOT add disclaimers, meta-commentary, or AI-generated notices
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
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
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

  const rnSteps = ['Scenario', 'Clinical Details', 'Visit Note'];
  const rnStepIndex = step - 1;

  const rnSteps = ['Scenario', 'Clinical Details', 'Visit Note'];

  return (
    <PageShell
      onHome={onBack}
      moduleName="RN Visit Note"
      badge="RN VISIT NOTE"
      steps={step > 1 ? rnSteps : null}
      currentStep={step - 1}
      onStepClick={(i) => { if (i < step - 1) setStep(i + 1); }}
      title={step === 1 ? 'Select Clinical Scenario' : step === 2 ? (sc?.name || 'Clinical Details') : 'Visit Note'}
      subtitle={step === 1 ? 'Choose the scenario that best describes this visit' : null}
      onBack={step > 1 ? () => setStep(step - 1) : null}
      backLabel={step === 2 ? 'Scenarios' : 'Edit Details'}
      primaryAction={step === 2 ? generate : null}
      primaryLabel="Generate Visit Note →"
      primaryDisabled={step === 2 && !form.narrative?.trim()}
    >
      <div>

    </PageShell>
  );
}

