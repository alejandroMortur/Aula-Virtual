class Loader {

    // Asynchronously loads user data from a JSON file
    async loadDataUser() {

        // Fetch user data from the specified JSON file
        let data = await fetch("/public/assets/json/users.json");
        // Parse the JSON data into a JavaScript object
        let users = await data.json();

        return users; // Return the parsed user data
    }

    // Asynchronously loads courses based on the user's course IDs
    async loadDataCourses(userCoursesId) {

        // Fetch course data from the specified JSON file
        let data = await fetch("/public/assets/json/courses.json");
        // Parse the JSON data into a JavaScript object
        let courses = await data.json();
        let filtratedCourses = []; // Array to hold filtered courses

        // Filter courses based on the user's course IDs
        courses.forEach(element => {
            if (userCoursesId.includes(element.id))
                filtratedCourses.push(element); // Add matching course to the filtered array
        });
        
        return filtratedCourses; // Return the filtered courses
        
    }

    // Asynchronously loads tasks associated with the user's courses
    async loadDataCoursesTasks(userCoursesId) {

        // Fetch course tasks from the specified JSON file
        let data = await fetch("/public/assets/json/coursesTask.json");
        // Parse the JSON data into a JavaScript object
        let coursesTask = await data.json();
        let taskData = []; // Array to hold task data

        // Iterate through course tasks and filter based on course IDs
        coursesTask.forEach(element => {
            if (element['course_id'] == userCoursesId) {
                // If course ID matches, iterate through tasks
                element['tasks'].forEach(data => {
                    let courseTask = new CoursesTask(data); // Create a new CoursesTask object
                    taskData.push(courseTask); // Add task to the task data array
                });
            }
        });

        return taskData; // Return the array of course tasks

    }

    // Asynchronously loads documents associated with a user's task
    async loadDocumentCoursesTasks(userTaskId) {

        // Fetch documents from the specified JSON file
        let data = await fetch("/public/assets/json/documents.json");
        // Parse the JSON data into a JavaScript object
        let documents = await data.json();
        let documentsData = []; // Array to hold documents data

        // Filter documents based on the task ID
        documents.forEach(element => {
            if (element['task_id'] == userTaskId)
                documentsData.push(element); // Add matching document to the documents data array
        });

        return documentsData; // Return the array of documents

    }
}
