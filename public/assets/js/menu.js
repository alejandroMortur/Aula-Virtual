function loadMenu(currentUser, location) {

    // Main element where the menu will be inserted
    let menuSrc = document.getElementById('header');
    
    // Create the logo container on the left
    let divLeft = document.createElement('div');
    divLeft.className = "logo";
    menuSrc.appendChild(divLeft);

    // Add logo image inside the left container
    let img = document.createElement('img');
    img.src = "/public/assets/icons/logo.jpg";
    divLeft.appendChild(img);

    // Add text next to the logo image
    let logoText = document.createElement('span');
    logoText.className = "logo-text";
    logoText.textContent = "Academy";
    divLeft.appendChild(logoText);

    // Create navigation bar
    let nav = document.createElement('nav');
    menuSrc.appendChild(nav);

    // Create list of navigation links
    let ulLinks = document.createElement('ul');
    ulLinks.className = "nav-links";
    nav.appendChild(ulLinks);

    // Check the value of location and add navigation links
    if (location === "courses") {

        // If the location is "courses", only show the "Login" link
        let li = document.createElement('li');
        let loginLink = document.createElement('a');
        loginLink.href = "/login/login.html";
        loginLink.className = "boton";
        loginLink.textContent = "Login";
        li.appendChild(loginLink);
        ulLinks.appendChild(li);
    }else{

        // If the location is not "courses", add the "Courses" link
        let li = document.createElement('li');
        let coursesLink = document.createElement('a');
        coursesLink.href = "/public/view/commonViews/courses/courses.html";
        coursesLink.className = "boton";
        coursesLink.textContent = "Cursos";
        li.appendChild(coursesLink);
        ulLinks.appendChild(li);


        // If the location is "task", add the additional link for "Task List"
        if (location === "task") {
            let taskLi = document.createElement('li');
            let taskLink = document.createElement('a');
            taskLink.href = "/public/view/commonViews/coursesTasks/coursesTask.html";
            taskLink.className = "boton";
            taskLink.textContent = "Listado tareas";
            taskLi.appendChild(taskLink);
            ulLinks.appendChild(taskLi);
        }

    } 

    // Create the user container on the right
    let divRight = document.createElement('div');
    divRight.className = "user-profile";
    menuSrc.appendChild(divRight);

    // Add user image on the right side
    let userImg = document.createElement('img');
    userImg.src = currentUser.getImage(); // User's image
    divRight.appendChild(userImg);

    // Add the full name of the user to the right of the image
    let userName = document.createElement('p');
    userName.textContent = currentUser.getName() + " " + currentUser.getSureName();
    divRight.appendChild(userName);
}
