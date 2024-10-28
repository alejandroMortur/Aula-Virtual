let userCoursesTaskList = []

function printTask(currentCourse){

    let taskContainer = document.getElementById('taskContainer');
    let tasks = currentCourse.getTask();

    tasks.forEach(element => {
        
        let taskCard = document.createElement('div');
        taskCard.className = "taskCard";
        taskCard.id = element["task_id"];
        taskCard.addEventListener("click",clickCard)
        taskContainer.appendChild(taskCard);

        let taskImage = document.createElement('img')
        taskImage.src = "/public/assets/icons/media-icons/file-72px.png";
        taskCard.appendChild(taskImage);

        let taskName = document.createElement('p')
        taskName.innerHTML = element.getName();
        taskCard.appendChild(taskImage);

        let taskDescription = document.createElement('p')
        taskDescription.innerHTML = element.getDescription();
        taskCard.appendChild(taskDescription);

    });

    userCoursesTaskList = tasks;

}

function clickCard(event){

    const id = event.currentTarget.id;

    userCoursesTaskList.forEach(element => {
        
        if(element["task_id"] == id){

            sessionStorage.setItem("task", JSON.stringify(element));
            sessionStorage.setItem("newTask", JSON.stringify("notNew"));
            window.location.href = "/public/view/commonViews/tasks/task.html";

        }

    });

}

function newTask(){

    sessionStorage.setItem("newTask", JSON.stringify("new"));
    window.location.href = "/public/view/commonViews/tasks/task.html";

}