<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('location: login.php');
    exit; // Encerra a execução após o redirecionamento
}

require_once '../conn.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'];
    $item_id = isset($_POST['item_id']) ?$_POST['item_id'] : "";
    $item_tipo = isset($_POST['item_tipo']) ?$_POST['item_tipo'] : "";
    // Verificar se o item já é um favorito do usuário
    $check_sql = "SELECT id FROM favoritos WHERE user_id = '$user_id' AND item_id = '$item_id' AND item_tipo = '$item_tipo'";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        echo "Este item já está marcado como favorito.";
    } else {
        $insert_sql = "INSERT INTO favoritos (user_id, item_id, item_tipo) VALUES ('$user_id', '$item_id', '$item_tipo')";
        if ($conn->query($insert_sql) === TRUE) {
            echo "success";
        } else {
            echo "Erro ao adicionar favorito: " . $conn->error;
        }
    }
}
$conn->close();
?>
