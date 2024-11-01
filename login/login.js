function valueData() {
    // Retrieve the values entered by the user
    let user = document.getElementById("user").value; // Get the username
    let password = document.getElementById("pass").value; // Get the password
    
    // Flag to verify if the user is valid
    let userFound = false;

    // Loop through the list of users
    usersList.forEach(element => {
        // Compare the username and password
        if (element.getUserName() === user && element.getpassword() === password) {
            // If the credentials are correct, redirect and store the object in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(element)); // Store the user object
            window.location.href = "/public/view/commonViews/courses/courses.html"; // Redirect to the courses page
            userFound = true; // Valid user found
            return; // Exit the loop once the user is found
        }
    });

    // If the user was not found, display an error message
    if (!userFound) {
        console.log("Error!! username or password is incorrect"); // Log error message
    }
}
