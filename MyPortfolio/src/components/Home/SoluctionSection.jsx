/**
 * @component SoluctionSection.jsx
 * @version 1.0.0 — diseño + carrusel funcional (sin animaciones GSAP)
 *
 * Sección "Soluciones que construyo" del Home. Muestra las capacidades del
 * portafolio (datos, IA, automatización, desarrollo) como un carrusel de cards
 * que avanza card por card.
 *
 * Estructura (de atrás hacia adelante):
 *   <section>                  → relative + overflow-x-clip (ancla y recorte horizontal)
 *   ├── Panel lateral          → absolute, z-0: título, brillo y cuadrícula (decorativo)
 *   └── Contenedor             → relative, z-10: va en el flujo y da la altura a la sección
 *       ├── Dots               → un botón por cada posición posible del carrusel
 *       └── Wrapper → Clip → Carrusel (carouselRef) → Track (ul) → Slide (li) → SolutionCard
 *
 * Comportamiento:
 *   - Responsive: 1 card por vista en móvil, 2 desde md (768px), 3 desde lg (1024px).
 *   - Navegación: dots, arrastre con mouse y swipe táctil. Avanza de a una card
 *     y se detiene en los extremos.
 *   - Altura: la sección nunca pasa del 98% del alto de la ventana (ver CARD_BASE).
 *   - CTA: "Ver proyectos" navega a /soluciones/:id solo si la solución está activa.
 *
 * Dependencias:
 *   - Datos: src/data/solutions.js → { id, title, description, image, alt, active }
 *   - Ruta: /soluciones/:id debe existir en AppRoutes para que el CTA lleve a una página.
 *   - Navbar: el ítem "Soluciones" de navigation.js apunta a #mySoluctionSection.
 *
 * Pendiente: animaciones de scroll con GSAP (fase siguiente). Los refs de
 * animación se agregan entonces; aquí solo están los que necesita el carrusel.
 */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import DataAnalysisVisual from "../SolutionVisuals/DataAnalysisVisual";
import AppliedAIVisual from "../SolutionVisuals/AppliedAIVisual";
import AutomationVisual from "../SolutionVisuals/AutomationVisual";
import FullStackVisual from "../SolutionVisuals/FullStackVisual";
//datos de las cards
import { solutions } from '../../data/solutions';

//iconos
import { ArrowUpRight, Clock } from 'lucide-react'

// ==================== ESTILOS ====================
// Clases de Tailwind agrupadas en constantes para que el JSX sea legible y
// para que la lógica pueda alternar estados (card activa, dot activo, botón).

//Card base — `relative` para el fondo de puntos.
//Alto: la sección nunca pasa del 98% de la ventana. Se resta lo fijo
//(pt + dots + pb: 23.5rem en móvil, 24rem desde md), se suman 20px extra para el área visual
//y se limita entre 280px y 420px. Esos 20px van a la figura (flex-1); el texto no cambia
const CARD_BASE =
    'relative flex h-[clamp(280px,calc(98svh_-_23.5rem_+_20px),420px)] md:h-[clamp(280px,calc(98svh_-_24rem_+_20px),420px)] flex-col overflow-hidden rounded-[20px] border border-black/5 bg-gray-100 ' +
    'shadow-[0_2px_12px_0_rgba(0,0,0,0.08),0_1px_3px_0_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-zinc-800'

//Hover solo en cards activas (sin cursor-pointer: la acción es el botón)
const CARD_ACTIVE =
    'transition duration-500 hover:-translate-y-1 ' +
    'hover:shadow-[0_12px_32px_0_rgba(0,0,0,0.13),0_2px_8px_0_rgba(0,0,0,0.08)]'

//Fondo de puntos — reemplaza a DotPatternCanvas con CSS puro
//(un radial-gradient repetido cada 18px, desvanecido hacia abajo con una máscara)
const DOT_PATTERN = {
    backgroundImage: 'radial-gradient(circle, rgba(128,128,128,0.13) 1.1px, transparent 1.2px)',
    backgroundSize: '18px 18px',
    maskImage: 'linear-gradient(to bottom, black, transparent)',
    WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
}

//Botón "Ver proyectos" — mismos estilos que los CTAs de MyServicesSection
const BTN_BASE =
    'inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11.5px] font-semibold'

const BTN_ENABLED =
    'bg-zinc-800 text-white hover:bg-blue-600 transition-colors duration-200 ' +
    'dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-blue-500 dark:hover:text-white'

const BTN_DISABLED =
    'cursor-not-allowed bg-zinc-200/70 text-zinc-400 dark:bg-zinc-700/50 dark:text-zinc-500'

//Ancho de cada slide — 1 / 2 / 3 cards (gap-4 = 1rem entre cards).
//Los breakpoints deben coincidir con los de handleResize en SoluctionSection.
const SLIDE_WIDTH = 'w-full md:w-[calc((100%_-_1rem)/2)] lg:w-[calc((100%_-_2rem)/3)]'

//Dots — diseño original de MyServicesSection (el activo se estira a w-8)
const DOT_BASE = 'h-2 rounded-full transition-all duration-300'
const DOT_ACTIVE = 'w-8 bg-zinc-600 dark:bg-zinc-300'
const DOT_INACTIVE = 'w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500'

const GAP = 16; // px — igual a gap-4 del track; se usa para calcular el desplazamiento

// ==================== CARD ====================
/**
 * Card de una solución dentro del carrusel.
 *
 * - Área visual: muestra `solution.image` o, si está vacía, un placeholder
 *   "Proyectos en camino". La imagen ocupa el alto sobrante (flex-1) y el
 *   contenido textual nunca se encoge (shrink-0).
 * - CTA "Ver proyectos": habilitado si `solution.active`; si no, se muestra
 *   deshabilitado con el tooltip "Próximamente".
 *
 * @param {Object}   props
 * @param {Object}   props.solution  Elemento de solutions.js ({ id, title, description, image, alt, active })
 * @param {Function} props.onClick   (solutionId, isActive) => void — lo provee SoluctionSection
 */

//nombre en solutions.js → componente
const VISUAL_MAP = {
    DataAnalysisVisual: DataAnalysisVisual,
    AppliedAIVisual: AppliedAIVisual,
    AutomationVisual: AutomationVisual,
    FullStackVisual: FullStackVisual,
};

function SolutionCard({ solution, onClick }) {
    // Busca el componente por su nombre; si no hay, queda en null
    const Visual = VISUAL_MAP[solution.visual] || null;
    return (
        <article className={`${CARD_BASE} ${solution.active ? CARD_ACTIVE : ''}`}>
            {/* Fondo de puntos */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={DOT_PATTERN} />

            {/* Área visual — imagen o placeholder; draggable={false} evita el arrastre nativo de la imagen.
                Si la solución no está activa, `grayscale` pasa los acentos (azul) a escala de grises. */}
            <figure className={`relative z-[1] min-h-20 flex-1 overflow-hidden ${solution.active ? '' : 'grayscale'}`}>
                {Visual ? (
                    <Visual />
                ) : solution.image ? (
                    <img src={solution.image} alt={solution.alt} loading="lazy" draggable={false} className="pointer-events-none h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-400/20 dark:bg-zinc-950/40">
                        {/* ...placeholder sin cambios... */}
                    </div>
                )}
                {/* Degradado inferior — sin cambios */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-gray-100 dark:to-zinc-800" />
            </figure>

            {/* Contenido textual */}
            <div className="relative z-[2] flex shrink-0 flex-col px-5 pt-3 pb-4">
                <h3 className="mb-2 text-[clamp(1.05rem,1.6vw,1.25rem)] leading-tight font-bold tracking-tight text-zinc-800 dark:text-zinc-50">
                    {solution.title}
                </h3>
                <hr className="mb-3 border-zinc-200 dark:border-white/10" />
                <p className="line-clamp-3 text-[12.5px] leading-[1.65] text-zinc-500 dark:text-zinc-400">
                    {solution.description}
                </p>

                {/* CTA — habilitado solo si la solución está activa.
                    stopPropagation evita que el clic llegue al carrusel. */}
                <div className="mt-auto pt-3">
                    {solution.active ? (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onClick(solution.id, solution.active); }}
                            className={`${BTN_BASE} ${BTN_ENABLED}`}
                        >
                            Ver proyectos
                            <ArrowUpRight className="h-3 w-3" />
                        </button>
                    ) : (
                        <button type="button" disabled title="Próximamente" className={`${BTN_BASE} ${BTN_DISABLED}`}>
                            <Clock className="h-3 w-3" />
                            Ver proyectos
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

// ==================== SECCIÓN ====================
/**
 * Sección de soluciones con carrusel card por card.
 *
 * Modelo del carrusel:
 *   slidesPerView → cuántas cards caben (1 / 2 / 3)
 *   maxIndex      → última posición válida = solutions.length − slidesPerView
 *   currentIndex  → primera card visible (0 … maxIndex)
 *   translateX    → px arrastrados en el gesto actual (−200 … 200)
 *   El track se desplaza: −currentIndex × (anchoCard + GAP) + translateX
 */
const SoluctionSection = () => {
    const navigate = useNavigate();

    // ── Estado del carrusel ──
    const [currentIndex, setCurrentIndex] = useState(0);   // primera card visible
    const [slidesPerView, setSlidesPerView] = useState(3); // cards por vista (1 / 2 / 3)
    const [isDragging, setIsDragging] = useState(false);   // arrastre con mouse en curso
    const [startX, setStartX] = useState(0);               // X donde empezó el arrastre
    const [translateX, setTranslateX] = useState(0);       // px arrastrados (−200 a 200)
    const [startTime, setStartTime] = useState(0);         // inicio del gesto, para medir la velocidad

    // ── Refs del carrusel (solo los necesarios) ──
    const carouselRef = useRef(null);      // elemento sin padding: se mide (offsetWidth) y recibe el touch
    const isDraggingRef = useRef(false);   // lectura inmediata en mousemove, sin esperar al re-render
    const currentIndexRef = useRef(0);     // copia del índice para el listener táctil (se registra una sola vez)
    const maxIndexRef = useRef(0);         // copia del índice máximo para el listener táctil

    const maxIndex = Math.max(0, solutions.length - slidesPerView);
    currentIndexRef.current = currentIndex;
    maxIndexRef.current = maxIndex;



    // ── Cards por vista según el ancho de la ventana ──
    // Mismos cortes que SLIDE_WIDTH (md = 768px, lg = 1024px) para que CSS y JS coincidan.
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setSlidesPerView(3);
            else if (window.innerWidth >= 768) setSlidesPerView(2);
            else setSlidesPerView(1);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ── Corrige el índice si queda fuera de rango ──
    // Ej.: en móvil se está en la card 4 (índice 3) y se pasa a escritorio, donde el máximo es 1.
    useEffect(() => {
        const maxPossible = Math.max(0, solutions.length - slidesPerView);
        if (currentIndex > maxPossible) setCurrentIndex(maxPossible);
    }, [slidesPerView, currentIndex]);

    // Avanzan/retroceden una card. Dan la vuelta en los extremos, pero el arrastre
    // solo las llama cuando no se está en un extremo, así que en la práctica se detiene.
    const nextSlide = () => setCurrentIndex(p => p >= maxIndex ? 0 : p + 1);
    const prevSlide = () => setCurrentIndex(p => p <= 0 ? maxIndex : p - 1);

    // ── Arrastre con mouse ──
    // mousedown: no inicia el arrastre si el clic cae en un botón (dot o CTA).
    const handleMouseDown = (e) => {
        if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;
        setIsDragging(true);
        isDraggingRef.current = true;
        setStartX(e.pageX);
        setStartTime(Date.now());
        setTranslateX(0);
        e.preventDefault(); // evita seleccionar texto o arrastrar imágenes
    };

    // mousemove: el track sigue al cursor, limitado a ±200px.
    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        e.preventDefault();
        setTranslateX(Math.max(-200, Math.min(200, e.pageX - startX)));
    };

    // mouseup: decide si cambia de card. Gesto rápido (> 0.5 px/ms) → 50px;
    // gesto lento → 100px. Si no alcanza el umbral, el track vuelve a su lugar.
    const handleMouseUp = () => {
        if (!isDraggingRef.current) return;
        setIsDragging(false);
        isDraggingRef.current = false;
        const elapsed = Date.now() - startTime;
        const velocity = Math.abs(translateX) / elapsed;
        if (Math.abs(translateX) < 5 && elapsed < 200) { setTranslateX(0); return; } // fue un clic
        const threshold = velocity > 0.5 ? 50 : 100;
        if (translateX > threshold && currentIndex > 0) prevSlide();
        else if (translateX < -threshold && currentIndex < maxIndex) nextSlide();
        setTranslateX(0);
    };

    // mouseleave: si el cursor sale del carrusel durante el arrastre, se cierra el gesto.
    const handleMouseLeave = () => { if (isDragging) handleMouseUp(); };

    // ── Swipe táctil — listener nativo para poder frenar el scroll de la página ──
    // React registra onTouchMove como pasivo, y ahí preventDefault() no detiene el
    // scroll. Con { passive: false } la página se queda quieta cuando el gesto
    // horizontal supera 10px. Umbrales más bajos que con mouse: 30px rápido / 50px lento.
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        let localStartX = 0;
        let localStartTime = 0;
        let localTranslateX = 0;

        const onTouchStart = (e) => {
            localStartX = e.touches[0].clientX;
            localStartTime = Date.now();
            localTranslateX = 0;
            setTranslateX(0);
        };

        const onTouchMove = (e) => {
            const diff = e.touches[0].clientX - localStartX;
            localTranslateX = Math.max(-200, Math.min(200, diff));
            if (Math.abs(diff) > 10) e.preventDefault();
            setTranslateX(localTranslateX);
        };

        const onTouchEnd = () => {
            const elapsed = Date.now() - localStartTime;
            const velocity = Math.abs(localTranslateX) / elapsed;
            const threshold = velocity > 0.5 ? 30 : 50;
            // Lee los refs: este efecto corre una sola vez, así que
            // currentIndex/maxIndex quedarían fijos al primer render.
            if (localTranslateX > threshold && currentIndexRef.current > 0) {
                setCurrentIndex((p) => p - 1);
            } else if (localTranslateX < -threshold && currentIndexRef.current < maxIndexRef.current) {
                setCurrentIndex((p) => p + 1);
            }
            setTranslateX(0);
        };

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    // ── Desplazamiento del track ──
    // Mide el ancho real del carrusel (capa sin padding) y corre el track
    // currentIndex pasos (card + GAP) a la izquierda, más lo arrastrado.
    // Nota: al redimensionar sin cruzar un breakpoint no hay re-render, así que
    // el valor se actualiza en la siguiente interacción.
    const getTransformValue = () => {
        if (!carouselRef.current) return "translateX(0px)";
        const containerWidth = carouselRef.current.offsetWidth;
        const cardWidth = (containerWidth - (slidesPerView - 1) * GAP) / slidesPerView;
        const offset = currentIndex * (cardWidth + GAP);
        return `translateX(${-offset + translateX}px)`;
    };

    // ── Botón "Ver proyectos" ──
    // Ignora el clic si viene de un arrastre; navega solo si la solución está activa.
    const handleCardClick = (solutionId, isActive) => {
        if (isDragging || Math.abs(translateX) > 5) return;
        if (isActive) navigate(`/soluciones/${solutionId}`);
    };

    return (
        // overflow-x-clip (y no -hidden): recorta las cards de la derecha sin
        // convertir el eje vertical en scroll interno. scrollMarginTop deja aire
        // bajo el navbar al saltar a #mySoluctionSection.
        <section id="mySoluctionSection" className='relative w-full mb-10 overflow-x-clip' style={{ scrollMarginTop: "24px" }}>
            {/* Panel lateral decorativo — entra desde la izquierda.
                absolute top-20 bottom-0: se estira con la altura del contenido en cualquier pantalla. */}
            <div className='overflow-hidden absolute top-20 bottom-0 left-0 w-[85%] sm:w-[80%] lg:w-1/2 bg-gray-50 dark:bg-zinc-900 shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5),0_32px_64px_-8px_rgba(0,0,0,0.35)] border border-zinc-200/50 dark:border-zinc-800/50 z-0 rounded-tr-[2rem] rounded-br-[2rem] sm:rounded-tr-[3rem] sm:rounded-br-[3rem] will-change-transform'>
                {/* Brillo decorativo — esquina superior derecha (máscara radial) */}
                <div className='absolute top-0 right-0 w-[200px] h-[400px] bg-gradient-to-r from-zinc-600 to-zinc-400 opacity-40 dark:from-[#fff]/30 dark:to-[#e9e9e9]/30 dark:opacity-100 pointer-events-none' style={{ maskImage: "radial-gradient(farthest-side at right, white, transparent)", WebkitMaskImage: "radial-gradient(farthest-side at right, white, transparent)" }}></div>

                {/* Bloque de texto — título y descripción de la sección */}
                <div className='w-[85%] sm:w-[90%] ml-6 sm:ml-8 md:ml-10 mr-4 sm:mr-6 md:mr-10 my-6 sm:my-8 md:my-10 relative z-10 pb-3 border-b border-zinc-300 dark:border-zinc-700'>
                    <div className='md:items-start md:justify-between md:gap-6'>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-700 dark:text-zinc-100'>
                            SOLUCIONES QUE CONSTRUYO
                        </h2>
                        <p className='max-w-md text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 text-justify mt-2 sm:mt-3'>
                            Software, datos, automatización e IA aplicados a problemas reales de negocio. Cada capacidad está respaldada por proyectos.
                        </p>
                    </div>
                </div>

                {/* Cuadrícula decorativa — patrón SVG de 45×38px inclinado con skewY */}
                <svg aria-hidden="true" className="absolute bottom-0 right-0 h-[70%] w-full fill-black/[0.02] stroke-black/[0.05] dark:fill-white/[0.01] dark:stroke-white/[0.03] pointer-events-none" style={{ transform: "skewY(-12deg)", transformOrigin: "bottom right" }}>
                    <defs>
                        <pattern id="grid_pattern_right" width="45" height="38" patternUnits="userSpaceOnUse">
                            <path d="M.5 38V.5H48" fill="none" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid_pattern_right)" />
                    {/* Celdas rellenas sueltas para dar textura */}
                    <g opacity="0.4">
                        <rect width="44" height="39" x="92" y="38" fill="currentColor" className="text-zinc-400/20 dark:text-zinc-600/20" />
                        <rect width="44" height="39" x="182" y="114" fill="currentColor" className="text-zinc-400/20 dark:text-zinc-600/20" />
                        <rect width="44" height="39" x="135" y="190" fill="currentColor" className="text-zinc-400/20 dark:text-zinc-600/20" />
                    </g>
                </svg>
            </div>

            {/* Contenedor dots + carrusel — relative z-10 lo pinta sobre el panel.
                pt-70 / md:pt-72 bajan el carrusel justo por debajo del título del panel. */}
            <div className="relative z-10 px-6 pt-70 md:pt-72 pb-12 sm:px-8 md:px-10">

                {/* Dots — uno por posición posible; se ocultan si todas las cards caben */}
                {maxIndex > 0 && (
                    <div className="mt-4 mb-6 flex items-center gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setCurrentIndex(i)}
                                aria-label={`Ir al slide ${i + 1}`}
                                className={`${DOT_BASE} ${i === currentIndex ? DOT_ACTIVE : DOT_INACTIVE}`}
                            />
                        ))}
                    </div>
                )}

                {/* Wrapper — nunca se transforma (aquí irá el trigger de GSAP) */}
                <div className="relative w-full">
                    {/* Clip — el padding deja espacio a sombras y hover; clipPath recorta a 12px
                        por lado (menos que el gap de 16px), así la card siguiente no asoma */}
                    <div style={{ clipPath: "inset(-16px -12px -16px -12px)", padding: "16px 12px", margin: "-16px -12px" }}>
                        {/* Carrusel — se mide y recibe el arrastre.
                            touchAction pan-y: el scroll vertical lo maneja el navegador, el horizontal este código. */}
                        <div
                            ref={carouselRef}
                            role="region"
                            aria-roledescription="carrusel"
                            aria-label="Soluciones"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className="w-full select-none"
                            style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "pan-y" }}
                        >
                            {/* Track — lo único que se desplaza. Sin transición mientras se
                                arrastra (sigue al cursor 1:1); 300ms al soltar para acomodarse. */}
                            <ul
                                className="flex gap-4"
                                style={{
                                    transform: getTransformValue(),
                                    transition: isDragging ? "none" : "transform 300ms ease-out",
                                }}
                            >
                                {solutions.map((solution) => (
                                    <li key={solution.id} className={`shrink-0 ${SLIDE_WIDTH}`}>
                                        <SolutionCard solution={solution} onClick={handleCardClick} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SoluctionSection
