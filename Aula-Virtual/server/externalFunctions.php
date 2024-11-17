<?php
    function insertIntoJsonFile($object, $delete = false) {
        // If it's an array of multiple objects, we iterate over each one.
        if (is_array($object) && isset($object[0]) && is_array($object[0])) {
            foreach ($object as $singleObject) {
                insertIntoJsonFile($singleObject, $delete); // Recursive call for each object
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

        // Determine the type of the object based on its properties.
        $type = isset($object['UserName']) ? 'users' :
                (isset($object['title']) ? 'courses' :
                (isset($object['course_id']) ? 'coursesTask' :
                (isset($object['task_id']) ? 'documents' : null)));

        if ($type && array_key_exists($type, $files)) {
            // Load the corresponding JSON file.
            $filePath = $files[$type];
            $data = json_decode(file_get_contents($filePath), true);

            switch($type) {
                case 'coursesTask':
                    if ($delete) {
                        // Delete task if delete flag is true
                        $index = array_search($object['task_id'], array_column($data, 'task_id'));
                        if ($index !== false) {
                            unset($data[$index]);
                            $data = array_values($data); // Reindex the array
                        }
                    } else {
                        // Add or update task
                        $index = array_search($object['task_id'], array_column($data, 'task_id'));
                        if ($index !== false) $data[$index] = $object; // Update if task exists
                        else $data[] = $object; // Add if task does not exist
                        
                    }
                    break;

                case 'documents':
                    if ($delete) {
                        // Delete the document if the delete flag is set to true
                        $docIndex = array_search($object['document_id'], array_column($data, 'document_id'));
                        if ($docIndex !== false) {
                            unset($data[$docIndex]); // Remove the document
                            $data = array_values($data); // Reindex the array
                        }
                    } else {
                        // Add or update the document
                        $docIndex = array_search($object['document_id'], array_column($data, 'document_id'));
                        if ($docIndex !== false) $data[$docIndex] = $object; // Update the document if it already exists
                        else $data[] = $object; // Add the document if it doesn't exist
                            
                    }
                    break;                

                case 'users':
                    if ($delete) {
                        // Delete user if delete flag is true
                        $userIndex = array_search($object['UserName'], array_column($data, 'UserName'));
                        if ($userIndex !== false) {
                            // Remove the user
                            unset($data[$userIndex]);
                            // Reindex the users array
                            $data = array_values($data);
                        }
                    } else {
                        // Add or update user
                        $userIndex = array_search($object['UserName'], array_column($data, 'UserName'));
                        if ($userIndex !== false) $data[$userIndex] = $object; // Update if user exists
                        else $data[] = $object; // Add if user does not exist
                        
                    }
                    break;

                case 'courses':
                    if ($delete) {
                        // Delete course if delete flag is true
                        $courseIndex = array_search($object['id'], array_column($data, 'id'));
                        if ($courseIndex !== false) {
                            // Remove the course
                            unset($data[$courseIndex]);
                            // Reindex the array to remove numeric keys
                            $data = array_values($data);
                        }
                    } else {
                        // Add or update course
                        $courseIndex = array_search($object['id'], array_column($data, 'id'));
                        if ($courseIndex !== false) $data[$courseIndex] = $object; // Update if course exists
                        else $data[] = $object; // Add if course does not exist
                        
                    }
                    break;
            }

            // Save the updated JSON file
            file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
            echo "Record " . ($delete ? "deleted" : "added or updated") . " successfully in $type.\n";
        } else {
            echo "Unrecognized object type. Object structure:\n";
        }
    }

    // Retrieve data sent by POST (use this when sending JSON data)
    $data = json_decode(file_get_contents('php://input'), true);

    // Ensure that 'object' and 'delete' are present
    $objeto = isset($data['objeto']) ? $data['objeto'] : null;
    $delete = isset($data['delete']) ? $data['delete'] : false;

    // Call the function with the object and delete flag
    insertIntoJsonFile($objeto, $delete);
?>
