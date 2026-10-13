/**
 * Ilustración animada de la card "Datos que Hablan" (FormationSection).
 * Una ventana con dos pestañas: en el notebook de Python se escribe y ejecuta una
 * línea de pandas y salen las barras por región; después el cursor abre la pestaña
 * del informe de Power BI (indicadores + barras en amarillo).
 *
 * Animación: keyframes datos-* y la variante "animar" en src/index.css
 * (la misma regla de la card de IA: hover en escritorio, siempre en móvil).
 * Sin animación se ve el notebook de Python con su gráfico.
 */
import { Play } from 'lucide-react'

//datos
import { toolLogos } from '../../data/toolLogos'

//Los dos logos que usamos, tomados de la lista de herramientas
const python = toolLogos.find((tool) => tool.id === 'python')
const powerbi = toolLogos.find((tool) => tool.id === 'powerbi')

//Barras del notebook: ventas por región (alto en %)
const REGIONS = [
    { name: 'Norte', value: 92 },
    { name: 'Centro', value: 64 },
    { name: 'Sur', value: 48 },
    { name: 'Oeste', value: 35 },
]

//Barras del informe de Power BI (alto en %)
const REPORT_BARS = [46, 70, 54, 88, 62, 78]

/** Logo pequeño de una herramienta, con su color (y su color para modo oscuro) */
function ToolIcon({ tool }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-[9px] fill-[var(--brand)] dark:fill-[var(--brand-dark)]"
            style={{ '--brand': tool.color, '--brand-dark': tool.darkColor ?? tool.color }}
        >
            <path d={tool.path} />
        </svg>
    )
}

export default function DataReportVisual() {
    return (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden normal-case tracking-normal">

            {/* 1. Fondo de puntos */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#e4e4e7_1.1px,transparent_1.3px)] bg-size-[14px_14px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_25%,transparent_100%)] dark:bg-[radial-gradient(circle,#2e2e33_1.1px,transparent_1.3px)]" />

            {/* 2. Ventana */}
            <div className="absolute inset-x-[5%] top-[7%] bottom-[7%] flex flex-col overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_10px_28px_-12px_rgba(15,23,42,0.22)] dark:border-white/[0.08] dark:bg-[#1a1a1e]">

                {/* 3. Pestañas */}
                <div className="flex items-end gap-0.5 border-b border-black/[0.08] px-1.5 pt-1 dark:border-white/[0.08]">
                    {/* Pestaña del notebook (activa en reposo) */}
                    <span className="relative px-2 pt-[3px] pb-1">
                        <span className="absolute inset-0 rounded-t-md bg-zinc-100 animar:animate-datos-first dark:bg-zinc-800" />
                        <span className="relative flex items-center gap-1 font-mono text-[7px] whitespace-nowrap text-zinc-700 dark:text-zinc-200">
                            <ToolIcon tool={python} />
                            ventas.ipynb
                        </span>
                    </span>

                    {/* Pestaña del informe (se activa con el clic) */}
                    <span className="relative px-2 pt-[3px] pb-1">
                        <span className="absolute inset-0 rounded-t-md bg-zinc-100 opacity-0 animar:animate-datos-second dark:bg-zinc-800" />
                        <span className="relative flex items-center gap-1 font-mono text-[7px] whitespace-nowrap text-zinc-700 dark:text-zinc-200">
                            <ToolIcon tool={powerbi} />
                            Informe.pbix
                        </span>

                        {/* Cursor que hace clic en esta pestaña */}
                        <svg viewBox="0 0 14 16" className="absolute top-[70%] left-[60%] z-10 h-3.5 w-3 fill-zinc-800 stroke-white stroke-[1.2] opacity-0 animar:animate-datos-cursor dark:fill-zinc-100 dark:stroke-[#131316]">
                            <path strokeLinejoin="round" d="M1 1v12l3.2-3 2.3 5 2-.9-2.3-4.9H11z" />
                        </svg>
                    </span>
                </div>

                {/* 4. Las dos vistas, una encima de la otra */}
                <div className="relative min-h-0 flex-1">

                    {/* 4a. Notebook de Python (visible en reposo) */}
                    <div className="absolute inset-0 flex flex-col animar:animate-datos-first">
                        {/* Celda de código */}
                        <div className="mx-[7px] mt-[5px] flex items-center gap-1.5 rounded-[7px] bg-zinc-100 px-1.5 py-1 font-mono text-[7.5px] whitespace-nowrap text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
                            <span className="shrink-0 font-semibold text-blue-600 dark:text-blue-400">[1]</span>
                            <span className="inline-block w-[34ch] overflow-hidden animar:animate-datos-type">
                                df.<b className="font-semibold text-indigo-500 dark:text-indigo-400">groupby</b>(<span className="text-green-600 dark:text-green-400">"region"</span>).<b className="font-semibold text-indigo-500 dark:text-indigo-400">sum</b>().<b className="font-semibold text-indigo-500 dark:text-indigo-400">plot</b>()
                            </span>
                            <span className="ml-auto grid size-3.5 shrink-0 place-items-center rounded-full bg-blue-600 text-white animar:animate-datos-run dark:bg-blue-500">
                                <Play className="size-1.5 fill-current" />
                            </span>
                        </div>

                        {/* Salida: barras por región */}
                        <div className="relative flex min-h-0 flex-1 items-end gap-[5px] pt-[5px] pr-[9px] pb-1.5 pl-7">
                            <span className="absolute top-[5px] left-2 font-mono text-[7px] font-semibold text-zinc-400 dark:text-zinc-500">Out</span>
                            {REGIONS.map((region, i) => (
                                <div key={region.name} className="flex h-full flex-1 flex-col items-center justify-end gap-0.5">
                                    <span
                                        className={`block w-full origin-bottom rounded-t-[3px] rounded-b-[1px] animar:animate-datos-bar ${i === 0 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-blue-600/45 dark:bg-blue-400/45'}`}
                                        style={{ height: `calc(${region.value}% - 8px)` }}
                                    />
                                    <span className="text-[5.5px] text-zinc-500 dark:text-zinc-400">{region.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4b. Informe de Power BI (oculto en reposo) */}
                    <div className="absolute inset-0 flex flex-col opacity-0 animar:animate-datos-second">
                        {/* Indicadores */}
                        <div className="flex gap-[5px] px-2 pt-1.5">
                            <div className="flex-1 rounded-md bg-zinc-100 px-[5px] py-[3px] dark:bg-zinc-800">
                                <b className="block text-[9.5px] font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100">$1.2M</b>
                                <span className="text-[6px] font-bold text-blue-600 dark:text-blue-400">Ventas · +18%</span>
                            </div>
                            <div className="flex-1 rounded-md bg-zinc-100 px-[5px] py-[3px] dark:bg-zinc-800">
                                <b className="block text-[9.5px] font-extrabold tracking-tight text-zinc-800 dark:text-zinc-100">Norte</b>
                                <span className="text-[6px] font-bold text-blue-600 dark:text-blue-400">Región líder</span>
                            </div>
                        </div>

                        {/* Barras en el amarillo de Power BI */}
                        <div className="flex min-h-0 flex-1 items-end gap-[3px] px-2 pt-1.5 pb-[7px]">
                            {REPORT_BARS.map((value, i) => (
                                <span
                                    key={i}
                                    className={`block flex-1 origin-bottom rounded-t-[2px] rounded-b-[1px] bg-[#F2C811] animar:animate-datos-report-bar ${i % 2 === 0 ? 'opacity-85' : 'opacity-50'}`}
                                    style={{ height: `${value}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
