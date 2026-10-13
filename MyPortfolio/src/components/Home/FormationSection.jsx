/**
 * @component FormationSection.jsx
 * @version 2.0.0 — diseño final (sin animaciones)
 *
 * Sección "Aprende conmigo" del Home: cursos y mentorías en un grid bento.
 *
 * Estructura:
 *   <section>                 → relative + overflow-x-clip, con una luz azul suave en la base
 *   ├── Encabezado            → título centrado + subtítulo, con logos de herramientas flotando alrededor
 *   └── Grid bento            → 5 cards; el alto de cada card lo da su contenido
 *
 * Grid (lg usa 6 columnas para que las dos mentorías midan lo mismo):
 *   lg (6 col):  [ IA IA IA IA | AU AU ]     md (2 col):  [ IA  IA ]     móvil (1 col): IA, AU, DA, MP, ME
 *                [ DA DA DA DA | AU AU ]                  [ AU  AU ]
 *                [ MP MP MP | ME ME ME ]                  [ DA  DA ]
 *                                                         [ MP  ME ]
 * Formato de cada card: W = animación al lado del texto · H = animación arriba.
 * La zona de animación no tiene borde ni recuadro: ocupa su espacio hasta el borde de la card.
 *
 * Datos: src/data/formations.js (cards) y src/data/toolLogos.js (logos).
 */
import { ArrowUpRight } from 'lucide-react'

//datos
import { formations } from '../../data/formations'
import { toolLogos } from '../../data/toolLogos'

//ilustraciones animadas de las cards
import GenerativeAIVisual from '../FormationVisuals/GenerativeAIVisual'
import AutomationFlowVisual from '../FormationVisuals/AutomationFlowVisual'
import DataReportVisual from '../FormationVisuals/DataReportVisual'
import MentorCallVisual from '../FormationVisuals/MentorCallVisual'
import TransformationBoardVisual from '../FormationVisuals/TransformationBoardVisual'

// ==================== ESTILOS ====================

//Card bento — blanca, radio grande, borde de 1px hecho con sombra
const CARD =
    'relative flex overflow-hidden rounded-[28px] bg-white ' +
    'shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.12)] ' +
    'dark:bg-[#131316] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_32px_-12px_rgba(0,0,0,0.6)]'

//Zona de animación — sin borde: solo un tinte azul que nace de la esquina
const ZONE =
    'relative grid place-items-center text-[9px] font-medium uppercase tracking-[0.1em] text-zinc-400/70 dark:text-zinc-600 ' +
    'bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.10),transparent_70%)] ' +
    'dark:bg-[radial-gradient(ellipse_at_top_left,rgba(96,165,250,0.10),transparent_70%)]'
const ZONE_FEATURED =
    'bg-[radial-gradient(ellipse_at_20%_30%,rgba(37,99,235,0.22),transparent_70%)] ' +
    'dark:bg-[radial-gradient(ellipse_at_20%_30%,rgba(96,165,250,0.22),transparent_70%)]'

//Baldosa de cada logo — vidrio claro u oscuro
const LOGO_TILE =
    'absolute z-20 grid size-[34px] place-items-center rounded-[11px] border border-black/[0.06] bg-white/90 backdrop-blur-sm ' +
    'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.12)] ' +
    'dark:border-white/[0.06] dark:bg-[#131316]/90 lg:size-[46px] lg:rounded-[14px]'

//Posición y giro de cada logo respecto al bloque del título.
//Móvil y tablet: solo 5 logos (arriba y abajo). Desde lg: los 9 alrededor.
const LOGO_PLACEMENT = {
    claude: 'top-[-46px] left-0.5 -rotate-[8deg] lg:top-[-10px] lg:-left-[104px] lg:-rotate-6',
    openai: 'top-[-58px] left-[44%] rotate-[4deg] lg:top-[34%] lg:-left-[58px] lg:rotate-[5deg]',
    googlegemini: 'hidden lg:grid lg:top-[68%] lg:-left-[108px] lg:-rotate-[4deg]',
    n8n: 'top-[-46px] right-0.5 rotate-[7deg] lg:top-[-14px] lg:-right-[104px] lg:rotate-6',
    make: 'hidden lg:grid lg:top-[22%] lg:-right-[54px] lg:-rotate-[5deg]',
    zapier: 'hidden lg:grid lg:top-[48%] lg:-right-[110px] lg:rotate-[4deg]',
    powerautomate: 'hidden lg:grid lg:top-[76%] lg:-right-[56px] lg:-rotate-6',
    python: 'bottom-[-48px] left-[18%] -rotate-6 lg:bottom-[-30px] lg:left-[34%] lg:-rotate-[5deg]',
    powerbi: 'bottom-[-48px] right-[18%] rotate-6 lg:bottom-[-30px] lg:right-auto lg:left-[58%]',
}

//Posición en el grid y formato (W/H) de cada card según el tamaño de pantalla.
//Escritas completas: Tailwind solo genera las clases que encuentra literales en el código.
const CARD_LAYOUT = {
    'ia-generativa': {
        grid: 'md:col-span-2 lg:col-span-4',                                      // ancha arriba
        direction: 'flex-col md:flex-row',                                        // H en móvil, W desde md
        zone: 'min-h-[206px] md:min-h-[240px] md:basis-[46%] md:shrink-0',
        text: 'md:justify-center md:py-[22px] md:pr-6 md:pl-1.5',
    },
    automatizacion: {
        grid: 'md:col-span-2 lg:col-span-2 lg:row-span-2',                        // columna alta en lg
        direction: 'flex-col md:flex-row lg:flex-col',                            // H · W en md · H en lg
        zone: 'min-h-40 md:min-h-[200px] md:basis-[46%] md:shrink-0 lg:min-h-[280px] lg:flex-1 lg:basis-auto',
        text: 'md:justify-center md:py-[22px] md:pr-6 md:pl-1.5 lg:justify-start lg:pt-1.5 lg:pr-[22px] lg:pb-[22px] lg:pl-[22px]',
    },
    datos: {
        grid: 'md:col-span-2 lg:col-span-4',                                      // ancha, como la de IA
        direction: 'flex-col md:flex-row',                                        // H en móvil, W desde md
        zone: 'min-h-40 md:min-h-[200px] md:basis-[46%] md:shrink-0 lg:min-h-[240px]',
        text: 'md:justify-center md:py-[22px] md:pr-6 md:pl-1.5',
    },
    'mentoria-personalizada': {
        grid: 'lg:col-span-3',                                                    // mitad izquierda de la última fila
        direction: 'flex-col lg:flex-row',                                        // H en móvil y tablet, W en lg
        zone: 'min-h-40 lg:min-h-[200px] lg:basis-[54%] lg:shrink-0',
        text: 'lg:justify-center lg:py-[22px] lg:pr-6 lg:pl-1.5',
    },
    'mentoria-empresarial': {
        grid: 'lg:col-span-3',                                                    // mitad derecha de la última fila
        direction: 'flex-col lg:flex-row',                                        // H en móvil y tablet, W en lg
        zone: 'min-h-40 lg:min-h-[200px] lg:basis-[54%] lg:shrink-0',
        text: 'lg:justify-center lg:py-[22px] lg:pr-6 lg:pl-1.5',
    },
}

// ==================== PIEZAS ====================

/**
 * Logo de una herramienta en su baldosa de vidrio.
 * El color va en variables CSS: --brand (claro) y --brand-dark (oscuro).
 */
function ToolLogo({ tool }) {
    return (
        <span
            title={tool.name}
            className={`${LOGO_TILE} ${LOGO_PLACEMENT[tool.id]}`}
            style={{ '--brand': tool.color, '--brand-dark': tool.darkColor ?? tool.color }}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[17px] fill-[var(--brand)] lg:size-[22px] dark:fill-[var(--brand-dark)]">
                <path d={tool.path} />
            </svg>
        </span>
    )
}

/**
 * Card bento de una formación.
 * @param {Object} props.formation  Elemento de formations.js
 */
function FormationCard({ formation }) {
    const layout = CARD_LAYOUT[formation.id]
    const { featured, cta } = formation

    //Contenido del CTA: texto + círculo con flecha.
    //Hover del botón (group/cta): el círculo crece con un aro y la flecha gira hasta apuntar a la derecha
    const ctaContent = (
        <>
            {cta.label}
            <span className={`grid size-[26px] place-items-center rounded-full transition duration-300 group-hover/cta:scale-110 ${featured
                ? 'bg-blue-600 text-white group-hover/cta:shadow-[0_0_0_4px_rgba(37,99,235,0.15)] dark:bg-blue-500'
                : 'bg-zinc-900 text-white group-hover/cta:shadow-[0_0_0_4px_rgba(113,113,122,0.2)] dark:bg-zinc-100 dark:text-zinc-900'}`}>
                <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/cta:rotate-45" />
            </span>
        </>
    )
    const ctaClass = 'group/cta mt-1.5 inline-flex items-center gap-2 self-start text-[12.5px] font-semibold text-zinc-800 transition-colors duration-300 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400'

    return (
        //group: el hover en cualquier parte de la card activa la animación de su ilustración (variante animar: en index.css)
        <article className={`group ${CARD} ${layout.grid} ${layout.direction}`}>
            {/* Zona de animación: la ilustración de la card o, si aún no tiene, la etiqueta */}
            <div aria-hidden="true" className={`${ZONE} ${featured ? ZONE_FEATURED : ''} ${layout.zone}`}>
                {formation.id === 'ia-generativa' ? <GenerativeAIVisual />
                    : formation.id === 'automatizacion' ? <AutomationFlowVisual />
                    : formation.id === 'datos' ? <DataReportVisual />
                    : formation.id === 'mentoria-personalizada' ? <MentorCallVisual />
                    : formation.id === 'mentoria-empresarial' ? <TransformationBoardVisual />
                    : 'Animación'}
            </div>

            {/* Texto */}
            <div className={`relative flex min-w-0 flex-1 flex-col gap-2 px-[22px] pt-1.5 pb-[22px] ${layout.text}`}>
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${featured ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    <span className={`size-1.5 rounded-full ${featured ? 'bg-blue-600 dark:bg-blue-400' : 'bg-zinc-400 dark:bg-zinc-500'}`} />
                    {featured ? `${formation.type} destacado` : formation.type}
                </span>
                <h3 className={`font-bold leading-tight tracking-tight text-zinc-800 dark:text-zinc-100 ${featured ? 'text-xl md:text-[25px]' : 'text-[17px] md:text-[19px]'}`}>
                    {formation.title}
                </h3>
                <p className="text-[12.5px] leading-relaxed text-zinc-500 md:text-[13px] dark:text-zinc-400">
                    {formation.description}
                </p>

                {/* CTA: enlace (mentorías → contacto) o botón (cursos: temario pendiente) */}
                {cta.href
                    ? <a href={cta.href} className={ctaClass}>{ctaContent}</a>
                    : <button type="button" className={ctaClass}>{ctaContent}</button>}
            </div>
        </article>
    )
}

// ==================== SECCIÓN ====================

const FormationSection = () => {
    return (
        <section id="formationSection" className="relative mb-10 w-full overflow-x-clip px-6 pt-20 pb-14 sm:px-8 md:px-10 lg:pt-16" style={{ scrollMarginTop: '24px' }}>

            {/* Luz azul suave debajo de las últimas cards.
                La caja baja 7rem más allá del final de la sección (-bottom-28) y el centro del brillo queda
                justo debajo de las cards: así se desvanece por completo dentro de la caja, sin línea de corte.
                (La sección solo recorta a los lados con overflow-x-clip, por eso puede salir por abajo). */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-28 h-80 bg-[radial-gradient(ellipse_55%_40%_at_50%_45%,rgba(37,99,235,0.18),transparent_75%)] dark:bg-[radial-gradient(ellipse_55%_40%_at_50%_45%,rgba(96,165,250,0.18),transparent_75%)]" />

            {/* Encabezado: título + subtítulo, con los logos flotando alrededor */}
            <div className="relative z-10 mx-auto mb-20 max-w-3xl px-1.5 text-center lg:mb-14 lg:max-w-[760px] lg:px-8 lg:py-9">
                {toolLogos.map((tool) => (
                    <ToolLogo key={tool.id} tool={tool} />
                ))}

                <h2 className="text-[36px] leading-none font-extrabold tracking-tight text-zinc-700 md:text-5xl lg:text-[54px] dark:text-zinc-100">
                    <span className="block md:inline">APRENDE</span>{' '}
                    <span className="block text-zinc-500 md:inline dark:text-zinc-400">CONMIGO</span>
                </h2>
                <p className="mt-3.5 text-justify text-[12.5px] leading-relaxed text-zinc-500 [text-align-last:center] md:text-center md:text-sm dark:text-zinc-400">
                    Cursos y mentorías prácticas de IA, automatización y datos, con la experiencia de haber formado profesionales en NODO – EAFIT.
                </p>
            </div>

            {/* Grid bento — el alto de cada fila lo da el contenido */}
            <div className="relative z-10 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4 lg:grid-cols-6">
                {formations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                ))}
            </div>
        </section>
    )
}

export default FormationSection