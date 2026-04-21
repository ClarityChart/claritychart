// Demo patients for Recertification Suite
// Each patient has data for all three pathways: RN, F2F, and MD

export const RECERT_DEMO_PATIENTS = {
  lm: {
    id: 'lm',
    name: 'LM',
    age: 82,
    sex: 'Female',
    diagnosis: "Alzheimer's dementia with vascular dementia, end-stage",
    secondaryDx: 'Hypertension, type 2 diabetes mellitus (diet-controlled), osteoporosis, anemia of chronic disease',
    patientId: 'LM',
    certPeriod: '04/16/2026 - 06/15/2026',
    tagline: '82F · End-stage dementia · Memory care',
    color: '#4a90a4',

    // RN Pathway data
    rn: {
      lastBaseline: 'FAST 6e, PPS 40%, KPS 40%, weight 124 lbs, MAC L 22cm R 22.5cm',
      fast: '6e',
      pps: '30%',
      kps: '30%',
      weight: '118 lbs (down from 124 lbs last period — 6 lb loss)',
      vitals: 'BP 132/78, HR 74, RR 16, Temp 97.6F, O2 96% RA',
      domains: {
        nutritional: 'Weight declined from 124 lbs to 118 lbs this certification period — 6 lb loss over 60 days. Meal intake decreased from approximately 60-65% last period to 40-50% this period despite full feeding assistance. Requiring 45-60 minutes per meal with frequent rest breaks and food refusals. Thickened liquids (nectar-thick) continuing per speech pathology. Ensure Plus BID — accepting approximately 25-30 mL per serving. Left MAC 21.5 cm (down from 22 cm), Right MAC 21.5 cm (down from 22.5 cm). Dietitian notified of declining intake and MAC measurements.',
        functional: 'Fully dependent all ADLs — no change in level of dependence but quality of participation has declined. Previously would occasionally reach for washcloth or lift arm during dressing; this period shows no purposeful participation in any care tasks. Two-person assist for all transfers. Requires mechanical lift for bed-to-chair transfers this period (previously could participate minimally in stand-pivot). Sleeping 20-22 hours per day (increased from 18-20 hours last period).',
        cognitive: 'Non-verbal throughout certification period. No intelligible words. Occasional moaning vocalizations, increased frequency this period particularly during morning cares. Does not recognize daughter Susan on any visits this period — daughter confirms patient has shown no recognition response in past 6 weeks. Does not track visual stimuli. Does not follow any commands. No purposeful eye contact or communication attempts observed.',
        mobility: 'Wheelchair dependent. Bilateral lower extremity contractures worsening — passive range of motion at hips now limited to 20 degrees flexion (was 30 degrees last period). Right knee contracture increasing — extension limited to 20 degrees. Two documented falls this period: Fall 1 (04/28/2026) — found on floor beside wheelchair, no injury, lap belt found unclasped — mechanism unclear. Fall 2 (05/14/2026) — slid during lift transfer, right forearm abrasion, no fracture on X-ray. Two-person assist and mechanical lift now required for all transfers following second fall.',
        cardiopulmonary: 'Lungs clear to auscultation bilaterally. O2 saturation 96% on room air, unchanged from prior period. Heart rate 74 regular. No new cardiopulmonary symptoms. No edema of upper or lower extremities. No change in cardiovascular or respiratory status this period.',
        skin: 'Stage 1 sacral pressure injury from prior period progressed to Stage 2 this period. Current wound (05/20/2026 assessment): 3.8 cm x 2.4 cm, depth 0.3 cm, 70% granulation, 30% slough, no signs of infection. Foam dressing with silicone contact layer. Repositioning every 2 hours confirmed. New finding this period: Stage 1 pressure injury right lateral malleolus 1.5 cm x 1.0 cm, non-blanchable erythema, skin intact — identified 06/01/2026. Contributing factors: immobility, incontinence, hypoalbuminemia (albumin 2.8 g/dL this period).',
        pain: 'Patient unable to self-report pain. PAINAD scores during cares: 2-3 at baseline (mild behavioral indicators — occasional grimacing, vocalizations with position changes). PAINAD score 4-5 during wound care and transfer procedures (moderate — consistent grimacing, vocalizations, brief resistance). Acetaminophen 650mg TID scheduled this period (was PRN last period) — improved tolerance of morning cares per staff observation. PRN morphine 2mg ordered — used 3 times this period for wound care procedures.',
        sleep: 'Sleeping 20-22 hours per day, increased from 18-20 hours last period. Difficult to arouse for meals — requires sustained tactile stimulation and voice to achieve brief wakefulness for feeding. Alert for 15-30 minutes per meal attempt. Family notes she seems "more distant" even during waking periods compared to last certification period.',
        psychosocial: 'Daughter Susan visiting 2-3 times weekly. Susan reports increased distress this period as she observes further decline — tearful during visits. Chaplain visiting Susan weekly for caregiver support. Susan attended caregiver support group twice this period. Family dynamics stable — no family conflict regarding care decisions. No new psychosocial concerns for patient. Staff notes patient appears to respond with brief eye opening when Susan sings to her (1940s songs patient enjoyed) — this response is the primary family connection at this stage.',
      },
      priorNote: `RN RECERTIFICATION NARRATIVE — LM — PRIOR PERIOD (02/16/2026 - 04/15/2026)

NUTRITIONAL/WEIGHT
Weight declined from 128 lbs to 124 lbs this certification period — 4 lb loss over 60 days. Meal intake approximately 60-65% of offered meals with full feeding assistance. Requiring 30-45 minutes per meal. Thickened liquids (nectar-thick) per speech pathology. Ensure Plus BID with moderate acceptance. Left MAC 22 cm, Right MAC 22.5 cm — stable from prior measurement.

FUNCTIONAL/ADL DEPENDENCE
Fully dependent all ADLs. Two-person assist for transfers — patient occasionally participates minimally in stand-pivot transfers. Sleeping 18-20 hours per day. No meaningful participation in care tasks.

COGNITIVE/BEHAVIORAL
Non-verbal. Occasional moaning vocalizations with cares. Does not consistently recognize daughter. Does not track or follow commands. FAST 6e.

MOBILITY/FALLS
Wheelchair dependent. Bilateral lower extremity contractures limiting passive range of motion. No falls this certification period. Two-person assist for all transfers.

CARDIOPULMONARY/RESPIRATORY
Lungs clear bilaterally. O2 saturation 96% room air. No cardiopulmonary changes.

SKIN/INTEGUMENTARY
Stage 1 pressure injury sacrum — 3 cm x 2 cm, non-blanchable erythema, skin intact. Repositioning every 2 hours. Foam dressing for pressure relief. No other skin breakdown.

PAIN/SYMPTOM BURDEN
PAINAD 1-2 at rest, 2-3 during cares. Acetaminophen 650mg PRN — used approximately 3 times weekly. No scheduled pain medications.

SLEEP/ENERGY/FATIGUE
Sleeping 18-20 hours per day. Brief wakefulness during meals and cares.

PSYCHOSOCIAL/FAMILY
Daughter Susan visiting 3-4 times weekly. Engaged and supportive. Chaplain support initiated for Susan. Care goals stable — comfort-focused, no hospitalization, no artificial nutrition.

FAST: 6e. PPS: 40%. KPS: 40%. Weight: 124 lbs.

Patient with end-stage Alzheimer's and vascular dementia demonstrates continued functional and cognitive decline consistent with terminal trajectory. Hospice care remains appropriate.`,
    },

    // F2F Pathway data
    f2f: {
      f2fDate: '04/20/2026',
      f2fConductedBy: 'Dr. Sarah Chen, MD (Hospice Medical Director)',
      fast: '6e (prior 6e)',
      pps: '30% (prior 40%)',
      kps: '30% (prior 40%)',
      weight: '121 lbs (prior 124 lbs)',
      findings: `Patient LM is a frail, cachectic 82-year-old female with end-stage Alzheimer's and vascular dementia examined today in her memory care room. She is lying in bed, eyes closed on approach, opening briefly to voice stimulation. No verbal output throughout the examination.

GEN: Frail and cachectic. Visible temporal and facial wasting. Malar hollowing. Skin pale. No acute distress at rest. Weight 121 lbs — decreased 3 lbs from last certification period weight of 124 lbs.

HEENT: Normocephalic. Eyes open to voice stimulation, close again within 10-20 seconds. No purposeful visual tracking. Pupils equal and reactive to light. Temporal wasting prominent bilaterally. Oral mucosa moist. Edentulous. No oral lesions.

CV: Regular rate and rhythm. HR 74. No murmurs. No JVD. No peripheral edema upper extremities. Pulses 2+ bilateral radial.

RESP: Lungs clear to auscultation bilaterally. RR 16, unlabored. O2 saturation 96% on room air. No accessory muscle use. No adventitious sounds.

ABD: Soft, non-distended. Bowel sounds present all quadrants. No organomegaly on palpation. No guarding or rigidity. Incontinent brief in place.

EXT: Bilateral lower extremity contractures — limited passive range of motion at hips (approximately 20 degrees flexion) and knees (extension limited to approximately 20-25 degrees). No lower extremity edema. Left MAC 21.5 cm, Right MAC 21.5 cm (declined from 22 cm and 22.5 cm last period). Skin intact bilateral lower extremities. Stage 2 sacral pressure injury (not directly examined today — per recent wound care note 3.8 x 2.4 cm, 70% granulation).

NEURO/COG: Non-verbal throughout examination. Eyes open briefly to voice and tactile stimulation. No purposeful response to commands or environmental stimuli. No recognition response to family photos shown. No purposeful movement of upper or lower extremities. FAST 6e. Does not demonstrate any volitional communication.

During examination, patient's daughter Susan was present and spoke to patient. Patient showed no recognition response. Susan noted this is unchanged from recent visits and is very distressing to her.

The clinical picture is consistent with end-stage dementia with progressive functional decline including PPS decline from 40% to 30%, weight loss of 3 lbs, MAC decline bilaterally, progression of sacral pressure injury from Stage 1 to Stage 2, worsening contractures, and increased sleep duration. These findings are directly attributable to the progression of her terminal dementia diagnosis and are not explained by any unrelated or reversible condition.`,
    },

    // MD Pathway data
    md: {
      mdObservations: 'Daughter Susan present at F2F visit — confirms patient has shown no recognition response in past 6 weeks. Family goals remain comfort-focused. No changes to advance directives. Hospice plan of care reviewed and updated.',
    },
  },

  gd: {
    id: 'gd',
    name: 'GD',
    age: 100,
    sex: 'Female',
    diagnosis: 'Chronic diastolic heart failure (HFpEF), end-stage',
    secondaryDx: 'CKD stage 4 (eGFR 20-27), type 2 diabetes mellitus, hypertension, peripheral vascular disease, anemia of chronic disease',
    patientId: 'GD',
    certPeriod: '04/16/2026 - 06/15/2026',
    tagline: '100F · End-stage HFpEF · SNF',
    color: '#c4a882',

    // RN Pathway data
    rn: {
      lastBaseline: 'FAST 6c, PPS 30%, KPS 30%, weight 112 lbs, 2+ BLE edema, O2 2L NC',
      fast: '6c',
      pps: '20%',
      kps: '20%',
      weight: '108 lbs (down from 112 lbs last period — 4 lb loss)',
      vitals: 'BP 96/58, HR 92 irregular, RR 24, Temp 97.2F, O2 93% on 3L NC (was 2L last period)',
      domains: {
        nutritional: 'Weight declined from 112 lbs to 108 lbs this certification period — 4 lb loss. Meal intake decreased from approximately 30% to 15-20% of offered meals. Patient frequently declines meals after 2-3 bites citing nausea and feeling full. Dyspnea with eating — requires rest breaks every few minutes during meals, significantly extending meal duration. Ensure 8 oz BID offered — accepting less than half. Visible cachexia with muscle wasting of bilateral upper and lower extremities. Temporal wasting prominent.',
        functional: 'Fully dependent all ADLs — requires maximum assistance for all personal care. Non-ambulatory this period — was able to stand briefly for pivot transfer last period, now unable to bear any weight. Mechanical lift required for all transfers this certification period. Dyspnea at rest precludes any meaningful participation in cares. Patient tires with sustained conversation. Sleeping approximately 16-18 hours per day.',
        cognitive: 'Alert and oriented to person and place. Does not consistently know the date or year. Follows simple commands. Participates in care decisions when awake. Expresses comfort preferences clearly — states she is "so tired" and does not want aggressive interventions. No delirium this period.',
        mobility: 'Non-ambulatory. Unable to bear weight this certification period — previously could stand briefly for transfers. Mechanical lift in use for all transfers. Incontinent of urine — urinary catheter inserted this period for comfort and skin protection given inability to transfer to commode. Incontinent of bowel — continent pads in use.',
        cardiopulmonary: 'Oxygen requirement increased from 2L to 3L nasal cannula this certification period. O2 saturation 93% on 3L (was 94% on 2L last period). Respiratory rate 24 at rest — increased from 20-22 last period. Audible crackles bilateral lung bases on auscultation. Dyspnea at rest present — improved to mild with 3L supplemental oxygen. Bilateral lower extremity edema 3+ to mid-thigh (worsened from 2+ to knees last period) despite furosemide 80mg BID. NT-proBNP drawn 04/10/2026: 14,820 pg/mL (significantly elevated above prior value of 8,292 pg/mL at hospice admission). Furosemide increased to 80mg BID this period — limited by creatinine elevation to 3.1 mg/dL.',
        skin: 'Right lateral ankle wound present from prior period — wound measuring 2.4 cm x 2.0 cm this period (increased from 2.1 x 1.8 cm). Wound bed: 60% granulation, 40% slough. No signs of infection. Foam dressing in place. Wound is not healing consistent with peripheral vascular disease (ABI 0.62) and hypoalbuminemia. New finding this period: bilateral lower extremity skin weeping serous fluid due to significant pitting edema — small areas of skin breakdown right lower leg managed with barrier cream and non-adherent dressings.',
        pain: 'Denies pain at rest. Reports 4/10 discomfort with dyspnea episodes and 6/10 with right ankle wound care. Morphine 2mg q4h PRN ordered — patient using approximately twice daily for dyspnea relief per nursing log. Good response to morphine — respiratory rate decreases and patient reports improved comfort within 20 minutes. Lorazepam 0.5mg PRN anxiety — used 3-4 times this period.',
        sleep: 'Sleeping 16-18 hours per day. Requires head of bed elevated 45 degrees to sleep — cannot tolerate supine position. Nocturia managed with urinary catheter this period — improved sleep continuity reported by patient.',
        psychosocial: 'Patient remains clear about her wishes — does not want to return to hospital and wants to remain comfortable. Daughter present at most nursing visits. Family unity around comfort goals. Patient has expressed she is "ready" and is not afraid. Chaplain visiting weekly — patient finds visits comforting. Son visits weekly from out of state. No family conflict regarding goals.',
      },
      priorNote: `RN RECERTIFICATION NARRATIVE — GD — PRIOR PERIOD (02/16/2026 - 04/15/2026)

NUTRITIONAL/WEIGHT
Weight declined from 118 lbs to 112 lbs this certification period — 6 lb loss over 60 days. Meal intake approximately 25-30% of offered meals. Dyspnea with eating limits intake. Ensure BID with partial acceptance. Visible cachexia and muscle wasting. Temporal wasting prominent.

FUNCTIONAL/ADL DEPENDENCE
Fully dependent all ADLs. Requires maximum assistance for all personal care. Was able to stand briefly for pivot transfers — now total assist. Dyspnea at rest precludes participation in cares. Sleeping approximately 14-16 hours per day.

COGNITIVE/BEHAVIORAL
Alert and oriented to person and place. Participates in care decisions. Expresses desire for comfort and no hospitalization clearly.

MOBILITY/FALLS
Non-ambulatory. Stand-pivot transfer with maximum 2-person assist. Incontinent of urine and bowel. No falls this period.

CARDIOPULMONARY/RESPIRATORY
O2 requirement 2L nasal cannula. O2 saturation 94% on 2L. RR 20-22 at rest. Audible crackles bilateral bases. 2+ bilateral lower extremity edema to knees. Furosemide 80mg BID ongoing. NT-proBNP 8,292 pg/mL at hospice admission.

SKIN/INTEGUMENTARY
Right lateral ankle wound 2.1 cm x 1.8 cm, 70% granulation, 30% slough. Foam dressing. No infection. No new wounds.

PAIN/SYMPTOM BURDEN
Morphine 2mg PRN for dyspnea — using 1-2 times daily. Good response. Lorazepam 0.5mg PRN — rarely used.

SLEEP/ENERGY/FATIGUE
Sleeping 14-16 hours per day. Head of bed elevated for orthopnea. Nocturia disrupting sleep.

PSYCHOSOCIAL/FAMILY
Patient expressing readiness. Family unified around comfort goals. Chaplain support weekly.

FAST: 6c. PPS: 30%. KPS: 30%. Weight: 112 lbs.

Patient with end-stage HFpEF demonstrates continued decline consistent with terminal trajectory. Hospice care remains appropriate.`,
    },

    // F2F Pathway data
    f2f: {
      f2fDate: '04/22/2026',
      f2fConductedBy: 'Dr. Robert H., MD (Hospice Medical Director)',
      fast: '6c (prior 6c)',
      pps: '20% (prior 30%)',
      kps: '20% (prior 30%)',
      weight: '109 lbs (prior 112 lbs)',
      findings: `Patient GD is a frail, cachectic 100-year-old female with end-stage HFpEF examined today in her SNF room. She is lying in bed with head of bed elevated to 45 degrees. She opens her eyes on approach and greets me with a soft "hello." She is alert but tires quickly with conversation.

GEN: Profoundly cachectic and frail. Visible temporal and facial wasting. Malar hollowing. Skin pale with mild jaundice tinge. Appears older than stated age. Weight 109 lbs — decreased 3 lbs from 112 lbs at last certification period. On 3L nasal cannula oxygen.

HEENT: Normocephalic. Eyes open, tracks. Sclera mildly icteric. Temporal wasting prominent. Mucous membranes moist. JVD visible at 30 degrees — elevated, approximately 10 cm.

CV: Irregular rate and rhythm. HR 92. S3 gallop present. No murmurs. Peripheral pulses 1+ bilateral lower extremities, 2+ bilateral upper extremities. PMI laterally displaced.

RESP: Respiratory rate 24 at rest. Bilateral crackles from bases to mid-lung fields. Mild expiratory wheeze. Using accessory muscles with conversation. O2 saturation 93% on 3L nasal cannula. Patient requests to pause conversation twice during examination due to dyspnea.

ABD: Soft. Mild hepatomegaly — liver 3 cm below right costal margin. No ascites by exam. Bowel sounds present. Urinary catheter in place.

EXT: 3+ pitting edema bilateral lower extremities to mid-thigh. Skin weeping serous fluid bilateral lower legs — small areas of excoriation right > left managed with dressings. Right lateral ankle wound — foam dressing in place (per wound care note: 2.4 x 2.0 cm, no signs of infection). Bilateral lower extremity muscle wasting pronounced. Feet cool to touch.

NEURO/COG: Alert and oriented to person and place. Does not know today's date. Follows commands. Able to express her wishes clearly. States "I don't want to go to the hospital. I want to stay comfortable." Cranial nerves grossly intact. No focal neurological deficits.

During the examination, patient asked me "Am I dying?" I confirmed she is in the final stages of her heart disease and that we will keep her comfortable. She said "That's okay. I've had a long life." She then asked me to tell her daughter she loves her.

Clinical findings confirm continued progression of end-stage HFpEF with worsening volume overload despite maximum tolerated diuresis (limited by CKD stage 4, creatinine 3.1), increasing oxygen requirement, weight loss, functional decline, and NT-proBNP now 14,820 pg/mL. These findings are directly attributable to the progression of her terminal cardiac diagnosis.`,
    },

    // MD Pathway data
    md: {
      mdObservations: 'Patient verbalized understanding of her prognosis and reconfirmed comfort-focused goals during F2F visit. NT-proBNP 14,820 pg/mL (drawn 04/10/2026) — significantly elevated above prior. Creatinine 3.1 mg/dL, limiting further diuresis. Family fully aligned with comfort goals. No changes to advance directives needed.',
    },
  },
};

export const RECERT_PATIENT_LIST = ['lm', 'gd'];
