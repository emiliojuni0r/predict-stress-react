import React, { useState, useEffect, useRef } from 'react';

// --- KOMPONEN UI: RADIO GROUP (TAILWIND) ---
const RadioGroup = ({ label, name, options, value, onChange, required = true }) => (
  <div className="mb-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
    <p className="font-semibold text-slate-800 mb-4 text-sm md:text-base">{label}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      {options.map((opt) => {
        const isSelected = parseInt(value) === opt.value;
        return (
          <label
            key={opt.value}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${isSelected
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'}
            `}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={onChange}
              className="absolute opacity-0 w-0 h-0"
              required={required}
            />
            <div className={`w-4 h-4 rounded-full border mb-2 flex items-center justify-center
              ${isSelected ? 'border-blue-500' : 'border-slate-300'}`}>
              {isSelected && <div className="w-2 h-2 rounded-full bg-blue-500" />}
            </div>
            <span className="text-xs font-medium text-center">{opt.label}</span>
          </label>
        );
      })}
    </div>
  </div>
);

const QUESTIONS = {
  gad7: ["Feeling nervous, anxious, or on edge", "Not being able to stop or control worrying", "Worrying too much about different things", "Trouble relaxing", "Being so restless that it is hard to sit still", "Becoming easily annoyed or irritable", "Feeling afraid, as if something awful might happen"],
  phq9: ["Little interest or pleasure in doing things", "Feeling down, depressed, or hopeless", "Trouble falling or staying asleep, or sleeping too much", "Feeling tired or having little energy", "Poor appetite or overeating", "Feeling bad about yourself - or that you are a failure", "Trouble concentrating on things, such as reading or watching TV", "Moving or speaking so slowly that other people could have noticed", "Thoughts that you would be better off dead, or of hurting yourself"],
  rses: ["I feel that I am a person of worth, at least on an equal plane with others.", "I feel that I have a number of good qualities.", "All in all, I am inclined to feel that I am a failure. (Reverse)", "I am able to do things as well as most other people.", "I feel I do not have much to be proud of. (Reverse)", "I take a positive attitude toward myself.", "On the whole, I am satisfied with myself.", "I wish I could have more respect for myself. (Reverse)", "I certainly feel useless at times. (Reverse)", "At times I think I am no good at all. (Reverse)"]
};

const StressQuestionnaire = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false); // Safety state untuk tombol submit

  const topRef = useRef(null); // Ref untuk scroll ke atas
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  const [answers, setAnswers] = useState({
    g0: 0, g1: 0, g2: 0, g3: 0, g4: 0, g5: 0, g6: 0,
    p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0,
    r0: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0, r7: 0, r8: 0, r9: 0,
    mental_health_history: 0, headache: 0, sleep_quality: 0, breathing_problem: 0,
    noise_level: 0, living_conditions: 0, safety: 0, basic_needs: 0,
    academic_performance: 0, study_load: 0, teacher_student_relationship: 0,
    future_career_concerns: 0, social_support: 0, peer_pressure: 0,
    extracurricular_activities: 0, bullying: 0
  });

  // Efek 1: Scroll ke atas setiap ganti step
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  // Efek 2: Jeda keamanan saat masuk ke Step 4
  useEffect(() => {
    if (step === 4) {
      setCanSubmit(false);
      const timer = setTimeout(() => setCanSubmit(true), 800); // 0.8 detik jeda
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: parseInt(e.target.value) });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const calculateScores = () => {
    let anxiety = 0;
    for (let i = 0; i < 7; i++) anxiety += answers[`g${i}`];
    let depression = 0;
    for (let i = 0; i < 9; i++) depression += answers[`p${i}`];
    let self_esteem = 0;
    for (let i = 0; i < 10; i++) self_esteem += answers[`r${i}`];
    return { anxiety, depression, self_esteem };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return; // Mencegah submit jika belum lewat masa jeda
    setLoading(true);

    const scores = calculateScores();
    const payload = {
      anxiety_level: scores.anxiety,
      depression: scores.depression,
      self_esteem: scores.self_esteem,
      ...answers // Mengirim sisa field secara dinamis
    };

    try {
      const response = await fetch(`${baseurl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  // Opsi jawaban
  const opts0to3 = [{ value: 0, label: "Not at all" }, { value: 1, label: "Several days" }, { value: 2, label: "Over half days" }, { value: 3, label: "Nearly every day" }];
  const opts0to3_Agree = [{ value: 0, label: "Strongly Disagree" }, { value: 1, label: "Disagree" }, { value: 2, label: "Agree" }, { value: 3, label: "Strongly Agree" }];
  const opts0to5 = [{ value: 0, label: "0 - None" }, { value: 1, label: "1 - Very Low" }, { value: 2, label: "2 - Low" }, { value: 3, label: "3 - Moderate" }, { value: 4, label: "4 - High" }, { value: 5, label: "5 - Extreme" }];

  return (
    <div className="w-full max-w-3xl mx-auto my-10 bg-slate-50 md:p-8 p-4 rounded-2xl shadow-xl font-sans text-slate-800">
      {/* Anchor untuk scroll ke atas */}
      <div ref={topRef} />

      <h1 className="text-xl md:text-3xl font-bold text-center text-slate-800 mb-2">Student Stress Assessment</h1>
      <p className="text-center text-slate-500 mb-6 text-sm">Please answer honestly. Your data is processed privately.</p>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-200 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${step * 25}%` }}
        ></div>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>

          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-slate-700 flex items-center mb-6">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                Emotional Well-being
              </h2>
              <h3 className="text-lg font-semibold text-blue-600 mb-4 mt-8 px-1">Anxiety (GAD-7)</h3>
              {QUESTIONS.gad7.map((q, i) => (
                <RadioGroup key={`g${i}`} name={`g${i}`} label={`${i + 1}. ${q}`} options={opts0to3} value={answers[`g${i}`]} onChange={handleChange} />
              ))}
              <h3 className="text-lg font-semibold text-blue-600 mb-4 mt-8 px-1">Depression (PHQ-9)</h3>
              {QUESTIONS.phq9.map((q, i) => (
                <RadioGroup key={`p${i}`} name={`p${i}`} label={`${i + 1}. ${q}`} options={opts0to3} value={answers[`p${i}`]} onChange={handleChange} />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-slate-700 flex items-center mb-6">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Self Perception & Health
              </h2>
              {QUESTIONS.rses.map((q, i) => (
                <RadioGroup key={`r${i}`} name={`r${i}`} label={`${i + 1}. ${q}`} options={opts0to3_Agree} value={answers[`r${i}`]} onChange={handleChange} />
              ))}
              <h3 className="text-lg font-semibold text-blue-600 mb-4 mt-8 px-1">Physical Health</h3>
              <RadioGroup name="mental_health_history" label="Mental health history?" value={answers.mental_health_history} onChange={handleChange} options={[{ value: 0, label: "No" }, { value: 1, label: "Yes" }]} />
              <RadioGroup name="headache" label="Headache frequency?" options={opts0to5} value={answers.headache} onChange={handleChange} />
              <RadioGroup name="sleep_quality" label="Sleep difficulty?" options={opts0to5} value={answers.sleep_quality} onChange={handleChange} />
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-slate-700 flex items-center mb-6">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                Environment & Social
              </h2>
              <RadioGroup name="noise_level" label="Noise level?" options={opts0to5} value={answers.noise_level} onChange={handleChange} />
              <RadioGroup name="living_conditions" label="Living condition issues?" options={opts0to5} value={answers.living_conditions} onChange={handleChange} />
              <RadioGroup name="safety" label="Unsafety level?" options={opts0to5} value={answers.safety} onChange={handleChange} />
              <RadioGroup name="social_support" label="Lack of support?" options={opts0to5} value={answers.social_support} onChange={handleChange} />
              <RadioGroup name="peer_pressure" label="Peer pressure?" options={opts0to5} value={answers.peer_pressure} onChange={handleChange} />
              <RadioGroup name="bullying" label="Bullying experience?" options={opts0to5} value={answers.bullying} onChange={handleChange} />
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-slate-700 flex items-center mb-6">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                Academic Factors
              </h2>
              <RadioGroup name="academic_performance" label="Academic concerns?" options={opts0to5} value={answers.academic_performance} onChange={handleChange} />
              <RadioGroup name="study_load" label="Study load stress?" options={opts0to5} value={answers.study_load} onChange={handleChange} />
              <RadioGroup name="teacher_student_relationship" label="Teacher relationship issues?" options={opts0to5} value={answers.teacher_student_relationship} onChange={handleChange} />
              <RadioGroup name="future_career_concerns" label="Future career anxiety?" options={opts0to5} value={answers.future_career_concerns} onChange={handleChange} />
            </div>
          )}

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100">
                Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-8 py-2.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !canSubmit}
                className={`px-8 py-2.5 rounded-lg font-bold text-white shadow-lg transition-all duration-300
                  ${canSubmit ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-slate-300 shadow-none cursor-not-allowed'}
                `}
              >
                {loading ? "Analyzing..." : "Complete Assessment"}
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="text-center py-10 px-4 animate-fade-in bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className={`inline-block p-6 rounded-full mb-6 ${result.prediction === 0 ? 'bg-emerald-50' : result.prediction === 1 ? 'bg-yellow-50' : 'bg-red-50'}`}>
            <span className="text-6xl">{result.prediction === 0 ? '😌' : result.prediction === 1 ? '😐' : '😫'}</span>
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${result.prediction === 0 ? 'text-emerald-600' : result.prediction === 1 ? 'text-yellow-600' : 'text-red-600'}`}>{result.description}</h2>
          <button onClick={() => { setResult(null); setStep(1); }} className="mt-8 px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">Start New Assessment</button>
        </div>
      )}
    </div>
  );
};

export default StressQuestionnaire;