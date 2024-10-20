/*
    Function that loads all courses data por the cards
    and then in inyects it in a HTML table.
*/

let userCoursesList = []

function printCourses() {

    let coursesHTML = "<table>";

    coursesList.forEach(element => {
        
        coursesHTML += `<tr id="${element["id"]}" onclick="clickCard(event)">
                            <td><img src='${element["image"]}' id="header"></td>
                            <td><p>${element["title"]}</p></td>
                            <td><p>${element["description"]}</p></td>
                        </tr>`;

    });

    userCoursesList = coursesList;

    coursesHTML += "</table>";
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