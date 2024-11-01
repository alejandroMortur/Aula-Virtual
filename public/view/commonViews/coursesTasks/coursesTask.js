let userCoursesTaskList = []; // Array to store tasks of the user
let currentCourseSorted; // Variable to keep track of the currently sorted course

function printTask(currentCourse) {
    // Get the task container element by its ID
    let taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = ""; // Clear any existing content in the task container

    // Retrieve tasks from the current course
    let tasks = currentCourse.getTask();

    // Loop through each task and create a task card
    tasks.forEach(element => {
        // Create a div for the task card
        let taskCard = document.createElement('div');
        taskCard.className = "taskCard"; // Assign class for styling
        taskCard.id = element["task_id"]; // Set the ID of the task card
        taskCard.addEventListener("click", clickCard); // Add click event listener
        taskContainer.appendChild(taskCard); // Append the task card to the task container

        // Create and append the task image
        let taskImage = document.createElement('img');
        taskImage.src = "/public/assets/icons/media-icons/file-72px.png"; // Set the source for the task image
        taskImage.id = "file__img"; // Set the ID for the image
        taskCard.appendChild(taskImage); // Append the image to the task card

        // Create and append the task name
        let taskName = document.createElement('p');
        taskName.id = "task__p"; // Set the ID for the task name
        taskName.innerHTML = element.getName(); // Set the name of the task
        taskCard.appendChild(taskName); // Append the task name to the task card

        // Create and append the task description
        let taskDescription = document.createElement('p');
        taskDescription.innerHTML = element.getDescription(); // Set the description of the task
        taskCard.appendChild(taskDescription); // Append the task description to the task card
    });

    // Update the global list of user course tasks
    userCoursesTaskList = tasks;
}

function clickCard(event) {
    const id = event.currentTarget.id; // Get the ID of the clicked task card

    // Loop through the user courses task list to find the clicked task
    userCoursesTaskList.forEach(element => {
        if (element["task_id"] == id) {
            // Save the selected task in session storage
            sessionStorage.setItem("task", JSON.stringify(element));
            sessionStorage.setItem("newTask", JSON.stringify("notNew")); // Mark the task as not new
            // Redirect to the task details page
            window.location.href = "/public/view/commonViews/tasks/task.html";
        }
    });
}

function orderTasks(selectedValue, courseTask) {
    // Sort tasks based on the selected value (ascending or descending)
    if (selectedValue === "Ascendente") {
        courseTask.sort((a, b) => {
            if (a.name > b.name) return 1; // Sort in ascending order
            return -1;
        });
    } else if (selectedValue === "Descendente") {
        courseTask.sort((a, b) => {
            if (b.name > a.name) return 1; // Sort in descending order
            return -1;
        });
    }

    // Clear the current sorted course's tasks
    currentCourseSorted.coursesTask.splice(0, currentCourseSorted.coursesTask.length);
    // Set the sorted tasks to the current course
    courseTask.forEach(task => {
        currentCourseSorted.setTask(task);
    });

    // Print the sorted tasks
    printTask(currentCourseSorted);
}

function newTask() {
    // Mark the task as new in session storage
    sessionStorage.setItem("newTask", JSON.stringify("new"));
    // Redirect to the new task page
    window.location.href = "/public/view/commonViews/tasks/task.html";
}

function buildSideBar(currentCourse, cuorseTask) {
    // Set the current course as sorted for further reference
    currentCourseSorted = currentCourse;

    // Update the sidebar title and description
    document.getElementById('bar__title').innerHTML = currentCourse.title;
    document.getElementById('bar__p').innerHTML = currentCourse.description;

    // Add click event to the sidebar image to create a new task
    document.getElementById('bar__img').addEventListener('click', () => newTask());

    // Get the select element for task ordering
    const selectElement = document.getElementById('realignment');

    // Add change event listener to the select element
    selectElement.addEventListener('change', () => {
        const selectedValue = selectElement.value; // Get the selected value
        orderTasks(selectedValue, cuorseTask); // Call the orderTasks function with the selected value
    });
}
