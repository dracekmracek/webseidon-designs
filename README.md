# Webseidon.cz - Webové stránky pro malé firmy a živnostníky

![Webseidon Logo](public/logo.png)

## O projektu

Webseidon.cz je moderní webová stránka zaměřená na tvorbu webových stránek a digitální řešení pro malé firmy a živnostníky. Projekt je inspirován řeckým bohem moří Poseidonem a kombinuje tematické prvky moře, vln a trojzubce s moderním "hackerským" designem, který vytváří zajímavou a jedinečnou vizuální identitu.

### Klíčové vlastnosti

- **Oceánsko-hackerský design**: Kombinace tmavého pozadí s modrými odstíny oceánu a hackerskou estetikou
- **Animace vodních vln**: Plynulé animace vln oddělující jednotlivé sekce webu
- **Interaktivní efekty**: Animované kapičky vody, matrix efekt v pozadí, terminálový styl textů
- **Responzivní layout**: Plně responzivní design pro všechna zařízení
- **Optimalizovaný výkon**: Rychlé načítání a plynulé animace

## Technologie

Projekt využívá následující technologie:

- **Frontend framework**: React.js s TypeScript
- **Vite**: Jako build nástroj pro rychlý vývoj
- **Tailwind CSS**: Pro styly a responsivní design
- **Shadcn UI**: Pro konzistentní komponentní systém
- **React Router**: Pro navigaci mezi stránkami
- **React Query**: Pro správu stavu a fetching dat
- **Canvas API**: Pro pokročilé vizuální efekty (matrix déšť)

## Struktura projektu

```
webseidon-designs/
├── public/             # Statické soubory (obrázky, ikony)
├── src/                # Zdrojový kód
│   ├── components/     # React komponenty
│   │   ├── ui/         # Základní UI komponenty (Shadcn)
│   │   ├── Hero.tsx    # Úvodní sekce
│   │   ├── About.tsx   # Sekce O nás
│   │   ├── ...         # Další sekční komponenty
│   │   └── WaveAnimation.tsx  # Komponenta pro vlnovou animaci
│   ├── lib/            # Pomocné funkce a utility
│   ├── hooks/          # React hooks
│   ├── pages/          # Stránky aplikace
│   ├── App.tsx         # Hlavní komponent aplikace
│   └── main.tsx        # Vstupní bod aplikace
├── tailwind.config.ts  # Konfigurace Tailwind CSS
└── vite.config.ts      # Konfigurace Vite
```

## Funkcionality

### Vlnová animace

Klíčovým vizuálním prvkem je animace vln mezi sekcemi. Každá vlna je dynamicky vykreslována pomocí SVG a má několik vrstev s různými časováními a animacemi, což vytváří realistický efekt pohybu vody. Vlny jsou dostupné v několika variantách (smooth, choppy, cascade) pro různé sekce webu.

### Hackerský matrix efekt

V pozadí webu běží subtilní "matrix déšť" vykreslovaný pomocí Canvas API, který přidává dynamický pocit hackerského prostředí. Tento efekt je jemný, aby nerušil obsah stránky, ale zároveň posiluje unikátní vizuální identitu.

### Vodní kapičky

Po celé stránce se objevují animované vodní kapičky, které se pohybují a pulzují, což přidává na dynamice a udržuje tematickou konzistenci. Kapičky jsou generovány náhodně a mají různé velikosti a animace.

### Terminálový styl

Texty nadpisů a některé elementy používají styl připomínající příkazový řádek s blikajícím kurzorem, barevným zvýrazněním a monospacovým fontem, což podtrhuje technologickou identitu projektu.

## Sekce webu

1. **Hero** - Úvodní sekce s hlavním sdělením
2. **O nás** - Představení společnosti a jejích hodnot
3. **Služby** - Nabídka služeb s detaily
4. **Terminál** - Interaktivní terminálová sekce pro technologické demo
5. **Technologie** - Přehled používaných technologií
6. **Projekty** - Ukázky realizovaných projektů
7. **Workflow** - Popis pracovního postupu
8. **Reference** - Zpětná vazba od klientů
9. **Ceník** - Cenové balíčky a plány
10. **Blog** - Články a novinky
11. **FAQ** - Často kladené dotazy
12. **Kontakt** - Kontaktní formulář a údaje

## Použití a spuštění

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev

# Build pro produkci
npm run build

# Náhled produkčního buildu
npm run preview
```

## Nasazení projektu na produkci

### Build a příprava souborů pro hosting

```bash
# Vytvoření produkční verze
npm run build

# Výsledné soubory pro nahrání na hosting jsou ve složce /dist
```

Po spuštění příkazu `npm run build` se vytvoří složka `dist`, která obsahuje všechny potřebné soubory pro nasazení na hosting. Tyto soubory obsahují optimalizovaný a minifikovaný kód připravený pro produkční nasazení.

### Hosting a nastavení serveru

1. **Nahrání souborů na hosting**:
   - Nahrajte celý obsah složky `dist` na váš webový hosting
   - Pro nahrání můžete použít FTP klienta nebo nástroje poskytované hostingem

2. **Konfigurace serveru**:
   - Pro správné fungování SPA (Single Page Application) je potřeba nastavit přesměrování
   - Vytvořte ve vašem hostingu soubor `.htaccess` (pro Apache) nebo odpovídající konfiguraci pro Nginx

   **Příklad konfigurace pro Apache (.htaccess)**:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Příklad konfigurace pro Nginx**:
   ```
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

3. **HTTPS nastavení**:
   - Zajistěte, aby váš web běžel přes HTTPS
   - Většina moderních hostingů poskytuje Let's Encrypt certifikáty zdarma
   - Pokud váš hosting nepodporuje automatické nastavení HTTPS, použijte služby jako Cloudflare

### Správa domény

1. **Nastavení DNS záznamů**:
   - Nastavte A záznam, který směřuje na IP adresu vašeho hostingu
   - Příklad: `A @ 123.45.67.89`
   - Pro subdomény vytvořte odpovídající CNAME záznamy
   - Příklad: `CNAME www webseidon.cz.`

2. **Přesměrování www/non-www**:
   - Rozhodněte se, zda budete používat www nebo non-www variantu (např. webseidon.cz vs www.webseidon.cz)
   - Nastavte přesměrování z jedné varianty na druhou
   
   **Příklad pro přesměrování z www na non-www v .htaccess**:
   ```
   RewriteEngine On
   RewriteCond %{HTTP_HOST} ^www\.webseidon\.cz [NC]
   RewriteRule ^(.*)$ https://webseidon.cz/$1 [L,R=301]
   ```

## SEO Optimalizace

### Klíčové SEO soubory a jejich umístění

1. **Meta tagy a HTML hlavička** (`/index.html`):
   - Soubor obsahuje všechny důležité meta tagy, title, description
   - Open Graph a Twitter Card metadata pro sdílení na sociálních sítích
   - Strukturovaná data Schema.org pro lepší výsledky ve vyhledávačích

2. **robots.txt** (`/public/robots.txt`):
   - Řídí přístup vyhledávacích botů k vašemu webu
   - Aktuální nastavení povoluje indexaci celého webu
   - Pro úpravy editujte `/public/robots.txt`

3. **Sitemap.xml**:
   - Doporučujeme vytvořit sitemap.xml pro lepší indexaci
   - Umístěte ho do složky `/public/sitemap.xml`
   - Příklad základní podoby:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://webseidon.cz/</loc>
       <lastmod>2023-06-20</lastmod>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

4. **Web Manifest** (`/public/site.webmanifest`):
   - Definuje, jak se má web chovat při přidání na plochu mobilního zařízení
   - Doporučené úpravy:
   ```json
   {
     "name": "Webseidon",
     "short_name": "Webseidon",
     "icons": [
       {"src": "/icons/favicon-192x192.png", "sizes": "192x192", "type": "image/png"},
       {"src": "/icons/favicon-512x512.png", "sizes": "512x512", "type": "image/png"}
     ],
     "theme_color": "#05101F",
     "background_color": "#05101F",
     "display": "standalone",
     "start_url": "/"
   }
   ```

### Strukturovaná data

V souboru `index.html` jsou již implementovaná strukturovaná data Schema.org pro:
- LocalBusiness - informace o vaší firmě
- Service - informace o vašich službách

Tato data pomáhají vyhledávačům lépe porozumět obsahu vašeho webu a mohou vést k zobrazení rozšířených výsledků ve vyhledávání (rich snippets).

## Service Worker a offline funkcionalita

Service Worker je implementován pro lepší výkon a offline funkce. Najdete ho v souboru `/public/sw.js`.

### Doporučené úpravy v sw.js

1. **Aktualizace seznamu položek k uložení do cache**:
```javascript
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js',
  '/icons/favicon.ico',
  '/icons/favicon-512x512.png',
  // Přidejte další soubory, které chcete cachovat
];
```

2. **Vylepšení strategie cachování**:
Aktuální implementace přeskakuje cache, což není ideální pro výkon. Doporučujeme použít strategii "stale-while-revalidate":

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Vrátit z cache, pokud existuje
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Aktualizovat cache novými daty
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        })
        .catch((error) => {
          console.error('Fetch failed:', error);
        });
        
      return cachedResponse || fetchPromise;
    })
  );
});
```

## Kontaktní formulář

Kontaktní formulář využívá PHPMailer pro odesílání e-mailů. Soubor pro zpracování formuláře je umístěný v kořenovém adresáři jako `send_mail.php`.

### Nastavení PHPMaileru po nahrání na hosting

1. **Instalace PHPMaileru**:
   - Na většině hostingů je PHPMailer již předinstalovaný
   - Pokud není, nahrajte do složky `lib` nebo podobné adresáře na hostingu tyto soubory z oficiálního GitHub repozitáře:
     - PHPMailer.php
     - SMTP.php
     - Exception.php

2. **Úprava konfigurace v send_mail.php**:
   ```php
   // Konfigurace SMTP serveru
   $mail = new PHPMailer(true);
   $mail->isSMTP();
   $mail->Host = 'smtp.example.com';             // Zadejte SMTP server vašeho hostingu
   $mail->SMTPAuth = true;
   $mail->Username = 'your-email@example.com';   // Váš e-mail pro odesílání
   $mail->Password = 'your-password';            // Heslo k e-mailu
   $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Nebo 'ssl' podle vašeho hostingu
   $mail->Port = 587;                           // Většinou 587 pro TLS nebo 465 pro SSL
   
   // Nastavení odesílatele a příjemce
   $mail->setFrom('info@webseidon.cz', 'Webseidon');
   $mail->addAddress('info@webseidon.cz');      // E-mail, na který budou chodit zprávy z formuláře
   
   // Pro testování můžete aktivovat tuto část:
   // $mail->SMTPDebug = 2;                    // Zapnutí debugování - výpis informací o průběhu odesílání
   ```

3. **Zabezpečení před spamem a zneužitím**:
   - V souboru `send_mail.php` je implementována ochrana proti jednoduchým spambotům (honeypot pole)
   - Soubor používá anti-CSRF token pro ochranu proti Cross-Site Request Forgery útokům
   - V případě potřeby implementujte dodatečnou ochranu, jako je Google reCAPTCHA

4. **Propojení frontend a PHP skriptu**:
   - Ujistěte se, že cesta k `send_mail.php` v komponentě formuláře odpovídá reálnému umístění souboru na serveru
   - V komponentě `Contact.tsx` je cesta nastavena relativně vůči kořenovému adresáři (`action="/send_mail.php"`)

5. **Testování funkčnosti**:
   - Po nahrání na hosting nejprve vyzkoušejte formulář s testovacím e-mailem
   - Zkontrolujte logy serveru pro případné chyby
   - Ověřte, že e-maily nepadají do spamu

### Časté problémy a jejich řešení

1. **E-maily se neodesílají**:
   - Zkontrolujte SMTP nastavení (host, port, šifrování)
   - Ověřte přihlašovací údaje
   - Zkontrolujte, zda hosting neblokuje odchozí SMTP provoz

2. **E-maily končí ve spamu**:
   - Nastavte správně SPF, DKIM a DMARC záznamy v DNS vaší domény
   - Použijte jako odesílatele e-mail ze stejné domény jako je web (např. info@webseidon.cz)
   - Přidejte do e-mailu smysluplný předmět a obsah s minimem spamových klíčových slov

3. **Chybová hláška "headers already sent"**:
   - Zkontrolujte, že v PHP souboru nejsou žádné znaky před `<?php` nebo za `?>`
   - Odstraňte BOM (Byte Order Mark) ze začátku souboru

## Analytika a sledování

Pro sledování návštěvnosti a chování uživatelů doporučujeme:

1. **Google Analytics**: 
   - Vytvořte GA4 property v Google Analytics
   - Přidejte měřící kód do `index.html`
   - Příklad implementace:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

2. **Google Search Console**:
   - Zaregistrujte váš web v GSC pro sledování výkonu ve vyhledávačích
   - Nahrajte verifikační HTML soubor do složky `/public/`

## Testování před a po nasazení

### Před nasazením

1. **Lighthouse audit**:
   - Zkontrolujte výkon, SEO, přístupnost a best practices
   - Použijte DevTools v prohlížeči Chrome nebo PageSpeed Insights

2. **Cross-browser testování**:
   - Otestujte web v Chrome, Firefox, Safari a Edge
   - Zkontrolujte mobilní zobrazení

### Po nasazení

1. **Validace strukturovaných dat**:
   - Použijte [Rich Results Test](https://search.google.com/test/rich-results)
   - Ověřte, že vaše strukturovaná data jsou správně implementovaná

2. **Validace rychlosti načítání**:
   - Použijte [PageSpeed Insights](https://pagespeed.web.dev/)
   - Použijte [WebPageTest](https://www.webpagetest.org/) pro podrobnější analýzu

3. **Kontrola indexace**:
   - Zaregistrujte web v Google Search Console
   - Ověřte, že Google správně indexuje váš web

## Responzivní design

Web je plně responzivní a optimalizovaný pro všechna zařízení od mobilních telefonů po širokoúhlé monitory. Používá přístup "mobile-first" a dynamicky se přizpůsobuje různým velikostem obrazovky.

## Další vývoj

- Implementace vícejazyčnosti (EN/DE)
- Přidání portfolia případových studií
- Rozšíření blogu o automatické načítání článků
- Integrace online objednávkového systému
- Rozšíření analytických nástrojů




# Jak rychle zaimplementovat nový web do vyhledávačů

Pro rychlou implementaci nového webu do vyhledávačů a nahrazení starých výsledků novými stránkami doporučuji následující kroky:

## 1. Nastavení přesměrování ze starých URL na nové
- Vytvořte správná 301 přesměrování ze všech starých URL adres na odpovídající nové stránky
- Toto je klíčové, aby se přenesla "SEO síla" ze starých stránek na nové
- Použijte k tomu `.htaccess` soubor na vašem hostingu

## 2. Registrace ve vyhledávačích
- Zaregistrujte web v Google Search Console (https://search.google.com/search-console)
- Zaregistrujte web v Bing Webmaster Tools (https://www.bing.com/webmasters)
- V obou nástrojích potvrďte vlastnictví domény

## 3. Odeslání sitemapy
- Vytvořte `sitemap.xml` soubor, který obsahuje všechny důležité stránky
- Nahrajte ho do kořenového adresáře webu
- Odešlete sitemapu přes Google Search Console i Bing Webmaster Tools
- Přidejte odkaz na sitemap do souboru `robots.txt`

## 4. Požádejte Google o novou indexaci
- V Google Search Console použijte nástroj "URL kontrola"
- Zadejte URL vašeho webu a požádejte o indexaci
- To samé můžete udělat pro všechny hlavní podstránky

## 5. Optimalizujte meta tagy
- Zkontrolujte, že všechny stránky mají správné title, description a další meta tagy
- Přidejte kanonické URL (`<link rel="canonical">`) k odstranění duplicitního obsahu

## 6. Nastavte sociální meta tagy
- Implementujte Open Graph a Twitter Card meta tagy pro lepší zobrazení při sdílení

## 7. Vylepšete rychlost načítání stránky
- Otestujte rychlost stránky pomocí PageSpeed Insights (https://pagespeed.web.dev/)
- Optimalizujte podle doporučení

## 8. Zajistěte aktualizaci mezipamětí Googlu
- Můžete zkusit použít nástroj Google Cache Updater (neoficiální nástroj)

## 9. Vytvořte nebo aktualizujte profil v Google Business
- Pokud máte lokální podnikání, aktualizujte profil v Google Business

## 10. Vytvořte zpětné odkazy
- Pokud máte možnost, aktualizujte odkazy na váš web na jiných stránkách

Implementace do vyhledávačů může i přes tato opatření trvat několik dní až týdnů, je to normální. Google a další vyhledávače postupně procházejí a aktualizují svoje indexy.



## Autor Lukáš Adámek

Vytvořeno s 💙 týmem Webseidon
