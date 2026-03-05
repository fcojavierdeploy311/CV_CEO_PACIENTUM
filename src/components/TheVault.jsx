import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getCertificates } from '../services/certificateService';
import { getCloudinaryThumbnailUrl } from '../services/cloudinaryService';
import UploadCertificateModal from './UploadCertificateModal';
import PdfViewerModal from './PdfViewerModal';
import AuthModal from './AuthModal';

const categories = ['Todos', 'Certificación', 'Diplomado', 'Congreso', 'Curso'];

export default function TheVault() {
    const [filter, setFilter] = useState('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [pendingEditCert, setPendingEditCert] = useState(null);
    const [firestoreCerts, setFirestoreCerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    // PDF Viewer
    const [viewerCert, setViewerCert] = useState(null);

    // Track authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    // Fetch certificates from Firestore on mount
    const loadFirestoreCerts = useCallback(async () => {
        try {
            setIsLoading(true);
            const certs = await getCertificates();
            setFirestoreCerts(certs);
        } catch (err) {
            console.error('Error al cargar certificados de Firestore:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFirestoreCerts();
    }, [loadFirestoreCerts]);

    const allCertificates = firestoreCerts;

    const filteredData = filter === 'Todos'
        ? allCertificates
        : allCertificates.filter(item => item.category === filter);

    function handleUploadSuccess() {
        setEditingCert(null);
        loadFirestoreCerts();
    }

    function handleEdit(e, cert) {
        e.stopPropagation(); // Don't trigger card click
        if (!currentUser) {
            setPendingEditCert(cert);
            setIsAuthModalOpen(true);
            return;
        }
        setEditingCert(cert);
        setIsModalOpen(true);
    }

    function handleOpenNewUpload() {
        if (!currentUser) {
            setPendingEditCert(null);
            setIsAuthModalOpen(true);
            return;
        }
        setEditingCert(null);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setEditingCert(null);
    }

    function handleAuthSuccess() {
        setIsAuthModalOpen(false);
        if (pendingEditCert) {
            setEditingCert(pendingEditCert);
            setPendingEditCert(null);
            setIsModalOpen(true);
        }
    }

    function handleCardClick(cert) {
        if (cert.fileUrl) {
            setViewerCert(cert);
        }
    }

    async function handleLogout() {
        try {
            await signOut(auth);
        } catch (err) {
            console.error('Error al cerrar sesión:', err);
        }
    }

    return (
        <div className="vault-protected flex flex-col gap-8 w-full animate-in fade-in duration-700">

            {/* SECURITY BANNER */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-4 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <span className="material-symbols-outlined text-red-400 text-3xl">lock</span>
                <div className="flex-1">
                    <h2 className="text-red-400 font-bold text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                        BÓVEDA DE SOLO LECTURA
                    </h2>
                    <p className="text-red-300/80 text-sm mt-1">
                        Descarga e impresión deshabilitadas bajo protocolos de Propiedad Intelectual.
                        Cualquier intento de extracción está estrictamente monitoreado.
                    </p>
                </div>
                {currentUser && (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-red-400 text-xs border border-slate-800 hover:border-red-500/30 rounded-lg transition-all duration-200 shrink-0"
                        title={`Cerrar sesión (${currentUser.email})`}
                    >
                        <span className="material-symbols-outlined text-[14px]">logout</span>
                        Salir
                    </button>
                )}
            </div>

            <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-4xl text-white font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
                        Documentación Clasificada
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Repositorio central de certificaciones y avales técnicos (Total: {allCertificates.length} registros).
                    </p>
                </div>
                {currentUser && (
                    <button
                        onClick={handleOpenNewUpload}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 whitespace-nowrap"
                    >
                        <span className="material-symbols-outlined text-lg">upload_file</span>
                        Subir Certificado
                    </button>
                )}
            </header>

            {/* FILTERS */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${filter === cat
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                            : 'bg-[#0d131f] text-slate-400 border-slate-700 hover:border-slate-500'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* LOADING STATE */}
            {isLoading && (
                <div className="flex items-center justify-center gap-2 py-4 text-slate-500">
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    <span className="text-sm">Cargando certificados...</span>
                </div>
            )}

            {/* VAULT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map(cert => {
                    const hasPdf = Boolean(cert.fileUrl);
                    const thumbnailUrl = getCloudinaryThumbnailUrl(cert.fileUrl);

                    return (
                        <div
                            key={cert.id}
                            onClick={() => handleCardClick(cert)}
                            className={`group relative bg-[#0d131f] border rounded-xl overflow-hidden transition-all duration-300 ${hasPdf
                                    ? 'border-slate-800 hover:border-blue-500/50 cursor-pointer hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]'
                                    : 'border-slate-800/50 hover:border-slate-700'
                                }`}
                        >
                            {/* IMAGE / THUMBNAIL CONTAINER */}
                            <div
                                className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden"
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                {/* SHIELD OVERLAY */}
                                <div className="absolute inset-0 z-30 bg-transparent block" title="Contenido Protegido"></div>

                                {thumbnailUrl ? (
                                    /* Cloudinary-generated thumbnail */
                                    <>
                                        <img
                                            src={thumbnailUrl}
                                            alt={cert.title}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:scale-[1.03]"
                                            draggable="false"
                                            loading="lazy"
                                        />
                                        {/* View overlay on hover */}
                                        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium">
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                                Ver Documento
                                            </div>
                                        </div>
                                    </>
                                ) : hasPdf ? (
                                    /* Has PDF but no thumbnail (non-Cloudinary URL) */
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 border-b border-slate-800">
                                        <span className="material-symbols-outlined text-emerald-500/60 text-5xl">picture_as_pdf</span>
                                        <span className="text-emerald-400/70 text-xs font-mono">PDF Disponible</span>
                                        <div className="flex items-center gap-1.5 text-blue-400/60 text-[11px]">
                                            <span className="material-symbols-outlined text-[14px]">visibility</span>
                                            Clic para ver
                                        </div>
                                    </div>
                                ) : (
                                    /* No PDF at all */
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 border-b border-slate-800/50 bg-slate-900/50">
                                        <span className="material-symbols-outlined text-slate-700 text-5xl">draft</span>
                                        <span className="text-slate-600 text-[11px] font-medium tracking-wide uppercase">Pendiente de adjuntar</span>
                                    </div>
                                )}

                                {/* HIGH IMPACT BADGE */}
                                {cert.highImpact && (
                                    <div className="absolute top-3 right-3 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-300 text-xs px-2 py-1 rounded shadow-lg z-40 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">star</span>
                                        Alto Impacto
                                    </div>
                                )}
                            </div>

                            {/* METADATA */}
                            <div className="p-4">
                                <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-emerald-400 text-[14px]">calendar_month</span>
                                    <span className="text-emerald-400 font-medium">{cert.date || 'Sin fecha'}</span>
                                </div>
                                <h3 className="text-white font-semibold leading-tight mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                                    {cert.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-3">
                                    {cert.issuer}
                                </p>

                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-800 rounded text-slate-300">
                                        {cert.category}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-800 rounded text-slate-300">
                                            {cert.hours} {typeof cert.hours === 'string' && cert.hours.includes('hrs') ? '' : 'hrs'}
                                        </span>
                                        {/* EDIT BUTTON */}
                                        <button
                                            onClick={(e) => handleEdit(e, cert)}
                                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:text-blue-300 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                            title={currentUser ? 'Editar certificado' : 'Iniciar sesión para editar'}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">
                                                {currentUser ? 'edit' : 'lock'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Tags */}
                                {cert.tags && cert.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {cert.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Upload / Edit Modal */}
            <UploadCertificateModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleUploadSuccess}
                editingCert={editingCert}
            />

            {/* Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => {
                    setIsAuthModalOpen(false);
                    setPendingEditCert(null);
                }}
                onSuccess={handleAuthSuccess}
            />

            {/* PDF Viewer Modal */}
            <PdfViewerModal
                isOpen={Boolean(viewerCert)}
                onClose={() => setViewerCert(null)}
                fileUrl={viewerCert?.fileUrl}
                title={viewerCert?.title}
            />

        </div>
    );
}
