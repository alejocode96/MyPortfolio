/**
 * Sección "Publicaciones" del Home.
 * Muestra siempre 4 cards con las publicaciones activas de data/publications.js;
 * las que falten salen como "Próximo Artículo" (En construcción).
 * Las cards activas muestran, en lugar de imagen, la página a la que redirigen (PagePreview).
 *
 *   md+:    [ Tipo 1 ][ Tipo 2          ]
 *           [ (alta) ][ Tipo 3 ][ Tipo 3 ]
 *   móvil:  Tipo 1, Tipo 2, Tipo 1, Tipo 2 (desde sm, las dos últimas lado a lado)
 */
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, BookOpen, ArrowUpRight } from 'lucide-react'
import { publications } from '../../data/publications'
import { useTheme } from '../../context/ThemeContext'

// ─── Helper imagen o gradiente (fondo de las cards "Próximamente") ────────────
const getBgStyle = (image) => {
    if (!image) return {};
    const isUrl = image.startsWith('/') || image.startsWith('http') || image.startsWith('data:');
    return isUrl
        ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : { background: image };
};

// ─── Display articles: siempre 4 cards ────────────────────────────────────────
const getDisplayArticles = () => {
    const constructionArticle = {
        id: "const",
        title: "Próximo Artículo",
        category: "Próximamente",
        description: "Nuevo contenido en camino. Estate atento a las próximas publicaciones",
        image: "linear-gradient(135deg,rgba(37,37,79,1) 0%, rgba(0,0,0,1) 100%)",
        publicationDate: "Pendiente",
        active: false,

    }

    const articles = publications.filter(article => article.active);
    while (articles.length < 4) {
        articles.push({
            ...constructionArticle,
            id: `const-${articles.length}`
        });
    }

    return articles;
}

const articles = getDisplayArticles();

// ─── Previsualización de la página de la publicación ──────────────────────────
// Ancho al que se carga la página antes de reducirla (como un portátil)
const PAGE_WIDTH = 1280;

// Si esta página ya se está mostrando dentro de una previsualización, no carga otras.
// Evita que el Home se repita dentro de sí mismo cuando href apunta a tu propia web ("/").
const IS_PREVIEW = window.self !== window.top;

/**
 * Muestra la página `href` dentro de la card, reducida para llenar su contenedor.
 * El contenedor (padre) debe ser `relative` y tener alto: este componente lo cubre entero.
 */
const PagePreview = ({ href, title }) => {
    const boxRef = useRef(null);
    const [scale, setScale] = useState(0);
    // Al cambiar el tema se vuelve a cargar la página (key={theme}) para que salga con el tema nuevo
    const { theme } = useTheme();

    // Mide el ancho del contenedor y calcula la escala; se recalcula si la card cambia de tamaño
    useEffect(() => {
        const box = boxRef.current;
        const observer = new ResizeObserver(() => setScale(box.clientWidth / PAGE_WIDTH));
        observer.observe(box);
        return () => observer.disconnect();
    }, []);

    return (
        // pointer-events-none: el clic pasa a la card, no a la página de adentro
        <div ref={boxRef} aria-hidden="true" className="absolute inset-0 pointer-events-none">
            {scale > 0 && !IS_PREVIEW && (
                <iframe
                    key={theme}
                    src={href}
                    title={`Vista previa: ${title}`}
                    tabIndex={-1}
                    scrolling="no"
                    loading="lazy"
                    className="absolute top-0 left-0 origin-top-left border-0"
                    style={{
                        width: PAGE_WIDTH,
                        height: `${100 / scale}%`,
                        transform: `scale(${scale})`,
                    }}
                />
            )}
            {/* Velo: difumina un poco la página para que las etiquetas resalten */}
            <div className="absolute inset-0 backdrop-blur-[1.5px] bg-white/10 dark:bg-black/20" />
        </div>
    );
};

// ─── Card Tipo 1: previsualización arriba ─────────────────────────────────────
const ArticleCardType1 = ({ article }) => {
    const navigate = useNavigate();
    // (1) La página solo se muestra si la publicación está activa y tiene su ruta
    const showPreview = article.active && article.href;

    const handleRead = () => {
        if (article.active && article.href) navigate(article.href);
    }

    return (
        <div onClick={handleRead} className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md bg-[#f4f4f5] dark:bg-zinc-800 transition-all duration-300 h-full hover:shadow-lg hover:-translate-y-1">
            <div className="p-3">
                {/* (2) El degradado solo cuando no hay previsualización */}
                <div className="h-48 w-full relative overflow-hidden rounded-xl" style={showPreview ? undefined : getBgStyle(article.image)}>
                    {/* (3) La página de la publicación */}
                    {showPreview && <PagePreview href={article.href} title={article.title} />}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-zinc-700 dark:text-zinc-200 flex items-center gap-1">
                            <BookOpen className='w-2.5 h-2.5'></BookOpen>
                            {article.category}
                        </span>
                        <span className="px-2 py-0.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full text-[10px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
                            <Clock className='w-2.5 h-2.5'></Clock>
                            {article.publicationDate}
                        </span>
                    </div>
                    {!article.active && (
                        <div className="absolute inset-0 dark:bg-black/60 bg-gray-200/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                            <div className="text-center px-4">
                                <div className='w-10 h-10 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <p className='text-xs font-semibold text-white uppercase tracking-wider'>En construcción</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='px-4 pb-4 flex flex-col'>
                <div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide line-clamp-1">{article.type}</span>
                    </div>
                    <h3 className='text-base font-bold text-zinc-800 dark:text-zinc-100 mb-1.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                        {article.title}
                    </h3>

                    <div className='w-full h-px bg-zinc-200 dark:bg-zinc-700 mb-2'></div>
                    <p className='text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-3'>
                        {article.description}
                    </p>
                </div>
                <div className='flex items-center justify-start mt-auto'>
                    <button onClick={(e) => { e.stopPropagation(); handleRead(); }} disabled={!article.active} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 ${article.active ? "bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-zinc-900 dark:text-zinc-100 hover:text-white dark:hover:text-white shadow-md hover:shadow-lg" : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-500 cursor-not-allowed"}`}>
                        {article.active ? "Leer más" : "Próximamente"}
                        {article.active && <ArrowUpRight className='w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300'></ArrowUpRight>}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Card Tipo 2: previsualización a la derecha ───────────────────────────────
// ─── Card Tipo 2: previsualización a la derecha ───────────────────────────────
const ArticleCardType2 = ({ article }) => {
    const navigate = useNavigate();
    const showPreview = article.active && article.href;

    const handleRead = () => {
        if (article.active && article.href) navigate(article.href);
    }

    return (
        <div onClick={handleRead} className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md bg-[#f4f4f5] dark:bg-zinc-800 transition-all duration-300 h-full hover:shadow-lg hover:-translate-y-1 flex flex-row-reverse">
            <div className="w-1/2 p-3">
                <div className="h-full w-full min-h-[140px] relative overflow-hidden rounded-xl" style={showPreview ? undefined : getBgStyle(article.image)}>
                    {showPreview && <PagePreview href={article.href} title={article.title} />}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    <div className="absolute top-2 left-2 right-2 flex flex-col gap-1.5 items-start">
                        <span className="px-2 py-0.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-zinc-700 dark:text-zinc-200 flex items-center gap-1">
                            <BookOpen className="w-2.5 h-2.5" />
                            {article.category}
                        </span>
                        {article.active && (
                            <span className="px-2 py-0.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full text-[10px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {article.publicationDate}
                            </span>
                        )}
                    </div>
                    {!article.active && (
                        <div className="absolute inset-0 bg-gray-200/60 dark:bg-black/60 rounded-xl backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center px-4">
                                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-xs hidden md:flex font-semibold text-white uppercase tracking-wider">En construcción</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <span className="text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide line-clamp-1">{article.type}</span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {article.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-3">{article.description}</p>
                </div>
                <div className="mt-auto">
                    <button onClick={(e) => { e.stopPropagation(); handleRead(); }} disabled={!article.active} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 w-fit ${article.active ? "bg-zinc-200 dark:bg-zinc-700 hover:bg-blue-600 dark:hover:bg-blue-500 text-zinc-900 dark:text-zinc-100 hover:text-white dark:hover:text-white shadow-md hover:shadow-lg" : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-500 cursor-not-allowed"}`}>
                        {article.active ? "Leer más" : "Próximamente"}
                        {article.active && <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Card Tipo 3: contenido encima de la previsualización ─────────────────────
const ArticleCardType3 = ({ article }) => {
    const navigate = useNavigate();
    const showPreview = article.active && article.href;

    const handleRead = () => {
        if (article.active && article.href) navigate(article.href);
    }

    return (
        <div onClick={handleRead} className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-300 h-full hover:shadow-lg hover:-translate-y-1" style={showPreview ? undefined : getBgStyle(article.image)}>
            {showPreview && <PagePreview href={article.href} title={article.title} />}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60" />
            <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5" />
                    {article.category}
                </span>
                {article.active && (
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-medium text-white/90 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {article.publicationDate}
                    </span>
                )}
            </div>
            {!article.active && (
                <div className="absolute inset-0 bg-gray-200/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
                    <div className="text-center px-4">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs font-semibold text-white uppercase tracking-wider">En construcción</p>
                    </div>
                </div>
            )}
            <div className="relative z-10 p-4 h-full flex flex-col justify-between pt-12">
                <div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wide line-clamp-1">{article.type}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-1">{article.title}</h3>
                    <p className="text-xs text-white/80 mb-3 line-clamp-3">{article.description}</p>
                </div>
                <div className="mt-auto">
                    <button onClick={(e) => { e.stopPropagation(); handleRead(); }} disabled={!article.active} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 w-fit ${article.active ? "bg-white text-zinc-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white shadow-md hover:shadow-lg" : "bg-white/30 text-white/50 cursor-not-allowed"}`}>
                        {article.active ? "Leer más" : "Próximamente"}
                        {article.active && <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />}
                    </button>
                </div>
            </div>
        </div>
    )
}

const ArticlesSection = () => {
    return (
        <section id='articlesSection' className='relative overflow-hidden bg-gray-50 dark:bg-zinc-900 mb-10 rounded-4xl shadow-[0_2ox_8px_0_rgba(99,99,99,0.2)] border border-zinc-200/50 dark:border-zinc-800/50 py-12 px-4 sm:px-6 lg:px-8' style={{ scrollMarginTop: '24PX' }}>
            {/* Blobs decorativos */}
            <div className="absolute -bottom-30 -left-5 w-[200px] h-[400px] bg-gradient-to-r from-zinc-600 to-zinc-400 opacity-40 dark:from-[#fff]/30 dark:to-[#e9e9e9]/30 dark:opacity-100 pointer-events-none" style={{ maskImage: "radial-gradient(farthest-side at left, white, transparent)", WebkitMaskImage: "radial-gradient(farthest-side at left, white, transparent)" }} />
            <div className="absolute top-0 right-0 w-[200px] h-[400px] bg-gradient-to-r from-zinc-600 to-zinc-400 opacity-40 dark:from-[#fff]/30 dark:to-[#e9e9e9]/30 dark:opacity-100 pointer-events-none" style={{ maskImage: "radial-gradient(farthest-side at right, white, transparent)", WebkitMaskImage: "radial-gradient(farthest-side at right, white, transparent)" }} />

            {/* Encabezado */}
            <div className='w-[98%] mx-auto relative z-10 pb-2 border-b border-zinc-300 dark:border-zinc-700'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between md:gap-6'>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-700 dark:text-zinc-100'>
                        PUBLICACIONES
                    </h2>
                    <p className='max-w-md text-xs text-zinc-600 dark:text-zinc-300 text-justify'>
                        Explora guías paso a paso, artículos técnicos y tutoriales prácticos
                        para mejorar tus habilidades en desarrollo y tecnología.
                    </p>
                </div>
            </div>

            <div className='w-[98%] mx-auto place-items-center lg:place-items-stretch relative z-10'>
                {/* ── Layout principal ── */}
                <div className='flex flex-col md:flex-row gap-4 md:h-[450px] pt-6'>

                    {/* Card 1 — ocupa toda la altura en desktop */}
                    <div className='w-full md:w-[45%] md:h-full'>
                        <ArticleCardType1 article={articles[0]} />
                    </div>

                    {/* Columna derecha */}
                    <div className="w-full md:w-[55%] flex flex-col gap-4">
                        {/* Card 2 */}
                        <div className='md:h-[48%]'>
                            <ArticleCardType2 article={articles[1]} />
                        </div>

                        {/* Cards 3 y 4 */}
                        <div className="flex flex-col sm:flex-row gap-4 md:h-[48%]">

                            <div className='sm:w-1/2 md:h-full'>
                                {/* Desktop → Type3, Mobile → Type1 */}
                                <div className="hidden md:block h-full">
                                    <ArticleCardType3 article={articles[2]} />
                                </div>
                                <div className="block md:hidden">
                                    <ArticleCardType1 article={articles[2]} />
                                </div>
                            </div>

                            <div className='sm:w-1/2 md:h-full'>
                                {/* Desktop → Type3, Mobile → Type2 */}
                                <div className="hidden md:block h-full">
                                    <ArticleCardType3 article={articles[3]} />
                                </div>
                                <div className="block md:hidden">
                                    <ArticleCardType2 article={articles[3]} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ArticlesSection