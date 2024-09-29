/*
    Main function that calls other functions to verify the user and password
    if both are correct then it will acept the user
*/
function valueData(){

    let user = document.getElementById("user").value;
    let password = document.getElementById("pass").value;
    let password2 = document.getElementById("pass2").value;

    let averagePassword = verifyPassword(password,password2);
    let averageUser = verifyUser(user);

    if(averagePassword && averageUser){

        console.log("contraseña y usuario correctos");
        console.log(user,password,password2);

    }else{

        console.log("contraseñas dispares o usuario incorrecto");
        console.log(user,password,password2);

    }

}

/*
    Function that verify if both password are equal, in the future
    it will verify if the password pass al the security requirements
*/
function verifyPassword(password, password2){

    if(password == password2)return 1
    else return 0;

}

/*
    Function that will verify if the user name pass al the security requirements
*/
function verifyUser(user){

    return 0

}