function loadDocumentData(){

    $('#document_id').val(targetDocument.getDocument_id());
    $('#task_id').val(targetDocument.getTask_id());
    $('#type').val(targetDocument.getType());
    $('#file_path').val(targetDocument.getFile_path());
    $('#status').val(targetDocument.getStatus());
    
    const uploadedAt = targetDocument.getUploaded_at(); 
    $('#uploaded_at').val(formatDateToDatetimeLocal(uploadedAt));

}

function formatDateToDatetimeLocal(date) {
    // Create a new Date object from the input date
    const d = new Date(date); // Ensure the input is a valid date

    // Extract the year, month, and day from the Date object
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month in two-digit format (01-12)
    const day = String(d.getDate()).padStart(2, '0'); // Day in two-digit format (01-31)

    // Extract the hours and minutes from the Date object
    const hours = String(d.getHours()).padStart(2, '0'); // Hours in two-digit format (00-23)
    const minutes = String(d.getMinutes()).padStart(2, '0'); // Minutes in two-digit format (00-59)

    // Format and return the date as 'YYYY-MM-DDTHH:MM'
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function removeElement(){

    alert("Documento eliminado con exito");
    sendData(targetDocument,true);

    window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

}

function saveChanges() {
    
    event.preventDefault();

    let expressions = [
        /^[0-9]+$/, //  DocumentId
        /^\/(?:[^\/]+\/)*[^\/]+\.[a-zA-Z0-9]+$/, // FilePath
        /^(done|pending)$/, // State string
        /^[0-9]+$/, // Parent Task Id
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, // Type  of document
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]$/ // Date format ISO 8601 (yyyy-MM-ddTHH:mm)
    ];

    let averageDocumentId = verifyData($('#document_id').val(), expressions[0]);
    let averageFilePath = verifyData($('#file_path').val(), expressions[1]);
    let averageStatus = verifyData($('#status').val(), expressions[2]);
    let averageTaskId = verifyData($('#task_id').val(), expressions[3]);
    let averageType = verifyData($('#type').val(), expressions[4]);
    let averageUploadedAt = verifyData($('#uploaded_at').val(), expressions[5]);

    if (averageDocumentId && averageFilePath && averageStatus && averageTaskId && averageType && averageUploadedAt) {

        let modifiedDocument  = "";
        event.preventDefault();

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

        sendData(modifiedDocument,false);
        window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

    }else{

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
