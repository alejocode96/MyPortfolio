/**
 * Footer del sitio. Va dentro de ContactSection para compartir su fondo
 * (la cuadrícula y la luz difuminada), así contacto y footer se ven como un solo cierre.
 *
 *   ───────────────────── línea gris ─────────────────────
 *   © 2026 Alejandro Galeano  Sobre mí  Soluciones …      (GitHub) (LinkedIn)
 *   Nota sobre los logos de marcas
 *                 ALEJANDRO GALEANO
 *                    DEVELOPER        ← firma que se desvanece y se corta abajo
 */
import { navigationHomeItems } from '../../data/navigation'
import { SOCIAL_LINKS } from '../../data/contact'

const SiteFooter = () => {
    const year = new Date().getFullYear()

    return (
        // @container: la firma mide su tamaño con el ancho del footer (unidades cqw)
        <footer className="@container relative z-10 mx-auto mt-14 max-w-[1080px] border-t border-zinc-900/10 pt-[18px] dark:border-white/10">

            {/* 1. Fila: copyright + secciones a la izquierda, redes a la derecha */}
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
                <nav aria-label="Secciones" className="flex flex-wrap items-center gap-x-[18px] gap-y-1.5 text-[12.5px]">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">© {year} Alejandro Galeano</span>
                    {navigationHomeItems.map((item) => (
                        <a key={item.href} href={item.href} className="font-medium text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400">
                            {item.name}
                        </a>
                    ))}
                </nav>

                <div className="flex gap-1">
                    {SOCIAL_LINKS.map((social) => (
                        <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                            className="grid size-9 place-items-center rounded-full border border-transparent text-zinc-500 transition-colors hover:border-zinc-200 hover:text-blue-600 dark:text-zinc-400 dark:hover:border-zinc-800 dark:hover:text-blue-400">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
                                <path d={social.path} />
                            </svg>
                        </a>
                    ))}
                </div>
            </div>

            {/* 2. Nota sobre los logos de marcas que aparecen en el sitio */}
            <p className="mt-3 max-w-[72ch] text-xs leading-relaxed text-zinc-500">
                Portafolio personal. Los logos de herramientas y marcas que aparecen en el sitio pertenecen a sus
                respectivos dueños y se muestran solo como referencia de las tecnologías que uso.
            </p>

            {/* 3. Firma: el margen negativo la baja para que la sección (overflow-hidden) la corte abajo */}
            <div aria-hidden="true" className="mt-[26px] -mb-[3.2cqw] select-none text-center font-extrabold leading-[0.8] tracking-[-0.04em]">
                <span className="mb-[2cqw] block text-[max(9px,1.6cqw)] font-medium tracking-[0.6em] text-blue-600/60 dark:text-blue-400/60">
                    ALEJANDRO GALEANO
                </span>
                <span className="block bg-gradient-to-b from-zinc-900/15 to-transparent to-85% bg-clip-text text-[15.5cqw] text-transparent dark:from-white/15">
                    DEVELOPER
                </span>
            </div>
        </footer>
    )
}

export default SiteFooter
