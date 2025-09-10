<?php
header("Content-Type: application/json");
require_once "config.php";

if (!isset($_POST['tracking_id'])) {
    echo json_encode(["error" => "No tracking number provided"]);
    exit;
}

$tracking_number = $_POST['tracking_id']; // match the name in your form

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM tracking WHERE tracking_number = ?");
    if (!$stmt) {
        echo json_encode(["error" => "Query prepare failed"]);
        exit;
    }

    $stmt->execute([$tracking_number]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    } else {
        echo json_encode(["status" => "Not Found"]);
    }

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
