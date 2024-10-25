function loadMenu(currentUser){

    let menuSrc = document.getElementById('menu');
    let Fullname = currentUser.Name+" "+currentUser.SureName;

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

    let ul = document.createElement(`ul`);
    nav.appendChild(ul);

    let li = document.createElement(`li`);
    ul.appendChild(li);

    let coursesSrc = document.createElement('a');
    coursesSrc.href ="/public/view/commonViews/courses/courses.html"
    coursesSrc.className ="boton"
    coursesSrc.innerHTML = "Cursos"
    li.appendChild(coursesSrc)

    let divRight = document.createElement('div');
    divRight.id = "Right";
    header.appendChild(divRight);

    let UserImg = document.createElement('img');
    UserImg.src = currentUser.Image;
    divRight.appendChild(UserImg);

    let UserName = document.createElement('p');
    UserName.innerHTML = Fullname;
    divRight.appendChild(UserName);

}