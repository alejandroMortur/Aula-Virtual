// Function to filter the courses
function filterCourses() {
    var title = $("#course-title").val(); // Get the course title input value

    // Filter the courses based on the title
    var filteredCourses = [];
    for (var i = 0; i < coursesList.length; i++) {
        // Check if the course title includes the user input
        if (coursesList[i].getTitle().indexOf(title) !== -1) {
            filteredCourses.push(coursesList[i]); // Add the course to the filtered list if it matches
        }
    }

    // Sort the filtered courses if necessary
    var selectedValue = $("#course-sort").val(); // Get the selected sort option
    if (selectedValue === "Ascendente") { // If the sort option is Ascending
        filteredCourses.sort(function(a, b) {
            if (a.getTitle() > b.getTitle()) return 1; // Sort in ascending order
            return -1;
        });
    } else if (selectedValue === "Descendente") { // If the sort option is Descending
        filteredCourses.sort(function(a, b) {
            if (b.getTitle() > a.getTitle()) return 1; // Sort in descending order
            return -1;
        });
    }

    // Call the function to draw the filtered courses
    allCoursesCardBuilder(filteredCourses);
}

// Function to filter the users
function filterUsers() {
    var username = $("#user-username").val(); // Get the username input value
    var name = $("#user-name").val(); // Get the name input value
    var surname = $("#user-surname").val(); // Get the surname input value

    // Filter the users based on username, name, and surname
    var filteredUsers = [];
    for (var i = 0; i < usersList.length; i++) {
        // Check if the user information matches the input values
        if (usersList[i].getUserName().indexOf(username) !== -1 &&
            usersList[i].getName().indexOf(name) !== -1 &&
            usersList[i].getSureName().indexOf(surname) !== -1) {
            filteredUsers.push(usersList[i]); // Add the user to the filtered list if they match
        }
    }

    // Call the function to draw the filtered users
    allUsersCardBuilder(filteredUsers);
}

// Function to filter the tasks
function filterCoursesTasks() {
    var taskName = $("#task-name").val(); // Get the task name input value

    // Filter the tasks based on the task name
    var filteredTasks = [];
    for (var i = 0; i < taskList.length; i++) {
        // Check if the task name matches the input
        if (taskList[i].getName().indexOf(taskName) !== -1) {
            filteredTasks.push(taskList[i]); // Add the task to the filtered list if it matches
        }
    }

    // Sort the filtered tasks if necessary
    var selectedValue = $("#task-sort").val(); // Get the selected sort option
    if (selectedValue === "Ascendente") { // If the sort option is Ascending
        filteredTasks.sort(function(a, b) {
            if (a.getName() > b.getName()) return 1; // Sort in ascending order
            return -1;
        });
    } else if (selectedValue === "Descendente") { // If the sort option is Descending
        filteredTasks.sort(function(a, b) {
            if (b.getName() > a.getName()) return 1; // Sort in descending order
            return -1;
        });
    }

    // Call the function to draw the filtered tasks
    allTaskCardBuilder(filteredTasks);
}

// Function to filter the documents
function filterDocuments() {
    var documentType = $("#document-type").val(); // Get the document type input value
    var documentTask = $("#document-task").val(); // Get the task ID for the document

    // Filter the documents based on type and task ID
    var filteredDocuments = [];
    for (var i = 0; i < documentList.length; i++) {
        // Check if the document type and task ID match the input values
        if ((documentType === "" || documentList[i].type === documentType) &&
            (documentTask === "" || documentList[i].task_id == documentTask)) {
            filteredDocuments.push(documentList[i]); // Add the document to the filtered list if it matches
        }
    }

    // Sort the filtered documents if necessary
    var selectedValue = $("#document-sort").val(); // Get the selected sort option
    if (selectedValue === "Ascendente") { // If the sort option is Ascending
        filteredDocuments.sort(function(a, b) {
            if (a.getType() > b.getType()) return 1; // Sort in ascending order
            return -1;
        });
    } else if (selectedValue === "Descendente") { // If the sort option is Descending
        filteredDocuments.sort(function(a, b) {
            if (b.getType() > a.getType()) return 1; // Sort in descending order
            return -1;
        });
    }

    // Call the function to draw the filtered documents
    allDocumentCardBuilder(filteredDocuments);
}