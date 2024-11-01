function loadFooter() {
    // Get the footer element by its ID
    let footer = document.getElementById('footer');

    // Create a div for the license text
    let divTextoLicense = document.createElement('div');
    divTextoLicense.id = "license__block"; // Set the ID for styling or reference
    footer.appendChild(divTextoLicense); // Append the license block to the footer

    // Create a paragraph for the license message
    let licenceText = document.createElement('p');
    licenceText.innerHTML = "&copy; 2024 AlexDev. Todos los derechos reservados"; // Set the inner HTML for the copyright notice
    divTextoLicense.appendChild(licenceText); // Append the license text to the license block

    // Create a div for the external links
    let divTexto = document.createElement('div');
    divTexto.id = "links__block"; // Set the ID for styling or reference
    footer.appendChild(divTexto); // Append the links block to the footer

    // Create a paragraph for external links text
    let externalLinks = document.createElement('p');
    externalLinks.innerHTML = "Consejería de Educación, Ciencia y Universidades"; // Set the text for external links
    divTexto.appendChild(externalLinks); // Append the external links text to the links block

    // Create a div for government logos
    let div = document.createElement('div');
    div.id = "gob__block"; // Set the ID for styling or reference
    footer.appendChild(div); // Append the government logos block to the footer

    // Create an image for the education logo
    let EsImg = document.createElement('img');
    EsImg.src = "/public/assets/img/footer/educationLogo.png"; // Set the source for the education logo
    EsImg.id = "gob__card__es"; // Set the ID for styling or reference
    div.appendChild(EsImg); // Append the education logo to the government logos block

    // Create an image for the bilingual school logo
    let BilImg = document.createElement('img');
    BilImg.src = "/public/assets/img/footer/colegio-bilingue.png"; // Set the source for the bilingual school logo
    BilImg.id = "gob__card"; // Set the ID for styling or reference
    div.appendChild(BilImg); // Append the bilingual school logo to the government logos block

    // Create an image for the European logo
    let EuImg = document.createElement('img');
    EuImg.src = "/public/assets/img/footer/logo-Europea.png"; // Set the source for the European logo
    EuImg.id = "gob__card"; // Set the ID for styling or reference
    div.appendChild(EuImg); // Append the European logo to the government logos block
}
