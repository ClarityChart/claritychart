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

  rb: {
    id: 'rb',
    name: 'RB',
    age: 74,
    sex: 'Male',
    diagnosis: 'End-stage COPD with cor pulmonale',
    secondaryDx: 'Cor pulmonale, malnutrition (BMI 17.2), anxiety, hypertension, prior tobacco use (60 pack-years)',
    tagline: '74M · End-stage COPD · Home',
    color: '#a4744a',
    documents: [
      {
        id: 'rb-discharge',
        type: 'Discharge Summary',
        date: '01/14/2026',
        content: `DISCHARGE SUMMARY - RB, DOB 08/22/1951, Age 74
Admission: 01/06/2026 | Discharge: 01/14/2026
Principal Dx: Acute exacerbation of COPD
Hospital course: 74-year-old male with end-stage COPD (FEV1 <30% predicted) presenting with worsening dyspnea, increased sputum production, and hypoxemia. O2 sat 78% on arrival. Required high-flow oxygen, IV methylprednisolone, azithromycin, and nebulized bronchodilators. Improved to baseline but baseline remains severely compromised. This is his second hospitalization in 4 months for AECOPD. Pulmonology recommends hospice referral - patient not a candidate for further escalation given FEV1 <30%, cor pulmonale, and nutritional status.
Discharge status: O2 dependent 4L at rest, desats to 82% with minimal exertion, significant dyspnea with ADLs.
Discharge meds: Tiotropium 18mcg daily, albuterol MDI PRN, fluticasone/salmeterol 250/50 BID, prednisone taper, azithromycin 250mg daily, furosemide 20mg daily, lorazepam 0.5mg PRN dyspnea.`
      },
      {
        id: 'rb-pulm',
        type: 'Specialist Note',
        date: '11/20/2025',
        content: `PULMONOLOGY NOTE - RB, 11/20/2025
Interval: Second AECOPD hospitalization this year. PFTs from 09/2025: FEV1 0.68L (28% predicted), FVC 1.82L, FEV1/FVC 0.37. Severe obstruction, no bronchodilator response.
Exam: BP 138/86, HR 94, RR 24, O2 sat 88% on 3L NC at rest. Weight 134 lbs (BMI 17.2). Appears cachectic. Barrel chest. Pursed lip breathing. Diminished breath sounds throughout. Distant heart sounds. 1+ bilateral lower extremity edema.
Echo (10/2025): RV dilation and dysfunction consistent with cor pulmonale. RVSP estimated 52 mmHg. EF preserved.
Assessment: End-stage COPD with cor pulmonale. FEV1 <30% predicted, recurrent hospitalizations, cor pulmonale, nutritional failure. Meets LCD criteria for hospice. Strongly recommend hospice referral. Patient counseled - agreeable.`
      },
      {
        id: 'rb-hp',
        type: 'History & Physical',
        date: '01/06/2026',
        content: `H&P - RB, 01/06/2026
74M, end-stage COPD, presenting with acute exacerbation. 60 pack-year smoking history, quit 8 years ago.
PMH: COPD (FEV1 28% predicted), cor pulmonale (RVSP 52 mmHg), malnutrition (BMI 17.2), anxiety, hypertension, peripheral edema.
Meds: Tiotropium, albuterol PRN, fluticasone/salmeterol BID, furosemide 20mg, lorazepam 0.5mg PRN, lisinopril 10mg.
Exam: BP 144/88, HR 102, RR 28, O2 sat 78% RA (improved to 91% on 6L). Cachectic male in respiratory distress. Pursed lip breathing, accessory muscle use. Barrel chest. Diffuse expiratory wheezing, prolonged expiratory phase. Distant heart sounds. 2+ BLE edema.
Weight: 132 lbs (down from 134 lbs in November).`
      },
      {
        id: 'rb-palliative',
        type: 'Palliative Care Note',
        date: '01/12/2026',
        content: `PALLIATIVE CARE NOTE - RB, 01/12/2026
Participants: Patient, wife Margaret.
Clinical summary: 74M end-stage COPD, FEV1 28%, cor pulmonale, second hospitalization in 4 months, BMI 17.2, O2 dependent. Prognosis less than 6 months.
Discussion: Patient tearful when discussing prognosis. States he has known this was coming. Primary fear is suffocation - extensively counseled on dyspnea management with opioids and benzodiazepines at end of life. Wife Margaret present, supportive, asking practical questions about home care.
Patient states: he wants to die at home, does not want to be intubated or resuscitated, and wants to be comfortable.
Advance directives: DNR/DNI confirmed. POLST updated: DNR, no hospitalization, comfort-focused care. Wife designated healthcare proxy.
Plan: Hospice enrollment. Lorazepam and low-dose morphine for dyspnea management. Home oxygen continued for comfort.`
      },
      {
        id: 'rb-labs',
        type: 'Lab Results',
        date: '01/13/2026',
        content: `LABS - RB, 01/13/2026
ABG (on 4L NC): pH 7.36, pCO2 58 (H), pO2 68, HCO3 32 (H) - chronic respiratory acidosis with metabolic compensation
CBC: WBC 9.8, Hgb 16.2 g/dL (H - secondary polycythemia), Hct 49.8% (H), Platelets 198
CMP: Na 138, K 4.1, Cr 1.0, eGFR 74, Albumin 2.6 g/dL (L), Glucose 112
BNP: 680 pg/mL (H - consistent with cor pulmonale)
Prealbumin: 8.2 mg/dL (critically low - severe malnutrition)`
      },
      {
        id: 'rb-goals',
        type: 'H&P',
        date: '01/15/2026',
        content: `HOSPICE ADMISSION H&P - RB, 01/15/2026
Reason for referral: End-stage COPD with cor pulmonale, FEV1 28%, recurrent hospitalizations, malnutrition, goals of comfort care.
Functional status: Dyspneic at rest on 4L O2. Desats to 82% walking to bathroom. Requires assistance with bathing and dressing due to dyspnea. Sleeping in recliner - cannot lie flat. Eating approximately 40-50% of meals due to dyspnea with eating. Wife provides all household management.
PPS: 40%. KPS: 40%.
Exam: BP 136/84, HR 88, RR 22, O2 sat 91% on 4L NC. Weight 132 lbs. Cachectic. Pursed lip breathing at rest. Diminished breath sounds. 1+ BLE edema. Anxious affect.
Goals: Comfort at home, no rehospitalization, dyspnea control, wife supported.`
      },
    ],
    encounter: `Patient RB, 74-year-old male, admitted to hospice today at home following second hospitalization in 4 months for acute COPD exacerbation. Wife Margaret present throughout admission.

On arrival patient is seated upright in recliner, cannot lie flat. On 4L nasal cannula oxygen at rest, O2 sat 91%. Respiratory rate 22-24 at rest. Pursed lip breathing noted. States he is short of breath constantly — worse with any exertion. Cannot walk to the bathroom without significant desaturation and dyspnea.

Functional status: Requires assistance with bathing and dressing due to dyspnea. Wife manages all household tasks. Cannot ambulate more than 20-30 feet without stopping to rest.

Nutrition: Eating approximately 40-50% of meals — dyspnea limits his ability to eat full portions. Weight 132 lbs, down from 134 lbs last month. BMI 17.2. Appears cachectic with temporal and facial wasting.

Anxiety: Patient reports significant anxiety about suffocation. Lorazepam 0.5mg PRN in place, using approximately twice daily.

Goals of care: DNR/DNI confirmed. POLST updated. Patient wants to die at home. Does not want to return to hospital under any circumstances. Wife Margaret is healthcare proxy and fully aligned.

PPS 40%. KPS 40%.`
  },

  mc: {
    id: 'mc',
    name: 'MC',
    age: 67,
    sex: 'Male',
    diagnosis: 'Stage IV non-small cell lung cancer (adenocarcinoma), metastatic to brain and bone',
    secondaryDx: 'Brain metastases (3 lesions), bone metastases (thoracic spine, right femur), malnutrition, depression, chronic pain',
    tagline: '67M · Stage IV lung cancer · Home',
    color: '#7a4a6a',
    documents: [
      {
        id: 'mc-oncology',
        type: 'Specialist Note',
        date: '12/15/2025',
        content: `ONCOLOGY NOTE - MC, 12/15/2025
Interval: MC is a 67-year-old male with stage IV NSCLC adenocarcinoma, EGFR negative, ALK negative, PD-L1 40%. Completed 4 cycles carboplatin/pemetrexed with pembrolizumab. Restaging CT and MRI show disease progression — new brain metastases (3 lesions, largest 1.4 cm left frontal), progression of thoracic spine metastases, new right femoral lesion.
Patient declines further systemic chemotherapy. Has been counseled extensively. States he has made peace with his decision and wants quality of life over quantity.
Performance status: ECOG 3. KPS 40%. Significant decline from ECOG 1 at diagnosis 8 months ago.
Weight: 148 lbs (down from 178 lbs at diagnosis — 30 lb loss over 8 months).
Assessment: Stage IV NSCLC with progression on first-line therapy, patient declining further treatment. Prognosis weeks to months. Hospice referral strongly recommended and placed.`
      },
      {
        id: 'mc-ct',
        type: 'Specialist Note',
        date: '12/10/2025',
        content: `CT CHEST/ABDOMEN/MRI BRAIN REPORT - MC, 12/10/2025
CT Chest: Primary right upper lobe mass 4.2 x 3.8 cm (previously 3.1 x 2.9 cm — enlarging). Bilateral mediastinal and hilar lymphadenopathy. Small right pleural effusion, new since prior study. No pneumothorax.
CT Abdomen/Pelvis: Liver — two new hypodense lesions measuring 1.1 cm and 0.8 cm, suspicious for metastases. Adrenal metastasis right side stable at 2.2 cm.
Bone windows: Thoracic spine T6-T7 lytic lesions with cortical involvement, progression from prior. New lytic lesion right proximal femur 1.8 cm — orthopedic oncology referral recommended given fracture risk.
MRI Brain with contrast: Three enhancing lesions — left frontal 1.4 cm, right cerebellar 0.8 cm, right parietal 0.6 cm. No hemorrhage. No herniation. Mild surrounding edema.
Impression: Multi-organ metastatic progression on therapy.`
      },
      {
        id: 'mc-hp',
        type: 'History & Physical',
        date: '12/18/2025',
        content: `HOSPICE ADMISSION H&P - MC, 12/18/2025
Reason for referral: Stage IV NSCLC with progression on first-line therapy, patient declining further treatment, KPS 40%, significant weight loss, uncontrolled pain.
PMH: Stage IV NSCLC adenocarcinoma (diagnosed 04/2025), brain metastases, bone metastases (thoracic spine, right femur), malnutrition, depression (on sertraline), hypertension.
Meds: Oxycodone ER 30mg q12h, oxycodone IR 10mg q4h PRN (using 3-4x daily), dexamethasone 4mg BID (brain mets), ondansetron 4mg PRN, sertraline 50mg, lisinopril 10mg, omeprazole 20mg.
Functional: ECOG 3, KPS 40%. Requires assistance with bathing, dressing, transfers. Ambulates with walker, limited to household distances. Incontinent of urine — using pads.
Pain: 7/10 at rest, 9/10 with movement. Right leg pain (femoral lesion) worst. Back pain thoracic level constant.
Weight: 148 lbs. BMI 19.8. Temporal wasting visible.
Son Jason lives locally, involved. Daughter Sarah out of state.`
      },
      {
        id: 'mc-palliative',
        type: 'Palliative Care Note',
        date: '12/16/2025',
        content: `PALLIATIVE CARE NOTE - MC, 12/16/2025
Participants: Patient MC, son Jason.
Clinical: 67M stage IV NSCLC, disease progression on therapy, patient declining further treatment. KPS 40%. 30 lb weight loss. Uncontrolled pain. Brain metastases. Prognosis weeks to months.
Goals discussion: Patient is clear-minded and articulate. States he has researched his disease extensively and understands his prognosis. Declining further chemotherapy is his firm decision. Primary goals: pain control, remain at home, avoid hospital, maintain dignity. Wants to be alert enough to have conversations with his children.
DNR/DNI confirmed. POLST: DNR, no hospitalization, comfort measures only. Son Jason designated healthcare proxy.
Pain plan: Current opioid regimen inadequate. Recommend oxycodone ER increase, add scheduled short-acting for breakthrough. Dexamethasone for brain mets and appetite.
Depression: Acknowledged. Sertraline continued. Chaplaincy referral placed.`
      },
      {
        id: 'mc-labs',
        type: 'Lab Results',
        date: '12/17/2025',
        content: `LABS - MC, 12/17/2025
CBC: WBC 11.2 (H), Hgb 9.8 g/dL (L), Hct 30.1% (L), Platelets 312
CMP: Na 133 (L - SIADH vs poor intake), K 3.8, Cr 0.9, eGFR >60, Albumin 2.4 g/dL (L), Glucose 168 (H - dexamethasone effect)
LFTs: AST 48 (H), ALT 52 (H), Alk Phos 312 (H - bone/liver mets), Total Bili 0.8
LDH: 680 (H - tumor burden)
Calcium: 10.8 mg/dL (H - bone metastases)
CEA: 284 ng/mL (H)`
      },
      {
        id: 'mc-pain',
        type: 'Palliative Care Note',
        date: '12/20/2025',
        content: `PAIN MANAGEMENT NOTE - MC, 12/20/2025
Pain assessment: Baseline pain 7/10 at rest. Thoracic back pain constant, right leg pain with any weight bearing 9/10. Current regimen inadequate.
Medication adjustment: Oxycodone ER increased to 40mg q12h. Oxycodone IR 15mg q4h PRN for breakthrough. Adding scheduled acetaminophen 1000mg q8h. Dexamethasone continued at 4mg BID for brain edema and pain.
Right femoral lesion: Orthopedic oncology consulted — prophylactic nailing not recommended given prognosis and functional status. Monitor for pathologic fracture. Weight-bearing as tolerated with walker.
Goals: Pain 4/10 or less at rest while maintaining alertness for family interactions — patient's expressed priority.
Follow up: RN visit daily x3 days to assess pain response to medication adjustment.`
      },
    ],
    encounter: `Patient MC, 67-year-old male, admitted to hospice today at home following disease progression on first-line chemotherapy and decision to decline further treatment. Son Jason present throughout admission.

On arrival patient is seated in recliner, appears thin with visible temporal and facial wasting. Alert and conversational but fatigued. Reports pain 7/10 at rest, 9/10 with movement — primarily right leg (femoral metastasis) and thoracic back.

Neurological: Alert and oriented x4. No focal deficits from brain metastases noted on assessment today. On dexamethasone 4mg BID.

Mobility: Ambulates with walker, limited to household distances. Right leg pain limits weight bearing. Requires assistance with bathing and dressing. New urinary incontinence — using pads.

Nutrition: Eating approximately 30-40% of meals. Nausea intermittent, managed with ondansetron. Weight 148 lbs, down 30 lbs from diagnosis weight of 178 lbs over 8 months. Visible cachexia.

Pain: Oxycodone ER 30mg q12h plus IR 10mg q4h PRN — using breakthrough 3-4 times daily, inadequately controlled. Pain medication adjustment being coordinated with attending.

Psychosocial: Patient tearful at times during admission. States he has made peace with his decision. Wants to be present and alert for conversations with his children. Son Jason supportive and present. Daughter Sarah traveling from out of state.

Goals of care: DNR/DNI. No hospitalization. Comfort-focused. Wants to die at home.

PPS 40%. KPS 40%. Weight 148 lbs.`
  },

  wk: {
    id: 'wk',
    name: 'WK',
    age: 79,
    sex: 'Male',
    diagnosis: 'End-stage renal disease, declined dialysis',
    secondaryDx: 'Diabetic nephropathy, type 2 diabetes mellitus, hypertension, anemia of chronic kidney disease, peripheral neuropathy',
    tagline: '79M · End-stage renal disease · Home',
    color: '#4a6a8a',
    documents: [
      {
        id: 'wk-nephrology',
        type: 'Specialist Note',
        date: '01/05/2026',
        content: `NEPHROLOGY NOTE - WK, 01/05/2026
WK is a 79-year-old male with diabetic nephropathy and progressive CKD now at ESRD. eGFR 8 mL/min on today's labs. Creatinine 8.4 mg/dL. Extensive dialysis counseling completed over past 6 months. Patient has consistently declined dialysis after thorough discussion of risks, benefits, and alternatives. Decision is informed and consistent.
Uremic symptoms: Significant nausea, decreased appetite, fatigue, pruritus, mild encephalopathy (word-finding difficulty, slowed processing). Wife reports he sleeps most of the day.
Exam: BP 168/94, HR 76, RR 16. Weight 172 lbs (up 8 lbs from dry weight — volume overload). 3+ bilateral lower extremity edema to thighs. Uremic frost noted on forearms. Asterixis present.
Assessment: ESRD with uremic syndrome, declining dialysis. Conservative kidney management appropriate given patient wishes. Prognosis weeks to months without dialysis. Hospice referral placed.`
      },
      {
        id: 'wk-hp',
        type: 'History & Physical',
        date: '01/08/2026',
        content: `HOSPICE ADMISSION H&P - WK, 01/08/2026
Reason for referral: ESRD with uremic syndrome, patient declining dialysis, conservative management requested.
PMH: ESRD secondary to diabetic nephropathy, T2DM (insulin-dependent), hypertension, anemia of CKD (on darbepoetin), peripheral neuropathy, prior MI (2019).
Meds: Insulin glargine 20u QHS, insulin lispro sliding scale, metoprolol 50mg BID, amlodipine 10mg, furosemide 80mg BID, sodium bicarbonate 650mg TID, sevelamer 800mg TID with meals, ondansetron 4mg PRN, hydroxyzine 25mg PRN pruritus.
Functional: Requires assistance with bathing and dressing due to fatigue and edema. Ambulates with cane, limited to household. Incontinent of urine — using pads.
Exam: BP 162/90, HR 78, RR 18, O2 sat 94% RA. Weight 172 lbs. Appears chronically ill, mildly confused. Uremic frost bilateral forearms. 3+ pitting edema bilateral lower extremities to thighs. Asterixis present bilaterally.
Wife Evelyn present and involved throughout.`
      },
      {
        id: 'wk-palliative',
        type: 'Palliative Care Note',
        date: '01/06/2026',
        content: `PALLIATIVE CARE NOTE - WK, 01/06/2026
Participants: Patient WK, wife Evelyn, son David (by phone).
Clinical: 79M ESRD declining dialysis. eGFR 8, Cr 8.4, uremic symptoms progressive. Prognosis weeks to months.
Goals discussion: Patient alert and participatory despite mild encephalopathy. Consistent over multiple conversations that he does not want dialysis. States: he is 79 years old, has lived a good life, and does not want to be on a machine. Wife Evelyn tearful but supportive of his decision.
Primary goals: Symptom management (nausea, pruritus, dyspnea as it develops), remain at home with wife, avoid hospitalization, die peacefully.
DNR/DNI confirmed. POLST: DNR, no hospitalization, comfort measures only. Wife Evelyn designated healthcare proxy.
Symptom management plan: Ondansetron scheduled for nausea, hydroxyzine for pruritus, lorazepam PRN for dyspnea/anxiety as disease progresses, low-dose haloperidol PRN for uremic encephalopathy.`
      },
      {
        id: 'wk-labs',
        type: 'Lab Results',
        date: '01/07/2026',
        content: `LABS - WK, 01/07/2026
BMP: Na 132 (L), K 5.9 (H - critical), Cr 8.4 mg/dL (H), BUN 112 (H), eGFR 8 mL/min (H), CO2 14 (L - metabolic acidosis), Glucose 188 (H)
CBC: WBC 7.2, Hgb 8.4 g/dL (L), Hct 26.2% (L), Platelets 142 (L)
Phosphorus: 7.8 mg/dL (H)
Calcium: 7.6 mg/dL (L)
PTH: 892 pg/mL (H - renal osteodystrophy)
Albumin: 2.9 g/dL (L)
Note: Potassium 5.9 discussed with patient and family in context of goals of comfort care — dietary restriction counseled but not to be a source of distress.`
      },
      {
        id: 'wk-goals',
        type: 'Palliative Care Note',
        date: '01/09/2026',
        content: `GOALS OF CARE FOLLOW-UP - WK, 01/09/2026
Follow-up conversation with WK and wife Evelyn re: what to expect as ESRD progresses without dialysis.
Counseled on trajectory: increasing fatigue and somnolence, worsening nausea, possible confusion, eventual decreased responsiveness. Timeframe likely weeks.
Wife Evelyn asked about pain — counseled that uremia is generally not painful but can cause restlessness and confusion; medications available for both.
Patient reiterated his wishes clearly: home, comfortable, no interventions. Expressed gratitude for medical team.
Evelyn asked about when to call hospice: instructed to call for any symptom that concerns her, any time day or night. On-call nurse available 24/7.
Chaplaincy referral accepted by patient — states he would like to speak with someone about faith.`
      },
      {
        id: 'wk-discharge',
        type: 'Discharge Summary',
        date: '12/20/2025',
        content: `DISCHARGE SUMMARY - WK, 12/20/2025
Admission: 12/14/2025 | Discharge: 12/20/2025
Principal Dx: Uremic encephalopathy, ESRD
Hospital course: 79M with ESRD presenting with worsening confusion, nausea, and volume overload. Creatinine 7.8 on admission, now 8.4. eGFR 9. Dialysis again offered and declined. Fluid managed conservatively. Encephalopathy partially improved with sodium bicarbonate adjustment and bowel regimen. Nephrology, palliative care, and social work involved. Goals of comfort care confirmed. Hospice referral placed on discharge.
Discharge: Home with hospice. Wife Evelyn primary caregiver.`
      },
    ],
    encounter: `Patient WK, 79-year-old male, admitted to hospice today at home. Wife Evelyn present and tearful but composed. Son David participated by phone.

On arrival patient is seated in living room recliner, appears fatigued and mildly confused — oriented to person and place but not date. Slow to respond to questions. Wife reports he has been sleeping 18-20 hours per day for the past week.

Uremic symptoms: Nausea present, using ondansetron with partial relief. Significant pruritus bilateral forearms and legs — scratching noted. Mild asterixis present bilaterally on exam.

Edema: 3+ pitting edema bilateral lower extremities to thighs. Skin taut and weeping small amount of serous fluid right lower leg.

Respiratory: O2 sat 94% room air. RR 18. No acute distress.

Nutrition: Eating approximately 20-30% of meals due to nausea and decreased appetite. Weight 172 lbs — up 8 lbs from dry weight due to fluid retention.

Functional: Requires assistance with bathing and dressing. Ambulates with cane to bathroom only. Wife manages all household and caregiving tasks. Incontinent of urine — pads in place.

Goals of care: DNR/DNI confirmed. No hospitalization — patient and wife adamant. Comfort-focused care. Wife Evelyn is healthcare proxy, fully aligned.

PPS 30%. KPS 30%.`
  },

  ph: {
    id: 'ph',
    name: 'PH',
    age: 61,
    sex: 'Male',
    diagnosis: 'End-stage liver disease, alcohol-related cirrhosis, Child-Pugh Class C',
    secondaryDx: 'Hepatic encephalopathy grade II-III, recurrent ascites, portal hypertension, esophageal varices, hepatorenal syndrome type 2, malnutrition',
    tagline: '61M · End-stage liver disease · Home',
    color: '#6a7a4a',
    documents: [
      {
        id: 'ph-hepatology',
        type: 'Specialist Note',
        date: '01/10/2026',
        content: `HEPATOLOGY NOTE - PH, 01/10/2026
PH is a 61-year-old male with end-stage liver disease secondary to alcohol-related cirrhosis. Child-Pugh Class C (score 12). MELD-Na 32. Last drink approximately 18 months ago per patient report.
Current status: Requiring paracentesis every 10-14 days for tense ascites — most recent 01/08/2026 with 8.5L removed. Hepatic encephalopathy grade II-III on lactulose — wife reports confusion, personality changes, sleep-wake inversion. Jaundiced with total bili 6.8. INR 2.9. Creatinine 2.1 (hepatorenal syndrome type 2). Albumin 2.2.
Transplant: Patient was evaluated for liver transplant in 2024 — delisted due to continued alcohol use at that time. Now sober 18 months but MELD score and overall condition preclude retransplant evaluation.
Prognosis: MELD-Na 32 carries 3-month mortality >50%. Hospice referral strongly recommended. Discussed with patient and wife — both agreeable.`
      },
      {
        id: 'ph-paracentesis',
        type: 'Specialist Note',
        date: '01/08/2026',
        content: `PARACENTESIS PROCEDURE NOTE - PH, 01/08/2026
Procedure: Large volume paracentesis, ultrasound guided, right flank approach.
Volume removed: 8.5 liters, straw-colored fluid.
Cell count: WBC 180/mm3 (no SBP). Culture pending.
Albumin infusion: 50g IV albumin administered per protocol.
Patient tolerated procedure well. Abdomen soft post-procedure, significantly decompressed.
Patient reports this is his 6th paracentesis in the past 3 months. Frequency increasing — previously every 3 weeks, now every 10-14 days.
Note: Patient and wife declining further hospitalizations. Hospice evaluation initiated. Outpatient paracentesis can be continued as comfort measure through hospice if available in area.`
      },
      {
        id: 'ph-hp',
        type: 'History & Physical',
        date: '01/12/2026',
        content: `HOSPICE ADMISSION H&P - PH, 01/12/2026
Reason for referral: ESLD Child-Pugh C, MELD 32, recurrent ascites requiring frequent paracentesis, hepatic encephalopathy, hepatorenal syndrome, declining further hospitalization.
PMH: Alcohol-related cirrhosis (sober 18 months), hepatic encephalopathy, portal hypertension, esophageal varices (banded x2), hepatorenal syndrome type 2, malnutrition, depression.
Meds: Lactulose 30mL TID (titrated to 3-4 BMs/day), rifaximin 550mg BID, spironolactone 200mg daily, furosemide 80mg daily, nadolol 20mg daily, pantoprazole 40mg daily, zinc sulfate 220mg daily, thiamine 100mg daily.
Functional: Requires assistance with bathing and dressing. Ambulates slowly with abdominal distension limiting mobility. Confusion worsening — wife manages all medications and appointments.
Exam: BP 98/62, HR 102, RR 18, Temp 37.1C, O2 sat 95% RA. Weight 184 lbs (significant ascites). Jaundiced — scleral icterus prominent. Tense ascites, fluid wave present. Spider angiomata chest and arms. Palmar erythema. 2+ bilateral lower extremity edema. Mild asterixis.
Wife Sandra present, exhausted but dedicated.`
      },
      {
        id: 'ph-labs',
        type: 'Lab Results',
        date: '01/11/2026',
        content: `LABS - PH, 01/11/2026
LFTs: Total Bili 6.8 mg/dL (H), Direct Bili 4.2 (H), AST 88 (H), ALT 42 (H), Alk Phos 198 (H), GGT 312 (H)
Synthetic function: INR 2.9 (H), Albumin 2.2 g/dL (critically L), Total Protein 4.8 (L), Prothrombin Time 28.4 sec
Renal: Cr 2.1 mg/dL (H), BUN 38 (H), Na 128 (L - dilutional), K 3.6
CBC: WBC 3.2 (L - hypersplenism), Hgb 9.2 (L), Hct 28.4 (L), Platelets 62 (L - hypersplenism)
AFP: 18 ng/mL (mildly elevated - monitoring for HCC)
MELD-Na score: 32`
      },
      {
        id: 'ph-social',
        type: 'Palliative Care Note',
        date: '01/13/2026',
        content: `PALLIATIVE CARE / SOCIAL WORK NOTE - PH, 01/13/2026
Participants: Patient PH, wife Sandra, social worker, hospice RN.
Clinical: 61M ESLD Child-Pugh C, MELD 32, encephalopathy, recurrent ascites, hepatorenal syndrome. Prognosis weeks to months.
Psychosocial: Patient has complex feelings about his illness — acknowledges alcohol was the cause and expresses guilt. Wife Sandra has been his primary support and caregiver. Financial stress — patient was primary earner, now unable to work. Adult son estranged.
Goals discussion: Patient wants to be at home with Sandra. Does not want to die in a hospital. Primary fears: pain, confusion, being a burden to wife.
DNR/DNI confirmed. POLST: DNR, no hospitalization, comfort measures. Wife Sandra healthcare proxy.
Social work plan: Connecting family with financial assistance resources. Caregiver support group referral for Sandra. Chaplaincy declined by patient at this time.
Comfort measures discussed: Continued outpatient paracentesis as symptom management through hospice. Lactulose and rifaximin for encephalopathy. Opioids PRN for abdominal pain and dyspnea as disease progresses.`
      },
      {
        id: 'ph-discharge',
        type: 'Discharge Summary',
        date: '12/28/2025',
        content: `DISCHARGE SUMMARY - PH, 12/28/2025
Admission: 12/22/2025 | Discharge: 12/28/2025
Principal Dx: Hepatic encephalopathy grade III, ESLD
Hospital course: 61M with ESLD presenting with worsening confusion. Wife reports 3 days of increasing disorientation, sleep inversion, and agitation. Lactulose dose increased, rifaximin continued. Encephalopathy improved to grade I-II by discharge. Paracentesis performed 12/24 (7.8L removed). Patient and wife declining further hospitalizations — hospice referral initiated. Goals of comfort care confirmed.
Discharge: Home with hospice. Outpatient paracentesis to continue as comfort measure.`
      },
    ],
    encounter: `Patient PH, 61-year-old male, admitted to hospice today at home. Wife Sandra present throughout, appears exhausted but relieved to have support in place.

On arrival patient is seated at kitchen table, jaundiced with prominent scleral icterus. Abdomen visibly distended — last paracentesis 6 days ago, ascites already reaccumulating. Moves slowly due to abdominal girth and fatigue.

Neurological: Alert but slowed. Oriented to person and place, not date. Wife reports he is much better than last week when he was confused and agitated. Mild asterixis on exam. Sleep-wake inversion — awake at night, sleeping days.

Abdomen: Tense ascites, fluid wave present. Mild abdominal discomfort with palpation. Last paracentesis 01/08 with 8.5L removed — sixth procedure in 3 months.

Skin: Jaundiced throughout. Spider angiomata chest and upper arms. Palmar erythema. 2+ lower extremity edema.

Nutrition: Eating approximately 30% of meals — nausea and early satiety from ascites. Weight 184 lbs (includes significant ascites). Appears cachectic in upper body with muscle wasting despite total weight.

Functional: Requires assistance with bathing and dressing. Ambulates independently but slowly within home. Wife manages all medications, meals, and household tasks.

Goals of care: DNR/DNI confirmed. No hospitalization. Comfort-focused care. Wants to continue outpatient paracentesis as symptom management. Wife Sandra is healthcare proxy, fully aligned.

PPS 40%. KPS 40%.`
  },

  ef: {
    id: 'ef',
    name: 'EF',
    age: 58,
    sex: 'Female',
    diagnosis: 'Amyotrophic lateral sclerosis (ALS), bulbar onset',
    secondaryDx: 'Anarthria, dysphagia with PEG tube dependence, respiratory compromise (FVC 38%), depression, insomnia',
    tagline: '58F · ALS, bulbar onset · Home',
    color: '#8a4a7a',
    documents: [
      {
        id: 'ef-neuro',
        type: 'Specialist Note',
        date: '12/20/2025',
        content: `NEUROLOGY / ALS CLINIC NOTE - EF, 12/20/2025
EF is a 58-year-old female with bulbar-onset ALS diagnosed 22 months ago. Rapid progression — from mild dysarthria at diagnosis to anarthria within 8 months, dysphagia requiring PEG placement at 12 months.
Current status: Communicates by eye gaze board and eye-tracking device (Tobii Dynavox). Upper extremity function declining — right hand weakness, left hand relatively preserved. Lower extremity strength maintained but gait impaired. Uses power wheelchair for community mobility.
Respiratory: FVC 38% predicted. Declined BiPAP — uses high-flow oxygen at night for comfort. Declined tracheostomy and ventilator. These decisions are consistent and informed.
Weight: 118 lbs (down from 142 lbs at diagnosis — 24 lb loss over 22 months). PEG tube feeds providing approximately 1400 kcal/day.
Husband David primary caregiver. Two adult children involved and supportive.
Assessment: Advanced ALS with significant bulbar and respiratory involvement. FVC 38% with respiratory decline trajectory. Hospice criteria met. Referral placed — patient and family in agreement.`
      },
      {
        id: 'ef-pulm',
        type: 'Specialist Note',
        date: '11/15/2025',
        content: `PULMONOLOGY NOTE - EF, 11/15/2025
Respiratory assessment for ALS patient declining ventilatory support.
PFTs: FVC 38% predicted (was 62% 6 months ago — significant decline). MIP -32 cmH2O (severely reduced). Sniff nasal inspiratory pressure 28 cmH2O.
Nocturnal oximetry: SpO2 nadir 84%, significant desaturation events. Offered BiPAP — patient declined after thorough discussion. Using supplemental O2 2L at night for comfort, with understanding this treats symptoms but not underlying respiratory failure.
Symptoms: Orthopnea — sleeps with head of bed elevated 45 degrees. Morning headaches (CO2 retention). Dyspnea with exertion and when speaking via eye gaze (increased effort).
Discussion: Patient understands her respiratory trajectory. Declined tracheostomy and long-term ventilation — consistent with values of quality over quantity. Discussed comfort measures as respiratory failure progresses — opioids for dyspnea, anxiolytics.
Recommends hospice referral given FVC <40% and patient declining life-prolonging respiratory support.`
      },
      {
        id: 'ef-hp',
        type: 'History & Physical',
        date: '01/02/2026',
        content: `HOSPICE ADMISSION H&P - EF, 01/02/2026
Reason for referral: Advanced ALS, FVC 38%, anarthria, PEG dependent, declining ventilatory support, trajectory consistent with less than 6 months.
PMH: ALS bulbar onset (diagnosed 02/2024), anarthria, dysphagia with PEG (placed 02/2025), respiratory compromise, depression (on sertraline), insomnia (on trazodone), sialorrhea (on glycopyrrolate).
Meds via PEG: Riluzole 50mg BID, sertraline 100mg, trazodone 50mg QHS, glycopyrrolate 1mg TID, baclofen 10mg TID (spasticity), lorazepam 0.5mg PRN dyspnea/anxiety, morphine 2mg q4h PRN dyspnea.
Communication: Eye gaze board and Tobii Dynavox eye-tracking device. Slow but reliable communication — patient fully cognitively intact.
Functional: Power wheelchair dependent. Upper extremity — right hand weak (grip 2/5), left hand preserved (grip 4/5). Lower extremities — ambulates short distances with significant effort, primarily wheelchair.
Husband David present throughout. Daughter Emily (33) and son Marcus (30) involved.`
      },
      {
        id: 'ef-speech',
        type: 'Specialist Note',
        date: '10/08/2025',
        content: `SPEECH-LANGUAGE PATHOLOGY NOTE - EF, 10/08/2025
Communication assessment: Patient is anarthric — no functional verbal communication. Uses Tobii Dynavox eye-tracking AAC device effectively. Communicates full sentences and complex thoughts via eye gaze. Cognitively intact. Husband David trained on device — excellent caregiver support.
Swallowing: Patient is NPO, PEG tube dependent. Saliva management remains challenging — glycopyrrolate prescribed for sialorrhea with partial benefit. Suction machine at home for secretion management.
Voice banking: Not applicable — patient did not complete voice banking prior to loss of speech. Using pre-recorded messages from family members on Tobii device for emotional connection.
Recommendations: Continue current AAC device. Ensure device is charged and accessible at all times — this is patient's only means of communication. Caregiver education reinforced. Hospice team to be trained on Tobii device use at admission.`
      },
      {
        id: 'ef-als-clinic',
        type: 'H&P',
        date: '09/15/2025',
        content: `ALS MULTIDISCIPLINARY CLINIC NOTE - EF, 09/15/2025
Participants: Neurology, pulmonology, speech pathology, occupational therapy, social work, chaplaincy.
Interval: Significant decline since last clinic visit 3 months ago. FVC declined from 52% to 42%. Right hand weakness now limiting ADL independence. Increased fatigue. Husband reports increasing caregiver burden.
Physical therapy: Gait becoming unsafe — transitioned to power wheelchair full time for community. Short distance household ambulation still possible with supervision.
Occupational therapy: Right hand adaptive equipment provided. Environmental modifications to home completed — hospital bed, bedside commode, shower chair.
Social work: Caregiver stress assessment — husband David scoring high on Zarit Burden Scale. Respite care options discussed. ALS Association resources connected.
Chaplaincy: Patient met with chaplain — expressed peace with her situation, gratitude for family, concern about being a burden. Chaplain to continue regular visits.
Plan: Hospice referral at next significant decline or per patient/family request. Patient states she will know when the time is right.`
      },
      {
        id: 'ef-labs',
        type: 'Lab Results',
        date: '12/22/2025',
        content: `LABS - EF, 12/22/2025
CBC: WBC 6.8, Hgb 11.8 g/dL (L), Hct 36.2% (L), Platelets 228
CMP: Na 139, K 4.0, Cr 0.7, eGFR >60, Albumin 3.2 g/dL (L), Glucose 94
Prealbumin: 14.2 mg/dL (L - nutritional compromise despite tube feeds)
LFTs: Within normal limits
Thyroid: TSH 2.1 (normal)
Note: Labs reflect nutritional compromise and mild anemia despite PEG tube feeds at 1400 kcal/day. Registered dietitian recommends formula adjustment.`
      },
    ],
    encounter: `Patient EF, 58-year-old female, admitted to hospice today at home. Husband David present throughout admission. Daughter Emily joined by video call.

On arrival patient is seated in power wheelchair, appears thin but alert with bright, engaged eyes. Communicates via Tobii Dynavox eye-tracking device — slow but clear. First message to hospice nurse via device: "Thank you for coming. I have been waiting for this support."

Communication: Anarthric. Uses Tobii Dynavox effectively — cognitively fully intact. Hospice nurse trained on device use during admission visit.

Respiratory: O2 sat 92% on room air at rest. RR 18. Using 2L nasal cannula oxygen at night. Sleeps with head of bed elevated 45 degrees for orthopnea. Morning headaches reported by husband — consistent with nocturnal CO2 retention. FVC 38% on last pulmonology assessment.

Nutrition: PEG tube in place, receiving 1400 kcal/day via formula. Weight 118 lbs, down 24 lbs from diagnosis weight. Prealbumin 14.2 — nutritional compromise despite tube feeds.

Functional: Power wheelchair dependent for all mobility. Right hand grip 2/5, left hand 4/5. Uses left hand for Tobii device control and limited ADL tasks. Husband David provides all personal care — bathing, dressing, transfers.

Secretions: Sialorrhea managed with glycopyrrolate, suction machine available at home. Husband trained and competent with suction.

Psychosocial: Patient communicated via device that she is at peace and grateful for family. Husband David tearful but composed. Daughter Emily emotional on video call. ALS Association social worker has been involved — caregiver support in place.

Goals of care: DNR/DNI confirmed. Declined BiPAP, tracheostomy, and ventilator — consistent and informed. No hospitalization. Comfort-focused care at home. Husband David is healthcare proxy, fully aligned.

PPS 40%. KPS 40%. Weight 118 lbs.`
  },

  dv: {
    id: 'dv',
    name: 'DV',
    age: 71,
    sex: 'Female',
    diagnosis: 'Stage IV pancreatic adenocarcinoma with liver metastases',
    secondaryDx: 'Liver metastases, malnutrition (28 lb weight loss), biliary obstruction with jaundice, intractable pain, depression',
    tagline: '71F · Stage IV pancreatic cancer · Home',
    color: '#7a6a4a',
    documents: [
      {
        id: 'dv-oncology',
        type: 'Specialist Note',
        date: '01/06/2026',
        content: `ONCOLOGY NOTE - DV, 01/06/2026
DV is a 71-year-old female with stage IV pancreatic adenocarcinoma diagnosed 5 months ago with liver metastases at presentation. Completed 2 cycles gemcitabine/nab-paclitaxel — disease progression on restaging CT. Discussed FOLFIRINOX as second-line — patient declines given performance status and side effect profile.
Current status: ECOG 3. KPS 40%. Severe cachexia — weight 128 lbs (down from 156 lbs at diagnosis, 28 lb loss over 5 months). Jaundiced — total bilirubin 8.4. Biliary stent placed 3 weeks ago with partial improvement. Pain 7-8/10 despite opioids — epigastric and back pain from pancreatic mass and celiac involvement.
CA 19-9: 48,240 U/mL (markedly elevated, consistent with disease burden).
Assessment: Rapidly progressive metastatic pancreatic cancer, ECOG 3, declining further chemotherapy. Prognosis weeks to 2-3 months. Hospice referral placed and accepted by patient and daughter.`
      },
      {
        id: 'dv-ct',
        type: 'Specialist Note',
        date: '01/02/2026',
        content: `CT ABDOMEN/PELVIS WITH CONTRAST - DV, 01/02/2026
Pancreas: Primary mass in pancreatic head/body junction 4.8 x 4.1 cm (enlarged from 3.6 x 3.2 cm 8 weeks ago). Encases celiac axis and superior mesenteric artery — not surgically resectable. Common bile duct stent in place, mild intrahepatic biliary dilation persisting.
Liver: Multiple hypodense lesions bilaterally consistent with metastases. Largest right lobe 4.2 cm (was 2.8 cm 8 weeks ago — significant progression). At least 8 lesions identified — previously 4 lesions.
Peritoneum: Small volume ascites, new since prior study.
Lymph nodes: Celiac axis, peripancreatic, and retroperitoneal lymphadenopathy, enlarged from prior.
Impression: Significant disease progression on systemic therapy. Liver metastatic burden substantially increased. New peritoneal involvement.`
      },
      {
        id: 'dv-hp',
        type: 'History & Physical',
        date: '01/08/2026',
        content: `HOSPICE ADMISSION H&P - DV, 01/08/2026
Reason for referral: Stage IV pancreatic adenocarcinoma, disease progression, declining further chemotherapy, ECOG 3, severe cachexia, intractable pain, jaundice.
PMH: Pancreatic adenocarcinoma stage IV (diagnosed 08/2025), liver metastases, biliary obstruction (stent placed 12/2025), malnutrition, depression (on sertraline), hypertension, osteoarthritis.
Meds: Oxycodone ER 40mg q8h, oxycodone IR 15mg q3h PRN (using 4-5x daily), gabapentin 300mg TID (neuropathic pain), dexamethasone 4mg BID, ondansetron 8mg q8h, sertraline 50mg, lisinopril 10mg, pantoprazole 40mg, creon 12 3 caps with meals (pancreatic enzyme replacement).
Functional: ECOG 3. Requires assistance with all ADLs. Ambulates with walker, limited to bathroom only. Incontinent of urine.
Exam: BP 108/68, HR 92, RR 18, O2 sat 96% RA. Weight 128 lbs. Profoundly cachectic — temporal wasting, muscle wasting all extremities. Deeply jaundiced — skin and sclera. Abdomen: tender epigastrium, mild guarding, biliary stent site well-healed. Small volume ascites. Bilateral lower extremity edema 1+.
Daughter Melissa flew in from Seattle, staying with mother.`
      },
      {
        id: 'dv-palliative',
        type: 'Palliative Care Note',
        date: '01/05/2026',
        content: `PALLIATIVE CARE NOTE - DV, 01/05/2026
Participants: Patient DV, daughter Melissa.
Clinical: 71F stage IV pancreatic cancer, disease progression, declining further treatment. KPS 40%. 28 lb weight loss. Intractable pain. Jaundice. Prognosis weeks to months.
Goals discussion: Patient is tired and frightened. States she did not expect cancer to move this fast. Her primary fears are pain and suffering. Daughter Melissa devastated but present and supportive.
Patient's wishes: Wants to be comfortable, wants her daughter with her, does not want to die in a hospital. Does not want aggressive intervention. Willing to try anything that helps with pain.
DNR/DNI confirmed. POLST: DNR, no hospitalization, comfort measures only. Daughter Melissa designated healthcare proxy.
Pain plan: Current regimen inadequate — recommend oxycodone ER increase, scheduled short-acting, consider ketamine infusion or celiac plexus block if pain refractory (patient amenable). Gabapentin for neuropathic component.
Nutrition: Discussed. Patient understands artificial nutrition will not help at this stage. Creon for pancreatic insufficiency to maximize comfort from oral intake.`
      },
      {
        id: 'dv-labs',
        type: 'Lab Results',
        date: '01/07/2026',
        content: `LABS - DV, 01/07/2026
LFTs: Total Bili 8.4 mg/dL (H), Direct Bili 6.2 (H), AST 142 (H), ALT 98 (H), Alk Phos 848 (H), GGT 1,240 (H)
CBC: WBC 12.4 (H), Hgb 9.2 g/dL (L), Hct 28.8% (L), Platelets 388 (H - reactive)
CMP: Na 131 (L), K 3.4 (L), Cr 0.8, Albumin 2.1 g/dL (critically L), Glucose 188 (H - steroid effect), Ca 9.2
Tumor markers: CA 19-9 48,240 U/mL (H), CEA 84 ng/mL (H)
Coagulation: PT 16.2, INR 1.4 (H - hepatic dysfunction)
Prealbumin: 6.8 mg/dL (critically L - severe malnutrition)`
      },
      {
        id: 'dv-pain',
        type: 'Palliative Care Note',
        date: '01/09/2026',
        content: `PAIN MANAGEMENT NOTE - DV, 01/09/2026
Pain assessment: Epigastric and back pain 8/10 at rest, 10/10 with movement or eating. Consistent with celiac plexus involvement from pancreatic mass. Current opioid regimen inadequate despite high doses.
Medication changes: Oxycodone ER increased to 60mg q8h. Oxycodone IR 20mg q3h PRN. Adding scheduled methadone 5mg q8h for refractory pain — patient and daughter counseled on methadone initiation protocol. Gabapentin increased to 600mg TID.
Celiac plexus block: Discussed with patient and daughter as option for refractory pain — patient interested. Interventional radiology consultation placed; patient may be too debilitated for procedure.
Dexamethasone: Continued at 4mg BID — appetite stimulant and anti-inflammatory benefit.
Goals: Achieve pain 4/10 or less. Patient states she wants to be comfortable enough to sit with her daughter and talk.`
      },
    ],
    encounter: `Patient DV, 71-year-old female, admitted to hospice today at home. Daughter Melissa present throughout, flew in from Seattle and staying with her mother.

On arrival patient is in bed, unable to sit up comfortably due to pain. Deeply jaundiced — skin and sclera yellow-orange. Profoundly cachectic with visible temporal wasting and muscle wasting throughout.

Pain: 8/10 at rest, reports 10/10 with any movement including turning in bed. Epigastric and midback pain constant. Using oxycodone ER 40mg q8h plus breakthrough 4-5 times daily — inadequately controlled. Pain medication escalation being coordinated with attending.

Respiratory: O2 sat 96% room air. RR 18. No respiratory distress at rest.

Nutrition: Eating approximately 10-20% of meals — pain with eating, nausea, anorexia. Weight 128 lbs, down 28 lbs from 156 lbs at diagnosis 5 months ago. Prealbumin 6.8 — severe malnutrition. Taking creon with meals per prescription.

Abdomen: Tender epigastrium with light palpation. Mild guarding. Small volume ascites noted on exam. Biliary stent site well-healed.

Functional: Bedbound for most of day due to pain. Ambulates to bathroom only with significant assistance. Requires total assistance with bathing and dressing. Incontinent of urine — pads in place.

Psychosocial: Patient tearful during admission. States she is frightened and did not expect things to move this fast. Daughter Melissa tearful throughout — asks many questions about what to expect. Both expressed relief that hospice support is now in place.

Goals of care: DNR/DNI confirmed. No hospitalization. Wants to be comfortable and able to spend time with daughter. Daughter Melissa is healthcare proxy, fully aligned.

PPS 30%. KPS 30%. Weight 128 lbs.`
  },

  hn: {
    id: 'hn',
    name: 'HN',
    age: 77,
    sex: 'Male',
    diagnosis: "Advanced Parkinson's disease with dementia (PDD), Hoehn & Yahr Stage 5",
    secondaryDx: 'Parkinson's disease dementia, dysphagia with aspiration risk, recurrent aspiration pneumonia, orthostatic hypotension, urinary retention, constipation',
    tagline: "77M · Advanced Parkinson's disease · Home",
    color: '#4a7a6a',
    documents: [
      {
        id: 'hn-neuro',
        type: 'Specialist Note',
        date: '12/18/2025',
        content: `NEUROLOGY NOTE - HN, 12/18/2025
HN is a 77-year-old male with advanced Parkinson's disease with dementia (PDD), Hoehn & Yahr Stage 5. Diagnosed with PD 14 years ago, dementia component emerged approximately 4 years ago.
Current status: Bedbound — unable to sit unsupported. Anarthric — vocalizes occasionally but no intelligible speech. Dysphagia requiring pureed diet and thickened liquids; aspiration pneumonia x2 this year (03/2025 and 09/2025), both requiring hospitalization.
Medications: On maximum tolerated carbidopa-levodopa — minimal benefit at this stage. Off periods no longer distinguishable from on periods.
Cognition: Severe dementia. Does not recognize wife. Inconsistently follows simple commands. Responds to familiar voices with eye opening and occasional vocalization.
Wife Elizabeth has been primary caregiver for 14 years. Now 74 years old herself, reporting significant physical and emotional exhaustion. Requesting respite care options.
Assessment: Advanced PDD, Hoehn & Yahr 5, recurrent aspiration pneumonias, bedbound, anarthric. Hospice criteria clearly met. Referral placed — wife in agreement.`
      },
      {
        id: 'hn-hp',
        type: 'History & Physical',
        date: '01/04/2026',
        content: `HOSPICE ADMISSION H&P - HN, 01/04/2026
Reason for referral: Advanced PDD Hoehn & Yahr 5, bedbound, anarthric, recurrent aspiration pneumonias, dysphagia, caregiver exhaustion.
PMH: Parkinson's disease (diagnosed 2011), PD dementia (emerged 2021), dysphagia, aspiration pneumonia x2 (2025), orthostatic hypotension, urinary retention (intermittent catheterization), constipation, depression.
Meds: Carbidopa-levodopa 25/100mg q4h while awake (minimal benefit), rivastigmine 9.5mg/24h patch, quetiapine 25mg QHS (psychosis/agitation), miralax daily, docusate 100mg BID, tamsulosin 0.4mg daily, sertraline 50mg, baclofen 10mg TID (rigidity), lorazepam 0.5mg PRN agitation.
Functional: Bedbound. Total assistance all ADLs. Two-person assist for repositioning. Incontinent bowel and bladder — catheter for urinary retention.
Exam: BP 118/72 (lying), 88/54 (sitting — significant orthostasis). HR 78, RR 16, Temp 97.4F, O2 sat 94% RA. Weight 142 lbs. Appears frail. Mask-like facies. Severe rigidity all extremities. Bilateral contractures upper and lower extremities. No voluntary movement. Vocalizes with moaning. Does not follow commands. FAST 6d. PPS 30%. KPS 30%.
Wife Elizabeth (74) present and exhausted.`
      },
      {
        id: 'hn-discharge',
        type: 'Discharge Summary',
        date: '10/08/2025',
        content: `DISCHARGE SUMMARY - HN, 10/08/2025
Admission: 09/28/2025 | Discharge: 10/08/2025
Principal Dx: Aspiration pneumonia, right lower lobe
Hospital course: 77M with advanced PDD presenting with fever, increased secretions, and worsening hypoxemia. CXR confirmed right lower lobe infiltrate consistent with aspiration pneumonia — second episode this year (prior 03/2025). IV piperacillin-tazobactam x7 days with clinical improvement. O2 requirement resolved. Speech pathology consulted — confirmed aspiration risk, recommended pureed diet and honey-thick liquids. PEG tube discussed with wife — declined. Wife states patient had previously expressed he would not want a feeding tube.
Goals of care revisited: Wife Elizabeth declining PEG, declining further hospitalizations if possible. Hospice evaluation recommended. Wife agreeable.
Discharge: Home with wife. Speech pathology diet recommendations in place. Hospice referral initiated.`
      },
      {
        id: 'hn-speech',
        type: 'Specialist Note',
        date: '10/06/2025',
        content: `SPEECH-LANGUAGE PATHOLOGY NOTE - HN, 10/06/2025 (Inpatient)
Swallowing evaluation: Clinical bedside swallowing evaluation performed. Patient unable to follow commands or cooperate with formal MBSS.
Observations: Reduced oral muscle tone and coordination. Delayed swallow initiation. Wet/gurgly vocal quality post-swallow (indicating pooling/aspiration). Coughing with all liquid consistencies trialed.
Recommendations: Pureed solids, honey-thick liquids only. Small bites, slow feeding pace, upright positioning 90 degrees during and 30 minutes after eating.
PEG tube: Discussed with wife Elizabeth as option to reduce aspiration risk and ensure nutrition. Wife declines on behalf of patient — states he had expressed he would not want a feeding tube. This decision is documented and respected.
Prognosis for swallowing: Poor — progressive neurological disease, no recovery expected. Continued aspiration risk despite dietary modifications. Family counseled on aspiration pneumonia risk and signs to monitor.
Wife educated on safe feeding techniques — demonstrated understanding.`
      },
      {
        id: 'hn-labs',
        type: 'Lab Results',
        date: '01/03/2026',
        content: `LABS - HN, 01/03/2026
CBC: WBC 7.4, Hgb 11.2 g/dL (L), Hct 34.6% (L), Platelets 212
CMP: Na 136, K 4.4, Cr 1.2, eGFR 58, Albumin 3.0 g/dL (L), Glucose 104
LFTs: Within normal limits
Thyroid: TSH 3.2 (normal)
Urinalysis: Clear, no evidence of UTI (catheter in place)
Note: Albumin 3.0 reflects nutritional compromise in context of dysphagia and reduced oral intake.`
      },
      {
        id: 'hn-caregiver',
        type: 'Palliative Care Note',
        date: '01/05/2026',
        content: `PALLIATIVE CARE / CAREGIVER SUPPORT NOTE - HN, 01/05/2026
Participants: Wife Elizabeth, social worker, hospice RN.
Caregiver assessment: Elizabeth (74) has been primary caregiver for 14 years, now providing 24-hour care to a bedbound, anarthric husband requiring two-person assists. Zarit Burden Scale score 52 (severe burden). Reports back pain from transfers, sleep deprivation, social isolation, and grief.
Elizabeth states: she loves her husband and wants him home but she is exhausted and afraid she cannot keep doing this alone.
Respite plan: Hospice aide 5 days per week for personal care. Volunteer visitors twice weekly for caregiver respite. Inpatient respite care discussed — Elizabeth agreeable to 5-day respite stay if needed.
Goals of care: DNR/DNI confirmed. No hospitalization (Elizabeth adamant — twice hospitalized this year and he comes home worse). No PEG — patient had expressed this wish previously. Comfort-focused care. Elizabeth is healthcare proxy.
Chaplaincy: Elizabeth accepted chaplain visit — states her faith is important to her and she needs spiritual support.
Social work follow-up: Weekly check-in calls. Community resources for caregiver support connected.`
      },
    ],
    encounter: `Patient HN, 77-year-old male, admitted to hospice today at home. Wife Elizabeth (74) present throughout admission — appeared exhausted and tearful but expressed deep relief at having formal support in place.

On arrival patient is in hospital bed in living room, bedbound. Eyes open intermittently. Does not follow commands. Vocalizes occasionally with moaning. Responds to wife's voice with eye opening and increased vocalization.

Neurological: Advanced PDD. Severe mask-like facies. No voluntary movement. Anarthric. Does not recognize wife consistently. FAST 6d.

Motor: Severe rigidity all extremities. Bilateral upper and lower extremity contractures. Bedbound — unable to reposition self. Requires two-person assist for all repositioning and transfers.

Respiratory: O2 sat 94% room air. RR 16. Coarse breath sounds bilateral bases — secretions. Has had two aspiration pneumonia hospitalizations this year.

Nutrition: On pureed diet and honey-thick liquids per speech pathology. Wife feeding at all meals — takes approximately 45 minutes per meal, eating 50-60% of offered food. PEG tube declined by wife on patient's behalf per prior expressed wishes. Weight 142 lbs.

Skin: Intact. No pressure injuries at this time. Repositioning q2h being performed by Elizabeth alone — expressing back pain from this.

Continence: Incontinent bowel and bladder. Foley catheter in place for urinary retention. Last BM yesterday — on bowel regimen.

Caregiver: Wife Elizabeth 74 years old, sole caregiver x14 years. Visibly exhausted. Back pain from transfers. Sleep-deprived. Accepted all hospice support services eagerly.

Goals of care: DNR/DNI confirmed. No hospitalization. No PEG. Comfort-focused care. Elizabeth is healthcare proxy, fully aligned.

PPS 30%. KPS 30%. Weight 142 lbs.`
  },
};

export const PATIENT_LIST = ['gd', 'lm', 'tr', 'rb', 'mc', 'wk', 'ph', 'ef', 'dv', 'hn'];
