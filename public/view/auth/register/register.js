function valueData() {

    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ.0-9]+$/, // Username
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, // Name
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+([' '][A-Za-zÁÉÍÓÚáéíóúñÑ]+)+$/, // SureName
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9._%+-]+@(gmail|hotmail)\.(com|es|lok)$/, // Email
        /^(0|1)$/, // isTeacher (0 for false, 1 for true)
        /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/ // DNI
    ];

    let user = document.getElementById("User").value;
    let password = document.getElementById("Pass").value;
    let password2 = document.getElementById("Pass2").value;
    let userName = document.getElementById("Name").value;
    let userSureName = document.getElementById("SureName").value;
    let mail = document.getElementById("Mail").value;
    let isTeacher = document.getElementById("IsTeacher").value;
    let dni = document.getElementById("Dni").value;

    console.log(user, password, password2, userName, userSureName, mail, isTeacher)

    let averagePassword = verifyPassword(password, password2);
    let averageUser = verifyData(user, expresions[0]);
    let averageName = verifyData(userName, expresions[1]);
    let averageSurname = verifyData(userSureName, expresions[2]);
    let averageMail = verifyData(mail, expresions[3]);
    let averageIsTeacher = verifyData(isTeacher, expresions[4]);
    let averageDni = verifyData(dni, expresions[5]);
    let courses = [1,4,5];

    if (averagePassword && averageUser && averageName && averageSurname && averageMail && averageIsTeacher && averageDni) {

        if(averageIsTeacher == 1)
            courses = [1, 2, 3, 4, 5, 6];
    
        let usuario = {
            "UserName": user,
            "Name": userName,
            "DNI": dni,
            "password": password,
            "SureName": userSureName,
            "IsTeacher": parseInt(isTeacher),
            "registration": courses,
            "Mail": mail,
            "Image": "/public/assets/img/users/default.jpg" // Usar '/' sin escapar
        };

        let userObject = new User(usuario);
        mandarDatos(userObject);

        sessionStorage.setItem("user", JSON.stringify(userObject));
        window.location.href = "/public/view/commonViews/courses/courses.html";

    } else {

        document.getElementById("mensage").style.display = "none";
        document.getElementById("mensageError").style.display = "initial";

        if (!averagePassword) {
            document.getElementById("Pass").className = "error";
            document.getElementById("Pass2").className = "error";
        } 
        
        if (!averageUser) {
            document.getElementById("User").className = "error";
        }
        
        if (!averageName) {
            document.getElementById("Name").className = "error";
        }
        
        if (!averageSurname) {
            document.getElementById("SureName").className = "error";
        }
        
        if (!averageMail) {
            document.getElementById("Mail").className = "error";
        }
        
        if (!averageIsTeacher) {
            document.getElementById("IsTeacher").className = "error";
        }
        
        if (!averageDni) {
            document.getElementById("Dni").className = "error";
        } 
            
        console.log("Datos incorrectos");
        
    }
}

/*
    Function that verifies if both passwords are equal. In the future,
    it will verify if the password meets all security requirements.
*/
function verifyPassword(password, password2) {

    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9_.*,+$-]+$/;
    // Only letters and numbers, including accents and ñ

    // Checks if both passwords follow the pattern
    if (pattern.test(password) && pattern.test(password2)) {
        // Checks if both passwords are identical
        if (password === password2) {
            console.log("Passwords match and follow the pattern.");
            return true; // Passwords match and follow the pattern
        } else {
            console.log("Passwords do not match.");
            return false; // Passwords do not match
        }
    } else {
        console.log("One or both passwords do not follow the pattern.");
        return false; // Passwords do not follow the pattern
    }
}

/*
    Function that verifies if the username meets all security requirements.
*/
function verifyData(user,pattern) {

    // Checks if the "user" string follows the pattern
    if (pattern.test(user)) {
        console.log("The data follows the pattern.");
        return true;
    } else {
        console.log("The data does not follow the pattern.");
        return false;
    }
}
