<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit("Access denied");
}

$to = "handssavelivesgr@gmail.com";
$subject = "Νέα Φόρμα Επικοινωνίας – handssavelives";

$name = htmlspecialchars(trim($_POST["name"] ?? ""));
$email = htmlspecialchars(trim($_POST["email"] ?? ""));
$phone = htmlspecialchars(trim($_POST["phone"] ?? ""));
$company = htmlspecialchars(trim($_POST["company"] ?? ""));
$message = htmlspecialchars(trim($_POST["message"] ?? ""));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    exit("Λείπουν υποχρεωτικά πεδία.");
}

$body = "
Νέα υποβολή φόρμας από το handssavelives.gr

Όνομα: $name
Email: $email
Τηλέφωνο: $phone
Εταιρεία / Φορέας: $company

Μήνυμα:
$messa
