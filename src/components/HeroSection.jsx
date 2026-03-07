export default function HeroSection() {
    return (
        <section className="slide bg-slate-950 border-b border-slate-800/50" id="perfil">
            <span className="slide-number">01</span>
            <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text Content */}
                <div>
                    {/* Badge — animated ping */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-300 text-xs font-semibold tracking-wide">
                            Disponible para Liderazgo Tech &amp; Salud
                        </span>
                    </div>

                    {/* H1 */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-white" style={{ fontFamily: 'Space Grotesk' }}>
                        Q. Francisco Javier{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            | HealthTech Architect &amp; Clinical Operations Leader
                        </span>
                    </h1>

                    {/* Executive Summary */}
                    <p className="text-base lg:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl">
                        Especialista en la convergencia de{' '}
                        <span className="text-white font-semibold">Sistemas de Gestión de Calidad (ISO 9001:2015)</span>{' '}
                        y arquitectura de software escalable. Experto en el dominio de{' '}
                        <span className="text-white font-semibold">flujos de trabajo, automatizaciones, control documental, normatividad y trazabilidad</span>{' '}
                        clínica. Diseño soluciones tecnológicas como{' '}
                        <span className="text-white font-semibold">Pacientum</span>, donde el rigor científico se une a la eficiencia digital para optimizar operaciones y garantizar la{' '}
                        <span className="text-white font-semibold">seguridad del paciente</span>.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#vault"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                        >
                            <span className="material-symbols-outlined text-lg">local_library</span>
                            Explorar la Bóveda Clínica
                        </a>
                        <a
                            href="#contacto"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700 hover:border-slate-500 rounded-xl transition-all duration-200 hover:bg-white/5"
                        >
                            <span className="material-symbols-outlined text-lg">mail</span>
                            Contactar
                        </a>
                    </div>
                </div>

                {/* Right: Visual Element */}
                <div className="relative hidden lg:block">
                    <div className="aspect-square bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent rounded-full flex items-center justify-center border border-blue-500/10">
                        <span className="material-symbols-outlined text-[16rem] text-blue-500/15 select-none">
                            biotech
                        </span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-[#0d131f] p-8 border-l-4 border-blue-500 max-w-sm shadow-2xl rounded-r-lg">
                        <p className="text-slate-300 italic text-sm leading-relaxed">
                            &quot;En HealthTech, el código es un dispositivo médico. Debe ser tan seguro como el bisturí de un cirujano.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
