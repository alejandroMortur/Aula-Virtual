function loadMenu(currentUser, location) {
    // Elemento principal donde se insertará el menú
    let menuSrc = document.getElementById('header');
    
    // Crear el contenedor del logo en la izquierda
    let divLeft = document.createElement('div');
    divLeft.className = "logo";
    menuSrc.appendChild(divLeft);

    // Agregar imagen del logo dentro del contenedor izquierdo
    let img = document.createElement('img');
    img.src = "/public/assets/icons/logo.jpg";
    divLeft.appendChild(img);

    // Agregar texto al lado de la imagen del logo
    let logoText = document.createElement('span');
    logoText.className = "logo-text";
    logoText.textContent = "Academy";
    divLeft.appendChild(logoText);

    // Crear barra de navegación
    let nav = document.createElement('nav');
    menuSrc.appendChild(nav);

    // Crear lista de enlaces de navegación
    let ulLinks = document.createElement('ul');
    ulLinks.className = "nav-links";
    nav.appendChild(ulLinks);

    // Verificar el valor de location y agregar enlaces de navegación
    if (location === "courses" || location == "adminDashboard") {
        // Si la ubicación es "courses", solo se muestra el enlace "Login"
        let li = document.createElement('li');
        let loginLink = document.createElement('a');
        loginLink.href = "/login/login.html";
        loginLink.className = "boton";
        loginLink.textContent = "Login";
        li.appendChild(loginLink);
        ulLinks.appendChild(li);
    }else{

        // Si la ubicación es "courses", solo se muestra el enlace "Login"
        let li = document.createElement('li');
        let coursesLink = document.createElement('a');
        coursesLink.href = "/public/view/commonViews/courses/courses.html";
        coursesLink.className = "boton";
        coursesLink.textContent = "Cursos";
        li.appendChild(coursesLink);
        ulLinks.appendChild(li);

        // Si la ubicación es "task", agregar el enlace adicional de "Listado tareas curso"
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

    // Crear el contenedor del usuario en la derecha
    let divRight = document.createElement('div');
    divRight.className = "user-profile";
    menuSrc.appendChild(divRight);

    // Agregar imagen del usuario en el lado derecho
    let userImg = document.createElement('img');
    userImg.src = currentUser.getImage(); // Imagen del usuario
    divRight.appendChild(userImg);

    // Agregar el nombre completo del usuario a la derecha de la imagen
    let userName = document.createElement('p');
    userName.textContent = currentUser.getName() + " " + currentUser.getSureName();
    divRight.appendChild(userName);
}
