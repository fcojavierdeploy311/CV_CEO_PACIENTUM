// src/components/ConfirmDeleteModal.jsx
import { useState } from 'react';

/**
 * Professional confirmation dialog for permanent certificate deletion.
 * Renders as a centered overlay with backdrop blur.
 */
export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, certTitle }) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    async function handleConfirm() {
        setIsDeleting(true);
        try {
            await onConfirm();
        } catch (err) {
            console.error('Error al eliminar:', err);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={!isDeleting ? onClose : undefined}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#0d131f] border border-slate-700 rounded-2xl shadow-2xl shadow-red-500/5 overflow-hidden">
                {/* Header — red accent */}
                <div className="px-6 pt-6 pb-4 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-red-400 text-2xl">delete_forever</span>
                    </div>
                    <div className="min-w-0">
                        <h3
                            className="text-white font-bold text-lg leading-tight"
                            style={{ fontFamily: 'Space Grotesk' }}
                        >
                            Eliminar Certificado
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">
                            Esta acción no se puede deshacer.
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 pb-4">
                    <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-lg">
                        <p className="text-slate-300 text-sm">
                            ¿Estás seguro de eliminar permanentemente{' '}
                            <span className="text-white font-semibold">"{certTitle}"</span>?
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                            El documento será eliminado de la base de datos. El archivo en Cloudinary
                            deberá limpiarse manualmente si es necesario.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl transition-all duration-200 disabled:opacity-40"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-red-500/20"
                    >
                        {isDeleting ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                                Eliminando...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-base">delete_forever</span>
                                Eliminar definitivamente
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
