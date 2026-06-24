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
  const domainText = DECLINE_DOMAINS
    .filter(d => inputs[d.key]?.trim())
    .map(d => {
      const prior = priorSummaries?.[d.key];
      const priorLine = prior && prior !== "Not documented in prior note." ? "PRIOR PERIOD: " + prior : "";
      return d.label.toUpperCase() + ":\n" + (priorLine ? priorLine + "\n" : "") + "CURRENT PERIOD: " + inputs[d.key];
    })
    .join("\n\n");

  const rules = [
    "You are a clinical documentation specialist generating a hospice RN Recertification Narrative.",
    "",
    "RULES:",
    "- Third-person clinical narrative. NEVER use I.",
    "- Preserve ALL numbers, measurements, weights, dates, fall counts, percentages EXACTLY.",
    "- Never fabricate.",
    "- Interval framing MANDATORY throughout.",
    "- Where prior period data is provided, explicitly compare current findings to prior.",
    "- Quantify decline wherever possible.",
    "- MAC measurements are clinically significant — always include when provided.",
    "- No disclaimers. Clean clinical text only.",
    "- Do NOT include hospice eligibility conclusions.",
    "- ALL CAPS section headers for each domain. Only include sections with data.",
    "",
    "PATIENT INFORMATION:",
    "Diagnosis: " + (inputs.diagnosis || "Not provided"),
    "Patient Identifier: " + (inputs.patientId || "Not provided"),
    "Certification Period: " + (inputs.certPeriod || "Not provided"),
    "Last Recert Baseline: " + (inputs.lastBaseline || "Not provided"),
    "",
    "OBJECTIVE DATA:",
    "FAST: " + (inputs.fast || "Not provided"),
    "PPS: " + (inputs.pps || "Not provided"),
    "KPS: " + (inputs.kps || "Not provided"),
    "Weight / Trend: " + (inputs.weight || "Not provided"),
    "Vitals: " + (inputs.vitals || "Not provided"),
    "",
    "DECLINE DOMAIN ASSESSMENTS (prior period shown where available):",
    domainText || "No domain data provided"
  ].join("\n");

  return rules;
}


export function buildMDRecertSystem(inputs, rnNarrative, f2fNote) {
  const priorMDSection = inputs.priorMDNote?.trim()
    ? "\nPRIOR PHYSICIAN RECERTIFICATION NOTE (for interval reference — use to frame what has further declined this period):\n" + inputs.priorMDNote
    : '';

  const f2fSection = f2fNote?.trim()
    ? "\nFACE-TO-FACE ENCOUNTER NOTE (already generated — synthesize key clinical findings from this into the decline evidence and clinical impression):\n" + f2fNote
    : '';

  const system = [
    "You are a hospice medical director generating a Physician Recertification Note.",
    "",
    "RULES:",
    "- Authoritative physician voice. Third-person. Never 'I.'",
    "- Preserve ALL numbers, measurements, dates, weights, fall counts EXACTLY.",
    "- Never fabricate.",
    "- This note synthesizes the RN Recertification Narrative and the Face-to-Face Encounter Note (if provided) into the authoritative physician recertification argument.",
    "- Focus exclusively on what has worsened this certification period.",
    "- Do NOT use markdown — no asterisks, no bold. Clean clinical text only.",
    "- No disclaimers.",
    "",
    "STRUCTURE (follow exactly — do not add extra sections or headers):",
    "",
    "1. OPENING — One sentence: patient identifier, age and sex if provided, primary diagnosis, brief admission context.",
    "",
    "2. RELEVANT HISTORY — One sentence listing significant comorbidities.",
    "",
    "3. DECLINE EVIDENCE — Write exactly: 'Patient shows signs of progressive functional, cognitive, and physical decline as evidenced by:' then list em-dash (–) bullets. Rules:",
    "   - Each bullet is one to two sentences of clinical narrative",
    "   - Weight and MAC values woven into narrative bullets — never standalone data lines",
    "   - Functional scores explained clinically, not just stated",
    "   - Incorporate F2F clinical findings selectively where they directly evidence decline",
    "   - No ALL CAPS headers within this section",
    "",
    "4. SCORES LINE — One line, no header: 'FAST: [value]. PPS: [value]%. KPS: [value]%.'",
    "",
    "5. CLINICAL IMPRESSION — Two to three concise sentences synthesizing overall decline trajectory.",
    "",
    "6. CLOSING — Exactly: 'Based on the clinical findings documented above, [identifier] remains appropriate for hospice recertification with a life expectancy of less than six months if the terminal illness runs its expected course.'",
    "",
    "PATIENT INFORMATION:",
    "Diagnosis: " + (inputs.diagnosis || "Not provided"),
    "Patient Identifier: " + (inputs.patientId || "Not provided"),
    "Certification Period: " + (inputs.certPeriod || "Not provided"),
    "",
    "PHYSICIAN ADDITIONAL OBSERVATIONS:",
    inputs.mdObservations || "None provided"
  ].join("\n");

  return system + f2fSection + priorMDSection + "\n\nRN RECERTIFICATION NARRATIVE (primary source — extract decline evidence and frame into the structure above):\n" + rnNarrative;
}


export function buildRNRecertEditSystem(currentNarrative, editRequest) {
  return `You are a hospice clinical documentation specialist editing an RN Recertification Narrative.

RULES:
- Apply the requested edits precisely
- Preserve ALL specific numbers, dates, measurements, weights EXACTLY
- Never fabricate new clinical information
- Maintain third-person clinical narrative voice throughout
- Do NOT include hospice eligibility conclusions
- No disclaimers or meta-commentary. Return only the revised narrative.

CURRENT RN RECERTIFICATION NARRATIVE:
${currentNarrative}

REQUESTED EDITS:
${editRequest}

Return the complete revised narrative with the requested edits applied.`;
}

export function buildF2FEditSystem(currentNote, editRequest) {
  return `You are a hospice clinical documentation specialist editing a Face-to-Face Encounter Note.

RULES:
- Apply the requested edits precisely
- Preserve ALL specific numbers, dates, measurements, scores EXACTLY
- Never fabricate new clinical information
- Maintain authoritative clinical voice throughout
- Do NOT use markdown — no asterisks, no bold
- No disclaimers or meta-commentary. Return only the revised note.

CURRENT FACE-TO-FACE ENCOUNTER NOTE:
${currentNote}

REQUESTED EDITS:
${editRequest}

Return the complete revised note with the requested edits applied.`;
}

export function buildMDRecertEditSystem(currentNote, editRequest) {
  return `You are a hospice medical director editing a Physician Recertification Note.

RULES:
- Apply the requested edits precisely
- Preserve ALL specific numbers, dates, measurements, scores EXACTLY
- Never fabricate new clinical information
- Maintain third-person authoritative physician voice throughout
- Do NOT use markdown — no asterisks, no bold
- No disclaimers or meta-commentary. Return only the revised note.

CURRENT PHYSICIAN RECERTIFICATION NOTE:
${currentNote}

REQUESTED EDITS:
${editRequest}

Return the complete revised note with the requested edits applied.`;
}

export function buildF2FSystem(inputs) {
  return [
    "You are generating a Face-to-Face Encounter Note for Medicare hospice recertification. This note may be written by a physician, nurse practitioner, or physician assistant.",
    "",
    "RULES:",
    "- Authoritative clinical voice. Third-person. Never 'I.'",
    "- Preserve ALL numbers, measurements, dates, scores EXACTLY.",
    "- Never fabricate.",
    "- Do NOT use markdown — no asterisks, no bold. Clean clinical text only.",
    "- This document must explicitly attest that clinical findings confirm continued decline RELATED TO THE TERMINAL DIAGNOSIS — not an unrelated condition. This is the Medicare-specific requirement that makes this document hospice-native.",
    "",
    "STRUCTURE (follow exactly — each section separated by a blank line):",
    "1. PATIENT IDENTIFICATION — one sentence: identifier, age and sex if provided, primary terminal diagnosis, certification period, date of face-to-face encounter, and who conducted it.",
    "",
    "2. OBJECTIVE DATA — format as a labeled list, one item per line:",
    "   Weight: [value] (prior: [value if available])",
    "   FAST: [value]",
    "   PPS: [value]",
    "   KPS: [value]",
    "   Vital Signs: [values]",
    "   Include any labs (NT-proBNP, creatinine etc) if provided.",
    "",
    "3. PHYSICAL EXAMINATION — each body system on its own line with the system name followed by findings. Format exactly as:",
    "   GEN: [findings]",
    "   HEENT: [findings]",
    "   CV: [findings]",
    "   RESP: [findings]",
    "   ABD: [findings]",
    "   EXT: [findings]",
    "   NEURO/COG: [findings]",
    "   SKIN: [findings if relevant]",
    "   Only include systems for which clinical information was provided.",
    "",
    "4. ENCOUNTER NARRATIVE — 2-3 sentences describing the clinical encounter. What the patient did, said, how they appeared, any significant interactions.",
    "3. DECLINE ATTESTATION — one to two sentences explicitly stating that the clinical findings confirm continued decline consistent with the terminal diagnosis, and that this decline is attributable to the terminal illness rather than an unrelated condition.",
    "4. ATTESTATION STATEMENT — close with exactly: 'The undersigned certifies that a face-to-face encounter was conducted with this patient on [F2F date]. The clinical findings from this encounter confirm that the patient continues to have a life expectancy of six months or less if the terminal illness runs its expected course, and that the documented decline is related to the terminal diagnosis.'",
    "",
    "PATIENT INFORMATION:",
    "Diagnosis: " + (inputs.diagnosis || "Not provided"),
    "Patient Identifier: " + (inputs.patientId || "Not provided"),
    "Age: " + (inputs.age || "Not provided"),
    "Sex: " + (inputs.sex || "Not provided"),
    "Certification Period: " + (inputs.certPeriod || "Not provided"),
    "Face-to-Face Date: " + (inputs.f2fDate || "Not provided"),
    "Conducted by: " + (inputs.f2fConductedBy || "Not provided"),
    "",
    "FUNCTIONAL SCALES:",
    "FAST: " + (inputs.fast || "Not provided"),
    "PPS: " + (inputs.pps || "Not provided"),
    "KPS: " + (inputs.kps || "Not provided"),
    "Weight: " + (inputs.weight || "Not provided"),
    "",
    "CLINICAL FINDINGS FROM FACE-TO-FACE ENCOUNTER:",
    inputs.f2fFindings || "Not provided",
    "",
    inputs.rnNarrativeRef?.trim() ? "RN RECERTIFICATION NARRATIVE (for reference — use to ensure F2F findings align with documented decline):\n" + inputs.rnNarrativeRef : ""
  ].join("\n");
}
