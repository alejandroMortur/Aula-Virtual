function loadFooter(){

    let footer = document.getElementById('footer');

    let div = document.createElement('div');
    div.id="gob__block";
    footer.appendChild(div);

    let EsImg = document.createElement('img');
    EsImg.src = "/public/assets/img/footer/educationLogo.png"
    EsImg.id = "gob__card__es";
    div.appendChild(EsImg);

    let BilImg = document.createElement('img');
    BilImg.src = "/public/assets/img/footer/colegio-bilingue.png";
    BilImg.id = "gob__card";
    div.appendChild(BilImg);

    let EuImg = document.createElement('img');
    EuImg.src = "/public/assets/img/footer/logo-Europea.png";
    EuImg.id = "gob__card";
    div.appendChild(EuImg);

}