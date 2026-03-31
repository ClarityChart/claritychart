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
    ? "\nPRIOR PHYSICIAN RECERTIFICATION NOTE (for interval reference — use to frame what has further declined this period):\n" + inputs.priorMDNote
    : '';

  const f2fSection = inputs.f2fCompleted
    ? "\nFACE-TO-FACE EXAM FINDINGS (incorporate selectively into decline bullets only where they directly evidence a specific decline — do NOT create a separate section):\nDate: " + (inputs.f2fDate || "not provided") + "\n" + (inputs.f2fFindings || "not documented")
    : '';

  const system = `You are a hospice medical director generating a Physician Recertification Note. You must follow the exact format shown in the example below. Do not deviate from this structure under any circumstances.

RULES:
- Third-person authoritative physician voice. Never "I."
- Preserve ALL numbers exactly as provided.
- Never fabricate.
- Do NOT use markdown — no asterisks, no bold, no ** symbols. No ALL CAPS section headers except where shown in example.
- Do NOT add sections not shown in the example format.

EXAMPLE OUTPUT FORMAT (follow this exactly):

[identifier] is a [age]-year-old [sex] with [primary diagnosis], originally admitted to hospice due to [brief context].

Relevant history includes [comorbidities].

Patient shows signs of progressive functional, cognitive, and physical decline as evidenced by:
– [Decline bullet 1 — one to two sentences of clinical narrative with specific numbers woven in naturally]
– [Decline bullet 2]
– [Decline bullet 3]
– [Additional bullets as warranted by clinical data]

FAST: [value]. PPS: [value]%. KPS: [value]%.

[Two to three sentence clinical impression synthesizing the overall trajectory.]

Based on the clinical findings documented above, [identifier] remains appropriate for hospice recertification with a life expectancy of less than six months if the terminal illness runs its expected course.

END OF EXAMPLE FORMAT

CRITICAL FORMATTING RULES derived from example:
1. Opening line: identifier + age + sex + diagnosis + admission context. One sentence.
2. Relevant history: one sentence, comorbidities only.
3. Decline section intro line is always exactly: "Patient shows signs of progressive functional, cognitive, and physical decline as evidenced by:"
4. Decline bullets use em-dash (–) not bullet points (•). Each is narrative, not a data label.
5. Weight and MAC values are woven INTO narrative bullets — never listed as standalone lines like "Weight: X lbs" or "Left MAC: X cm"
6. Scores line: "FAST: [value]. PPS: [value]%. KPS: [value]%." — one line, no header, no prior period comparison
7. Clinical impression: no header, flows directly after scores line
8. Closing statement: exact wording as shown
9. No DECLINE SUMMARY header, no OBJECTIVE FUNCTIONAL DATA header, no CLINICAL IMPRESSION header

PATIENT INFORMATION:
Diagnosis: \${inputs.diagnosis || 'Not provided'}
Patient Identifier: \${inputs.patientId || 'Not provided'}
Certification Period: \${inputs.certPeriod || 'Not provided'}

PHYSICIAN ADDITIONAL OBSERVATIONS:
\${inputs.mdObservations || 'None provided'}`;

  return system + f2fSection + priorMDSection + "\n\nRN RECERTIFICATION NARRATIVE (this is your source data — extract decline evidence from it and format according to the structure above):\n" + rnNarrative;
}

