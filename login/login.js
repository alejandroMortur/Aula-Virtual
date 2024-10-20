function valueData(){

    let user = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    usersList.forEach(element => {

        if(element.UserName == user && element.password == password){

            window.location.href = "/public/view/commonViews/courses/courses.html";

            // Guardar el objeto en sessionStorage
            sessionStorage.setItem("user", JSON.stringify(element));

        }else{

            console.log("Error!! usuario o contraseña incorrectos");

        }

    });

}