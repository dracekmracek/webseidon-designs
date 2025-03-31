<?php
// Ochrana proti přímému přístupu k souboru
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) && empty($_POST)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Přímý přístup k tomuto souboru není povolen.');
}

// Nastavení pro logování chyb
ini_set('log_errors', 1);
ini_set('error_log', 'mail_error.log');
error_reporting(E_ALL);

header('Content-Type: application/json');

// Zpracování CORS (Cross-Origin Resource Sharing)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Import knihoven PHPMailer
try {
    // Nejprve se pokusíme o načtení PHPMailer z lokálního adresáře
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
    require 'PHPMailer/src/Exception.php';
    
    // Pokud váš hosting má vlastní cestu k PHPMailer, použijte toto:
    // require '/cesta/k/vasemu/phpmailer/PHPMailer.php';
    // require '/cesta/k/vasemu/phpmailer/SMTP.php';
    // require '/cesta/k/vasemu/phpmailer/Exception.php';
} catch (Exception $e) {
    error_log('Chyba při načítání PHPMailer knihoven: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Chyba při načítání PHPMailer knihoven. Kontaktujte prosím správce webu.']);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Funkce pro logování požadavků
function logRequest($data) {
    $logFile = 'mail_request.log';
    $logData = date('[Y-m-d H:i:s]') . ' IP: ' . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Odstranění citlivých údajů před logováním
    if (isset($data['email'])) $data['email'] = substr($data['email'], 0, 3) . '***' . strstr($data['email'], '@');
    if (isset($data['name'])) $data['name'] = substr($data['name'], 0, 2) . '***';
    
    $logData .= "Data: " . json_encode($data, JSON_UNESCAPED_UNICODE) . "\n\n";
    file_put_contents($logFile, $logData, FILE_APPEND);
}

// Získání dat z POST požadavku
$postData = $_POST;
logRequest($postData);

// Anti-spam ochrana - honeypot
if (!empty($postData['website'])) {
    error_log('Detekován potenciální spam: vyplněn honeypot');
    // Předstíráme úspěch, ale email neodešleme
    echo json_encode(['success' => true, 'message' => 'Děkujeme za vaši zprávu. Budeme vás kontaktovat co nejdříve.']);
    exit;
}

// Kontrola, zda jsou vyplněna povinná pole
$requiredFields = ['name', 'email', 'message'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (empty($postData[$field])) {
        $missingFields[] = $field;
    }
}

if (!empty($missingFields)) {
    error_log('Chybějící povinná pole: ' . implode(', ', $missingFields));
    echo json_encode(['success' => false, 'message' => 'Vyplňte prosím všechna povinná pole.', 'fields' => $missingFields]);
    exit;
}

// Validace emailu
if (!filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
    error_log('Neplatná emailová adresa: ' . $postData['email']);
    echo json_encode(['success' => false, 'message' => 'Zadejte prosím platnou emailovou adresu.']);
    exit;
}

// Sanitizace vstupů
$name = htmlspecialchars(strip_tags(trim($postData['name'])));
$email = htmlspecialchars(strip_tags(trim($postData['email'])));
$subject = isset($postData['subject']) ? htmlspecialchars(strip_tags(trim($postData['subject']))) : 'Nová zpráva z kontaktního formuláře';
$message = htmlspecialchars(strip_tags(trim($postData['message'])));

// Vytvoření instance PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP nastavení - TYTO ÚDAJE MUSÍTE ZMĚNIT podle vašeho hostingu
    $mail->isSMTP();
    $mail->Host = 'wes1-smtp.wedos.net';  // ZMĚŇTE na SMTP server vašeho hostingu
    $mail->SMTPAuth = true;
    $mail->Username = 'info@webseidon.cz';  // ZMĚŇTE na váš e-mail
    $mail->Password = 'Antekaspol1-';  // ZMĚŇTE na vaše heslo
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // nebo ENCRYPTION_SMTPS (SSL) podle vašeho hostingu
    $mail->Port = 587;  // obvykle 587 pro TLS nebo 465 pro SSL
    
    // Pro debug - pokud máte problémy s odesíláním, odkomentujte následující řádek
    // $mail->SMTPDebug = 2;  // Výstup bude uložen do mail_error.log
    
    // Nastavení odesílatele a příjemce
    $mail->setFrom('info@webseidon.cz', 'Webseidon - Kontaktní formulář');  // ZMĚŇTE na váš e-mail
    $mail->addAddress('info@webseidon.cz', 'Webseidon');  // ZMĚŇTE na e-mail, kam má přijít zpráva
    $mail->addReplyTo($email, $name);  // Odpověď půjde na email odesílatele
    
    // Nastavení obsahu emailu
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = $subject;
    
    // HTML verze emailu
    $htmlBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { color: #0066cc; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            .message { background-color: #f0f7ff; padding: 15px; border-radius: 5px; }
            .footer { margin-top: 30px; font-size: 0.8em; color: #777; text-align: center; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>Nová zpráva z kontaktního formuláře</h1>
            <div class='info'>
                <p><strong>Od:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Předmět:</strong> {$subject}</p>
                <p><strong>IP adresa:</strong> {$_SERVER['REMOTE_ADDR']}</p>
                <p><strong>Datum a čas:</strong> " . date('d.m.Y H:i:s') . "</p>
            </div>
            <div class='message'>
                <h2>Zpráva:</h2>
                <p>" . nl2br($message) . "</p>
            </div>
            <div class='footer'>
                <p>Tato zpráva byla automaticky odeslána z kontaktního formuláře na webu Webseidon.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mail->Body = $htmlBody;
    
    // Textová verze emailu (pro klienty, kteří nepodporují HTML)
    $textBody = "Nová zpráva z kontaktního formuláře\n\n";
    $textBody .= "Od: {$name}\n";
    $textBody .= "Email: {$email}\n";
    $textBody .= "Předmět: {$subject}\n";
    $textBody .= "IP adresa: {$_SERVER['REMOTE_ADDR']}\n";
    $textBody .= "Datum a čas: " . date('d.m.Y H:i:s') . "\n\n";
    $textBody .= "Zpráva:\n{$message}\n\n";
    $textBody .= "Tato zpráva byla automaticky odeslána z kontaktního formuláře na webu Webseidon.";
    
    $mail->AltBody = $textBody;
    
    // Odeslání emailu
    $mail->send();
    
    // Záznam o úspěšném odeslání
    error_log('Email úspěšně odeslán: ' . $subject);
    echo json_encode(['success' => true, 'message' => 'Děkujeme za vaši zprávu. Budeme vás kontaktovat co nejdříve.']);
} catch (Exception $e) {
    // Záznam chyby
    error_log('Chyba při odesílání emailu: ' . $mail->ErrorInfo);
    echo json_encode(['success' => false, 'message' => 'Při odesílání zprávy došlo k chybě. Zkuste to prosím později nebo nás kontaktujte jiným způsobem.']);
}
?>
