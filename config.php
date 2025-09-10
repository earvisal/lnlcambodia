<?php
// track/config.sample.php
// 1) Copy this file to config.php
// 2) Fill in your real cPanel DB credentials
//    Note: On cPanel, names are prefixed with your cPanel username, e.g.
//    DB name:   cpaneluser_trackingdb
//    DB user:   cpaneluser_trackuser
$DB_HOST = 'localhost';
$DB_NAME = 'trackingdb';
$DB_USER = 'root';
$DB_PASS = '';   // leave empty in XAMPP


$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Database connection failed']);
  exit;
}
$mysqli->set_charset('utf8mb4');
