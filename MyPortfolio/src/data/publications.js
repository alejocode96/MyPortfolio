// data/publications.js — contenido de la sección "Publicaciones" del Home
//
// Cada publicación:
//   id               identificador único
//   type             tipo de contenido (Guía paso a paso, Tutorial, Artículo técnico…)
//   category         tema (IA, Datos, Automatización, Desarrollo)
//   title            título de la card
//   description      resumen corto (la card muestra hasta 3 líneas)
//   publicationDate  fecha visible en la card
//   href             ruta de la página de la publicación: a donde lleva la card
//                    y lo que se ve en la previsualización
//   active           true  → card normal con la previsualización de su página
//                    false → card "En construcción"
//
// La sección muestra siempre 4 cards, en el orden de este arreglo (la más importante primero).
// Si hay menos de 4 activas, las que faltan salen como "Próximo Artículo".

export const publications = [
    {
        id: "asistente-rag",
        type: "Guía paso a paso",
        category: "IA",
        title: "Construí un asistente con RAG para los reportes de ventas",
        description: "Cargar los Excel, dividirlos en fragmentos, buscarlos con embeddings y conectar Claude para que conteste con cifras y fuentes.",
        publicationDate: "22 sep 2026",
        href: "/",
        active: false, // pásala a true cuando exista su página
    },
]