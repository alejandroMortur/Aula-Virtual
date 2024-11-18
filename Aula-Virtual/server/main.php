<?php

    include 'externalFunctions.php'; 

    if(isset($_POST['type'])){

        // Clean and validate input to prevent code injection
        $uploadType = htmlspecialchars(trim(strip_tags($_POST['type'])), ENT_QUOTES, 'UTF-8');

        // Add a semicolon after the variable definition
        // Add ':' after each 'case' and correct the syntax of the 'switch'
        switch ($uploadType) {

            case "Enunciado":
                $destination = "../public/assets/media/enunciados/";
                break;

            case "Solucion":
                $destination = "../public/assets/media/soluciones/";
                break;

            default:
                // If the type does not match the allowed values, you can redirect or handle the error here
                die("Upload type not allowed.");

        }

        // Check if a destination path has been defined
        if (!empty($destination)) {

                $fileNames = $_FILES['Files']['name'];
                $temporaryFileNames = $_FILES['Files']['tmp_name'];

                for ($x = 0; $x < count($temporaryFileNames); $x++) {

                    if (is_file($temporaryFileNames[$x])) {

                        // Build the complete name for the destination file
                        $fullName = $destination . $fileNames[$x];  // basename to avoid problematic paths
                        move_uploaded_file($temporaryFileNames[$x], $fullName);
        
                    }

                }

        }

        header("Location: /Aula-Virtual/public/view/commonViews/coursesTasks/coursesTask.html");
        exit;
        
    } else if($_SERVER['REQUEST_METHOD'] === 'POST') {

        // Get the JSON content from the request body
        $json = file_get_contents('php://input');
        // Decode the JSON into an associative array
        $object = json_decode($json, true);

        // Call the function to insert the object into the JSON file
        insertIntoJsonFile($object);
    } else 
        echo "Invalid request. Please send a JSON object through a POST request.\n";
?>
