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
import { BrowserRouter } from "react-router";

const BASE = import.meta.env.BASE_URL;
const basename = import.meta.env.DEV ? BASE : '';

addLocale('ru', ru);

const value = {
  locale: 'ru'
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PrimeReactProvider value={value}>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  </StrictMode>,
);
