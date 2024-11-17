/*
    Function that loads all course data for the cards
    and then injects it into an HTML table.
*/
let userCoursesList = []

/**
 * Function to generate and display course cards on the page.
 * It dynamically creates cards for each course and appends them to the DOM.
 * Each card displays the course title, image, and progress.
 */
function printCourses() {

    // Get the block element where the courses will be injected
    let cardsBlock = document.getElementById('courses');
    cardsBlock.innerHTML = "";

    // Loop through each course in the courses list
    coursesList.forEach(element => {

        // Prepare the progress message for the course
        let workDoneMensage = element.getPorcent()+" "+element.getWorkDone();
        
        // Create the card div for each course
        let cardDiv = document.createElement('div');
        cardDiv.className = "card"
        cardDiv.id = element["id"];
        cardDiv.addEventListener('click', clickCard);
        cardsBlock.appendChild(cardDiv);

        // Create and append the course image
        let cardImg = document.createElement('img');
        cardImg.src = element["image"];
        cardImg.id  = "header";
        cardDiv.appendChild(cardImg);

        // Create and append the course title
        let cardTitle = document.createElement('h1');
        cardTitle.id = "card__title";
        cardTitle.innerHTML = element["title"];
        cardDiv.appendChild(cardTitle);

        // Create and append the course progress text
        let cardText = document.createElement('p');
        cardText.id = "card__text";
        cardText.innerHTML = workDoneMensage
        cardDiv.appendChild(cardText);

    });

    // Store the courses list for further use
    userCoursesList = coursesList;

}

/**
 * Function to create and display an exam schedule table.
 * It generates a table for each week, filling it with exam details for each day.
 * 
 * - param Array[] exams - Array of exam objects containing date and title information.
 */
async function createExamTable(exams) {

    // Create the table structure
    let table = document.createElement('table'); 
    let thead = document.createElement('thead'); 
    let tbody = document.createElement('tbody'); 

    // Create and append the table header with days of the week
    let headerRow = document.createElement('tr');
    let headers = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    headers.forEach(headerText => {
        let th = document.createElement('th'); 
        th.textContent = headerText; 
        headerRow.appendChild(th); 
    });

    thead.appendChild(headerRow); 
    table.appendChild(thead); 
    table.appendChild(tbody); 

    // Loop through the weeks and populate the table
    for (let week = 0; week < 5; week++) {
        let row = document.createElement('tr'); 

        // Loop through the days of the week
        for (let day = 0; day < 5; day++) {
            let cell = document.createElement('td');
            let currentDate = new Date(2024, 10, week * 7 + day + 1); 

            // Find if there's an exam on the current date
            let examDate = exams.find(exam => new Date(exam.date).toDateString() === currentDate.toDateString());

            // If there's an exam, display its title on the corresponding day
            if (examDate) {
                cell.textContent = currentDate.getDate()+" "+examDate.title; 
            }
            
            row.appendChild(cell); 
        }
        
        tbody.appendChild(row); 
    }

    // Append the table to the container in the DOM
    let tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(table); 
    
}

/**
 * Function to handle the click event on each course card.
 * It stores the clicked course data in sessionStorage and redirects the user.
 * 
 * - param  event - The click event triggered when a course card is clicked.
 */
function clickCard(event) {

    const id = event.currentTarget.id;

    // Find the clicked course by its ID
    userCoursesList.forEach(element => {
        
        if(element.id == id){

            // Store the course data in sessionStorage and navigate to the course tasks page
            sessionStorage.setItem("course", JSON.stringify(element));
            window.location.href = "/Aula-Virtual/public/view/commonViews/coursesTasks/coursesTask.html";

        }

    });

}

/**
 * Function to build the sidebar and handle sorting of tasks.
 * It listens for changes in the sidebar filter and calls the orderTasks function accordingly.
 * 
 * - param Array[] cuorseList - The list of courses to be sorted.
 */
function buildSideBar(cuorseList){

    // Get the realignment select element
    let selectElement = document.getElementById('realignment');

    // Add an event listener for when the user selects a sorting option
    selectElement.addEventListener('change', () => {
        let selectedValue = selectElement.value; 
        orderTasks(selectedValue,cuorseList);  // Sort the tasks based on the selected option
    });

}

/**
 * Function to order the tasks of a course based on the selected sorting option.
 * It sorts the tasks in either ascending or descending order.
 * 
 * - param string selectedValue - The selected sorting option (either "Ascendente" or "Descendente").
 * - param Array[] courseTask - The list of tasks for a specific course.
 */
function orderTasks(selectedValue, courseTask) {

    // Sort tasks in ascending order by task name
    if (selectedValue === "Ascendente") {
        courseTask.sort((a, b) => {
            if(a.name>b.name)return 1
            return -1
        });
        // Sort tasks in descending order by task name
    } else if (selectedValue === "Descendente") {
        courseTask.sort((a, b) => {
            if(b.name>a.name)return 1
            return -1
        });
    }

    // Reprint the courses list after sorting tasks
    printCourses();

}