import React from 'react'

//Panel — fondo, borde suave y columna para apilar el contenido
const TILE = 'flex min-w-0 flex-col gap-[3px] overflow-hidden rounded-[9px] border px-[7px] py-1.5 ' +
    'border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] ' +
    'dark:border-white/[0.06] dark:bg-zinc-900/70'

//Datos decorativos
const KPIS = [
    { label: 'Ventas', value: '$1.2M', change: '+18%' },
    { label: 'Margen', value: '32%', change: '+4 pts' }
]

const REGIONS = [
    { name: 'Norte', value: 82 },
    { name: 'Centro', value: 64 },
    { name: 'Sur', value: 48 },
    { name: 'Oeste', value: 35 }
]

//Alto de cada barra (%) — la última es la destacada
const MONTHS = [38, 52, 45, 63, 58, 82]

//Textos diminutos: son textura, no tienen que leerse
const LABEL = 'shrink-0 truncate text-[6.5px] uppercase tracking-[0.3px] text-zinc-400 dark:text-zinc-500'

//Etiqueta azul con la variación (+18%, +4 pts)
const CHIP = 'shrink-0 rounded-full px-[5px] py-px text-[6.5px] font-bold tabular-nums ' +
    'bg-blue-500/15 text-blue-500 dark:bg-blue-400/15 dark:text-blue-400'

//Colores de las barras: alternan dos grises y la última va en azul
const barColor = (i) =>
    i === MONTHS.length - 1
        ? 'bg-blue-500 dark:bg-blue-400'
        : i % 2 === 1
            ? 'bg-zinc-300 dark:bg-zinc-600'
            : 'bg-zinc-200 dark:bg-zinc-700'

const DataAnalysisVisual = () => {
    return (
        <div aria-hidden="true" className='absolute inset-x-3 top-2.5 bottom-0 grid grid-cols-2 grid-rows-[auto_minmax(0,1fr)] gap-1.5'>
            {KPIS.map((kpi) => (
                <div key={kpi.label} className={TILE}>
                    <span className={LABEL} >{kpi.label}</span>
                    <div className='flex shrink-0 items-baseline justify-between gap-1.5'>
                        <span className='text-xs leading-tight font-bold tracking-tight tabular-nums text-zinc-800 dark:text-zinc-100'>
                            {kpi.value}
                        </span>
                        <span className={CHIP}>{kpi.change}</span>
                    </div>
                </div>
            ))}

            {/*Ranking por region */}
            <div className={TILE}>
                <span className={LABEL}>Ventas por región</span>
                <div className='flex flex-col gap-1 pt-px'>
                    {REGIONS.map((region, i) => (
                        <div key={region.name} className='grid grid-cols-[20px_minmax(0,1fr)_14px] items-center gap-1 text-[6px] tabular-nums text-zinc-400 dark:text-zinc-500'>
                            <span>{region.name}</span>
                            {/* Pista gris + relleno con el porcentaje */}
                            <div className='relative h-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700'>
                                <div className={`absolute inset-y-0 left-0 rounded-full ${i === 0 ? 'bg-blue-500 dark:bg-blue-400' : 'bg-zinc-300 dark:bg-zinc-600'}`} style={{ width: `${region.value}%` }}></div>
                            </div>
                            <span className='text-right font-semibold text-zinc-800 dark:text-zinc-100'>{region.value}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/*Barras por mes */}
            <div className={TILE}>
                {/* Encabezado: etiqueta + anillo de meta */}
                <div className='flex shrink-0 items-center justify-between gap-1.5'>
                    <span className={LABEL}>Ingresos por mes</span>
                    <span className='flex shrink-0 items-center gap-[3px] text-[6.5px]  font-semibold tabular-nums text-zinc-800  dark:text-zinc-100'>
                        <svg viewBox="0 0 36 36" className="h-[11px] w-[11px]">
                            <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5" className="stroke-zinc-200 dark:stroke-zinc-700" />
                            <circle cx="18" cy="18" r="14" fill="none" strokeWidth="5" strokeLinecap="round" strokeDasharray="63.3 88" transform="rotate(-90 18 18)" className="stroke-blue-500 dark:stroke-blue-400" />
                        </svg>
                        72%
                    </span>
                </div>

                {/* Gráfico: barras alineadas abajo + línea de meta */}
                <div className='relative flex min-h-3.5 flex-1 items-end gap-[3px] pt-0.5'>
                    <div className='absolute inset-x-0 bottom-[70%] border-t border-dashed border-blue-500 opacity-50 dark:border-blue-400' />
                    {MONTHS.map((height, i) => (
                        <div key={i} className={`min-h-[3px] flex-1 rounded-t-[2px] rounded-b-[1px] ${barColor(i)}`} style={{ height: `${height}%` }}></div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default DataAnalysisVisual
