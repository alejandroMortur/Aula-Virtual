/*
    Loader Class:
    This class is responsible for fetching and managing data from various JSON files. 
    It provides asynchronous methods to load user data, course data, tasks, documents, and exams. 
    The data is fetched from static JSON files located in the application's assets folder.
    The methods also allow filtering of data based on specific criteria, such as user or course IDs.
*/
class Loader{

    /*
        Method: loadDataUser
        Description: 
        Fetches the user data from the "users.json" file and parses it into JSON format.
        Returns: 
        An array of user objects.
    */
    async loadDataUser() {

        let data = await fetch("/Aula-Virtual/public/assets/json/users.json");
        let users = await data.json();

        return users
    
    }

    /*
        Method: loadDataCourses
        Description: 
        Fetches the courses data from the "courses.json" file, filters it based on the provided 
        array of user course IDs, and returns only the matching courses.
        Parameters: 
        - userCoursesId: An array of course IDs associated with the user.
        Returns: 
        An array of course objects that match the user's courses.
    */
    async loadDataCourses(userCoursesId) {

        let data = await fetch("/Aula-Virtual/public/assets/json/courses.json");
        let courses = await data.json();
        let filtratedCourses = []

        // Filters courses based on userCoursesId
        courses.forEach(element => {
            if (userCoursesId.includes(element.id))
                filtratedCourses.push(element);
        });
        
        return filtratedCourses
    
    }

    /*
        Method: loadAllDataCourses
        Description: 
        Fetches all the courses data from the "courses.json" file without any filtering.
        Returns: 
        An array of all course objects.
    */
    async loadAllDataCourses() {

        let data = await fetch("/Aula-Virtual/public/assets/json/courses.json");
        let filtratedCourses = await data.json();

        return filtratedCourses
    
    }

    /*
        Method: loadDataCoursesTasks
        Description: 
        Fetches the tasks data from the "coursesTask.json" file and filters it based on a specific course ID.
        Parameters: 
        - userCoursesId: The ID of the course whose tasks are to be retrieved.
        Returns: 
        An array of task objects related to the specified course.
    */
    async loadDataCoursesTasks(userCoursesId) {

        let data = await fetch("/Aula-Virtual/public/assets/json/coursesTask.json");
        let coursesTask = await data.json();
        let taskData = [];

        // Filters tasks based on the course ID
        coursesTask.forEach(element => {
            
            if(element['course_id'] == userCoursesId){
                    taskData.push(element);
            }
            
        });

        return taskData;

    }

    /*
        Method: loadAllDataCoursesTasks
        Description: 
        Fetches all the tasks data from the "coursesTask.json" file without any filtering.
        Returns: 
        An array of all task objects.
    */
    async loadAllDataCoursesTasks() {

        let data = await fetch("/Aula-Virtual/public/assets/json/coursesTask.json");
        let taskData = await data.json();

        return taskData;

    }

    /*
        Method: loadDocumentCoursesTasks
        Description: 
        Fetches the document data from the "documents.json" file and filters it based on a specific task ID.
        Parameters: 
        - userTaskId: The ID of the task whose documents are to be retrieved.
        Returns: 
        An array of document objects related to the specified task.
    */
    async loadDocumentCoursesTasks(userTaskId) {

        let data = await fetch("/Aula-Virtual/public/assets/json/documents.json");
        let documents = await data.json();
        let documentsData = [];

        // Filters documents based on the task ID
        documents.forEach(element => {
            if(element['task_id'] == userTaskId)
                documentsData.push(element);
        });

        return documentsData;

    }

    /*
        Method: loadAllDocumentCoursesTasks
        Description: 
        Fetches all the document data from the "documents.json" file without any filtering.
        Returns: 
        An array of all document objects.
    */
    async loadAllDocumentCoursesTasks() {

        let data = await fetch("/Aula-Virtual/public/assets/json/documents.json");
        let documentsData  = await data.json();
        
        return documentsData;

    }

    /*
        Method: loadExams
        Description: 
        Fetches the exam data from the "exams.json" file and parses it into JSON format.
        Returns: 
        An array of exam objects.
    */
    async loadExams() {
        
        let data = await fetch("/Aula-Virtual/public/assets/json/exams.json");
        let exams = await data.json();

        return exams;

    }
  
}