/**
 * Ilustración animada de la card "Automatiza tu Trabajo" (FormationSection).
 * Un constructor de flujos tipo n8n: desde la barra de nodos se arrastran 4 nodos
 * hasta el trigger (Gmail); el flujo se bifurca en el filtro, el lienzo se desplaza
 * para hacer espacio, se ajusta a la vista, se ejecuta y aparece "Flujo completado".
 *
 * Escena fija de 320 × 200 px, escalada según el tamaño de la zona.
 * Animación: una lista de fotogramas (FRAMES) que un temporizador recorre; el
 * movimiento lo hacen las transiciones de CSS.
 *   Escritorio → corre mientras el mouse está sobre la card.
 *   Móvil → corre siempre. Con "reducir movimiento" → no corre.
 *   Sin animación se ve el estado final (FINAL): el flujo completo y ejecutado.
 */
import { useEffect, useRef, useState } from 'react'
import { Check, GitBranch, Play, Zap } from 'lucide-react'

//datos
import { flowApps } from '../../data/flowApps'

// ==================== DATOS DE LA ESCENA ====================

//Nodos del flujo, en orden de construcción.
//x, y: centro del nodo en el lienzo (px) · from: nodo del que sale su conexión
const NODES = [
    { app: 'gmail', name: 'Gmail', action: 'Nuevo correo', x: 0, y: 0 },
    { app: 'filter', name: 'Filtrar', action: 'Si tiene factura', x: 84, y: 0, from: 0 },
    { app: 'googlesheets', name: 'Sheets', action: 'Guardar fila', x: 172, y: -48, from: 1 },
    { app: 'whatsapp', name: 'WhatsApp', action: 'Avisar al equipo', x: 172, y: 48, from: 1 },
    { app: 'googledrive', name: 'Drive', action: 'Subir adjunto', x: 260, y: -48, from: 2 },
]

//Botones de la barra de nodos (el trigger no está: ya empieza en el lienzo)
const PALETTE = ['filter', 'googlesheets', 'googledrive', 'whatsapp']

//Cámara final: todo el flujo a la vista ("ajustar a la vista")
const FIT = { x: 74, y: 104, zoom: 0.66 }

// ==================== PIEZAS ====================

/** Ícono de un nodo: logo de la app o, para el filtro, una bifurcación azul */
function NodeIcon({ app, size }) {
    if (app === 'filter') {
        return <GitBranch className="text-blue-600 dark:text-blue-400" style={{ width: size, height: size }} strokeWidth={2.4} />
    }
    const logo = flowApps[app]
    return (
        <svg viewBox="0 0 24 24" style={{ width: size, height: size, fill: logo.color }}>
            <path d={logo.path} />
        </svg>
    )
}

/** Curva de la conexión: sale por la derecha del nodo a y entra por la izquierda del nodo b */
function linkPath(a, b) {
    const x1 = a.x + 23, x2 = b.x - 19
    const bend = Math.max(26, (x2 - x1) / 2)
    return `M${x1} ${a.y} C${x1 + bend} ${a.y}, ${x2 - bend} ${b.y}, ${x2} ${b.y}`
}

// ==================== GUION DE LA ANIMACIÓN ====================

const BUILD_ZOOM = 0.85                                   //zoom mientras se construye
const slotOf = (app) => ({ x: 34 + PALETTE.indexOf(app) * 36, y: 26 })   //centro de cada botón de la barra
const RUN_BUTTON = { x: 262, y: 30 }                      //donde el cursor pulsa "Ejecutar"

/** Cámara para agregar el nodo k: centra el punto medio entre su nodo de origen y él */
function cameraFor(k) {
    const a = NODES[NODES[k].from], b = NODES[k]
    return { x: 160 - BUILD_ZOOM * (a.x + b.x) / 2, y: 118 - BUILD_ZOOM * (a.y + b.y) / 2, zoom: BUILD_ZOOM }
}

/** Dónde queda en la escena un punto del lienzo, con una cámara dada */
const onScene = (camera, node) => ({ x: camera.x + camera.zoom * node.x, y: camera.y + camera.zoom * node.y })

//Estado final (y de reposo): flujo completo, ajustado a la vista, ejecutado
const FINAL = {
    placed: NODES.length, camera: FIT, lit: NODES.length, toast: true,
    cursor: RUN_BUTTON, cursorOn: false, pressed: false, carry: null, runPressed: false, hidden: false,
}

/**
 * Crea la lista de fotogramas. Cada uno es una "foto" completa del estado
 * y dura ms milisegundos (también es lo que tarda en llegar a ella).
 */
function buildFrames() {
    const frames = []
    let state = { ...FINAL, placed: 1, camera: cameraFor(1), lit: 0, toast: false, cursor: { x: 300, y: 190 }, hidden: true }
    const add = (ms, change) => {
        state = { ...state, ...change }
        frames.push({ ...state, ms })
    }

    add(500, {})                                                        //oculta: la cámara vuelve al inicio sin que se vea
    add(300, { hidden: false })                                         //aparece la escena con el trigger
    add(400, { cursorOn: true, cursor: { x: 250, y: 160 } })            //entra el cursor
    for (let k = 1; k < NODES.length; k++) {
        const camera = cameraFor(k)
        if (k > 1) add(500, { camera })                                 //el lienzo se desplaza para hacer espacio
        add(450, { cursor: slotOf(NODES[k].app) })                      //el cursor va a la barra
        add(150, { pressed: true, carry: k })                           //toma el nodo
        add(650, { cursor: onScene(camera, NODES[k]) })                 //lo arrastra al lienzo
        add(450, { pressed: false, carry: null, placed: k + 1 })        //lo suelta: aparece y se conecta
    }
    add(700, { camera: FIT })                                           //ajustar a la vista
    add(500, { cursor: RUN_BUTTON })                                    //el cursor va a "Ejecutar"
    add(200, { pressed: true, runPressed: true })                       //clic
    add(250, { pressed: false, runPressed: false, cursorOn: false })
    for (let k = 1; k <= NODES.length; k++) add(300, { lit: k })        //los nodos se encienden en orden
    add(2600, { toast: true })                                          //"Flujo completado"
    add(400, { hidden: true })                                          //se desvanece y vuelve a empezar
    return frames
}
const FRAMES = buildFrames()

// ==================== COMPONENTE ====================

export default function AutomationFlowVisual() {
    const rootRef = useRef(null)
    const [frame, setFrame] = useState(0)               //fotograma actual
    const [hovered, setHovered] = useState(false)       //mouse sobre la card

    //Una sola vez: ¿hay mouse? ¿el sistema pide menos movimiento?
    const [canHover] = useState(() => window.matchMedia('(hover: hover)').matches)
    const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const playing = !reduceMotion && (hovered || !canHover)

    //Hover en cualquier parte de la card (el <article> que contiene la ilustración)
    useEffect(() => {
        const card = rootRef.current.closest('article')
        const onEnter = () => { setFrame(0); setHovered(true) }
        const onLeave = () => setHovered(false)
        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
        return () => {
            card.removeEventListener('mouseenter', onEnter)
            card.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    //Temporizador: espera lo que dura el fotograma actual y pasa al siguiente (al final, vuelve al 0)
    useEffect(() => {
        if (!playing) return
        const timer = setTimeout(() => setFrame((frame + 1) % FRAMES.length), FRAMES[frame].ms)
        return () => clearTimeout(timer)
    }, [playing, frame])

    const s = playing ? FRAMES[frame] : FINAL
    const ms = playing ? FRAMES[frame].ms : 0
    const pickedApp = s.carry !== null ? NODES[s.carry].app : null

    return (
        <div ref={rootRef} aria-hidden="true" className="absolute inset-0 overflow-hidden normal-case tracking-normal">

            {/* 1. Fondo de puntos */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#e4e4e7_1.1px,transparent_1.3px)] bg-size-[14px_14px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_25%,transparent_100%)] dark:bg-[radial-gradient(circle,#2e2e33_1.1px,transparent_1.3px)]" />

            {/* 2. Escena de 320 × 200 px, centrada y escalada según la pantalla */}
            <div
                className="absolute top-1/2 left-1/2 h-[200px] w-[320px] -translate-x-1/2 -translate-y-1/2 scale-80 transition-opacity duration-300 lg:scale-95 xl:scale-110"
                style={{ opacity: s.hidden ? 0 : 1 }}
            >

                {/* 3. Barra de nodos + botón Ejecutar */}
                <div className="absolute top-2 right-2.5 left-2.5 flex h-9 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-2.5 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.22)] dark:border-white/[0.08] dark:bg-[#1a1a1e]">
                    {PALETTE.map((app) => (
                        <span
                            key={app}
                            className={`grid size-7 place-items-center rounded-lg bg-zinc-100 transition-shadow duration-150 dark:bg-zinc-800 ${pickedApp === app ? 'shadow-[0_0_0_1.5px_#2563eb]' : ''}`}
                        >
                            <NodeIcon app={app} size={14} />
                        </span>
                    ))}
                    <span
                        className="ml-auto flex items-center gap-1 rounded-full bg-blue-600 py-1 pr-2.5 pl-2 text-[8.5px] font-bold whitespace-nowrap text-white transition-transform duration-150 dark:bg-blue-500"
                        style={{ transform: s.runPressed ? 'scale(.9)' : 'none' }}
                    >
                        <Play className="size-2 fill-current" />
                        Ejecutar flujo
                    </span>
                </div>

                {/* 4. Lienzo: recorta lo que sale por arriba y se desvanece en los bordes */}
                <div className="absolute inset-x-0 top-[52px] bottom-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">

                    {/* Cámara: mueve y escala todo el flujo */}
                    <div
                        className="absolute top-[-52px] left-0 origin-top-left transition-transform duration-500 ease-in-out"
                        style={{ transform: `translate(${s.camera.x}px, ${s.camera.y}px) scale(${s.camera.zoom})` }}
                    >
                        {/* Conexiones: líneas azules que se dibujan solas */}
                        <svg className="absolute top-0 left-0 size-px overflow-visible">
                            {NODES.slice(1).map((node, i) => (
                                <path
                                    key={node.name}
                                    d={linkPath(NODES[node.from], node)}
                                    pathLength="100"
                                    className="fill-none stroke-blue-600 stroke-2 transition-[stroke-dashoffset] duration-500 dark:stroke-blue-400"
                                    style={{ strokeDasharray: 100, strokeDashoffset: i + 1 < s.placed ? 0 : 100 }}
                                />
                            ))}
                        </svg>

                        {/* Nodos */}
                        {NODES.map((node, i) => (
                            <div
                                key={node.name}
                                className={`absolute -mt-[19px] -ml-[19px] grid size-[38px] place-items-center border border-black/[0.08] bg-white shadow-[0_10px_28px_-12px_rgba(15,23,42,0.22)] transition-[opacity,scale] duration-300 dark:border-white/[0.08] dark:bg-[#1a1a1e] ${i === 0 ? 'rounded-l-full rounded-r-[11px]' : 'rounded-[11px]'}`}
                                style={{ left: node.x, top: node.y, opacity: i < s.placed ? 1 : 0, scale: i < s.placed ? 1 : 0.8 }}
                            >
                                <NodeIcon app={node.app} size={17} />

                                {/* Rayo del trigger */}
                                {i === 0 && (
                                    <span className="absolute top-1/2 -left-[7px] grid size-[13px] -translate-y-1/2 place-items-center rounded-full bg-blue-600 text-white ring-2 ring-white dark:bg-blue-500 dark:ring-[#131316]">
                                        <Zap className="size-[7px] fill-current" strokeWidth={0} />
                                    </span>
                                )}

                                {/* Punto de salida (a la derecha) */}
                                <span className="absolute top-1/2 -right-1 size-[7px] -translate-y-1/2 rounded-full border-[1.5px] border-zinc-400 bg-white dark:border-zinc-500 dark:bg-[#1a1a1e]" />

                                {/* Aro y check cuando el nodo se ejecuta */}
                                <span className={`absolute -inset-px rounded-[inherit] border-[1.5px] border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.12)] transition-opacity duration-200 dark:border-blue-400 ${i < s.lit ? 'opacity-100' : 'opacity-0'}`} />
                                <span className={`absolute -top-1.5 -right-1.5 grid size-[13px] place-items-center rounded-full bg-blue-600 text-white ring-2 ring-white transition-transform duration-200 dark:bg-blue-500 dark:ring-[#131316] ${i < s.lit ? 'scale-100' : 'scale-0'}`}>
                                    <Check className="size-2" strokeWidth={3.5} />
                                </span>

                                {/* Etiqueta */}
                                <span className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 text-center leading-tight whitespace-nowrap">
                                    <b className="block text-[8.5px] font-bold text-zinc-800 dark:text-zinc-100">{node.name}</b>
                                    <span className="text-[7.5px] text-zinc-500 dark:text-zinc-400">{node.action}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Aviso final */}
                <div className={`absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-[5px] rounded-full border border-black/[0.08] bg-white py-1 pr-2.5 pl-1 text-[8.5px] font-bold whitespace-nowrap text-zinc-800 shadow-[0_10px_24px_-8px_rgba(37,99,235,0.55)] transition-[opacity,translate] duration-300 dark:border-white/[0.08] dark:bg-[#1a1a1e] dark:text-zinc-100 ${s.toast ? 'opacity-100' : 'translate-y-1.5 opacity-0'}`}>
                    <span className="grid size-[15px] place-items-center rounded-full bg-blue-600 text-white dark:bg-blue-500">
                        <Check className="size-2" strokeWidth={3.5} />
                    </span>
                    Flujo completado
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">· 5 nodos</span>
                </div>

                {/* 6. Cursor (con el nodo que arrastra) */}
                <div
                    className="absolute z-10"
                    style={{
                        left: s.cursor.x,
                        top: s.cursor.y,
                        opacity: s.cursorOn ? 1 : 0,
                        transition: `left ${ms}ms ease-in-out, top ${ms}ms ease-in-out, opacity 200ms`,
                    }}
                >
                    {s.carry !== null && (
                        <span className="absolute -top-4 -left-4 grid size-8 place-items-center rounded-[10px] border border-black/[0.08] bg-white shadow-[0_12px_24px_-8px_rgba(15,23,42,0.3),0_0_0_1.5px_#2563eb] dark:border-white/[0.08] dark:bg-[#1a1a1e]">
                            <NodeIcon app={NODES[s.carry].app} size={15} />
                        </span>
                    )}
                    <svg
                        viewBox="0 0 14 16"
                        className="relative h-[15px] w-[13px] fill-zinc-800 stroke-white stroke-[1.2] transition-transform duration-150 dark:fill-zinc-100 dark:stroke-[#131316]"
                        style={{ transform: s.pressed ? 'scale(.85)' : 'none' }}
                    >
                        <path strokeLinejoin="round" d="M1 1v12l3.2-3 2.3 5 2-.9-2.3-4.9H11z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}