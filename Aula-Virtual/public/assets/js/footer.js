function loadFooter(){

    let footer = document.getElementById('footer');

    let divTextoLicense = document.createElement('div');
    divTextoLicense.id="license__block";
    footer.appendChild(divTextoLicense);

    let licenceText = document.createElement('p');
    licenceText.innerHTML= "&copy; 2024 AlexDev. Todos los derechos reservados"
    divTextoLicense.appendChild(licenceText );

    let divTexto = document.createElement('div');
    divTexto.id="links__block";
    footer.appendChild(divTexto);

    let externalLinks = document.createElement('a');
    externalLinks.id="footer_link";
    externalLinks.innerHTML= "Consejería de Educación, Ciencia y Universidades "
    externalLinks.href = "https://www.comunidad.madrid/transparencia/unidad-organizativa-responsable/consejeria-educacion-ciencia-y-universidades";
    divTexto.appendChild(externalLinks);

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
    EuImg.src = "/Aula-Virtual/public/assets/img/footer/logo-Europea.png";
    EuImg.id = "gob__card";
    div.appendChild(EuImg);

}