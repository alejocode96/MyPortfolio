import React, { useRef } from 'react'
//iconos
import { Code2, ChartScatter, MousePointerClick, Zap } from "lucide-react";


const TRANSITION = 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';

const AboutSection = () => {

    const sectionRef = useRef(null)
    const glowRef = useRef(null)
    const titleRef = useRef(null)
    const para1Ref = useRef(null)
    const para2Ref = useRef(null)
    const card1Ref = useRef(null)
    const card2Ref = useRef(null)
    const card3Ref = useRef(null)
    const card4Ref = useRef(null)

    return (
        <section id='aboutSection' className='relative overflow-hidden bg-gray-50 dark:bg-zinc-900 mb-10 rounded-4xl shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-zinc-300/50 dark:border-zinc-800/50 py-10 px-4 sm:px-6 lg:px-8  will-change-transform' style={{ scrollMarginTop: '24px' }}>
            {/* Efecto decorativo lateral izquierdo */}
            <div></div>

            <div className='w-[98%] mx-auto place-items-center lg:place-items-stretch relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
                    {/* ── Columna izquierda — texto ──────────────────────── */}
                    <div className='lg:col-span-5'>
                        {/* Título — entra cuando él mismo es visible */}
                        <h2 ref={titleRef} className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-zinc-800 dark:text-zinc-50'> PERFIL PROFESIONAL</h2>

                        {/* Párrafo 1 */}
                        <p ref={para1Ref} className='text-zinc-700  dark:text-zinc-300 text-sm sm:text-md mb-8 leading-relaxed'>
                            Ingeniero en Sistemas de Información que combina desarrollo full stack, análisis de datos, automatización e inteligencia artificial aplicada. Construyo soluciones que simplifican la operación, aceleran la transformación digital y ayudan a tomar mejores decisiones.
                        </p>

                        {/* Párrafo 2 */}
                        <p ref={para2Ref} className='text-zinc-700  dark:text-zinc-300 text-sm sm:text-md mb-8 leading-relaxed'>
                            He liderado el desarrollo de aplicaciones web y sistemas empresariales con JavaScript, Python, C#, .NET y SQL Server, y he construido dashboards analíticos con Power BI. Además, diseño flujos de automatización y agentes de IA con diferentes herramientas y modelos, integrados en plataformas como n8n, Zapier, Make y Power Automate. Me he desempeñado como mentor de IA y automatizaciones con n8n en NODO – EAFIT, formando a profesionales en el uso estratégico de modelos de lenguaje y automatización inteligente en su entorno laboral. Mi enfoque combina pensamiento analítico, arquitectura escalable y visión de negocio para entregar soluciones que generan valor real y medible.                        </p>
                    </div>

                    {/* ── Columna derecha — cards ────────────────────────── */}
                    <div className='lg:col-span-7'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-4'>
                            {/* Card 1 — Desarrollo Full Stack */}
                            <div ref={card1Ref} className='will-change-transform'>
                                <div className='bg-blue-500/10 dark:bg-blue-500/20 text-blue-900 dark:text-blue-100 border border-blue-500/30 dark:border-blue-500/40 rounded-2xl p-5 flex flex-col justify-between min-h-[200px] cursor-pointer shadow-md shadow-blue-500/10 dark:shadow-blue/500/20 will-change-transform' style={{ transform: 'rotate(-3deg)', transition: TRANSITION }} onMouseEnter={e => e.currentTarget.style.transform = 'rotate(-3deg) scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'rotate(-3deg)'}>
                                    <div>
                                        <div className='mb-2 text-blue-600 dark:text-shadow-blue-400'>
                                            <Code2 strokeWidth={1.5} size={18}></Code2>
                                        </div>
                                        <h3 className='text-xl font-semibold mb-3 text-blue-900 dark:text-blue-50'>Desarrollo Full Stack</h3>
                                        <p className='text-sm leading-relaxed text-blue-800 dark:text-blue-200'>
                                            Diseño aplicaciones web y sistemas escalables con arquitectura limpia y buena experiencia de usuario. Convierto ideas en productos digitales funcionales.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 — Análisis de Datos */}
                            <div ref={card2Ref} className='will-change-transform' >
                                <div className='bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700  rounded-2xl p-5 flex flex-col justify-between min-h-[200px] cursor-pointer shadow-md shadow-zinc-200/50 dark:shadow-zinc-950/50 will-change-transform' style={{ transition: TRANSITION }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    <div>
                                        <div className='mb-2 text-zinc-600 dark:text-zinc-300'>
                                            <ChartScatter strokeWidth={1.5} size={18} />
                                        </div>
                                        <h3 className='text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50'>
                                            Análisis de Datos
                                        </h3>
                                        <p className='text-sm leading-relaxed text-zinc-700 dark:text-zinc-300'>
                                            Convierto datos en decisiones con Python, SQL Server y Power BI. Creo dashboards y métricas que muestran el rendimiento y revelan oportunidades.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 — Automatización de Procesos */}
                            <div ref={card3Ref} className='will-change-transform' >
                                <div className='bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700  rounded-2xl p-5 flex flex-col justify-between min-h-[200px] cursor-pointer shadow-md shadow-zinc-200/50 dark:shadow-zinc-950/50 will-change-transform' style={{ transition: TRANSITION }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    <div>
                                        <div className='mb-2 text-zinc-600 dark:text-zinc-300'>
                                            <Zap strokeWidth={1.5} size={18} />
                                        </div>
                                        <h3 className='text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50'>
                                            Automatización de Procesos
                                        </h3>
                                        <p className='text-sm leading-relaxed text-zinc-700 dark:text-zinc-300'>
                                            Conecto sistemas y elimino tareas repetitivas con n8n, Power Automate, Make y Zapier. Integro herramientas de IA en los flujos para interpretar información y ejecutar acciones sin intervención manual.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4 — Inteligencia Artificial */}
                            <div ref={card4Ref} className='will-change-transform'>
                                <div className='bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700  rounded-2xl p-5 flex flex-col justify-between min-h-[200px] cursor-pointer shadow-md shadow-zinc-200/50 dark:shadow-zinc-950/50 will-change-transform' style={{ transition: TRANSITION }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    <div>
                                        <div className='mb-2 text-zinc-600 dark:text-zinc-300'>
                                            <MousePointerClick strokeWidth={1.5} size={18} />
                                        </div>
                                        <h3 className='text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-50'>
                                            Inteligencia Artificial Aplicada
                                        </h3>
                                        <p className='text-sm leading-relaxed text-zinc-700 dark:text-zinc-300'>
                                            Desarrollo agentes y asistentes con LLMs, RAG y function calling, usando diferentes herramientas de IA. Los integro en procesos reales para automatizar decisiones y aprovechar datos no estructurados.                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default AboutSection
