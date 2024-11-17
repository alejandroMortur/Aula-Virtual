/**
 * Function: loadTaskData
 * Description:
 * Populates the form fields with the data of the target task.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Retrieves task data from the `targetTask` object.
 * - Sets the respective form fields (`course_id`, `task_id`, `name`, `description`, `upload_date`) with the task's properties.
 */
function loadTaskData(){

    // Populate form fields with data from targetDocument
    $('#course_id').val(targetTask.getPartentCourseId());
    $('#task_id').val(targetTask.getTaskId());
    $('#name').val(targetTask.getName());
    $('#description').val(targetTask.getDescription());
    $('#upload_date').val(targetTask.getUploadDate());

}

/**
 * Function: loadDocumentData
 * Description:
 * Populates the document list section with document details.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Iterates through the `documentList` array.
 * - Dynamically creates and appends document cards to the `#document_list` container.
 * - Each card contains information like document ID, task ID, document type, file path, and task status.
 */
function loadDocumentData(){

    // Loop through the documentList array
    documentList.forEach(element => {

        // Create a new div element for the document card
        let document_card = $('<div></div>');

        // Set the id attribute of the document card to "task_card"
        $(document_card).attr("id", "task_card");
        
        // Create and append paragraphs to the document card with relevant document information
        $("<p></p>").text("Id documento: "+element.getDocument_id()).appendTo(document_card);
        $("<p></p>").text("Id Tarea padre: "+element.getTask_id()).appendTo(document_card);
        $("<p></p>").text("Tipo documento: "+element.getType()).appendTo(document_card);
        $("<p></p>").text("Path del fichero: "+element.getFile_path()).appendTo(document_card);
        $("<p></p>").text("Status tarea: "+element.getStatus()).appendTo(document_card);
        
        // Append the document card to the document list container
        $('#document_list').append(document_card);
    });

}

/**
 * Function: removeElement
 * Description:
 * Removes the task and its associated documents, then redirects to the admin hub page.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Displays an alert confirming the successful removal of the task.
 * - Sends removal requests for the `targetTask` and all documents in the `documentList`.
 * - Redirects the user to the admin hub page.
 */
function removeElement(){

    // Show an alert to inform the user that the task has been successfully removed
    alert("Tarea eliminada con exito");

    // Send data indicating that the task should be removed (true indicates removal)
    sendData(targetTask,true);

    // Loop through each document in the documentList and send data indicating removal
    documentList.forEach(element => {
        sendData(element,true);
    });

    // Redirect the user to the admin hub page
    window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

}

/**
 * Function: saveChanges
 * Description:
 * Validates and saves changes made to the task form, either updating an existing task or creating a new one.
 * 
 * Parameters:
 * - event: The event object that triggers the function (usually from a form submission).
 * 
 * Functionality:
 * - Prevents the default form submission.
 * - Validates the input fields using predefined regular expressions.
 * - If valid, creates a new `CoursesTask` object and sends the data for saving.
 * - Redirects to the admin hub page after successful saving.
 * - If validation fails, highlights invalid fields and displays an error message.
 */
function saveChanges() {
    
    event.preventDefault(); // Prevent default form submission

    // Define regular expressions to validate the input fields
    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.]+$/, // Title
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.,!?]+$/, // Description
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, // Date
        /^[0-9]+$/, //Id Task
        /^[0-9]+$/ // Id Course
    ];

    // Validate each form field using the respective regular expression
    let averageName = verifyData($('#name').val(), expresions[0]);
    let averageDescription = verifyData($('#description').val(), expresions[1]);
    let averageDate = verifyData($('#upload_date').val(), expresions[2]);
    let averageCourseId = verifyData($('#course_id').val(), expresions[3]);
    let averageTaskId = verifyData($('#task_id').val(), expresions[3]);

    // If all fields are valid, proceed with saving the task
    if (averageName && averageDescription && averageDate && averageCourseId && averageTaskId) {

        let modifiedTask  = "";

        // Check if the task is an existing one (not a new object)
        if (state == "notNewObject") {

            // Create a new task object with the form data
            const taskData = {
                "course_id": parseInt($('#course_id').val()),
                "task_id": parseInt($('#task_id').val()),
                "name": $('#name').val(),
                "description": $('#description').val(),
                "upload_date": $('#upload_date').val()
            };
            
            // Create a new CoursesTask instance with the task data
            modifiedTask = new CoursesTask(taskData);
            
        }else{

            // If it's a new task, create a task object with the current date for the upload date
            const taskData = {
                "course_id":parseInt($('#course_id').val()),
                "task_id": parseInt($('#task_id').val()),
                "name": $('#name').val(),
                "description": $('#description').val(),
                "upload_date": new Date()
            };
    
            // Create a new CoursesTask instance with the task data
            modifiedTask = new CoursesTask(taskData);
            
        }

        // Send the modified task data for saving (false indicates this is not a removal)
        sendData(modifiedTask,false);

        // Redirect the user to the admin hub page after saving the task
        window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

    }else{

        // Highlight the invalid fields by adding the 'error' class to them
        $('#mensageError').css('display', 'initial');

        if (!averageName) {
            $('#name').addClass('error');
        }
        
        if (!averageDescription) {
            $('#description').addClass('error');
        }
        
        if (!averageDate) {
            $('#upload_date').addClass('error');
        }
        
        if (!averageCourseId) {
            $('#course_id').addClass('error');
        }        

        if(!averageTaskId){
            $('#task_id').addClass('error');
        }

    }
    
}

/**
 * Function: verifyData
 * Description:
 * Checks if a given element's value matches the provided regular expression pattern.
 * 
 * Parameters:
 * - element: The string to be validated.
 * - pattern: The regular expression pattern that the element should match.
 * 
 * Functionality:
 * - Tests the element against the provided pattern.
 * - Logs whether the data follows the pattern or not and returns a boolean indicating the result.
 * 
 * Returns:
 * - true if the element matches the pattern.
 * - false if the element does not match the pattern.
 */
function verifyData(element,pattern) {

    // Checks if the "data" string follows the pattern
    if (pattern.test(element)) {
        console.log("The data follows the pattern.");
        return true;
    } else {
        console.log("The data does not follow the pattern.");
        return false;
    }
}
