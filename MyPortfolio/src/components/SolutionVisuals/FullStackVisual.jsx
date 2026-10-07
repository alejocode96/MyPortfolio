/**
 * Visual decorativo de la card "Desarrollo Full Stack" (SoluctionSection).
 * Ventana de una app empresarial (front) con un editor de código encima (back)
 * y un sello de rendimiento. Acento en azul índigo (indigo).
 * Texto decorativo; se renderiza dentro del <figure> de SolutionCard (relative).
 */

// ==================== DATOS (decorativos) ====================

//Filas de la lista de pedidos: ancho de la barra (%) y estado
const ORDERS = [
    { width: 80, status: 'Entregado', done: true },
    { width: 62, status: 'En proceso', done: false },
    { width: 72, status: 'Entregado', done: true },
    { width: 55, status: 'Pendiente', done: false },
]

//Líneas del editor: sangría y "palabras" (tipo de token + ancho en px)
const CODE_LINES = [
    { indent: 0, tokens: [['keyword', 14], ['keyword', 10], ['type', 30]] },
    { indent: 0, tokens: [['plain', 4]] },
    { indent: 1, tokens: [['type', 10], ['plain', 4], ['type', 18], ['plain', 8]] },
    { indent: 2, tokens: [['keyword', 10], ['type', 20], ['plain', 6]] },
    { indent: 2, tokens: [['keyword', 12], ['type', 16], ['string', 18]] },
    { indent: 1, tokens: [['plain', 4]] },
    { indent: 0, tokens: [['plain', 4]] },
]

//Color de cada tipo de token: todo en azules (el editor siempre es oscuro)
const TOKEN_COLORS = {
    keyword: 'bg-blue-300',
    type: 'bg-indigo-300',
    string: 'bg-sky-300',
    plain: 'bg-zinc-600',
}

//Borde suave que se repite en la ventana
const SOFT_BORDER = 'border-black/[0.06] dark:border-white/[0.07]'

// ==================== PIEZAS ====================

//Ventana del navegador con la app de pedidos (el front)
function BrowserWindow() {
    return (
        <div className={`absolute inset-x-0 top-0 bottom-[22%] flex flex-col overflow-hidden rounded-[9px] border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.05)] dark:bg-zinc-900 ${SOFT_BORDER}`}>

            {/* Barra: tres puntos + URL */}
            <div className={`flex shrink-0 items-center gap-[5px] border-b px-1.5 py-[5px] ${SOFT_BORDER}`}>
                <div className="flex shrink-0 gap-[2.5px]">
                    {[0, 1, 2].map((i) => (
                        <span key={i} className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                    ))}
                </div>
                <div className="flex h-[9px] min-w-0 flex-1 items-center gap-[3px] overflow-hidden rounded-full bg-gray-100 px-[5px] font-mono text-[5.5px] whitespace-nowrap text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-[5px] w-[5px] shrink-0 text-indigo-500 dark:text-indigo-400">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    app.empresa.com/pedidos
                </div>
            </div>

            {/* Cuerpo: menú lateral + lista */}
            <div className="flex min-h-0 flex-1">
                {/* Menú lateral — la primera opción es la activa */}
                <div className={`flex w-[22%] shrink-0 flex-col gap-1 border-r px-1 py-1.5 ${SOFT_BORDER}`}>
                    <span className="h-[3px] rounded-sm bg-indigo-500 dark:bg-indigo-400" />
                    {[0, 1, 2].map((i) => (
                        <span key={i} className="h-[3px] rounded-sm bg-zinc-200 dark:bg-zinc-700" />
                    ))}
                </div>

                {/* Lista de pedidos */}
                <div className="flex min-w-0 flex-1 flex-col gap-1 px-[7px] py-1.5">
                    <div className="flex shrink-0 items-center justify-between gap-1">
                        <span className="text-[6.5px] font-bold whitespace-nowrap text-zinc-800 dark:text-zinc-100">Pedidos</span>
                        <span className="shrink-0 rounded bg-indigo-500 px-[5px] py-0.5 text-[5.5px] font-bold whitespace-nowrap text-white dark:bg-indigo-400 dark:text-indigo-950">
                            + Nuevo pedido
                        </span>
                    </div>
                    {ORDERS.map((order, i) => (
                        <div key={i} className={`grid shrink-0 grid-cols-[1fr_32px] items-center gap-1 border-b py-[2.5px] ${SOFT_BORDER}`}>
                            <span className="h-[3px] rounded-sm bg-zinc-300 dark:bg-zinc-600" style={{ width: `${order.width}%` }} />
                            <span className={`rounded-full py-px text-center text-[5px] font-semibold ${order.done
                                ? 'bg-indigo-500/15 text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300'
                                : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500'}`}>
                                {order.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

//Editor de código superpuesto (el back) — siempre oscuro, como un IDE
function CodeEditor() {
    return (
        <div className="absolute top-[44%] -right-1 flex w-[52%] -rotate-4 flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-900 shadow-[0_8px_22px_rgba(0,0,0,0.22)] dark:bg-[#0b0b0e]">
            {/* Pestaña con el nombre del archivo */}
            <div className="flex shrink-0 items-center gap-1 border-b border-white/[0.06] bg-white/[0.04] px-1.5 py-1 font-mono text-[5.5px] whitespace-nowrap text-zinc-400">
                <span className="h-[5px] w-[5px] shrink-0 rounded-[1.5px] bg-indigo-400" />
                PedidosController.cs
            </div>

            {/* Código: cada "palabra" es una barra de color */}
            <div className="flex flex-col gap-[3px] px-1.5 py-[5px]">
                {CODE_LINES.map((line, i) => (
                    <div key={i} className="flex h-[3px] items-center gap-[3px]" style={{ marginLeft: line.indent * 5 }}>
                        <span className="mr-0.5 w-1.5 shrink-0 text-right font-mono text-[4px] leading-none text-zinc-600">{i + 1}</span>
                        {line.tokens.map(([type, width], j) => (
                            <span key={j} className={`block h-[3px] rounded-sm ${TOKEN_COLORS[type]}`} style={{ width }} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

//Sello de rendimiento: anillo al 98% + texto
function PerfBadge() {
    return (
        <div className={`absolute -top-[3px] right-1.5 flex items-center gap-[3px] rounded-full border bg-white py-0.5 pr-1.5 pl-[3px] text-[6px] font-bold whitespace-nowrap text-zinc-800 shadow-[0_3px_8px_rgba(0,0,0,0.08)] dark:bg-zinc-900 dark:text-zinc-100 ${SOFT_BORDER}`}>
            <svg viewBox="0 0 36 36" className="h-3 w-3">
                <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5" className="stroke-zinc-200 dark:stroke-zinc-700" />
                <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="86.2 88" transform="rotate(-90 18 18)" className="stroke-indigo-500 dark:stroke-indigo-400" />
            </svg>
            98
            <span className="text-[5.5px] font-medium text-zinc-400 dark:text-zinc-500">rendimiento</span>
        </div>
    )
}

// ==================== COMPONENTE ====================

const FullStackVisual = () => {
    return (
        <div aria-hidden="true" className="absolute inset-x-3 top-2.5 bottom-0">
            <BrowserWindow />
            <CodeEditor />
            <PerfBadge />
        </div>
    )
}

export default FullStackVisual