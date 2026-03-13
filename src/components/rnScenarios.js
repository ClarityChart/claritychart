export const SCENARIOS = [
  {
    id: 1,
    label: 'Routine Stable Visit',
    description: 'Patient at baseline, no acute changes',
    prompts: [
      'Describe the patient\'s general appearance, level of alertness, and overall comfort level today.',
      'Describe pain status — current pain score, location, quality, and response to current pain management regimen.',
      'Describe cardiopulmonary and respiratory status — breath sounds, respiratory rate, oxygen saturation, edema, heart rate.',
      'Describe skin integrity, wound status if applicable, and any integumentary findings.',
      'Describe nutritional and hydration status — oral intake percentage, appetite, weight if obtained, any swallowing concerns.',
      'Describe mobility, functional status, and fall risk — ADL dependence level, transfers, ambulation.',
      'Describe psychosocial status — patient and family mood, coping, any concerns or questions raised.',
      'Describe any staff communication, medication changes, care plan updates, or follow-up needed.',
    ],
  },
  {
    id: 2,
    label: 'Uncontrolled / Worsening Pain',
    description: 'Pain not adequately managed with current regimen',
    prompts: [
      'Describe the patient\'s current pain — score, location, quality, onset, duration, and what makes it better or worse.',
      'Describe the current pain management regimen and what has been tried since the last visit.',
      'Describe the patient\'s general appearance, level of distress, and comfort level on arrival.',
      'Describe cardiopulmonary, respiratory, and neurological/cognitive status relevant to pain management.',
      'Describe any nonverbal pain indicators — facial grimacing, guarding, agitation, vocalizations.',
      'Describe family or caregiver observations about pain — when it started, frequency, what they have tried.',
      'Describe interventions performed this visit — medications given, repositioning, comfort measures applied.',
      'Describe physician or team communication, medication adjustments made or requested, and follow-up plan.',
    ],
  },
  {
    id: 3,
    label: 'Respiratory Distress',
    description: 'Dyspnea, increased work of breathing, or oxygen changes',
    prompts: [
      'Describe the patient\'s respiratory status on arrival — rate, work of breathing, oxygen saturation, use of accessory muscles, positioning.',
      'Describe breath sounds, presence of secretions, cough, and any changes from baseline.',
      'Describe the onset and progression of respiratory symptoms — acute vs. gradual, any precipitating factors.',
      'Describe the patient\'s level of distress, comfort, and ability to communicate.',
      'Describe current oxygen use, any changes made to flow rate or delivery device this visit.',
      'Describe cardiovascular findings relevant to respiratory status — edema, heart rate, blood pressure if obtained.',
      'Describe comfort interventions performed — medications given, positioning, fan use, suctioning, other measures.',
      'Describe family presence and response, physician communication, medication changes, and follow-up plan.',
    ],
  },
  {
    id: 4,
    label: 'Active Dying / Imminent Death',
    description: 'Patient showing signs of imminent death within hours to days',
    prompts: [
      'Describe the patient\'s overall appearance and current level of consciousness or responsiveness.',
      'Describe breathing pattern — Cheyne-Stokes, agonal breathing, apneic periods, secretions, jaw relaxation.',
      'Describe circulatory changes — mottling location and extent, skin color changes, temperature of extremities, pulse quality.',
      'Describe pain and comfort assessment — nonverbal indicators, current symptom management in place.',
      'Describe oral care provided, repositioning performed, and other comfort measures given this visit.',
      'Describe family present — who is at bedside, their emotional state, understanding of the dying process.',
      'Describe family education provided — what signs were explained, what to expect, when to call.',
      'Describe physician and team communication, any medication changes or orders obtained, and on-call instructions given to family.',
    ],
  },
  {
    id: 5,
    label: 'Acute Decline Visit',
    description: 'New or sudden change in condition from prior baseline',
    prompts: [
      'Describe the change in condition — what is different from baseline, when it started, and how it was identified.',
      'Describe the patient\'s current general appearance, level of alertness, and overall status on arrival.',
      'Describe vital signs or objective findings relevant to the change — respiratory rate, oxygen saturation, heart rate, temperature if obtained.',
      'Describe neurological and cognitive changes if present — new confusion, decreased responsiveness, agitation.',
      'Describe cardiopulmonary, skin, nutritional, or other system findings relevant to the acute change.',
      'Describe pain and comfort status — any new or worsening symptoms associated with the decline.',
      'Describe interventions performed this visit and physician communication — what was reported, what orders were obtained.',
      'Describe family present, their understanding of the change, education provided, and follow-up plan.',
    ],
  },
  {
    id: 6,
    label: 'Skin Breakdown / Wound',
    description: 'Pressure injury, wound assessment, or new skin breakdown',
    prompts: [
      'Describe each wound or area of skin breakdown — location, stage or classification, dimensions (length x width x depth), wound bed appearance.',
      'Describe wound exudate — amount, color, consistency, and presence or absence of odor.',
      'Describe periwound skin — color, temperature, induration, maceration, or signs of infection.',
      'Describe pain associated with the wound — score at rest and with dressing change, management provided.',
      'Describe the dressing change performed — what was removed, wound care provided, new dressing applied.',
      'Describe the patient\'s nutritional status, hydration, and mobility as they relate to wound healing potential.',
      'Describe positioning, pressure redistribution measures, and caregiver education provided this visit.',
      'Describe physician communication, any new wound care orders, supply needs, and follow-up plan.',
    ],
  },
  {
    id: 7,
    label: 'Fall or Injury',
    description: 'Patient experienced a fall or sustaining injury',
    prompts: [
      'Describe the fall or injury event — when it occurred, circumstances, whether witnessed, and how patient was found.',
      'Describe the patient\'s condition on arrival — general appearance, level of alertness, distress, ability to communicate.',
      'Describe the physical assessment findings — any visible injuries, areas of pain, skin integrity, range of motion concerns.',
      'Describe neurological assessment — level of consciousness, orientation, pupil response if applicable, any new deficits.',
      'Describe pain assessment and comfort measures provided following the event.',
      'Describe the patient\'s current mobility status, fall risk factors, and environmental safety assessment performed.',
      'Describe family or caregiver presence, their account of events, emotional response, and education provided.',
      'Describe physician communication, any orders obtained, documentation completed, and follow-up plan.',
    ],
  },
  {
    id: 8,
    label: 'Nutritional Decline',
    description: 'Decreased oral intake, weight loss, or dysphagia',
    prompts: [
      'Describe current oral intake — estimated percentage of meals consumed, food and fluid types tolerated, appetite.',
      'Describe weight obtained today and trend — current weight, prior weight, timeframe, and total loss.',
      'Describe swallowing function — any coughing, choking, pocketing, or signs of aspiration with eating or drinking.',
      'Describe the patient\'s expressed preferences regarding food and fluid, and any patient or family concerns.',
      'Describe general appearance and signs of nutritional decline — muscle wasting, skin turgor, mucous membrane moisture.',
      'Describe cognitive and functional status as they relate to eating — ability to self-feed, level of assist required.',
      'Describe family or caregiver understanding of the role of nutritional decline in the disease trajectory.',
      'Describe education provided, any dietary modifications recommended, physician communication, and follow-up plan.',
    ],
  },
  {
    id: 9,
    label: 'Behavioral / Psychological Crisis',
    description: 'Agitation, anxiety, depression, delirium, or psychological distress',
    prompts: [
      'Describe the behavioral or psychological symptoms present — agitation, anxiety, confusion, delirium, depression, hallucinations, or other.',
      'Describe onset and progression — when symptoms began, whether acute or gradual, any identifiable triggers.',
      'Describe the patient\'s level of distress, ability to communicate, and response to reorientation or comfort measures.',
      'Describe safety assessment — risk to self or others, environmental safety, presence of caregiver.',
      'Describe current medications for symptom management and response to date.',
      'Describe physical causes assessed or ruled out — pain, urinary retention, constipation, medication side effects, hypoxia.',
      'Describe family or caregiver response and level of distress — their understanding of symptoms and ability to manage.',
      'Describe interventions performed, physician communication, medication changes or orders obtained, and follow-up plan.',
    ],
  },
  {
    id: 10,
    label: 'Goals of Care / Family Meeting',
    description: 'Formal or informal goals of care discussion or family conference',
    prompts: [
      'Describe who was present — patient if able to participate, family members, caregivers, and their relationship to patient.',
      'Describe the patient\'s current clinical status and how it was communicated to the family during this visit.',
      'Describe the family\'s understanding of the prognosis and disease trajectory — what they understand and any misconceptions addressed.',
      'Describe the patient\'s expressed wishes if able to participate — preferences for care, comfort priorities, meaningful activities.',
      'Describe advance directives in place — DNR status, POLST, healthcare proxy, any updates made or needed.',
      'Describe specific goals or concerns raised by the family — fears, questions, requests, or areas of disagreement if any.',
      'Describe the care plan discussed or updated — symptom management priorities, services in place, any changes agreed upon.',
      'Describe follow-up plan — next visit, referrals made, team members to be contacted, and any unresolved issues.',
    ],
  },
];

export const OUTPUT_SECTIONS = [
  'GENERAL APPEARANCE',
  'NEUROLOGICAL / COGNITIVE',
  'PAIN MANAGEMENT',
  'SKIN / INTEGUMENTARY',
  'CARDIOVASCULAR',
  'RESPIRATORY',
  'GASTROINTESTINAL / GENITOURINARY',
  'MOBILITY / FALLS RISK',
  'NUTRITION / HYDRATION',
  'PSYCHOSOCIAL / FAMILY',
  'STAFF COMMUNICATION',
];

export function buildRNNoteSystem(scenario, responses) {
  const promptResponses = scenario.prompts
    .map((p, i) => `PROMPT: ${p}\nRESPONSE: ${responses[i] || '(not provided)'}`)
    .join('\n\n');

  return `You are a clinical documentation specialist generating a hospice RN visit note.

SCENARIO: ${scenario.label}

RULES — NON-NEGOTIABLE:
- Third-person clinical narrative throughout. NEVER use "I" or first person.
- Preserve ALL specific numbers, measurements, scores, dates, and times EXACTLY as provided.
- Never fabricate any information not present in the nurse's responses.
- Do NOT include hospice eligibility conclusions or prognosis statements — this is a visit note, not a CTI.
- No disclaimers, meta-commentary, or explanatory text. Output is clean clinical documentation only.
- Use ALL CAPS section headers exactly as listed below.
- Only include sections for which information was provided — do not generate empty sections.
- Write in professional clinical language appropriate for a medical record.

OUTPUT SECTION HEADERS (ALL CAPS, include only those with relevant data):
GENERAL APPEARANCE
NEUROLOGICAL / COGNITIVE
PAIN MANAGEMENT
SKIN / INTEGUMENTARY
CARDIOVASCULAR
RESPIRATORY
GASTROINTESTINAL / GENITOURINARY
MOBILITY / FALLS RISK
NUTRITION / HYDRATION
PSYCHOSOCIAL / FAMILY
STAFF COMMUNICATION

NURSE'S RESPONSES TO ASSESSMENT PROMPTS:
${promptResponses}`;
}
