import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {addLocale, PrimeReactProvider} from "primereact/api";
import 'primereact/resources/themes/soho-dark/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { ru } from 'primelocale/js/ru.js'

addLocale('ru', ru)

const value = {
  locale: 'ru'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PrimeReactProvider value={value}>
          <App />
      </PrimeReactProvider>
  </StrictMode>,
)
