import en from '../locales/en/translation.json';
import ru from '../locales/ru/translation.json';
import type { Translations } from "./types";

const resources = {
  en: { translation: en as Translations },
  ru: { translation: ru as Translations },
} as const;

export default resources;
