import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveAnimation from "@/components/WaveAnimation";
import { ChevronRight } from "lucide-react";

const PrivacyPolicy = () => {
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
            <span className="text-ocean-light">Zásady ochrany osobních údajů</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 terminal-section-title inline-block">
              Zásady ochrany osobních údajů
            </h1>
            <p className="text-gray-300 max-w-3xl">
              Informace o zpracování osobních údajů v souladu s Obecným nařízením o ochraně osobních údajů (GDPR)
            </p>
          </div>

          {/* Main content */}
          <div className="bg-ocean-dark/30 backdrop-blur-md rounded-lg p-6 md:p-8 border border-terminal-green/20 mb-12">
            <div className="space-y-8 font-mono text-terminal-white/90">
              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">1. Správce osobních údajů</h2>
                <p className="mb-4">
                  Správcem osobních údajů je společnost Webseidon, IČO: 21965684 (dále jen "Správce").
                </p>
                <p>
                  Kontaktní údaje Správce:<br />
                  E-mail: info@webseidon.cz<br />
                  Telefon: +420 776 211 336
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">2. Rozsah zpracovávaných osobních údajů</h2>
                <p className="mb-4">
                  Správce zpracovává osobní údaje, které mu poskytnete v rámci používání webových stránek, zejména:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Identifikační údaje (jméno a příjmení)</li>
                  <li>Kontaktní údaje (e-mailová adresa, telefonní číslo)</li>
                  <li>Údaje o interakci s webovými stránkami (IP adresa, cookies, údaje o prohlížeči)</li>
                  <li>Další údaje, které nám poskytnete prostřednictvím kontaktního formuláře</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">3. Účely zpracování osobních údajů</h2>
                <p className="mb-4">
                  Vaše osobní údaje zpracováváme pro následující účely:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Poskytování služeb a plnění smluv</li>
                  <li>Komunikace s vámi a odpovídání na vaše dotazy</li>
                  <li>Zasílání obchodních sdělení a marketingových materiálů (pouze s vaším souhlasem)</li>
                  <li>Zlepšování našich služeb a webových stránek</li>
                  <li>Plnění zákonných povinností</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">4. Právní základy zpracování</h2>
                <p className="mb-4">
                  Zpracování osobních údajů provádíme na základě následujících právních titulů:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><span className="text-terminal-green">Plnění smlouvy:</span> zpracování je nezbytné pro plnění smlouvy, jejíž jste smluvní stranou</li>
                  <li><span className="text-terminal-green">Oprávněný zájem:</span> zpracování je nezbytné pro účely našich oprávněných zájmů (zlepšování služeb, zabezpečení webu)</li>
                  <li><span className="text-terminal-green">Zákonná povinnost:</span> zpracování je nezbytné pro splnění našich zákonných povinností</li>
                  <li><span className="text-terminal-green">Souhlas:</span> zpracování na základě vašeho souhlasu (např. pro zasílání obchodních sdělení)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">5. Doba zpracování osobních údajů</h2>
                <p className="mb-4">
                  Osobní údaje zpracováváme pouze po dobu nezbytně nutnou k naplnění účelu zpracování, typicky:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Po dobu trvání smluvního vztahu</li>
                  <li>Po dobu nezbytnou k vyřízení vašeho požadavku</li>
                  <li>Po dobu stanovenou zákonem (účetní a daňové doklady)</li>
                  <li>Do odvolání vašeho souhlasu</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">6. Příjemci osobních údajů</h2>
                <p className="mb-4">
                  Vaše osobní údaje mohou být zpřístupněny následujícím kategoriím příjemců:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Poskytovatelé služeb (hosting, účetnictví, správa IT)</li>
                  <li>Orgány veřejné moci (v případě zákonné povinnosti)</li>
                </ul>
                <p>
                  Všichni naši zpracovatelé jsou vázáni povinností mlčenlivosti a nesmějí využít poskytnuté údaje k žádným jiným účelům.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">7. Vaše práva</h2>
                <p className="mb-4">
                  V souvislosti se zpracováním osobních údajů máte následující práva:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><span className="text-terminal-green">Právo na přístup k osobním údajům:</span> máte právo získat informace o tom, jaké údaje o vás zpracováváme</li>
                  <li><span className="text-terminal-green">Právo na opravu:</span> máte právo na opravu nepřesných nebo neúplných osobních údajů</li>
                  <li><span className="text-terminal-green">Právo na výmaz (právo být zapomenut):</span> máte právo na vymazání osobních údajů za určitých podmínek</li>
                  <li><span className="text-terminal-green">Právo na omezení zpracování:</span> máte právo požadovat omezení zpracování údajů</li>
                  <li><span className="text-terminal-green">Právo na přenositelnost údajů:</span> máte právo získat své údaje ve strukturovaném, běžně používaném formátu</li>
                  <li><span className="text-terminal-green">Právo vznést námitku:</span> máte právo kdykoliv vznést námitku proti zpracování</li>
                  <li><span className="text-terminal-green">Právo odvolat souhlas:</span> souhlas se zpracováním můžete kdykoliv odvolat</li>
                  <li><span className="text-terminal-green">Právo podat stížnost:</span> máte právo podat stížnost u dozorového úřadu (Úřad pro ochranu osobních údajů)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">8. Zabezpečení dat</h2>
                <p className="mb-4">
                  Přijali jsme vhodná technická a organizační opatření k ochraně vašich osobních údajů před neoprávněným či protiprávním zpracováním a před náhodnou ztrátou, zničením nebo poškozením.
                </p>
                <p>
                  Všechny osobní údaje jsou uloženy na zabezpečených serverech a přístup k nim je omezen pouze na oprávněné osoby.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">9. Cookies</h2>
                <p className="mb-4">
                  Naše webové stránky používají cookies pro zlepšení uživatelského zážitku a analýzu návštěvnosti. Podrobné informace o cookies najdete v našich <Link to="/cookies" className="text-terminal-cyan hover:text-gold transition-colors">Zásadách používání cookies</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">10. Změny zásad ochrany osobních údajů</h2>
                <p>
                  Vyhrazujeme si právo tyto zásady ochrany osobních údajů kdykoliv upravit či doplnit. Aktuální verze bude vždy zveřejněna na této stránce s uvedením data poslední aktualizace.
                </p>
              </section>

              <div className="pt-4 border-t border-terminal-green/20">
                <p className="text-sm text-terminal-white/60">
                  Poslední aktualizace: 1. července 2024
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <p className="mb-6 text-gray-300">
              Máte další otázky ohledně zpracování vašich osobních údajů?
            </p>
            <Link 
              to="/contact" 
              className="btn-terminal inline-flex items-center"
            >
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WaveAnimation position="bottom" waveColor="rgb(93, 169, 233)" intensity="light" />
    </div>
  );
};

export default PrivacyPolicy; 