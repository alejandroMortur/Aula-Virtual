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
    if(status == 'done' || status == 'pending'){

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

        // Get divs for inject html
        let divHeader = document.getElementById("taskHeader");
        let divBody = document.getElementById("taskBody");
a
        let fieldset = document.createElement('fieldset');
        divHeader.appendChild(fieldset);

        let legend = document.createElement('legend');
        legend.innerHTML = "Datos nueva Tarea";
        fieldset.appendChild(legend);

        // Input for Task ID
        let taskLabel = document.createElement('label');
        taskLabel.htmlFor = "task_id";
        taskLabel.innerHTML = "Task ID:";
        fieldset.appendChild(taskLabel);

        let taskInput = document.createElement('input');
        taskInput.type = "number";
        taskInput.id = "task_id";
        taskInput.name = "task_id";
        taskInput.required = true;
        fieldset.appendChild(taskInput);

        // Input for Task Name
        let nameLabel = document.createElement('label');
        nameLabel.htmlFor = "name";
        nameLabel.innerHTML = "Task Name:";
        fieldset.appendChild(nameLabel);

        let nameInput = document.createElement('input');
        nameInput.type = "text";
        nameInput.id = "name";
        nameInput.name = "name";
        nameInput.required = true;
        fieldset.appendChild(nameInput);

        // Input for description
        let descLabel = document.createElement('label');
        descLabel.htmlFor = "description";
        descLabel.innerHTML = "Description:";
        fieldset.appendChild(descLabel);

        let descInput = document.createElement('textarea');
        descInput.id = "description";
        descInput.name = "description";
        descInput.required = true;
        fieldset.appendChild(descInput);

        // Input to Upload Date
        let dateLabel = document.createElement('label');
        dateLabel.htmlFor = "upload_date";
        dateLabel.innerHTML = "Upload Date:";
        fieldset.appendChild(dateLabel);

        let dateInput = document.createElement('input');
        dateInput.type = "date";
        dateInput.id = "upload_date";
        dateInput.name = "upload_date";
        dateInput.required = true;
        fieldset.appendChild(dateInput);

        // Form title
        let fileSectionHeader = document.createElement('h2');
        fileSectionHeader.innerHTML = "Upload Associated File";
        divBody.appendChild(fileSectionHeader);

        // Form to upload files
        let formBody = document.createElement('form');
        formBody.id = "fileForm";
        formBody.action = "/Aula-Virtual/server/main.php";
        formBody.method = "post";
        formBody.enctype = "multipart/form-data";  
        divBody.appendChild(formBody);

        // Add a hidden input for the file type (Solucion)
        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Enunciado";
        formBody.appendChild(inputType);

        // Add a hidden input for the max file size
        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000";
        formBody.appendChild(inputSize);

        // Input of file
        let fileInput = document.createElement('input');
        fileInput.type = "file";
        fileInput.name = "Files[]";
        fileInput.id = "file_uploader";
        fileInput.required = true;
        formBody.appendChild(fileInput);

        // Button to send file
        let submitButton = document.createElement('input');
        submitButton.type = "submit";
        submitButton.innerHTML = "Enviar";
        submitButton.name = "Enviar";
        submitButton.value = "Enviar";
        formBody.appendChild(submitButton);

        let resetButton = document.createElement('button');
        resetButton.type = "reset";
        resetButton.innerHTML = "Limpiar";
        formBody.appendChild(resetButton);

        // Event listener for form submission (file upload)
        formBody.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Create a new task object with the form data
            const taskData = {
                "course_id": parseInt(currentCourse.getId()),
                "task_id": parseInt(document.getElementById('task_id').value),
                "name": document.getElementById('name').value,
                "description": document.getElementById('description').value,
                "upload_date":  new Date()
            };
            
            // Create a new CoursesTask instance with the task data
            let newTask = new CoursesTask(taskData);
            
            // Send the modified task data for saving (false indicates this is not a removal)
            sendData(newTask,false);

            //Generate document date of the task
            const fileInput = document.getElementById('file_uploader'); // Get file input
            const file = fileInput.files[0]; // Reads First file

            sessionStorage.setItem("newTask", JSON.stringify("pending")); 

            if (!file) {
                alert("Por favor selecciona un archivo antes de enviar.");
                return;
            }

            const documentData = {
                document_id: 1, // ID of document
                task_id: parseInt(document.getElementById('task_id').value), // Id of task
                file_path: "\/Aula-Virtual\/public\/assets\/media\/enunciados\/"+file.name, // File Name
                type: "Enunciado",
                uploaded_at: new Date(),
                status: "done"
            };

            let newDocument = new Document(documentData);

            sendData(newDocument,false);
            formBody.submit(); // Submit the form programmatically
        });

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

        // Creates a form for load file
        let formBody = document.createElement('form');
        formBody.id = "fileForm";
        formBody.action = "/Aula-Virtual/server/main.php";
        formBody.method = "post";
        formBody.enctype = "multipart/form-data"; 
        divBody.appendChild(formBody);

        // Add a hidden input for the file type (Solucion)
        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Solucion";
        formBody.appendChild(inputType);

        // Add a hidden input for the max file size
        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000";
        formBody.appendChild(inputSize);

        // Input para el archivo
        let fileInput = document.createElement('input');
        fileInput.type = "file";
        fileInput.name = "Files[]";
        fileInput.id = "file_uploader";
        fileInput.required = true;
        formBody.appendChild(fileInput);

        // Button to send file
        let submitButton = document.createElement('input');
        submitButton.type = "submit";
        submitButton.innerHTML = "Enviar";
        submitButton.name = "Enviar";
        submitButton.value = "Enviar";
        formBody.appendChild(submitButton);

        let resetButton = document.createElement('button');
        resetButton.type = "reset";
        resetButton.innerHTML = "Limpiar";
        formBody.appendChild(resetButton);

        // Event listener for form submission (file upload)
        formBody.addEventListener('submit', async (event) => {
            event.preventDefault();

            //Generate document date of the task
            const fileInput = document.getElementById('file_uploader'); // Get file input
            const file = fileInput.files[0]; // Reads First file

            sessionStorage.setItem("newTask", JSON.stringify("notNew")); 

            if (!file) {
                alert("Por favor selecciona un archivo antes de enviar.");
                return;
            }

            const documentData = {
                "document_id": 2, // ID for solution
                "task_id": parseInt(currentTask.getTaskId()), // Id of task
                "file_path": "\/Aula-Virtual\/public\/assets\/media\/soluciones\/"+file.name, // File name
                "type": "Solucion",
                "uploaded_at": new Date(),
                "status": "done"
            };

            let newDocument = new Document(documentData);

            sendData(newDocument,false);
            formBody.submit(); // Submit the form programmatically
        });
        
    }

}
