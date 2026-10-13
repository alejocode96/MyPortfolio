/**
 * Ilustración animada de la card "Mentoría Empresarial" (FormationSection).
 * Un tablero de transformación con tres columnas: Hallazgos → Solución → Implementado.
 * La tarjeta "Aprobación manual de facturas" avanza de columna y cambia de etiqueta:
 * cuello de botella → flujo en n8n → ✓ −12 h/semana.
 *
 * Animación: keyframes board-* y la variante "animar" en src/index.css
 * (hover en escritorio, siempre en móvil, nunca con "reducir movimiento").
 * Sin animación se ve el estado final: la tarjeta en "Implementado".
 */
import { Check, TriangleAlert, Zap } from 'lucide-react'

//Columnas del tablero: nombre, cantidad de tarjetas y tarjetas de fondo (ancho de sus dos líneas, en %)
const COLUMNS = [
    { name: 'Hallazgos', count: 3, cards: [[80, 50], [70, 40]] },
    { name: 'Solución', count: 2, cards: [[75, 55]] },
    { name: 'Implementado', count: 4, cards: [[85, 60], [65, 45]] },
]

export default function TransformationBoardVisual() {
    return (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden normal-case tracking-normal">

            {/* 1. Fondo de puntos */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#e4e4e7_1.1px,transparent_1.3px)] bg-size-[14px_14px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_25%,transparent_100%)] dark:bg-[radial-gradient(circle,#2e2e33_1.1px,transparent_1.3px)]" />

            {/* 2. Tablero: centrado, hasta 440 px de ancho */}
            <div className="absolute top-1/2 left-1/2 h-[calc(100%-20px)] w-[min(calc(100%-24px),440px)] -translate-x-1/2 -translate-y-1/2">

                {/* Columnas */}
                <div className="grid h-full grid-cols-3 gap-1.5">
                    {COLUMNS.map((column) => (
                        <div key={column.name} className="flex flex-col gap-[5px] rounded-[10px] bg-zinc-100/70 p-1.5 dark:bg-zinc-800/60">
                            <div className="flex items-center justify-between text-[7px] font-bold text-zinc-500 dark:text-zinc-400">
                                {column.name}
                                <span className="grid h-[13px] min-w-[13px] place-items-center rounded-full border border-black/[0.08] bg-white px-[3px] text-[6.5px] text-zinc-800 dark:border-white/[0.08] dark:bg-[#1a1a1e] dark:text-zinc-100">
                                    {column.count}
                                </span>
                            </div>

                            {/* Espacio donde se apoya la tarjeta que avanza */}
                            <span className="h-10 shrink-0" />

                            {/* Tarjetas de fondo */}
                            {column.cards.map(([line1, line2], i) => (
                                <span key={i} className="flex flex-col gap-[3px] rounded-[7px] border border-black/[0.08] bg-white px-1.5 py-[5px] dark:border-white/[0.08] dark:bg-[#1a1a1e]">
                                    <span className="block h-[3px] rounded-full bg-zinc-200 dark:bg-zinc-700" style={{ width: `${line1}%` }} />
                                    <span className="block h-[3px] rounded-full bg-zinc-200 dark:bg-zinc-700" style={{ width: `${line2}%` }} />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>

                {/* 3. La tarjeta que avanza (en reposo: columna "Implementado") */}
                <div className="absolute top-6 left-[calc(6px+2*((100%-12px)/3+6px))] z-10 flex w-[calc((100%-12px)/3-12px)] flex-col gap-1 rounded-lg border border-black/[0.08] bg-white px-[7px] py-1.5 text-[7px] font-bold text-zinc-800 shadow-[0_12px_24px_-10px_rgba(15,23,42,0.3),0_0_0_1.5px_#2563eb] animar:animate-board-move dark:border-white/[0.08] dark:bg-[#1a1a1e] dark:text-zinc-100 dark:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.6),0_0_0_1.5px_#60a5fa]">
                    Aprobación manual de facturas

                    {/* Las tres etiquetas ocupan el mismo lugar; se ve una a la vez */}
                    <span className="grid">
                        <span className="col-start-1 row-start-1 inline-flex items-center gap-[3px] justify-self-start rounded-full bg-zinc-800 px-[5px] py-px text-[6px] whitespace-nowrap text-white opacity-0 animar:animate-board-tag-first dark:bg-zinc-100 dark:text-zinc-900">
                            <TriangleAlert className="size-[7px]" strokeWidth={3} />
                            Cuello de botella
                        </span>
                        <span className="col-start-1 row-start-1 inline-flex items-center gap-[3px] justify-self-start rounded-full bg-blue-600/10 px-[5px] py-px text-[6px] whitespace-nowrap text-blue-600 opacity-0 animar:animate-board-tag-second dark:bg-blue-400/15 dark:text-blue-400">
                            <Zap className="size-[7px] fill-current" strokeWidth={0} />
                            Flujo en n8n
                        </span>
                        <span className="col-start-1 row-start-1 inline-flex items-center gap-[3px] justify-self-start rounded-full bg-blue-600 px-[5px] py-px text-[6px] whitespace-nowrap text-white animar:animate-board-tag-third dark:bg-blue-500">
                            <Check className="size-[7px]" strokeWidth={3.5} />
                            −12 h/semana
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}
