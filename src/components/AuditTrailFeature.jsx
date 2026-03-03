const appendOnlyItems = [
    'No DELETE permissions',
    'JWT Signed Events',
    'Automatic Change Logs',
];

export default function AuditTrailFeature() {
    return (
        <section className="slide bg-slate-900 text-white" id="proyectos-2">
            <span className="slide-number">04</span>
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Text Content */}
                    <div>
                        <h2 className="text-7xl lg:text-9xl font-bold tracking-tighter text-slate-800 leading-[0.8] mb-8 uppercase">
                            Audit Trail.
                        </h2>
                        <p className="text-xl text-slate-400 leading-relaxed font-light mb-12">
                            Sistema de registro inmutable bajo estándar{' '}
                            <span className="text-white">FDA 21 CFR Part 11</span>. El corazón de la confianza en los datos clínicos.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <span className="text-teal-500 font-bold text-sm tracking-widest block uppercase">
                                    Inmutabilidad
                                </span>
                                <p className="text-xs text-slate-500">
                                    Triggers en base de datos para estados Previo/Posterior.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-teal-500 font-bold text-sm tracking-widest block uppercase">
                                    Timeline
                                </span>
                                <p className="text-xs text-slate-500">
                                    Visualización interactiva para auditores EMA/COFEPRIS.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: PostgreSQL Ledger Visualization */}
                    <div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-teal-500/20 blur-[120px] rounded-full"></div>
                            <div className="relative bg-slate-800/50 p-10 rounded-2xl border border-white/5 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-12">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        PostgreSQL Ledger
                                    </span>
                                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-1 bg-slate-700 w-full rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 w-3/4"></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="h-1 bg-teal-500 rounded-full"></div>
                                        <div className="h-1 bg-teal-500 rounded-full"></div>
                                        <div className="h-1 bg-slate-700 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="mt-12">
                                    <h4 className="text-xl font-bold mb-4">Arquitectura &quot;Append-Only&quot;</h4>
                                    <ul className="text-sm text-slate-400 space-y-3">
                                        {appendOnlyItems.map((item) => (
                                            <li key={item} className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-teal-500 text-sm">
                                                    radio_button_checked
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
