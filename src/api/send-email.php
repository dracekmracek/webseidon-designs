<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Zapnutí error logování
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Získání dat z POST požadavku
$input = file_get_contents('php://input');
error_log("Received data: " . $input);

$data = json_decode($input, true);

// Validace dat
if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    error_log("Missing required fields");
    http_response_code(400);
    echo json_encode(['error' => 'Chybí povinné údaje']);
    exit;
}

// Validace emailu
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    error_log("Invalid email format: " . $data['email']);
    http_response_code(400);
    echo json_encode(['error' => 'Neplatný formát emailu']);
    exit;
}

// Načtení PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

try {
    $mail = new PHPMailer(true);

    // Nastavení serveru
    $mail->isSMTP();
    $mail->Host = 'wes1-smtp.wedos.net'; // nebo váš SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'info@webseidon.cz'; // váš email
    $mail->Password = 'Antekaspol1-'; // vaše heslo nebo app password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    // Příjemci
    $mail->setFrom($data['email'], $data['name']);
    $mail->addAddress('info@webseidon.cz', 'Webseidon');
    $mail->addReplyTo($data['email'], $data['name']);

    // Obsah
    $mail->isHTML(true);
    $mail->Subject = isset($data['subject']) ? $data['subject'] : 'Nový kontaktní formulář - Webseidon';
    
    // HTML obsah emailu
    $message = "
    <html>
    <head>
        <style>
            body { font-family: monospace; color: #333; }
            .header { color: #5da9e9; font-weight: bold; margin-bottom: 20px; }
            .field { margin-bottom: 10px; }
            .label { color: #5da9e9; font-weight: bold; }
            .value { color: #333; }
        </style>
    </head>
    <body>
        <div class='header'>=== Nový kontaktní formulář ===</div>
        <div class='field'>
            <span class='label'>Jméno:</span>
            <span class='value'>{$data['name']}</span>
        </div>
        <div class='field'>
            <span class='label'>Email:</span>
            <span class='value'>{$data['email']}</span>
        </div>";
    
    if (isset($data['subject']) && !empty($data['subject'])) {
        $message .= "
        <div class='field'>
            <span class='label'>Předmět:</span>
            <span class='value'>{$data['subject']}</span>
        </div>";
    }
    
    $message .= "
        <div class='field'>
            <span class='label'>Zpráva:</span>
            <div class='value' style='white-space: pre-wrap;'>{$data['message']}</div>
        </div>
    </body>
    </html>";

    $mail->Body = $message;
    $mail->AltBody = strip_tags($message);

    // Odeslání emailu
    error_log("Attempting to send email to: info@webseidon.cz");
    $mail->send();
    error_log("Email sent successfully");
    
    echo json_encode(['success' => true, 'message' => 'Email byl úspěšně odeslán']);
} catch (Exception $e) {
    error_log("Failed to send email: " . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(['error' => 'Nepodařilo se odeslat email. Zkontrolujte prosím nastavení SMTP serveru.']);
}
?> 