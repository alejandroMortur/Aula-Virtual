class Loader{

    async loadDataUser() {

        let data = await fetch("/public/assets/json/users.json");
        let users = await data.json();
    
        users.forEach(element => {
            element.passwordValidate = function (password) {
                return password === this.password; // Comparación estricta
            }
    
            element.mailValidate = function (UserName) {
                return UserName === this.UserName; // Comparación estricta
            }
    
        });

        return users
    
    }

    async loadDataCourses() {

        let data = await fetch("/public/assets/json/courses.json");
        let courses = await data.json();
        
        return courses
    
    }

}