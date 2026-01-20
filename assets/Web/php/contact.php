<?php
if (isset($_POST['send'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // User's Validate Function
    if ($name != "" && $email != "" && $message != "") {
        mail(
            "your-email@example.com",   // change this
            "Contact Message",
            "Name: $name\nEmail: $email\nMessage: n\$message",
            "From: $email"
        );
        echo "Message sent!";
    } else {
        echo "Please fill in all fields.";
    }
}

// Database MySQL (Contact Form)
$conn = new mysqli("localhost", "root", "", "contact_db");

// Checking Connection
if ($conn->connect_error) {
    die("Connection failed: ");
}

// Submit
if (isset($_POST['send'])) {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    if ($name != "" && $email != "" && $message != "") {
        $sql = "INSERT INTO messages (name, email, message) VALUES ("$name", "$email", "$message")";

        if ($conn->query($sql) === TRUE) {
            echo "Message sent!";
        } else {
            echo "Message failed to send.";
        }
    }

}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - CAPSTONE PROJECT</title>

    <!--Contact CSS-->
    <link rel="stylesheet" href="assets/css/contact.css">

</head>    

<body>
<form method="post">
    <input type="text" name="name" placeholder="Name"><br><br>
    <input type="email" name="email" placeholder="Email"><br><br>
    <textarea name="message" placeholder="Message" maxLength="100"></textarea><br><br>
    <button type="submit" name="send">Send</button>
</form>

    <!--JavaScripts-->
    <script src="assets/js/email-form/validate.js"></script>
</body>
</html>