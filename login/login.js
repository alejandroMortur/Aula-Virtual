function valueData(){

    let user = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    usersList.forEach(element => {

        if(element.UserName == user && element.password == password){

            window.location.href = "/public/view/commonViews/courses/courses.html";

        }else{

            console.log("Error!! usuario o contraseña incorrectos");

        }

    });

}