function loadMenu(currentUser,location){

    let menuSrc = document.getElementById('menu');
    let Fullname = currentUser.getName()+" "+currentUser.getSureName();

    let header = document.createElement('header');
    menuSrc.appendChild(header);

    let divLeft = document.createElement('div');
    divLeft.id = "Left";
    header.appendChild(divLeft);

    let img = document.createElement('img');
    img.src ="/public/assets/icons/logo.jpg";
    divLeft.appendChild(img);

    let nav = document.createElement('nav');
    divLeft.appendChild(nav);

    if(location == "courses"){

        let ul = document.createElement(`ul`);
        nav.appendChild(ul);
    
        let li = document.createElement(`li`);
        ul.appendChild(li);
    
        let coursesSrc = document.createElement('a');
        coursesSrc.href ="/login/login.html"
        coursesSrc.className ="boton"
        coursesSrc.innerHTML = "Login"
        li.appendChild(coursesSrc)
    
    }else{{

        let ulButtons = document.createElement(`ul`);
        nav.appendChild(ulButtons);
    
        let liCourses = document.createElement(`li`);
        ulButtons.appendChild(liCourses);
    
        let coursesSrc = document.createElement('a');
        coursesSrc.href ="/public/view/commonViews/courses/courses.html"
        coursesSrc.className ="boton"
        coursesSrc.innerHTML = "Cursos"
        liCourses.appendChild(coursesSrc)
    
        if(location == "task"){

            let litask = document.createElement(`li`);
            ulButtons.appendChild(litask);
    
            let coursesSrc2 = document.createElement('a');
            coursesSrc2.href ="/public/view/commonViews/coursesTasks/coursesTask.html";
            coursesSrc2.className ="boton"
            coursesSrc2.innerHTML = "Listado tareas curso"
            litask.appendChild(coursesSrc2)
    
        }

    }}

    let divRight = document.createElement('div');
    divRight.id = "Right";
    header.appendChild(divRight);

    let UserImg = document.createElement('img');
    UserImg.src = currentUser.getImage();
    divRight.appendChild(UserImg);

    let UserName = document.createElement('p');
    UserName.innerHTML = Fullname;
    divRight.appendChild(UserName);

}