export const DEMO_PATIENTS = {
  gd: {
    id: 'gd',
    name: 'GD',
    age: 100,
    sex: 'Female',
    diagnosis: 'Chronic diastolic heart failure (HFpEF), end-stage',
    secondaryDx: 'CKD stage 4 (eGFR 20-27), Type 2 diabetes mellitus, hypertension, peripheral vascular disease, prior CVA, anemia of chronic disease',
    tagline: '100F · End-stage heart failure · SNF',
    color: '#c4a882',
    documents: [
      {
        id: 'gd-discharge',
        type: 'Discharge Summary',
        date: '02/06/2026',
        content: `DISCHARGE SUMMARY - GD, DOB 02/14/1926, Age 100
Admission: 01/26/2026 | Discharge: 02/06/2026
Principal Dx: Acute decompensated heart failure, HFpEF
BNP on admission: 8,292 pg/mL. Echo: EF 55%, moderate diastolic dysfunction, moderate MR.
CKD stage 4 limited aggressive diuresis; creatinine 2.4 admission, peaked 2.9, stabilized 2.6 discharge.
Discharged to SNF on Lasix 80mg BID, metoprolol succinate 25mg daily. Lisinopril held secondary to CKD.
Functional: Required max assist all ADLs. Previously independent at home per family.`
      },
      {
        id: 'gd-hp',
        type: 'History & Physical',
        date: '01/26/2026',
        content: `H&P - GD, 01/26/2026
100F. Progressive dyspnea x2 weeks, now at rest. BLE edema, orthopnea x3 pillows. Ambulates <10 feet.
PMH: HFpEF NYHA III-IV, CKD stage 4 (baseline eGFR 20-27), T2DM insulin-dependent, HTN, PVD, CVA (remote), anemia of chronic disease (baseline Hgb 9.2).
Meds: Furosemide 40mg daily, metoprolol succinate 25mg, insulin glargine 10u QHS, aspirin 81mg, amlodipine 5mg.
Exam: BP 148/86, HR 88, RR 22, O2 sat 91% RA. JVD at 45 degrees. Bilateral basilar crackles. 3+ BLE pitting edema to knees.`
      },
      {
        id: 'gd-palliative',
        type: 'Palliative Care Note',
        date: '02/03/2026',
        content: `PALLIATIVE CARE NOTE - GD, 02/03/2026
Second hospitalization in 3 weeks. Despite optimization, remains volume-overloaded, high-level assist required. Prognosis poor.
Goals of care: Patient alert, participates. Does not want aggressive intervention. Daughter in agreement.
DNR/DNI confirmed. POLST updated: DNR, no hospitalization, comfort-focused only.
Recommendation: Hospice referral - patient meets criteria for end-stage heart failure.`
      },
      {
        id: 'gd-specialist',
        type: 'Specialist Note',
        date: '01/08/2026',
        content: `VASCULAR SURGERY - GD, 01/08/2026
Right lateral ankle wound, non-healing x6 weeks. PVD background. ABI 0.62 right, 0.71 left.
Wound: 2.1 cm x 1.8 cm shallow ulceration, granulation tissue, minimal exudate, no active infection.
Assessment: Venous/mixed arterial-venous ulceration. Revascularization not appropriate. Conservative wound care.`
      },
      {
        id: 'gd-wound',
        type: 'Wound Care Note',
        date: '02/10/2026',
        content: `WOUND CARE NOTE - GD, SNF, 02/10/2026
Right lateral ankle: 2.1 x 1.8 cm, depth 0.3 cm. 70% granulation, 30% slough. Minimal serosanguineous exudate. No infection. Foam dressing.
Pain: 3/10 rest, 6/10 with dressing change. Pre-medicated.`
      },
      {
        id: 'gd-labs',
        type: 'Lab Results',
        date: '02/14/2026',
        content: `LABS - GD, 02/14/2026
NT-proBNP: 8,292 pg/mL (critical H)
Creatinine: 2.6 mg/dL (H) | eGFR: 22 mL/min (H) | BUN: 52 (H)
Na: 138 | K: 4.8 (H) | CO2: 21 (L)
Hgb: 9.1 g/dL (L) | Hct: 28.4% (L)
Albumin: 2.8 g/dL (L) | Glucose: 142 (H) | A1c: 7.4%
Troponin I: 0.04 ng/mL (borderline)`
      },
    ],
    encounter: `Patient GD, 100-year-old female, admitted to hospice today from SNF following two hospitalizations in three weeks for decompensated heart failure. Daughter present throughout.

On arrival patient is awake but tired, appears frail and cachectic, sitting upright. States she is short of breath with any movement. Fatigue constant. Taking approximately 20-25% of meals, refused most food for two weeks. Lost approximately 8 pounds past month per SNF records.

Respiratory rate 22-24, audible crackles bilateral bases, O2 sat 91% room air. More comfortable upright.

Functional status: total assist for bathing, dressing, transfers, toileting. Cannot ambulate more than a few steps. Continent of bowel, new urinary incontinence since hospital discharge.

Alert and oriented to person and place. Able to follow conversation and express wishes clearly.

Skin: right lateral ankle wound approximately 2 cm, granulating but slow to heal. BLE edema 2+ bilaterally.

Goals of care: DNR, DNI, POLST updated to comfort-focused. Patient does not want to return to hospital. Daughter is healthcare proxy, fully aligned. Both understand hospice philosophy.

FAST 6c. PPS 30%. KPS 30%. Weight today 112 lbs.`
  },
  lm: {
    id: 'lm',
    name: 'LM',
    age: 82,
    sex: 'Female',
    diagnosis: "Alzheimer's dementia with vascular dementia, end-stage",
    secondaryDx: 'Hypertension, type 2 diabetes mellitus (diet-controlled), osteoporosis, prior right hip fracture, anemia of chronic disease',
    tagline: '82F · End-stage dementia · Memory care',
    color: '#4a90a4',
    documents: [
      {
        id: 'lm-hp',
        type: 'History & Physical',
        date: '01/08/2026',
        content: `HISTORY & PHYSICAL - LM, Age 82, 01/08/2026
Reason: Progressive dementia with safety concerns, family unable to provide adequate supervision at home.
PMH: Alzheimer's dementia moderate-to-severe (diagnosed 2019), vascular dementia (MRI 2022: multiple lacunar infarcts), hypertension, T2DM diet-controlled, osteoporosis, right hip fracture (2023, surgical repair), anemia of chronic disease.
Meds: Donepezil 10mg daily, memantine 10mg BID, metoprolol succinate 25mg daily, aspirin 81mg, calcium carbonate 500mg BID, vitamin D3 1000 IU, mirtazapine 7.5mg QHS.
Functional: Total assistance all ADLs. Non-ambulatory, wheelchair dependent. Incontinent bowel and bladder. FAST 6e.
Exam: BP 138/82, HR 76, RR 16, Temp 97.8F, O2 sat 96% RA. Weight: 124 lbs. Frail elderly female, non-verbal, occasional vocalizations. Temporal wasting noted. Bilateral lower extremity contractures developing. MAC: Left 22 cm, Right 22.5 cm.`
      },
      {
        id: 'lm-neuro',
        type: 'Specialist Note',
        date: '11/14/2025',
        content: `NEUROLOGY NOTE - LM, 11/14/2025
Interval: Progressive decline since last visit 6 months ago. No longer recognizes daughter on most visits. Communication declined from short phrases to largely non-verbal vocalizations. Two falls past 3 months - one bruised hip, no fracture. Requires full feeding assistance, eating time lengthened significantly.
Cognitive: Unable to complete formal testing. FAST 6e. Oriented to self only.
MRI brain (2022): Moderate cortical atrophy, multiple bilateral lacunar infarcts in basal ganglia and periventricular white matter.
Assessment: End-stage Alzheimer's with vascular dementia. FAST 6e. Prognosis consistent with less than 6 months. Hospice referral placed. Discontinue donepezil and memantine - no benefit at this stage.`
      },
      {
        id: 'lm-nursing',
        type: 'H&P',
        date: '01/10/2026',
        content: `MEMORY CARE NURSING ASSESSMENT - LM, 01/10/2026
Cognitive: Non-verbal, occasional moaning vocalizations. Does not follow commands. Inconsistently tracks visual stimuli. Does not recognize family. FAST 6e.
Functional: Fully dependent all ADLs. Wheelchair dependent, requires two-person assist for transfers due to lower extremity contractures. Incontinent bowel and bladder.
Nutrition: Requires full feeding assistance. Meal intake approximately 50-60%. Occasional coughing with thin liquids - thickened liquids ordered. Weight: 122 lbs (down from 124 lbs on 12/15/2025). MAC: Left 22 cm, Right 22 cm (prior: Left 22 cm, Right 22.5 cm).
Skin: Stage 1 pressure injury sacrum - 3 cm x 2 cm non-blanchable erythema, skin intact. Repositioning q2h in place.
Falls: Two falls this certification period. Fall 1 (11/22/2025): found on floor beside wheelchair, no injury. Fall 2 (12/18/2025): slid from wheelchair during transfer, bruising right forearm, no fracture on X-ray.
Sleep: Approximately 18-20 hours per day.`
      },
      {
        id: 'lm-wound',
        type: 'Wound Care Note',
        date: '01/14/2026',
        content: `WOUND CARE NOTE - LM, Memory Care, 01/14/2026
Location: Sacrum. Stage 1 pressure injury. Dimensions: 3.2 cm x 2.1 cm.
Wound bed: Non-blanchable erythema, skin intact. Periwound: mild warmth, no signs of infection. Exudate: none.
Contributing factors: Limited mobility, incontinence, nutritional decline (albumin 3.1 g/dL), bony prominence.
Care: Area cleansed, barrier cream applied, foam dressing for pressure relief.
Plan: Reassess in 3 days. Repositioning q2h. Pressure-redistribution cushion in place. Nutritional consultation recommended.`
      },
      {
        id: 'lm-labs',
        type: 'Lab Results',
        date: '01/12/2026',
        content: `LABS - LM, 01/12/2026
CBC: WBC 6.8, Hgb 10.2 g/dL (L), Hct 31.4% (L), Platelets 224
CMP: Na 139, K 4.2, Cr 1.1, eGFR 58, Glucose 98, Albumin 3.1 g/dL (L), Total Protein 5.8 g/dL (L)
TSH: 2.4 (normal)
HbA1c: 6.1%`
      },
      {
        id: 'lm-goals',
        type: 'Palliative Care Note',
        date: '01/15/2026',
        content: `GOALS OF CARE NOTE - LM, 01/15/2026
Participants: Daughter Susan, Memory Care DON, Hospice RN.
Clinical summary: 82F end-stage Alzheimer's/vascular dementia, FAST 6e, non-verbal, fully dependent ADLs, declining nutrition, stage 1 sacral pressure injury, two falls past 60 days. Weight declined 124 to 122 lbs past month. Prognosis less than 6 months.
Discussion: Daughter Susan tearful but engaged. Patient previously stated she never wanted to be kept alive by machines and valued comfort and dignity. Susan confirmed patient would not want hospitalization, CPR, or artificial nutrition.
Advance directives: DNR/DNI confirmed. POLST completed: DNR, no hospitalization, comfort-focused only, no artificial nutrition or hydration. Susan designated healthcare proxy.
Plan: Hospice enrollment proceeding. Donepezil and memantine discontinued. Mirtazapine continued. PRN comfort medications ordered.`
      },
    ],
    encounter: `Patient LM, 82-year-old female, admitted to hospice today from memory care facility following significant functional and cognitive decline over the past 6 months. Daughter Susan present throughout admission.

On arrival patient is seated in wheelchair, non-verbal, eyes partially open. Does not respond to voice. Appears frail with visible temporal and facial wasting. No signs of acute distress.

Neurological: Non-verbal, occasional moaning. Does not track consistently. Does not recognize daughter. FAST 6e.

Nutrition: Requires full feeding assistance. Taking approximately 50-60% of offered meals. Occasional coughing with liquids - on thickened liquids. Weight today 122 lbs, down from 124 lbs last month. Left MAC 22 cm, Right MAC 22 cm.

Skin: Stage 1 pressure injury sacrum, 3.2 x 2.1 cm, non-blanchable erythema, skin intact. No other breakdown.

Mobility: Fully dependent. Wheelchair dependent. Two-person assist for transfers due to bilateral lower extremity contractures. Incontinent bowel and bladder.

Sleep: Sleeping approximately 18-20 hours per day per memory care staff.

Falls: Two documented falls this period - 11/22/2025 and 12/18/2025. Second fall resulted in bruising right forearm, X-ray negative for fracture.

Goals of care: DNR/DNI in place. POLST updated to comfort-focused, no hospitalization, no artificial nutrition. Daughter Susan is healthcare proxy, fully aligned with comfort care goals.

PPS 40%. KPS 40%.`
  },
  tr: {
    id: 'tr',
    name: 'TR',
    age: 88,
    sex: 'Male',
    diagnosis: 'Debility following massive left MCA ischemic stroke',
    secondaryDx: 'Atrial fibrillation, hypertension, type 2 diabetes mellitus, prior TIA (2021), dysphagia with PEG tube dependence, stage 2 pressure injury right heel',
    tagline: '88M · Post-stroke debility · Home',
    color: '#4caf82',
    documents: [
      {
        id: 'tr-discharge',
        type: 'Discharge Summary',
        date: '05/28/2025',
        content: `DISCHARGE SUMMARY - TR, DOB 06/04/1937, Age 88
Admission: 05/12/2025 | Discharge: 05/28/2025
Principal Dx: Acute left MCA ischemic stroke
Hospital course: Large left MCA infarct involving frontal, parietal, and temporal lobes. Outside tPA window on arrival. Mechanical thrombectomy not pursued given age and comorbidity profile after family discussion. Course complicated by aspiration pneumonia requiring IV antibiotics. PEG tube placed hospital day 8 for dysphagia. Patient remained globally aphasic and right hemiplegic throughout.
Family meeting held day 12: wife Eleanor and son present. Goals of care discussed - family declined aggressive intervention, requested comfort-focused care with hospice evaluation.
Discharge status: Global aphasia, right hemiplegia, PEG tube dependent, total assistance all ADLs, incontinent bowel and bladder.
Disposition: Home with 24-hour caregiver support and hospice evaluation.
Discharge meds via PEG: Metoprolol 25mg daily, lisinopril 10mg daily, insulin glargine 10u QHS, pantoprazole 40mg daily, acetaminophen 650mg q6h PRN. Apixaban discontinued.`
      },
      {
        id: 'tr-neuro',
        type: 'Specialist Note',
        date: '07/15/2025',
        content: `NEUROLOGY FOLLOW-UP - TR, 07/15/2025, Home visit
Interval: 10 weeks post left MCA stroke. Minimal functional recovery. Opens eyes spontaneously, tracks movement inconsistently. No speech regained. Right arm remains flaccid. Right leg minimal movement only, unable to bear weight. One aspiration pneumonia hospitalization since discharge (06/28-07/03/2025).
Exam: Alert, eyes open. No verbal output. Does not follow commands. Right facial droop. Right arm flaccid. Right leg minimal hip flexion only. Left side functional - uses left hand purposefully. PEG site clean.
PPS: 30%. KPS: 30%.
Assessment: Minimal neurological recovery expected. Prognosis less than 6 months given age, stroke severity, dysphagia, recurrent aspiration risk. Continue hospice. No further neurological intervention indicated.`
      },
      {
        id: 'tr-hp',
        type: 'History & Physical',
        date: '06/05/2025',
        content: `H&P - HOSPICE ADMISSION - TR, 06/05/2025
Reason for referral: Post-massive left MCA stroke with global aphasia, right hemiplegia, PEG dependence, poor prognosis.
PMH: Atrial fibrillation (apixaban discontinued), hypertension, T2DM insulin-dependent, prior TIA (2021), dysphagia with PEG placed 05/20/2025, aspiration pneumonia during acute hospitalization.
Meds via PEG: Metoprolol 25mg, lisinopril 10mg, insulin glargine 10u QHS, pantoprazole 40mg, acetaminophen 650mg PRN.
Functional: Global aphasia, right hemiplegia, total assistance all ADLs, PEG tube for all nutrition and medications, incontinent bowel and bladder.
Exam: BP 142/78, HR 82 irregular, RR 16, Temp 97.6F, O2 sat 95% RA. Weight 168 lbs. Lying in hospital bed at home, eyes open. No verbal output. Right facial droop. Coarse breath sounds bilateral bases. PEG site clean. Stage 2 pressure injury right heel. Right arm flaccid.`
      },
      {
        id: 'tr-speech',
        type: 'Specialist Note',
        date: '06/10/2025',
        content: `SPEECH-LANGUAGE PATHOLOGY - TR, 06/10/2025
Referral: Dysphagia evaluation, communication assessment post-stroke.
Swallowing: PEG tube dependent. Oral phase: pooling of secretions, absent volitional cough. Unable to assess pharyngeal phase - patient cannot follow commands. NPO status maintained - aspiration risk too high.
Communication: Global aphasia confirmed. No verbal output. No consistent yes/no responses. Intermittently tracks movement and responds to familiar voices (tears noted when wife speaks).
Recommendations: Maintain NPO, all nutrition and meds via PEG. Oral care q4h. Family educated on oral care technique and aspiration precautions. AAC not feasible given severity. Family encouraged to continue meaningful interaction - touch, music, familiar voices.`
      },
      {
        id: 'tr-wound',
        type: 'Wound Care Note',
        date: '08/20/2025',
        content: `WOUND CARE NOTE - TR, Home, 08/20/2025
Location: Right heel. Stage 2 pressure injury. Dimensions: 2.8 cm x 2.2 cm, depth 0.2 cm.
Wound bed: 80% granulation, 20% slough. Periwound: mild erythema, no infection. Exudate: minimal serosanguineous. No odor.
Care: Irrigated with normal saline. Slough gently debrided. Foam dressing with silicone contact layer. Heel offloading boot in place.
Contributing factors: Bedbound, unable to reposition self, nutritional compromise (albumin 3.0), peripheral vascular disease.
Plan: Reassess every 3 days. Wife instructed on heel offloading and repositioning. Notify MD if wound progresses.`
      },
      {
        id: 'tr-labs',
        type: 'Lab Results',
        date: '08/18/2025',
        content: `LABS - TR, 08/18/2025
CMP: Na 137, K 4.6, Cr 1.4 (H), eGFR 52, Glucose 148 (H), Albumin 3.0 g/dL (L), Total Protein 5.9 (L), BUN 28
CBC: WBC 8.2, Hgb 11.4 g/dL (L), Hct 34.8% (L), Platelets 187
HbA1c: 7.8%
INR: 1.2 (apixaban discontinued post-stroke)`
      },
    ],
    encounter: `Patient TR, 88-year-old male, admitted to hospice today at home following massive left MCA stroke on 05/12/2025. Wife Eleanor present throughout admission, visibly fatigued but engaged. Son also present.

On arrival patient is lying in hospital bed in living room, eyes open, does not respond to voice or follow commands. Wife reports he occasionally responds to her touch with eye movement and tears.

Neurological: Global aphasia - no verbal output. Right hemiplegia - right arm flaccid, right leg minimal movement only. Does not follow commands. Inconsistent visual tracking. Right facial droop.

Respiratory: Coarse breath sounds bilateral bases. O2 sat 95% on room air. Has had one aspiration pneumonia hospitalization since stroke discharge (06/28-07/03/2025).

Nutrition: PEG tube in place for all nutrition and medications. NPO per speech pathology recommendation. Weight today 164 lbs, down from 168 lbs at hospice admission.

Skin: Stage 2 pressure injury right heel, 2.8 x 2.2 cm, 80% granulation. Heel offloading boot in place. No other breakdown.

Mobility: Bedbound. Total assistance all ADLs. Two-person assist for repositioning. Incontinent bowel and bladder.

Caregiver status: Wife Eleanor (84) is primary caregiver, reports significant exhaustion. Son providing support on weekends. Family requesting additional aide hours.

Goals of care: DNR/DNI. No hospitalization - family adamant following prior aspiration pneumonia admission. Comfort-focused care. Wife is healthcare proxy, fully aligned.

PPS 30%. KPS 30%.`
  },
};

export const PATIENT_LIST = ['gd', 'lm', 'tr'];
