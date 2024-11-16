function clickCardUser(event) {

    const id = $(event.currentTarget).children('p').eq(1).text();

    usersList.forEach(element => {
            
        if(element.getDNI() == id){
    
            sessionStorage.setItem("targetUser", JSON.stringify(element));
            sessionStorage.setItem("state", "notNewObject");
            window.location.href = "/public/view/admin/CRUD-Users/CRUD-Users.html";
    
        }
    
    });

}

function clickCardCourses(event) {

    let id = $(event.currentTarget).children('p').eq(1).text();
    id = id[4];

    coursesList.forEach(element => {
            
        if(element.getId() == id){
    
            sessionStorage.setItem("targetCourse", JSON.stringify(element));
            sessionStorage.setItem("state", "notNewObject");
            window.location.href = "/public/view/admin/CRUD-Courses/CRUD-Courses.html";
    
        }
    
    });

}

function clickCardTask(event) {

    let id = $(event.currentTarget).children('p').eq(3).text();
    
    taskList.forEach(element => {
            
        if(element.getTaskId() == id[10]){
    
            sessionStorage.setItem("targetTask", JSON.stringify(element));
            sessionStorage.setItem("state", "notNewObject");
            window.location.href = "/public/view/admin/CRUD-Task/CRUD-task.html";
    
        }
    
    });

}

function clickCardDocument(event) {

    let id = $(event.currentTarget).children('p').eq(0).text();
    let idTask = $(event.currentTarget).children('p').eq(3).text();

    documentList.forEach(element => {
            
        if(element.getDocument_id() == id[14] && element.getTask_id() == idTask[10]){
    
            console.log(element)
            sessionStorage.setItem("targetDocument", JSON.stringify(element));
            sessionStorage.setItem("state", "notNewObject");
            window.location.href = "/public/view/admin/CRUD-Document/CRUD-Document.html";
    
        }
    
    });

}

function clickNewElement(event) {

    const id = $(event.currentTarget).attr('id');

    switch(id){

        case "newUser":
            sessionStorage.setItem("state", "newObject");
            window.location.href = "/public/view/admin/CRUD-Users/CRUD-Users.html";
            break;
        case "newCourse":
            sessionStorage.setItem("state", "newObject");
            window.location.href = "/public/view/admin/CRUD-Courses/CRUD-Courses.html";
            break;
        case "newTask":
            sessionStorage.setItem("state", "newObject");
            window.location.href = "/public/view/admin/CRUD-Task/CRUD-task.html";
            break;
        case "newDocument":
            sessionStorage.setItem("state", "newObject");
            window.location.href = "/public/view/admin/CRUD-Document/CRUD-Document.html";
            break;

    }

}

function allUsersCardBuilder(usersList){

    $('#user_list').empty();

    for(let x = 0; x < usersList.length; ++x){

        let userFullName = usersList[x].getName() + " " + usersList[x].getSureName();

        let user = document.createElement('div');
        $(user).attr("id","user_card");

        let userImg = document.createElement('img');
        $(userImg).attr("src",usersList[x].getImage());

        let userFullNameP = document.createElement('p');
        userFullNameP.innerHTML = userFullName

        let userDni = document.createElement('p');
        userDni.innerHTML = usersList[x].getDNI();

        $(user).on("click",clickCardUser)
        $(user).append(userImg,userFullNameP,userDni);
        $('#user_list').append(user);

    }

}

function allCoursesCardBuilder(coursesList){

    $('#courses_list').empty();

    for(let x = 0; x < coursesList.length; ++x){

        let courses = document.createElement('div');
        $(courses).attr("id","course_card");

        let coursesTitle = document.createElement('p');
        coursesTitle.innerHTML = coursesList[x].getTitle();

        let coursesImg = document.createElement('img');
        $(coursesImg).attr("src",coursesList[x].getImage());

        let coursesId = document.createElement('p');
        coursesId.innerHTML ="Id: "+coursesList[x].getId();

        $(courses).on("click",clickCardCourses)
        $(courses).append(coursesImg,coursesTitle,coursesId);
        $('#courses_list').append(courses);

    }

}

function allTaskCardBuilder(taskList){

    $('#task_list').empty();

    for(let x = 0; x < taskList.length; ++x){

        let task = document.createElement('div');
        $(task).attr("id","task_card");

        let taskName = document.createElement('p');
        taskName.innerHTML = "Nombre: "+taskList[x].getName();

        let taskDescription = document.createElement('p');
        taskDescription.innerHTML = "Descripcion: "+taskList[x].getDescription();

        let taskId = document.createElement('p');
        taskId.innerHTML = "Id tarea: "+taskList[x].getTaskId();

        let courseTaskId = document.createElement('p');
        courseTaskId.innerHTML = "Id curso: "+taskList[x].getPartentCourseId();

        $(task).on("click",clickCardTask)
        $(task).append(taskName,taskDescription,taskId,courseTaskId);
        $('#task_list').append(task);

    }

}

function allDocumentCardBuilder(documentList){

    $('#document_list').empty();

    for(let x = 0; x < documentList.length; ++x){

        let documentLoaded = document.createElement('div');
        $(documentLoaded).attr("id","document_card");

        let documentId = document.createElement('p');
        documentId.innerHTML = "Id documento: "+documentList[x].getDocument_id();

        let documentPath = document.createElement('p');
        documentPath.innerHTML = "File Path: "+documentList[x].getFile_path();

        let documentStatus = document.createElement('p');
        documentStatus.innerHTML = "Status: "+documentList[x].getStatus();

        let documentParentId = document.createElement('p');
        documentParentId.innerHTML = "Id tarea: "+documentList[x].getTask_id();

        let documentType = document.createElement('p');
        documentType .innerHTML = "Tipo Documento: "+documentList[x].getType();

        $(documentLoaded).on("click",clickCardDocument)
        $(documentLoaded).append(documentId,documentPath,documentStatus,documentParentId,documentType);
        $('#document_list').append(documentLoaded);

    }

}

function filterEventCreator(){

    $("#course-title").on("input", filterCourses);
    $("#user-username").on("input", filterUsers);
    $("#user-name").on("input", filterUsers);
    $("#user-surname").on("input", filterUsers);
    $("#task-name").on("input", filterCoursesTasks);
    $("#document-type").on("change", filterDocuments);
    $("#document-task").on("input", filterDocuments);

}