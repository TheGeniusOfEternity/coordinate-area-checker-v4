import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import {PrimeReactProvider, addLocale} from "primereact/api";
import App from './App.tsx';
import { Provider } from "react-redux";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ru } from 'primelocale/js/ru.js';
import { store } from "./store";
import './i18n.ts';

addLocale('ru', ru);

const value = {
  locale: 'ru'
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PrimeReactProvider value={value}>
        <App />
      </PrimeReactProvider>
    </Provider>
  </StrictMode>,
);
