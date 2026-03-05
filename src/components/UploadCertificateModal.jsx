// src/components/UploadCertificateModal.jsx
import { useState, useRef, useEffect } from 'react';
import { certificateSchema, fileSchema } from '../schemas/certificateSchema';
import { uploadPdfToCloudinary } from '../services/cloudinaryService';
import { saveCertificate, updateCertificate } from '../services/certificateService';

const CATEGORIES = ['Certificación', 'Diplomado', 'Congreso', 'Curso'];
const MODALITIES = ['Presencial', 'Virtual', 'Híbrido'];

const EMPTY_FORM = {
    title: '',
    issuer: '',
    date: '',
    hours: 'N/A',
    category: 'Certificación',
    modality: 'Virtual',
    highImpact: false,
    tags: '',
};

export default function UploadCertificateModal({ isOpen, onClose, onSuccess, editingCert }) {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStep, setUploadStep] = useState('');

    const isEditMode = Boolean(editingCert);

    // Pre-populate form when editing
    useEffect(() => {
        if (editingCert) {
            setFormData({
                title: editingCert.title || '',
                issuer: editingCert.issuer || '',
                date: editingCert.date || '',
                hours: editingCert.hours || 'N/A',
                category: editingCert.category || 'Certificación',
                modality: editingCert.modality || 'Virtual',
                highImpact: editingCert.highImpact || false,
                tags: Array.isArray(editingCert.tags) ? editingCert.tags.join(', ') : '',
            });
            setSelectedFile(null);
            setErrors({});
        } else {
            setFormData(EMPTY_FORM);
            setSelectedFile(null);
            setErrors({});
        }
    }, [editingCert]);

    if (!isOpen) return null;

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    function handleFileChange(e) {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        if (errors.file) {
            setErrors((prev) => ({ ...prev, file: undefined }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});

        // --- Step 1: Validate metadata with Zod ---
        const tagsArray = formData.tags
            ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
            : [];

        const metaValidation = certificateSchema.safeParse({
            ...formData,
            tags: tagsArray,
        });

        const newErrors = {};

        if (!metaValidation.success) {
            metaValidation.error.issues.forEach((issue) => {
                const field = issue.path[0];
                newErrors[field] = issue.message;
            });
        }

        // File is required ONLY for new certs (not editing)
        if (!isEditMode) {
            const fileValidation = fileSchema.safeParse({ file: selectedFile });
            if (!fileValidation.success) {
                fileValidation.error.issues.forEach((issue) => {
                    newErrors.file = issue.message;
                });
            }
        } else if (selectedFile) {
            // If editing AND a new file was selected, validate it
            const fileValidation = fileSchema.safeParse({ file: selectedFile });
            if (!fileValidation.success) {
                fileValidation.error.issues.forEach((issue) => {
                    newErrors.file = issue.message;
                });
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // --- Step 2: Upload / Update ---
        setIsUploading(true);
        try {
            let cloudinaryData = {};

            // Upload new PDF if a file was selected
            if (selectedFile) {
                setUploadStep('Subiendo PDF a Cloudinary...');
                const cloudinaryResult = await uploadPdfToCloudinary(selectedFile);
                cloudinaryData = {
                    fileUrl: cloudinaryResult.secureUrl,
                    cloudinaryPublicId: cloudinaryResult.publicId,
                    originalFilename: cloudinaryResult.originalFilename,
                };
            }

            if (isEditMode) {
                // --- EDIT MODE: Update existing document ---
                setUploadStep('Guardando cambios en Firebase...');
                const updateData = {
                    ...metaValidation.data,
                    ...cloudinaryData,
                };
                await updateCertificate(editingCert.id, updateData);
                setUploadStep('¡Certificado actualizado exitosamente!');
            } else {
                // --- CREATE MODE: New document ---
                setUploadStep('Guardando metadatos en Firebase...');
                await saveCertificate({
                    ...metaValidation.data,
                    ...cloudinaryData,
                    fileUrl: cloudinaryData.fileUrl || '',
                    cloudinaryPublicId: cloudinaryData.cloudinaryPublicId || '',
                    originalFilename: cloudinaryData.originalFilename || '',
                });
                setUploadStep('¡Certificado guardado exitosamente!');
            }

            // Reset form
            setFormData(EMPTY_FORM);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';

            // Notify parent
            if (onSuccess) onSuccess();

            // Auto-close after a brief delay
            setTimeout(() => {
                setIsUploading(false);
                setUploadStep('');
                onClose();
            }, 1500);

        } catch (err) {
            console.error('Error en upload pipeline:', err);
            setErrors({ _global: err.message || 'Error inesperado durante la operación.' });
            setIsUploading(false);
            setUploadStep('');
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={!isUploading ? onClose : undefined}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d131f] border border-slate-700 rounded-2xl shadow-2xl shadow-blue-500/10">
                {/* Header */}
                <div className="sticky top-0 bg-[#0d131f] border-b border-slate-800 p-6 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-400 text-2xl">
                            {isEditMode ? 'edit_note' : 'upload_file'}
                        </span>
                        <h2
                            className="text-white text-xl font-bold tracking-tight"
                            style={{ fontFamily: 'Space Grotesk' }}
                        >
                            {isEditMode ? 'Editar Certificado' : 'Subir Certificado'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isUploading}
                        className="text-slate-400 hover:text-white transition-colors disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Global Error */}
                {errors._global && (
                    <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                        <span className="material-symbols-outlined text-sm mr-2 align-middle">error</span>
                        {errors._global}
                    </div>
                )}

                {/* Existing file indicator (edit mode) */}
                {isEditMode && editingCert?.fileUrl && (
                    <div className="mx-6 mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                        PDF ya vinculado — selecciona uno nuevo solo si deseas reemplazarlo.
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* PDF File Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            {isEditMode ? 'Reemplazar PDF (opcional)' : 'Archivo PDF del Certificado *'}
                        </label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${selectedFile
                                ? 'border-emerald-500/50 bg-emerald-500/5'
                                : errors.file
                                    ? 'border-red-500/50 bg-red-500/5'
                                    : 'border-slate-700 hover:border-slate-500 bg-slate-900/30'
                                }`}
                        >
                            <span className="material-symbols-outlined text-4xl text-slate-500 mb-2 block">
                                {selectedFile ? 'picture_as_pdf' : 'cloud_upload'}
                            </span>
                            {selectedFile ? (
                                <p className="text-emerald-300 text-sm font-medium">{selectedFile.name}</p>
                            ) : (
                                <p className="text-slate-400 text-sm">
                                    {isEditMode
                                        ? 'Haz clic para seleccionar un nuevo PDF (opcional)'
                                        : 'Haz clic para seleccionar un archivo PDF (máx. 10 MB)'}
                                </p>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        {errors.file && (
                            <p className="text-red-400 text-xs mt-1">{errors.file}</p>
                        )}
                    </div>

                    {/* Title */}
                    <FieldInput
                        label="Título del Certificado *"
                        name="title"
                        placeholder="Ej: Diplomado Internacional en Gestión de Calidad"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                    />

                    {/* Issuer */}
                    <FieldInput
                        label="Institución Emisora *"
                        name="issuer"
                        placeholder="Ej: Universidad WestHill / SNTISSSTE"
                        value={formData.issuer}
                        onChange={handleChange}
                        error={errors.issuer}
                    />

                    {/* Date + Hours (side by side) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FieldInput
                            label="Fecha de Emisión *"
                            name="date"
                            placeholder="Ej: 2024 o 14 de marzo de 2025"
                            value={formData.date}
                            onChange={handleChange}
                            error={errors.date}
                        />
                        <FieldInput
                            label="Horas"
                            name="hours"
                            placeholder="Ej: 120 hrs"
                            value={formData.hours}
                            onChange={handleChange}
                            error={errors.hours}
                        />
                    </div>

                    {/* Category + Modality (side by side) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FieldSelect
                            label="Categoría *"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            options={CATEGORIES}
                            error={errors.category}
                        />
                        <FieldSelect
                            label="Modalidad"
                            name="modality"
                            value={formData.modality}
                            onChange={handleChange}
                            options={MODALITIES}
                            error={errors.modality}
                        />
                    </div>

                    {/* Tags */}
                    <FieldInput
                        label="Tags (separados por coma)"
                        name="tags"
                        placeholder="Ej: calidad, ISO 9001, auditoría"
                        value={formData.tags}
                        onChange={handleChange}
                        error={errors.tags}
                    />

                    {/* High Impact Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="highImpact"
                            checked={formData.highImpact}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500/50"
                        />
                        <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[14px] text-purple-400 mr-1 align-middle">star</span>
                            Marcar como Alto Impacto
                        </span>
                    </label>

                    {/* Submit */}
                    <div className="pt-4 border-t border-slate-800">
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            {isUploading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                    {uploadStep}
                                </>
                            ) : isEditMode ? (
                                <>
                                    <span className="material-symbols-outlined text-lg">save</span>
                                    Guardar Cambios
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">cloud_upload</span>
                                    Subir Certificado a La Bóveda
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- Reusable small components ---

function FieldInput({ label, name, placeholder, value, onChange, error, type = 'text' }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2.5 bg-slate-900/50 border rounded-lg text-white placeholder-slate-600 text-sm focus:outline-none transition-colors ${error
                    ? 'border-red-500/50 focus:border-red-400'
                    : 'border-slate-700 focus:border-blue-500'
                    }`}
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
}

function FieldSelect({ label, name, value, onChange, options, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2.5 bg-slate-900/50 border rounded-lg text-white text-sm focus:outline-none transition-colors appearance-none ${error
                    ? 'border-red-500/50 focus:border-red-400'
                    : 'border-slate-700 focus:border-blue-500'
                    }`}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900">
                        {opt}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );
}
