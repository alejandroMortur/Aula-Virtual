/*
    Function that loads all courses data por the cards
    and then in inyects it in a HTML table.
*/

let userCoursesList = []

function printCourses() {

    let cardsBlock = document.getElementById('courses');

    coursesList.forEach(element => {

        let workDoneMensage = element.porcent+" "+element.workDone;
        
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
        cardText.id = "card__test";
        cardText.innerHTML = workDoneMensage
        cardDiv.appendChild(cardText);

    });

    userCoursesList = coursesList;

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