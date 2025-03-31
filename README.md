# Webseidon Designs

Oficiální webové stránky Webseidon Designs vytvořené pomocí Next.js a React.

## Obsah

- [Technologie](#technologie)
- [Instalace](#instalace)
- [Vývoj](#vývoj)
- [Nasazení](#nasazení)
- [Kontaktní formulář](#kontaktní-formulář)

## Technologie

Projekt využívá následující technologie:

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript knihovna pro tvorbu uživatelských rozhraní
- [TypeScript](https://www.typescriptlang.org/) - Typový systém pro JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Knihovna pro animace
- [React Hook Form](https://react-hook-form.com/) - Knihovna pro formuláře
- [Zod](https://github.com/colinhacks/zod) - TypeScript validační knihovna
- [Lucide React](https://lucide.dev/) - Ikony
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifikace

## Instalace

```bash
# Klonování repozitáře
git clone https://github.com/tvůj-username/webseidon-designs.git
cd webseidon-designs

# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev
```

## Vývoj

Pro lokální vývoj spusťte:

```bash
npm run dev
```

Aplikace bude dostupná na adrese [http://localhost:3000](http://localhost:3000).

## Nasazení

### Příprava pro produkci

```bash
# Vytvoření optimalizovaného buildu
npm run build

# Spuštění produkční verze lokálně
npm run start
```

### Nasazení na server

1. Vytvořte produkční build:
   ```bash
   npm run build
   ```

2. Obsah složky `out` nahrajte na váš webhosting.

3. Pokud používáte statický export, ujistěte se, že jste v `next.config.js` nastavili `output: 'export'`.

## Kontaktní formulář

Webová stránka obsahuje kontaktní formulář, který vyžaduje PHP na straně serveru pro odesílání e-mailů.

### Nastavení kontaktního formuláře

1. Po nahrání obsahu `out` složky na server, ujistěte se, že soubor `send_mail.php` je ve správném adresáři (kořenový adresář webu).

2. Nainstalujte PHPMailer knihovnu:
   - Stáhněte nejnovější verzi [PHPMailer](https://github.com/PHPMailer/PHPMailer/releases)
   - Extrahujte soubory a nahrajte adresář `src` do složky `PHPMailer` ve vašem projektu
   - Struktura by měla vypadat takto:
     ```
     váš-web/
     ├── PHPMailer/
     │   └── src/
     │       ├── PHPMailer.php
     │       ├── SMTP.php
     │       └── Exception.php
     ├── send_mail.php
     └── ... (další soubory)
     ```

3. Upravte SMTP nastavení v souboru `send_mail.php` podle vašeho hostingu:
   ```php
   // SMTP nastavení - TYTO ÚDAJE MUSÍTE ZMĚNIT podle vašeho hostingu
   $mail->isSMTP();
   $mail->Host = 'smtp.vas-hosting.cz';  // ZMĚŇTE na SMTP server vašeho hostingu
   $mail->SMTPAuth = true;
   $mail->Username = 'vas-email@domena.cz';  // ZMĚŇTE na váš e-mail
   $mail->Password = '*********';  // ZMĚŇTE na vaše heslo
   $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // nebo ENCRYPTION_SMTPS (SSL)
   $mail->Port = 587;  // obvykle 587 pro TLS nebo 465 pro SSL
   ```

4. Upravte e-mailové adresy pro odesílatele a příjemce:
   ```php
   // Nastavení odesílatele a příjemce
   $mail->setFrom('vas-email@domena.cz', 'Webseidon - Kontaktní formulář');
   $mail->addAddress('vas-email@domena.cz', 'Webseidon');
   ```

5. Pro podrobnější nastavení a řešení problémů s kontaktním formulářem se podívejte do souboru `README_EMAIL.md`.

Pro detailní instrukce a řešení problémů s kontaktním formulářem si prostudujte soubor [README_EMAIL.md](./public/README_EMAIL.md).
