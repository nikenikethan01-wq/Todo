import { dataArray } from "./dataArray.js"
import { projectsArray } from "./dataArray.js"
import { genericContainer } from "./genericContainer.js"

export const projectClick = {
    todoContainer : document.querySelector('.todo-container'),    
    updateTitle: function(target){
        document.getElementById('main-title').textContent = target   
    },

    homeRender : function() {
        const todoFragment = document.createDocumentFragment()
        this.todoContainer.textContent = ""
        dataArray.forEach(todo => {
            const container = genericContainer(todo)
            todoFragment.append(container)
        })
        this.todoContainer.append(todoFragment)
    },

    projectRender: function(target){
        if(!projectsArray.includes(target)) return
        const filteredArray = dataArray.filter(item => {
            if(item.project === target)
                return item
        })
        this.todoContainer.textContent = ""
        const todoFragment = document.createDocumentFragment()
        filteredArray.forEach(todo => {
            const container = genericContainer(todo)
            todoFragment.append(container)
        })
        this.todoContainer.append(todoFragment)
    }
}