const certifications = [
    {
        category: 'Estratégico',
        title: 'ISO 15189:2022',
        description: 'Diplomado en implementación de calidad y gestión de riesgos clínicos.',
    },
    {
        category: 'Tecnológico',
        title: 'Full-Stack Architect',
        description: 'Certificación técnica en diseño de aplicaciones web de alta escala.',
    },
    {
        category: 'Avanzado',
        title: 'Microservicios Salud',
        description: 'Arquitectura distribuida enfocada en interoperabilidad médica.',
    },
];

export default function CertificationsGallery() {
    return (
        <section className="slide bg-black text-white" id="normativo">
            <span className="slide-number">05</span>
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <span className="h-[1px] w-8 bg-teal-500"></span>
                        <span className="text-teal-500 font-bold tracking-[0.4em] text-xs uppercase">
                            Validación Final
                        </span>
                        <span className="h-[1px] w-8 bg-teal-500"></span>
                    </div>
                    <h2 className="text-6xl lg:text-8xl font-bold tracking-tight mb-8">Credenciales.</h2>
                </div>

                {/* Credential Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-24">
                    {certifications.map((cert) => (
                        <div
                            key={cert.title}
                            className="p-10 border border-white/10 hover:border-teal-500 transition-colors group"
                        >
                            <span className="text-[10px] font-bold text-teal-500 tracking-widest block mb-4 uppercase">
                                {cert.category}
                            </span>
                            <h4 className="text-xl font-bold mb-4">{cert.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-teal-900/10 border border-teal-500/20 p-12 rounded-3xl">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-shrink-0 w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center text-black">
                            <span className="material-symbols-outlined text-4xl font-bold">handshake</span>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold mb-4 text-teal-400">¿Hablamos de Calidad?</h4>
                            <p className="text-slate-300 text-lg leading-relaxed font-light">
                                Mi enfoque elimina la brecha entre el cumplimiento regulatorio &quot;en papel&quot; y la realidad operativa.
                                Software que automatiza la calidad para que tu laboratorio esté siempre listo para una auditoría sorpresa.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-8">
                                <a
                                    className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:text-teal-400 transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-teal-500">alternate_email</span>
                                    Enviar Mensaje
                                </a>
                                <a
                                    className="text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:text-teal-400 transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-teal-500">code</span>
                                    Ver Repositorio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
