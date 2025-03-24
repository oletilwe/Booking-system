<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "trainerbooking_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Check if email exists
    $stmt = $conn->prepare("SELECT id, full_name, email, password_hash, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['role'] = $user['role'];

            // Redirect based on user role
            if ($user['role'] === 'Admin') {
                header("Location: admin.html");
                echo "<script>window.location.href='admin.html';</script>";

            } elseif ($user['role'] === 'Trainer') {
                header("Location: trainer_dashboard.php");
                echo "<script>window.location.href='trainer.html';</script>";

            } else {
                header("Location: client_dashboard.php");
                echo "<script>window.location.href='user.html';</script>";
            }
            exit();
        } else {
            $error = "Invalid email or password!";
        }
    } else {
        $error = "Invalid email or password!";
    }
    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <?php if (isset($error)) { echo "<p class='error'>$error</p>"; } ?>
        <form action="login.php" method="POST">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>

        <p class="forgot-password"><a href="forgot.html">Forgot Password?</a></p>
        <p>Don't have an account? <a href="register.html">Register here</a></p>
    </div>
</body>
</html>
