/**
 * Visual decorativo de la card "Automatización" (SoluctionSection).
 * Lienzo de un editor de flujos: disparador (Webhook), condición y dos salidas,
 * con el camino ejecutado resaltado en azul cielo y el otro punteado.
 * Texto decorativo; se renderiza dentro del <figure> de SolutionCard (relative).
 */

// ==================== ESTILOS ====================

//Panel — mismo estilo que los de DataAnalysisVisual y AppliedAIVisual
const TILE =
    'flex min-h-0 flex-1 flex-col gap-[5px] overflow-hidden rounded-[9px] border px-[7px] py-1.5 ' +
    'border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ' +
    'dark:border-white/[0.06] dark:bg-zinc-900/70'

//Cuadrícula de puntos del lienzo — el color lo da text-zinc-* (cambia con el tema)
const CANVAS_DOTS = {
    backgroundImage: 'radial-gradient(circle, currentColor 0.8px, transparent 1px)',
    backgroundSize: '9px 9px',
}

//Estilo de cada tipo de nodo
const NODE_VARIANTS = {
    trigger: 'rounded-l-[11px] border-transparent bg-sky-500 text-white dark:bg-sky-400',
    active: 'border-sky-500 bg-white text-zinc-800 ring-3 ring-sky-500/15 dark:border-sky-400 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-sky-400/15',
    idle: 'border-zinc-300 bg-white text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100',
}

// ==================== DATOS (decorativos) ====================

//Nodos: x en % del ancho, y en px (el lienzo mide 92px)
const NODES = [
    { label: 'Webhook', icon: 'bolt', x: 12, y: 46, variant: 'trigger' },
    { label: 'Condición', icon: 'branch', x: 44, y: 46, variant: 'idle' },
    { label: 'Hoja de cálculo', icon: 'sheet', x: 82, y: 20, variant: 'active' },
    { label: 'Chat del equipo', icon: 'chat', x: 82, y: 72, variant: 'idle' },
]

//Conexiones de centro a centro: el camino ejecutado (active) va en azul
const LINKS = [
    { d: 'M12 46 L44 46', active: true },                     // Webhook → Condición
    { d: 'M44 46 C62 46, 62 20, 82 20', active: true },       // Condición → Hoja (ejecutado)
    { d: 'M44 46 C62 46, 62 72, 82 72', active: false },      // Condición → Chat (no ejecutado)
]

// ==================== ÍCONOS ====================

//Dibujo de cada ícono (viewBox 24×24)
const ICON_PATHS = {
    bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9z" fill="currentColor" stroke="none" />,
    play: <path d="M7 4v16l13-8z" fill="currentColor" stroke="none" />,
    branch: (
        <>
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="6" cy="18" r="2.5" />
            <circle cx="18" cy="8" r="2.5" />
            <path d="M6 8.5v7M18 10.5c0 4-4 5.5-9.5 6.5" />
        </>
    ),
    sheet: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 10h18M9 4v16" />
        </>
    ),
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
}

//Contenedor común de los íconos: trazo con el color del texto
const Icon = ({ name, className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {ICON_PATHS[name]}
    </svg>
)

// ==================== COMPONENTE ====================

const AutomationVisual = () => {
    return (
        <div aria-hidden="true" className="absolute inset-x-3 top-2.5 bottom-0 flex flex-col">
            <div className={TILE}>

                {/* Encabezado: nombre del editor + ejecuciones */}
                <div className="flex shrink-0 items-center gap-[5px]">
                    <span className="truncate text-[6.5px] uppercase tracking-[0.3px] text-zinc-400 dark:text-zinc-500">Editor de flujos</span>
                    <span className="ml-auto flex shrink-0 items-center gap-[3px] rounded-full bg-sky-500/15 px-1.5 py-px text-[6px] font-semibold text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                        <Icon name="play" className="h-[5px] w-[5px]" />
                        342 ejecuciones hoy
                    </span>
                </div>

                {/* Lienzo */}
                <div className="relative h-[92px] shrink-0 rounded-md text-zinc-300 dark:text-zinc-600" style={CANVAS_DOTS}>

                    {/* Conexiones (debajo de los nodos) */}
                    <svg viewBox="0 0 100 92" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                        {LINKS.map((link) => (
                            <path
                                key={link.d}
                                d={link.d}
                                fill="none"
                                strokeWidth="1.5"
                                vectorEffect="non-scaling-stroke"
                                strokeDasharray={link.active ? undefined : '3 3'}
                                className={link.active ? 'stroke-sky-500 dark:stroke-sky-400' : 'stroke-zinc-300 dark:stroke-zinc-600'}
                            />
                        ))}
                    </svg>

                    {/* Nodos (encima de las conexiones) */}
                    {NODES.map((node) => (
                        <div
                            key={node.label}
                            className={`absolute grid h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${NODE_VARIANTS[node.variant]}`}
                            style={{ left: `${node.x}%`, top: node.y }}
                        >
                            <Icon name={node.icon} className="h-2.5 w-2.5" />
                            <span className="absolute top-full left-1/2 mt-[3px] -translate-x-1/2 whitespace-nowrap text-[5.5px] text-zinc-400 dark:text-zinc-500">
                                {node.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AutomationVisual