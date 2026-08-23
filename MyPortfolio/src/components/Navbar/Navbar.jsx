

import { useEffect, useRef, useState } from 'react'
import { navigationHomeItems } from '../../data/navigation';
import { Menu, X, Sun, Moon, Logs } from 'lucide-react'
import logo from '../../../public/images/logo.png'
import { useTheme } from '../../context/ThemeContext.jsx'

const Navbar = () => {
    //estado para el manejo del tema viene desde el contexto
    const { theme, toggleTheme } = useTheme()
    //estado para menu desktok
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    /**Estado del menú dropdown (mobile/tablet) */
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    //**referencia para el menu */
    const dropdownRef = useRef(null)
    useEffect(() => {

        /**
         * Maneja los eventos `mousedown` realizados en el documento.
         *
         * @param {MouseEvent} event Evento generado por la interacción
         * del usuario con el documento.
         */
        const handleClickOutside = (event) => {

            /**
             * Verificamos dos condiciones:
             *
             * 1. `dropdownRef.current`
             *    Confirma que la referencia al menú existe.
             *
             * 2. `!dropdownRef.current.contains(event.target)`
             *    Comprueba que el elemento donde ocurrió el clic
             *    NO pertenece al contenedor del menú.
             *
             * Si ambas condiciones se cumplen, significa que el usuario
             * hizo clic fuera del dropdown y debemos cerrarlo.
             */
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownMenuOpen(false)
            }
        }

        /**
         * Registramos el listener en `document` para detectar clics
         * realizados fuera del menú.
         */
        document.addEventListener(
            'mousedown',
            handleClickOutside
        )

        /**
         * Función de limpieza del efecto.
         *
         * React ejecuta esta función cuando el componente se desmonta.
         * Eliminamos el listener previamente registrado para evitar
         * listeners duplicados o referencias innecesarias en memoria.
         */
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside
            )
        }

    }, [])

    return (
        <nav className='absolute top-0 left-0 right-0 z-[100] w-full flex justify-center px-4 sm:px-6 py-2.5 '>
            <div className='w-[98%] flex items-center justify-between pt-1'>
                {/**logo */}
                <div>
                    <img src={logo} alt='Logo AlejoCode' className='h-[35px] z-100 object-contain  relative' style={{ maskImage: 'linear-gradient(to bottom, black 90%,transparent 95% )', WebkitMaskImage: 'linear-gradient(to bottom, black 90%,transparent 95%' }}></img>
                </div>

                {/**Menu desktop */}
                <div className='hidden md:block relative mb-0 pb-0 ' style={{ transform: "none" }}>
                    {/**Linea efecto superior */}
                    <div className='absolute -top-[1px] right-20 h-2 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] md:w-32 lg:w-64'>
                        <div className='h-px w-full animate-starlight-right bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0'></div>
                    </div>
                    <ul className='hidden md:flex items-center space-x-10 border-[1px] p-2 pl-10 pr-10 rounded-3xl backdrop-blur-2xl bg-zinc-300/30 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800'>
                        {navigationHomeItems.map((item) => (
                            <li key={item.href}>
                                <a href={item.href} className='text-gray-400 hover:text-zinc-700 dark:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200 text-sm font-medium cursor-pointer'>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {/**Linea efecto inferior */}
                    <div className='absolute -bottom-[7px] left-20 h-2 w-20 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] md:w-32 lg:w-64'>
                        <div className='h-px w-full animate-starlight-left bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0'></div>
                    </div>
                </div>
                {/**boton modo dark/ligth */}
                <button onClick={toggleTheme} className={`hidden lg:flex relative w-16 h-6 sm:w-20 sm:h-8 rounded-full transition-all duration-300 flex-shrink-0 border-1 ${theme === 'light' ? 'bg-zinc-200 hover:bg-zinc-300 border-zinc-300' : 'bg-zinc-900 hover:bg-zinc-800 dark:border-zinc-800'}`} aria-label='Toggle theme'>
                    <div className={`absolute top-0.5 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "translate-x-12" : "translate-x-2"}`}>
                        {theme == "light" ? (<Sun className='w-3 h-3 text-amber-500'></Sun>) : (<Moon className='w-3 h-3 text-blue-400'></Moon>)}
                    </div>
                </button>

                {/* controles mobile/table */}
                <div className='lg:hidden flex flex-col items-center gap-3'>
                    <div className='flex items-center gap-2'>
                        {/**boton modo dark/ligth  */}
                        <div className='relative'>
                            <div className={`flex items-center bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-xl shadow-sm p-1 flex-shrink-0 transition-all duration-300 ease-out hover:shadow-md hover:bg-zinc-100  hover:dark:bg-zinc-950 hover:ring-zinc-300 hover:dark:ring-zinc-700 active:scale-95 group`}>
                                <button onClick={toggleTheme} className='rounded-lg transition-all duration-all duration-300 p-1.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 ' aria-label="Menu">
                                    {theme === "dark" ? (<Sun size={18} strokeWidth={1.5} className='transition-all duration-500 ease-out group-hover:rotate-180 group-hover:scale-110' />) : (<Moon size={18} strokeWidth={1.5} className='transition-all  duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110' />)}
                                </button>
                            </div>
                        </div>

                        {/*Menú Hamburguesa */}
                        <div className='relative' ref={dropdownRef}>
                            <div className={`flex items-center bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-xl shadow-sm p-1 flex-shrink-0 transition-all duration-300 ease-out hover:shadow-md hover:bg-zinc-100 hover:dark:bg-zinc-950 hover:ring-zinc-300 hover:dark:ring-zinc-700 active:scale-95 group`}>
                                <button onClick={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)} className="rounded-lg transition-all duration-300 p-1.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200" aria-label="Menu" >
                                    <Logs size={18} strokeWidth={1.5} className={`transition-transform duration-300 ${isDropdownMenuOpen ? "" : "group-hover:-rotate-3"}`} />
                                </button>
                            </div>

                            <div className={`absolute top-full right-0 mt-2 w-44 sm:w-48 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 py-1 origin-top-right transition-all duration-200 ease-out ${isDropdownMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"} `}>
                                {navigationHomeItems.map((item) => {
                                    const Icon = item.icon

                                    return (
                                        <button className="w-full px-3 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm"
                                            key={item.href}
                                            onClick={(e) => handleMenuItemClick(e, item.href)}>
                                            <Icon size={14} />
                                            <span>{item.name}</span>
                                        </button>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
