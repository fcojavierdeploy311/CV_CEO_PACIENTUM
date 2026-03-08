export default function DeploymentHistory() {
    const deployments = [
        {
            id: 'deploy-001',
            hash: 'a7f3c9e',
            status: 'RUNNING',
            title: 'QA Lead & Software Architect // Paciéntum',
            date: 'Current State',
            branch: 'main',
            tags: ['Next-Gen SGC', 'Zod', 'Data Immutability'],
            description:
                'Diseño de arquitectura LIS y despliegue del Protocolo \'Muralla China\' (DLP) blindando 104+ documentos estratégicos. Implementación de validaciones matemáticas inmutables.',
            color: 'emerald',
        },
        {
            id: 'deploy-002-vault',
            hash: 'd8a7c2b',
            status: 'RUNNING',
            title: 'Lead Architect & Developer // HealthTech Executive Vault',
            date: 'Production / Live',
            branch: 'production',
            tags: ['React', 'Tailwind CSS', 'Firebase', 'Git'],
            description:
                'Desarrollo de una Single Page Application (SPA) para la gestión de identidad corporativa. Arquitectura basada en componentes con un CMS personalizado en tiempo real (Firestore), sistema de divulgación progresiva para credenciales y despliegue continuo (CI/CD) de alta disponibilidad.',
            color: 'blue',
        },
        {
            id: 'deploy-002',
            hash: 'b4d1e8a',
            status: 'RUNNING',
            title: 'Full-Stack Ops & Automation Engineer',
            date: 'Deployment Phase',
            branch: 'ops/automation',
            tags: ['AppSheet', 'Serverless', 'Event-Driven'],
            description:
                'Desarrollo de ecosistema móvil (AppSheet) para Logística Inversa, reduciendo reclamos a < 3%. Configuración de automatizaciones Event-Driven (Make/Webhooks) para vigilancia financiera 24/7.',
            color: 'blue',
        },
        {
            id: 'deploy-003',
            hash: 'c2a0f5d',
            status: 'STABLE',
            title: 'Químico Biólogo & Especialista Preanalítico',
            date: 'Foundation Layer',
            branch: 'foundation/clinical',
            tags: ['ISO 15189', 'Linux', 'Clinical QA'],
            description:
                'Trazabilidad clínica y procesamiento analítico. Certificación oficial SEP-DGTVE en Sistemas Informáticos (421 Hrs) fusionando el rigor clínico con la administración de servidores Linux y bases de datos.',
            color: 'purple',
        },
    ];

    const colorMap = {
        emerald: {
            dot: 'bg-emerald-400',
            ping: 'bg-emerald-400',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
            bg: 'bg-emerald-500/10',
            glow: 'shadow-[0_0_12px_rgba(52,211,153,0.4)]',
            line: 'from-emerald-400/60',
        },
        blue: {
            dot: 'bg-blue-400',
            ping: 'bg-blue-400',
            text: 'text-blue-400',
            border: 'border-blue-500/30',
            bg: 'bg-blue-500/10',
            glow: 'shadow-[0_0_12px_rgba(59,130,246,0.4)]',
            line: 'from-blue-400/60',
        },
        purple: {
            dot: 'bg-purple-400',
            ping: 'bg-purple-400',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
            bg: 'bg-purple-500/10',
            glow: 'shadow-[0_0_12px_rgba(168,85,247,0.4)]',
            line: 'from-purple-400/60',
        },
    };

    return (
        <div className="flex flex-col gap-8 w-full">

            {/* ─── HEADER ─── */}
            <header className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-500 text-[18px]">terminal</span>
                    <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                        $ git log --oneline --graph // CAREER.DEPLOYMENTS
                    </span>
                </div>
                <h1
                    className="text-4xl md:text-5xl text-white font-bold tracking-tight"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Deployment History
                </h1>
                <p className="text-slate-400 max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Registro cronológico de despliegues profesionales. Cada nodo representa un estado activo del sistema.
                </p>
            </header>

            {/* ─── DEPLOYMENT LOG ─── */}
            <div className="relative pl-8 md:pl-12">

                {/* Vertical Timeline Line */}
                <div className="absolute left-[15px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-slate-700 via-slate-800 to-transparent"></div>

                <div className="flex flex-col gap-10">
                    {deployments.map((dep, idx) => {
                        const c = colorMap[dep.color];
                        const isActive = dep.status === 'RUNNING';

                        return (
                            <div key={dep.id} className="relative group">

                                {/* ── Node Dot ── */}
                                <div className="absolute -left-8 md:-left-12 top-2 flex items-center justify-center">
                                    <span className={`relative flex h-4 w-4`}>
                                        {isActive && (
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.ping} opacity-60`}></span>
                                        )}
                                        <span className={`relative inline-flex rounded-full h-4 w-4 ${c.dot} ${c.glow}`}></span>
                                    </span>
                                </div>

                                {/* ── Card ── */}
                                <div className={`bg-[#0d131f]/80 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8 transition-all duration-400 hover:border-slate-600 hover:shadow-[0_0_30px_rgba(148,163,184,0.05)]`}>

                                    {/* Top Meta Row */}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                                        {/* Commit Hash */}
                                        <span className={`font-mono text-xs ${c.text} bg-[#0a0f18] border ${c.border} px-2.5 py-1 rounded`}>
                                            {dep.hash}
                                        </span>

                                        {/* Status */}
                                        <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${c.text} flex items-center gap-1.5`}>
                                            {isActive && <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>}
                                            {dep.status}
                                        </span>

                                        {/* Branch */}
                                        <span className="font-mono text-xs text-slate-500 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">fork_right</span>
                                            {dep.branch}
                                        </span>

                                        {/* Date */}
                                        <span className="font-mono text-xs text-slate-600 ml-auto">
                                            {dep.date}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-white text-xl md:text-2xl font-bold mb-3"
                                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                    >
                                        {dep.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-400 leading-relaxed text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {dep.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-5">
                                        {dep.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* End of Log */}
                <div className="relative mt-10 pl-0">
                    <div className="absolute -left-8 md:-left-12 top-1 flex items-center justify-center">
                        <span className="w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-600"></span>
                    </div>
                    <p className="font-mono text-xs text-slate-600 tracking-widest">
            // END OF DEPLOYMENT LOG — {deployments.length} RECORDS
                    </p>
                </div>
            </div>
        </div>
    );
}
