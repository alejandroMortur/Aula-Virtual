function addValuesToUpload(parentTask){

    let form = document.getElementById("file__form");
    let input = document.createElement('input');
    input.type = "hidden";
    input.name = "taskId";
    input.value = parentTask.getTaskId();
    form.appendChild(input); 

}