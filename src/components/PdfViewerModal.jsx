// src/components/PdfViewerModal.jsx
import { useState } from 'react';

/**
 * Transforma una URL de PDF en Cloudinary a una imagen JPG de alta calidad
 * con marca de agua tiled "CV FJGS" diagonal.
 *
 * raw/upload/v123/folder/file.pdf
 *   → image/upload/f_jpg,pg_1,q_100,w_1200,dpr_2.0/l_text:Arial_20:CV%20FJGS,co_rgb:999999,o_15,fl_tiled,a_-30/v123/folder/file.pdf
 */
function getFlattenedImageUrl(fileUrl) {
    if (!fileUrl || !fileUrl.includes('cloudinary.com')) return null;

    const flatten = 'f_jpg,pg_1,q_auto:best,w_1200,dpr_2.0';
    const watermark = 'l_text:Arial_20:CV%20FJGS,co_rgb:999999,o_15,fl_tiled,a_-30';
    const transformations = `${flatten}/${watermark}`;

    if (fileUrl.includes('/raw/upload/')) {
        return fileUrl.replace('/raw/upload/', `/image/upload/${transformations}/`);
    }
    if (fileUrl.includes('/image/upload/')) {
        return fileUrl.replace('/image/upload/', `/image/upload/${transformations}/`);
    }
    return null;
}

export default function PdfViewerModal({ isOpen, onClose, fileUrl, title }) {
    const [scale, setScale] = useState(1);

    if (!isOpen || !fileUrl) return null;

    const imageUrl = getFlattenedImageUrl(fileUrl);

    const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
    const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
    const handleZoomReset = () => setScale(1);

    const zoomBtnClass =
        'relative z-50 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all duration-200';

    return (
        /* Focus Mode — fullscreen overlay that covers everything including Sidebar */
        <div className="fixed inset-0 z-[200] flex flex-col bg-slate-900/95 backdrop-blur-sm w-screen h-screen">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80 shrink-0 bg-[#080c14]/80">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-emerald-400 text-lg">verified</span>
                    </div>
                    <div className="min-w-0">
                        <h2
                            className="text-white font-bold text-base truncate"
                            style={{ fontFamily: 'Space Grotesk' }}
                        >
                            {title || 'Documento Certificado'}
                        </h2>
                        <p className="text-slate-500 text-[11px] font-mono">Prueba digital oficial — FJGS</p>
                    </div>
                </div>

                {/* Zoom controls + Close */}
                <div className="flex items-center gap-1.5 shrink-0">
                    {/* Zoom Out */}
                    <button
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                        className={zoomBtnClass}
                        title="Alejar"
                        style={{ opacity: scale <= 0.5 ? 0.35 : 1 }}
                    >
                        <span className="material-symbols-outlined text-[18px]">zoom_out</span>
                    </button>

                    {/* Zoom indicator */}
                    <span className="text-slate-500 text-[11px] font-mono w-10 text-center select-none">
                        {Math.round(scale * 100)}%
                    </span>

                    {/* Zoom In */}
                    <button
                        onClick={handleZoomIn}
                        disabled={scale >= 3}
                        className={zoomBtnClass}
                        title="Acercar"
                        style={{ opacity: scale >= 3 ? 0.35 : 1 }}
                    >
                        <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                    </button>

                    {/* Reset / Fit */}
                    <button
                        onClick={handleZoomReset}
                        className={zoomBtnClass}
                        title="Ajustar a pantalla"
                    >
                        <span className="material-symbols-outlined text-[18px]">fit_screen</span>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-slate-700 mx-1" />

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="relative z-50 w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 transition-all duration-200"
                        title="Cerrar visor"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>
            </div>

            {/* Image Viewer — flex centering at scale=1, overflow scroll on zoom */}
            <div
                className="flex-1 w-full overflow-auto"
                onContextMenu={(e) => e.preventDefault()}
            >
                {imageUrl ? (
                    <div
                        className={`select-none p-4 ${scale === 1 ? 'flex items-center justify-center w-full h-full' : ''}`}
                    >
                        <div
                            className="relative inline-block"
                            style={{
                                width: scale === 1 ? undefined : `${scale * 100}%`,
                                maxWidth: scale === 1 ? '100%' : 'none',
                                transition: 'width 0.2s ease-in-out',
                            }}
                        >
                            <img
                                src={imageUrl}
                                onContextMenu={(e) => e.preventDefault()}
                                alt={`Certificado: ${title || 'Documento'}`}
                                className="rounded-lg shadow-2xl shadow-black/50 pointer-events-none"
                                draggable="false"
                                style={{
                                    maxWidth: scale === 1 ? '100%' : 'none',
                                    maxHeight: scale === 1 ? 'calc(100vh - 80px)' : 'none',
                                    width: scale === 1 ? 'auto' : '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                }}
                            />
                            {/* Shield overlay — matches image size, blocks drag */}
                            <div
                                className="absolute inset-0 z-10 bg-transparent cursor-default rounded-lg"
                                title="Contenido protegido — CV FJGS"
                            />
                        </div>
                    </div>
                ) : (
                    /* No flattened URL available — closed fallback (no external link) */
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-500">
                        <span className="material-symbols-outlined text-5xl text-slate-600">image_not_supported</span>
                        <p className="text-sm">No se pudo generar la vista previa del documento.</p>
                        <p className="text-slate-600 text-xs">Contacte al administrador si el problema persiste.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
