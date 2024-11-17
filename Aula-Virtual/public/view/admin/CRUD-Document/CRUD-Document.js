 /**
     * Function: loadDocumentData
     * Description:
     * Populates the form fields with data from the target document. It sets values such as document ID,
     * task ID, file path, document type, status, and the uploaded date.
     * 
     * Parameters: None
     * 
     * Functionality:
     * - Sets the form inputs (`document_id`, `task_id`, `type`, `file_path`, `status`, and `uploaded_at`) 
     *   with corresponding data from the `targetDocument` object.
     * - The `uploaded_at` field is formatted to a datetime-local input format using the `formatDateToDatetimeLocal` function.
     */
function loadDocumentData(){

    // Populate form fields with data from targetDocument
    $('#document_id').val(targetDocument.getDocument_id());
    $('#task_id').val(targetDocument.getTask_id());
    $('#type').val(targetDocument.getType());
    $('#file_path').val(targetDocument.getFile_path());
    $('#status').val(targetDocument.getStatus());
    
    // Format the uploaded date for the datetime-local field
    const uploadedAt = targetDocument.getUploaded_at(); 
    $('#uploaded_at').val(formatDateToDatetimeLocal(uploadedAt));

}

/**
     * Function: formatDateToDatetimeLocal
     * Description:
     * Converts a date string into a datetime-local format string (e.g., 'YYYY-MM-DDTHH:MM').
     * 
     * Parameters:
     * - date: The input date in string format to be converted.
     * 
     * Functionality:
     * - Creates a Date object from the input date string.
     * - Extracts and formats the components (year, month, day, hours, and minutes) for a local datetime input.
     * - Returns the formatted date string in the form 'YYYY-MM-DDTHH:MM'.
    */
function formatDateToDatetimeLocal(date) {
    const d = new Date(date); // Convert the input date to a Date object
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure the month is in 'MM' format
    const day = String(d.getDate()).padStart(2, '0'); // Ensure the day is in 'DD' format
    const hours = String(d.getHours()).padStart(2, '0'); // Ensure hours are in 'HH' format
    const minutes = String(d.getMinutes()).padStart(2, '0'); // Ensure minutes are in 'MM' format
    return `${year}-${month}-${day}T${hours}:${minutes}`; // Return formatted string
}

/**
     * Function: removeElement
     * Description:
     * Deletes the target document and displays a confirmation alert. After deletion, redirects to the admin hub.
     * 
     * Parameters: None
     * 
     * Functionality:
     * - Displays an alert indicating the document has been deleted successfully.
     * - Calls the `sendData` function to send the deletion request to the server.
     * - Redirects the user to the admin hub page after deletion.
     */
function removeElement(){

    // Show success message
    alert("Documento eliminado con exito");

    // Send request to delete the document
    sendData(targetDocument,true);

    // Redirect to admin hub
    window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

}

/**
     * Function: saveChanges
     * Description:
     * Handles saving changes to a document. Validates the input fields and sends the modified document data
     * to the server if the data is valid. If invalid data is found, it displays errors on the form.
     * 
     * Parameters: None
     * 
     * Functionality:
     * - Prevents default form submission.
     * - Validates the input fields using regex patterns.
     * - If the data is valid, creates a new `Document` object and sends it to the server using `sendData`.
     * - If invalid data is found, highlights the erroneous fields and displays an error message.
     */
function saveChanges() {
    
    event.preventDefault(); // Prevent default form submission

    // Regular expressions to validate the input fields
    let expressions = [
        /^[0-9]+$/, //  DocumentId
        /^\/(?:[^\/]+\/)*[^\/]+\.[a-zA-Z0-9]+$/, // FilePath
        /^(done|pending)$/, // State string
        /^[0-9]+$/, // Parent Task Id
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, // Type  of document
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]$/ // Date format ISO 8601 (yyyy-MM-ddTHH:mm)
    ];

    // Verify data against the patterns
    let averageDocumentId = verifyData($('#document_id').val(), expressions[0]);
    let averageFilePath = verifyData($('#file_path').val(), expressions[1]);
    let averageStatus = verifyData($('#status').val(), expressions[2]);
    let averageTaskId = verifyData($('#task_id').val(), expressions[3]);
    let averageType = verifyData($('#type').val(), expressions[4]);
    let averageUploadedAt = verifyData($('#uploaded_at').val(), expressions[5]);

    // If all fields are valid, create a modified document and save it
    if (averageDocumentId && averageFilePath && averageStatus && averageTaskId && averageType && averageUploadedAt) {

        let modifiedDocument  = "";

        // If the document is not new, modify the existing document
        if (state == "notNewObject") {

            const documentData = {
                "document_id": parseInt($('#document_id').val()),
                "task_id": parseInt($('#task_id').val()),
                "file_path": $('#file_path').val(),
                "type": $('#type').val(),
                "uploaded_at": $('#uploaded_at').val(),
                "status": $('#status').val()
            };
            
            modifiedDocument = new Document(documentData);
            
        }else{

            // If it's a new document, set the current date as uploaded_at
            const documentData = {
                "document_id": parseInt($('#document_id').val()),
                "task_id": parseInt($('#task_id').val()),
                "file_path": $('#file_path').val(),
                "type": $('#type').val(),
                "uploaded_at": new Date(),
                "status": $('#status').val()
            };
    
            modifiedDocument = new Document(documentData);
            
        }

        // Send the modified document to the server
        sendData(modifiedDocument,false);

        // Redirect after saving
        window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

    }else{

        // Display error messages and highlight invalid fields
        $('#mensageError').css('display', 'initial');

        if (!averageDocumentId) {
            $('#document_id').addClass('error');
        }
        
        if (!averageTaskId) {
            $('#task_id').addClass('error');
        }
        
        if (!averageType) {
            $('#type').addClass('error');
        }
        
        if (!averageFilePath) {
            $('#file_path').addClass('error');
        }        

        if(!averageStatus){
            $('#status').addClass('error');
        }

        if(!averageUploadedAt){
            $('#uploaded_at').addClass('error');
        }

    }
    
}

/**
     * Function: verifyData
     * Description:
     * Validates an input value against a provided regular expression pattern.
     * 
     * Parameters:
     * - element: The value to be validated.
     * - pattern: The regex pattern to validate the value against.
     * 
     * Functionality:
     * - Tests the value against the pattern and returns true if it matches.
     * - Logs the result to the console and returns a boolean value indicating validity.
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
