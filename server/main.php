<?php

    include 'funcionesExternas.php';

    if(isset($_POST['Enviar'])){

        $files = $_FILES['Ficheros'];
        echo "<script>console.log('Archivos recibidos correctamente');</script>";

    
    /*} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtiene el contenido JSON del cuerpo de la solicitud
        $json = file_get_contents('php://input');
        // Decodifica el JSON en un array asociativo
        $object = json_decode($json, true);

        // Llama a la función para insertar el objeto en el archivo JSON
        insertIntoJsonFile($object);*/
    } else {
        echo "Solicitud no válida. Por favor, envíe un objeto JSON a través de una solicitud POST.\n";
    }

?>