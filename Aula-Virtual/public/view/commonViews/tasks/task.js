/**
 * Function: createTaskHeader
 * Description:
 * Creates the header for the task page based on the task's status. If the task is marked as "done", 
 * it displays the task name, description, delivery status, and a link to the uploaded file. If the task 
 * is not done, it provides a form for uploading a file.
 * 
 * Parameters:
 * - task: The task object containing the name and description of the task.
 * - documents: An array of document objects associated with the task.
 * - status: A string indicating the task's current status ("done" or other).
 */
function createTaskHeader(task,documents,status){

    // Get the container for the task header
    let divHeader = document.getElementById('taskHeader');

    // If the task is done, display its details
    if(status == 'done'){

        // Create and append the task name as an <h1> element
        let title  = document.createElement('h1');
        title.innerHTML = task.getName();
        divHeader.appendChild(title);
    
        // Create and append the task description as a <p> element
        let description  = document.createElement('p');
        description.innerHTML = task.getDescription();
        divHeader.appendChild(description);
    
        // Create and append the status of the delivery as a <p> element
        let estado  = document.createElement('p');
        estado.innerHTML = "Estado de la entrega: "+documents[0].getStatus();
        divHeader.appendChild(estado);
    
        // Create and append the link to the file associated with the task
        let enunciado = document.createElement('a');
        enunciado.id = "file__link";
        enunciado.href = documents[0].getFile_path();
        const fileName = documents[0].getFile_path().split('/').pop();  // Extract file name
        enunciado.innerHTML = fileName; 
        divHeader.appendChild(enunciado);

    }else{ // If the task is not done, provide a form to submit files

        // Create the form for file submission
        let form = document.createElement('form');
        form.id = "file__form";
        form.action="/Aula-Virtual/server/main.php";
        form.method="post"
        form.enctype="multipart/form-data";
        form.target="uploadTarget";
        divHeader.appendChild(form);

        // Create and append a <p> element for hidden input elements
        let parrafo = document.createElement('p');
        form.appendChild(parrafo);

        // Add a hidden input for the file type (Enunciado)
        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Enunciado";
        parrafo.appendChild(inputType);

        // Add a hidden input for the max file size
        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000";
        parrafo.appendChild(inputSize);

        // Add a file input element for uploading files
        let inputFile = document.createElement('input');
        inputFile.type = "file";
        inputFile.id="file_uploader";
        inputFile.name = "Ficheros[]"; 
        inputFile.multiple = "multiple"; // Allow multiple file uploads
        parrafo.appendChild(inputFile);

        // Create and append a second <p> element for the submit and reset buttons
        let parrafo2 = document.createElement('p');
        form.appendChild(parrafo2);

        // Add a submit button to the form
        let submitButton = document.createElement('button');
        submitButton.type = "submit";
        submitButton.name = "Enviar";
        submitButton.innerHTML = "Enviar";
        parrafo2.appendChild(submitButton);

        // Add a reset button to the form
        let resetButton = document.createElement('button');
        resetButton.type = "reset";
        resetButton.innerHTML = "Limpiar";
        parrafo2.appendChild(resetButton);

    }

}

/**
 * Function: createTaskBody
 * Description:
 * Creates the body for the task page based on the task's status. If the task is marked as "done", 
 * it displays the file's upload date and a link to the file. If the task is not done, it provides a form 
 * for uploading a solution file.
 * 
 * Parameters:
 * - documents: An array of document objects associated with the task.
 * - status: A string indicating the task's current status ("done" or other).
 */
function createTaskBody(documents,status){

    // Get the container for the task body
    let divBody = document.getElementById('taskBody');

    // If the task is done, display the file details
    if(status == 'done'){

        // Create and append the delivery date as a <p> element
        let estado  = document.createElement('p');
        estado.innerHTML = "Fecha entrega: "+documents[1].getUploaded_at();
        divBody.appendChild(estado);

        // Create and append the link to the uploaded file
        let enunciado = document.createElement('a');
        enunciado.id = "file__link";
        enunciado.href = documents[1].getFile_path();
        const fileName = documents[1].getFile_path().split('/').pop();
        enunciado.innerHTML = fileName;
        divBody.appendChild(enunciado);

    }else{ // If the task is not done, provide a form to submit files

        // Create the form for file submission
        let form = document.createElement('form');
        form.id = "file__form";
        form.action="/Aula-Virtual/server/main.php";
        form.method="post"
        form.enctype="multipart/form-data";
        form.target="uploadTarget";
        divBody.appendChild(form);

        // Create and append a <p> element for hidden input elements
        let parrafo = document.createElement('p');
        form.appendChild(parrafo);

        // Add a hidden input for the file type (Solucion)
        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Solucion";
        parrafo.appendChild(inputType);

        // Add a hidden input for the max file size
        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000";
        parrafo.appendChild(inputSize);

        // Add a file input element for uploading files
        let inputFile = document.createElement('input');
        inputFile.type = "file";
        inputFile.id="file_uploader";
        inputFile.name = "Ficheros[]";
        parrafo.appendChild(inputFile);

        // Create and append a second <p> element for the submit and reset buttons
        let parrafo2 = document.createElement('p');
        form.appendChild(parrafo2);

        // Add a submit button to the form
        let submitButton = document.createElement('button');
        submitButton.type = "submit";
        submitButton.name = "Enviar";
        submitButton.innerHTML = "Enviar";
        parrafo2.appendChild(submitButton);
        
        // Add a reset button to the form
        let resetButton = document.createElement('button');
        resetButton.type = "reset";
        resetButton.innerHTML = "Limpiar";
        parrafo2.appendChild(resetButton);

    }

}