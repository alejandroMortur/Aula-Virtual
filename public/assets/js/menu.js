function loadMenu(){

    let HTMLMenu = `<a href="./public/view/commonViews/aboutUs/aboutUs.html" class="boton">Sobre nosotros</a>
        <a href="./public/view/commonViews/courses/courses.html" class="boton">Cursos</a>
        <a href="./public/view/auth/login/login.html" class="boton">Login</a>
        <a href="./public/view/auth/register/register.html" class="boton">Registro</a>`;

        document.getElementById('menu').innerHTML += HTMLMenu;

}