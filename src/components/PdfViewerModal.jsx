// src/components/PdfViewerModal.jsx

/**
 * Transforma una URL de Cloudinary raw a una URL que el navegador pueda renderizar inline.
 * - Cambia raw/upload → image/upload con fl_attachment:false
 * - Asegura que la URL termine en .pdf para que el navegador lo identifique
 */
function getInlineViewUrl(fileUrl) {
    if (!fileUrl) return null;

    // For Cloudinary raw URLs, use Google Docs Viewer as it handles PDFs reliably
    if (fileUrl.includes('cloudinary.com') && fileUrl.includes('/raw/upload/')) {
        // Option 1: Google Docs Viewer (most reliable cross-browser)
        return `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    }

    // For non-Cloudinary URLs, try direct embedding
    return fileUrl;
}

export default function PdfViewerModal({ isOpen, onClose, fileUrl, title }) {
    if (!isOpen || !fileUrl) return null;

    const viewerUrl = getInlineViewUrl(fileUrl);
    const directUrl = fileUrl;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-5xl bg-[#0d131f] border border-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10 flex flex-col"
                style={{ height: '90vh' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="material-symbols-outlined text-emerald-400 text-xl">picture_as_pdf</span>
                        <h2
                            className="text-white font-bold text-lg truncate"
                            style={{ fontFamily: 'Space Grotesk' }}
                        >
                            {title || 'Documento'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        {/* Fallback: external viewer link */}
                        <a
                            href={`https://docs.google.com/gview?url=${encodeURIComponent(directUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-blue-400 hover:text-blue-300 text-xs border border-blue-500/20 hover:border-blue-500/40 rounded-lg transition-all duration-200"
                            title="Abrir en visor externo"
                        >
                            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                            Visor externo
                        </a>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Security notice */}
                <div className="px-6 py-2 bg-red-500/5 border-b border-red-500/10 flex items-center gap-2 shrink-0">
                    <span className="material-symbols-outlined text-red-400 text-[14px]">lock</span>
                    <span className="text-red-300/70 text-[11px] font-medium">
                        Documento protegido — Solo visualización. Descarga e impresión deshabilitadas.
                    </span>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 relative bg-slate-950 min-h-0">
                    <iframe
                        src={viewerUrl}
                        title={title || 'Visor de Documento'}
                        width="100%"
                        height="100%"
                        className="absolute inset-0 w-full h-full border-0"
                        allow="autoplay"
                        style={{ minHeight: '500px' }}
                    />
                </div>
            </div>
        </div>
    );
}
