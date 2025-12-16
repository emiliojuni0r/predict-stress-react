import { useState } from "react"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-slate-50 border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">

                {/* Top Bar */}
                <div className="flex items-center justify-between ">

                    {/* Hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-2xl text-white bg-blue-500 rounded-lg w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        {open ? "✕" : "☰"}
                    </button>

                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
                        PPD.
                    </h1>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-8 text-slate-700 font-medium">
                        <li><a href="#hero" className="hover:text-blue-600">Home</a></li>
                        <li><a href="#why-aware" className="hover:text-blue-600">Why Aware</a></li>
                        <li><a href="#how-it-works" className="hover:text-blue-600">How It Works</a></li>
                        <li><a href="#footer" className="hover:text-blue-600">Contact</a></li>
                    </ul>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="md:hidden mt-4 rounded-2xl bg-white shadow">
                        <ul className="flex flex-col ">
                            {[
                                ["Home", "#hero"],
                                ["Why Aware", "#why-aware"],
                                ["How It Works", "#how-it-works"],
                                ["Contact", "#footer"],
                            ].map(([label, link]) => (
                                <li key={label}>
                                    <a
                                        href={link}
                                        onClick={() => setOpen(false)}
                                        className="block px-6 py-4 hover:bg-slate-50"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}
