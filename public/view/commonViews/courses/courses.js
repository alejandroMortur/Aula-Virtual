/*
    Function that loads all courses data por the cards
    and then in inyects it in a HTML table.
*/

//adaptar para leer json cursos por ahora
function printCourses(){

   let coursesHTML = "<table>";

    for(const element of courses){

        coursesHTML += "</tr>";

        for(let y = 0; y < 4; ++y){

            if(y == 0){

                coursesHTML += `<td><img src='${element[y]}'></td>`;

            }else{

                coursesHTML += `<td><p>${element[y]}<p></td>`;

            }

        }

        coursesHTML += "</tr>";

    }

    coursesHTML += "</table>";

    document.getElementById('courses').innerHTML += coursesHTML;

}