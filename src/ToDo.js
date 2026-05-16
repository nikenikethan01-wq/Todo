export class ToDo {

    constructor(title, description, dueDate, priority, project, uuid = crypto.randomUUID() ,ischecked = false){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.project = project
        this.uuid= uuid
        this.ischecked = ischecked
    }
    set title(value){
        this._title = value
    }
    get title(){
        return this._title
    }
    set description(value){
        this._description = value
    }
    get description(){
        return this._description
    }
    set dueDate(value){
        const selectDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if(selectDate < today){
            console.warn("Note: This date is in the past.")
        }
        this._dueDate = selectDate
    }
    get dueDate(){
        return this._dueDate
    }
    set priority(value){
        const validValues = ['Low', 'Medium', 'High']
        if(!validValues.includes(value)){
            console.error(`${value} is not a valid priority level`)
            return
        }
        this._priority = value
    }
    get priority(){
        return this._priority
    }
    set uuid(value){
        this._uuid = value
    }
    get uuid(){
        return this._uuid
    }
    set ischecked(value){
        if(typeof value !== "boolean"){
            console.error(`${value} is not a valid ischecked`)
            return
        }
        this._ischecked = value
    }
    get ischecked(){
        return this._ischecked
    }

    set project(value){
        this._project = value
    }

    get project(){
        return this._project
    }
}