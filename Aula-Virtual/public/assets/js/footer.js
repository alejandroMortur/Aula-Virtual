// Function to dynamically load and populate the footer content
function loadFooter(){

    // Get the footer element by its ID
    let footer = document.getElementById('footer');

    // Create a new div to hold the license text
    let divTextoLicense = document.createElement('div');
    divTextoLicense.id="license__block"; // Set the ID of the div for Css
    footer.appendChild(divTextoLicense);

    // Create a paragraph for the license text
    let licenceText = document.createElement('p');
    licenceText.innerHTML= "&copy; 2024 AlexDev. Todos los derechos reservados"
    divTextoLicense.appendChild(licenceText );

    // Create a new div to hold external links
    let divTexto = document.createElement('div');
    divTexto.id="links__block"; // Set the ID of the div for Css
    footer.appendChild(divTexto);

    // Create an a element for an external link
    let externalLinks = document.createElement('a');
    externalLinks.id="footer_link"; // Set the ID of the anchor element for Css
    externalLinks.innerHTML= "Consejería de Educación, Ciencia y Universidades "
    externalLinks.href = "https://www.comunidad.madrid/transparencia/unidad-organizativa-responsable/consejeria-educacion-ciencia-y-universidades";
    divTexto.appendChild(externalLinks);

    // Create a new div to hold government-related logos
    let div = document.createElement('div');
    div.id="gob__block"; // Set the ID of the div for Css
    footer.appendChild(div);

    // Create an image for the Spanish government logo
    let EsImg = document.createElement('img');
    EsImg.src = "/public/assets/img/footer/educationLogo.png"
    EsImg.id = "gob__card__es"; // Set the ID of the image for Css (diferent Id because of the width of de img)
    div.appendChild(EsImg);

    // Create an image for the bilingual school logo
    let BilImg = document.createElement('img');
    BilImg.src = "/public/assets/img/footer/colegio-bilingue.png";
    BilImg.id = "gob__card"; // Set the ID of the image for Css
    div.appendChild(BilImg);

    // Create an image for the European Union logo
    let EuImg = document.createElement('img');
    EuImg.src = "/Aula-Virtual/public/assets/img/footer/logo-Europea.png";
    EuImg.id = "gob__card"; // Set the ID of the image for Css
    div.appendChild(EuImg);

}