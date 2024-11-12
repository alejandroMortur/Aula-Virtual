/*
    Function that loads all courses data por the cards
    and then in inyects it in a HTML table.
*/
let userCoursesList = []

function printCourses() {

    let cardsBlock = document.getElementById('courses');
    cardsBlock.innerHTML = "";

    coursesList.forEach(element => {

        let workDoneMensage = element.getPorcent()+" "+element.getWorkDone();
        
        let cardDiv = document.createElement('div');
        cardDiv.className = "card"
        cardDiv.id = element["id"];
        cardDiv.addEventListener('click', clickCard);
        cardsBlock.appendChild(cardDiv);

        let cardImg = document.createElement('img');
        cardImg.src = element["image"];
        cardImg.id  = "header";
        cardDiv.appendChild(cardImg);

        let cardTitle = document.createElement('h1');
        cardTitle.id = "card__title";
        cardTitle.innerHTML = element["title"];
        cardDiv.appendChild(cardTitle);

        let cardText = document.createElement('p');
        cardText.id = "card__text";
        cardText.innerHTML = workDoneMensage
        cardDiv.appendChild(cardText);

    });

    userCoursesList = coursesList;

}

async function createExamTable(exams) {

    let table = document.createElement('table'); 
    let thead = document.createElement('thead'); 
    let tbody = document.createElement('tbody'); 

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

    for (let week = 0; week < 5; week++) {
        let row = document.createElement('tr'); 

        for (let day = 0; day < 5; day++) {
            let cell = document.createElement('td');
            let currentDate = new Date(2024, 10, week * 7 + day + 1); 

            let examDate = exams.find(exam => new Date(exam.date).toDateString() === currentDate.toDateString());

            if (examDate) {
                cell.textContent = currentDate.getDate()+" "+examDate.title; 
            }
            
            row.appendChild(cell); 
        }
        
        tbody.appendChild(row); 
    }

    let tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(table); 
    
}

function clickCard(event) {

    const id = event.currentTarget.id;

    userCoursesList.forEach(element => {
        
        if(element.id == id){

            sessionStorage.setItem("course", JSON.stringify(element));
    
            window.location.href = "/public/view/commonViews/coursesTasks/coursesTask.html";

        }

    });

}

function buildSideBar(cuorseList){

    let selectElement = document.getElementById('realignment');

    selectElement.addEventListener('change', () => {
        let selectedValue = selectElement.value; 
        orderTasks(selectedValue,cuorseList); 
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

    printCourses();

}