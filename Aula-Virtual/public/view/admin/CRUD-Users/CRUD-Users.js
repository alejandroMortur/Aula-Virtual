/**
 * Function: loadUserData
 * Description:
 * Populates the user form with details of the target user. This includes 
 * fields like username, name, surname, DNI, password, email, registration 
 * data, and the user's image.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Retrieves user details from the `targetUser` object and fills the 
 *   corresponding form fields.
 * - Updates the `IsTeacher` checkbox based on the user's status.
 * - Sets the user's image and displays additional user information (username and DNI).
 */
function loadUserData(){

    // Load user data into the respective form fields
    $('#UserName').val(targetUser.getUserName());
    $('#Name').val(targetUser.getName());
    $('#SureName').val(targetUser.getSureName());
    $('#DNI').val(targetUser.getDNI());
    $('#password').val(targetUser.getpassword());

    // Check if the user is a teacher and update the checkbox
    if(targetUser.getIsTeacher() == 1)
        $('#IsTeacher').prop('checked', true);

    // Load email and registration data
    $('#Mail').val(targetUser.getMail());

    // Update the registration checkboxes based on the user's registrations
    $('input[name="registration[]"]').each((index, element) => {
        if (targetUser.getRegistration().includes(parseInt($(element).val()))) {
            $(element).prop('checked', true);
        }
    });

    // Update user image and additional text fields
    $('#user_Img').attr("src",targetUser.getImage());
    $('#userName_text').html(targetUser.getUserName());
    $('#userDNI_text').html(targetUser.getDNI());

}

/**
 * Function: removeElement
 * Description:
 * Deletes the current user and redirects to the admin hub.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Alerts the user that the account has been successfully deleted.
 * - Sends the deletion request to the server and redirects to the admin page.
 */
function removeElement(){

    // Show an alert to inform the user that the task has been successfully removed
    alert("Usuario eliminado con exito");

    // Send data indicating that the user should be removed (true indicates removal)
    sendData(targetUser,true);

    // Redirect to admin hub
    window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html"; 

}

/**
 * Function: saveChanges
 * Description:
 * Validates the form data and saves any modifications to the user object.
 * If the validation passes, it sends the modified user data to the server.
 * If validation fails, it highlights the errors on the form.
 * 
 * Parameters: None
 * 
 * Functionality:
 * - Validates the password, username, name, surname, email, teacher status, and DNI.
 * - Creates a new `User` object based on the form data and sends it for processing.
 * - In case of validation errors, it displays error messages and highlights invalid fields.
 */
function saveChanges() {
    
    event.preventDefault(); // Prevent default form submission

    // Define regular expressions for validating user data
    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ.0-9]+$/, // Username
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, // Name
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+([' '][A-Za-zÁÉÍÓÚáéíóúñÑ]+){0,1}$/, // SureName
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9._%+-]+@(educa|gmail|hotmail)\.academy\.(org|com|es|lok)$/, // Email
        /^(true|false)$/, // isTeacher (true , false)
        /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/ // DNI
    ];

    // Collect selected registration values
    const selectedRegistrations = $('input[name="registration[]"]:checked').map((index, element) => {
        return parseInt($(element).val());
    }).get();

    // Verify each field with its respective validation function
    let averagePassword = verifyPassword($('#password').val());
    let averageUser = verifyData($('#UserName').val(), expresions[0]);
    let averageName = verifyData($('#Name').val(), expresions[1]);
    let averageSurname = verifyData($('#SureName').val(), expresions[2]);
    let averageMail = verifyData( $('#Mail').val(), expresions[3]);
    let averageIsTeacher = verifyData($('#IsTeacher').prop('checked'), expresions[4]);
    let averageDni = verifyData($('#DNI').val(), expresions[5]);

    // Check if all data is valid
    if (averagePassword && averageUser && averageName && averageSurname && averageMail && averageIsTeacher && averageDni) {

        let modifiedUser = "";

        // Check if the user is an existing object or a new one
        if (state == "notNewObject") {

            // Create a new user object with the form data
            const user = {
                "UserName": $('#UserName').val(),
                "Name": $('#Name').val(),
                "DNI": $('#DNI').val(),
                "password": $('#password').val(),
                "SureName": $('#SureName').val(),
                "IsTeacher": $('#IsTeacher').prop('checked'),
                "registration": selectedRegistrations,
                "Mail": $('#Mail').val(),
                "Image": $('#user_Img').attr("src")
            };
    
            // Create a new User instance with the User data
            modifiedUser = new User(user);
            
        }else{

            // If it's a new User, create a User object 
            const user = {
                "UserName": $('#UserName').val(),
                "Name": $('#Name').val(),
                "DNI": $('#DNI').val(),
                "password": $('#password').val(),
                "SureName": $('#SureName').val(),
                "IsTeacher": $('#IsTeacher').prop('checked'),
                "registration": selectedRegistrations,
                "Mail": $('#Mail').val(),
                "Image": "/Aula-Virtual/public/assets/img/users/default.jpg"
            };
    
            // Create a new User instance with the User data
            modifiedUser = new User(user);
            
        }

        // Send modified user data to the server
        sendData(modifiedUser,false);

        // Store the modified user in session storage and redirect to admin hub
        sessionStorage.setItem("targetUser", JSON.stringify(modifiedUser));
        window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

    }else{

        // Display error message and highlight invalid fields
        $('#mensageError').css('display', 'initial');
        
        if (!averagePassword) {
            $('#Pass').addClass('error');
            $('#Pass2').addClass('error');
        }
        
        if (!averageUser) {
            $('#User').addClass('error');
        }
        
        if (!averageName) {
            $('#Name').addClass('error');
        }
        
        if (!averageSurname) {
            $('#SureName').addClass('error');
        }
        
        if (!averageMail) {
            $('#Mail').addClass('error');
        }
        
        if (!averageIsTeacher) {
            $('#IsTeacher').addClass('error');
        }
        
        if (!averageDni) {
            $('#Dni').addClass('error');
        }
        
    }
    
}

/**
 * Function: verifyPassword
 * Description:
 * Verifies if the password follows a specific pattern.
 * 
 * Parameters: password (string) - The password to be verified.
 * 
 * Functionality:
 * - Uses a regular expression to check if the password meets the defined pattern.
 * - Returns true if the password matches the pattern, false otherwise.
 */
function verifyPassword(password) {

    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9_.*,+$-]+$/;

    // Checks if the password follows the pattern
    if (pattern.test(password)) {
        console.log("Password follow the pattern.");
        return true;
    } else {
        console.log("One or both passwords do not follow the pattern.");
        return false; // Passwords do not follow the pattern
    }
}

/**
 * Function: verifyData
 * Description:
 * Verifies if a given data element follows the specified regular expression pattern.
 * 
 * Parameters: 
 * - element (string) - The data to be verified.
 * - pattern (RegExp) - The regular expression pattern to match the element against.
 * 
 * Functionality:
 * - Uses a regular expression to check if the data matches the pattern.
 * - Returns true if the data matches the pattern, false otherwise.
 */
function verifyData(element,pattern) {

    // Checks if the data matches the provided pattern
    if (pattern.test(element)) {
        console.log("The data follows the pattern.");
        return true;
    } else {
        console.log("The data does not follow the pattern.");
        return false;
    }
}
