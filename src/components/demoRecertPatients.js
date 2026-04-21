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
        mobility: 'Wheelchair dependent. Bilateral lower extremity contractures worsening — passive range of motion at hips now limited to 20 degrees flexion (was 30 degrees last period). Right knee contracture increasing — extension limited to 20 degrees. Two documented falls this period: Fall 1 (04/28/2026) — found on floor beside wheelchair, no injury, lap belt found unclasped. Fall 2 (05/14/2026) — slid during lift transfer, right forearm abrasion, no fracture on X-ray. Mechanical lift now required for all transfers following second fall.',
        cardiopulmonary: 'Lungs clear to auscultation bilaterally. O2 saturation 96% on room air, unchanged from prior period. Heart rate 74 regular. No new cardiopulmonary symptoms. No edema upper or lower extremities.',
        skin: 'Stage 1 sacral pressure injury from prior period progressed to Stage 2 this period. Current wound (05/20/2026): 3.8 cm x 2.4 cm, depth 0.3 cm, 70% granulation, 30% slough, no signs of infection. Foam dressing with silicone contact layer. New finding: Stage 1 pressure injury right lateral malleolus 1.5 cm x 1.0 cm, non-blanchable erythema, skin intact — identified 06/01/2026. Contributing factors: immobility, incontinence, hypoalbuminemia (albumin 2.8 g/dL).',
        pain: 'Patient unable to self-report pain. PAINAD scores during cares: 2-3 at baseline. PAINAD score 4-5 during wound care and transfers. Acetaminophen 650mg TID scheduled this period (was PRN last period) — improved tolerance of morning cares. PRN morphine 2mg ordered — used 3 times this period for wound care procedures.',
        sleep: 'Sleeping 20-22 hours per day, increased from 18-20 hours last period. Difficult to arouse for meals — requires sustained tactile stimulation and voice to achieve brief wakefulness for feeding. Alert for 15-30 minutes per meal attempt.',
        psychosocial: 'Daughter Susan visiting 2-3 times weekly. Susan reports increased distress this period as she observes further decline — tearful during visits. Chaplain visiting Susan weekly for caregiver support. Susan attended caregiver support group twice this period. No new psychosocial concerns for patient. Staff notes patient appears to respond with brief eye opening when Susan sings to her.',
      },
      priorNote: `LM is an 82-year-old female with end-stage Alzheimer's dementia and vascular dementia followed on hospice through the certification period of 02/16/2026 to 04/15/2026. Her weight declined from 128 lbs to 124 lbs during this period, representing a 4 lb loss over 60 days. Meal intake has been approximately 60-65% of offered meals with full feeding assistance, requiring 30-45 minutes per meal. She continues on nectar-thick liquids per speech pathology recommendation and accepts Ensure Plus BID with moderate compliance. Left MAC measured 22 cm and right MAC 22.5 cm, stable from prior measurements.

She remains fully dependent for all activities of daily living. Two-person assist is required for transfers, though she occasionally participates minimally in stand-pivot transfers. She sleeps approximately 18-20 hours per day with no meaningful participation in care tasks. She is wheelchair dependent with bilateral lower extremity contractures limiting passive range of motion. No falls occurred this certification period. She is non-verbal with occasional moaning vocalizations during cares, does not consistently recognize her daughter, and does not track visually or follow commands. FAST stage remains 6e.

Cardiopulmonary status is unchanged with lungs clear bilaterally and O2 saturation 96% on room air. A Stage 1 pressure injury to the sacrum measuring 3 cm x 2 cm with non-blanchable erythema and intact skin was identified this period. Repositioning every 2 hours is in place with foam dressing for pressure relief. Pain assessment using PAINAD reveals scores of 1-2 at rest and 2-3 during cares. Acetaminophen 650mg PRN has been used approximately 3 times weekly with no scheduled pain medications required.

Daughter Susan visits 3-4 times weekly and remains engaged and supportive. Chaplain support has been initiated for Susan this period. Goals of care remain stable: comfort-focused, no hospitalization, no artificial nutrition or hydration.

FAST: 6e. PPS: 40%. KPS: 40%. Weight: 124 lbs.`,
    },
    f2f: {
      f2fDate: '04/20/2026',
      f2fConductedBy: 'Dr. Sarah Chen, MD (Hospice Medical Director)',
      fast: '6e (prior 6e)',
      pps: '30% (prior 40%)',
      kps: '30% (prior 40%)',
      weight: '121 lbs (prior 124 lbs)',
      findings: `Patient LM is a frail, cachectic 82-year-old female with end-stage Alzheimer's and vascular dementia examined today in her memory care room. She is lying in bed, eyes closed on approach, opening briefly to voice stimulation. No verbal output throughout the examination.

GEN: Frail and cachectic. Visible temporal and facial wasting. Malar hollowing. Skin pale. No acute distress at rest. Weight 121 lbs, decreased 3 lbs from last certification period.

HEENT: Normocephalic. Eyes open to voice stimulation, close again within 10-20 seconds. No purposeful visual tracking. Pupils equal and reactive. Temporal wasting prominent bilaterally. Oral mucosa moist. Edentulous.

CV: Regular rate and rhythm. HR 74. No murmurs. No JVD. No peripheral edema. Pulses 2+ bilateral radial.

RESP: Lungs clear to auscultation bilaterally. RR 16, unlabored. O2 saturation 96% on room air. No accessory muscle use.

ABD: Soft, non-distended. Bowel sounds present. No organomegaly. Incontinent brief in place.

EXT: Bilateral lower extremity contractures — limited passive ROM at hips (approximately 20 degrees flexion) and knees (extension limited to 20-25 degrees). No lower extremity edema. Left MAC 21.5 cm, Right MAC 21.5 cm (declined from 22 cm and 22.5 cm last period). Stage 2 sacral pressure injury per recent wound care note: 3.8 x 2.4 cm, 70% granulation.

NEURO/COG: Non-verbal throughout examination. Eyes open briefly to voice and tactile stimulation. No purposeful response to commands. No recognition response to family photos shown. FAST 6e.

Clinical findings confirm continued progression of end-stage dementia with PPS decline from 40% to 30%, weight loss of 3 lbs, MAC decline bilaterally, progression of sacral pressure injury from Stage 1 to Stage 2, worsening contractures, and increased sleep duration. These findings are directly attributable to the progression of her terminal dementia diagnosis.`,
    },
    md: {
      mdObservations: 'Daughter Susan present at F2F visit — confirms patient has shown no recognition response in past 6 weeks. Family goals remain comfort-focused. No changes to advance directives. Hospice plan of care reviewed and updated.',
      rnNarrative: `LM is an 82-year-old female with end-stage Alzheimer's dementia and vascular dementia, certification period 04/16/2026 to 06/15/2026. She presents with continued and measurable decline across multiple domains since the prior certification period.

NUTRITIONAL/WEIGHT
Weight has declined from 124 lbs to 118 lbs this certification period, representing a 6 lb loss over 60 days. Meal intake has decreased from approximately 60-65% last period to 40-50% this period despite full feeding assistance, requiring 45-60 minutes per meal with frequent rest breaks and food refusals. She continues on nectar-thick liquids per speech pathology recommendation. Ensure Plus BID is offered with acceptance of only 25-30 mL per serving. Left MAC has declined from 22 cm to 21.5 cm and right MAC from 22.5 cm to 21.5 cm. Dietitian has been notified of declining intake and MAC measurements.

FUNCTIONAL/ADL DEPENDENCE
Patient remains fully dependent for all activities of daily living. Previously would occasionally reach for a washcloth or lift her arm during dressing; this period demonstrates no purposeful participation in any care tasks. Mechanical lift is now required for bed-to-chair transfers this period, as she can no longer participate minimally in stand-pivot transfers as she did last period. Sleep duration has increased to 20-22 hours per day from 18-20 hours last period.

COGNITIVE/BEHAVIORAL
Patient is non-verbal throughout this certification period with no intelligible words produced. Moaning vocalizations have increased in frequency, particularly during morning cares. Daughter Susan confirms the patient has shown no recognition response during any visit over the past 6 weeks. Patient does not track visual stimuli, follow commands, or demonstrate any purposeful eye contact or communication attempts.

MOBILITY/FALLS
Patient remains wheelchair dependent with bilateral lower extremity contractures that have worsened this period — passive range of motion at the hips is now limited to approximately 20 degrees flexion, reduced from 30 degrees last period, and right knee extension is now limited to 20 degrees. Two falls occurred this period: Fall 1 on 04/28/2026, patient found on floor beside wheelchair without injury; Fall 2 on 05/14/2026, patient slid during lift transfer resulting in right forearm abrasion with X-ray negative for fracture. Mechanical lift with two-person assist is now required for all transfers following the second fall.

CARDIOPULMONARY/RESPIRATORY
Lungs remain clear to auscultation bilaterally. O2 saturation is 96% on room air, unchanged from prior period. Heart rate 74, regular. No new cardiopulmonary developments this period.

SKIN/INTEGUMENTARY
The Stage 1 sacral pressure injury documented last period has progressed to Stage 2 this period. Current wound assessment dated 05/20/2026 documents dimensions of 3.8 cm x 2.4 cm, depth 0.3 cm, with 70% granulation tissue and 30% slough, no signs of infection, and foam dressing with silicone contact layer in place. A new Stage 1 pressure injury was identified at the right lateral malleolus on 06/01/2026, measuring 1.5 cm x 1.0 cm with non-blanchable erythema and intact skin. Contributing factors include immobility, incontinence, and hypoalbuminemia with albumin 2.8 g/dL.

PAIN/SYMPTOM BURDEN
Patient is unable to self-report pain. PAINAD scores are 2-3 at baseline during cares and 4-5 during wound care and transfer procedures. Acetaminophen has been increased to 650mg TID scheduled this period from PRN last period, with improved tolerance of morning cares observed by staff. PRN morphine 2mg has been used on 3 occasions this period for wound care procedures.

SLEEP/ENERGY/FATIGUE
Sleep duration has increased to 20-22 hours per day from 18-20 hours last period. Patient is difficult to arouse for meals, requiring sustained tactile stimulation and voice stimulation to achieve brief wakefulness of 15-30 minutes per meal attempt.

PSYCHOSOCIAL/FAMILY
Daughter Susan is visiting 2-3 times weekly this period, reduced from 3-4 times weekly last period. Susan reports increased distress as she observes further decline and is tearful during visits. The chaplain is visiting Susan weekly for caregiver support and Susan attended the caregiver support group on two occasions this period. Staff notes the patient appears to respond with brief eye opening when Susan sings to her — this remains the primary family connection at this stage of her illness.

FAST: 6e. PPS: 30%. KPS: 30%. Weight: 118 lbs. MAC: L 21.5 cm, R 21.5 cm.

Patient LM with end-stage Alzheimer's and vascular dementia demonstrates continued and measurable decline across nutritional, functional, cognitive, mobility, and skin integrity domains consistent with terminal trajectory. Hospice care remains appropriate with a prognosis of less than six months.`,

      f2fNote: `FACE-TO-FACE ENCOUNTER NOTE
Patient: LM | Age: 82 | Sex: Female | Date of Encounter: 04/20/2026
Clinician: Dr. Sarah Chen, MD (Hospice Medical Director)
Certification Period: 04/16/2026 to 06/15/2026

Patient LM is an 82-year-old female with end-stage Alzheimer's dementia and vascular dementia. The following represents my direct clinical examination of this patient.

OBJECTIVE DATA
Weight: 121 lbs (prior period: 124 lbs — 3 lb decline)
FAST: 6e (unchanged from prior period)
PPS: 30% (declined from 40% last period)
KPS: 30% (declined from 40% last period)
MAC: Left 21.5 cm (prior 22 cm), Right 21.5 cm (prior 22.5 cm)
Vital Signs: BP 132/78, HR 74, RR 16, Temp 97.6F, O2 96% RA

PHYSICAL EXAMINATION
GEN: Frail and cachectic. Visible temporal and facial wasting. Malar hollowing. Skin pale. No acute distress at rest. Eyes closed on approach, open briefly to voice stimulation.
HEENT: Normocephalic. Eyes open to voice stimulation, close within 10-20 seconds. No purposeful visual tracking. Pupils equal and reactive. Temporal wasting prominent bilaterally. Oral mucosa moist. Edentulous.
CV: Regular rate and rhythm. HR 74. No murmurs. No JVD. No peripheral edema. Pulses 2+ bilateral radial.
RESP: Lungs clear to auscultation bilaterally. RR 16, unlabored. O2 saturation 96% on room air. No accessory muscle use. No adventitious sounds.
ABD: Soft, non-distended. Bowel sounds present all quadrants. No organomegaly. Incontinent brief in place.
EXT: Bilateral lower extremity contractures — limited passive ROM at hips (approximately 20 degrees flexion) and knees (extension limited to 20-25 degrees). No lower extremity edema. Left MAC 21.5 cm, Right MAC 21.5 cm, both declined from last period.
NEURO/COG: Non-verbal throughout examination. Eyes open briefly to voice and tactile stimulation. No purposeful response to commands. No recognition response to family photos shown. No purposeful movement of upper or lower extremities. FAST 6e.
SKIN: Stage 2 sacral pressure injury per wound care note dated 05/20/2026: 3.8 x 2.4 cm, 70% granulation. Stage 1 right lateral malleolus identified 06/01/2026.

DECLINE SINCE LAST CERTIFICATION PERIOD
Since the prior certification period, this patient demonstrates decline in the following domains: PPS has decreased from 40% to 30%; weight has declined 3 lbs from 124 lbs to 121 lbs; MAC has declined bilaterally; the sacral pressure injury has progressed from Stage 1 to Stage 2; a new Stage 1 pressure injury has developed at the right lateral malleolus; sleep duration has increased to 20-22 hours per day; and daughter confirms the patient has had no recognition response during any visit over the past 6 weeks. These changes reflect continued progression of her terminal dementia diagnosis and are not attributable to any unrelated or reversible condition.

THIS CERTIFICATION PERIOD
For the certification period of 04/16/2026 to 06/15/2026, the patient's clinical trajectory is consistent with end-stage dementia with a prognosis of less than six months. The hospice plan of care is appropriate and comfort-focused.

I certify that I have performed a face-to-face encounter with this patient and that the clinical findings documented above confirm continued eligibility for hospice care based on a prognosis of less than six months if the terminal illness runs its expected course. Clinical findings have been communicated with the recertifying physician.`,

      priorMDNote: `PHYSICIAN RECERTIFICATION NOTE — PRIOR PERIOD
Patient: LM | Age: 82 | Sex: Female
Certification Period: 02/16/2026 to 04/15/2026
Recertifying Physician: [REDACTED], MD

LM is an 82-year-old female with end-stage Alzheimer's dementia and vascular dementia recertified for hospice care for the certification period of 02/16/2026 to 04/15/2026.

This certification period documented continued decline across functional, nutritional, and cognitive domains. Weight declined from 128 lbs to 124 lbs — a 4 lb loss over 60 days — with meal intake decreasing to 60-65% of offered meals despite full feeding assistance and thickened liquids. MAC measurements remained stable at 22 cm bilaterally. The patient remains fully dependent for all ADLs with sleep duration of 18-20 hours per day, is non-verbal, does not consistently recognize her daughter, and does not follow commands. FAST stage 6e was unchanged.

Notable new findings this period included the development of a Stage 1 sacral pressure injury measuring 3 cm x 2 cm, managed with repositioning every 2 hours and foam dressing. No falls occurred. Cardiopulmonary status remained stable with lungs clear and O2 saturation 96% on room air.

Pain management has been managed with acetaminophen 650mg PRN, used approximately 3 times weekly, with PAINAD scores of 1-2 at rest and 2-3 during cares. Daughter Susan remains engaged with visits 3-4 times weekly and chaplain support has been initiated.

PPS: 40%. KPS: 40%. FAST: 6e. Weight: 124 lbs.

Patient LM continues to meet criteria for hospice recertification with a life expectancy of less than six months based on end-stage dementia trajectory with nutritional decline, functional dependence, pressure injury development, and cognitive deterioration consistent with terminal progression.`,
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
    rn: {
      lastBaseline: 'FAST 6c, PPS 30%, KPS 30%, weight 112 lbs, 2+ BLE edema, O2 2L NC',
      fast: '6c',
      pps: '20%',
      kps: '20%',
      weight: '108 lbs (down from 112 lbs last period — 4 lb loss)',
      vitals: 'BP 96/58, HR 92 irregular, RR 24, Temp 97.2F, O2 93% on 3L NC (was 2L last period)',
      domains: {
        nutritional: 'Weight declined from 112 lbs to 108 lbs this certification period — 4 lb loss. Meal intake decreased from approximately 30% to 15-20% of offered meals. Patient frequently declines meals after 2-3 bites citing nausea and feeling full. Dyspnea with eating requires rest breaks every few minutes during meals. Ensure 8 oz BID offered — accepting less than half. Visible cachexia with muscle wasting of bilateral upper and lower extremities. Temporal wasting prominent.',
        functional: 'Fully dependent all ADLs — requires maximum assistance for all personal care. Non-ambulatory this period — was able to stand briefly for pivot transfer last period, now unable to bear any weight. Mechanical lift required for all transfers this certification period. Dyspnea at rest precludes any meaningful participation in cares. Patient tires with sustained conversation. Sleeping approximately 16-18 hours per day.',
        cognitive: 'Alert and oriented to person and place. Does not consistently know the date or year. Follows simple commands. Participates in care decisions when awake. Expresses comfort preferences clearly — states she is "so tired" and does not want aggressive interventions. No delirium this period.',
        mobility: 'Non-ambulatory. Unable to bear weight this certification period. Mechanical lift in use for all transfers. Incontinent of urine — urinary catheter inserted this period for comfort and skin protection. Incontinent of bowel — continent pads in use.',
        cardiopulmonary: 'Oxygen requirement increased from 2L to 3L nasal cannula this certification period. O2 saturation 93% on 3L (was 94% on 2L last period). Respiratory rate 24 at rest — increased from 20-22 last period. Audible crackles bilateral lung bases. Dyspnea at rest present — improved to mild with 3L O2. Bilateral lower extremity edema 3+ to mid-thigh (worsened from 2+ to knees last period) despite furosemide 80mg BID. NT-proBNP 14,820 pg/mL drawn 04/10/2026 (significantly elevated above prior value of 8,292 pg/mL). Creatinine elevated to 3.1 mg/dL limiting further diuresis.',
        skin: 'Right lateral ankle wound present from prior period — now measuring 2.4 cm x 2.0 cm (increased from 2.1 x 1.8 cm). Wound bed: 60% granulation, 40% slough. No signs of infection. Foam dressing in place. New finding: bilateral lower extremity skin weeping serous fluid due to significant pitting edema — small areas of skin breakdown right lower leg managed with barrier cream and non-adherent dressings.',
        pain: 'Denies pain at rest. Reports 4/10 discomfort with dyspnea episodes and 6/10 with right ankle wound care. Morphine 2mg q4h PRN ordered — patient using approximately twice daily for dyspnea relief. Good response to morphine. Lorazepam 0.5mg PRN anxiety — used 3-4 times this period.',
        sleep: 'Sleeping 16-18 hours per day. Requires head of bed elevated 45 degrees to sleep — cannot tolerate supine position. Urinary catheter inserted this period — improved sleep continuity reported by patient.',
        psychosocial: 'Patient remains clear about her wishes — does not want to return to hospital and wants to remain comfortable. Daughter present at most nursing visits. Family unity around comfort goals. Patient has expressed she is "ready" and is not afraid. Chaplain visiting weekly. Son visits weekly from out of state. No family conflict regarding goals.',
      },
      priorNote: `GD is a 100-year-old female with end-stage chronic diastolic heart failure (HFpEF) followed on hospice through the certification period of 02/16/2026 to 04/15/2026. Her weight declined from 118 lbs to 112 lbs during this period, a 6 lb loss over 60 days. Meal intake has been approximately 25-30% of offered meals, with dyspnea during eating significantly limiting intake. She accepts Ensure BID with partial compliance. Visible cachexia with muscle wasting and temporal wasting is prominent throughout this period.

She requires fully dependent care for all activities of daily living with maximum assistance for all personal care activities. She was previously able to stand briefly for pivot transfers but this period requires total assist. Dyspnea at rest precludes any meaningful participation in cares. She sleeps approximately 14-16 hours per day. She is non-ambulatory with stand-pivot transfers requiring maximum two-person assist. She is incontinent of both urine and bowel. No falls occurred this certification period.

She remains alert and oriented to person and place, participates in care decisions when awake, and clearly expresses her desire for comfort care and her preference not to return to the hospital. Respiratory status shows O2 requirement of 2L nasal cannula with O2 saturation 94% on supplemental oxygen and respiratory rate 20-22 at rest. Audible crackles are present at bilateral lung bases. Bilateral lower extremity edema is 2+ to the knees despite furosemide 80mg BID. NT-proBNP was 8,292 pg/mL at hospice admission.

The right lateral ankle wound measures 2.1 cm x 1.8 cm with 70% granulation and 30% slough, foam dressing in place, no signs of infection, and no new wounds identified this period. Morphine 2mg PRN is being used 1-2 times daily for dyspnea with good response. Lorazepam 0.5mg PRN has been used rarely. Head of bed elevated for orthopnea. Nocturia has been disrupting sleep this period. The patient continues to express readiness and peace regarding her prognosis. Family remains unified around comfort goals with chaplain support weekly.

FAST: 6c. PPS: 30%. KPS: 30%. Weight: 112 lbs.`,
    },
    f2f: {
      f2fDate: '04/22/2026',
      f2fConductedBy: 'Dr. Robert H., MD (Hospice Medical Director)',
      fast: '6c (prior 6c)',
      pps: '20% (prior 30%)',
      kps: '20% (prior 30%)',
      weight: '109 lbs (prior 112 lbs)',
      findings: `Patient GD is a frail, cachectic 100-year-old female with end-stage HFpEF examined today in her SNF room. She is lying in bed with head of bed elevated to 45 degrees. She opens her eyes on approach and greets me with a soft hello. She is alert but tires quickly with conversation.

GEN: Profoundly cachectic and frail. Visible temporal and facial wasting. Skin pale with mild jaundice tinge. Appears older than stated age. Weight 109 lbs, decreased 3 lbs from 112 lbs at last certification period. On 3L nasal cannula oxygen.

HEENT: Normocephalic. Eyes open, tracks. Sclera mildly icteric. Temporal wasting prominent. Mucous membranes moist. JVD visible at 30 degrees — elevated approximately 10 cm.

CV: Irregular rate and rhythm. HR 92. S3 gallop present. No murmurs. Peripheral pulses 1+ bilateral lower extremities, 2+ bilateral upper extremities.

RESP: Respiratory rate 24 at rest. Bilateral crackles from bases to mid-lung fields. Mild expiratory wheeze. Using accessory muscles with conversation. O2 saturation 93% on 3L nasal cannula. Patient requests to pause conversation twice during examination due to dyspnea.

ABD: Soft. Mild hepatomegaly — liver 3 cm below right costal margin. No ascites. Bowel sounds present. Urinary catheter in place.

EXT: 3+ pitting edema bilateral lower extremities to mid-thigh. Skin weeping serous fluid bilateral lower legs — small areas of excoriation right greater than left managed with dressings. Right lateral ankle wound — foam dressing in place, per wound care note 2.4 x 2.0 cm, no signs of infection. Bilateral lower extremity muscle wasting pronounced. Feet cool to touch.

NEURO/COG: Alert and oriented to person and place. Does not know today's date. Follows commands. Able to express her wishes clearly. States she does not want to go to the hospital and wants to stay comfortable.

Clinical findings confirm continued progression of end-stage HFpEF with worsening volume overload despite maximum tolerated diuresis limited by CKD stage 4 with creatinine 3.1, increasing oxygen requirement from 2L to 3L, weight loss of 3 lbs, and NT-proBNP now 14,820 pg/mL. These findings are directly attributable to the progression of her terminal cardiac diagnosis.`,
    },
    md: {
      mdObservations: 'Patient verbalized understanding of her prognosis and reconfirmed comfort-focused goals during F2F visit. NT-proBNP 14,820 pg/mL drawn 04/10/2026 — significantly elevated above prior. Creatinine 3.1 mg/dL limiting further diuresis. Family fully aligned with comfort goals. No changes to advance directives needed.',
      rnNarrative: `GD is a 100-year-old female with end-stage chronic diastolic heart failure (HFpEF), certification period 04/16/2026 to 06/15/2026. She presents with continued and measurable decline across multiple domains since the prior certification period.

NUTRITIONAL/WEIGHT
Weight has declined from 112 lbs to 108 lbs this certification period, representing a 4 lb loss. Meal intake has decreased from approximately 30% to 15-20% of offered meals. Patient frequently declines meals after 2-3 bites, citing nausea and early satiety. Dyspnea with eating requires rest breaks every few minutes, significantly limiting intake duration. Ensure 8 oz BID is offered with less than half accepted. Visible cachexia with muscle wasting of bilateral upper and lower extremities is pronounced, with temporal wasting prominent.

FUNCTIONAL/ADL DEPENDENCE
Patient requires full dependence for all activities of daily living with maximum assistance for all personal care. She was able to stand briefly for pivot transfers last period but is now unable to bear any weight, requiring mechanical lift for all transfers this certification period. Dyspnea at rest precludes any meaningful participation in cares. She tires with sustained conversation. Sleep duration has increased to 16-18 hours per day.

COGNITIVE/BEHAVIORAL
Patient remains alert and oriented to person and place. She does not consistently know the date or year. She follows simple commands and participates in care decisions when awake. She continues to express her comfort preferences clearly, stating she is very tired and does not want aggressive interventions. No delirium occurred this period.

MOBILITY/FALLS
Patient is non-ambulatory and unable to bear weight this certification period. Mechanical lift is in use for all transfers. Urinary catheter was inserted this period for comfort and skin protection given inability to transfer to the commode. She is incontinent of bowel with continent pads in use. No falls occurred this period.

CARDIOPULMONARY/RESPIRATORY
Oxygen requirement has increased from 2L to 3L nasal cannula this certification period. O2 saturation is 93% on 3L supplemental oxygen, compared to 94% on 2L last period. Respiratory rate is 24 at rest, increased from 20-22 last period. Audible crackles are present at bilateral lung bases. Dyspnea at rest is present and improved to mild with 3L oxygen. Bilateral lower extremity edema has worsened from 2+ to the knees last period to 3+ to mid-thigh despite furosemide 80mg BID. NT-proBNP drawn 04/10/2026 is 14,820 pg/mL, significantly elevated above the prior value of 8,292 pg/mL at hospice admission. Creatinine has risen to 3.1 mg/dL, limiting further diuresis.

SKIN/INTEGUMENTARY
The right lateral ankle wound present from the prior period has increased from 2.1 x 1.8 cm to 2.4 x 2.0 cm. Wound bed has 60% granulation and 40% slough with foam dressing in place and no signs of infection. A new finding this period is bilateral lower extremity skin weeping of serous fluid secondary to significant pitting edema, with small areas of skin breakdown on the right lower leg managed with barrier cream and non-adherent dressings.

PAIN/SYMPTOM BURDEN
Patient denies pain at rest. She reports 4/10 discomfort with dyspnea episodes and 6/10 discomfort during right ankle wound care. Morphine 2mg q4h PRN is being used approximately twice daily for dyspnea relief with good response — respiratory rate decreases and patient reports improved comfort within 20 minutes of administration. Lorazepam 0.5mg PRN for anxiety has been used on 3-4 occasions this period.

SLEEP/ENERGY/FATIGUE
Patient sleeps 16-18 hours per day. She requires head of bed elevated to 45 degrees to sleep and cannot tolerate the supine position. Insertion of the urinary catheter this period has improved sleep continuity, as patient reported that nocturia had been disrupting her sleep last period.

PSYCHOSOCIAL/FAMILY
Patient remains clear and consistent in her wishes — she does not want to return to the hospital and wants to remain comfortable. Her daughter is present at most nursing visits. Family unity around comfort goals is strong. Patient has expressed that she is ready and is not afraid. The chaplain visits weekly and the patient finds the visits comforting. Her son visits weekly from out of state. No family conflict regarding goals of care.

FAST: 6c. PPS: 20%. KPS: 20%. Weight: 108 lbs.

Patient GD with end-stage HFpEF demonstrates continued and measurable decline across nutritional, functional, cardiopulmonary, and skin integrity domains consistent with terminal trajectory. Hospice care remains appropriate with a prognosis of less than six months.`,

      f2fNote: `FACE-TO-FACE ENCOUNTER NOTE
Patient: GD | Age: 100 | Sex: Female | Date of Encounter: 04/22/2026
Clinician: Dr. Robert H., MD (Hospice Medical Director)
Certification Period: 04/16/2026 to 06/15/2026

Patient GD is a 100-year-old female with end-stage chronic diastolic heart failure (HFpEF). The following represents my direct clinical examination of this patient.

OBJECTIVE DATA
Weight: 109 lbs (prior period: 112 lbs — 3 lb decline)
FAST: 6c (unchanged from prior period)
PPS: 20% (declined from 30% last period)
KPS: 20% (declined from 30% last period)
NT-proBNP: 14,820 pg/mL (prior: 8,292 pg/mL at hospice admission)
Creatinine: 3.1 mg/dL (elevated, limiting diuresis)
Vital Signs: BP 96/58, HR 92 irregular, RR 24, Temp 97.2F, O2 93% on 3L NC

PHYSICAL EXAMINATION
GEN: Profoundly cachectic and frail. Visible temporal and facial wasting. Skin pale with mild jaundice tinge. Appears older than stated age. On 3L nasal cannula oxygen. Alert, eyes open on approach.
HEENT: Normocephalic. Eyes open, tracks examiner. Sclera mildly icteric. Temporal wasting prominent. Mucous membranes moist. JVD visible at 30 degrees, approximately 10 cm.
CV: Irregular rate and rhythm. HR 92. S3 gallop present. No murmurs. Peripheral pulses 1+ bilateral lower extremities, 2+ bilateral upper extremities.
RESP: RR 24 at rest. Bilateral crackles from bases to mid-lung fields. Mild expiratory wheeze. Using accessory muscles with conversation. O2 saturation 93% on 3L nasal cannula. Patient requested to pause conversation twice due to dyspnea.
ABD: Soft. Mild hepatomegaly — liver 3 cm below right costal margin. No ascites. Bowel sounds present. Urinary catheter in place.
EXT: 3+ pitting edema bilateral lower extremities to mid-thigh. Skin weeping serous fluid bilateral lower legs with small areas of excoriation right greater than left. Right lateral ankle wound with foam dressing in place — per wound care note 2.4 x 2.0 cm, no signs of infection. Bilateral lower extremity muscle wasting pronounced. Feet cool to touch.
NEURO/COG: Alert and oriented to person and place. Does not know today's date. Follows commands. Expresses wishes clearly — states she does not want to go to the hospital and wants to stay comfortable.

DECLINE SINCE LAST CERTIFICATION PERIOD
Since the prior certification period, this patient demonstrates decline in the following domains: PPS has decreased from 30% to 20%; weight has declined 3 lbs; oxygen requirement has increased from 2L to 3L nasal cannula; O2 saturation has decreased from 94% to 93% on supplemental oxygen; lower extremity edema has worsened from 2+ to the knees to 3+ to mid-thigh; NT-proBNP has increased from 8,292 to 14,820 pg/mL; creatinine has risen to 3.1 mg/dL limiting further diuresis; the right lateral ankle wound has enlarged; and bilateral lower extremity skin breakdown has developed secondary to edema. These findings are directly attributable to the progression of her terminal cardiac diagnosis.

THIS CERTIFICATION PERIOD
For the certification period of 04/16/2026 to 06/15/2026, the patient's clinical trajectory is consistent with end-stage HFpEF with a prognosis of less than six months. The hospice plan of care is appropriate and comfort-focused.

I certify that I have performed a face-to-face encounter with this patient and that the clinical findings documented above confirm continued eligibility for hospice care based on a prognosis of less than six months if the terminal illness runs its expected course. Clinical findings have been communicated with the recertifying physician.`,

      priorMDNote: `PHYSICIAN RECERTIFICATION NOTE — PRIOR PERIOD
Patient: GD | Age: 100 | Sex: Female
Certification Period: 02/16/2026 to 04/15/2026
Recertifying Physician: [REDACTED], MD

GD is a 100-year-old female with end-stage chronic diastolic heart failure (HFpEF) with preserved ejection fraction, complicated by CKD stage 4, type 2 diabetes mellitus, hypertension, and peripheral vascular disease, recertified for hospice care for the certification period of 02/16/2026 to 04/15/2026.

This certification period documented continued decline across nutritional, functional, cardiopulmonary, and integumentary domains. Weight declined from 118 lbs to 112 lbs representing a 6 lb loss over 60 days, with meal intake decreasing to 25-30% of offered meals as dyspnea during eating significantly limits intake. She remains fully dependent for all ADLs and non-ambulatory, previously able to stand briefly for pivot transfers but now requiring total assist. Sleep duration increased to 14-16 hours per day. She remains alert and oriented to person and place and clearly expresses her comfort-focused goals.

Cardiopulmonary status showed continued decline with O2 requirement of 2L nasal cannula, O2 saturation 94% on supplemental oxygen, respiratory rate 20-22 at rest, audible crackles at bilateral lung bases, and 2+ bilateral lower extremity edema to the knees despite furosemide 80mg BID. NT-proBNP was 8,292 pg/mL at hospice admission. The right lateral ankle wound measured 2.1 x 1.8 cm with 70% granulation and 30% slough, with no signs of infection. Morphine 2mg PRN has been used 1-2 times daily for dyspnea with good effect.

PPS: 30%. KPS: 30%. FAST: 6c. Weight: 112 lbs.

Patient GD continues to meet criteria for hospice recertification with a life expectancy of less than six months based on end-stage HFpEF with recurrent decompensations, CKD stage 4 limiting optimization of standard heart failure therapies, progressive nutritional decline, functional deterioration, and worsening wound burden consistent with terminal trajectory.`,
    },
  },
};

export const RECERT_PATIENT_LIST = ['lm', 'gd'];
