<?php
// send.php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(403);
  exit("Access denied");
}

$to = "handssavelivesgr@gmail.com";
$subject = "Νέα Φόρμα Επικοινωνίας – handssavelives";

$name    = trim($_POST["name"] ?? "");
$email   = trim($_POST["email"] ?? "");
$phone   = trim($_POST["phone"] ?? "");
$company = trim($_POST["company"] ?? "");
$message = trim($_POST["message"] ?? "");

// Basic validation
if ($name === "" || $email === "" || $message === "") {
  http_response_code(400);
  exit("Λείπουν υποχρεωτικά πεδία.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit("Μη έγκυρο email.");
}

// Anti-header-injection
if (preg_match("/[\r\n]/", $email)) {
  http_response_code(400);
  exit("Μη έγκυρο email.");
}

// Email body
$body =
"Νέα υποβολή φόρμας από το handssavelives.gr\n\n" .
"Όνομα: {$name}\n" .
"Email: {$email}\n" .
"Τηλέφωνο: {$phone}\n" .
"Εταιρεία / Φορέας: {$company}\n\n" .
"Μήνυμα:\n{$message}\n";

// Headers
$from = "no-reply@handssavelives.gr"; // καλύτερα να είναι domain email
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: handssavelives <{$from}>";
$headers[] = "Reply-To: {$name} <{$email}>";

$ok = mail($to, "=?UTF-8?B?" . base64_encode($subject) . "?=", $body, implode("\r\n", $headers));

if (!$ok) {
  http_response_code(500);
  exit("Αποτυχία αποστολής email. (mail() failed)");
}

// Success (return user-friendly text)
echo "OK";
