// src/schemas/certificateSchema.js
import { z } from 'zod';

/**
 * Zod schema for validating certificate metadata before saving to Firestore.
 * Mirrors the existing portfolioData structure for consistency.
 */
export const certificateSchema = z.object({
    title: z
        .string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(200, 'El título no debe exceder 200 caracteres'),
    issuer: z
        .string()
        .min(2, 'El emisor debe tener al menos 2 caracteres')
        .max(200, 'El emisor no debe exceder 200 caracteres'),
    date: z
        .string()
        .min(4, 'La fecha debe tener al menos 4 caracteres (ej. 2024)'),
    hours: z
        .string()
        .default('N/A'),
    category: z
        .enum(['Certificación', 'Diplomado', 'Congreso', 'Curso'], {
            errorMap: () => ({ message: 'Selecciona una categoría válida' }),
        }),
    modality: z
        .enum(['Presencial', 'Virtual', 'Híbrido'], {
            errorMap: () => ({ message: 'Selecciona una modalidad válida' }),
        })
        .default('Virtual'),
    highImpact: z
        .boolean()
        .default(false),
    tags: z
        .array(z.string().max(50))
        .max(10, 'Máximo 10 tags')
        .optional()
        .default([]),
});

/**
 * Schema for validating the PDF file before upload.
 */
export const fileSchema = z.object({
    file: z
        .instanceof(File)
        .refine(
            (file) => file.type === 'application/pdf',
            'Solo se permiten archivos PDF'
        )
        .refine(
            (file) => file.size <= 10 * 1024 * 1024, // 10MB
            'El archivo no debe superar los 10 MB'
        ),
});

/**
 * Combined schema for the full upload form (metadata + file).
 */
export const uploadCertificateSchema = certificateSchema.merge(fileSchema);
