/**
 * Visual decorativo de la card "IA Aplicada" (SoluctionSection).
 * Chat con tus documentos: archivos en abanico, pregunta, respuesta con la
 * fuente citada y la barra donde se escribe el prompt.
 */

//Panel - mismo estilo que los paneles de DataAnalysisVisual
const TILE = 'flex min-h-0 flex-1 flex-col gap-1 overflow-hidden rounded-[9px] border px-[7px] py-1.5 ' +
    'border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ' +
    'dark:border-white/[0.06] dark:bg-zinc-900/70'


//Color y contenido de cada tipo de archivo
const FILE_TYPES = {
    pdf: { label: 'PDF', color: 'bg-red-600 dark:bg-red-400', body: 'lines' },
    xls: { label: 'XLS', color: 'bg-green-600 dark:bg-green-400', body: 'cells' },
    csv: { label: 'CSV', color: 'bg-teal-600 dark:bg-teal-400', body: 'cells' },
}

//Posición (px) y giro (grados) de cada hoja en el abanico
const FILES = [
    { type: 'pdf', x: 0, y: 6, rotate: -11 },
    { type: 'xls', x: 15, y: 0, rotate: 4 },
    { type: 'csv', x: 31, y: 7, rotate: 13 },
]

//Fondos dibujados con currentColor: el color lo pone la clase text-zinc-* (cambia con el tema)
const CELLS_BG = {
    backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
    backgroundSize: '4px 3px',
}
const LINES_BG = {
    backgroundImage: 'repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 3px)',
}

//Burbujas de chat
const MSG = 'max-w-[78%] shrink-0 rounded-lg px-[7px] py-1 text-[6.5px] leading-[1.45] text-zinc-800 dark:text-zinc-100'
const MSG_USER = 'self-end rounded-br-[2px] bg-zinc-200 dark:bg-zinc-700'
const MSG_BOT = 'self-start rounded-bl-[2px] bg-violet-500/15 dark:bg-violet-400/15'

//Ícono de chispa (IA)
const SparkIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className}>
        <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
    </svg>
)

function FileSheet({ type, x, y, rotate }) {
    const file = FILE_TYPES[type]
    return (
        <div className="absolute h-6 w-[19px] overflow-hidden rounded-[2.5px] border border-zinc-300 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.09)] dark:border-zinc-600 dark:bg-zinc-900" style={{ left: x, top: y, transform: `rotate(${rotate}deg)` }}>
            {/* Contenido: celdas (hojas de cálculo) o líneas (documentos) */}
            {file.body === 'cells' ? (
                <div className="absolute inset-x-[2.5px] top-1 bottom-2 border border-zinc-300 text-zinc-300 dark:border-zinc-600 dark:text-zinc-600" style={CELLS_BG}>
                    <div className={`absolute inset-x-0 top-0 h-[3px] opacity-50 ${file.color}`} />
                </div>
            ) : (
                <div className="absolute inset-x-[2.5px] top-1 bottom-2">
                    <div className={`h-[2px] w-[60%] ${file.color}`} />
                    <div className="mt-[3px] h-[calc(100%_-_5px)] text-zinc-300 dark:text-zinc-600" style={LINES_BG} />
                </div>
            )}

            {/* Esquina doblada: mitad del color del panel, mitad gris */}
            <div className="absolute -top-px -right-px h-[5px] w-[5px] bg-linear-225 from-white from-50% to-zinc-300 to-50% dark:from-zinc-900 dark:to-zinc-600" />

            {/* Etiqueta del formato */}
            <span className={`absolute bottom-0.5 left-0.5 rounded-[1px] px-[1.5px] py-px font-mono text-[3.5px] leading-none font-bold text-white ${file.color}`}>
                {file.label}
            </span>
        </div>
    )
}

const AppliedAIVisual = () => {
    return (
        <div aria-hidden="true" className="absolute inset-x-3 top-2.5 bottom-0 flex flex-col">
            <div className={TILE}>
                {/* Encabezado */}
                <div className="flex shrink-0 items-center gap-[5px]">
                    <span className="grid h-3 w-3 shrink-0 place-items-center rounded-full bg-violet-500 dark:bg-violet-400">
                        <SparkIcon className="h-[7px] w-[7px] fill-white"></SparkIcon>
                    </span>
                    <span className="text-[6.5px] font-semibold txt-zinc-800 dark:text-zinc-100">Asistente</span>
                    <span className="ml-auto flex items-center gap-[3px] text-[6px] text-zinc-400 dark:text-zinc-500">
                        <span className="h-1 w-1 rounded-full bg-green-500" />
                        en línea
                    </span>
                </div>

                {/* Archivos en abanico — arriba a la derecha */}
                <div className="relative mr-1 h-[32px] w-[52px] shrink-0 self-end">
                    {FILES.map((file) => (
                        <FileSheet key={file.type} {...file} />
                    ))}
                </div>

                {/* Pregunta del usuario */}
                <div className={`${MSG} ${MSG_BOT}`}>¿Qué región vendió más este trimestre?</div>

                {/* Respuesta de la IA con la fuente citada */}
                <div className={`${MSG} ${MSG_BOT}`}>
                    Norte, con <b className="font-bold text-violet-700 dark:text-violet-300">$420K</b> (+18% vs. Q2).
                    <span className="mt-[3px] flex items-center gap-[3px] whitespace-nowrap font-mono text-[5.5px] text-zinc-400 dark:text-zinc-500">
                        <i className="h-1.5 w-[5px] rounded-[1px] bg-green-600 dark:bg-green-400" />
                        ventas_q3.xlsx · hoja Resumen
                    </span>
                </div>

                {/* Barra de prompt */}
                <div className="mt-0.5 flex shrink-0 items-center gap-[5px] rounded-full border border-zinc-300 bg-gray-100 py-[3px] pr-[3px] pl-1.5 dark:border-zinc-600 dark:bg-zinc-800">
                    {/* Clip */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-2 w-2 shrink-0 text-zinc-400 dark:text-zinc-500">
                        <path d="M21.4 11.1l-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
                    </svg>
                    <span className="min-w-0 flex-1 truncate text-[6px] text-zinc-400 dark:text-zinc-500">Pregunta sobre tus archivos…</span>
                    {/* Enviar */}
                    <span className="grid h-[13px] w-[13px] shrink-0 place-items-center rounded-full bg-violet-500 dark:bg-violet-400">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-[7px] w-[7px]">
                            <path d="M12 19V5M6 11l6-6 6 6" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AppliedAIVisual