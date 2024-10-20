function loadMenu(currentUser){

    let Fullname = currentUser.Name+" "+currentUser.SureName;

    let HTMLMenu = `
                    <header>
                    <div id="Left">
                        <img src="/public/assets/icons/logo.jpg">
                        <nav>
                            <ul>
                                <li>
                                    <a href="/public/view/commonViews/courses/courses.html" class="boton">Cursos</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div id="Right">
                        <img id="profilePicture" src="${currentUser.Image}"><p>${Fullname}</p>
                    </div>
                    </header>
                    `;

        document.getElementById('menu').innerHTML += HTMLMenu;




}