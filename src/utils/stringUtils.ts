import translations from './translations'; 

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
export const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
}

export const getTranslatedText = (key: string): string => {
        return translations[key] || key; 
  };

