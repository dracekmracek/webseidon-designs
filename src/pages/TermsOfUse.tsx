import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveAnimation from "@/components/WaveAnimation";
import { ChevronRight } from "lucide-react";

const TermsOfUse = () => {
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
            <span className="text-ocean-light">Podmínky užití</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 terminal-section-title inline-block">
              Podmínky užití
            </h1>
            <p className="text-gray-300 max-w-3xl">
              Tyto podmínky užití stanovují pravidla a povinnosti při využívání webových stránek a služeb společnosti Webseidon
            </p>
          </div>

          {/* Main content */}
          <div className="bg-ocean-dark/30 backdrop-blur-md rounded-lg p-6 md:p-8 border border-terminal-green/20 mb-12">
            <div className="space-y-8 font-mono text-terminal-white/90">
              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">1. Úvodní ustanovení</h2>
                <p className="mb-4">
                  Tyto obchodní podmínky (dále jen "Podmínky") společnosti Webseidon, IČO: 21965684 (dále jen "Poskytovatel") upravují vzájemná práva a povinnosti smluvních stran vzniklé v souvislosti nebo na základě smluv uzavíraných mezi Poskytovatelem a fyzickou či právnickou osobou (dále jen "Klient") prostřednictvím internetových stránek Poskytovatele.
                </p>
                <p>
                  Ustanovení těchto Podmínek jsou nedílnou součástí smlouvy. Odchylná ujednání ve smlouvě mají přednost před ustanoveními těchto Podmínek.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">2. Uzavření smlouvy</h2>
                <p className="mb-4">
                  Veškerá prezentace služeb umístěná na webových stránkách Poskytovatele je informativního charakteru a Poskytovatel není povinen uzavřít smlouvu ohledně těchto služeb.
                </p>
                <p className="mb-4">
                  Smlouva mezi Poskytovatelem a Klientem vzniká:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Akceptací nabídky Poskytovatele Klientem</li>
                  <li>Podpisem písemné smlouvy oběma smluvními stranami</li>
                  <li>Zaplacením zálohy nebo celé ceny služby Klientem na základě nabídky Poskytovatele</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">3. Práva a povinnosti Poskytovatele</h2>
                <p className="mb-4">
                  Poskytovatel se zavazuje:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Poskytovat služby v souladu s těmito Podmínkami a obecně závaznými právními předpisy</li>
                  <li>Poskytnout Klientovi veškeré informace potřebné k využívání služeb</li>
                  <li>Zajistit dostupnost a funkčnost poskytovaných služeb dle specifikace v uzavřené smlouvě</li>
                  <li>Chránit osobní údaje Klienta dle platných právních předpisů</li>
                </ul>
                <p className="mb-4">
                  Poskytovatel je oprávněn:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Dočasně přerušit poskytování služeb z důvodu údržby nebo aktualizace</li>
                  <li>Změnit technické řešení služby, pokud to nepovede ke snížení její kvality</li>
                  <li>Odstoupit od smlouvy v případě porušení těchto Podmínek Klientem</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">4. Práva a povinnosti Klienta</h2>
                <p className="mb-4">
                  Klient se zavazuje:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Užívat služby Poskytovatele v souladu s těmito Podmínkami a obecně závaznými právními předpisy</li>
                  <li>Poskytnout součinnost potřebnou pro plnění předmětu smlouvy</li>
                  <li>Uhradit Poskytovateli sjednanou cenu za poskytnuté služby</li>
                  <li>Neprodleně informovat Poskytovatele o změnách údajů uvedených při uzavření smlouvy</li>
                </ul>
                <p className="mb-4">
                  Klient není oprávněn:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Zasahovat do technického řešení služeb Poskytovatele</li>
                  <li>Užívat služby způsobem, který by mohl omezit nebo narušit funkčnost serverů Poskytovatele</li>
                  <li>Šířit prostřednictvím služeb obsah, který je v rozporu s právním řádem ČR nebo dobrými mravy</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">5. Cena a platební podmínky</h2>
                <p className="mb-4">
                  Cena služeb je stanovena na základě aktuálního ceníku Poskytovatele nebo individuální nabídky. Ceny jsou uvedeny bez DPH, není-li výslovně uvedeno jinak.
                </p>
                <p className="mb-4">
                  Způsob úhrady ceny je stanoven ve smlouvě. Není-li dohodnuto jinak, je Klient povinen uhradit cenu služeb na základě faktury vystavené Poskytovatelem se splatností 14 dní od data vystavení.
                </p>
                <p>
                  V případě prodlení s úhradou je Poskytovatel oprávněn účtovat smluvní pokutu ve výši 0,05% z dlužné částky za každý den prodlení.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">6. Autorská práva a licence</h2>
                <p className="mb-4">
                  Veškeré materiály, grafika, texty, zdrojové kódy a další obsah vytvořený Poskytovatelem je chráněn autorským právem Poskytovatele nebo třetích osob.
                </p>
                <p className="mb-4">
                  Poskytovatel uděluje Klientovi nevýhradní licenci k užití díla vytvořeného na základě smlouvy, a to pro účel vyplývající ze smlouvy. Rozsah licence je specifikován ve smlouvě.
                </p>
                <p>
                  Klient není oprávněn dílo nebo jeho části upravovat bez souhlasu Poskytovatele, není-li ve smlouvě stanoveno jinak.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">7. Odpovědnost za vady a škodu</h2>
                <p className="mb-4">
                  Poskytovatel odpovídá za to, že služby budou poskytovány v souladu s uzavřenou smlouvou a těmito Podmínkami.
                </p>
                <p className="mb-4">
                  Klient je povinen zkontrolovat poskytnuté služby a dílo bezprostředně po jejich převzetí nebo zpřístupnění a případné vady bez zbytečného odkladu reklamovat u Poskytovatele.
                </p>
                <p className="mb-4">
                  Poskytovatel neodpovídá za škodu způsobenou:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Nesprávným nebo nevhodným užíváním služeb Klientem</li>
                  <li>Zásahem třetí osoby do díla nebo služeb</li>
                  <li>Událostmi vyšší moci</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">8. Ochrana osobních údajů</h2>
                <p className="mb-4">
                  Poskytovatel zpracovává osobní údaje Klienta v souladu s Obecným nařízením o ochraně osobních údajů (GDPR) a dalšími platnými právními předpisy.
                </p>
                <p className="mb-4">
                  Podrobné informace o zpracování osobních údajů jsou uvedeny v dokumentu <Link to="/privacy-policy" className="text-terminal-cyan hover:text-gold transition-colors">Zásady ochrany osobních údajů</Link>, který je dostupný na webových stránkách Poskytovatele.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">9. Ukončení smlouvy</h2>
                <p className="mb-4">
                  Smlouvu lze ukončit:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Dohodou smluvních stran</li>
                  <li>Písemnou výpovědí s výpovědní dobou stanovenou ve smlouvě</li>
                  <li>Odstoupením od smlouvy v případě podstatného porušení smluvních povinností druhou stranou</li>
                </ul>
                <p>
                  V případě předčasného ukončení smlouvy z důvodu na straně Klienta nemá Klient nárok na vrácení již uhrazené ceny služeb.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4 text-terminal-cyan">10. Závěrečná ustanovení</h2>
                <p className="mb-4">
                  Tyto Podmínky nabývají účinnosti dnem jejich zveřejnění na webových stránkách Poskytovatele.
                </p>
                <p className="mb-4">
                  Poskytovatel si vyhrazuje právo tyto Podmínky změnit. Změněné Podmínky budou zveřejněny na webových stránkách Poskytovatele a nabývají účinnosti dnem jejich zveřejnění.
                </p>
                <p className="mb-4">
                  Právní vztahy těmito Podmínkami výslovně neupravené se řídí příslušnými ustanoveními zákona č. 89/2012 Sb., občanský zákoník, a dalšími obecně závaznými právními předpisy České republiky.
                </p>
                <p>
                  Případné spory vzniklé mezi Poskytovatelem a Klientem budou řešeny přednostně smírnou cestou. V případě, že smírného řešení nebude dosaženo, budou spory řešeny u příslušného soudu České republiky.
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
              Máte další otázky ohledně našich podmínek?
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

export default TermsOfUse; 