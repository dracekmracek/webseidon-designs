<?php
// Ochrana proti přímému přístupu
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 403 Forbidden');
    exit('Přístup zakázán');
}

// Import potřebných knihoven
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Načtení PHPMailer
require 'vendor/autoload.php'; // Pokud máš Composer
// Pokud nemáš Composer, odkomentuj následující řádky:
// require 'lib/PHPMailer.php';
// require 'lib/SMTP.php';
// require 'lib/Exception.php';

// Anti-spam ochrana - kontrola honeypot pole
if (!empty($_POST['website'])) {
    // Pokud je honeypot pole vyplněné, pravděpodobně jde o spam bota
    // Vrátíme úspěšnou odpověď, aby bot nepoznal, že byl detekován
    http_response_code(200);
    echo json_encode(['status' => 'success']);
    exit;
}

// Kontrola CSRF tokenu
// Pokud implementuješ session-based CSRF ochranu, odkomentuj toto:
/*
session_start();
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    header('HTTP/1.1 403 Forbidden');
    exit('CSRF token verification failed');
}
*/

// Validace požadovaných polí
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => "Pole $field je povinné"]);
        exit;
    }
}

// Validace e-mailu
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => "Neplatná e-mailová adresa"]);
    exit;
}

// Sanitizace vstupů
$name = htmlspecialchars(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$subject = !empty($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : 'Nová zpráva z kontaktního formuláře';
$message = htmlspecialchars(trim($_POST['message']));

// Čas a IP pro ochranu proti spamu a logging
$timestamp = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'];

// Pokud chceš logovat požadavky (například pro detekci spamu):
// file_put_contents('form_submissions.log', "$timestamp | $ip | $email | $subject\n", FILE_APPEND);

$mail = new PHPMailer(true);

try {
    // SMTP nastavení
    $mail->isSMTP();
    $mail->Host = 'vas-smtp-server.cz'; // ZMĚŇTE na váš SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'vase@emailova-adresa.cz'; // ZMĚŇTE na váš e-mail
    $mail->Password = 'vase-heslo'; // ZMĚŇTE na vaše heslo
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8'; // Zajistí správné kódování češtiny

    // Nastavení odesílatele a příjemce
    $mail->setFrom('vase@emailova-adresa.cz', 'Webseidon - Kontaktní formulář'); // ZMĚŇTE na váš e-mail
    $mail->addAddress('vase@emailova-adresa.cz', 'Webseidon'); // ZMĚŇTE na váš e-mail pro příjem zpráv
    $mail->addReplyTo($email, $name); // Umožní odpovědět přímo odesílateli

    // Obsah e-mailu
    $mail->isHTML(true);
    $mail->Subject = "Kontaktní formulář: $subject";
    
    // Vytvoření HTML obsahu e-mailu
    $html_message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1e3a8a; color: white; padding: 10px 20px; border-radius: 5px 5px 0 0; }
            .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
            .footer { margin-top: 20px; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nová zpráva z kontaktního formuláře</h2>
            </div>
            <div class='content'>
                <p><strong>Jméno:</strong> $name</p>
                <p><strong>E-mail:</strong> $email</p>
                <p><strong>Předmět:</strong> $subject</p>
                <p><strong>Zpráva:</strong></p>
                <p>" . nl2br($message) . "</p>
                <p><strong>Čas odeslání:</strong> $timestamp</p>
                <p><strong>IP adresa:</strong> $ip</p>
            </div>
            <div class='footer'>
                <p>Tato zpráva byla odeslána z kontaktního formuláře na stránkách Webseidon.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Alternativní text pro e-mailové klienty, které nepodporují HTML
    $plain_message = "
    NOVÁ ZPRÁVA Z KONTAKTNÍHO FORMULÁŘE
    
    Jméno: $name
    E-mail: $email
    Předmět: $subject
    
    Zpráva:
    $message
    
    Odesláno: $timestamp
    IP: $ip
    ";
    
    $mail->Body = $html_message;
    $mail->AltBody = $plain_message;

    // Odeslání e-mailu
    $mail->send();
    
    // Úspěšná odpověď
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'E-mail byl úspěšně odeslán']);
} catch (Exception $e) {
    // Chybová odpověď
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => "E-mail se nepodařilo odeslat: {$mail->ErrorInfo}"]);
    
    // Zalogování chyby pro administrátora
    // error_log("Chyba při odesílání e-mailu: {$mail->ErrorInfo} | $timestamp | $ip | $email", 3, "mail_errors.log");
}
?>