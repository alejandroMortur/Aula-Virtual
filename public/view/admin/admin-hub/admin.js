
function clickCardUser(event) {

    const id = $(event.currentTarget).children('p').eq(1).text();

    usersList.forEach(element => {
            
        if(element.getDNI() == id){
    
            console.log(element)
            sessionStorage.setItem("targetUser", JSON.stringify(element));

            window.location.href = "/public/view/admin/CRUD-Users/CRUD-Users.html";
    
        }
    
    });

}

function clickCardCourses(event) {

    let id = $(event.currentTarget).children('p').eq(1).text();
    id = id[4];

    coursesList.forEach(element => {
            
        console.log(id)
        console.log(element.getId())

        if(element.getId() == id){
    
            console.log("aqui estoy")
            sessionStorage.setItem("targetCourse", JSON.stringify(element));
            window.location.href = "/public/view/admin/CRUD-Courses/CRUD-Courses.html";
    
        }
    
    });

}

function clickCardTask(event) {


}

function allUsersCardBuilder(usersList){

    $('#user_list').innerHTML = "";

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

    $('#courses_list').innerHTML = "";

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

    $('#task_list').innerHTML = "";

    for(let x = 0; x < taskList.length; ++x){

        let task = document.createElement('div');
        $(task).attr("id","user_card");

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