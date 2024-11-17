/**
 * Function: valueData
 * Description:
 * Verifies if the user input data (such as username, password, etc.) meets specific validation criteria.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Retrieves the user input values from the form.
 * - Verifies each field using regular expressions defined in the `expresions` array.
 * - If all data is valid, constructs a new user object and sends it to the server.
 * - If any data is invalid, highlights the incorrect fields and displays an error message.
 */
function valueData() {

    // Define validation patterns for various fields
    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ.0-9]+$/, // Username
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, // Name
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+([' '][A-Za-zÁÉÍÓÚáéíóúñÑ]+)+$/, // SureName
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9._%+-]+@(gmail|hotmail)\.(com|es|lok)$/, // Email
        /^(0|1)$/, // isTeacher (0 for false, 1 for true)
        /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/ // DNI
    ];

    // Retrieve values from form inputs
    let user = document.getElementById("User").value;
    let password = document.getElementById("Pass").value;
    let password2 = document.getElementById("Pass2").value;
    let userName = document.getElementById("Name").value;
    let userSureName = document.getElementById("SureName").value;
    let mail = document.getElementById("Mail").value;
    let isTeacher = document.getElementById("IsTeacher").value;
    let dni = document.getElementById("Dni").value;

    // Verify each field using their respective validation functions
    let averagePassword = verifyPassword(password, password2);
    let averageUser = verifyData(user, expresions[0]);
    let averageName = verifyData(userName, expresions[1]);
    let averageSurname = verifyData(userSureName, expresions[2]);
    let averageMail = verifyData(mail, expresions[3]);
    let averageIsTeacher = verifyData(isTeacher, expresions[4]);
    let averageDni = verifyData(dni, expresions[5]);
    let courses = [1,4,5];

    // If all fields are valid, create a new user object and send it to the server
    if (averagePassword && averageUser && averageName && averageSurname && averageMail && averageIsTeacher && averageDni) {

        console.log(user, password, password2, userName, userSureName, mail, isTeacher)

        // If the user is a teacher, grant access to all courses
        if(averageIsTeacher == 1)
            courses = [1, 2, 3, 4, 5, 6];
    
        // Create the user object with the validated data
        let usuario = {
            "UserName": user,
            "Name": userName,
            "DNI": dni,
            "password": password,
            "SureName": userSureName,
            "IsTeacher": parseInt(isTeacher),
            "registration": courses,
            "Mail": mail,
            "Image": "/Aula-Virtual/public/assets/img/users/default.jpg" // Usar '/' sin escapar
        };

         // Create a User object and send it to the server
        let userObject = new User(usuario);
        sendData(userObject,false);

        // Store the user object in sessionStorage and navigate to the courses page
        sessionStorage.setItem("user", JSON.stringify(userObject));
        window.location.href = "/Aula-Virtual/public/view/commonViews/courses/courses.html";

    } else {

        // If any field is invalid, show error messages and highlight incorrect fields
        document.getElementById("mensage").style.display = "none";
        document.getElementById("mensageError").style.display = "initial";

        // Highlight the fields with errors
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

/**
 * Function: verifyPassword
 * Description:
 * Verifies if both passwords match and follow the defined pattern.
 * 
 * Parameters:
 * - password: The first password input from the user.
 * - password2: The second password input (confirmation) from the user.
 * 
 * Functionality:
 * - Checks if both passwords follow the defined pattern.
 * - Verifies if the passwords match.
 * - Returns true if passwords match and follow the pattern; false otherwise.
 */
function verifyPassword(password, password2) {

    // Define the pattern for allowed characters in the password
    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9_.*,+$-]+$/;

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

/**
 * Function: verifyData
 * Description:
 * Verifies if the input data matches the provided regular expression pattern.
 * 
 * Parameters:
 * - user: The data to be verified (e.g., username, email, etc.).
 * - pattern: The regular expression pattern to check the data against.
 * 
 * Functionality:
 * - Checks if the data matches the pattern.
 * - Returns true if the data matches the pattern; false otherwise.
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
