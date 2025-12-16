import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StressQuestionnaire from './StressQuestionnaire'

import mentalImage from "../src/assets/mental-health-illustration.jpg"

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="w-screen min-h-screen bg-white font-sans text-slate-900">

      <Navbar />

      {/* ================= HERO ================= */}
      <main
        id="hero"
        className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
            Mental Health Matters
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold mt-4 leading-tight">
            Your Mental Well-being <br />
            <span className="text-blue-600">is a Priority.</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Stress is a natural part of student life, but ignoring it shouldn't be.
            Understand your emotional patterns and take the first step towards
            a healthier academic journey.
          </p>

          <div className="mt-10">
            <a
              href="#cta"
              className=" inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
            >
              <p className="text-white">Start Free Assessment</p>
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

      {/* ================= WHY AWARE ================= */}
      <section
        id="why-aware"
        className="bg-white pb-20 px-8"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">
            Why being aware matters?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="  p-6 bg-blue-50 rounded-2xl shadow-sm
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl mb-4">🧠</div>
              <h4 className="font-bold text-xl mb-2">Early Detection</h4>
              <p className="text-slate-600">
                Recognizing stress symptoms early prevents long-term exhaustion.
              </p>
            </div>

            <div className="  p-6 bg-blue-50 rounded-2xl shadow-sm
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl mb-4">📈</div>
              <h4 className="font-bold text-xl mb-2">Better Focus</h4>
              <p className="text-slate-600">
                Managing stress improves concentration and performance.
              </p>
            </div>

            <div className="  p-6 bg-blue-50 rounded-2xl shadow-sm
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl mb-4">🌱</div>
              <h4 className="font-bold text-xl mb-2">Personal Growth</h4>
              <p className="text-slate-600">
                Self-awareness builds resilience and emotional intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="bg-white pb-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="  p-6 bg-blue-50 rounded-2xl shadow-sm
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl mb-4">📝</div>
              <h4 className="font-semibold text-lg mb-2">
                Answer Questions
              </h4>
              <p className="text-slate-600">
                Fill out a short questionnaire about your daily stress patterns.
              </p>
            </div>

            <div className="  p-6 bg-blue-50 rounded-2xl shadow-sm
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl mb-4">🤖</div>
              <h4 className="font-semibold text-lg mb-2">
                System Analysis
              </h4>
              <p className="text-slate-600">
                Your answers are processed using a trained prediction model.
              </p>
            </div>

            <div className="  p-6 bg-blue-50 rounded-2xl shadow-sm
                transition-all duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg">
              <div className="text-3xl mb-4">📊</div>
              <h4 className="font-semibold text-lg mb-2">
                Get Result
              </h4>
              <p className="text-slate-600">
                Receive insights about your stress level instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        id="cta"
        className="bg-blue-600 py-20 px-8 text-center text-white"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Understand Your Stress Level?
        </h3>

        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          Take a few minutes to reflect on your mental well-being
          and receive instant insights.
        </p>

        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition"
        >
          <p className='text-white'>Start Assessment</p>
        </button>
      </section>

      <Footer />

      {/* ================= MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
            
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2"
            >
              ✕
            </button>

            <div className="p-6">
              <StressQuestionnaire />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
