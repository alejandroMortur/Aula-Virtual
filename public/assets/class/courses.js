class Course{

    constructor(coursesData){
        this.image = coursesData.image
        this.title = coursesData.title
        this.workDone = coursesData.workDone
        this.porcent = coursesData.porcent
        this.id = coursesData.id
        this.type = coursesData.type
        this.coursesTask = [];
    }

    //getters
    getId(){
        return this.id;
    }
    getTask(){
        return this.coursesTask;
    }
    getPorcent(){
        return this.porcent;
    }

    //Setters
    setTask(task){
        this.coursesTask.push(task);
    }
    setPorcent(newPorcent){
        this.porcent = newPorcent;
    }

}