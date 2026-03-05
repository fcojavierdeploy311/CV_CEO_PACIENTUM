// src/services/certificateService.js
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    writeBatch,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'certificates';

/**
 * Guarda los metadatos de un certificado en Firestore.
 * Se llama DESPUÉS de subir el PDF a Cloudinary exitosamente.
 *
 * @param {Object} params
 * @param {string} params.title - Título del certificado
 * @param {string} params.issuer - Institución emisora
 * @param {string} params.date - Fecha de emisión (string legible)
 * @param {string} params.hours - Horas (ej. "120 hrs" o "N/A")
 * @param {string} params.category - Categoría: Certificación, Diplomado, Congreso, Curso
 * @param {string} params.modality - Modalidad: Presencial, Virtual, Híbrido
 * @param {boolean} params.highImpact - Si es de alto impacto
 * @param {string[]} [params.tags] - Tags opcionales
 * @param {string} params.fileUrl - secure_url de Cloudinary
 * @param {string} params.cloudinaryPublicId - public_id de Cloudinary
 * @param {string} params.originalFilename - Nombre original del archivo
 * @returns {Promise<string>} El ID del documento creado en Firestore
 */
export async function saveCertificate({
    title,
    issuer,
    date,
    hours,
    category,
    modality,
    highImpact,
    tags = [],
    fileUrl,
    cloudinaryPublicId,
    originalFilename,
}) {
    const docData = {
        title,
        issuer,
        date,
        hours,
        category,
        modality,
        highImpact,
        tags,
        fileUrl,
        cloudinaryPublicId,
        originalFilename,
        createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
}

/**
 * Obtiene todos los certificados de Firestore, ordenados por fecha de creación.
 *
 * @returns {Promise<Array>} Lista de certificados con sus IDs
 */
export async function getCertificates() {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convertir imageUrl para compatibilidad con TheVault existente
        imageUrl: doc.data().fileUrl || '',
    }));
}

/**
 * Actualiza un certificado existente en Firestore.
 *
 * @param {string} id - El ID del documento de Firestore
 * @param {Object} data - Campos a actualizar (parcial)
 * @returns {Promise<void>}
 */
export async function updateCertificate(id, data) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Migra un array de certificados estáticos a Firestore usando batch write.
 * Cada entrada recibe un createdAt automático. El campo `id` del dato
 * estático se ignora (Firestore genera su propio ID).
 *
 * @param {Array} certs - Array de objetos de portfolioData
 * @returns {Promise<number>} Cantidad de documentos migrados
 */
export async function migrateStaticCertificates(certs) {
    const batch = writeBatch(db);
    const colRef = collection(db, COLLECTION_NAME);

    for (const cert of certs) {
        // Excluir el id estático, Firestore asignará uno nuevo
        const { id: _staticId, ...certData } = cert;
        const newDocRef = doc(colRef);
        batch.set(newDocRef, {
            ...certData,
            tags: certData.tags || [],
            modality: certData.modality || 'Virtual',
            highImpact: certData.highImpact || false,
            fileUrl: certData.fileUrl || '',
            cloudinaryPublicId: certData.cloudinaryPublicId || '',
            originalFilename: certData.originalFilename || '',
            createdAt: serverTimestamp(),
        });
    }

    await batch.commit();
    return certs.length;
}
