/**
 * Class: User
 * Description:
 * Represents a user in the system, either a student or a teacher, with relevant
 * attributes like name, DNI (ID number), password, and registration information.
 */
class User {
    constructor(UserData) {
        this.UserName = UserData.UserName;
        this.Name = UserData.Name;
        this.DNI = UserData.DNI;
        this.password = UserData.password;
        this.SureName = UserData.SureName;
        this.IsTeacher = UserData.IsTeacher;
        this.registration = UserData.registration;
        this.Mail = UserData.Mail;
        this.Image = UserData.Image;
    }

    // Getters 
    getUserName() {
        return this.UserName;
    }
    getName() {
        return this.Name;
    }
    getSureName() {
        return this.SureName;
    }
    getDNI() {
        return this.DNI;
    }
    getIsTeacher() {
        return this.IsTeacher;
    }
    getpassword() {
        return this.password;
    }
    getRegistration() {
        return this.registration;
    }
    getMail() {
        return this.Mail;
    }
    getImage() {
        return this.Image;
    }

    //Setters
    setUserName(value) {
        this.UserName = value;
    }
    setName(value) {
        this.Name = value;
    }
    setDNI(value) {
        this.DNI = value;
    }
    setPassword(value) {
        this.password = value;
    }
    setSureName(value) {
        this.SureName = value;
    }
    setIsTeacher(value) {
        this.IsTeacher = value;
    }
    setMail(value) {
        this.Mail = value;
    }
    setImage(value) {
        this.Image = value;
    }
}
