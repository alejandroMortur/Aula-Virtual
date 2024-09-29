let courses = [["Desarrollo de aplicaciones  multiplataforma","2000 horas","/public/assets/img/courses/dam.jpeg"],
               ["Desarrollo  de aplicaciones web","2000 horas","/public/assets/img/courses/daw.jpg"],
               ["Big data","2000 horas","/public/assets/img/courses/big-data.jpg"],
               ["Desarrollo de Inteligencia Artificial","2000 horas","/public/assets/img/courses/machine_learning.jpg"],
               ["Administración de Sistemas Informáticos en Red","2000 horas","/public/assets/img/courses/asir.jpg"]];


function printCourses(){

   let coursesHTML = "<table>";

    for(let x = 0; x < courses.length; ++x){

        coursesHTML += "</tr>";

        for(let y = 0; y < 3; ++y){

            if(y == 2){

                coursesHTML += `<td><img src='${courses[x][y]}'></td>`;

            }else{

                coursesHTML += `<td>${courses[x][y]}</td>`;

            }

        }

        coursesHTML += "</tr>";

    }

    document.getElementById('courses').innerHTML += coursesHTML;

}