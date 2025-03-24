<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "trainerbooking_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $phone = $_POST['phone'];
    $national_id = $_POST['nationalID'];
    $passport = $_POST['passport'];
    $role = $_POST['role'];

    $sql = "INSERT INTO users (full_name, email, password_hash, phone_number, national_id, passport_number, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $full_name, $email, $password, $phone, $national_id, $passport, $role);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>