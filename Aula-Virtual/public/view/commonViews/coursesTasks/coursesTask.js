let currentCourseSorted;

/**
 * Function: printTask
 * Description:
 * Generates and displays a list of task cards based on the provided task list.
 * 
 * Parameters:
 * - taskList: An array of task objects to be displayed in the task container.
 * 
 * Functionality:
 * - Clears the existing task container content.
 * - Creates and appends new task cards for each task in the taskList.
 */
function printTask(taskList){

    // Get the container element where tasks will be displayed
    let taskContainer = document.getElementById('taskContainer');

    // Clear any previous content from the task container
    taskContainer.innerHTML  = "";

    // Loop through each task in the task list
    taskList.forEach(element => {
        
        // Create a new task card element
        let taskCard = document.createElement('div');
        taskCard.className = "taskCard"; //ClassName for Css
        taskCard.id = element["task_id"];
        taskCard.addEventListener("click",clickCard)
        taskContainer.appendChild(taskCard);

        // Create an image element for the task
        let taskImage = document.createElement('img')
        taskImage.src = "/Aula-Virtual/public/assets/icons/media-icons/file-72px.png";
        taskImage.id="file__img";
        taskCard.appendChild(taskImage);

        // Create a paragraph element for the task's name
        let taskName = document.createElement('p')
        taskName.innerHTML = element.getName();
        taskCard.appendChild(taskName);

        // Create a paragraph element for the task's description
        let taskDescription = document.createElement('p')
        taskDescription.innerHTML = element.getDescription();
        taskCard.appendChild(taskDescription);

    });

}

/**
 * Function: clickCard
 * Description:
 * Handles the click event on a task card. It retrieves the task details and stores them in session storage,
 * then redirects the user to the task details page.
 * 
 * Parameters:
 * - event: The click event triggered by the user on a task card.
 */
function clickCard(event){

    const id = event.currentTarget.id; // Get the ID of the clicked task card

    // Loop through the task list to find the task with the matching ID
    taskList.forEach(element => {
        
        if(element["task_id"] == id){

            // Store the task object in sessionStorage so it can be used on the next page
            sessionStorage.setItem("task", JSON.stringify(element));
            sessionStorage.setItem("status", JSON.stringify("notNew"));

            // Redirect to the task detail page
            window.location.href = "/Aula-Virtual/public/view/commonViews/tasks/task.html";

        }

    });

}

/**
 * Function: orderTasks
 * Description:
 * Sorts the tasks based on the selected order (ascending or descending) and reprints the task list.
 * 
 * Parameters:
 * - selectedValue: The selected order value (either "Ascendente" or "Descendente").
 */
function orderTasks(selectedValue) {

    // Sort tasks based on the selected order
    if (selectedValue === "Ascendente") {
        // Sort tasks in ascending order by name
        taskList.sort((a, b) => {
            if(a.name>b.name)return 1
            return -1
        });
    } else if (selectedValue === "Descendente") {
        // Sort tasks in descending order by name
        taskList.sort((a, b) => {
            if(b.name>a.name)return 1
            return -1
        });
    }

    // Reprint the sorted task list
    printTask(taskList);

}

/**
 * Function: newTask
 * Description:
 * Redirects the user to the task creation page and marks the task as new in session storage.
 * 
 * Functionality:
 * - Stores "new" in session storage to indicate that a new task is being created.
 * - Redirects the user to the task creation page.
 */
function newTask(){

    sessionStorage.setItem("status", JSON.stringify("new")); // Mark this as a new task
    window.location.href = "/Aula-Virtual/public/view/commonViews/tasks/task.html"; // Redirect to the task creation page

}

/**
 * Function: buildSideBar
 * Description:
 * Builds the sidebar for the course page, including utility options for task creation and ordering.
 * 
 * Parameters:
 * - currentCourse: The current course object.
 * - courseTask: The list of tasks for the course.
 * - IsTeacher: A boolean value indicating whether the user is a teacher.
 */
function buildSideBar(currentCourse,IsTeacher){

    currentCourseSorted = currentCourse; // Store the current course for later use

    // Display course title and description in the sidebar
    document.getElementById('bar__title').innerHTML =  currentCourse.getTitle();
    document.getElementById('bar__p').innerHTML =  currentCourse.getDescription();

    // Get the sidebar container where the utility options will be placed
    let createTaskDiv = document.getElementById('bar__utilities');

    // Check if the user is a teacher to provide the task creation option
    if(IsTeacher){

        // Create a div for the "Create Task" option
        let divBarUtilOp = document.createElement('div');
        divBarUtilOp.id = 'bar__utilOp';
        createTaskDiv.appendChild(divBarUtilOp);

        // Create an image for the "Create Task" option
        let imgBarImg = document.createElement('img');
        imgBarImg.id = 'bar__img';
        imgBarImg.src = '/Aula-Virtual/public/assets/icons/media-icons/add-file-32px.png';

        // Add text next to the image for "Create Task"
        let textNode = document.createTextNode('Crear entrega');
        divBarUtilOp.appendChild(imgBarImg);
        divBarUtilOp.appendChild(textNode);

        // Add a click event listener to redirect to task creation
        document.getElementById('bar__img').addEventListener('click', ()  =>  newTask());
    
    }

    // Create a div for ordering tasks
    let divBarUtilOp = document.createElement('div');
    divBarUtilOp.id = 'bar__utilOp';
    createTaskDiv.appendChild(divBarUtilOp);

    // Create an image for the "Order Tasks" option
    let imgBarImg = document.createElement('img');
    imgBarImg.id = 'bar__img';
    imgBarImg.src = '/Aula-Virtual/public/assets/icons/media-icons/pencil-32px.png';

    // Add text next to the image for "Order tasks by"
    let textNode = document.createTextNode('Ordenar de forma:');

    // Create a select dropdown for choosing the order type
    let selectRealignment = document.createElement('select');
    selectRealignment.id = 'realignment';

    // Create and append options for ascending and descending order
    let optionAscendente = document.createElement('option');
    optionAscendente.textContent = 'Ascendente';
    selectRealignment.appendChild(optionAscendente);

    let optionDescendente = document.createElement('option');
    optionDescendente.textContent = 'Descendente';
    selectRealignment.appendChild(optionDescendente);

    // Append all elements to the div
    divBarUtilOp.appendChild(imgBarImg);
    divBarUtilOp.appendChild(textNode);
    divBarUtilOp.appendChild(selectRealignment);

    // Add a change event listener to the dropdown for ordering tasks
    let selectElement = document.getElementById('realignment');
    selectElement.addEventListener('change', () => {
        let selectedValue = selectElement.value;  // Get the selected value (Ascendente/Descendente)
        orderTasks(selectedValue);  // Call orderTasks with the selected value
    });

}