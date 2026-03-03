export default function ReportEngine() {
    return (
        <section className="slide bg-teal-600 text-white" id="proyectos-1">
            <span className="slide-number">03</span>
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Case Study Card */}
                    <div className="order-2 lg:order-1">
                        <div className="bg-white/10 p-12 rounded-3xl backdrop-blur-sm border border-white/20">
                            <span className="text-[10px] font-extrabold tracking-[0.5em] uppercase mb-4 block text-teal-200">
                                Featured Case Study
                            </span>
                            <h3 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                                Motor de Reportes Clínicos.
                            </h3>
                            <div className="space-y-6 mb-10">
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-teal-600 text-lg">bolt</span>
                                    </div>
                                    <div>
                                        <p className="font-bold">Alta Performance</p>
                                        <p className="text-teal-50 text-sm">
                                            Reducción del 85% en tiempo de renderizado de folios masivos mediante React-PDF.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-teal-600 text-lg">qr_code_2</span>
                                    </div>
                                    <div>
                                        <p className="font-bold">Inmutabilidad &amp; Seguridad</p>
                                        <p className="text-teal-50 text-sm">
                                            Validación por QR dinámico y firmas encriptadas en cada reporte emitido.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Stats */}
                            <div className="pt-8 border-t border-white/20 flex gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold">85%</p>
                                    <p className="text-[8px] uppercase tracking-widest font-bold opacity-60">Velocidad</p>
                                </div>
                                <div className="w-px bg-white/20"></div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold">100%</p>
                                    <p className="text-[8px] uppercase tracking-widest font-bold opacity-60">Trazabilidad</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Title + Description */}
                    <div className="order-1 lg:order-2">
                        <span className="material-symbols-outlined text-[20rem] text-white/10 absolute -right-20 top-1/2 -translate-y-1/2 select-none">
                            picture_as_pdf
                        </span>
                        <div className="relative z-10">
                            <h2 className="text-7xl lg:text-9xl font-bold tracking-tighter text-teal-900 leading-[0.8] mb-8">
                                REPORT ENGINE
                            </h2>
                            <p className="text-xl text-teal-50 leading-relaxed font-light">
                                Un ecosistema agnóstico capaz de normalizar datos de HL7, SQL y CSV en documentos clínicos con calidad de exportación e integridad garantizada.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
