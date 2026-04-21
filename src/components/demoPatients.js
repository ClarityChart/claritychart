export const DEMO_PATIENTS = {
  gd: {
    id: 'gd',
    name: 'GD',
    age: 100,
    sex: 'Female',
    diagnosis: 'Chronic diastolic heart failure (HFpEF), end-stage',
    secondaryDx: 'CKD stage 4 (eGFR 20-27), Type 2 diabetes mellitus, hypertension, peripheral vascular disease, prior CVA, anemia of chronic disease',
    tagline: '100F · End-stage HFpEF · SNF',
    color: '#c4a882',
    snapshot: 'NT-proBNP 8,292 · 2 hospitalizations in 3 weeks · PPS 30%',
    documents: [
      {
        id: 'gd-discharge1',
        type: 'Discharge Summary',
        date: '02/06/2026',
        content: `DISCHARGE SUMMARY
Patient: GD | DOB: 02/14/1926 | Age: 100 | MRN: [REDACTED]
Admission Date: 01/26/2026 | Discharge Date: 02/06/2026
Attending Physician: [REDACTED], MD
Admitting Diagnosis: Acute decompensated heart failure
Principal Discharge Diagnosis: Acute decompensated heart failure, HFpEF, NYHA Class IV
Secondary Diagnoses: CKD stage 4 (baseline eGFR 20-27), Type 2 diabetes mellitus insulin-dependent, hypertension, peripheral vascular disease, remote CVA, anemia of chronic disease

REASON FOR ADMISSION:
100-year-old female with known HFpEF presenting with 2-week history of progressive dyspnea, orthopnea requiring 3 pillows, and bilateral lower extremity edema. Family reports she has been unable to ambulate more than a few steps without severe dyspnea. She has had markedly decreased oral intake and has lost approximately 6 pounds over the past 2 weeks per family report.

HISTORY OF PRESENT ILLNESS:
Patient was in her usual state of health until approximately 2 weeks prior to admission when she developed worsening shortness of breath. Her primary care physician increased her furosemide dose from 40mg daily to 80mg daily without adequate response. She presented to the emergency department via EMS after family noted she was unable to complete a sentence without stopping to breathe. On arrival, oxygen saturation was 84% on room air, improving to 94% on 4L nasal cannula. She was in moderate respiratory distress with audible crackles bilaterally.

PHYSICAL EXAMINATION ON ADMISSION:
Vital Signs: BP 158/92, HR 94 irregular, RR 24, Temp 97.8F, O2 Sat 84% RA (94% on 4L NC)
Weight: 118 lbs (dry weight estimated 110 lbs per prior records)
General: Elderly female in moderate respiratory distress, using accessory muscles, unable to complete full sentences
HEENT: Jugular venous distension visible at 45 degrees, approximately 12 cm
Cardiovascular: Irregular rate and rhythm, S3 gallop present, no murmurs appreciated, peripheral pulses diminished bilaterally
Respiratory: Bilateral basilar crackles extending to mid-lung fields, mild expiratory wheeze
Abdomen: Soft, mild hepatomegaly, no ascites
Extremities: 3+ pitting edema bilateral lower extremities to the knees, skin intact, chronic venous stasis changes bilateral

DIAGNOSTIC RESULTS ON ADMISSION:
NT-proBNP: 8,292 pg/mL (markedly elevated)
Echocardiogram: EF 58% (preserved), Grade II diastolic dysfunction, moderate mitral regurgitation, estimated RVSP 42 mmHg, moderate left atrial enlargement
CXR: Cardiomegaly, bilateral interstitial edema, small bilateral pleural effusions
ECG: Atrial fibrillation with controlled ventricular rate, no acute ST changes
Creatinine: 2.4 mg/dL (baseline 1.8-2.0), BUN 48
Troponin I: 0.06 ng/mL (mildly elevated, trend stable)
Hemoglobin: 9.4 g/dL, Hematocrit: 29.2%
Sodium: 136, Potassium: 4.2, CO2: 22
Glucose: 168, HbA1c: 7.8%
Albumin: 2.6 g/dL

HOSPITAL COURSE:
Patient was admitted to the telemetry unit and placed on continuous monitoring. She was started on IV furosemide 80mg BID with good initial diuretic response, losing approximately 3 liters of fluid over the first 48 hours. Her oxygen requirement improved from 4L NC to 2L NC. Nephrology was consulted given CKD stage 4 with acute-on-chronic kidney injury; creatinine peaked at 2.9 mg/dL on hospital day 3 before stabilizing at 2.6 mg/dL at discharge. Aggressive diuresis was limited by renal function. Cardiomegaly was unable to be further optimized given CKD limiting ACE inhibitor/ARB use and hypotension limiting beta-blocker uptitration. Endocrinology was consulted for diabetes management; insulin regimen was adjusted. Palliative care was consulted on hospital day 6 given overall trajectory and family concerns about prognosis and goals of care. Goals of care discussion held with patient and daughter; patient expressed desire for comfort-focused care and desire to avoid repeated hospitalizations. DNR/DNI status confirmed. POLST updated.

FUNCTIONAL STATUS:
Patient required maximum assistance for all ADLs throughout hospitalization. She was evaluated by physical therapy who noted significant deconditioning. Patient was unable to safely ambulate and was discharged to SNF for skilled nursing and therapy. Prior to this hospitalization, family reports she was living at home with daughter providing assistance with meals and medications; she was able to ambulate short distances with a walker.

DISCHARGE CONDITION: Stable but guarded. Volume status improved but not at dry weight. Renal function stabilized.
DISCHARGE DISPOSITION: Skilled nursing facility

DISCHARGE MEDICATIONS:
- Furosemide 80mg BID (increased from 40mg daily)
- Metoprolol succinate 25mg daily (held during hospitalization, restarted at lower dose)
- Lisinopril HELD (CKD, creatinine elevation)
- Insulin glargine 10 units QHS
- Insulin lispro sliding scale with meals
- Aspirin 81mg daily
- Amlodipine 5mg daily
- Atorvastatin 40mg daily
- Pantoprazole 40mg daily

FOLLOW-UP: Primary care within 1 week, Cardiology within 2 weeks
WEIGHT MONITORING: Daily weights, call if gain >2 lbs in 24 hours or >4 lbs in 72 hours
FLUID RESTRICTION: 1.5 liters daily
SODIUM RESTRICTION: <2g daily`
      },
      {
        id: 'gd-discharge2',
        type: 'Discharge Summary',
        date: '02/24/2026',
        content: `DISCHARGE SUMMARY — SECOND ADMISSION
Patient: GD | DOB: 02/14/1926 | Age: 100
Admission Date: 02/16/2026 | Discharge Date: 02/24/2026
Attending Physician: [REDACTED], MD
Principal Diagnosis: Acute decompensated heart failure, second admission in 3 weeks
Secondary Diagnoses: HFpEF, CKD stage 4, Type 2 diabetes mellitus, hypertension, PVD, anemia of chronic disease

REASON FOR ADMISSION:
Patient was readmitted from SNF 10 days after prior discharge with recurrent volume overload. SNF nursing noted she had gained 6 pounds over 5 days despite compliance with fluid restriction. She developed worsening dyspnea at rest, inability to tolerate supine position, and increasing bilateral lower extremity edema. SNF physician increased furosemide to 120mg BID without response prior to transfer.

PHYSICAL EXAMINATION ON ADMISSION:
Vital Signs: BP 148/86, HR 88 irregular, RR 22, Temp 97.6F, O2 Sat 88% RA (93% on 3L NC)
Weight: 122 lbs (up 12 lbs from estimated dry weight of 110 lbs)
General: Frail elderly female in moderate distress, orthopneic, markedly deconditioned
Cardiovascular: Irregular, JVD elevated, S3 present
Respiratory: Bilateral crackles to upper lung fields bilaterally, decreased breath sounds at bases
Extremities: 3+ pitting edema to mid-thigh bilaterally, skin fragile with early weeping changes right lower leg

DIAGNOSTIC RESULTS:
NT-proBNP: 12,480 pg/mL (significantly elevated above prior admission)
Creatinine: 2.8 mg/dL (above prior discharge value of 2.6)
BUN: 56
Sodium: 134 (L)
Potassium: 4.6
Hemoglobin: 8.8 g/dL (decreased from 9.4 at prior admission)
Albumin: 2.3 g/dL (decreased from 2.6)
Glucose: 198
CXR: Worsening cardiomegaly, bilateral pleural effusions larger than prior, pulmonary vascular congestion

HOSPITAL COURSE:
Patient was admitted to telemetry. IV furosemide 100mg BID initiated. Nephrology consulted again given worsening renal function limiting diuresis. Creatinine peaked at 3.2 on hospital day 2. Diuretic dose was decreased to 80mg BID after creatinine rise. Net fluid removal over hospitalization was approximately 4 liters, with improvement in respiratory status but patient not reaching dry weight given renal limitations. Cardiology evaluated and noted that patient's HFpEF with CKD stage 4 represents a clinical scenario where standard heart failure therapies are significantly limited and prognosis is poor. Palliative care re-engaged. Extended family meeting held on hospital day 6 with patient, daughter, and son present. Patient and family elected to transition to hospice care with comfort-focused goals. DNR/DNI confirmed. POLST updated to reflect no hospitalization preference.

FUNCTIONAL STATUS AT DISCHARGE:
Total assistance required for all ADLs. Non-ambulatory. New urinary incontinence since prior hospitalization. Patient alert and able to participate in goals of care discussion but fatigued easily.

DISCHARGE TO: Hospice evaluation arranged. Patient returning to SNF with hospice referral in place.
PROGNOSIS: Poor. Cardiologist documents estimated prognosis of weeks to months given recurrent decompensations, CKD limiting optimization, and overall functional decline.

DISCHARGE MEDICATIONS:
- Furosemide 80mg BID (for comfort/symptom management)
- Metoprolol succinate 25mg daily
- Insulin glargine 10 units QHS
- Insulin lispro sliding scale
- Amlodipine 5mg daily
- Morphine sulfate 2mg q4h PRN dyspnea (new)
- Lorazepam 0.5mg q6h PRN anxiety/dyspnea (new)
- Pantoprazole 40mg daily
- All other medications discontinued per goals of care`
      },
      {
        id: 'gd-hp',
        type: 'History & Physical',
        date: '01/26/2026',
        content: `HISTORY AND PHYSICAL
Patient: GD | Age: 100 | Sex: Female
Date: 01/26/2026
Admitting Physician: [REDACTED], MD

CHIEF COMPLAINT: Shortness of breath, lower extremity swelling

HISTORY OF PRESENT ILLNESS:
GD is a 100-year-old female with a complex medical history significant for chronic diastolic heart failure (HFpEF) with preserved ejection fraction, CKD stage 4, type 2 diabetes mellitus, hypertension, peripheral vascular disease, remote CVA, and anemia of chronic disease who presents with acute decompensated heart failure. She was previously living at home with her daughter providing assistance. Over the past 2 weeks she has experienced progressive worsening of her baseline dyspnea, now present at rest, with orthopnea requiring 3 pillows to sleep. She reports paroxysmal nocturnal dyspnea on 2 occasions this week. Lower extremity edema has worsened from baseline 1+ to 3+ per daughter's report. She has had decreased appetite and oral intake for approximately 10 days. Daughter brought her to the ED today after noting she was unable to complete a sentence without stopping to catch her breath. She denies chest pain, palpitations, fever, or cough productive of purulent sputum. Her primary care physician had increased furosemide from 40mg to 80mg daily 5 days ago without adequate response.

PAST MEDICAL HISTORY:
1. Chronic diastolic heart failure (HFpEF) — diagnosed 2018, EF 55-60%, NYHA Class III-IV at baseline
2. CKD stage 4 — baseline eGFR 20-27, etiology presumed hypertensive/diabetic nephropathy
3. Type 2 diabetes mellitus — insulin-dependent, HbA1c 7.8% (3 months ago)
4. Hypertension — poorly controlled on current regimen
5. Peripheral vascular disease — bilateral lower extremity, ABI 0.72 right, 0.68 left (2023)
6. CVA — remote (2019), no residual deficits per family
7. Atrial fibrillation — rate controlled
8. Anemia of chronic disease — baseline Hgb 9-10 g/dL
9. Chronic venous stasis — bilateral lower extremities with stasis dermatitis

SURGICAL HISTORY:
- Cataract surgery bilateral (year unknown)
- No cardiac procedures

MEDICATIONS ON ADMISSION:
- Furosemide 80mg daily (recently increased from 40mg)
- Metoprolol succinate 50mg daily
- Lisinopril 5mg daily
- Insulin glargine 12 units QHS
- Insulin lispro sliding scale TID with meals
- Aspirin 81mg daily
- Amlodipine 5mg daily
- Atorvastatin 40mg daily
- Pantoprazole 40mg daily
- Calcium carbonate 500mg BID

ALLERGIES: NKDA

FAMILY HISTORY: Mother with "heart problems," father deceased, cause unknown. Brother with diabetes.

SOCIAL HISTORY:
- Lives at home with daughter
- Former smoker, quit 1967 (approximately 15 pack-year history)
- No alcohol use
- No illicit drug use
- Retired seamstress

REVIEW OF SYSTEMS:
Positive: Dyspnea at rest and exertion, orthopnea, PND, bilateral lower extremity edema, fatigue, decreased appetite, decreased oral intake, weight gain
Negative: Chest pain, palpitations, fever, chills, cough, hemoptysis, nausea, vomiting, diarrhea, constipation, dysuria, hematuria, syncope, falls

PHYSICAL EXAMINATION:
Vital Signs: BP 158/92 mmHg, HR 94 beats/min (irregular), RR 24 breaths/min, Temp 97.8°F, O2 Sat 84% RA → 94% on 4L NC
Weight: 118 lbs | Height: 5'0" | BMI: 23.0

General: Elderly female in moderate respiratory distress. Alert and oriented x3. Able to speak in short phrases only. Appears stated age or older.
HEENT: Normocephalic, atraumatic. Pupils equal and reactive. Sclerae anicteric. JVD visible at 45 degrees, estimated 12 cm. Mucous membranes moist.
Cardiovascular: Irregular rate and rhythm. S1, S2 present. S3 gallop audible. No murmurs. PMI not displaced. Peripheral pulses 1+ bilateral lower extremities, 2+ bilateral upper extremities.
Respiratory: Moderate use of accessory muscles. Bilateral crackles from bases to mid-lung fields. No wheeze. No rub.
Abdomen: Soft. Mild hepatomegaly — liver palpable 3 cm below right costal margin. No splenomegaly. No ascites by exam. Bowel sounds present.
Extremities: 3+ pitting edema bilateral lower extremities to knees. Chronic stasis dermatitis changes bilateral. Skin intact. No ulceration. Feet cool to touch.
Neurological: Alert and oriented. Follows commands. Cranial nerves II-XII grossly intact. No focal deficits appreciated.
Skin: Pale, warm centrally. No rashes. No jaundice.

ASSESSMENT AND PLAN:
100-year-old female with HFpEF presenting with acute decompensation in the setting of volume overload. CKD stage 4 significantly limits diuretic titration and standard heart failure therapies. Given her age, multiple comorbidities, and trajectory, prognosis is guarded.

1. Acute decompensated HFpEF: IV furosemide 80mg BID. Daily weights. Strict I&Os. Telemetry monitoring. Cardiology consult placed. Fluid restriction 1.5L/day. Sodium restriction <2g/day.
2. CKD stage 4, acute-on-chronic: Nephrology consult. Monitor creatinine daily. Avoid nephrotoxins. Hold lisinopril.
3. Atrial fibrillation: Rate controlled. Continue metoprolol.
4. Type 2 DM: Endocrinology consult. Hold metformin (CKD). Insulin sliding scale.
5. Anemia: Monitor. No transfusion unless symptomatic.
6. Goals of care: Palliative care consult given trajectory and family concerns.`
      },
      {
        id: 'gd-palliative',
        type: 'Palliative Care Note',
        date: '02/03/2026',
        content: `PALLIATIVE CARE CONSULTATION NOTE
Patient: GD | Age: 100 | Date: 02/03/2026
Consulting Service: Palliative Care
Reason for Consult: Goals of care discussion, prognosis counseling, symptom management for end-stage HFpEF

REASON FOR CONSULTATION:
Patient is a 100-year-old female admitted with acute decompensated HFpEF, her second hospitalization in recent months. Cardiology and primary team have expressed concern that further optimization of heart failure therapy is limited by CKD stage 4, and that patient has poor prognosis. Palliative care consulted to assist with goals of care conversation and advance care planning.

CONSULTATION ASSESSMENT:
I interviewed the patient and her daughter, [REDACTED], who serves as healthcare proxy. Patient is alert, oriented to person and place, intermittently oriented to year. She is fatigued but participatory in the discussion. She was able to clearly express her values and preferences when asked directly.

PATIENT'S UNDERSTANDING OF ILLNESS:
Patient states she knows she has "a bad heart" and that her kidneys "don't work right either." When asked what she understands about her prognosis, she said "I know I'm not getting better. I'm 100 years old." She expressed that she has had a good life and does not wish to suffer. She is not afraid of death but is fearful of being in distress or pain.

PATIENT'S VALUES AND PRIORITIES:
- Wants to be comfortable and free of pain and breathlessness
- Does not want to be on machines or have her heart restarted
- Wants to be with family, preferably at home or "somewhere comfortable, not a hospital"
- Values being able to recognize her family members and participate in conversations, even briefly
- Does not wish to pursue aggressive interventions that would require prolonged hospitalization

GOALS OF CARE DISCUSSION:
Extensive discussion held with patient and daughter regarding the nature of end-stage heart failure, the limitations of further medical intervention given CKD, and the trajectory of her illness. Discussed that each hospitalization is becoming more difficult to recover from and that the underlying disease will continue to progress. Discussed the concept of hospice care as a way to focus on quality of life, comfort, and support for both patient and family. Patient and daughter expressed understanding and agreement with transitioning to comfort-focused care.

ADVANCE DIRECTIVES:
DNR/DNI confirmed — patient states clearly she does not want CPR or intubation.
POLST: Updated today. Reflects DNR status, no hospitalization preference, comfort-focused measures only. Daughter confirmed as healthcare proxy.

SYMPTOM MANAGEMENT RECOMMENDATIONS:
1. Dyspnea: Low-dose morphine 2mg PO/SL q4h PRN dyspnea. Consider scheduled dosing if dyspnea becomes continuous.
2. Anxiety: Lorazepam 0.5mg q6h PRN for anxiety or air hunger.
3. Continue furosemide for comfort (edema relief, dyspnea management) even in hospice setting.
4. Continue amlodipine for hypertension management.
5. Simplify medication regimen — discontinue statin, aspirin, lisinopril per goals of care.

HOSPICE REFERRAL:
Hospice referral placed today. Patient and daughter educated on what hospice provides. Daughter tearful but expressed relief that "she won't have to fight anymore."

PROGNOSIS:
Given recurrent decompensations of HFpEF with CKD stage 4, inability to optimize standard therapies, functional decline, and nutritional compromise (albumin 2.3), prognosis is estimated at weeks to months. Patient meets criteria for hospice enrollment based on NT-proBNP >2,000, recurrent hospitalizations, functional decline, and renal failure limiting optimization.

PLAN:
- Hospice referral in place
- Comfort-focused medications ordered
- Family support services offered
- Chaplaincy consult offered — daughter declined at this time
- Social work referral placed for discharge planning`
      },
      {
        id: 'gd-vascular',
        type: 'Specialist Note',
        date: '01/08/2026',
        content: `VASCULAR SURGERY CONSULTATION NOTE
Patient: GD | Age: 100 | Date: 01/08/2026
Requesting Service: Primary Care
Reason for Consult: Non-healing right lateral ankle wound, peripheral vascular disease evaluation

HISTORY:
100-year-old female with known peripheral vascular disease referred for evaluation of non-healing wound right lateral ankle present for approximately 6 weeks. Patient reports wound developed after minor trauma (bumped ankle on bed frame). She has a history of bilateral lower extremity edema and chronic venous stasis. She reports the wound has not improved despite local wound care by her primary care physician. She denies fever or increasing redness. She notes the foot is chronically cool.

PHYSICAL EXAMINATION:
Right lower extremity: Chronic stasis dermatitis changes with hyperpigmentation and mild induration of the gaiter area bilaterally. Right lateral ankle: Wound measuring 2.1 cm x 1.8 cm x 0.3 cm depth. Wound bed: Approximately 60% granulation tissue, 40% slough. Periwound: Mild erythema, no fluctuance, no purulence, no crepitus. No odor. Minimal serosanguineous exudate. Surrounding skin: Fragile, stasis dermatitis changes.
Pulses: Right femoral 2+, right popliteal 1+ (diminished), right dorsalis pedis non-palpable by exam, right posterior tibial trace. Left similar.
Doppler: Right ABI 0.62. Left ABI 0.71. Both consistent with moderate peripheral arterial disease.
Sensation: Diminished to light touch bilateral feet.
Temperature: Feet cool bilaterally, right worse than left.

DIAGNOSTIC RESULTS:
Wound culture obtained — results pending.

IMPRESSION:
1. Non-healing right lateral ankle wound consistent with mixed venous/arterial ulceration in the setting of bilateral PVD (ABI 0.62 right) and chronic venous insufficiency.
2. Moderate peripheral arterial disease bilateral lower extremities, right greater than left.
3. Not a candidate for revascularization given overall medical status, age, and ABI values not in the critical ischemia range.

RECOMMENDATIONS:
1. Conservative wound care: Wound cleansing with normal saline, application of non-adherent dressing, foam dressing for absorption. Change every 2-3 days or as needed.
2. Compression therapy is CONTRAINDICATED given ABI <0.8 — would worsen arterial flow.
3. Leg elevation when possible to reduce venous component.
4. Monitor wound for signs of infection — if purulence develops or cellulitis extends, will reassess.
5. Given patient's overall medical status and prognosis, wound healing is unlikely. Goal is wound stabilization and comfort.
6. Will defer to primary team regarding overall goals of care given patient's age and comorbidities.
7. Follow-up: As needed if wound status changes significantly.

NOTE: Given patient's complex medical situation and goals of care discussions ongoing, aggressive wound intervention is not appropriate. Focus on comfort and prevention of wound deterioration.`
      },
      {
        id: 'gd-wound',
        type: 'Wound Care Note',
        date: '02/10/2026',
        content: `WOUND CARE NOTE — SNF
Patient: GD | Date: 02/10/2026
Wound Care Nurse: [REDACTED], RN, CWCN

WOUND ASSESSMENT:
Location: Right lateral ankle
Wound Classification: Mixed venous/arterial ulceration
Duration: Approximately 8 weeks

WOUND MEASUREMENTS:
Length: 2.2 cm | Width: 1.9 cm | Depth: 0.4 cm
Tunneling: None
Undermining: None

WOUND BED:
Granulation tissue: 55%
Slough: 35%
Necrotic tissue: 10% (small area of eschar at wound margin)
Epithelialization: Minimal at wound edges

PERIWOUND TISSUE:
Color: Mild erythema, extending approximately 0.5 cm from wound edge
Temperature: Slightly warm to touch
Edema: 2+ pitting edema of right lower extremity to knee
Skin integrity: Fragile skin with chronic stasis dermatitis changes, hemosiderin staining noted
Maceration: None

WOUND DRAINAGE:
Amount: Minimal
Type: Serosanguineous
Odor: None

PAIN ASSESSMENT:
Patient rates wound pain as 3/10 at rest, 6/10 with dressing change. Pre-medicated with acetaminophen 650mg 30 minutes prior to dressing change.

INFECTION ASSESSMENT:
No signs of clinical infection: no purulence, no odor, no significant surrounding erythema, no crepitus, no fever. Wound culture from 01/08/2026 grew coagulase-negative Staphylococcus — considered colonizer, not treated.

CURRENT TREATMENT:
1. Wound cleansed with sterile normal saline via 35mL syringe, 19g angiocath — irrigation pressure adequate
2. Slough gently removed with moistened gauze — patient tolerated with mild discomfort
3. Thin layer of silver sulfadiazine cream applied to wound base (antimicrobial protection)
4. Non-adherent silicone contact layer applied
5. Foam dressing applied for absorption
6. Secured with paper tape — note skin fragility, avoiding adhesive on periwound skin
7. Heel offloading: Heel positioned off mattress with pillow placed under calf

NUTRITIONAL STATUS:
Albumin 2.3 g/dL (from 02/03/2026 labs). Wound nurse notified dietitian of impaired healing potential related to hypoalbuminemia. Oral supplement with Wound Healing Formula ordered — patient taking approximately 50% per nursing staff.

NOTES ON HEALING POTENTIAL:
Wound healing is significantly impaired by: peripheral arterial disease (ABI 0.62), hypoalbuminemia (2.3 g/dL), bilateral lower extremity edema, advanced age, and overall debilitated state. Goals are wound stabilization, infection prevention, and comfort. Complete wound healing is not an expected outcome given clinical context. Patient and family aware.

PLAN:
- Continue current wound care regimen every 2-3 days
- Monitor for signs of infection — increase care frequency if infection develops
- Continue nutritional supplementation
- Re-evaluate in 1 week
- Notify MD if wound deteriorates significantly, signs of infection develop, or patient reports increased pain`
      },
      {
        id: 'gd-labs',
        type: 'Lab Results',
        date: '02/14/2026',
        content: `LABORATORY RESULTS
Patient: GD | Date of Collection: 02/14/2026
Ordering Provider: [REDACTED], MD

COMPLETE BLOOD COUNT:
WBC: 7.2 K/uL (normal 4.5-11.0)
RBC: 3.1 M/uL (L) (normal 3.9-5.2)
Hemoglobin: 9.1 g/dL (L) (normal 12.0-16.0)
Hematocrit: 28.4% (L) (normal 36.0-46.0)
MCV: 91.6 fL (normal 80-100)
MCH: 29.4 pg (normal 27-33)
MCHC: 32.1 g/dL (normal 31.5-35.7)
RDW: 15.2% (H) (normal 11.5-14.5)
Platelets: 198 K/uL (normal 150-400)

COMPREHENSIVE METABOLIC PANEL:
Sodium: 138 mEq/L (normal 136-145)
Potassium: 4.8 mEq/L (normal 3.5-5.1) — borderline high, monitor
Chloride: 102 mEq/L (normal 98-107)
CO2: 21 mEq/L (L) (normal 22-29) — mild metabolic acidosis
Anion Gap: 15 (normal 8-16)
BUN: 52 mg/dL (H) (normal 7-25)
Creatinine: 2.6 mg/dL (H) (normal 0.6-1.1) — stable from prior, baseline 1.8-2.0
eGFR: 22 mL/min/1.73m2 (H) — CKD stage 4
Glucose: 142 mg/dL (H) (normal 70-100)
Calcium: 8.6 mg/dL (normal 8.5-10.2)
Total Protein: 5.8 g/dL (L) (normal 6.3-8.2)
Albumin: 2.8 g/dL (L) (normal 3.5-5.0) — significant hypoalbuminemia
Total Bilirubin: 0.8 mg/dL (normal 0.2-1.2)
AST: 28 U/L (normal 10-40)
ALT: 22 U/L (normal 7-56)
Alkaline Phosphatase: 82 U/L (normal 44-147)

CARDIAC MARKERS:
NT-proBNP: 8,292 pg/mL (H) — critical value (normal <125 pg/mL for age <75; markedly elevated, consistent with severe heart failure)
Troponin I: 0.04 ng/mL (borderline) (normal <0.04) — stable trend, no acute myocardial injury

ADDITIONAL LABS:
HbA1c: 7.4% (above goal of <7.0% for age)
Iron: 42 ug/dL (L) (normal 60-170)
TIBC: 248 ug/dL (normal 250-370)
Ferritin: 142 ng/mL (normal 12-150)
Transferrin Saturation: 17% (low-normal) — mixed anemia picture (anemia of chronic disease with iron deficiency component)
Prealbumin: 9.2 mg/dL (L) (normal 17-40) — severely reduced, poor nutritional status and prognosis marker

URINALYSIS:
Color: Yellow, clear
Specific Gravity: 1.018
pH: 5.5
Protein: 2+ (abnormal) — consistent with known CKD/proteinuria
Glucose: 1+ (abnormal) — consistent with diabetes
Ketones: Negative
Blood: Negative
Leukocyte Esterase: Negative
Nitrites: Negative
WBC: 2-5/HPF (normal)
RBC: 0-2/HPF (normal)
Casts: Occasional granular casts (consistent with CKD)

PROVIDER NOTES:
NT-proBNP of 8,292 is markedly elevated and consistent with severe decompensated heart failure. Per current HF LCD criteria, NT-proBNP >2,000 pg/mL in the setting of recurrent hospitalizations and functional decline supports hospice eligibility. Hypoalbuminemia and low prealbumin indicate poor nutritional status with impaired synthetic function and poor healing potential. CKD stage 4 (eGFR 22) limits optimization of standard heart failure therapies.`
      },
    ],
    encounter: `Patient GD, 100-year-old female, admitted to hospice today from skilled nursing facility following two hospitalizations in three weeks for decompensated heart failure. Daughter present throughout admission visit.

On arrival patient is in hospital bed in SNF room, head of bed elevated 45 degrees. She is awake but appears tired and frail. States she is "so tired of going back and forth to the hospital." She is oriented to person and place but not date. Speech is soft, brief sentences.

Respiratory: Respiratory rate 22-24 breaths per minute. O2 saturation 91% on room air. Audible crackles bilateral lung bases on auscultation. Patient more comfortable upright. Denies acute dyspnea at rest today but reports shortness of breath with any activity, including talking for extended periods.

Cardiovascular: Heart rate 88 irregular. 2+ bilateral lower extremity pitting edema to knees. Right lateral ankle wound with foam dressing in place, wound care completed by SNF 2 days ago per nursing staff.

Nutrition and hydration: Eating approximately 20-25% of meals per SNF nursing. Refused most food for past week. Daughter reports she was eating well before these hospitalizations. Weight today 112 lbs per SNF scale — down approximately 6 pounds from estimated dry weight per last hospitalization record. Appears cachectic with visible temporal and facial wasting.

Functional status: Total assist for bathing, dressing, grooming, and transfers. Cannot ambulate. Continent of bowel but new urinary incontinence since second hospitalization. Prior to these hospitalizations, daughter reports patient could walk short distances with walker and needed only minimal assistance with ADLs.

Cognition: Alert. Oriented to person and place. Able to follow conversation and express her wishes. Not oriented to date or year. No acute confusion.

Skin: Right lateral ankle wound as noted above. Bilateral stasis changes. No other pressure injuries or wounds. Skin fragile throughout.

Goals of care: Patient and daughter both clearly understand and accept hospice enrollment. DNR/DNI confirmed. POLST updated. Patient states she does not want to go back to the hospital. Daughter is healthcare proxy and fully aligned with comfort-focused goals. Both understand hospice philosophy.

FAST 6c. PPS 30%. KPS 30%. Weight 112 lbs.`,
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
    snapshot: 'FAST 6e · 2 falls this period · MAC declining · Stage 1 sacral wound',
    documents: [
      {
        id: 'lm-hp',
        type: 'History & Physical',
        date: '01/08/2026',
        content: `HISTORY AND PHYSICAL
Patient: LM | Age: 82 | Sex: Female | DOB: [REDACTED]
Date: 01/08/2026
Admitting Provider: [REDACTED], MD
Setting: Memory Care Facility — Hospice Admission H&P

REASON FOR VISIT:
Hospice intake evaluation for 82-year-old female with end-stage Alzheimer's dementia with vascular dementia referred by primary care physician following progressive cognitive and functional decline, caregiver concerns regarding safety and quality of life, and family request for comfort-focused care.

HISTORY OF PRESENT ILLNESS:
LM is an 82-year-old female with a well-established diagnosis of Alzheimer's dementia (diagnosed 2019) complicated by vascular dementia (MRI 2022 demonstrating multiple lacunar infarcts). She has been residing in a memory care facility for approximately 18 months following placement from home due to safety concerns and increasing caregiver burden on her daughter Susan.

Over the past 6 months the patient has experienced significant and progressive decline across multiple domains. She has transitioned from limited verbal communication with short phrases to largely non-verbal with only occasional vocalizations and moaning. She no longer recognizes her daughter on most visits, which has been profoundly distressing to the family. She has become fully dependent for all activities of daily living including bathing, dressing, grooming, toileting, and feeding. She is wheelchair dependent and requires two-person assist for all transfers due to developing lower extremity contractures.

Nutritional decline has been notable — she now requires full feeding assistance and her meal intake has decreased to approximately 50-60% of offered meals over the past 2-3 months. She has experienced weight loss from 128 lbs to 122 lbs over the past 6 weeks. Occasional coughing with thin liquids has prompted thickened liquid orders per speech pathology recommendation.

Two falls have been documented in the current certification period: one on 11/22/2025 (found beside wheelchair, no injury) and one on 12/18/2025 (slid during transfer, bruising right forearm, X-ray negative for fracture). Sleep duration has increased to approximately 18-20 hours per day per memory care staff.

A stage 1 pressure injury to the sacrum (3 cm x 2 cm, non-blanchable erythema, skin intact) was noted on nursing assessment completed 01/10/2026. Repositioning every 2 hours has been initiated.

PAST MEDICAL HISTORY:
1. Alzheimer's dementia — diagnosed 2019, initially moderate, now end-stage
2. Vascular dementia — MRI 2022: multiple bilateral lacunar infarcts in basal ganglia and periventricular white matter, moderate cortical atrophy
3. Hypertension — on metoprolol succinate
4. Type 2 diabetes mellitus — diet-controlled, no medications required currently
5. Osteoporosis — on calcium and vitamin D supplementation
6. Right hip fracture — surgical repair 2023 (intramedullary nail), recovered to prior baseline
7. Anemia of chronic disease — baseline Hgb 10-11 g/dL
8. Prior TIA — documented 2020

SURGICAL HISTORY:
- Right hip ORIF 2023
- Appendectomy (remote, year unknown)

MEDICATIONS:
- Donepezil 10mg daily (being discontinued per neurology — no benefit at FAST 6e)
- Memantine 10mg BID (being discontinued per neurology)
- Metoprolol succinate 25mg daily
- Aspirin 81mg daily
- Calcium carbonate 500mg BID
- Vitamin D3 1000 IU daily
- Mirtazapine 7.5mg QHS (appetite stimulation and sleep)

ALLERGIES: Penicillin (rash)

SOCIAL HISTORY:
- Widowed. One daughter, Susan, who is healthcare proxy and highly involved.
- Former homemaker
- No tobacco, no alcohol
- Born in [REDACTED], lived in this area her entire life
- Speaks English only

FUNCTIONAL HISTORY (per daughter and facility staff):
- 18 months ago: Could ambulate with walker, assist with simple ADLs, recognize family, speak in sentences
- 12 months ago: Required significant ADL assistance, limited communication, knew daughter by name
- 6 months ago: Wheelchair dependent, recognized daughter inconsistently, short phrases only
- Current: Non-verbal, does not recognize daughter, fully dependent all ADLs, wheelchair dependent

PHYSICAL EXAMINATION:
Vital Signs: BP 138/82, HR 76, RR 16, Temp 97.8°F, O2 Sat 96% RA
Weight: 122 lbs (down from 124 lbs on 12/15/2025, down from 128 lbs 6 weeks ago)
Height: 5'3" | BMI: 21.5 (declining)

General: Frail elderly female seated in wheelchair. Non-verbal, eyes partially open, occasional moaning vocalization. Appears stated age or older. No acute distress. Temporal and facial wasting visible.
HEENT: Normocephalic. Eyes open intermittently. Does not track consistently. Pupils equal and reactive to light. No scleral icterus. Mouth: edentulous, oral mucosa moist.
Neck: Supple. No lymphadenopathy. No JVD.
Cardiovascular: Regular rate and rhythm. S1, S2 present. No murmurs. No edema of upper extremities. Pulses 2+ bilateral upper extremities.
Respiratory: Clear to auscultation bilaterally. No wheezes, crackles, or rhonchi. RR 16, unlabored.
Abdomen: Soft, non-tender, non-distended. Bowel sounds present all quadrants. No organomegaly.
Extremities: Bilateral lower extremity contractures — hips and knees with limited passive range of motion. No lower extremity edema. Skin intact bilateral lower extremities. No pressure injuries lower extremities.
Skin: Stage 1 pressure injury sacrum — 3 cm x 2 cm area of non-blanchable erythema, skin intact, no breakdown. Pressure-redistribution cushion in wheelchair. Mild scattered senile purpura bilateral forearms.
Neurological: Non-verbal. Does not follow commands. Does not track visually with consistency. No focal motor asymmetry appreciated. Muscle tone increased bilateral lower extremities consistent with contractures.
MAC (Mid-Arm Circumference): Left 22 cm, Right 22 cm (facility records note prior values: Left 22 cm, Right 22.5 cm — declining on right)

ASSESSMENT:
82-year-old female with end-stage Alzheimer's and vascular dementia meeting criteria for hospice enrollment. FAST stage 6e (unable to dress, bathe, toilet, ambulate; incontinence of bladder and bowel; speech limited to 6 or fewer intelligible words). PPS 40%. KPS 40%. Weight loss, nutritional decline, falls, developing pressure injury, and 18-20 hours sleep per day all consistent with hospice-appropriate trajectory. Prognosis estimated at less than 6 months.

PLAN:
Hospice enrollment proceeding. Comfort-focused care. Discontinue donepezil and memantine. Continue mirtazapine. PRN comfort medications ordered (morphine, lorazepam, haloperidol PRN agitation). Daughter Susan educated on hospice services and what to expect.`
      },
      {
        id: 'lm-neuro',
        type: 'Specialist Note',
        date: '11/14/2025',
        content: `NEUROLOGY CONSULTATION NOTE
Patient: LM | Age: 82 | Date: 11/14/2025
Consulting Neurologist: [REDACTED], MD
Reason for Consultation: Progressive dementia — follow-up, hospice suitability assessment

INTERVAL HISTORY:
LM is an 82-year-old female with Alzheimer's dementia and vascular dementia presenting for follow-up evaluation, 6 months since last neurology visit. Per daughter Susan who accompanies patient, there has been significant decline since the last visit. Patient no longer recognizes Susan on most visits — Susan reports that patient "looks right through me." Communication has declined from short 3-5 word phrases to largely non-verbal; patient occasionally vocalizes with moaning but produces no intelligible words.

Functionally, patient has become fully dependent for all ADLs over the past 4-6 months. She is wheelchair dependent and requires two-person assist for transfers. Incontinence of both bladder and bowel has developed. She sleeps approximately 18-20 hours per day.

Two falls have been documented in the past 3 months: one fall beside the wheelchair without injury on 11/22/2025 and a prior fall with bruising to the right forearm (X-ray negative).

Eating has become increasingly difficult. Patient requires full feeding assistance and her intake has decreased. She is now on thickened liquids due to coughing with thin liquids.

COGNITIVE ASSESSMENT:
Formal cognitive testing not possible — patient cannot follow instructions or participate in structured assessment.
FAST Stage: 6e (incontinent of urine and stool, speech limited to fewer than 6 intelligible words per day, requires full assistance with all ADLs)
Orientation: To self only, does not recognize daughter consistently
Communication: Non-verbal. Occasional moaning. No purposeful communication observed.
Behavioral: Appears settled today. No agitation noted during examination. Memory care staff report occasional episodes of moaning, especially at night.

NEUROLOGICAL EXAMINATION:
Motor: Bilateral lower extremity contractures noted at hips and knees. Upper extremities — mild increased tone, no focal weakness. Grip strength diminished bilaterally but symmetric.
Reflexes: Brisk bilateral lower extremity reflexes. Plantar responses: extensor bilateral (Babinski positive — consistent with upper motor neuron involvement from prior vascular events).
Cranial Nerves: Limited assessment given non-cooperation. Pupils equal and reactive. Eye movements appear intact to examiner moving into visual field. Facial symmetry intact. Swallow reflex present.
Gait: Unable to assess — wheelchair dependent.
Coordination: Unable to assess.

IMAGING REVIEW:
MRI Brain (2022 — most recent available): Moderate cortical atrophy, diffuse white matter changes, multiple bilateral lacunar infarcts in basal ganglia and periventricular white matter. No large territorial infarcts. No hemorrhage. No mass lesion. Findings consistent with combined Alzheimer's and vascular dementia.

ASSESSMENT:
End-stage Alzheimer's dementia with vascular dementia, FAST stage 6e. The clinical picture is consistent with the final stages of dementia. There is no treatment available at this stage that would meaningfully alter her trajectory. The following medication changes are recommended:

RECOMMENDATIONS:
1. Discontinue donepezil — no clinical benefit at FAST 6e; may cause side effects (bradycardia, GI symptoms) without benefit
2. Discontinue memantine — same rationale; no evidence of benefit at this stage
3. Continue mirtazapine 7.5mg QHS — may improve appetite and sleep
4. Hospice referral is appropriate and strongly recommended. Patient meets criteria based on: FAST 6e, inability to ambulate, incontinence, loss of meaningful communication, inability to recognize family, nutritional decline, and weight loss.
5. Focus on comfort — pain management, skin integrity, oral care, caregiver support
6. Prognosis: Less than 6 months consistent with FAST 6e and overall trajectory

Follow-up: Hospice will manage ongoing care. Available for phone consultation if needed by hospice team.`
      },
      {
        id: 'lm-nursing',
        type: 'H&P',
        date: '01/10/2026',
        content: `MEMORY CARE NURSING ASSESSMENT
Patient: LM | Date: 01/10/2026
Completing Nurse: [REDACTED], RN, DON
Setting: Memory Care Facility

PURPOSE: Comprehensive nursing assessment for hospice intake coordination

COGNITIVE AND BEHAVIORAL STATUS:
Patient is non-verbal. Does not follow verbal commands. Responds inconsistently to her name with eye opening or brief vocalization. Does not recognize daughter Susan consistently — Susan reports patient has not recognized her by name in approximately 6-8 weeks. Intermittently tracks visual stimuli — sometimes follows movement with eyes, other times eyes are unfocused or closed. No purposeful communication observed. Occasional moaning vocalizations, especially in evenings. No evidence of acute delirium — baseline per facility records.

FAST Stage: 6e
Behavioral symptoms: Generally settled. Occasional agitation and moaning in evenings. No hitting, biting, or aggressive behaviors documented this month.

FUNCTIONAL STATUS:
Mobility: Wheelchair dependent. Cannot propel wheelchair independently. Requires two-person assist for all transfers due to bilateral lower extremity contractures. Unable to bear weight for stand-pivot transfers safely — lift equipment used.
ADLs: Fully dependent for bathing, dressing, grooming, oral care, and toileting. Unable to participate in any ADL task.
Continence: Incontinent of both bladder and bowel. Brief style adult incontinence products in use. No catheter. Toileting program in place every 2 hours with minimal effectiveness given incontinence pattern.
Sleep: Approximately 18-20 hours per day per nursing staff log. Wakes briefly for meals and cares. Sleep-wake cycle disruption noted — sometimes awake 2-4am with moaning.

NUTRITION AND HYDRATION:
Feeding: Requires full feeding assistance. Takes 30-45 minutes per meal due to slow pace, frequent rest breaks, and occasional refusal.
Intake: Approximately 50-60% of offered meals. Intake has decreased from approximately 75% 3 months ago.
Diet: Mechanical soft with thickened liquids (nectar-thick) per speech pathology 10/2025.
Aspiration precautions: Head of bed elevated 30 degrees during and 30 minutes after meals. Upright positioning maintained. Oral care performed after meals.
Weight trend: 128 lbs (11/01/2025) → 126 lbs (12/01/2025) → 124 lbs (12/15/2025) → 122 lbs (01/10/2026). Consistent downward trend — 6 lb loss over 10 weeks.
MAC: Left 22 cm, Right 22 cm. Previous documented: Left 22 cm, Right 22.5 cm (10/2025). Slight decline on right.
Supplements: Ensure Plus 8 oz offered BID — patient accepting approximately 50%.

SKIN INTEGRITY:
Stage 1 Pressure Injury — Sacrum:
Location: Sacrum, midline
Dimensions: 3 cm x 2 cm
Stage: 1 (non-blanchable erythema, skin intact)
Wound bed: Intact, no open area
Periwound: Mild warmth, no induration, no satellite lesions
Contributing factors: Limited mobility, incontinence, nutritional decline, bony prominence
Interventions: Repositioning every 2 hours, pressure redistribution mattress in place, heel floats when in bed, barrier cream applied, foam dressing for pressure relief in sitting position
No other pressure injuries identified.

FALLS:
Fall 1 — 11/22/2025: Found on floor beside wheelchair. No injury. Witnesses: None. Suspected slid from wheelchair. Lap belt in place after this incident.
Fall 2 — 12/18/2025: Found during transfer by aide. Patient slid partially out of wheelchair. Bruising right forearm. X-ray: negative for fracture. Incident report completed. Two-person assist for all transfers implemented.

PAIN ASSESSMENT:
Unable to self-report. Pain behavioral assessment using PAINAD scale: Score 0-1 at rest (no behavioral indicators of pain). Score 2-3 with personal care/repositioning (mild grimacing, brief vocalizations with movement). Currently no scheduled pain medications. PRN acetaminophen 325mg available — used 2-3 times per week for cares.

RESPIRATORY:
RR 16, unlabored. Lungs clear to auscultation bilaterally. O2 saturation 96% on room air. No supplemental oxygen required. No signs of respiratory distress at rest. Oral secretions managed with good oral care — no suctioning required.

ELIMINATION:
Bowel: Last bowel movement 01/09/2026. On scheduled miralax daily. No signs of impaction on assessment. Abdomen soft and non-tender.
Bladder: Incontinent. Brief changed every 2 hours and as needed. No signs of UTI — no odor, no apparent discomfort with cares.

ORAL CARE:
Oral hygiene performed BID by nursing staff. Edentulous — denture fitting concerns, patient does not tolerate dentures. Oral mucosa moist and intact. No lesions, no thrush.

PSYCHOSOCIAL:
Daughter Susan visits 3-4 times per week, typically 1-2 hours per visit. Susan is tearful at times but engaged and asks thoughtful questions. She has been educated on what to expect as dementia progresses. She participates in care when present — holds patient's hand, plays music patient enjoyed (classical music, 1940s-50s era). Staff notes patient appears to respond to familiar voices and touch with brief eye opening and calming of vocalizations.
Chaplaincy: Memory care chaplain visits monthly. Susan has accepted chaplain support for herself.

ADVANCE DIRECTIVES:
DNR/DNI confirmed — on file. POLST: DNR, no hospitalization, comfort-focused care only. No artificial nutrition or hydration. Susan designated healthcare proxy — documents on file.`
      },
      {
        id: 'lm-wound',
        type: 'Wound Care Note',
        date: '01/14/2026',
        content: `WOUND CARE NOTE
Patient: LM | Date: 01/14/2026
Wound Care Nurse: [REDACTED], RN, CWCN
Memory Care Facility

WOUND ASSESSMENT — VISIT #3

WOUND IDENTIFICATION:
Location: Sacrum, midline
Classification: Stage 1 Pressure Injury
Date first identified: 01/08/2026
Duration: 6 days

WOUND MEASUREMENTS:
Today: Length 3.2 cm | Width 2.1 cm (slight increase from initial 3 cm x 2 cm)
Depth: 0 cm (no open area, skin intact)
Tunneling: None
Undermining: None

WOUND BED:
Status: Intact skin. Non-blanchable erythema when pressure applied.
Color: Persistent redness, darker in center
Epithelialization: N/A — skin intact, no open wound
Eschar/Slough: None

PERIWOUND TISSUE:
Color: Surrounding erythema, fading at 2 cm from wound edge
Temperature: Mild warmth to touch, slightly warmer than surrounding skin
Edema: None
Maceration: None
Skin integrity: Surrounding skin intact, mild dryness noted, barrier cream applied

WOUND DRAINAGE:
Amount: None (skin intact)
Type: N/A
Odor: None

PAIN ASSESSMENT:
Patient unable to self-report. Behavioral indicators during wound assessment: mild grimacing with repositioning, brief vocalization with application of barrier cream. PAINAD score 2 during procedure. Pre-medication: acetaminophen 325mg given 30 minutes prior.

INFECTION ASSESSMENT:
No signs of infection: skin intact, no purulence, no surrounding cellulitis beyond expected erythema, no fever (Temp 97.8°F today). No wound culture indicated at this time.

TREATMENT PERFORMED TODAY:
1. Patient repositioned to left lateral decubitus with pillows for support
2. Sacral area cleansed gently with pH-balanced skin cleanser and soft cloth — patient tolerated with minimal discomfort
3. Area thoroughly dried with gentle patting motion
4. 3M Cavilon No Sting Barrier Film applied to protect skin surface
5. Mepilex Border Lite foam dressing applied to provide pressure relief and moisture balance
6. Patient repositioned to pressure-offloading position — documentation of turn in nursing log
7. Pressure redistribution chair cushion confirmed in place in wheelchair

CONTRIBUTING FACTORS ADDRESSED:
Immobility: Turn and position schedule every 2 hours confirmed with nursing staff. Bed is equipped with alternating pressure mattress overlay.
Incontinence: Incontinence briefs changed every 2 hours and PRN. Barrier cream applied to perianal and sacral area with every brief change.
Nutrition: Albumin 3.1 g/dL (01/12/2026). Low albumin significantly impairs wound healing potential. Dietitian notified. Ensure Plus BID continuing. Dietary consult recommended for protein supplementation.
Friction/Shear: Repositioning using draw sheet and lift equipment. Staff education reinforced on lifting technique.

WOUND TRAJECTORY ASSESSMENT:
Slight enlargement from 3 cm x 2 cm to 3.2 cm x 2.1 cm over 6 days. Stage 1 has not progressed to Stage 2 (skin intact). However, wound is not improving despite interventions, likely due to significant contributing factors (immobility, incontinence, hypoalbuminemia). Goals in context of hospice care are wound stabilization and prevention of progression, comfort, and prevention of infection. Complete healing is unlikely given patient's overall clinical status.

PLAN:
- Continue current wound care regimen every 2-3 days
- Notify hospice RN and MD if wound progresses to Stage 2 or beyond
- Monitor for signs of infection at each assessment
- Reassess in 3 days
- Continue nutritional interventions
- Reinforce turning schedule with facility staff
- Family (Susan) notified of wound status — educated on pressure injury prevention and what to watch for`
      },
      {
        id: 'lm-labs',
        type: 'Lab Results',
        date: '01/12/2026',
        content: `LABORATORY RESULTS
Patient: LM | Date of Collection: 01/12/2026
Ordering Provider: [REDACTED], MD (Primary Care)
Clinical Indication: Routine monitoring, hospice evaluation

COMPLETE BLOOD COUNT:
WBC: 6.8 K/uL (normal 4.5-11.0)
RBC: 3.4 M/uL (L) (normal 3.9-5.2)
Hemoglobin: 10.2 g/dL (L) (normal 12.0-16.0) — consistent with chronic anemia
Hematocrit: 31.4% (L) (normal 36.0-46.0)
MCV: 92.4 fL (normal 80-100)
MCH: 30.0 pg (normal 27-33)
MCHC: 32.5 g/dL (normal 31.5-35.7)
RDW: 13.8% (normal 11.5-14.5)
Platelets: 224 K/uL (normal 150-400)

COMPREHENSIVE METABOLIC PANEL:
Sodium: 139 mEq/L (normal 136-145)
Potassium: 4.2 mEq/L (normal 3.5-5.1)
Chloride: 104 mEq/L (normal 98-107)
CO2: 24 mEq/L (normal 22-29)
BUN: 22 mg/dL (normal 7-25)
Creatinine: 1.1 mg/dL (normal 0.6-1.1) — upper limit of normal
eGFR: 58 mL/min/1.73m2 — CKD stage 3a
Glucose: 98 mg/dL (normal 70-100) — good glycemic control (diet-controlled DM)
Calcium: 8.2 mg/dL (normal 8.5-10.2) (L) — mildly low, clinically insignificant
Total Protein: 5.8 g/dL (L) (normal 6.3-8.2) — hypoproteinemia consistent with nutritional decline
Albumin: 3.1 g/dL (L) (normal 3.5-5.0) — low, reflecting nutritional compromise and chronic disease
Total Bilirubin: 0.7 mg/dL (normal 0.2-1.2)
AST: 24 U/L (normal 10-40)
ALT: 18 U/L (normal 7-56)
Alkaline Phosphatase: 76 U/L (normal 44-147)

ADDITIONAL LABS:
TSH: 2.4 mIU/L (normal 0.4-4.0) — euthyroid, hypothyroidism not contributing
HbA1c: 6.1% (excellent glycemic control, appropriate target for age/comorbidities)
Prealbumin: Not ordered (recommend adding at next draw for nutritional monitoring)

PROVIDER INTERPRETATION:
Results reflect chronic anemia of chronic disease (normocytic anemia, consistent with prior trend), mild hypoalbuminemia reflecting poor nutritional status, and normal renal function for age. No acute metabolic abnormalities. TSH normal — hypothyroidism not a reversible contributor to cognitive status. HbA1c 6.1% reflects good glucose control on diet alone.

The hypoalbuminemia (3.1 g/dL) is clinically significant in the context of the developing Stage 1 sacral pressure injury — albumin below 3.5 is associated with impaired wound healing. Nutritional interventions ongoing.

These laboratory values are consistent with end-stage dementia with nutritional decline and do not reveal any reversible or treatable conditions that would meaningfully alter the patient's overall trajectory.`
      },
      {
        id: 'lm-goals',
        type: 'Palliative Care Note',
        date: '01/15/2026',
        content: `GOALS OF CARE CONFERENCE NOTE
Patient: LM | Date: 01/15/2026
Location: Memory Care Facility, Patient Room
Participants: Susan [REDACTED] (daughter, healthcare proxy), Memory Care Director of Nursing, Hospice RN (intake), [REDACTED] MD (Primary Care, by phone)

CLINICAL SUMMARY PROVIDED TO FAMILY:
The clinical team provided a comprehensive summary of LM's current status and trajectory to Susan and the facility team. Key points communicated:

1. Cognitive Status: LM is in the end stage of her dementia (FAST 6e). She is non-verbal, does not recognize family members consistently, cannot follow commands, and requires full assistance for all activities of daily living. This represents a significant decline from 12-18 months ago when she could speak in phrases and recognize Susan.

2. Nutritional Decline: She has lost 6 pounds over the past 10 weeks. Her meal intake has declined to approximately 50-60% of offered meals despite assistance and supplementation. Her albumin is 3.1 g/dL, indicating compromised nutritional status. This pattern is typical of end-stage dementia and will continue.

3. Falls: Two falls in the past 2 months. Risk remains elevated given wheelchair dependence, contractures, and cognitive inability to cooperate with safety measures.

4. Pressure Injury: A Stage 1 sacral pressure injury has developed. Despite best practices, progression is possible given immobility, incontinence, and nutritional compromise.

5. Prognosis: Based on FAST 6e staging, weight loss, nutritional decline, and overall functional trajectory, the medical team estimates prognosis of less than 6 months. This estimate is consistent with published data on end-stage dementia survival.

FAMILY RESPONSE AND DISCUSSION:
Susan was tearful throughout the conference but engaged and asked thoughtful questions. She expressed that she had been observing her mother's decline and "knew in her heart" that this time was coming. She stated that her mother had expressed, before losing capacity, that she "never wanted to be kept alive by machines" and had expressed fear of suffering.

Susan confirmed the following values and preferences expressed by her mother when she had capacity:
- Did not want CPR or mechanical ventilation
- Did not want feeding tube (specifically discussed this with primary care 2 years ago)
- Wanted to remain comfortable and free of pain
- Wanted to be with family
- Had strong faith and was not afraid of dying, but feared suffering

DECISIONS MADE:
1. DNR/DNI: Confirmed. Susan reconfirmed her understanding and agreement.
2. No artificial nutrition or hydration: Susan confirmed this was consistent with her mother's expressed wishes. No PEG tube will be placed. Oral feeding to continue as long as patient accepts and is safe.
3. No hospitalization: Family does not want patient transferred to hospital for any reason, including infections, falls, or worsening condition. All care to be provided at memory care facility with hospice support.
4. Comfort-focused care: All medications to be reviewed for comfort relevance. Donepezil and memantine to be discontinued. Mirtazapine to continue for appetite and sleep. PRN comfort medications (morphine, lorazepam, haloperidol) ordered in anticipation of symptoms.

POLST:
Updated today and signed. Reflects: DNR, no artificial nutrition, no hospitalization, comfort measures only. Susan signed as healthcare proxy. Copy placed in chart and given to Susan.

HOSPICE ENROLLMENT:
Susan formally consented to hospice enrollment today. She was educated on hospice services, the role of the hospice team, what to expect as dementia progresses, and how to access 24-hour support. She was provided with educational materials on end-stage dementia.

Susan's questions addressed:
Q: "Will she be in pain?" A: We cannot know for certain, but we have medications available to manage any signs of pain or discomfort. The hospice team will monitor closely.
Q: "How will I know when she is close to dying?" A: Hospice nurse will educate on signs and symptoms. Changes in breathing, skin color, and responsiveness are common signs. The team is available 24/7.
Q: "Should I be there at the end?" A: There is no right or wrong answer. We will do our best to let Susan know when changes occur so she can be present if she chooses.

PLAN:
- Hospice enrollment effective today
- Comfort medications ordered
- Discontinue donepezil, memantine per neurology recommendation
- Continue mirtazapine, metoprolol, aspirin, calcium, vitamin D
- Wound care for sacral Stage 1 per wound care nurse protocol
- Repositioning every 2 hours
- Oral hygiene BID
- Music therapy — classical and 1940s-50s music (patient's preference per family)
- Chaplaincy — offered to Susan, she will consider
- Bereavement support offered to family
- Hospice aide 5 days/week for personal care assistance`
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

PPS 40%. KPS 40%.`,
  },

  tr: {
    id: 'tr',
    snapshot: 'Post MCA stroke · Global aphasia · PEG dependent · PPS 30%',
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
    snapshot: 'FEV1 28% · Cor pulmonale · BMI 17.2 · O2 4L at rest',
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
    snapshot: 'Stage IV NSCLC · Brain mets · 30 lb weight loss · KPS 40%',
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
    snapshot: 'eGFR 8 · Cr 8.4 · K 5.9 · Declined dialysis · PPS 30%',
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
    snapshot: 'Child-Pugh C · MELD 32 · Paracentesis q10-14 days · INR 2.9',
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
    snapshot: 'ALS bulbar · FVC 38% · Anarthric · PEG dependent · Tobii device',
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
    snapshot: 'Stage IV pancreatic · 28 lb loss · Bili 8.4 · Pain 8/10',
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
    snapshot: 'Hoehn-Yahr 5 · Anarthric · 2 aspiration PNAs · Bedbound',
    name: 'HN',
    age: 77,
    sex: 'Male',
    diagnosis: "Advanced Parkinson's disease with dementia (PDD), Hoehn & Yahr Stage 5",
    secondaryDx: "Parkinson's disease dementia, dysphagia with aspiration risk, recurrent aspiration pneumonia, orthostatic hypotension, urinary retention, constipation",
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
