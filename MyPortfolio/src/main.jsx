import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//context theme
import { Themeprovider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Themeprovider>
      <App />
    </Themeprovider>

  </StrictMode>,
)
