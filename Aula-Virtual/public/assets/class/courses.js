/**
 * Class: Course
 * Description:
 * Represents a course in the system. The class is initialized with data representing the course attributes
 * and provides methods to get and set these attributes. It also manages tasks associated with the course.
 */
class Course {
    constructor(coursesData) {
        this.image = coursesData.image;
        this.title = coursesData.title;
        this.description = coursesData.description;
        this.workDone = coursesData.workDone;
        this.porcent = coursesData.porcent;
        this.id = coursesData.id;
        this.type = coursesData.type;
        this.coursesTask = [];
    }

    // Getters
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getImage() {
        return this.image;
    }
    getWorkDone() {
        return this.workDone;
    }
    getPorcent() {
        return this.porcent;
    }
    getType() {
        return this.type;
    }
    getTask() {
        return this.coursesTask;
    }

    // Setters
    setTask(task) {
        this.coursesTask.push(task);
    }
    setPorcent(newPorcent) {
        this.porcent = newPorcent;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    setImage(newImage) {
        this.image = newImage;
    }
    setWorkDone(newWorkDone) {
        this.workDone = newWorkDone;
    }
    setType(newType) {
        this.type = newType;
    }
}