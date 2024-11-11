let userCoursesTaskList = []
let currentCourseSorted;

function printTask(currentCourse){

    let taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML  = "";
    let tasks = currentCourse.getTask();

    tasks.forEach(element => {
        
        let taskCard = document.createElement('div');
        taskCard.className = "taskCard";
        taskCard.id = element["task_id"];
        taskCard.addEventListener("click",clickCard)
        taskContainer.appendChild(taskCard);

        let taskImage = document.createElement('img')
        taskImage.src = "/public/assets/icons/media-icons/file-72px.png";
        taskImage.id="file__img";
        taskCard.appendChild(taskImage);

        let taskName = document.createElement('p')
        taskName.innerHTML = element.name;
        taskCard.appendChild(taskName);

        let taskDescription = document.createElement('p')
        taskDescription.innerHTML = element.description;
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

function orderTasks(selectedValue, courseTask) {

    if (selectedValue === "Ascendente") {
        courseTask.sort((a, b) => {
            if(a.name>b.name)return 1
            return -1
        });
    } else if (selectedValue === "Descendente") {
        courseTask.sort((a, b) => {
            if(b.name>a.name)return 1
            return -1
        });
    }

    currentCourseSorted.coursesTask.splice(0,currentCourseSorted.coursesTask.length);
    courseTask.forEach(task => {
        currentCourseSorted.setTask(task)
    });

    printTask(currentCourseSorted);

}

function newTask(){

    sessionStorage.setItem("newTask", JSON.stringify("new"));
    window.location.href = "/public/view/commonViews/tasks/task.html";

}

function buildSideBar(currentCourse,cuorseTask,IsTeacher){

    currentCourseSorted = currentCourse;

    document.getElementById('bar__title').innerHTML =  currentCourse.title;
    document.getElementById('bar__p').innerHTML =  currentCourse.description;

    let createTaskDiv = document.getElementById('bar__utilities');

    if(IsTeacher){

        let divBarUtilOp = document.createElement('div');
        divBarUtilOp.id = 'bar__utilOp';
        createTaskDiv.appendChild(divBarUtilOp);

        let imgBarImg = document.createElement('img');
        imgBarImg.id = 'bar__img';
        imgBarImg.src = '/public/assets/icons/media-icons/add-file-32px.png';

        let textNode = document.createTextNode('Crear entrega');

        divBarUtilOp.appendChild(imgBarImg);
        divBarUtilOp.appendChild(textNode);

        document.getElementById('bar__img').addEventListener('click', ()  =>  newTask());
    
    }

    let divBarUtilOp = document.createElement('div');
    divBarUtilOp.id = 'bar__utilOp';
    createTaskDiv.appendChild(divBarUtilOp);

    let imgBarImg = document.createElement('img');
    imgBarImg.id = 'bar__img';
    imgBarImg.src = '/public/assets/icons/media-icons/pencil-32px.png';

    let textNode = document.createTextNode('Ordenar de forma:');

    let selectRealignment = document.createElement('select');
    selectRealignment.id = 'realignment';

    let optionAscendente = document.createElement('option');
    optionAscendente.textContent = 'Ascendente';
    selectRealignment.appendChild(optionAscendente);

    let optionDescendente = document.createElement('option');
    optionDescendente.textContent = 'Descendente';
    selectRealignment.appendChild(optionDescendente);

    divBarUtilOp.appendChild(imgBarImg);
    divBarUtilOp.appendChild(textNode);
    divBarUtilOp.appendChild(selectRealignment);

    let selectElement = document.getElementById('realignment');
    
    selectElement.addEventListener('change', () => {
        let selectedValue = selectElement.value; 
        orderTasks(selectedValue,cuorseTask); 
    });

}