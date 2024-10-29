<?php

    include 'funcionesExternas.php';

    if(isset($_POST['Enviar'])){

        if (isset($_POST['type'])) {

            // Limpieza y validación de entrada para evitar inyección de código
            $tipoSubida = htmlspecialchars(trim(strip_tags($_POST['type'])), ENT_QUOTES, 'UTF-8');

            // Añadir un punto y coma después de la definición de la variable
            // Añadir ':' después de cada 'case' y corregir la sintaxis del 'switch'
            switch ($tipoSubida) {

                case "Enunciado":
                    $destino = "../public/assets/media/enunciados/";
                    break;

                case "Solucion":
                    $destino = "../public/assets/media/soluciones/";
                    break;

                default:
                    // Si el tipo no coincide con los valores permitidos, puedes redirigir o manejar el error aquí
                    die("Tipo de subida no permitido.");

            }

            // Verificamos si se ha definido una ruta de destino
            if (!empty($destino)) {

                $nombres = $_FILES['Ficheros']['name'];
                $nombresTemporales = $_FILES['Ficheros']['tmp_name'];

                for ($x = 0; $x < count($nombresTemporales); $x++) {

                    if (is_file($nombresTemporales[$x])) {

                        // Construimos el nombre completo para el archivo de destino
                        $nombreCompleto = $destino.$nombres[$x];  // basename para evitar rutas problemáticas
                        move_uploaded_file($nombresTemporales[$x], $nombreCompleto);

                    }

                }

            }

        }


        header("Location: " . $_SERVER['HTTP_REFERER']);
        exit;
        
    } else if($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtiene el contenido JSON del cuerpo de la solicitud
        $json = file_get_contents('php://input');
        // Decodifica el JSON en un array asociativo
        $object = json_decode($json, true);

        // Llama a la función para insertar el objeto en el archivo JSON
        insertIntoJsonFile($object);
    } else {
        echo "Solicitud no válida. Por favor, envíe un objeto JSON a través de una solicitud POST.\n";
    }

?>
