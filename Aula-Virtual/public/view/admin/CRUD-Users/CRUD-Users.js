let state = "";
function loadUserData(currentState){

    $('#UserName').val(targetUser.getUserName());
    $('#Name').val(targetUser.getName());
    $('#SureName').val(targetUser.getSureName());
    $('#DNI').val(targetUser.getDNI());
    $('#password').val(targetUser.getpassword());
    if(targetUser.getIsTeacher() == 1)
        $('#IsTeacher').prop('checked', true);
    $('#Mail').val(targetUser.getMail());

    $('input[name="registration[]"]').each((index, element) => {
        if (targetUser.getRegistration().includes(parseInt($(element).val()))) {
            $(element).prop('checked', true);
        }
    });

    $('#user_Img').attr("src",targetUser.getImage());
    $('#userName_text').html(targetUser.getUserName());
    $('#userDNI_text').html(targetUser.getDNI());

    state = currentState;
}

function saveChanges() {
    
    event.preventDefault();

    let expresions = [
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ.0-9]+$/, // Username
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/, // Name
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+([' '][A-Za-zÁÉÍÓÚáéíóúñÑ]+){0,1}$/, // SureName
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9._%+-]+@(educa|gmail|hotmail)\.academy\.(org|com|es|lok)$/, // Email
        /^(true|false)$/, // isTeacher (true , false)
        /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$/ // DNI
    ];

    const selectedRegistrations = $('input[name="registration[]"]:checked').map((index, element) => {
        return parseInt($(element).val());
    }).get();

    let averagePassword = verifyPassword($('#password').val());
    let averageUser = verifyData($('#UserName').val(), expresions[0]);
    let averageName = verifyData($('#Name').val(), expresions[1]);
    let averageSurname = verifyData($('#SureName').val(), expresions[2]);
    let averageMail = verifyData( $('#Mail').val(), expresions[3]);
    let averageIsTeacher = verifyData($('#IsTeacher').prop('checked'), expresions[4]);
    let averageDni = verifyData($('#DNI').val(), expresions[5]);

    if (averagePassword && averageUser && averageName && averageSurname && averageMail && averageIsTeacher && averageDni) {

        let modifiedUser = "";
        event.preventDefault();

        if (state == "notNewObject") {

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
    
            modifiedUser = new User(user);
            
        }else{

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
    
            modifiedUser = new User(user);
            
        }

        sendData(modifiedUser,false);

        sessionStorage.setItem("targetUser", JSON.stringify(modifiedUser));
        window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";

    }else{

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

function removeElement(){

    alert("Usuario eliminado con exito");
    console.log(targetUser);
    sendData(targetUser,true);

    window.location.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html"; 

}


/*
    Function that verifies if both passwords are equal. In the future,
    it will verify if the password meets all security requirements.
*/
function verifyPassword(password) {

    const pattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9_.*,+$-]+$/;

    // Checks passwords follow the pattern
    if (pattern.test(password)) {
        console.log("Password follow the pattern.");
        return true;
    } else {
        console.log("One or both passwords do not follow the pattern.");
        return false; // Passwords do not follow the pattern
    }
}

/*
    Function that verifies if the username meets all security requirements.
*/
function verifyData(element,pattern) {

    // Checks if the "user" string follows the pattern
    if (pattern.test(element)) {
        console.log("The data follows the pattern.");
        return true;
    } else {
        console.log("The data does not follow the pattern.");
        return false;
    }
}
