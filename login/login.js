function valueData(){

    let user = document.getElementById("User").value;
    let password = document.getElementById("Pass").value;
    let averagePassword = verifyPassword(password);
    let averageUser = verifyData(user);

    if(averageUser && averagePassword){

        usersList.forEach(element => {

            if(element.getUserName() == user && element.getpassword() == password){
                // Guardar el objeto en sessionStorage
                sessionStorage.setItem("user", JSON.stringify(element));
                window.location.href = "/public/view/commonViews/courses/courses.html";
            }else{
                document.getElementById("mensageError").style.display = "none";
                document.getElementById("mensageErrorRegister").style.display = "initial";
                document.getElementById("Pass").className = "error";
                document.getElementById("User").className = "error";
            }
    
        });

    }else{

        document.getElementById("mensageError").style.display = "initial";
        document.getElementById("mensageErrorRegister").style.display = "none";

        if (!averagePassword) {
            document.getElementById("Pass").className = "error";
        } 
        
        if (!averageUser) {
            document.getElementById("User").className = "error";
        }
    }
}


function verifyPassword(password) {

    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9_.*,+$-]+$/;
    // Only letters and numbers, including accents and ñ

    // Checks if both passwords follow the pattern
    if (pattern.test(password)) {
        console.log("Passwords match and follow the pattern.");
        return true; // Passwords match and follow the pattern
    } else {
        console.log("One or both passwords do not follow the pattern.");
        return false; // Passwords do not follow the pattern
    }
}

/*
    Function that verifies if the username meets all security requirements.
*/
function verifyData(user) {

    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ.0-9]+$/;

    // Checks if the "user" string follows the pattern
    if (pattern.test(user)) {
        console.log("The data follows the pattern.");
        return true;
    } else {
        console.log("The data does not follow the pattern.");
        return false;
    }
}