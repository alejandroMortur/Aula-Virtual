/**
 * Function: loadCourseData
 * Description:
 * Loads the data of the target course into the respective fields in the UI. This includes loading the course
 * image, title, description, completion percentage, and ID into the designated input fields.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Fetches the course image, title, description, percentage of work done, and ID from the `targetCourse` object.
 * - Sets the attributes of the HTML elements (`#course_Img`, `#title`, `#description`, `#porcent`, `#id`) 
 *   to reflect the current values of the `targetCourse` object.
 */
function loadCourseData(){

    // Set the course image source to the target course image
    $('#course_Img').attr("src",targetCourse.getImage());

    // Populate the input fields with the course title, description, percentage, and ID
    $('#title').val(targetCourse.getTitle());
    $('#description').val(targetCourse.getDescription());
    $('#porcent').val(targetCourse.getPorcent());
    $('#id').val(targetCourse.getId());

}

/**
 * Function: loadTaskData
 * Description:
 * Loops through a list of tasks and dynamically creates and appends task cards to the UI. 
 * Each task card contains details like the task name, description, ID, upload date, and associated course ID.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Iterates over the `taskList` array, creating a new `div` element (`task_card`) for each task.
 * - Appends individual `p` elements for each task's name, description, task ID, upload date, and course ID.
 * - Appends the created task card (`task_card`) to the `#task_list` container on the page.
 */
function loadTaskData(){

    // Loop through each task in the taskList array
    taskList.forEach(element => {
        let task_card = $('<div></div>');
        $(task_card).attr("id", "task_card");
        
        // Add the task's name, description, task ID, upload date, and associated course ID to the task card
        $("<p></p>").text(element.getName()).appendTo(task_card);
        $("<p></p>").text(element.getDescription()).appendTo(task_card);
        $("<p></p>").text(element.getTaskId()).appendTo(task_card);
        $("<p></p>").text(element.getUploadDate()).appendTo(task_card);
        $("<p></p>").text(element.getPartentCourseId()).appendTo(task_card);
        
        // Append the task card to the task list on the page
        $('#task_list').append(task_card);  
    });

}

/**
 * Function: saveChanges
 * Description:
 * Validates the input data from the course form and, if valid, sends the updated course data to the server. 
 * Depending on the state, it either updates an existing course or creates a new one. 
 * If the data is invalid, it highlights the corresponding fields with an error message.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Validates the title, description, percentage, and ID inputs using regular expressions.
 * - If all fields are valid, creates a `Course` object and sends the updated data to the server.
 * - If any field is invalid, displays an error message and highlights the invalid fields.
 * - Redirects to the admin hub page after successfully saving the changes.
 */
function saveChanges() {
    
    event.preventDefault(); //Prevent Form load data

    // Define regular expressions for validating the input fields
    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.]+$/, // Title
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.,!?]+$/, // Description
        /^(100|[1-9]?[0-9])$/, // Porcent
        /^[0-9]+$/ // Id
    ];

    // Verify if each input field matches the respective regular expression
    let averageTitle = verifyData($('#title').val(), expresions[0]);
    let averageDescription = verifyData($('#description').val(), expresions[1]);
    let averagePorcent = verifyData($('#porcent').val(), expresions[2]);
    let averageId = verifyData($('#id').val(), expresions[3]);

    // If the course is being modified (not a new object), prepare the modified course data
    if (averageTitle && averageDescription && averagePorcent && averageId) {

        let modifiedCourse = "";
        event.preventDefault();

        if (state == "notNewObject") {

            const coursesData = {
                "image": $('#course_Img').attr("src"), 
                "title": $('#title').val(),
                "description": $('#description').val(),
                "workDone": "% completado", 
                "porcent": parseInt($('#porcent').val()), 
                "id": parseInt($('#id').val()), 
                "type": "course"
            };
            
            modifiedCourse = new Course(coursesData);
            
        }else{

            // If this is a new course, use a default image for the course
            const coursesData = {
                "image": "/Aula-Virtual/public/assets/img/courses/default-header.jpg", 
                "title": $('#title').val(),
                "description": $('#description').val(),
                "workDone": "% completado", 
                "porcent": parseInt($('#porcent').val()), 
                "id": parseInt($('#id').val()), 
                "type": "course"
            };
    
            modifiedCourse = new Course(coursesData);
            
        }

        // Send the course data to the server and store it in sessionStorage
        sendData(modifiedCourse,false);
        sessionStorage.setItem("targetUser", JSON.stringify(modifiedCourse));

        // Redirect to the admin hub page
        window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

    }else{

        // Display error message and highlight invalid fields if validation fails
        $('#mensageError').css('display', 'initial');

        if (!averageTitle) {
            $('#title').addClass('error');
        }
        
        if (!averageDescription) {
            $('#description').addClass('error');
        }
        
        if (!averagePorcent) {
            $('#porcent').addClass('error');
        }
        
        if (!averageId) {
            $('#id').addClass('error');
        }        

    }
    
}

/**
 * Function: removeElement
 * Description:
 * Deletes the target course and all associated tasks from the server, then redirects the user to the admin hub page.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Alerts the user that the course was successfully deleted.
 * - Sends requests to the server to delete the `targetCourse` and all tasks in `taskList`.
 * - Redirects the user to the admin hub page upon completion.
 */
function removeElement(){

    // Alert the user that the course has been successfully deleted
    alert("Curso eliminado con exito");

    // Send delete request for the target course and all associated tasks
    sendData(targetCourse,true);
    taskList.forEach(element => {
        sendData(element,true);
    });

    // Redirect to the admin hub page
    window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

}

/**
 * Function: verifyData
 * Description:
 * Verifies if the provided data matches a specified regular expression pattern. Returns true if the data matches the pattern, otherwise false.
 * 
 * Parameters:
 * - element: The data to be validated (e.g., a string input).
 * - pattern: A regular expression to check if the `element` matches the expected format.
 * 
 * Functionality:
 * - Tests the provided data against the given regular expression pattern.
 * - Logs the result of the validation to the console.
 * - Returns `true` if the data matches the pattern, otherwise returns `false`.
 */
function verifyData(element,pattern) {

    // Test the data against the pattern and log the result
    if (pattern.test(element)) {
        console.log("The data follows the pattern.");
        return true;
    } else {
        console.log("The data does not follow the pattern.");
        return false;
    }
}
