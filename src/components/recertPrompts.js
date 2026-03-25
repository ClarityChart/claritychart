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
  return "You are a hospice medical director generating a Physician Recertification Note.\n\nRULES:\n- Authoritative physician voice. Third-person. Never I.\n- Preserve ALL numbers, measurements, dates, weights, fall counts EXACTLY.\n- Never fabricate.\n- This is a DECLINE DELTA document — focus on what has worsened this period.\n- Where prior period data exists, explicitly state the change.\n- No disclaimers. Clean clinical text only.\n\nSTRUCTURE:\n1. PATIENT IDENTIFICATION — one sentence: identifier, diagnosis, certification period.\n2. DECLINE SUMMARY — bulleted list by domain. Each bullet states what declined and by how much. Quantify wherever possible.\n3. OBJECTIVE FUNCTIONAL DATA — FAST, PPS%, KPS%, weight, vitals. All exact.\n4. CLINICAL IMPRESSION — two to three sentences synthesizing decline trajectory.\n5. RECERTIFICATION STATEMENT — close with: Based on the clinical findings documented above, " + (inputs.patientId || "this patient") + " remains appropriate for hospice recertification with a life expectancy of less than six months if the terminal illness runs its expected course.\n\nPATIENT INFORMATION:\nDiagnosis: " + (inputs.diagnosis || "Not provided") + "\nPatient Identifier: " + (inputs.patientId || "Not provided") + "\nCertification Period: " + (inputs.certPeriod || "Not provided") + "\n\nPHYSICIAN ADDITIONAL OBSERVATIONS:\n" + (inputs.mdObservations || "None provided") + "\n\nFACE-TO-FACE ENCOUNTER:\n" + (inputs.f2fCompleted ? "Completed on " + (inputs.f2fDate || "date not provided") + ". Findings: " + (inputs.f2fFindings || "not documented") : "Not completed this period") + "\n\nRN RECERTIFICATION NARRATIVE:\n" + rnNarrative;
}
