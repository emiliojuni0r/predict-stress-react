import React, { useState } from 'react';

// --- KOMPONEN UI SEDERHANA (REUSABLE) ---
const RadioGroup = ({ label, name, options, value, onChange, required = true }) => (
  <div style={{ marginBottom: '20px', padding: '15px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
    <p style={{ fontWeight: '600', marginBottom: '10px' }}>{label}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
      {options.map((opt) => (
        <label key={opt.value} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={parseInt(value) === opt.value}
            onChange={onChange}
            style={{ marginRight: '8px', width: '18px', height: '18px' }}
            required={required}
          />
          <span style={{ fontSize: '14px' }}>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

// --- DATA PERTANYAAN LENGKAP ---
const QUESTIONS = {
  // GAD-7 (Anxiety) - Scale 0-3
  gad7: [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ],
  // PHQ-9 (Depression) - Scale 0-3
  phq9: [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself - or that you are a failure",
    "Trouble concentrating on things, such as reading or watching TV",
    "Moving or speaking so slowly that other people could have noticed",
    "Thoughts that you would be better off dead, or of hurting yourself"
  ],
  // Rosenberg Self-Esteem (Mock 10 items) - Scale 0-3 
  // (Di dataset 0-30, kita asumsikan 10 pertanyaan positif/negatif dikonversi ke skor positif)
  rses: [
    "I feel that I am a person of worth, at least on an equal plane with others.",
    "I feel that I have a number of good qualities.",
    "All in all, I am inclined to feel that I am a failure. (Reverse)",
    "I am able to do things as well as most other people.",
    "I feel I do not have much to be proud of. (Reverse)",
    "I take a positive attitude toward myself.",
    "On the whole, I am satisfied with myself.",
    "I wish I could have more respect for myself. (Reverse)",
    "I certainly feel useless at times. (Reverse)",
    "At times I think I am no good at all. (Reverse)"
  ]
};

const StressQuestionnaire = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const baseurl = import.meta.env.VITE_API_BASE_URL;

  // State untuk menyimpan semua jawaban raw
  const [answers, setAnswers] = useState({
    // GAD-7 (0-6)
    g0: 0, g1: 0, g2: 0, g3: 0, g4: 0, g5: 0, g6: 0,
    // PHQ-9 (0-8)
    p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0,
    // RSES (0-9)
    r0: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0, r7: 0, r8: 0, r9: 0,

    // Fitur Lain (Scale 0-5)
    mental_health_history: 0, // 0/1
    headache: 0,
    sleep_quality: 0, // Diinterpretasikan sebagai "Sleep Problem Severity"
    breathing_problem: 0,
    noise_level: 0,
    living_conditions: 0, // "Living condition problems"
    safety: 0, // "Unsafety level"
    basic_needs: 0, // "Struggle with basic needs"
    academic_performance: 0, // "Academic struggle"
    study_load: 0,
    teacher_student_relationship: 0, // "Relationship issues"
    future_career_concerns: 0,
    social_support: 0, // "Lack of support"
    peer_pressure: 0,
    extracurricular_activities: 0,
    bullying: 0
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) });
  };

  const calculateScores = () => {
    // Hitung GAD-7 (Anxiety 0-21)
    let anxiety = 0;
    for (let i = 0; i < 7; i++) anxiety += answers[`g${i}`];

    // Hitung PHQ-9 (Depression 0-27)
    let depression = 0;
    for (let i = 0; i < 9; i++) depression += answers[`p${i}`];

    // Hitung Self Esteem (0-30)
    // Catatan: Pertanyaan Reverse di RSES harus dibalik nilainya (3-x).
    // Asumsi indeks genap positif, ganjil negatif (Sesuai urutan standar RSES kadang beda, ini simplifikasi)
    // Untuk dataset ini, kita jumlahkan saja sebagai raw score 0-30 dimana makin tinggi makin pede.
    let self_esteem = 0;
    for (let i = 0; i < 10; i++) self_esteem += answers[`r${i}`];

    return { anxiety, depression, self_esteem };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const scores = calculateScores();

    // Payload sesuai feature_names.pkl
    const payload = {
      anxiety_level: scores.anxiety,
      depression: scores.depression,
      self_esteem: scores.self_esteem,
      mental_health_history: answers.mental_health_history,
      headache: answers.headache,
      sleep_quality: answers.sleep_quality,
      breathing_problem: answers.breathing_problem,
      noise_level: answers.noise_level,
      living_conditions: answers.living_conditions,
      safety: answers.safety,
      basic_needs: answers.basic_needs,
      academic_performance: answers.academic_performance,
      study_load: answers.study_load,
      teacher_student_relationship: answers.teacher_student_relationship,
      future_career_concerns: answers.future_career_concerns,
      social_support: answers.social_support,
      peer_pressure: answers.peer_pressure,
      extracurricular_activities: answers.extracurricular_activities,
      bullying: answers.bullying
    };

    try {
      const response = await fetch(`${baseurl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setResult(data);

      console.log(data);
    } catch (error) {
      alert("Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  // --- OPSI JAWABAN ---
  const opts0to3 = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "Over half days" },
    { value: 3, label: "Nearly every day" }
  ];

  const opts0to3_Agree = [
    { value: 0, label: "Strongly Disagree" },
    { value: 1, label: "Disagree" },
    { value: 2, label: "Agree" },
    { value: 3, label: "Strongly Agree" }
  ];

  const opts0to5 = [
    { value: 0, label: "0 - No Issue/None" },
    { value: 1, label: "1 - Very Low" },
    { value: 2, label: "2 - Low" },
    { value: 3, label: "3 - Moderate" },
    { value: 4, label: "4 - High" },
    { value: 5, label: "5 - Extreme" }
  ];

  // --- RENDER PER SECTION ---
  return (
    <div className='text-black' style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif', background: '#f4f6f8', padding: '30px', borderRadius: '15px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Student Stress Assessment</h1>
      <div style={{ height: '4px', background: '#e0e0e0', marginBottom: '30px' }}>
        <div style={{ height: '100%', background: '#3498db', width: `${step * 25}%`, transition: '0.3s' }}></div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit}>

          {/* STEP 1: ANXIETY & DEPRESSION */}
          {step === 1 && (
            <div>
              <h2 style={{ color: '#34495e' }}>Part 1: Emotional Well-being</h2>
              <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>Over the last 2 weeks, how often have you been bothered by the following problems?</p>

              <h3 style={{ marginTop: '20px' }}>Anxiety (GAD-7)</h3>
              {QUESTIONS.gad7.map((q, i) => (
                <RadioGroup key={`g${i}`} name={`g${i}`} label={`${i + 1}. ${q}`} options={opts0to3} value={answers[`g${i}`]} onChange={handleChange} />
              ))}

              <h3 style={{ marginTop: '20px' }}>Depression (PHQ-9)</h3>
              {QUESTIONS.phq9.map((q, i) => (
                <RadioGroup key={`p${i}`} name={`p${i}`} label={`${i + 1}. ${q}`} options={opts0to3} value={answers[`p${i}`]} onChange={handleChange} />
              ))}
            </div>
          )}

          {/* STEP 2: SELF ESTEEM & HEALTH */}
          {step === 2 && (
            <div>
              <h2 style={{ color: '#34495e' }}>Part 2: Self Perception & Health</h2>

              <h3>Self-Esteem Scale</h3>
              <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>Select how much you agree with the statement.</p>
              {QUESTIONS.rses.map((q, i) => (
                <RadioGroup key={`r${i}`} name={`r${i}`} label={`${i + 1}. ${q}`} options={opts0to3_Agree} value={answers[`r${i}`]} onChange={handleChange} />
              ))}

              <h3>Physical Health</h3>
              <RadioGroup
                name="mental_health_history"
                label="Do you have a history of mental health issues?"
                value={answers.mental_health_history}
                onChange={handleChange}
                options={[{ value: 0, label: "No" }, { value: 1, label: "Yes" }]}
              />
              <RadioGroup name="headache" label="How frequently do you experience headaches?" options={opts0to5} value={answers.headache} onChange={handleChange} />
              <RadioGroup name="breathing_problem" label="Do you experience breathing problems?" options={opts0to5} value={answers.breathing_problem} onChange={handleChange} />
              <RadioGroup name="sleep_quality" label="How much difficulty do you have sleeping?" options={opts0to5} value={answers.sleep_quality} onChange={handleChange} />
            </div>
          )}

          {/* STEP 3: ENVIRONMENTAL & SOCIAL */}
          {step === 3 && (
            <div>
              <h2 style={{ color: '#34495e' }}>Part 3: Environment & Social</h2>
              <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>Rate the level of ISSUE/PROBLEM (0=No Problem, 5=Big Problem)</p>

              <RadioGroup name="noise_level" label="Level of noise in your living environment?" options={opts0to5} value={answers.noise_level} onChange={handleChange} />
              <RadioGroup name="living_conditions" label="Issues with your living conditions?" options={opts0to5} value={answers.living_conditions} onChange={handleChange} />
              <RadioGroup name="safety" label="How UNSAFE do you feel?" options={opts0to5} value={answers.safety} onChange={handleChange} />
              <RadioGroup name="basic_needs" label="Struggle with meeting basic needs?" options={opts0to5} value={answers.basic_needs} onChange={handleChange} />

              <hr style={{ margin: '20px 0' }} />

              <RadioGroup name="social_support" label="Lack of social support (Isolation)?" options={opts0to5} value={answers.social_support} onChange={handleChange} />
              <RadioGroup name="peer_pressure" label="Pressure from peers?" options={opts0to5} value={answers.peer_pressure} onChange={handleChange} />
              <RadioGroup name="extracurricular_activities" label="Conflict with extracurricular activities?" options={opts0to5} value={answers.extracurricular_activities} onChange={handleChange} />
              <RadioGroup name="bullying" label="Experience with bullying?" options={opts0to5} value={answers.bullying} onChange={handleChange} />
            </div>
          )}

          {/* STEP 4: ACADEMIC */}
          {step === 4 && (
            <div>
              <h2 style={{ color: '#34495e' }}>Part 4: Academic Factors</h2>
              <p style={{ fontStyle: 'italic', color: '#7f8c8d' }}>Rate the level of STRESS/ISSUE (0=None, 5=Extreme)</p>

              <RadioGroup name="academic_performance" label="Concern/Lack of confidence in academic performance?" options={opts0to5} value={answers.academic_performance} onChange={handleChange} />
              <RadioGroup name="study_load" label="Overwhelmed by study load?" options={opts0to5} value={answers.study_load} onChange={handleChange} />
              <RadioGroup name="teacher_student_relationship" label="Difficulties with teachers/professors?" options={opts0to5} value={answers.teacher_student_relationship} onChange={handleChange} />
              <RadioGroup name="future_career_concerns" label="Anxiety about future career?" options={opts0to5} value={answers.future_career_concerns} onChange={handleChange} />
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', background: '#95a5a6', color: 'white', cursor: 'pointer' }}>
                Back
              </button>
            )}

            {step < 4 ? (
              <button type="button" onClick={() => setStep(step + 1)} style={{ padding: '12px 24px', borderRadius: '6px', border: 'none', background: '#3498db', color: 'white', cursor: 'pointer', marginLeft: 'auto' }}>
                Next
              </button>
            ) : (
              <button type="submit" disabled={loading} style={{ padding: '12px 30px', borderRadius: '6px', border: 'none', background: '#27ae60', color: 'white', cursor: 'pointer', fontWeight: 'bold', marginLeft: 'auto' }}>
                {loading ? "Analyzing..." : "Get Result"}
              </button>
            )}
          </div>
        </form>
      ) : (
        // HASIL PREDIKSI
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: result.prediction === 0 ? '#27ae60' : result.prediction === 1 ? '#f39c12' : '#c0392b' }}>
            {result.description}
          </h2>
          <div style={{ fontSize: '48px', margin: '20px 0' }}>
            {result.prediction === 0 ? '😌' : result.prediction === 1 ? '😐' : '😫'}
          </div>
          {/* <p style={{ fontSize: '18px', color: '#7f8c8d' }}>
            Confidence Level: <strong>{result.confidence}%</strong>
          </p>
          
          <div style={{ marginTop: '30px', textAlign: 'left', background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
             <p><strong>Breakdown:</strong></p>
             <ul>
               <li>Low Stress Probability: {(result.probabilities.low * 100).toFixed(1)}%</li>
               <li>Medium Stress Probability: {(result.probabilities.medium * 100).toFixed(1)}%</li>
               <li>High Stress Probability: {(result.probabilities.high * 100).toFixed(1)}%</li>
             </ul>
          </div> */}

          <button onClick={() => { setResult(null); setStep(1); }} style={{ marginTop: '30px', padding: '10px 20px', cursor: 'pointer', border: 'none', background: '#3498db', color: 'white', borderRadius: '5px' }}>
            Check Again
          </button>
        </div>
      )}
    </div>
  );
};

export default StressQuestionnaire;