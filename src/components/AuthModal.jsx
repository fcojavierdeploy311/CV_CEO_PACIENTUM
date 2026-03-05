// src/components/AuthModal.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error('Error de autenticación:', err);
            const messages = {
                'auth/invalid-credential': 'Credenciales inválidas.',
                'auth/user-not-found': 'Usuario no encontrado.',
                'auth/wrong-password': 'Contraseña incorrecta.',
                'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
                'auth/invalid-email': 'Email inválido.',
            };
            setError(messages[err.code] || 'Error de autenticación. Verifica tus credenciales.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={!isLoading ? onClose : undefined}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#0d131f] border border-slate-700 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden">
                {/* Header glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" />

                <div className="p-8">
                    {/* Icon + Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 mb-4">
                            <span className="material-symbols-outlined text-blue-400 text-3xl">shield_person</span>
                        </div>
                        <h2
                            className="text-white text-2xl font-bold tracking-tight"
                            style={{ fontFamily: 'Space Grotesk' }}
                        >
                            Acceso Superadmin
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">
                            Autenticación requerida para operaciones de escritura.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">error</span>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@ejemplo.com"
                                required
                                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                    Autenticando...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">login</span>
                                    Iniciar Sesión
                                </>
                            )}
                        </button>
                    </form>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full mt-3 py-2 text-slate-500 hover:text-slate-300 text-sm transition-colors disabled:opacity-30"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
