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
            case 'documents':
                if ($delete) {
                    // Delete document if delete flag is true
                    $taskIndex = array_search($object['task_id'], array_column($data, 'task_id'));
                    if ($taskIndex !== false) {
                        $docIndex = array_search($object['document_id'], array_column($data[$taskIndex]['documents'], 'document_id'));
                        if ($docIndex !== false) {
                            // Remove the document
                            unset($data[$taskIndex]['documents'][$docIndex]);
                            // Reindex the documents array
                            $data[$taskIndex]['documents'] = array_values($data[$taskIndex]['documents']);
                        }
                    }
                } else {
                    // Add or update document
                    $taskIndex = array_search($object['task_id'], array_column($data, 'task_id'));
                    if ($taskIndex !== false) {
                        $docIndex = array_search($object['document_id'], array_column($data[$taskIndex]['documents'], 'document_id'));
                        if ($docIndex !== false) {
                            $data[$taskIndex]['documents'][$docIndex] = $object; // Update if document exists
                        } else {
                            $data[$taskIndex]['documents'][] = $object; // Add if document does not exist
                        }
                    } else {
                        $data[] = [
                            'task_id' => $object['task_id'],
                            'documents' => [$object]
                        ];
                    }
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
                    if ($userIndex !== false) {
                        $data[$userIndex] = $object; // Update if user exists
                    } else {
                        $data[] = $object; // Add if user does not exist
                    }
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
                    if ($courseIndex !== false) {
                        $data[$courseIndex] = $object; // Update if course exists
                    } else {
                        $data[] = $object; // Add if course does not exist
                    }
                }
                break;

            case 'coursesTask':
                if ($delete) {
                    // Delete task from course if delete flag is true
                    $courseIndex = array_search($object['course_id'], array_column($data, 'course_id'));
                    if ($courseIndex !== false) {
                        $taskIndex = array_search($object['tasks'][0]['task_id'], array_column($data[$courseIndex]['tasks'], 'task_id'));
                        if ($taskIndex !== false) {
                            // Remove the task
                            unset($data[$courseIndex]['tasks'][$taskIndex]);
                            // Reindex the tasks array
                            $data[$courseIndex]['tasks'] = array_values($data[$courseIndex]['tasks']);
                        }
                    }
                } else {
                    // Add or update task in course
                    $courseIndex = array_search($object['course_id'], array_column($data, 'course_id'));
                    if ($courseIndex !== false) {
                        $taskIndex = array_search($object['tasks'][0]['task_id'], array_column($data[$courseIndex]['tasks'], 'task_id'));
                        if ($taskIndex !== false) {
                            $data[$courseIndex]['tasks'][$taskIndex] = $object['tasks'][0]; // Update if task exists
                        } else {
                            $data[$courseIndex]['tasks'][] = $object['tasks'][0]; // Add if task does not exist
                        }
                    } else {
                        $data[] = $object;
                    }
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
