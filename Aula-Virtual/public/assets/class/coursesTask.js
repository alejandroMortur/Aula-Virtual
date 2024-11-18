/**
 * Class: CoursesTask
 * Description:
 * Represents a task associated with a course. This class encapsulates the attributes and behaviors
 * for tasks and provides methods to get and set their properties.
 */
class CoursesTask {
    constructor(coursesTaskData) {
        this.course_id = coursesTaskData.course_id;
        this.task_id = coursesTaskData.task_id;
        this.name = coursesTaskData.name;
        this.description = coursesTaskData.description;
        this.upload_date = coursesTaskData.upload_date;
    }

    // Getters
    getPartentCourseId() {
        return this.course_id;
    }
    getTaskId() {
        return this.task_id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getUploadDate() {
        return this.upload_date;
    }

    // Setters
    setPartentCourseId(courseId) {
        this.course_id = courseId;
    }
    setTaskId(taskId) {
        this.task_id = taskId;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setUploadDate(date) {
        this.upload_date = date;
    }
}