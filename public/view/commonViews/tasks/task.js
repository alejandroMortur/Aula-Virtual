function createTaskHeader(task,documents,status){

    let divHeader = document.getElementById('header');

    if(status == 'done'){

        let title  = document.createElement('h1');
        title.innerHTML = task.getName();
        divHeader.appendChild(title);
    
        let description  = document.createElement('p');
        description.innerHTML = task.getDescription();
        divHeader.appendChild(description);
    
        let estado  = document.createElement('p');
        estado.innerHTML = "Estado de la entrega: "+documents[0].documents[0].status;
        divHeader.appendChild(estado);
    
        let enunciado = document.createElement('a');
        enunciado.id = "file__link";
        enunciado.href = documents[0].documents[0].file_path;
        const fileName = documents[0].documents[0].file_path.split('/').pop();
        enunciado.innerHTML = fileName;
        divHeader.appendChild(enunciado);

    }else{

        let form = document.createElement('form');
        form.id = "file__form";
        form.action="/server/main.php";
        form.method="post"
        form.enctype="multipart/form-data";
        form.target="uploadTarget";
        divHeader.appendChild(form);

        let parrafo = document.createElement('p');
        form.appendChild(parrafo);

        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Enunciado";
        parrafo.appendChild(inputType);

        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000";
        parrafo.appendChild(inputSize);

        let inputFile = document.createElement('input');
        inputFile.type = "file";
        inputFile.name = "Ficheros[]";
        inputFile.multiple = "multiple";
        parrafo.appendChild(inputFile);

        let parrafo2 = document.createElement('p');
        form.appendChild(parrafo2);

        let submitButton = document.createElement('button');
        submitButton.type = "submit";
        submitButton.name = "Enviar";
        submitButton.innerHTML = "Enviar";
        parrafo2.appendChild(submitButton);

        let resetButton = document.createElement('button');
        resetButton.type = "reset";
        resetButton.innerHTML = "Limpiar";
        parrafo2.appendChild(resetButton);

    }

}


function createTaskBody(documents,status){

    let divBody = document.getElementById('body');

    if(status == 'done'){

        let estado  = document.createElement('p');
        estado.innerHTML = "Fecha entrega: "+documents[0].documents[1].uploaded_at;
        divBody.appendChild(estado);

        let enunciado = document.createElement('a');
        enunciado.id = "file__link";
        enunciado.href = documents[0].documents[1].file_path;
        const fileName = documents[0].documents[1].file_path.split('/').pop();
        enunciado.innerHTML = fileName;
        divBody.appendChild(enunciado);

    }else{

        let form = document.createElement('form');
        form.id = "file__form";
        form.action="/server/main.php";
        form.method="post"
        form.enctype="multipart/form-data";
        form.target="uploadTarget";
        divBody.appendChild(form);

        let parrafo = document.createElement('p');
        form.appendChild(parrafo);

        let inputType = document.createElement('input');
        inputType.type = "hidden";
        inputType.name = "type";
        inputType.value = "Solucion";
        parrafo.appendChild(inputType);

        let inputSize = document.createElement('input');
        inputSize.type = "hidden";
        inputSize.name = "MAX_FILE_SIZE";
        inputSize.value = "70000000";
        parrafo.appendChild(inputSize);

        let inputFile = document.createElement('input');
        inputFile.type = "file";
        inputFile.name = "Ficheros[]";
        inputFile.multiple = "multiple";
        parrafo.appendChild(inputFile);

        let parrafo2 = document.createElement('p');
        form.appendChild(parrafo2);

        let submitButton = document.createElement('button');
        submitButton.type = "submit";
        submitButton.name = "Enviar";
        submitButton.innerHTML = "Enviar";
        parrafo2.appendChild(submitButton);

        let resetButton = document.createElement('button');
        resetButton.type = "reset";
        resetButton.innerHTML = "Limpiar";
        parrafo2.appendChild(resetButton);

    }

}

