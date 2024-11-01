<?php
    function insertIntoJsonFile($object) {
        // If it's an array of multiple objects, we iterate over each one.
        if (is_array($object) && isset($object[0]) && is_array($object[0])) {
            foreach ($object as $singleObject) {
                insertIntoJsonFile($singleObject); // Recursive call for each object
            }
            return;
        }

        // Define the names of the JSON files.
        $files = [
            'users' => '../public/assets/json/users.json',
            'courses' => '../public/assets/json/courses.json',
            'coursesTask' => '../public/assets/json/coursesTask.json',
            'documents' => '../public/assets/json/documents.json'
        ];

        // Determine the type of object.
        $type = isset($object['UserName']) ? 'users' :
                (isset($object['title']) ? 'courses' :
                (isset($object['course_id']) ? 'coursesTask' :
                (isset($object['task_id']) ? 'documents' : null)));

        if ($type && array_key_exists($type, $files)) {
            // Load the corresponding JSON file.
            $filePath = $files[$type];
            $data = json_decode(file_get_contents($filePath), true);

            switch($type){

                case 'documents':

                    // Find the index of the task.
                    $taskIndex = array_search($object['task_id'], array_column($data, 'task_id'));

                    if ($taskIndex !== false) {
                        // Search for the document within the task.
                        $docIndex = array_search($object['document_id'], array_column($data[$taskIndex]['documents'], 'document_id'));

                        if ($docIndex !== false) $data[$taskIndex]['documents'][$docIndex] = $object; // If the document already exists, update it.
                        else $data[$taskIndex]['documents'][] = $object; // If the document does not exist, add it to the task.
                        
                    } else  // If the task does not exist, create the task and add the document.
                        $data[] = [
                            'task_id' => $object['task_id'],
                            'documents' => [$object]
                        ];

                    break;

                    case 'users':
                        // Handling for users
                        $userIndex = array_search($object['UserName'], array_column($data, 'UserName'));
                        if ($userIndex !== false) $data[$userIndex] = $object;// If the user already exists, update it
                        else $data[] = $object;// If the user does not exist, add it

                        break;

                case 'courses':

                    $taskIndex = array_search($object['task_id'], array_column($data, 'task_id'));

                    if ($taskIndex !== false) {
                        // Search for the document within the task.
                        $docIndex = array_search($object['document_id'], array_column($data[$taskIndex]['documents'], 'document_id'));
    
                        if ($docIndex !== false) $data[$taskIndex]['documents'][$docIndex] = $object; // If the document already exists, update it.
                        else $data[$taskIndex]['documents'][] = $object; // If the document does not exist, add it to the task.
                        
                    } else // If the task does not exist, create the task and add the document.
                        $data[] = [
                            'task_id' => $object['task_id'],
                            'documents' => [$object]
                        ];

                    break;

                case 'coursesTask':

                    // Specific handling for coursesTask.
                    $courseIndex = array_search($object['course_id'], array_column($data, 'course_id'));

                    if ($courseIndex !== false) {
                        // If the course exists, search for the task.
                        $taskIndex = array_search($object['tasks'][0]['task_id'], array_column($data[$courseIndex]['tasks'], 'task_id'));

                        if ($taskIndex !== false) $data[$courseIndex]['tasks'][$taskIndex] = $object['tasks'][0]; // If the task already exists, update it.
                        else $data[$courseIndex]['tasks'][] = $object['tasks'][0]; // If the task does not exist, add it to the course.
        
                    } else // If the course does not exist, add it along with the task.
                        $data[] = $object;

                    break;

            }

            // Save the JSON file.
            file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
            echo "Registro añadido o actualizado correctamente en $type.\n";

        } else echo "Tipo de objeto no reconocido. Estructura del objeto:\n";

    }

?>