/**
 * Ilustración animada de la card "Mentoría Personalizada" (FormationSection).
 * Una videollamada 1:1: pantalla compartida con un gráfico, las cámaras de la
 * persona y del mentor (se marcan al hablar), tu pregunta y la respuesta.
 *
 * Animación: keyframes mentor-* y la variante "animar" en src/index.css
 * (hover en escritorio, siempre en móvil, nunca con "reducir movimiento").
 * Sin animación se ve la llamada completa: el gráfico construido y las dos burbujas.
 */
import { User } from 'lucide-react'

//Alto de las barras del gráfico compartido (%)
const SHARED_BARS = [36, 52, 44, 66, 58, 84]

export default function MentorCallVisual() {
    return (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden normal-case tracking-normal">

            {/* 1. Fondo de puntos */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#e4e4e7_1.1px,transparent_1.3px)] bg-size-[14px_14px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_25%,transparent_100%)] dark:bg-[radial-gradient(circle,#2e2e33_1.1px,transparent_1.3px)]" />

            {/* 2. Ventana de la videollamada */}
            <div className="absolute inset-x-[5%] top-[7%] bottom-[7%] flex flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_10px_28px_-12px_rgba(15,23,42,0.22)] dark:border-white/[0.08] dark:bg-[#1a1a1e]">

                {/* Encabezado: punto de grabación, título y duración */}
                <div className="flex items-center gap-1.5 border-b border-black/[0.08] px-2 py-[5px] text-[7.5px] font-bold whitespace-nowrap text-zinc-800 dark:border-white/[0.08] dark:text-zinc-100">
                    <span className="size-1.5 rounded-full bg-blue-600 animar:animate-mentor-rec dark:bg-blue-400" />
                    Mentoría 1:1
                    <span className="ml-auto font-mono text-[7px] font-medium text-zinc-500 dark:text-zinc-400">24:18</span>
                </div>

                <div className="flex min-h-0 flex-1 gap-1.5 p-1.5">

                    {/* 3. Pantalla compartida */}
                    <div className="relative flex min-w-0 flex-1 flex-col gap-1 overflow-hidden rounded-lg bg-zinc-100 px-[7px] py-1.5 dark:bg-zinc-800">
                        <span className="text-[6.5px] font-bold tracking-[0.05em] text-zinc-400 uppercase dark:text-zinc-500">Pantalla compartida</span>

                        {/* Gráfico que se construye durante la explicación */}
                        <div className="flex min-h-0 flex-1 items-end gap-[3px]">
                            {SHARED_BARS.map((value, i) => (
                                <span
                                    key={i}
                                    className={`block flex-1 origin-bottom rounded-t-[2px] rounded-b-[1px] animar:animate-mentor-bar ${i === SHARED_BARS.length - 1 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-blue-600/40 dark:bg-blue-400/40'}`}
                                    style={{ height: `${value}%` }}
                                />
                            ))}
                        </div>

                        {/* Puntero del mentor señalando el gráfico */}
                        <span className="absolute top-[34%] right-[18%] size-2 rounded-full bg-blue-600/35 shadow-[0_0_0_4px_rgba(37,99,235,0.12)] animar:animate-mentor-pointer dark:bg-blue-400/35" />

                        {/* Burbujas apiladas: si la pregunta ocupa dos líneas, empuja hacia arriba y no se tapan */}
                        <div className="absolute right-2 bottom-2 left-2 flex flex-col items-start gap-1">
                            {/* Tu pregunta */}
                            <span className="max-w-[78%] rounded-[9px] rounded-bl-[2px] border border-black/[0.08] bg-white px-2 py-1 text-[7.5px] font-semibold text-zinc-800 shadow-[0_6px_16px_-8px_rgba(15,23,42,0.25)] animar:animate-mentor-ask dark:border-white/[0.08] dark:bg-[#1a1a1e] dark:text-zinc-100">
                                ¿Cómo automatizo este reporte?
                            </span>

                            {/* La respuesta del mentor */}
                            <span className="max-w-[78%] rounded-[9px] rounded-bl-[2px] bg-blue-600 px-2 py-1 text-[7.5px] font-semibold text-white animar:animate-mentor-answer dark:bg-blue-500">
                                Te lo muestro paso a paso
                            </span>
                        </div>
                    </div>

                    {/* 4. Cámaras: tú y el mentor */}
                    <div className="flex w-[28%] flex-col gap-1.5">
                        <div className="relative grid flex-1 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <span className="grid size-[22px] place-items-center rounded-full border border-black/[0.08] bg-white text-[8px] font-bold text-zinc-500 dark:border-white/[0.08] dark:bg-[#1a1a1e] dark:text-zinc-400"><User className="size-3" strokeWidth={2.5} /></span>
                            <span className="absolute bottom-[3px] left-1 text-[6px] font-semibold text-zinc-500 dark:text-zinc-400">Tú</span>
                            {/* Borde azul mientras habla */}
                            <span className="absolute -inset-px rounded-[9px] border-[1.5px] border-blue-600 opacity-0 animar:animate-mentor-talk-you dark:border-blue-400" />
                        </div>
                        <div className="relative grid flex-1 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <span className="grid size-[22px] place-items-center rounded-full border border-blue-600/30 bg-blue-600/10 text-[8px] font-bold text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/15 dark:text-blue-400">AG</span>
                            <span className="absolute bottom-[3px] left-1 text-[6px] font-semibold text-zinc-500 dark:text-zinc-400">Mentor</span>
                            <span className="absolute -inset-px rounded-[9px] border-[1.5px] border-blue-600 opacity-0 animar:animate-mentor-talk-mentor dark:border-blue-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
