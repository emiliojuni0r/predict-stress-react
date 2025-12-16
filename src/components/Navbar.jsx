export default function Navbar({ onTakeAssessment }) {
    return (
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto bg-slate-50">
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">LeCheckUrStressLevel.</h1>
            <button
                onClick={onTakeAssessment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all active:scale-95 shadow-md shadow-blue-100"
            >
                Take Assessment
            </button>
        </nav>
    )
}