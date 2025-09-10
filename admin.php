<?php
// admin.php
session_start();
require_once "config.php";

// --- Login credentials (simple for local) ---
$ADMIN_USER = 'lnladmin';
$ADMIN_PASS = 'password123'; // change to a strong password

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['username'] === $ADMIN_USER && $_POST['password'] === $ADMIN_PASS) {
        $_SESSION['logged_in'] = true;
    } else {
        $error = "Invalid username or password!";
    }
}

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: admin.php");
    exit;
}

// Check if logged in
if (!isset($_SESSION['logged_in'])) {
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
</head>
<body>
    <h2>Admin Login</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="POST">
        Username: <input type="text" name="username" required><br><br>
        Password: <input type="password" name="password" required><br><br>
        <button type="submit" name="login">Login</button>
    </form>
</body>
</html>
<?php
    exit;
}

// --- DB Connection ---
try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("DB Connection failed  : " . $e->getMessage());
}

// Handle adding new shipment
if (isset($_POST['add_shipment'])) {
    $tn = $_POST['tracking_number'];
    $status = $_POST['status'];
    $origin = $_POST['origin'];
    $destination = $_POST['destination'];
    $eta = $_POST['eta'];
    $notes = $_POST['notes'];

    $stmt = $pdo->prepare("INSERT INTO tracking (tracking_number, status, origin, destination, eta, last_update, notes) VALUES (?, ?, ?, ?, ?, NOW(), ?)");
    $stmt->execute([$tn, $status, $origin, $destination, $eta, $notes]);
    $message = "Shipment added!";
}

// Handle updating shipment
if (isset($_POST['update_shipment'])) {
    $id = $_POST['id'];
    $status = $_POST['status'];
    $eta = $_POST['eta'];
    $notes = $_POST['notes'];

    $stmt = $pdo->prepare("UPDATE tracking SET status=?, eta=?, notes=?, last_update=NOW() WHERE id=?");
    $stmt->execute([$status, $eta, $notes, $id]);
    $message = "Shipment updated!";
}

// Handle deleting shipment
if (isset($_POST['delete_shipment']) && !empty($_POST['id'])) {
    $id = $_POST['id'];
    $stmt = $pdo->prepare("DELETE FROM tracking WHERE id=?");
    $stmt->execute([$id]);
    $message = "Shipment deleted!";
}

// Fetch all shipments
$stmt = $pdo->query("SELECT * FROM tracking ORDER BY id DESC");
$shipments = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
    <style>
        body { font-family: Arial; padding: 20px; background:#f7f7f7; }
        h2 { margin-top:0; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; background:#fff; border-radius:8px; overflow:hidden; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #2563eb; color: #fff; }
        form { margin:0; }
        input, select { padding: 5px; margin: 2px; }
        button { padding: 6px 12px; border:none; border-radius:6px; cursor:pointer; }
        button.add { background:#10b981; color:#fff; margin-top:12px; }
        button.update { background:#fbbf24; color:#000; }
        button.delete { background:#e53935; color:#fff; }
        .message { color: green; }
        a { text-decoration: none; color: blue; }
    </style>
</head>
<body>

<h2>Admin Panel</h2>
<a href="admin.php?logout=1">Logout</a>

<?php if (isset($message)) echo "<p class='message'>$message</p>"; ?>

<h3>Add New Shipment</h3>
<form method="POST">
    Tracking #: <input type="text" name="tracking_number" required>
    Status: 
    <select name="status">
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
    </select>
    Origin: <input type="text" name="origin" required>
    Destination: <input type="text" name="destination" required>
    ETA: <input type="date" name="eta">
    Notes: <input type="text" name="notes">
    <button type="submit" name="add_shipment" class="add">Add Shipment</button>
</form>

<h3>All Shipments</h3>
<table>
    <tr>
        <th>ID</th>
        <th>Tracking #</th>
        <th>Status</th>
        <th>Origin</th>
        <th>Destination</th>
        <th>ETA</th>
        <th>Notes</th>
        <th>Actions</th>
    </tr>
    <?php foreach($shipments as $s): ?>
    <tr>
        <form method="POST">
            <td><?= $s['id'] ?></td>
            <td><?= $s['tracking_number'] ?></td>
            <td>
                <select name="status">
                    <option value="Pending" <?= $s['status']=='Pending'?'selected':'' ?>>Pending</option>
                    <option value="In Transit" <?= $s['status']=='In Transit'?'selected':'' ?>>In Transit</option>
                    <option value="Delivered" <?= $s['status']=='Delivered'?'selected':'' ?>>Delivered</option>
                </select>
            </td>
            <td><?= $s['origin'] ?></td>
            <td><?= $s['destination'] ?></td>
            <td><input type="date" name="eta" value="<?= $s['eta'] ?>"></td>
            <td><input type="text" name="notes" value="<?= $s['notes'] ?>"></td>
            <td>
                <input type="hidden" name="id" value="<?= $s['id'] ?>">
                <button type="submit" name="update_shipment" class="update">Update</button>
                <button type="submit" name="delete_shipment" class="delete" onclick="return confirm('Are you sure you want to delete this shipment?');">Delete</button>
            </td>
        </form>
    </tr>
    <?php endforeach; ?>
</table>

</body>
</html>
