let currentCourseSorted;

function printTask(taskList){

    let taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML  = "";

    taskList.forEach(element => {
        
        let taskCard = document.createElement('div');
        taskCard.className = "taskCard";
        taskCard.id = element["task_id"];
        taskCard.addEventListener("click",clickCard)
        taskContainer.appendChild(taskCard);

        let taskImage = document.createElement('img')
        taskImage.src = "/Aula-Virtual/public/assets/icons/media-icons/file-72px.png";
        taskImage.id="file__img";
        taskCard.appendChild(taskImage);

        let taskName = document.createElement('p')
        taskName.innerHTML = element.getName();
        taskCard.appendChild(taskName);

        let taskDescription = document.createElement('p')
        taskDescription.innerHTML = element.getDescription();
        taskCard.appendChild(taskDescription);

    });

}

function clickCard(event){

    const id = event.currentTarget.id;

    taskList.forEach(element => {
        
        if(element["task_id"] == id){

            sessionStorage.setItem("task", JSON.stringify(element));
            sessionStorage.setItem("newTask", JSON.stringify("notNew"));
            window.location.href = "/Aula-Virtual/public/view/commonViews/tasks/task.html";

        }

    });

}

function orderTasks(selectedValue) {

    if (selectedValue === "Ascendente") {
        taskList.sort((a, b) => {
            if(a.name>b.name)return 1
            return -1
        });
    } else if (selectedValue === "Descendente") {
        taskList.sort((a, b) => {
            if(b.name>a.name)return 1
            return -1
        });
    }

    printTask(taskList);

}

function newTask(){

    sessionStorage.setItem("newTask", JSON.stringify("new"));
    window.location.href = "/Aula-Virtual/public/view/commonViews/tasks/task.html";

}

function buildSideBar(currentCourse,cuorseTask,IsTeacher){

    currentCourseSorted = currentCourse;

    document.getElementById('bar__title').innerHTML =  currentCourse.getTitle();
    document.getElementById('bar__p').innerHTML =  currentCourse.getDescription();

    let createTaskDiv = document.getElementById('bar__utilities');

    if(IsTeacher){

        let divBarUtilOp = document.createElement('div');
        divBarUtilOp.id = 'bar__utilOp';
        createTaskDiv.appendChild(divBarUtilOp);

        let imgBarImg = document.createElement('img');
        imgBarImg.id = 'bar__img';
        imgBarImg.src = '/Aula-Virtual/public/assets/icons/media-icons/add-file-32px.png';

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
    imgBarImg.src = '/Aula-Virtual/public/assets/icons/media-icons/pencil-32px.png';

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
        orderTasks(selectedValue); 
    });

}