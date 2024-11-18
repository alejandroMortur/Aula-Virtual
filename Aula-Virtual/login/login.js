// Main function to handle login validation
function valueData(){

    // Get user input values
    let user = document.getElementById("User").value;
    let password = document.getElementById("Pass").value;

    // Verify if the username and password meet the required patterns
    let averagePassword = verifyPassword(password);
    let averageUser = verifyData(user);

    if(averageUser && averagePassword){

        // Loop through the list of users to find a match
        usersList.forEach(element => {

            // Check if the username and password match
            if(element.getUserName() == user && element.getpassword() == password){

                // Check if the user is an admin
                if(element.getUserName() == "Admin" && element.getpassword() == "Admin"){
                    // Save admin user data in session storage for later use and redirect to admin hub
                    sessionStorage.setItem("user", JSON.stringify(element));
                    window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html"; 
                }else{
                    // Save user data in session storage for later use and redirect to courses page
                    sessionStorage.setItem("user", JSON.stringify(element));
                    window.location.href = "/Aula-Virtual/public/view/commonViews/courses/courses.html";
                }

            }else{
                // Show registration error message for invalid login
                document.getElementById("mensageError").style.display = "none";
                document.getElementById("mensageErrorRegister").style.display = "initial";
                // Add error styling to input fields
                document.getElementById("Pass").className = "error";
                document.getElementById("User").className = "error";
            }
    
        });

    }else{

        // Show validation error message for invalid input
        document.getElementById("mensageError").style.display = "initial";
        document.getElementById("mensageErrorRegister").style.display = "none";

        // Highlight specific fields with errors
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