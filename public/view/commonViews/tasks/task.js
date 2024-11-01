function createTaskHeader(task, documents, status) {
    // Get the header element by its ID
    let divHeader = document.getElementById('taskHeader');

    if (status == 'done') {
        // If the task is done, create and append the task name
        let title = document.createElement('h1');
        title.innerHTML = task.getName(); // Set the task name
        divHeader.appendChild(title);

        // Create and append the task description
        let description = document.createElement('p');
        description.innerHTML = task.getDescription(); // Set the task description
        divHeader.appendChild(description);

        // Create and append the delivery status
        let estado = document.createElement('p');
        estado.innerHTML = "Estado de la entrega: " + documents[0].documents[0].status; // Set delivery status
        divHeader.appendChild(estado);

        // Create and append a link to the uploaded file
        let enunciado = document.createElement('a');
        enunciado.id = "file__link";
        enunciado.href = documents[0].documents[0].file_path; // Set the file path
        const fileName = documents[0].documents[0].file_path.split('/').pop(); // Extract the file name from the path
        enunciado.innerHTML = fileName; // Set the link text to the file name
        divHeader.appendChild(enunciado);

    } else {
        // If the task is not done, create a form for file upload
        let form = document.createElement('form');
        form.id = "file__form";
        form.action = "/server/main.php"; // Set the form action to the server endpoint
        form.method = "post"; // Set the form method to POST
        form.enctype = "multipart/form-data"; // Specify the encoding type for file uploads
        form.target = "uploadTarget"; // Set target for the form submission
        divHeader.appendChild(form);

        // Create a paragraph for holding input elements
        let parrafo = document.createElement('p');
        form.appendChild(parrafo);

        // Hidden input for specifying the type of file being uploaded
        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Enunciado"; // Set type value to "Enunciado"
        parrafo.appendChild(inputType);

        // Hidden input for specifying the maximum file size
        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000"; // Set max file size to 70 MB
        parrafo.appendChild(inputSize);

        // Input for file selection
        let inputFile = document.createElement('input');
        inputFile.type = "file";
        inputFile.name = "Ficheros[]"; // Set the name for the file input
        inputFile.multiple = "multiple"; // Allow multiple file uploads
        parrafo.appendChild(inputFile);

        // Create another paragraph for the submit and reset buttons
        let parrafo2 = document.createElement('p');
        form.appendChild(parrafo2);

        // Create and append the submit button
        let submitButton = document.createElement('button');
        submitButton.type = "submit"; // Set button type to submit
        submitButton.name = "Enviar"; // Set button name
        submitButton.innerHTML = "Enviar"; // Set button text
        parrafo2.appendChild(submitButton);

        // Create and append the reset button
        let resetButton = document.createElement('button');
        resetButton.type = "reset"; // Set button type to reset
        resetButton.innerHTML = "Limpiar"; // Set button text
        parrafo2.appendChild(resetButton);
    }
}

function createTaskBody(documents, status) {
    // Get the body element by its ID
    let divBody = document.getElementById('taskBody');

    if (status == 'done') {
        // If the task is done, create and append the delivery date
        let estado = document.createElement('p');
        estado.innerHTML = "Fecha entrega: " + documents[0].documents[1].uploaded_at; // Set the delivery date
        divBody.appendChild(estado);

        // Create and append a link to the uploaded solution file
        let enunciado = document.createElement('a');
        enunciado.id = "file__link";
        enunciado.href = documents[0].documents[1].file_path; // Set the file path for the solution
        const fileName = documents[0].documents[1].file_path.split('/').pop(); // Extract the file name from the path
        enunciado.innerHTML = fileName; // Set the link text to the file name
        divBody.appendChild(enunciado);

    } else {
        // If the task is not done, create a form for file upload
        let form = document.createElement('form');
        form.id = "file__form";
        form.action = "/server/main.php"; // Set the form action to the server endpoint
        form.method = "post"; // Set the form method to POST
        form.enctype = "multipart/form-data"; // Specify the encoding type for file uploads
        form.target = "uploadTarget"; // Set target for the form submission
        divBody.appendChild(form);

        // Create a paragraph for holding input elements
        let parrafo = document.createElement('p');
        form.appendChild(parrafo);

        // Hidden input for specifying the type of file being uploaded
        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Solucion"; // Set type value to "Solucion"
        parrafo.appendChild(inputType);

        // Hidden input for specifying the maximum file size
        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000"; // Set max file size to 70 MB
        parrafo.appendChild(inputSize);

        // Input for file selection
        let inputFile = document.createElement('input');
        inputFile.type = "file";
        inputFile.name = "Ficheros[]"; // Set the name for the file input
        inputFile.multiple = "multiple"; // Allow multiple file uploads
        parrafo.appendChild(inputFile);

        // Create another paragraph for the submit and reset buttons
        let parrafo2 = document.createElement('p');
        form.appendChild(parrafo2);

        // Create and append the submit button
        let submitButton = document.createElement('button');
        submitButton.type = "submit"; // Set button type to submit
        submitButton.name = "Enviar"; // Set button name
        submitButton.innerHTML = "Enviar"; // Set button text
        parrafo2.appendChild(submitButton);

        // Create and append the reset button
        let resetButton = document.createElement('button');
        resetButton.type = "reset"; // Set button type to reset
        resetButton.innerHTML = "Limpiar"; // Set button text
        parrafo2.appendChild(resetButton);
    }
}
