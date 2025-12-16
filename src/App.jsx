import { useState } from 'react'
import StressQuestionnaire from './StressQuestionnaire'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import mentalImage from "../src/assets/mental-health-illustration.jpg"

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-screen min-h-screen bg-white font-sans text-slate-900">
      {/* --- HERO SECTION --- */}
      <Navbar onTakeAssessment={() => setShowForm(true)} />

      <main className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Mental Health Matters</span>
          <h2 className="text-5xl md:text-6xl font-extrabold mt-4 leading-tight">
            Your Mental Well-being <br />
            <span className="text-blue-600">is a Priority.</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Stress is a natural part of student life, but ignoring it shouldn't be.
            Understand your emotional patterns, identify early signs of burnout,
            and take the first step towards a more balanced academic journey.
          </p>
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
            >
              Start Free Assessment
            </button>
            <a href="#why-aware" className="px-8 py-4 rounded-xl font-bold text-lg text-slate-700 hover:bg-slate-100 transition">
              Learn More
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            src={mentalImage}
            alt="Mental Health Illustration"
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* --- WHY AWARE SECTION --- */}
      <section id="why-aware" className="bg-white py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">Why being aware matters?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-blue-50">
              <div className="text-3xl mb-4">🧠</div>
              <h4 className="font-bold text-xl mb-2">Early Detection</h4>
              <p className="text-slate-600">Recognizing stress symptoms early prevents long-term physical and mental exhaustion.</p>
            </div>
            <div className="p-6 rounded-2xl bg-green-50">
              <div className="text-3xl mb-4">📈</div>
              <h4 className="font-bold text-xl mb-2">Better Focus</h4>
              <p className="text-slate-600">Managing stress effectively leads to improved academic performance and concentration.</p>
            </div>
            <div className="p-6 rounded-2xl bg-purple-50">
              <div className="text-3xl mb-4">🌱</div>
              <h4 className="font-bold text-xl mb-2">Personal Growth</h4>
              <p className="text-slate-600">Self-awareness is the foundation of resilience and emotional intelligence.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* --- MODAL POP-UP --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-all">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 z-10 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-4">
              <StressQuestionnaire />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App