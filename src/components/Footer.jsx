export default function Footer() {
    return (
        <footer className="bg-black py-12 px-8 border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase">
                    © 2024 PACO — PORTAFOLIO TÉCNICO HEALTHTECH
                </p>
                <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">
                            Disponibilidad Q3 2024
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                        <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400">
                            LIMS Architecture Ready
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
