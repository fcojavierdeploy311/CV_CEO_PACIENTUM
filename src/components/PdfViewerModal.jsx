// src/components/PdfViewerModal.jsx
import { useState, useEffect, useRef } from 'react';

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
    const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
    const imgRef = useRef(null);
    const scrollRef = useRef(null);

    // Collapse sidebar on open, restore on close
    useEffect(() => {
        if (!isOpen) return;

        window.dispatchEvent(new CustomEvent('sidebar:collapse'));

        return () => {
            window.dispatchEvent(new CustomEvent('sidebar:expand'));
        };
    }, [isOpen]);

    // Reset zoom when modal opens with a new file
    useEffect(() => {
        setScale(1);
    }, [fileUrl]);

    // Scroll to top-center when zoom changes
    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
            container.scrollTo({ left: Math.max(0, scrollLeft), top: 0, behavior: 'smooth' });
        }
    }, [scale]);

    if (!isOpen || !fileUrl) return null;

    const imageUrl = getFlattenedImageUrl(fileUrl);

    const handleZoomIn = () => setScale((s) => Math.min(+(s + 0.1).toFixed(2), 3));
    const handleZoomOut = () => setScale((s) => Math.max(+(s - 0.1).toFixed(2), 0.5));
    const handleZoomReset = () => setScale(1);

    // Capture the RENDERED (on-screen) image size — NOT naturalWidth.
    // naturalWidth from Cloudinary is ~2400px (w_1200 + dpr_2.0), which is
    // much larger than the constrained display size. Using it would make
    // the spacer div enormous and zoom would appear to jump.
    const handleImageLoad = () => {
        if (imgRef.current) {
            setNaturalSize({
                w: imgRef.current.offsetWidth,
                h: imgRef.current.offsetHeight,
            });
        }
    };

    // Calculate spacer dimensions so scroll container respects scaled size
    const displayW = naturalSize.w > 0 ? naturalSize.w * scale : 0;
    const displayH = naturalSize.h > 0 ? naturalSize.h * scale : 0;

    const zoomBtnBase =
        'w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-white transition-all duration-200';

    const ZOOM_PRESETS = [0.5, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.5, 2];

    return (
        /* Focus Mode — fullscreen overlay that covers everything including Sidebar */
        <div className="fixed inset-0 z-[200] flex flex-col bg-[#0b1120] w-screen h-screen">

            {/* ─── Premium Header / Toolbar ─── */}
            <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-800/60 shrink-0 bg-[#0d131f]/95 backdrop-blur-xl">

                {/* Left: Document Title */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-emerald-400 text-lg">verified</span>
                    </div>
                    <div className="min-w-0">
                        <h2
                            className="text-white font-semibold text-sm truncate"
                            style={{ fontFamily: 'Space Grotesk' }}
                        >
                            {title || 'Documento Certificado'}
                        </h2>
                        <p className="text-slate-500 text-[10px] font-mono tracking-wide">PRUEBA DIGITAL OFICIAL — FJGS</p>
                    </div>
                </div>

                {/* Center: Zoom Controls — grouped toolbar */}
                <div className="flex items-center gap-0.5 bg-slate-800/50 border border-slate-700/50 rounded-lg px-1 py-0.5">
                    {/* Zoom Out */}
                    <button
                        onClick={handleZoomOut}
                        disabled={scale <= 0.5}
                        className={`${zoomBtnBase} ${scale <= 0.5 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}`}
                        title="Alejar (−25%)"
                    >
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>

                    {/* Zoom indicator — clickable dropdown-style */}
                    <div className="relative group">
                        <button
                            onClick={handleZoomReset}
                            className="px-2 py-1 min-w-[52px] text-center text-slate-300 hover:text-white text-xs font-mono rounded-md hover:bg-white/10 transition-all duration-150"
                            title="Clic para restablecer al 100%"
                        >
                            {Math.round(scale * 100)}%
                        </button>
                        {/* Quick zoom presets on hover */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-[#0d131f] border border-slate-700 rounded-lg shadow-2xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[300] min-w-[80px]">
                            {ZOOM_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    onClick={() => setScale(preset)}
                                    className={`block w-full px-3 py-1.5 text-xs font-mono text-left transition-colors ${scale === preset
                                        ? 'text-cyan-400 bg-cyan-500/10'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                        }`}
                                >
                                    {Math.round(preset * 100)}%
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Zoom In */}
                    <button
                        onClick={handleZoomIn}
                        disabled={scale >= 3}
                        className={`${zoomBtnBase} ${scale >= 3 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}`}
                        title="Acercar (+25%)"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-5 bg-slate-700 mx-0.5" />

                    {/* Fit to screen */}
                    <button
                        onClick={handleZoomReset}
                        className={`${zoomBtnBase} hover:bg-white/10`}
                        title="Ajustar a pantalla"
                    >
                        <span className="material-symbols-outlined text-[18px]">fit_screen</span>
                    </button>
                </div>

                {/* Right: Close */}
                <button
                    onClick={onClose}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400/50 text-red-400 hover:text-red-300 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/10"
                    title="Cerrar visor (Esc)"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            {/* ─── Document Viewing Area ─── */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-auto bg-[#0f1623]"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                    /* Subtle dot pattern for premium feel */
                    backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            >
                {imageUrl ? (
                    /* 
                     * Spacer div: its dimensions = image natural size × scale.
                     * This is the KEY fix: the scroll container now has a child 
                     * whose actual dimensions match the scaled document, so 
                     * scrollbars appear/disappear correctly at every zoom level.
                     */
                    <div
                        className="select-none relative"
                        style={{
                            /* When zoomed out (scale<1), use min-width/min-height to center */
                            width: displayW > 0 ? Math.max(displayW + 48, '100%') : '100%',
                            minWidth: '100%',
                            minHeight: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: scale <= 1 ? 'center' : 'flex-start',
                            padding: '24px',
                        }}
                    >
                        <div
                            className="relative"
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: 'top center',
                                transition: 'transform 0.3s ease-out',
                                /* Ensure the transformed element's bounding space is accounted for */
                                marginBottom: displayH > 0 && scale > 1 ? (displayH - (naturalSize.h || 0)) : 0,
                            }}
                        >
                            {/* The document image — premium paper shadow */}
                            <img
                                ref={imgRef}
                                src={imageUrl}
                                onLoad={handleImageLoad}
                                onContextMenu={(e) => e.preventDefault()}
                                alt={`Certificado: ${title || 'Documento'}`}
                                className="rounded-lg pointer-events-none"
                                draggable="false"
                                style={{
                                    /* ALWAYS constrain — transform handles zoom visually */
                                    maxWidth: '100%',
                                    maxHeight: 'calc(100vh - 100px)',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    userSelect: 'none',
                                    WebkitUserSelect: 'none',
                                    /* Premium paper shadow */
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3), 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(148,163,184,0.08)',
                                }}
                            />
                            {/* Shield overlay — covers image at any scale, blocks drag */}
                            <div
                                className="absolute inset-0 z-10 bg-transparent cursor-default rounded-lg"
                                title="Contenido protegido — CV FJGS"
                            />
                        </div>
                    </div>
                ) : (
                    /* No flattened URL available — closed fallback (no external link) */
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-slate-500">
                        <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-slate-600">image_not_supported</span>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-slate-400">No se pudo generar la vista previa</p>
                            <p className="text-slate-600 text-xs mt-1">Contacte al administrador si el problema persiste.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

