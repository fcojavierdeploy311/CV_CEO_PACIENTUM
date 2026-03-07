export default function SystemOverview() {
    const metrics = [
        {
            value: '300+',
            label: 'Certificaciones Oficiales',
            sublabel: 'ISO, SEP, Clínicas',
            color: 'emerald',
            icon: 'verified',
        },
        {
            value: '15189',
            label: 'Arquitectura SGC',
            sublabel: 'Trazabilidad Total',
            color: 'blue',
            icon: 'shield',
        },
        {
            value: '100%',
            label: 'Propiedad Intelectual',
            sublabel: 'en Código Clínico',
            color: 'purple',
            icon: 'lock',
        },
    ];

    const accentMap = {
        emerald: {
            border: 'border-emerald-500/20',
            hoverBorder: 'hover:border-emerald-400/40',
            glow: 'hover:shadow-[0_0_40px_rgba(52,211,153,0.08)]',
            text: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            dot: 'bg-emerald-400',
        },
        blue: {
            border: 'border-blue-500/20',
            hoverBorder: 'hover:border-blue-400/40',
            glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]',
            text: 'text-blue-400',
            bg: 'bg-blue-500/10',
            dot: 'bg-blue-400',
        },
        purple: {
            border: 'border-purple-500/20',
            hoverBorder: 'hover:border-purple-400/40',
            glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.08)]',
            text: 'text-purple-400',
            bg: 'bg-purple-500/10',
            dot: 'bg-purple-400',
        },
    };

    return (
        <div className="flex flex-col gap-16 w-full">

            {/* ─── HERO SECTION ─── */}
            <section className="flex flex-col gap-8 pt-6 md:pt-12">

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">
                        Disponible para Liderazgo Tech & Salud
                    </span>
                </div>

                {/* Main Title */}
                <h1
                    className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-[1.1] tracking-tight max-w-4xl"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Q. Francisco Javier{' '}
                    <span className="block mt-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl">
                        HealthTech Architect & Clinical Operations Leader
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Especialista en la convergencia de{' '}
                    <span className="text-white font-semibold text-slate-900 dark:text-white">Sistemas de Gestión de Calidad (ISO 9001:2015)</span>{' '}
                    y arquitectura de software escalable. Experto en el dominio de{' '}
                    <span className="text-white font-semibold text-slate-900 dark:text-white">flujos de trabajo, automatizaciones, control documental, normatividad y trazabilidad</span>{' '}
                    clínica. Diseño soluciones tecnológicas como{' '}
                    <span className="text-white font-semibold text-slate-900 dark:text-white">Pacientum</span>, donde el rigor científico se une a la eficiencia digital para optimizar operaciones y garantizar la{' '}
                    <span className="text-white font-semibold text-slate-900 dark:text-white">seguridad del paciente</span>.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mt-2">
                    <a
                        href="#vault"
                        className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-lg text-sm tracking-wide transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                        <span className="material-symbols-outlined text-[18px]">local_library</span>
                        Explorar la Bóveda Clínica
                    </a>
                    <a
                        href="#contacto"
                        className="px-8 py-3.5 border border-slate-600 text-slate-300 font-medium rounded-lg text-sm tracking-wide hover:border-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                        Contactar
                    </a>
                </div>
            </section>

            {/* ─── METRICS GRID ─── */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-slate-500 text-[18px]">monitoring</span>
                    <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                        MÉTRICAS DE SISTEMA // CORE.DIAGNOSTICS
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {metrics.map((m) => {
                        const a = accentMap[m.color];
                        return (
                            <div
                                key={m.value}
                                className={`group relative bg-[#0a0f18]/80 backdrop-blur-xl border ${a.border} ${a.hoverBorder} ${a.glow} rounded-2xl p-8 transition-all duration-500 overflow-hidden`}
                            >
                                {/* Corner Glow */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 ${a.bg} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center mb-6`}>
                                    <span className={`material-symbols-outlined ${a.text} text-[20px]`}>{m.icon}</span>
                                </div>

                                {/* Value */}
                                <p
                                    className={`text-6xl md:text-7xl font-extrabold ${a.text} leading-none tracking-tighter`}
                                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                                >
                                    {m.value}
                                </p>

                                {/* Labels */}
                                <h3 className="text-white font-semibold text-lg mt-4" style={{ fontFamily: 'Space Grotesk' }}>
                                    {m.label}
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">{m.sublabel}</p>

                                {/* Bottom Border Accent */}
                                <div className={`absolute bottom-0 left-0 w-full h-[2px] ${a.bg} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
