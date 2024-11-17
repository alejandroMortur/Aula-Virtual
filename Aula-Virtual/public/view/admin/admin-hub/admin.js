// Event handler when a user card is clicked
function clickCardUser(event) {

    // Get the user's DNI from the second <p> tag inside the clicked card
    const id = $(event.currentTarget).children('p').eq(1).text();

    // Search for the user in the usersList and store the matching user in sessionStorage
    usersList.forEach(element => {
            
        if(element.getDNI() == id){
    
            sessionStorage.setItem("targetUser", JSON.stringify(element)); // Store the user object
            sessionStorage.setItem("state", "notNewObject"); // Set state to not new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Users/CRUD-Users.html"; // Navigate to the user CRUD page
        
        }
    
    });

}

// Event handler when a course card is clicked
function clickCardCourses(event) {

    let id = $(event.currentTarget).children('p').eq(1).text();
    id = id[4]; // Extract the ID (seems like it takes the 5th character)

    // Search for the course in the coursesList and store the matching course in sessionStorage
    coursesList.forEach(element => {
            
        if(element.getId() == id){
    
            sessionStorage.setItem("targetCourse", JSON.stringify(element)); // Store the course object
            sessionStorage.setItem("state", "notNewObject"); // Set state to not new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Courses/CRUD-Courses.html"; // Navigate to the course CRUD page
    
        }
    
    });

}

// Event handler when a task card is clicked
function clickCardTask(event) {

    let id = $(event.currentTarget).children('p').eq(3).text();
    
    // Search for the task in taskList and store the matching task in sessionStorage
    taskList.forEach(element => {
            
        if(element.getTaskId() == id[10]){  // Extract specific character from ID for comparison
    
            sessionStorage.setItem("targetTask", JSON.stringify(element)); // Store the task object
            sessionStorage.setItem("state", "notNewObject"); // Set state to not new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Task/CRUD-task.html"; // Navigate to the task CRUD page
    
        }
    
    });

}

// Event handler when a document card is clicked
function clickCardDocument(event) {

    let id = $(event.currentTarget).children('p').eq(0).text();
    let idTask = $(event.currentTarget).children('p').eq(3).text();

    // Search for the document in documentList and store the matching document in sessionStorage
    documentList.forEach(element => {
            
        if(element.getDocument_id() == id[14] && element.getTask_id() == idTask[10]){
    
            console.log(element); // Log the document for debugging
            sessionStorage.setItem("targetDocument", JSON.stringify(element)); // Store the document object
            sessionStorage.setItem("state", "notNewObject"); // Set state to not new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Document/CRUD-Document.html"; // Navigate to the document CRUD page
    
        }
    
    });

}

// Event handler for creating new elements (User, Course, Task, Document)
function clickNewElement(event) {

    const id = $(event.currentTarget).attr('id'); // Get the id of the clicked element

    // Switch statement to navigate to the appropriate CRUD page for creating a new element
    switch(id){

        case "newUser":
            sessionStorage.setItem("state", "newObject"); // Set state to new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Users/CRUD-Users.html";
            break;
        case "newCourse":
            sessionStorage.setItem("state", "newObject"); // Set state to new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Courses/CRUD-Courses.html";
            break;
        case "newTask":
            sessionStorage.setItem("state", "newObject"); // Set state to new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Task/CRUD-task.html";
            break;
        case "newDocument":
            sessionStorage.setItem("state", "newObject"); // Set state to new
            window.location.href = "/Aula-Virtual/public/view/admin/CRUD-Document/CRUD-Document.html";
            break;

    }

}

// Builds the user cards dynamically and adds event listeners
function allUsersCardBuilder(usersList){

    $('#user_list').empty(); // Clear existing user cards

    // Iterate through the usersList and create a card for each user
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

        $(user).on("click",clickCardUser); // Add event listener for click
        $(user).append(userImg,userFullNameP,userDni);
        $('#user_list').append(user); // Append the user card to the user list

    }

}

// Builds the course cards dynamically and adds event listeners
function allCoursesCardBuilder(coursesList){

    $('#courses_list').empty(); // Clear existing course cards

    // Iterate through the coursesList and create a card for each course
    for(let x = 0; x < coursesList.length; ++x){

        let courses = document.createElement('div');
        $(courses).attr("id","course_card");

        let coursesTitleP = document.createElement('p');
        coursesTitleP.innerHTML = coursesList[x].getTitle();

        let coursesImg = document.createElement('img');
        $(coursesImg).attr("src",coursesList[x].getImage());

        let coursesIdP = document.createElement('p');
        coursesIdP.innerHTML ="Id: "+coursesList[x].getId();

        $(courses).on("click",clickCardCourses); // Add event listener for click
        $(courses).append(coursesImg,coursesTitleP,coursesIdP);
        $('#courses_list').append(courses); // Append the course card to the course list

    }

}

// Builds the task cards dynamically and adds event listeners
function allTaskCardBuilder(taskList){

    $('#task_list').empty(); // Clear existing task cards

    // Iterate through the taskList and create a card for each task
    for(let x = 0; x < taskList.length; ++x){

        let task = document.createElement('div');
        $(task).attr("id","task_card");

        let taskNameP = document.createElement('p');
        taskNameP.innerHTML = "Nombre: "+taskList[x].getName();

        let taskDescriptionP = document.createElement('p');
        taskDescriptionP.innerHTML = "Descripcion: "+taskList[x].getDescription();

        let taskIdP = document.createElement('p');
        taskIdP.innerHTML = "Id tarea: "+taskList[x].getTaskId();

        let courseTaskIdP = document.createElement('p');
        courseTaskIdP.innerHTML = "Id curso: "+taskList[x].getPartentCourseId();

        $(task).on("click",clickCardTask); // Add event listener for click
        $(task).append(taskNameP,taskDescriptionP,taskIdP,courseTaskIdP);
        $('#task_list').append(task); // Append the task card to the task list

    }

}

// Builds the document cards dynamically and adds event listeners
function allDocumentCardBuilder(documentList){

    $('#document_list').empty(); // Clear existing document cards

    // Iterate through the documentList and create a card for each document
    for(let x = 0; x < documentList.length; ++x){

        let documentLoaded = document.createElement('div');
        $(documentLoaded).attr("id","document_card");

        let documentIdP = document.createElement('p');
        documentIdP.innerHTML = "Id documento: "+documentList[x].getDocument_id();

        let documentPathP = document.createElement('p');
        documentPathP.innerHTML = "File Path: "+documentList[x].getFile_path();

        let documentStatusP = document.createElement('p');
        documentStatusP.innerHTML = "Status: "+documentList[x].getStatus();

        let documentParentIdP = document.createElement('p');
        documentParentIdP.innerHTML = "Id tarea: "+documentList[x].getTask_id();

        let documentTypeP = document.createElement('p');
        documentTypeP .innerHTML = "Tipo Documento: "+documentList[x].getType();

        $(documentLoaded).on("click",clickCardDocument); // Add event listener for click
        $(documentLoaded).append(documentIdP,documentPathP,documentStatusP,documentParentIdP,documentTypeP);
        $('#document_list').append(documentLoaded); // Append the document card to the document list

    }

}

// Function to create event listeners for filter inputs
function filterEventCreator(){

    // Event listener for the "course-title" input field
    // When the user types in the "course-title" field, it triggers the filterCourses function
    $("#course-title").on("input", filterCourses);

    // Event listeners for the "user-username", "user-name", and "user-surname" input fields
    // When the user types in any of these fields, it triggers the filterUsers function
    $("#user-username").on("input", filterUsers);
    $("#user-name").on("input", filterUsers);
    $("#user-surname").on("input", filterUsers);

    // Event listener for the "task-name" input field
    // When the user types in the "task-name" field, it triggers the filterCoursesTasks function
    $("#task-name").on("input", filterCoursesTasks);

    // Event listener for the "document-type" select dropdown
    // When the user changes the value in the "document-type" dropdown, it triggers the filterDocuments function
    $("#document-type").on("change", filterDocuments);

    // Event listener for the "document-task" input field
    // When the user types in the "document-task" field, it triggers the filterDocuments function
    $("#document-task").on("input", filterDocuments);

}