import React, { useEffect } from "react";
import { useCookieConsent } from "@/components/ui/cookie-consent";

/**
 * Příklad komponenty pro analytiku, která využívá cookie consent
 */
export const Analytics: React.FC = () => {
  const cookieConsent = useCookieConsent();
  
  useEffect(() => {
    // Kontrola, zda jsou analytické cookies povoleny
    if (cookieConsent.isAllowed("analytics")) {
      // Inicializace Google Analytics nebo jiného analytického nástroje
      console.log("Inicializuji Google Analytics");
      
      // Příklad inicializace Google Analytics
      // window.dataLayer = window.dataLayer || [];
      // function gtag(){dataLayer.push(arguments);}
      // gtag('js', new Date());
      // gtag('config', 'GA-XXXXXXXX');
    }
  }, []);
  
  return null; // Komponenta neobsahuje žádné UI
};

/**
 * Příklad komponenty pro marketingové cookies
 */
export const MarketingPixels: React.FC = () => {
  const cookieConsent = useCookieConsent();
  
  useEffect(() => {
    // Kontrola, zda jsou marketingové cookies povoleny
    if (cookieConsent.isAllowed("marketing")) {
      // Inicializace Facebook Pixel, Google Ads nebo jiných marketingových nástrojů
      console.log("Inicializuji marketingové pixely");
      
      // Příklad inicializace Facebook Pixel
      // !function(f,b,e,v,n,t,s)
      // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      // n.queue=[];t=b.createElement(e);t.async=!0;
      // t.src=v;s=b.getElementsByTagName(e)[0];
      // s.parentNode.insertBefore(t,s)}(window, document,'script',
      // 'https://connect.facebook.net/en_US/fbevents.js');
      // fbq('init', 'XXXXXXXXXXXXXXXXX');
      // fbq('track', 'PageView');
    }
  }, []);
  
  return null; // Komponenta neobsahuje žádné UI
};

/**
 * Příklad použití v komponentě, která zobrazuje nebo podmíněně načítá obsah
 * založený na souhlasu s cookies
 */
export const ConditionalContent: React.FC = () => {
  const cookieConsent = useCookieConsent();
  const options = cookieConsent.getOptions();
  
  // Získání seznamu povolených kategorií cookies pro zobrazení
  const enabledCategories = Object.entries(options)
    .filter(([_, isEnabled]) => isEnabled)
    .map(([category]) => category);
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Aktivní kategorie cookies</h2>
      {enabledCategories.length > 0 ? (
        <ul className="list-disc pl-5">
          {enabledCategories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      ) : (
        <p>Nemáte povoleny žádné volitelné cookies.</p>
      )}
      
      {/* Podmíněné vykreslení obsahu */}
      {cookieConsent.isAllowed("marketing") && (
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p>Tento obsah je viditelný pouze pokud jsou povoleny marketingové cookies.</p>
        </div>
      )}
      
      {/* Ukázka dynamického načítání třetích stran */}
      {cookieConsent.isAllowed("analytics") && (
        <div className="mt-4">
          <p>Analytické služby třetích stran jsou načteny.</p>
          {/* Zde by mohla být iframe nebo jiný obsah třetí strany */}
        </div>
      )}
    </div>
  );
};

/**
 * Příklad použití v App.tsx pro globální načtení služeb
 * 
 * Tento kód by byl umístěn v App.tsx nebo v root komponentě
 */
export const CookieConsentInitializer: React.FC = () => {
  const cookieConsent = useCookieConsent();
  
  useEffect(() => {
    // Inicializace služeb na základě souhlasu s cookies
    
    // Nezbytné cookies - vždy načteny
    console.log("Inicializace nezbytných funkcí webu");
    
    // Analytické cookies
    if (cookieConsent.isAllowed("analytics")) {
      console.log("Inicializace analytických služeb");
      // Zde by se inicializoval kód pro analytiku
    }
    
    // Marketingové cookies
    if (cookieConsent.isAllowed("marketing")) {
      console.log("Inicializace marketingových služeb");
      // Zde by se inicializoval kód pro marketing
    }
  }, []);
  
  return null;
};

// Použití v App.tsx by vypadalo takto:
/*
import { CookieConsent } from "@/components/ui/cookie-consent";
import { CookieConsentInitializer } from "@/lib/examples/cookie-consent-usage";

function App() {
  return (
    <>
      <CookieConsentInitializer />
      {/* Zbytek aplikace *//*}
      <Router>
        {/* Vaše routy *//*}
      </Router>
      <CookieConsent />
    </>
  );
}
*/ 