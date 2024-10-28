class Loader{

    async loadDataUser() {

        let data = await fetch("/public/assets/json/users.json");
        let users = await data.json();

        return users
    
    }

    async loadDataCourses(userCoursesId) {

        let data = await fetch("/public/assets/json/courses.json");
        let courses = await data.json();
        let filtratedCourses = []

        courses.forEach(element => {
            
            if (userCoursesId.includes(element.id)) {

                filtratedCourses.push(element);
                console.log("Curso encontrado");
                
            }

        });
        
        return filtratedCourses
    
    }

    async loadDataCoursesTasks(userCoursesId) {

        let data = await fetch("/public/assets/json/coursesTask.json");
        let coursesTask = await data.json();
        let taskData = [];

        coursesTask.forEach(element => {
            if(element['course_id'] == userCoursesId){

                element['tasks'].forEach(data => {

                    taskData.push(data);

                });

            }
            
        });

        return taskData;

    }

    async loadDocumentCoursesTasks(userTaskId) {

        let data = await fetch("/public/assets/json/documents.json");
        let documents = await data.json();
        let documentsData = [];

        documents.forEach(element => {
            if(element['task_id'] == userTaskId){

                documentsData.push(element);

            }
            
        });

        return documentsData;

    }

}