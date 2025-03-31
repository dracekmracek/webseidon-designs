# Nastavení kontaktního formuláře

Tento dokument obsahuje instrukce pro správnou konfiguraci kontaktního formuláře na vašem hostingu.

## 1. Knihovna PHPMailer

Pro odesílání e-mailů z kontaktního formuláře je potřeba knihovna PHPMailer. Máte dvě možnosti:

### Možnost 1: Použití PHPMailer již nainstalovaného na hostingu

Některé hostingy mají již PHPMailer předinstalovaný. V takovém případě upravte v `send_mail.php` cesty k souborům:

```php
// Zjistěte od svého poskytovatele hostingu správnou cestu a odkomentujte
// require '/cesta/k/vasemu/phpmailer/PHPMailer.php';
// require '/cesta/k/vasemu/phpmailer/SMTP.php';
// require '/cesta/k/vasemu/phpmailer/Exception.php';
```

### Možnost 2: Stažení PHPMailer (doporučeno)

1. Stáhněte nejnovější verzi PHPMailer z [GitHub repozitáře](https://github.com/PHPMailer/PHPMailer/releases)
2. Extrahujte soubory a nahrajte adresář `src` do složky `PHPMailer` ve vašem projektu.
3. Struktura by měla vypadat takto:
   ```
   public/
   ├── PHPMailer/
   │   └── src/
   │       ├── PHPMailer.php
   │       ├── SMTP.php
   │       └── Exception.php
   ├── send_mail.php
   └── ... (další soubory)
   ```

## 2. Konfigurace SMTP v send_mail.php

Otevřete soubor `send_mail.php` a upravte SMTP nastavení podle vašeho hostingu:

```php
// SMTP nastavení - TYTO ÚDAJE MUSÍTE ZMĚNIT podle vašeho hostingu
$mail->isSMTP();
$mail->Host = 'smtp.vas-hosting.cz';  // ZMĚŇTE na SMTP server vašeho hostingu
$mail->SMTPAuth = true;
$mail->Username = 'vas-email@domena.cz';  // ZMĚŇTE na váš e-mail
$mail->Password = '*********';  // ZMĚŇTE na vaše heslo
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // nebo ENCRYPTION_SMTPS (SSL) podle vašeho hostingu
$mail->Port = 587;  // obvykle 587 pro TLS nebo 465 pro SSL
```

Nejčastější SMTP servery hostingů:
- Wedos: `wes1-smtp.wedos.net`
- Forpsi: `smtp.forpsi.com`
- IGNUM: `smtp.ignum.cz`
- Czechia: `smtp.czechia.com`

## 3. Nastavení odesílatele a příjemce

V souboru `send_mail.php` také upravte e-mailové adresy pro odesílatele a příjemce:

```php
// Nastavení odesílatele a příjemce
$mail->setFrom('vas-email@domena.cz', 'Webseidon - Kontaktní formulář');  // ZMĚŇTE na váš e-mail
$mail->addAddress('vas-email@domena.cz', 'Webseidon');  // ZMĚŇTE na e-mail, kam má přijít zpráva
```

## 4. Testování odesílání

Pro snazší debugování můžete dočasně zapnout režim ladění:

```php
// Pro debug - pokud máte problémy s odesíláním, odkomentujte následující řádek
$mail->SMTPDebug = 2;  // Výstup bude uložen do mail_error.log
```

Po nahrání na hosting pošlete testovací zprávu. Pokud narazíte na problémy, zkontrolujte soubor `mail_error.log`, který by měl obsahovat detailní informace o chybě.

## 5. Běžné problémy a jejich řešení

### "Connection could not be established with host smtp.xxx.xx"
- Zkontrolujte správnost SMTP serveru a portu
- Ověřte, že váš hosting neblokuje odchozí SMTP spojení

### "SMTP Error: Could not authenticate"
- Ověřte správnost přihlašovacích údajů (uživatelské jméno a heslo)
- Pokud používáte Google, povolte přístup méně zabezpečených aplikací nebo vytvořte App Password

### "Access denied" nebo "Relay denied"
- Zkontrolujte, zda používáte správný SMTP server, který máte právo používat
- Některé SMTP servery dovolují posílat jen z e-mailů, které mají na daném serveru schránku

### Formulář se odesílá, ale e-maily nechodí
- Zkontrolujte složku SPAM
- Ověřte správnost e-mailové adresy příjemce
- Zkontrolujte SPF/DKIM záznamy vaší domény 