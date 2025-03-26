import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveAnimation from "@/components/WaveAnimation";
import { ChevronRight, Cookie, Info, Shield, Settings } from "lucide-react";
import { useCookieConsent } from "@/components/ui/cookie-consent";

const Cookies = () => {
  const cookieConsent = useCookieConsent();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-ocean-darker text-gray-100">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm text-ocean-light/80">
            <Link to="/" className="hover:text-ocean-light">Domů</Link>
            <ChevronRight className="mx-2 h-4 w-4 text-ocean-light/50" />
            <span className="text-ocean-light">Zásady používání cookies</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 terminal-section-title inline-block">
              Zásady používání cookies
            </h1>
            <p className="text-gray-300 max-w-3xl">
              Informace o tom, jak naše webová stránka používá cookies a podobné technologie
            </p>
          </div>

          {/* Main content */}
          <div className="bg-ocean-dark/30 backdrop-blur-md rounded-lg p-6 md:p-8 border border-terminal-green/20 mb-12">
            <div className="space-y-8 font-mono text-terminal-white/90">
              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">1. Co jsou cookies?</h2>
                <div className="flex gap-4 items-start">
                  <Cookie className="h-8 w-8 text-terminal-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="mb-4">
                      Cookies jsou malé textové soubory, které jsou ukládány do vašeho zařízení (počítač, mobilní telefon nebo tablet) při návštěvě webové stránky. Cookies umožňují webovým stránkám rozpoznat vaše zařízení a zapamatovat si určité informace o vaší návštěvě.
                    </p>
                    <p>
                      Soubory cookies nemohou prohledávat váš počítač ani jiná zařízení nebo číst v nich uložená data. Cookies obvykle obsahují název webové stránky, ze které pocházejí, dobu jejich existence a unikátní identifikátor (náhodně vygenerované číslo).
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">2. Jaké typy cookies používáme?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green">
                      <span className="font-mono font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-terminal-green">Nezbytné cookies</h3>
                      <p>
                        Tyto cookies jsou nezbytné pro fungování naší webové stránky. Bez těchto cookies by stránka nefungovala správně. Tyto cookies neukládají žádné informace, které by mohly identifikovat vaši osobu, a nelze je vypnout.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green">
                      <span className="font-mono font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-terminal-green">Analytické cookies</h3>
                      <p>
                        Tyto cookies nám umožňují počítat návštěvy a zdroje provozu, abychom mohli měřit a zlepšovat výkonnost naší stránky. Pomáhají nám zjistit, které stránky jsou nejpopulárnější nebo nejméně populární, a vidět, jak se návštěvníci na stránce pohybují. Všechny informace, které tyto cookies shromažďují, jsou agregované a anonymní.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green">
                      <span className="font-mono font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-terminal-green">Funkční cookies</h3>
                      <p>
                        Tyto cookies umožňují webové stránce poskytovat vylepšené funkce a personalizaci. Mohou být nastaveny námi nebo poskytovateli třetích stran, jejichž služby jsme na našich stránkách přidali. Pokud tyto cookies nepovolíte, některé nebo všechny tyto služby nemusí fungovat správně.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-md bg-terminal-black border border-terminal-green/30 text-terminal-green">
                      <span className="font-mono font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-terminal-green">Marketingové cookies</h3>
                      <p>
                        Tyto cookies mohou být nastaveny prostřednictvím naší stránky našimi reklamními partnery. Mohou být těmito společnostmi použity k vytvoření profilu vašich zájmů a k zobrazení relevantních reklam na jiných stránkách. Neukládají přímo osobní údaje, ale jsou založeny na jedinečné identifikaci vašeho prohlížeče a internetového zařízení.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">3. Seznam používaných cookies</h2>
                <p className="mb-4">
                  Níže je uveden seznam cookies, které používáme na našich webových stránkách:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-terminal-black/60">
                        <th className="border border-terminal-green/20 p-3 text-left text-terminal-green">Název</th>
                        <th className="border border-terminal-green/20 p-3 text-left text-terminal-green">Typ</th>
                        <th className="border border-terminal-green/20 p-3 text-left text-terminal-green">Účel</th>
                        <th className="border border-terminal-green/20 p-3 text-left text-terminal-green">Expirace</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-terminal-black/20">
                        <td className="border border-terminal-green/20 p-3">_ga</td>
                        <td className="border border-terminal-green/20 p-3">Analytické</td>
                        <td className="border border-terminal-green/20 p-3">Registruje jedinečné ID, které se používá ke generování statistických údajů o tom, jak návštěvník používá webovou stránku.</td>
                        <td className="border border-terminal-green/20 p-3">2 roky</td>
                      </tr>
                      <tr className="hover:bg-terminal-black/20">
                        <td className="border border-terminal-green/20 p-3">_gid</td>
                        <td className="border border-terminal-green/20 p-3">Analytické</td>
                        <td className="border border-terminal-green/20 p-3">Registruje jedinečné ID, které se používá ke generování statistických údajů o tom, jak návštěvník používá webovou stránku.</td>
                        <td className="border border-terminal-green/20 p-3">24 hodin</td>
                      </tr>
                      <tr className="hover:bg-terminal-black/20">
                        <td className="border border-terminal-green/20 p-3">_gat</td>
                        <td className="border border-terminal-green/20 p-3">Analytické</td>
                        <td className="border border-terminal-green/20 p-3">Používá se ke Google Analytics k omezení rychlosti požadavků.</td>
                        <td className="border border-terminal-green/20 p-3">1 minuta</td>
                      </tr>
                      <tr className="hover:bg-terminal-black/20">
                        <td className="border border-terminal-green/20 p-3">cookieconsent_status</td>
                        <td className="border border-terminal-green/20 p-3">Nezbytné</td>
                        <td className="border border-terminal-green/20 p-3">Ukládá stav souhlasu uživatele s cookies.</td>
                        <td className="border border-terminal-green/20 p-3">1 rok</td>
                      </tr>
                      <tr className="hover:bg-terminal-black/20">
                        <td className="border border-terminal-green/20 p-3">session_id</td>
                        <td className="border border-terminal-green/20 p-3">Nezbytné</td>
                        <td className="border border-terminal-green/20 p-3">Zachovává stav relace uživatele napříč požadavky na stránku.</td>
                        <td className="border border-terminal-green/20 p-3">Relace</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">4. Vaše volby ohledně cookies</h2>
                <div className="flex gap-4 items-start">
                  <Settings className="h-8 w-8 text-terminal-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="mb-4">
                      Většina prohlížečů umožňuje kontrolovat cookies prostřednictvím nastavení. Můžete nastavit svůj prohlížeč tak, aby vás upozornil na používání cookies, nebo aby cookies odmítl. Pokud však ve svém prohlížeči cookies zakážete, nebudete moci využívat všechny interaktivní funkce našich stránek.
                    </p>
                    <p className="mb-4">
                      Nastavení cookies můžete změnit v následujících prohlížečích:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                      <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-gold transition-colors">Google Chrome</a></li>
                      <li><a href="https://support.mozilla.org/cs/kb/povoleni-zakazani-cookies" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-gold transition-colors">Mozilla Firefox</a></li>
                      <li><a href="https://support.microsoft.com/cs-cz/microsoft-edge/odstranění-souborů-cookie-v-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-gold transition-colors">Microsoft Edge</a></li>
                      <li><a href="https://support.apple.com/cs-cz/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-gold transition-colors">Safari</a></li>
                    </ul>
                    <p>
                      Kromě toho máte možnost odhlásit se z analytických cookies prostřednictvím nástroje pro úpravu souhlasu s cookies na našem webu.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">5. Právní základ pro používání cookies</h2>
                <div className="flex gap-4 items-start">
                  <Shield className="h-8 w-8 text-terminal-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="mb-4">
                      Pro ukládání nebo přístup k nezbytným cookies není vyžadován váš souhlas, protože jsou potřebné pro zajištění funkčnosti webové stránky. Pro všechny ostatní typy cookies potřebujeme váš souhlas.
                    </p>
                    <p className="mb-4">
                      Souhlas s používáním cookies můžete kdykoliv odvolat. Odvolání souhlasu nemá vliv na zákonnost zpracování vycházejícího ze souhlasu, který byl dán před jeho odvoláním.
                    </p>
                    <p>
                      Naše zásady používání cookies jsou v souladu s následujícími právními předpisy:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Zákon č. 127/2005 Sb., o elektronických komunikacích</li>
                      <li>Nařízení Evropského parlamentu a Rady (EU) 2016/679 (GDPR)</li>
                      <li>Směrnice Evropského parlamentu a Rady 2002/58/ES (ePrivacy směrnice)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">6. Další informace</h2>
                <div className="flex gap-4 items-start">
                  <Info className="h-8 w-8 text-terminal-green flex-shrink-0 mt-1" />
                  <div>
                    <p className="mb-4">
                      Další informace o tom, jak zpracováváme vaše osobní údaje, najdete v našich <Link to="/privacy-policy" className="text-terminal-cyan hover:text-gold transition-colors">Zásadách ochrany osobních údajů</Link>.
                    </p>
                    <p>
                      Pokud máte jakékoli dotazy týkající se našeho používání cookies, kontaktujte nás na e-mailové adrese: info@webseidon.cz
                    </p>
                  </div>
                </div>
              </section>

              <div className="pt-4 border-t border-terminal-green/20">
                <p className="text-sm text-terminal-white/60">
                  Poslední aktualizace: 1. července 2024
                </p>
              </div>
            </div>
          </div>

          {/* Cookie Manager Button */}
          <div className="text-center">
            <p className="mb-6 text-gray-300">
              Chcete upravit své preference ohledně cookies?
            </p>
            <button 
              className="btn-terminal inline-flex items-center"
              onClick={() => {
                cookieConsent.resetConsent();
              }}
            >
              <Cookie className="mr-2 h-4 w-4" />
              Upravit nastavení cookies
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <WaveAnimation position="bottom" waveColor="rgb(93, 169, 233)" intensity="light" />
    </div>
  );
};

export default Cookies; 