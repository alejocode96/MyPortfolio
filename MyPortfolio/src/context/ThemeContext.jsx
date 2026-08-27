import { createContext, useContext, useEffect, useState } from "react";

//crea el contexto auqnue aun no esta definido
const ThemeContext = createContext()

export function Themeprovider({ children }) {
    //estado para almacenar el tema actual
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) return savedTheme

        // opcional: respeta el modo oscuro del sistema si el usuario nunca eligió antes
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? 'dark' : 'light'
    })

    //"Cada vez que theme cambie, modifica el elemento <html> del documento."
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    //Efecto para asignar o quitar .dark a los estilos
    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    //funcion que cambie el estado del tema
    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === 'light' ? 'dark' : 'light'
        )
    }

    return (
        //Todos los componentes que estén dentro de mí pueden acceder a los datos que yo proporciono
        //  Voy a poner estos datos a disposición de todos mis descendientes.
        //children representa todo lo que coloques dentro de ThemeProvider es decir <App>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}