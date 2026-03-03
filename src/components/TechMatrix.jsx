const columns = [
    {
        icon: 'terminal',
        title: 'Ingeniería',
        bg: 'bg-slate-50',
        items: [
            { name: 'React / Next.js', badge: 'FRONT' },
            { name: 'Node.js (Nest)', badge: 'BACK' },
            { name: 'PostgreSQL / SQL', badge: 'DATA' },
        ],
    },
    {
        icon: 'gavel',
        title: 'Regulatorio',
        bg: 'bg-slate-100',
        items: [
            { name: 'ISO 15189:2022', icon: 'verified' },
            { name: 'NOM-007-SSA3', icon: 'verified' },
            { name: 'FDA 21 CFR Part 11', icon: 'verified' },
        ],
    },
    {
        icon: 'analytics',
        title: 'Garantía',
        bg: 'bg-slate-200',
        borderColor: 'border-slate-300',
        items: [
            { name: 'Audit Trail Systems', icon: 'history' },
            { name: 'V&V de Software', icon: 'fact_check' },
            { name: 'Interoperabilidad HL7', icon: 'hub' },
        ],
    },
];

export default function TechMatrix() {
    return (
        <section className="slide bg-white text-slate-950" id="competencias">
            <span className="slide-number !text-slate-100">02</span>
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-px w-12 bg-teal-600"></span>
                            <span className="text-teal-600 font-bold tracking-[0.4em] text-xs uppercase">
                                Especialización
                            </span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-bold tracking-tight leading-none">
                            Matriz Técnica.
                        </h2>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-2">
                            Estado del Arte
                        </p>
                        <p className="text-sm font-medium text-slate-600">Full-Stack + Normativa Clínica</p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid lg:grid-cols-3 gap-1 px-4 lg:px-0">
                    {columns.map((col) => (
                        <div
                            key={col.title}
                            className={`group ${col.bg} p-10 hover:bg-teal-600 hover:text-white transition-all duration-500`}
                        >
                            <span className="material-symbols-outlined text-4xl mb-6 text-teal-600 group-hover:text-white">
                                {col.icon}
                            </span>
                            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest">{col.title}</h3>
                            <ul className="space-y-4">
                                {col.items.map((item) => (
                                    <li
                                        key={item.name}
                                        className={`flex items-center justify-between border-b ${col.borderColor || 'border-slate-200'
                                            } group-hover:border-teal-400 pb-2`}
                                    >
                                        <span className="text-sm font-medium">{item.name}</span>
                                        {item.badge ? (
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 group-hover:bg-white/20 rounded">
                                                {item.badge}
                                            </span>
                                        ) : (
                                            <span className="material-symbols-outlined text-sm group-hover:text-white">
                                                {item.icon}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
