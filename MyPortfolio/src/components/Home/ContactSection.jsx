import { ChevronDown, Clock, Mail, MessageCircle, MessageSquare, Send, Target, User } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_REASONS } from '../../data/contact'
import SiteFooter from '../Footer/SiteFooter'

// Forma de la luz (la misma de tu diseño anterior). Se dibuja con clip-path y se difumina en el padre
const LIGHT_SHAPE =
    'polygon(77.5% 40.13%, 90% 10%, 100% 50%, 95% 80%, 92% 85%, 75% 65%, 61.26% 54.7%, 50% 54.7%, 47.24% 65.81%, 50% 85%, 26.16% 73.91%, 0.1% 100%, 1% 40.13%, 20% 48.75%, 60% 0.25%, 67.5% 32.63%)'

// Estilo compartido de input, select y textarea (el padding derecho lo pone cada uno)
const FIELD =
    'w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-9 text-[13.5px] text-zinc-800 ' +
    'placeholder:text-zinc-400 transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none ' +
    'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-500 dark:focus:ring-blue-400/15'

/**
 * Campo del formulario: etiqueta + ícono a la izquierda + input, select o textarea.
 * @param {string} props.id           id y name del campo
 * @param {Function} props.icon       ícono de lucide-react
 * @param {Array} [props.options]     [{ id, label }] → select con esas opciones
 * @param {boolean} [props.multiline] true → textarea
 * @param {string} [props.className]  clases extra del contenedor (ej. cuántas columnas ocupa)
 */
function ContactField({ id, label, icon: Icon, placeholder, type = 'text', options, multiline = false, className = '' }) {
    return (
        <div className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
            <label htmlFor={id} className="text-[12.5px] font-semibold text-zinc-700 dark:text-zinc-300">
                {label}
            </label>
            <div className="relative">
                <Icon aria-hidden="true" className={`pointer-events-none absolute left-3 size-[15px] text-zinc-400 dark:text-zinc-500 ${multiline ? 'top-3' : 'top-1/2 -translate-y-1/2'}`} />
                {options ? (
                    <>
                        {/* appearance-none quita la flecha del navegador; la reemplaza ChevronDown */}
                        <select id={id} name={id} defaultValue={options[0].id} className={`${FIELD} cursor-pointer appearance-none pr-9 dark:scheme-dark`}>
                            {options.map((option) => (
                                <option key={option.id} value={option.id}>{option.label}</option>
                            ))}
                        </select>
                        <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                    </>
                ) : multiline ? (
                    <textarea id={id} name={id} rows={3} placeholder={placeholder} className={`${FIELD} min-h-[72px] resize-none pr-3 sm:min-h-[84px]`} />
                ) : (
                    <input id={id} name={id} type={type} placeholder={placeholder} className={`${FIELD} pr-3`} />
                )}
            </div>
        </div>
    )
}

const ContactSection = () => {
    return (
        <section id='contactSection' className='relative mt-24 overflow-hidden px-6 pt-10 sm:px-8 sm:pt-20 md:px-10' style={{ scrollMarginTop: '24px' }}>
            {/* 1. Línea azul que abre la sección */}
            <div aria-hidden="true" className='pointer-events-none absolute top-0 left-1/2 z-20 h-px w-4/5 max-w-[500px] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(2,132,199,0.65)_50%,transparent)]'></div>

            {/* 2. Fondo compartido con el footer: cuadrícula + luz */}
            <div aria-hidden="true" className='pointer-events-none absolute inset-0'>
                {/* Cuadrícula de 80 px que se desvanece desde el centro del formulario */}
                <svg className="absolute inset-0 h-full w-full stroke-zinc-400 opacity-40 [mask-image:radial-gradient(45%_45%_at_50%_38%,black,transparent)] dark:stroke-white/50">
                    <defs>
                        <pattern id="contact-grid" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#contact-grid)" />
                </svg>

                {/* Luz: el padre difumina (blur) y el hijo tiene la forma (clip-path) */}
                <div className='absolute inset-0 blur-[64px]'>
                    <div className='absolute top-[46%] left-1/2 aspect-[1108/532] w-[92rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-800 opacity-[0.16]  ' style={{ clipPath: LIGHT_SHAPE }}></div>
                </div>
            </div>

            {/* 3. Contenido del contacto */}
            <div className='relative z-10 mx-auto flex max-w-[1080px] flex-col items-center text-center'>
                <h2 className='text-[30px] leading-none font-extrabold tracking-tight text-zinc-700 sm:text-[36px] md:text-5xl dark:text-zinc-100'>
                    ¿LISTO PARA <span className="text-zinc-500 dark:text-zinc-400">EMPEZAR?</span>
                </h2>
                <p className='mt-3 max-w-[44ch] text-[13px] leading-relaxed sm:mt-3.5 sm:text-[13.5px] text-zinc-500 dark:text-zinc-400'>
                    Escríbeme y te respondo con una propuesta concreta para tu mentoría o proyecto.
                </p>

                {/* 4. Formulario (por ahora sin envío) */}
                <form noValidate className="mt-4 flex w-full max-w-[1080px] flex-col gap-3 rounded-[24px] bg-white p-4 text-left sm:mt-6 sm:gap-3.5 sm:rounded-[28px] shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.14)] sm:p-[26px] dark:bg-[#131316] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_32px_-12px_rgba(0,0,0,0.6)]">

                    {/* Motivo, Nombre y Correo
                        móvil: [ Motivo (ancho completo) ] / [ Nombre | Correo ]
                        md+:   [ Motivo | Nombre | Correo ] */}
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        <ContactField id="motivo" label="¿De qué quieres hablar?" icon={Target} options={CONTACT_REASONS} className="col-span-2 md:col-span-1" />
                        <ContactField id="nombre" label="Nombre" icon={User} placeholder="Tu nombre" />
                        <ContactField id="correo" label="Correo" icon={Mail} placeholder="tu@correo.com" type="email" />
                    </div>
                    <ContactField id="mensaje" label="Mensaje" icon={MessageSquare} placeholder="¿Qué te gustaría lograr?" multiline />

                    {/* Botones: correo (principal) y WhatsApp (alterno). En móvil, lado a lado con texto corto */}
                    <div className="grid grid-cols-2 gap-2.5">
                        <button type="submit" className="group/send inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-[18px] py-[11px] text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                            <Send className="size-4 transition-transform duration-300 group-hover/send:translate-x-[3px]" />
                            <span className="sm:hidden">Correo</span>
                            <span className="hidden sm:inline">Enviar por correo</span>
                        </button>
                        <button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-[18px] py-[11px] text-[13px] font-semibold text-zinc-700 transition-colors hover:border-green-600 hover:text-green-600 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-green-400 dark:hover:text-green-400">
                            <MessageCircle className="size-4" />
                            <span className="sm:hidden">WhatsApp</span>
                            <span className="hidden sm:inline">Enviar por WhatsApp</span>
                        </button>
                    </div>
                </form>

                {/* 5. Correo directo y tiempo de respuesta */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-5">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 font-mono text-[12.5px] text-zinc-700 transition-colors hover:border-blue-600 dark:border-zinc-800 dark:bg-[#131316] dark:text-zinc-300 dark:hover:border-blue-500">
                        <Mail className="size-3.5 text-zinc-400" />
                        {CONTACT_EMAIL}
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                        <Clock className="size-3.5" />
                        Normalmente respondo en menos de 24 h
                    </span>
                </div>
            </div>

            {/* 6. Footer: dentro de la sección para compartir el fondo */}
            <SiteFooter />
        </section>
    )
}

export default ContactSection
