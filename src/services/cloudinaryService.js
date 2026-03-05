// src/services/cloudinaryService.js

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER || 'boveda_certificados';

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

/**
 * Sube un archivo PDF a Cloudinary usando un upload preset unsigned.
 * No requiere backend — el fetch va directo al API de Cloudinary.
 *
 * @param {File} file - El archivo PDF a subir.
 * @returns {Promise<{ secureUrl: string, publicId: string, originalFilename: string }>}
 */
export async function uploadPdfToCloudinary(file) {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error(
            'Faltan variables de entorno de Cloudinary. Verifica VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en .env.local'
        );
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', FOLDER);
    formData.append('resource_type', 'raw'); // PDF no es imagen, se sube como 'raw'

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            `Error al subir a Cloudinary: ${response.status} - ${errorData?.error?.message || response.statusText}`
        );
    }

    const data = await response.json();

    return {
        secureUrl: data.secure_url,
        publicId: data.public_id,
        originalFilename: data.original_filename,
    };
}

/**
 * Genera una URL de miniatura JPG a partir de la URL de un PDF en Cloudinary.
 * Transforma: raw/upload/... → image/upload/f_jpg,pg_1,c_limit,w_{w},h_{h}/...
 *
 * @param {string} fileUrl - URL segura del PDF en Cloudinary
 * @param {number} [width=400] - Ancho máximo del thumbnail
 * @param {number} [height=280] - Alto máximo del thumbnail
 * @returns {string|null} URL del thumbnail o null si no es una URL válida de Cloudinary
 */
export function getCloudinaryThumbnailUrl(fileUrl, width = 400, height = 280) {
    if (!fileUrl || !fileUrl.includes('cloudinary.com')) return null;

    // Replace raw/upload with image/upload and inject transformations
    const transformations = `f_jpg,pg_1,c_limit,w_${width},h_${height},q_auto`;

    // Handle URLs with raw/upload (most common for PDFs)
    if (fileUrl.includes('/raw/upload/')) {
        return fileUrl.replace('/raw/upload/', `/image/upload/${transformations}/`);
    }

    // Handle URLs that already use image/upload (fallback)
    if (fileUrl.includes('/image/upload/')) {
        return fileUrl.replace('/image/upload/', `/image/upload/${transformations}/`);
    }

    return null;
}
