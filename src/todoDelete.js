import { dataArray } from "./dataArray"
import { projectsArray } from "./dataArray"
import { pubsub } from "./pubsub"
   

export const todoDelete = {
    delete: function(uuidData) {
        const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
        const projectName = dataArray[arrayIndex].project
        dataArray.splice(arrayIndex,1)
        //local storage update
        localStorage.setItem('dataArray', JSON.stringify(dataArray)) 
        //pubsub publish
        console.log(`MODIFY: just todoDeleted Event - ${uuidData}`)
        pubsub.publish('todoDeleted', uuidData)
        const checkArray = dataArray.some(item => {
            if(item.project === projectName)
                return true
        })

        if(!checkArray){
            const removeIndex = projectsArray.indexOf(projectName)
            projectsArray.splice(removeIndex, 1)
            //local storage update
            localStorage.setItem('projectsArray', JSON.stringify(projectsArray))
            this.asideRender(projectName)
        }

    },

    render : function(id){
        console.log('RENDER: I hear an element is removed!')
        const removalItem = document.querySelector(`[data-uuid="${id}"]`)
        document.querySelector('.todo-container').removeChild(removalItem)
    },

    asideRender: function(name){
        const li = document.querySelectorAll('li')
        li.forEach(item => {
            if(item.textContent.includes(name)){
                item.remove()
            }
        })
    },

    subscribe : function() {
        console.log(`RENDER: Subscribed to todoDeleted`)
        pubsub.subscribe("todoDeleted", todoDelete.render)
    }

}
