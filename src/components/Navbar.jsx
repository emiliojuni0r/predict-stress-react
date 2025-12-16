export default function Navbar() {
    return (
        <nav className="bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                {/* Logo */}
                <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
                    PPD.
                </h1>

                {/* Menu */}
                <ul className="flex gap-6 text-slate-700 font-medium">
                    <li>
                        <a
                            href="#hero"
                            className="hover:text-blue-600 transition"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#why-aware"
                            className="hover:text-blue-600 transition"
                        >
                            Why Aware
                        </a>
                    </li>
                                        <li>
                        <a
                            href="#how-it-works"
                            className="hover:text-blue-600 transition"
                        >
                            How It Works
                        </a>
                    </li>
                    <li>
                        <a
                            href="#footer"
                            className="hover:text-blue-600 transition"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
