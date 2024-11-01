<?php

include 'funcionesExternas.php';

if (isset($_POST['Enviar'])) {

    if (isset($_POST['type'])) {
        // Limpieza y validación de entrada para evitar inyección de código
        $tipoSubida = htmlspecialchars(trim(strip_tags($_POST['type'])), ENT_QUOTES, 'UTF-8');

        // Definición de la ruta de destino según el tipo de subida
        switch ($tipoSubida) {
            case "Enunciado":
                $destino = "../public/assets/media/enunciados/";
                break;

            case "Solucion":
                $destino = "../public/assets/media/soluciones/";
                break;

            default:
                // Manejo de errores si el tipo no es permitido
                die("Tipo de subida no permitido.");
        }

        // Verificamos si se ha definido una ruta de destino
        if (!empty($destino)) {
            $nombres = $_FILES['Ficheros']['name'];
            $nombresTemporales = $_FILES['Ficheros']['tmp_name'];

            // Procesamos cada archivo subido
            foreach ($nombresTemporales as $index => $nombreTemporal) {
                if (is_uploaded_file($nombreTemporal)) {
                    // Construimos el nombre completo para el archivo de destino
                    $nombreCompleto = $destino . basename($nombres[$index]); // basename para evitar rutas problemáticas
                    if (move_uploaded_file($nombreTemporal, $nombreCompleto)) {
                        // Archivo subido exitosamente
                        echo "Archivo {$nombres[$index]} subido correctamente.<br>";
                    } else {
                        // Manejo de errores al mover el archivo
                        echo "Error al subir el archivo {$nombres[$index]}<br>";
                    }
                }
            }
        }

        // Redirigir después de completar la carga
        header("Location: " . $_SERVER['HTTP_REFERER']);
        exit;

    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtiene el contenido JSON del cuerpo de la solicitud
        $json = file_get_contents('php://input');
        
        // Decodifica el JSON en un array asociativo
        $object = json_decode($json, true);

        // Aseguramos que la decodificación fue exitosa
        if ($object !== null) {
            // Llama a la función para insertar el objeto en el archivo JSON
            insertIntoJsonFile($object);
        } else {
            echo "Error al decodificar JSON: " . json_last_error_msg() . "\n";
        }
    } else {
        echo "Solicitud no válida. Por favor, envíe un objeto JSON a través de una solicitud POST.\n";
    }

}
?>
