export const DECLINE_DOMAINS = [
  { key: "nutritional", label: "Nutritional / Weight", placeholder: "Describe changes in oral intake, appetite, weight loss, tube feeding tolerance, or swallowing since last certification. Include specific weights and percentages if available." },
  { key: "functional", label: "Functional / ADL Dependence", placeholder: "Describe changes in ability to perform activities of daily living — bathing, dressing, transfers, toileting, grooming. Note increase in assist level required since last certification." },
  { key: "cognitive", label: "Cognitive / Behavioral", placeholder: "Describe changes in cognition, orientation, memory, communication, or behavior since last certification. Include new confusion, delirium, agitation, or withdrawal." },
  { key: "mobility", label: "Mobility / Falls", placeholder: "Describe changes in ambulation, transfers, bed mobility, or fall frequency since last certification. Include number of falls this period and any injuries." },
  { key: "cardiopulmonary", label: "Cardiopulmonary / Respiratory", placeholder: "Describe changes in dyspnea, oxygen requirements, edema, secretions, or cardiac symptoms since last certification. Include oxygen saturation and respiratory rate if obtained." },
  { key: "skin", label: "Skin / Integumentary", placeholder: "Describe any new or worsening wounds, pressure injuries, or skin breakdown since last certification. Include wound measurements, staging, and healing trajectory." },
  { key: "pain", label: "Pain / Symptom Burden", placeholder: "Describe changes in pain severity, frequency, or character since last certification. Include any new or worsening symptoms." },
  { key: "sleep", label: "Sleep / Energy / Fatigue", placeholder: "Describe changes in sleep pattern, energy level, and fatigue since last certification. Note any increase in time spent in bed or sleeping during the day." },
  { key: "psychosocial", label: "Psychosocial / Family", placeholder: "Describe changes in patient mood, coping, or engagement since last certification. Include family stress, caregiver burden, or changes in support system." },
];

export function buildPriorExtractionSystem() {
  return `You are a hospice clinical documentation specialist. Extract a concise one-to-two sentence summary of the patient status in each domain from the prior RN Recertification Narrative provided.

DOMAINS TO EXTRACT:
- nutritional (oral intake %, weight, appetite, swallowing)
- functional (ADL dependence level, assist required)
- cognitive (orientation, cognition, communication, behavior)
- mobility (ambulation, falls, transfers)
- cardiopulmonary (dyspnea, edema, oxygen, cardiac)
- skin (wounds, pressure injuries, skin integrity)
- pain (pain scores, symptom burden)
- sleep (energy, fatigue, time in bed)
- psychosocial (mood, family, coping)

RULES:
- For each domain, write one to two sentences maximum capturing the key clinical status from the prior period.
- Preserve all specific numbers, measurements, weights, dates exactly as they appear.
- If a domain is not mentioned in the prior note, write "Not documented in prior note."
- Respond ONLY with a JSON object. No preamble, no explanation, no markdown code fences.
- Format exactly as: {"nutritional":"...","functional":"...","cognitive":"...","mobility":"...","cardiopulmonary":"...","skin":"...","pain":"...","sleep":"...","psychosocial":"..."}`;
}

export function buildRNRecertSystem(inputs, priorSummaries) {
  const domainText = [
    {key:"nutritional",label:"Nutritional / Weight"},
    {key:"functional",label:"Functional / ADL Dependence"},
    {key:"cognitive",label:"Cognitive / Behavioral"},
    {key:"mobility",label:"Mobility / Falls"},
    {key:"cardiopulmonary",label:"Cardiopulmonary / Respiratory"},
    {key:"skin",label:"Skin / Integumentary"},
    {key:"pain",label:"Pain / Symptom Burden"},
    {key:"sleep",label:"Sleep / Energy / Fatigue"},
    {key:"psychosocial",label:"Psychosocial / Family"},
  ]
    .filter(d => inputs[d.key]?.trim())
    .map(d => {
      const prior = priorSummaries?.[d.key];
      const priorLine = prior && prior !== "Not documented in prior note." ? "PRIOR PERIOD: " + prior : "";
      return d.label.toUpperCase() + ":\n" + (priorLine ? priorLine + "\n" : "") + "CURRENT PERIOD: " + inputs[d.key];
    })
    .join("\n\n");

  return "You are a clinical documentation specialist generating a hospice RN Recertification Narrative.\n\nRULES:\n- Third-person clinical narrative. NEVER use I.\n- Preserve ALL numbers, measurements, weights, dates, fall counts, percentages EXACTLY.\n- Never fabricate.\n- Interval framing MANDATORY — use since last certification, this certification period, compared to prior period.\n- Where prior period data is provided, explicitly compare current findings to prior.\n- Quantify decline wherever possible.\n- MAC measurements are clinically significant — always include when provided.\n- No disclaimers. Clean clinical text only.
- Do NOT use markdown formatting — no asterisks, no bold, no bullet symbols other than •. Section headers in ALL CAPS only.\n- Do NOT include hospice eligibility conclusions.\n- ALL CAPS section headers for each domain. Only include sections with data.\n\nPATIENT INFORMATION:\nDiagnosis: " + (inputs.diagnosis || "Not provided") + "\nPatient Identifier: " + (inputs.patientId || "Not provided") + "\nCertification Period: " + (inputs.certPeriod || "Not provided") + "\nLast Recert Baseline: " + (inputs.lastBaseline || "Not provided") + "\n\nOBJECTIVE DATA:\nFAST: " + (inputs.fast || "Not provided") + "\nPPS: " + (inputs.pps || "Not provided") + "\nKPS: " + (inputs.kps || "Not provided") + "\nWeight / Trend: " + (inputs.weight || "Not provided") + "\nVitals: " + (inputs.vitals || "Not provided") + "\n\nDECLINE DOMAIN ASSESSMENTS (prior period shown where available):\n" + (domainText || "No domain data provided");
}

export function buildMDRecertSystem(inputs, rnNarrative) {
  const priorMDSection = inputs.priorMDNote?.trim()
    ? "\nPRIOR PHYSICIAN RECERTIFICATION NOTE (for interval reference only — use to frame what has further declined this period):\n" + inputs.priorMDNote
    : '';

  const f2fSection = inputs.f2fCompleted
    ? "\nFACE-TO-FACE EXAM FINDINGS (incorporate selectively into decline bullets only where they directly evidence a specific decline — do NOT create a separate section, do NOT list as standalone data):\nDate: " + (inputs.f2fDate || "not provided") + "\n" + (inputs.f2fFindings || "not documented")
    : '';

  const system = `You are a hospice medical director generating a Physician Recertification Note.

RULES:
- Authoritative physician voice. Third-person. Never "I."
- Preserve ALL numbers, measurements, dates, weights, fall counts EXACTLY.
- Never fabricate.
- Focus exclusively on what has worsened this certification period.
- Do NOT use markdown formatting — no asterisks, no bold. Section headers in ALL CAPS only where specified below.
- No disclaimers. Clean clinical text only.

STRUCTURE (follow exactly — do not add extra sections or headers):

1. OPENING — One sentence: patient identifier, age and sex if provided, primary diagnosis, brief admission context (e.g., "admitted to hospice with progressive cognitive, functional, and physical decline").

2. RELEVANT HISTORY — One sentence listing significant comorbidities.

3. DECLINE EVIDENCE — Write this line exactly: "Patient shows signs of progressive functional, cognitive, and physical decline as evidenced by:" then list em-dash (–) bullets. Rules for bullets:
   - Each bullet is one to two sentences of clinical narrative — not a data label
   - Weight and MAC values must be woven into narrative bullets. CORRECT: "Weight loss from 173 lbs to 170.5 lbs over this certification period with persistent muscle and temporal wasting." WRONG: "Weight: 170.5 lbs (prior 173 lbs)"
   - MAC changes woven into narrative. CORRECT: "Decrease in left MAC from 30.4 cm to 29.5 cm, consistent with ongoing muscle wasting." WRONG: "Left MAC: 29.5 cm (prior 30.4 cm)"
   - Functional scores explained clinically. CORRECT: "Patient continues at FAST 7f with loss of verbal communication and inability to hold head up." WRONG: "FAST: 7f (unchanged)"
   - Incorporate F2F exam findings selectively within the relevant bullet only where they directly evidence decline
   - Do NOT use ALL CAPS headers within this section
   - Do NOT create standalone data point lines for weight, MAC, or any measurement

4. SCORES LINE — One clean line, no header: "FAST: [value]. PPS: [value]%. KPS: [value]%."

5. CLINICAL IMPRESSION — Two to three concise sentences synthesizing overall decline trajectory. No header needed — flow directly from scores line.

6. CLOSING — Exactly: "Based on the clinical findings documented above, [identifier] remains appropriate for hospice recertification with a life expectancy of less than six months if the terminal illness runs its expected course."

PATIENT INFORMATION:
Diagnosis: ${inputs.diagnosis || 'Not provided'}
Patient Identifier: ${inputs.patientId || 'Not provided'}
Certification Period: ${inputs.certPeriod || 'Not provided'}

PHYSICIAN ADDITIONAL OBSERVATIONS:
${inputs.mdObservations || 'None provided'}`;

  return system + f2fSection + priorMDSection + "\n\nRN RECERTIFICATION NARRATIVE (synthesize and compress into the structure above):\n" + rnNarrative;
}
