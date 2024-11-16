function loadTaskData(){

    $('#course_id').val(targetTask.getPartentCourseId());
    $('#task_id').val(targetTask.getTaskId());
    $('#name').val(targetTask.getName());
    $('#description').val(targetTask.getDescription());
    $('#upload_date').val(targetTask.getUploadDate());

}

function loadDocumentData(){

    console.log(documentList);  

    documentList.forEach(element => {
        let document_card = $('<div></div>');
        $(document_card).attr("id", "task_card");
        
        $("<p></p>").text("Id documento: "+element.getDocument_id()).appendTo(document_card);
        $("<p></p>").text("Id Tarea padre: "+element.getTask_id()).appendTo(document_card);
        $("<p></p>").text("Tipo documento: "+element.getType()).appendTo(document_card);
        $("<p></p>").text("Path del fichero: "+element.getFile_path()).appendTo(document_card);
        $("<p></p>").text("Status tarea: "+element.getStatus()).appendTo(document_card);
        
        $('#document_list').append(document_card);
    });

}

function removeElement(){

    alert("Tarea eleminada con exito");
    sendData(targetTask,true);

    documentList.forEach(element => {
        sendData(element,true);
    });

    window.location.href = "/public/view/admin/admin-hub/admin.html";

}

//Cambiar validaciones campos
function saveChanges() {
    
    event.preventDefault();

    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.]+$/, // Title
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.,!?]+$/, // Description
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, // Date
        /^[0-9]+$/, //Id Task
        /^[0-9]+$/ // Id Course
    ];

    console.log($('#upload_date').val())

    let averageName = verifyData($('#name').val(), expresions[0]);
    let averageDescription = verifyData($('#description').val(), expresions[1]);
    let averageDate = verifyData($('#upload_date').val(), expresions[2]);
    let averageCourseId = verifyData($('#course_id').val(), expresions[3]);
    let averageTaskId = verifyData($('#task_id').val(), expresions[3]);

    if (averageName && averageDescription && averageDate && averageCourseId && averageTaskId) {

        let modifiedTask  = "";
        event.preventDefault();

        if (state == "notNewObject") {

            const taskData = {
                "course_id": parseInt($('#course_id').val()),
                "task_id": parseInt($('#task_id').val()),
                "name": $('#name').val(),
                "description": $('#description').val(),
                "upload_date": $('#upload_date').val()
            };
            
            modifiedTask = new CoursesTask(taskData);
            
        }else{


            const taskData = {
                "course_id":parseInt($('#course_id').val()),
                "task_id": parseInt($('#task_id').val()),
                "name": $('#name').val(),
                "description": $('#description').val(),
                "upload_date": new Date()
            };
    
            modifiedTask = new CoursesTask(taskData);
            
        }

        console.log(modifiedTask)
        sendData(modifiedTask,false);

        window.location.href = "/public/view/admin/admin-hub/admin.html";

    }else{

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
