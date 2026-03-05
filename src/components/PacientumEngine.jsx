export default function PacientumEngine() {
    const pillars = [
        {
            icon: 'shield',
            title: 'Escudo Zod de Inmutabilidad',
            description:
                'Bloqueo automático de guardado ante incongruencias matemáticas (Ej. Diferencial leucocitaria ≠ 100). Validación estricta en tiempo real antes de persistir datos.',
            color: 'emerald',
        },
        {
            icon: 'policy',
            title: 'Auditoría ISO 15189',
            description:
                'Trazabilidad total de cada acción, usuario y timestamp. Registro forense de operaciones para cumplir con los estándares de acreditación.',
            color: 'purple',
        },
        {
            icon: 'analytics',
            title: 'Inteligencia de Riesgos (ROI)',
            description:
                'Registro analítico de errores prevenidos para calcular el ahorro financiero del laboratorio. Métricas de impacto en tiempo real.',
            color: 'blue',
        },
        {
            icon: 'memory',
            title: 'Inyección Preanalítica',
            description:
                'Metadatos automáticos en tiempo real sobre el estado de la muestra. Captura de condiciones preanalíticas antes del procesamiento.',
            color: 'amber',
        },
    ];

    const colorMap = {
        emerald: {
            text: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            hoverBorder: 'hover:border-emerald-400/40',
            glow: 'hover:shadow-[0_0_35px_rgba(52,211,153,0.07)]',
        },
        purple: {
            text: 'text-purple-400',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            hoverBorder: 'hover:border-purple-400/40',
            glow: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.07)]',
        },
        blue: {
            text: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            hoverBorder: 'hover:border-blue-400/40',
            glow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.07)]',
        },
        amber: {
            text: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            hoverBorder: 'hover:border-amber-400/40',
            glow: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.07)]',
        },
    };

    return (
        <div className="flex flex-col gap-14 w-full">

            {/* ─── HERO HEADER ─── */}
            <section className="flex flex-col gap-5 pt-4">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-purple-400 text-[20px]">settings_system_daydream</span>
                    <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                        ENGINE.MODULE // FLAGSHIP.PRODUCT
                    </span>
                </div>

                <h1
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Paciéntum
                    </span>
                    <span className="text-slate-500 font-medium"> // </span>
                    <span className="text-white">Core Engine</span>
                </h1>

                <p className="text-slate-400 text-lg leading-relaxed max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Sistema de Información de Laboratorio (LIS) de próxima generación. Construido para{' '}
                    <span className="text-emerald-400 font-semibold">eliminar el error humano</span> mediante validación
                    matemática estricta y trazabilidad{' '}
                    <span className="text-purple-400 font-semibold">ISO 15189</span>.
                </p>
            </section>

            {/* ─── FEATURE GRID (4 PILLARS) ─── */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-slate-500 text-[18px]">hub</span>
                    <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                        CORE.PILLARS // ARCHITECTURE.FEATURES
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pillars.map((p) => {
                        const c = colorMap[p.color];
                        return (
                            <div
                                key={p.title}
                                className={`group relative bg-[#0d131f]/80 backdrop-blur-xl border ${c.border} ${c.hoverBorder} ${c.glow} rounded-2xl p-7 md:p-8 transition-all duration-500 overflow-hidden`}
                            >
                                {/* Corner Glow */}
                                <div className={`absolute -top-8 -right-8 w-28 h-28 ${c.bg} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                                {/* Icon */}
                                <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center mb-5`}>
                                    <span className={`material-symbols-outlined ${c.text} text-[22px]`}>{p.icon}</span>
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-white text-lg font-bold mb-2"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    {p.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {p.description}
                                </p>

                                {/* Bottom Accent */}
                                <div className={`absolute bottom-0 left-0 w-full h-[2px] ${c.bg} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ─── CODE FLEX: MOCK TERMINAL ─── */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <span className="material-symbols-outlined text-slate-500 text-[18px]">code</span>
                    <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                        SOURCE.PREVIEW // QUALITY.SHIELD
                    </span>
                </div>

                <div className="bg-[#0d131f] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Terminal Title Bar */}
                    <div className="flex items-center gap-3 px-5 py-3.5 bg-[#0a0f18] border-b border-slate-800">
                        {/* macOS dots */}
                        <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                        </div>
                        <span className="font-mono text-xs text-slate-500 ml-2">
                            ~/pacientum/src/schemas/differential.schema.ts
                        </span>
                    </div>

                    {/* Code Block */}
                    <div className="p-6 md:p-8 overflow-x-auto">
                        <pre className="font-mono text-sm leading-7">
                            {/* Line 1 - Comment */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">1</span>
                                <span className="text-slate-500 italic">{'// Paciéntum Quality Shield: Validation Schema'}</span>
                            </div>

                            {/* Line 2 - Export */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">2</span>
                                <span>
                                    <span className="text-purple-400">export</span>
                                    <span className="text-slate-300">{' '}</span>
                                    <span className="text-purple-400">const</span>
                                    <span className="text-slate-300">{' '}</span>
                                    <span className="text-blue-300">DifferentialSchema</span>
                                    <span className="text-slate-300">{' = '}</span>
                                    <span className="text-emerald-400">z</span>
                                    <span className="text-slate-300">.</span>
                                    <span className="text-yellow-300">object</span>
                                    <span className="text-slate-300">{'({'}</span>
                                </span>
                            </div>

                            {/* Line 3 - neutrofilos */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">3</span>
                                <span>
                                    <span className="text-slate-300">{'  '}</span>
                                    <span className="text-blue-300">neutrofilos</span>
                                    <span className="text-slate-300">{': '}</span>
                                    <span className="text-emerald-400">z</span>
                                    <span className="text-slate-300">.</span>
                                    <span className="text-yellow-300">number</span>
                                    <span className="text-slate-300">().</span>
                                    <span className="text-yellow-300">min</span>
                                    <span className="text-slate-300">(</span>
                                    <span className="text-amber-300">0</span>
                                    <span className="text-slate-300">).</span>
                                    <span className="text-yellow-300">max</span>
                                    <span className="text-slate-300">(</span>
                                    <span className="text-amber-300">100</span>
                                    <span className="text-slate-300">),</span>
                                </span>
                            </div>

                            {/* Line 4 - linfocitos */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">4</span>
                                <span>
                                    <span className="text-slate-300">{'  '}</span>
                                    <span className="text-blue-300">linfocitos</span>
                                    <span className="text-slate-300">{': '}</span>
                                    <span className="text-emerald-400">z</span>
                                    <span className="text-slate-300">.</span>
                                    <span className="text-yellow-300">number</span>
                                    <span className="text-slate-300">().</span>
                                    <span className="text-yellow-300">min</span>
                                    <span className="text-slate-300">(</span>
                                    <span className="text-amber-300">0</span>
                                    <span className="text-slate-300">).</span>
                                    <span className="text-yellow-300">max</span>
                                    <span className="text-slate-300">(</span>
                                    <span className="text-amber-300">100</span>
                                    <span className="text-slate-300">),</span>
                                </span>
                            </div>

                            {/* Line 5 - monocitos */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">5</span>
                                <span>
                                    <span className="text-slate-300">{'  '}</span>
                                    <span className="text-blue-300">monocitos</span>
                                    <span className="text-slate-300">{': '}</span>
                                    <span className="text-emerald-400">z</span>
                                    <span className="text-slate-300">.</span>
                                    <span className="text-yellow-300">number</span>
                                    <span className="text-slate-300">().</span>
                                    <span className="text-yellow-300">min</span>
                                    <span className="text-slate-300">(</span>
                                    <span className="text-amber-300">0</span>
                                    <span className="text-slate-300">).</span>
                                    <span className="text-yellow-300">max</span>
                                    <span className="text-slate-300">(</span>
                                    <span className="text-amber-300">100</span>
                                    <span className="text-slate-300">),</span>
                                </span>
                            </div>

                            {/* Line 6 - spread comment */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">6</span>
                                <span className="text-slate-500 italic">{'  // ...'}</span>
                            </div>

                            {/* Line 7 - refine */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">7</span>
                                <span>
                                    <span className="text-slate-300">{'}).'}</span>
                                    <span className="text-yellow-300">refine</span>
                                    <span className="text-slate-300">{'(('}</span>
                                    <span className="text-orange-300">data</span>
                                    <span className="text-slate-300">{') => '}</span>
                                    <span className="text-yellow-300">sum</span>
                                    <span className="text-slate-300">{'('}</span>
                                    <span className="text-orange-300">data</span>
                                    <span className="text-slate-300">{') === '}</span>
                                    <span className="text-amber-300">100</span>
                                    <span className="text-slate-300">{', {'}</span>
                                </span>
                            </div>

                            {/* Line 8 - message */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">8</span>
                                <span>
                                    <span className="text-slate-300">{'  '}</span>
                                    <span className="text-blue-300">message</span>
                                    <span className="text-slate-300">{': '}</span>
                                    <span className="text-red-400">{'"🚨 ERROR CRÍTICO: La fórmula debe sumar 100%. Guardado bloqueado."'}</span>
                                </span>
                            </div>

                            {/* Line 9 - close */}
                            <div className="flex">
                                <span className="text-slate-600 select-none w-8 text-right mr-6 flex-shrink-0">9</span>
                                <span className="text-slate-300">{'});'}</span>
                            </div>
                        </pre>
                    </div>

                    {/* Terminal Status Bar */}
                    <div className="flex items-center justify-between px-5 py-2.5 bg-[#0a0f18] border-t border-slate-800">
                        <span className="font-mono text-[10px] text-slate-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            TypeScript · UTF-8 · Zod v3.23
                        </span>
                        <span className="font-mono text-[10px] text-slate-600">
                            Ln 9, Col 3
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}
