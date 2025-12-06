import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import {PrimeReactProvider, addLocale} from "primereact/api";
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ru } from 'primelocale/js/ru.js';

addLocale('ru', ru);

const value = {
  locale: 'ru'
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PrimeReactProvider value={value}>
          <App />
      </PrimeReactProvider>
  </StrictMode>,
);
