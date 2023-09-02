<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('location: login.php');
} else {
    require_once '../conn.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['item_id']) && isset($_POST['item_tipo'])) {
            $user_id = $_SESSION['user_id'];
            $item_id = $_POST['item_id'];
            $item_tipo = $_POST['item_tipo'];

            // Verificar se o item é um favorito do usuário antes de remover
            $check_sql = "SELECT id FROM favoritos WHERE user_id = '$user_id' AND item_id = '$item_id' AND item_tipo = '$item_tipo'";
            $check_result = $conn->query($check_sql);

            if ($check_result->num_rows > 0) {
                // Remover o item dos favoritos
                $remove_sql = "DELETE FROM favoritos WHERE user_id = '$user_id' AND item_id = '$item_id' AND item_tipo = '$item_tipo'";
                if ($conn->query($remove_sql) === TRUE) {
                    echo "removed"; // Retorna 'removed' se a remoção for bem-sucedida
                } else {
                    echo "Erro ao remover dos favoritos: " . $conn->error;
                }
            } else {
                echo "Este item não está marcado como favorito.";
            }
        } else {
            echo "Parâmetros inválidos.";
        }
    }

    $conn->close();
}
?>
