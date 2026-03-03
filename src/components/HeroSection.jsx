export default function HeroSection() {
    return (
        <section className="slide bg-slate-950 border-b-8 border-teal-600" id="perfil">
            <span className="slide-number">01</span>
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text Content */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-teal-500"></span>
                        <span className="text-teal-400 font-bold tracking-[0.4em] text-xs uppercase underline underline-offset-8">
                            Introducción
                        </span>
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none mb-8 text-white">
                        Arquitectura para el <span className="text-teal-500">Diagnóstico</span>.
                    </h1>
                    <p className="text-xl lg:text-2xl text-slate-400 leading-relaxed font-light mb-10 max-w-xl">
                        Transformación de operaciones pre-analíticas bajo rigor{' '}
                        <span className="text-white font-semibold">ISO 15189</span>. Código auditable que protege vidas.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-teal-500/10 border border-teal-500/20 px-6 py-4 rounded-full flex items-center gap-3">
                            <span className="material-symbols-outlined text-teal-400">shield</span>
                            <span className="text-sm font-bold tracking-wide">COMPLIANCE DRIVEN</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-full flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">database</span>
                            <span className="text-sm font-bold tracking-wide text-slate-300">LIMS EXPERTISE</span>
                        </div>
                    </div>
                </div>

                {/* Right: Visual Element */}
                <div className="relative hidden lg:block">
                    <div className="aspect-square bg-gradient-to-br from-teal-500/20 to-transparent rounded-full flex items-center justify-center border border-teal-500/10">
                        <span className="material-symbols-outlined text-[16rem] text-teal-500/20 select-none">
                            biotech
                        </span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-slate-900 p-8 border-l-4 border-teal-500 max-w-sm shadow-2xl">
                        <p className="text-slate-300 italic text-sm leading-relaxed">
                            &quot;En HealthTech, el código es un dispositivo médico. Debe ser tan seguro como el bisturí de un cirujano.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
