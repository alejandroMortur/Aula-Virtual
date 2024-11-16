
function loadCourseData(){

    $('#course_Img').attr("src",targetCourse.getImage());
    $('#title').val(targetCourse.getTitle());
    $('#description').val(targetCourse.getDescription());
    $('#porcent').val(targetCourse.getPorcent());
    $('#id').val(targetCourse.getId());

}

function loadTaskData(){

    taskList.forEach(element => {
        let task_card = $('<div></div>');
        $(task_card).attr("id", "task_card");
        
        $("<p></p>").text(element.getName()).appendTo(task_card);
        $("<p></p>").text(element.getDescription()).appendTo(task_card);
        $("<p></p>").text(element.getTaskId()).appendTo(task_card);
        $("<p></p>").text(element.getUploadDate()).appendTo(task_card);
        $("<p></p>").text(element.getPartentCourseId()).appendTo(task_card);
        
        $('#task_list').append(task_card);  
    });

}

function saveChanges() {
    
    event.preventDefault();

    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.]+$/, // Title
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s.,!?]+$/, // Description
        /^(100|[1-9]?[0-9])$/, // Porcent
        /^[0-9]+$/ // Id
    ];

    let averageTitle = verifyData($('#title').val(), expresions[0]);
    let averageDescription = verifyData($('#description').val(), expresions[1]);
    let averagePorcent = verifyData($('#porcent').val(), expresions[2]);
    let averageId = verifyData($('#id').val(), expresions[3]);

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

            const coursesData = {
                "image": "/public/assets/img/courses/default-header.jpg", 
                "title": $('#title').val(),
                "description": $('#description').val(),
                "workDone": "% completado", 
                "porcent": parseInt($('#porcent').val()), 
                "id": parseInt($('#id').val()), 
                "type": "course"
            };
    
            modifiedCourse = new Course(coursesData);
            
        }

        console.log(modifiedCourse)
        sendData(modifiedCourse,false);

        sessionStorage.setItem("targetUser", JSON.stringify(modifiedCourse));
        window.location.href = "/public/view/admin/admin-hub/admin.html";

    }else{

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

function removeElement(){

    alert("Curso eliminado con exito");
    sendData(targetCourse,true);

    taskList.forEach(element => {
        sendData(element,true);
    });

    window.location.href = "/public/view/admin/admin-hub/admin.html";

}

function verifyData(element,pattern) {

    // Checks if the "date" string follows the pattern
    if (pattern.test(element)) {
        console.log("The data follows the pattern.");
        return true;
    } else {
        console.log("The data does not follow the pattern.");
        return false;
    }
}
