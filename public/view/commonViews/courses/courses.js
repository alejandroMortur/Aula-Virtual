/*
    Function that loads all courses data por the cards
    and then in inyects it in a HTML table.
*/

let userCoursesList = []

function printCourses() {

    let coursesHTML = "";

    coursesList.forEach(element => {
        
        coursesHTML += `
                        <div class="card" id="${element["id"]}" onclick="clickCard(event)">
                            <img src='${element["image"]}' id="header">
                            <h1 id="card__title">${element["title"]}</h1>
                            <p id="card__test">${element["description"]}</p>
                        </div>`;

    });

    userCoursesList = coursesList;

    document.getElementById('courses').innerHTML += coursesHTML;

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