import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldCheck, Lock, Cookie, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Cookie typy
type CookieOptions = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

// Výchozí hodnoty cookie nastavení
const defaultOptions: CookieOptions = {
  necessary: true, // nezbytné cookies vždy povoleny
  analytics: false,
  marketing: false,
};

// Pomocná funkce pro uložení cookie souhlasu
const saveCookieConsent = (options: CookieOptions) => {
  const consent = {
    options,
    timestamp: new Date().toISOString(),
    version: "1.0",
  };
  localStorage.setItem("cookieConsent", JSON.stringify(consent));
};

// Pomocná funkce pro načtení cookie souhlasu
const loadCookieConsent = (): { options: CookieOptions; timestamp: string; version: string } | null => {
  const consent = localStorage.getItem("cookieConsent");
  return consent ? JSON.parse(consent) : null;
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState<CookieOptions>(defaultOptions);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Při načtení komponenty zkontrolujeme, zda již existuje souhlas
  useEffect(() => {
    const consent = loadCookieConsent();
    if (!consent) {
      // Pokud souhlas neexistuje, zobrazíme lištu s animací
      setTimeout(() => {
        setAnimationPhase(1);
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => {
            setAnimationPhase(2);
          }, 400);
        }, 1000);
      }, 2000);
    } else {
      // Jinak načteme uložené nastavení
      setOptions(consent.options);
      setIsVisible(false);
    }
  }, []);

  // Funkce pro aktualizaci jednotlivých nastavení
  const updateOption = (key: keyof CookieOptions, value: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  // Funkce pro přijetí všech cookies
  const acceptAll = () => {
    const allAccepted: CookieOptions = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setOptions(allAccepted);
    saveCookieConsent(allAccepted);
    setAnimationPhase(3);
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  // Funkce pro přijetí jen nezbytných cookies
  const acceptNecessaryOnly = () => {
    saveCookieConsent(defaultOptions);
    setAnimationPhase(3);
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  // Funkce pro uložení nastavení
  const saveSettings = () => {
    saveCookieConsent(options);
    setShowDetailDialog(false);
    setAnimationPhase(3);
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  if (!isVisible && animationPhase !== 1) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 transform",
      animationPhase === 0 ? 'translate-y-full opacity-0' : 
      animationPhase === 1 ? 'translate-y-full opacity-0' : 
      animationPhase === 2 ? 'translate-y-0 opacity-100' :
      'translate-y-full opacity-0'
    )}>
      <div className="relative h-auto overflow-hidden py-2">
        <Card className={cn(
          "border border-terminal-green/30 shadow-lg max-w-4xl mx-auto",
          "bg-ocean-dark/80 backdrop-blur-md",
          "shadow-[0_0_15px_rgba(0,220,255,0.2)]",
          "overflow-hidden relative transition-all duration-700",
          "transform"
        )}>
          {/* Vrchní lišta podobná terminálu */}
          <div className="bg-terminal-black/90 px-4 py-2 border-b border-terminal-green/30 flex items-center">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
            </div>
            <div className="text-terminal-white/70 text-xs font-mono mx-auto flex items-center justify-center">
              <Lock className="h-3 w-3 mr-1.5 text-terminal-green" />
              privacy.webseidon.cz
            </div>
          </div>
          
          <div className="p-6 relative">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:flex-1">
                <div className="flex items-center mb-2">
                  <div className="mr-1.5 text-terminal-green">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-terminal-cyan">Používáme cookies</h3>
                </div>
                <p className="text-sm text-terminal-white/80 mb-4 font-mono">
                  Používáme cookies pro zlepšení vašeho zážitku na našich stránkách, analýzu návštěvnosti a personalizaci obsahu. 
                  Kliknutím na <span className="text-terminal-green">"Přijmout vše"</span> souhlasíte s používáním všech cookies. Kliknutím na <span className="text-terminal-green">"Přijmout nezbytné"</span> budou použity pouze nezbytné cookies.
                  Další informace najdete v našich <a href="/cookies" className="text-terminal-cyan hover:text-terminal-green underline transition-colors">zásadách cookies</a>.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:min-w-[220px] md:w-auto self-center">
                <AlertDialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDetailDialog(true)}
                      className="bg-terminal-black/80 border-terminal-green/30 text-terminal-green hover:bg-terminal-black/60 hover:text-terminal-cyan transition-all duration-300 font-mono flex items-center justify-center w-full"
                    >
                      <Cookie className="mr-2 h-4 w-4" />
                      Nastavení cookies
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md bg-ocean-dark/90 backdrop-blur-xl border border-terminal-green/30 text-terminal-white shadow-[0_0_25px_rgba(0,220,255,0.15)]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-terminal-cyan flex items-center gap-2">
                        <Cookie className="h-5 w-5" />
                        Nastavení cookies
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-terminal-white/70 font-mono">
                        Vyberte, které typy cookies chcete povolit.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between p-3 rounded-md bg-terminal-black/50 border border-terminal-green/20 hover:border-terminal-green/40 transition-colors">
                        <div>
                          <h4 className="font-medium text-terminal-cyan">Nezbytné cookies</h4>
                          <p className="text-sm text-terminal-white/60 font-mono">
                            Tyto cookies jsou nezbytné pro fungování webu.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={options.necessary} 
                            disabled 
                            className="rounded border-terminal-green/30 text-terminal-green focus:ring-terminal-green"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-md bg-terminal-black/50 border border-terminal-green/20 hover:border-terminal-green/40 transition-colors">
                        <div>
                          <h4 className="font-medium text-terminal-cyan">Analytické cookies</h4>
                          <p className="text-sm text-terminal-white/60 font-mono">
                            Pomáhají nám porozumět, jak návštěvníci používají web.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={options.analytics} 
                            onChange={(e) => updateOption("analytics", e.target.checked)}
                            className="rounded border-terminal-green/30 text-terminal-green focus:ring-terminal-green"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-md bg-terminal-black/50 border border-terminal-green/20 hover:border-terminal-green/40 transition-colors">
                        <div>
                          <h4 className="font-medium text-terminal-cyan">Marketingové cookies</h4>
                          <p className="text-sm text-terminal-white/60 font-mono">
                            Používáme je pro zobrazování relevantních reklam.
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={options.marketing} 
                            onChange={(e) => updateOption("marketing", e.target.checked)}
                            className="rounded border-terminal-green/30 text-terminal-green focus:ring-terminal-green"
                          />
                        </div>
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-terminal-black/70 border-terminal-red/40 text-terminal-red hover:bg-terminal-black hover:text-terminal-red/70 hover:border-terminal-red/60 font-mono">
                        Zrušit
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={saveSettings}
                        className="bg-terminal-green/90 text-terminal-black hover:bg-terminal-green font-mono"
                      >
                        Uložit nastavení
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button 
                    variant="outline" 
                    onClick={acceptNecessaryOnly}
                    className="bg-terminal-black/80 border-terminal-green/30 text-terminal-green hover:bg-terminal-black/60 hover:border-terminal-green/60 font-mono w-full"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Přijmout nezbytné
                  </Button>
                  <Button 
                    onClick={acceptAll}
                    className="bg-terminal-green/90 text-terminal-black hover:bg-terminal-green font-mono w-full"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Přijmout vše
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Export hook pro přístup ke stavu cookies
export function useCookieConsent() {
  const consent = loadCookieConsent();
  
  return {
    // Funkce pro kontrolu, zda je daný typ cookie povolený
    isAllowed: (type: keyof CookieOptions): boolean => {
      if (!consent) return type === "necessary"; // Pouze nezbytné cookies jsou povoleny, pokud chybí souhlas
      return consent.options[type] === true;
    },
    // Vrací celé nastavení cookies
    getOptions: (): CookieOptions => {
      return consent?.options || defaultOptions;
    },
    // Resetuje souhlas (např. pro účely testování)
    resetConsent: () => {
      localStorage.removeItem("cookieConsent");
      window.location.reload();
    }
  };
} 