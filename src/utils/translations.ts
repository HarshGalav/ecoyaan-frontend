import translationData from '../../public/locales/en/translation.json'; // Adjust path as needed

export type Translations = {
  [key: string]: string; // This allows any string key with a string value
};

const translations: Translations = translationData;

export default translations;