/*
    Function that loads all courses data por the cards
    and then in inyects it in a HTML table.
*/

function printCourses() {

    let coursesHTML = "<table>";

    coursesList.forEach(element => {
        
        coursesHTML += `<tr onclick="clickCard()">
                            <td><img src='${element["image"]}'></td>
                            <td><p>${element["title"]}</p></td>
                            <td><p>${element["description"]}</p></td>
                        </tr>`;

    });

    coursesHTML += "</table>";
    document.getElementById('courses').innerHTML += coursesHTML;

}

function clickCard() {

    window.location.href = "/public/view/commonViews/coursesTasks/coursesTask.html";

}