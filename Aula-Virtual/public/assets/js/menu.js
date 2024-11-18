/**
 * Function: loadMenu
 * Description:
 * Dynamically creates and loads the navigation menu into the page header.
 * The menu's content and structure are customized based on the `location` parameter 
 * and the `currentUser` object. The menu includes:
 * - A logo on the left
 * - Navigation links in the center
 * - A user profile section on the right
 * 
 * Parameters:
 * - currentUser: An object representing the current logged-in user, expected to have 
 *   methods `getImage()` for the profile image URL and `getName()`/`getSureName()` for the user's full name.
 * - location: A string indicating the current page or context, used to determine which 
 *   navigation links to display.
 */
function loadMenu(currentUser, location) {
    // Get the header element where the menu will be inserted
    let menuSrc = document.getElementById('header');
    
    // Create the left section for the logo
    let divLeft = document.createElement('div');
    divLeft.className = "logo";
    menuSrc.appendChild(divLeft);

    // Add the logo image to the left section
    let img = document.createElement('img');
    img.src = "/Aula-Virtual/public/assets/icons/logo.jpg";
    divLeft.appendChild(img);

    // Add text next to the logo image
    let logoText = document.createElement('span');
    logoText.className = "logo-text";
    logoText.textContent = "Academy";
    divLeft.appendChild(logoText);

    // Create the navigation bar
    let nav = document.createElement('nav');
    menuSrc.appendChild(nav);

    // Create an unordered list for navigation links
    let ulLinks = document.createElement('ul');
    ulLinks.className = "nav-links";
    nav.appendChild(ulLinks);

    // Add navigation links based on the current location
    if (location === "courses" || location == "adminDashboard") {

        // For "courses" or "adminDashboard", show a "Login" button
        let li = document.createElement('li');
        let loginLink = document.createElement('a');
        loginLink.href = "/Aula-Virtual/login/login.html";
        loginLink.className = "boton";
        loginLink.textContent = "Login";
        li.appendChild(loginLink);
        ulLinks.appendChild(li);

    }else if(location != "CRUD"){

        // For other pages, add a "Courses" button
        let li = document.createElement('li');
        let coursesLink = document.createElement('a');
        coursesLink.href = "/Aula-Virtual/public/view/commonViews/courses/courses.html";
        coursesLink.className = "boton";
        coursesLink.textContent = "Cursos";
        li.appendChild(coursesLink);
        ulLinks.appendChild(li);

        // If the location is "task", add a "Task List" button
        if (location === "task") {

            let taskLi = document.createElement('li');
            let taskLink = document.createElement('a');
            taskLink.href = "/Aula-Virtual/public/view/commonViews/coursesTasks/coursesTask.html";
            taskLink.className = "boton";
            taskLink.textContent = "Listado tareas";
            taskLi.appendChild(taskLink);
            ulLinks.appendChild(taskLi);

        }

    }else{

        // For "CRUD" location, show a "Control Panel" button
        let li = document.createElement('li');
        let coursesLink = document.createElement('a');
        coursesLink.href = "/Aula-Virtual/public/view/admin/admin-hub/admin.html";
        coursesLink.className = "boton";
        coursesLink.textContent = "Panel de control";
        li.appendChild(coursesLink);
        ulLinks.appendChild(li);

    } 

    // Create the right section for the user profile
    let divRight = document.createElement('div');
    divRight.className = "user-profile";
    menuSrc.appendChild(divRight);

    // Add the user's profile image to the right section
    let userImg = document.createElement('img');
    userImg.src = currentUser.getImage(); // Retrieve the image URL from the currentUser object
    divRight.appendChild(userImg);

    // Add the user's full name to the right of the profile image
    let userName = document.createElement('p');
    userName.textContent = currentUser.getName() + " " + currentUser.getSureName(); // Retrieve the name and surname
    divRight.appendChild(userName);
}