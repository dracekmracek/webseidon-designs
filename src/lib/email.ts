/**
 * Typy a pomocné funkce pro práci s kontaktním formulářem
 * Kontaktní formulář je posílán přímo na server pomocí HTML formuláře a PHP
 */

export interface EmailFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;  // anti-spam pole
  csrf_token?: string; // ochrana proti CSRF útokům
}

/**
 * Validuje email
 * @param email Email k validaci
 * @returns true pokud je email validní
 */
export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Generuje CSRF token pro ochranu formuláře
 * @returns náhodný token
 */
export const generateCsrfToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Převede data formuláře na FormData pro odeslání
 * @param data Data z formuláře
 * @returns FormData objekt
 */
export const prepareFormData = (data: EmailFormData): FormData => {
  const formData = new FormData();
  
  // Přidáme všechna data do FormData
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  
  return formData;
}; 