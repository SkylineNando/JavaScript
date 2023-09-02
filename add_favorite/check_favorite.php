<?php
session_start();
if (isset($_SESSION['user_id'])) {
    require_once '../conn.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $user_id = $_SESSION['user_id'];
        $item_id = $_POST['item_id'];
        $item_tipo = $_POST['item_tipo'];

        $check_sql = "SELECT id FROM favoritos WHERE user_id = '$user_id' AND item_id = '$item_id' AND item_tipo = '$item_tipo'";
        $check_result = $conn->query($check_sql);

        if ($check_result->num_rows > 0) {
            echo "favorited";
        }
    }

    $conn->close();
}
?>
