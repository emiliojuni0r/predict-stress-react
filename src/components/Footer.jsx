export default function Footer() {
    return (
        <footer
            id="footer"
            className="bg-slate-50 border-t border-slate-200 py-12"
        >
            <div className="max-w-7xl mx-auto px-8">
                <h3 className="text-center text-3xl font-bold mb-12">Our Team</h3>
                <div className="grid gap-8 md:grid-cols-3 text-center">
                    
                    {/* Member 1 */}
                    <div>
                        <p className="font-semibold text-slate-700">
                            Emilio Muhammad Hamsyah Junior
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            23/522018/SV/23568
                        </p>
                    </div>

                    {/* Member 2 */}
                    <div>
                        <p className="font-semibold text-slate-700">
                            Muhammad Al Fayyadh
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            23/520499/SV/23248
                        </p>
                    </div>

                    {/* Member 3 */}
                    <div>
                        <p className="font-semibold text-slate-700">
                            Deandra Santoso
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            23/517045/SV/22736
                        </p>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
                    © 2025 PPD Project Kelompok 5
                </div>
            </div>
        </footer>
    )
}
