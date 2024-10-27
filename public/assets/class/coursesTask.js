class CoursesTask{

    constructor(coursesTaskData){
        this.course_id = coursesTaskData.course_id;
        this.task_id = coursesTaskData.task_id;
        this.name = coursesTaskData.name;
        this.description = coursesTaskData.description;
        this.upload_date = coursesTaskData.upload_date;
    }

    //getters
    getPartentCourseId(){
        return this.course_id;
    }
    getTaskId(){
        return this.task_id;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getUploadDate(){
        return this.upload_date;
    }

    //Setters
    setUploadDate(date){
        this.due_date = date
    }

}