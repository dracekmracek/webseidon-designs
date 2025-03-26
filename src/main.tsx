import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Aplikujeme správné pozadí už na samotný HTML prvek, aby nebyl vidět žádný flash efekt
document.documentElement.style.backgroundColor = '#05101F';
document.body.style.backgroundColor = '#05101F';
document.body.style.margin = '0';
document.body.style.padding = '0';

// Registrace Service Workeru - Přesunuto do samostatného vlákna, aby neblokoval vykreslení
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Použijeme setTimeout, aby se Service Worker registroval až po načtení stránky
    setTimeout(() => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful');
        })
        .catch((error) => {
          console.error('ServiceWorker registration failed:', error);
        });
    }, 1000);
  });
}

// Okamžitě vykreslíme aplikaci
createRoot(document.getElementById("root")!).render(<App />);
