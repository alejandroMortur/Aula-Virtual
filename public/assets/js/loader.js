class Loader{

    async loadDataUser() {

        let data = await fetch("/public/assets/json/users.json");
        let users = await data.json();
    
        users.forEach(element => {

            element.courses  = [];

            element.passwordValidate = function (password) {
                return password === this.password; // Comparación estricta
            }
    
            element.mailValidate = function (UserName) {
                return UserName === this.UserName; // Comparación estricta
            }

            element.addCourses = function (course) {
                this.Courses.push(course)
            }

        });

        return users
    
    }

    async loadDataCourses(userCoursesId) {

        let data = await fetch("/public/assets/json/courses.json");
        let courses = await data.json();
        let filtratedCourses = []

        courses.forEach(element => {
            
            if (userCoursesId.includes(element.id)) {

                // Si está, agregar la propiedad CoursesTask y una función para agregar tareas
                element.CoursesTask = [];

                element.addCoursesTask = function(task) {

                    this.CoursesTask.push(task);

                };

                filtratedCourses.push(element);
                console.log("Curso encontrado");
                
            }

        });
        
        return filtratedCourses
    
    }

}