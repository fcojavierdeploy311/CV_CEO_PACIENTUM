// src/data/portfolioData.js

export const portfolioData = [
    // --- CERTIFICACIONES ---
    {
        id: "CERT-001",
        category: "Certificación",
        title: "CERTIFICACIÓN EN TOMA DE MUESTRA",
        issuer: "Colegio de Profesionales de Medicina de Laboratorio A.C. / Calidad Preanalítica",
        date: "2023 – 2025",
        hours: "N/A",
        modality: "Presencial/Virtual",
        highImpact: true,
        imageUrl: ""
    },

    // --- DIPLOMADOS ---
    {
        id: "DIP-001",
        category: "Diplomado",
        title: "1er DIPLOMADO INTERNACIONAL DE CERTIFICACIÓN DE LAS UNIDADES DE SALUD (ISO 9001:2015) Y FORMACIÓN DE AUDITORES",
        issuer: "SNTISSSTE, Universidad WestHill, IPN",
        date: "14 de marzo de 2025",
        hours: "120 hrs",
        modality: "Virtual",
        highImpact: true,
        imageUrl: ""
    },
    {
        id: "DIP-002",
        category: "Diplomado",
        title: "1er DIPLOMADO DE GESTIÓN INTEGRAL DE RIESGOS EN EMERGENCIAS Y DESASTRES EN INSTALACIONES DE SALUD",
        issuer: "SNTISSSTE, Asociación de Medicina y Desastres de México",
        date: "11 abril - 02 dic 2024",
        hours: "180 hrs",
        modality: "Virtual",
        highImpact: true,
        imageUrl: ""
    },
    {
        id: "DIP-003",
        category: "Diplomado",
        title: "1er DIPLOMADO INTERNACIONAL DE GENÉTICA MÉDICA Y ENFERMEDADES RARAS",
        issuer: "Asociación Mexicana de Genética Humana, Univ. WestHill",
        date: "2024",
        hours: "120 hrs",
        modality: "Virtual",
        highImpact: false,
        imageUrl: ""
    },
    {
        id: "DIP-004",
        category: "Diplomado",
        title: "DIPLOMADO DE LIDERAZGO E INTELIGENCIA EMOCIONAL",
        issuer: "Instituto Nacional de Psiquiatría / SNTISSSTE",
        date: "2024",
        hours: "150 hrs",
        modality: "Virtual",
        highImpact: false,
        imageUrl: ""
    },

    // --- CONGRESOS Y JORNADAS ---
    {
        id: "CONG-001",
        category: "Congreso",
        title: "CONFERENCIAS MAGISTRALES DE FORMACIÓN PROFESIONAL",
        issuer: "Colegio Nacional de Químicos Clínicos en Medicina de Laboratorio",
        date: "17 de octubre de 2021",
        hours: "22 hrs",
        modality: "Virtual",
        highImpact: false,
        imageUrl: ""
    },
    {
        id: "CONG-002",
        category: "Congreso",
        title: "4to CONGRESO MUNDIAL DE SEPSIS",
        issuer: "Global Sepsis Alliance",
        date: "2023",
        hours: "N/A",
        modality: "Virtual",
        highImpact: true,
        imageUrl: ""
    },

    // --- CURSOS ---
    {
        id: "CUR-001",
        category: "Curso",
        title: "COVID-19 UN RETO PARA LA MEDICINA Y LA CLÍNICA",
        issuer: "Colegio Mexicano de Ciencias del Laboratorio Clínico",
        date: "Octubre 2021",
        hours: "9 hrs",
        modality: "Virtual",
        highImpact: false,
        imageUrl: ""
    },
    {
        id: "CUR-002",
        category: "Curso",
        title: "SESIONES DE ANIVERSARIO",
        issuer: "Colegio de Químicos Clínicos de Izúcar de Matamoros",
        date: "Octubre 2021",
        hours: "8 hrs",
        modality: "Virtual",
        highImpact: false,
        imageUrl: ""
    },
    {
        id: "CUR-003",
        category: "Curso",
        title: "8 CLAVES PARA MEJORAR EL ANÁLISIS CAUSA RAÍZ",
        issuer: "Keisen Consultores",
        date: "2025",
        hours: "60 min",
        modality: "Virtual",
        highImpact: true,
        imageUrl: ""
    },
    {
        id: "CUR-004",
        category: "Curso",
        title: "DICOTOMÍA DEL CONTROL (HERRAMIENTAS PARA MEJORAR PROCESOS)",
        issuer: "Idea Disruptiva",
        date: "2025",
        hours: "60 min",
        modality: "Virtual",
        highImpact: false,
        imageUrl: ""
    }
];

// Categorías para los botones de filtro en The Vault
export const categories = ["Todos", "Certificación", "Diplomado", "Congreso", "Curso"];