let courses = [
    [
        "/public/assets/img/courses/dam.jpeg",
        "Desarrollo de aplicaciones multiplataforma",
        "2000 horas",
        "Aprende a diseñar y desarrollar aplicaciones que funcionen de manera nativa en diferentes sistemas operativos (Android, iOS, Windows, etc.)."
    ],
    [
        "/public/assets/img/courses/daw.jpg",
        "Desarrollo de aplicaciones web",
        "2000 horas",
        "Domina las tecnologías más populares para crear aplicaciones web interactivas y dinámicas, como HTML, CSS, JavaScript, y frameworks como Angular, React o Django."
    ],
    [
        "/public/assets/img/courses/big-data.jpg",
        "Big data",
        "2000 horas",
        "Adquiere habilidades en el manejo de grandes volúmenes de datos, con el proposito de procesar, analizar y extraer información valiosa que guíe la toma de decisiones en entornos empresariales."
    ],
    [
        "/public/assets/img/courses/machine_learning.jpg",
        "Desarrollo de Inteligencia Artificial",
        "2000 horas",
        "Explora los principios fundamentales de la inteligencia artificial, incluyendo aprendizaje automático, redes neuronales y procesamiento de lenguaje natural, utilizando lenguajes como Python y librerías como TensorFlow y PyTorch para construir modelos inteligentes."
    ],
    [
        "/public/assets/img/courses/asir.jpg",
        "Administración de Sistemas Informáticos en Red",
        "2000 horas",
        "Aprende a configurar, gestionar y mantener redes y sistemas informáticos, garantizando la seguridad, disponibilidad y eficiencia, utilizando sistemas operativos como Linux y Windows Server, y herramientas de virtualización y gestión de redes."
    ]
];

/*
    Function that loads all courses data por the cards
    and then in inyects it in a HTML table.
*/
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