/**
 * Ilustración animada de la card "Domina la IA Generativa" (FormationSection).
 *
 * Piezas:
 *   1. Fondo de puntos
 *   2. Seis logos de IA alrededor (en gris; se encienden uno a uno)
 *   3. Lienzo de 260 × 220 px centrado, con:
 *      - brillo azul suave
 *      - ventana de chat inclinada: encabezado, respuesta en 3 puntos, barra del prompt y cursor
 *      - notificación "Resumen listo"
 *
 * Animación: keyframes genai-* y variante "animar" en src/index.css.
 *   Escritorio → corre al pasar el mouse por la card (la card tiene la clase group).
 *   Móvil → corre siempre.
 *   Sin animación, la ilustración se ve completa.
 */
import { ArrowUp, Check } from 'lucide-react'

//datos
import { aiTools } from '../../data/aiTools'

//Los 3 puntos de la respuesta: número y ancho de sus dos líneas
const POINTS = [
    { number: 1, line1: '92%', line2: '64%' },
    { number: 2, line1: '86%', line2: '52%' },
    { number: 3, line1: '90%', line2: '70%' },
]

/**
 * Círculo azul con una chispa: el "avatar" de la IA.
 * Se usa dos veces (encabezado y título de la respuesta).
 */
function SparkIcon({ className }) {
    return (
        <span className={`grid shrink-0 place-items-center rounded-full bg-linear-135 from-blue-600 to-indigo-500 text-white dark:from-blue-400 dark:to-indigo-400 ${className}`}>
            <svg viewBox="0 0 24 24" className="size-[55%] fill-current">
                <path d="M12 2l2.2 6.3L21 10.5l-6.8 2.2L12 19l-2.2-6.3L3 10.5l6.8-2.2z" />
            </svg>
        </span>
    )
}

export default function GenerativeAIVisual() {
    return (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden normal-case tracking-normal">

            {/* 1. Fondo de puntos (se desvanece hacia los bordes) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#e4e4e7_1.1px,transparent_1.3px)] bg-size-[14px_14px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] dark:bg-[radial-gradient(circle,#2e2e33_1.1px,transparent_1.3px)]" />

            {/* 2. Logos de IA alrededor */}
            {aiTools.map((tool, index) => {
                //Cada logo se enciende 1.5 s después del anterior (6 logos × 1.5 s = ciclo de 9 s)
                const delay = { animationDelay: `${index * 1.5}s` }

                return (
                    <span
                        key={tool.id}
                        className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/[0.08] bg-white shadow-[0_10px_28px_-12px_rgba(15,23,42,0.22)] animar:animate-genai-float dark:border-white/[0.08] dark:bg-[#1a1a1e]"
                        style={{
                            left: tool.x,
                            top: tool.y,
                            '--brand': tool.color,
                            '--brand-dark': tool.darkColor ?? tool.color,
                            ...delay,
                        }}
                    >
                        <svg viewBox="0 0 24 24" style={delay} className="size-[15px] fill-[var(--brand)] opacity-40 grayscale animar:animate-genai-logo dark:fill-[var(--brand-dark)]">
                            <path d={tool.path} />
                        </svg>

                        {/* Aro azul que aparece cuando el logo se enciende */}
                        <span style={delay} className="absolute -inset-px rounded-full border border-blue-600 opacity-0 shadow-[0_0_0_3px_rgba(37,99,235,0.12)] animar:animate-genai-ring dark:border-blue-400" />
                    </span>
                )
            })}

            {/* 3. Lienzo de 260 × 220 px centrado (al 90 % en móvil) */}
            <div className="absolute top-1/2 left-1/2 h-[220px] w-[260px] -translate-x-1/2 -translate-y-1/2 scale-90 md:scale-100">

                {/* Brillo azul suave detrás del chat */}
                <div className="absolute top-2.5 left-[30px] size-[200px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_68%)] dark:bg-[radial-gradient(circle,rgba(96,165,250,0.22),transparent_68%)]" />

                {/* 4. Ventana de chat, girada 4° */}
                <div className="absolute top-[46px] left-[45px] h-32 w-[170px] -rotate-4 overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.75),0_22px_44px_-14px_rgba(15,23,42,0.22)] dark:border-white/[0.08] dark:bg-[#1a1a1e] dark:shadow-[0_0_0_5px_rgba(19,19,22,0.75),0_22px_44px_-14px_rgba(0,0,0,0.7)]">

                    {/* 4a. Encabezado */}
                    <div className="flex h-[22px] items-center gap-[5px] border-b border-black/[0.08] px-2 text-[7.5px] font-bold whitespace-nowrap text-zinc-800 dark:border-white/[0.08] dark:text-zinc-100">
                        <SparkIcon className="size-[13px]" />
                        Asistente IA
                        <span className="ml-auto text-[6.5px] font-semibold text-blue-600 dark:text-blue-400">● en línea</span>
                    </div>

                    {/* Cuerpo del chat: lo que queda debajo del encabezado */}
                    <div className="relative h-[104px]">

                        {/* 4b. Respuesta: título + 3 puntos */}
                        <div className="absolute top-2 left-[9px] flex items-center gap-[5px] text-[7.5px] font-bold text-zinc-800 dark:text-zinc-100">
                            <SparkIcon className="size-[13px] animar:animate-genai-pulse" />
                            Resumen del informe
                        </div>

                        <div className="absolute top-[26px] right-3 left-[9px] flex flex-col gap-[7px]">
                            {POINTS.map((point, index) => (
                                <div
                                    key={point.number}
                                    className="flex items-start gap-1.5 animar:animate-genai-point"
                                    style={{ animationDelay: `${index * 0.48}s` }}
                                >
                                    <span className="grid size-[11px] shrink-0 place-items-center rounded-full bg-blue-600/10 text-[6px] font-bold text-blue-600 dark:bg-blue-400/15 dark:text-blue-400">
                                        {point.number}
                                    </span>
                                    <span className="flex flex-1 flex-col gap-[3px] pt-0.5">
                                        <span
                                            className={`h-[3.5px] rounded-full ${index === 0 ? 'bg-blue-600/55 dark:bg-blue-400/55' : 'bg-zinc-200 dark:bg-zinc-700'}`}
                                            style={{ width: point.line1 }}
                                        />
                                        <span className="h-[3.5px] rounded-full bg-zinc-200 dark:bg-zinc-700" style={{ width: point.line2 }} />
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* 4c. Barra del prompt: texto + cursor de escritura + botón enviar */}
                        <div className="absolute right-2 bottom-[7px] left-2 flex h-[22px] items-center gap-[5px] rounded-full border border-black/[0.08] bg-zinc-100 pr-[3px] pl-[9px] dark:border-white/[0.08] dark:bg-zinc-800">
                            <span className="flex flex-1 items-center overflow-hidden text-[7px] whitespace-nowrap text-zinc-800 dark:text-zinc-100">
                                <span className="inline-block w-[68px] overflow-hidden animar:animate-genai-type">Resume este informe</span>
                                <span className="h-2 w-px bg-blue-600 animar:animate-genai-caret dark:bg-blue-400" />
                            </span>
                            <span className="relative grid size-4 shrink-0 place-items-center rounded-full bg-blue-600 text-white animar:animate-genai-send dark:bg-blue-500">
                                <ArrowUp className="size-2.5" strokeWidth={3} />
                                {/* Onda que sale del botón al hacer clic */}
                                <span className="absolute inset-0 rounded-full border-[1.5px] border-blue-600 opacity-0 animar:animate-genai-ripple dark:border-blue-400" />
                            </span>
                        </div>
                    </div>

                    {/* 4d. Cursor del mouse sobre el botón enviar */}
                    <svg viewBox="0 0 14 16" className="absolute top-[108px] left-[149px] h-3.5 w-3 fill-zinc-800 stroke-white stroke-[1.2] animar:animate-genai-cursor dark:fill-zinc-100 dark:stroke-[#131316]">
                        <path strokeLinejoin="round" d="M1 1v12l3.2-3 2.3 5 2-.9-2.3-4.9H11z" />
                    </svg>
                </div>

                {/* 5. Notificación */}
                <div className="absolute top-[26px] right-[18px] flex items-center gap-[5px] rounded-full border border-black/[0.08] bg-white py-1 pr-[9px] pl-1 text-[7.5px] font-bold whitespace-nowrap text-zinc-800 shadow-[0_10px_24px_-8px_rgba(37,99,235,0.55)] animar:animate-genai-toast dark:border-white/[0.08] dark:bg-[#1a1a1e] dark:text-zinc-100">
                    <span className="grid size-3.5 place-items-center rounded-full bg-blue-600 text-white dark:bg-blue-500">
                        <Check className="size-2" strokeWidth={3.5} />
                    </span>
                    Resumen listo
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">· 2 s</span>
                </div>
            </div>
        </div>
    )
}