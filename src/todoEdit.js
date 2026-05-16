import { dataArray } from "./dataArray.js"
import { pubsub } from "./pubsub.js"
import { paintPriority } from "./paintPriority.js"

export const todoEdit = {
    elements : function(uuid){
        const title  = document.querySelector('form input[type=text]')
        const description = document.querySelector('form textarea')
        const priority = document.querySelector('form select')
        const dueDate = document.getElementById('due')
        const uuidData = uuid
        const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
        return {
            title,
            description,
            priority,
            dueDate,
            arrayIndex,
            uuidData
        }
    },

    populateEditModal : function (uuid){
        const { title, description, priority, arrayIndex } = this.elements(uuid)
        if(arrayIndex === -1) return
        console.log(dataArray[arrayIndex], "populate")
        title.value = dataArray[arrayIndex].title
        description.value = dataArray[arrayIndex].description
        priority.value = dataArray[arrayIndex].priority
    },

    commitEdit: function(uuid){
        const { title, description, priority, dueDate, arrayIndex, uuidData} = this.elements(uuid)
        dataArray[arrayIndex].title = title.value
        dataArray[arrayIndex].description = description.value
        dataArray[arrayIndex].priority = priority.value
        dataArray[arrayIndex].dueDate = new Date(dueDate.value)
        // Local Storage update
        localStorage.setItem('dataArray', JSON.stringify(dataArray)) 
        //PUB SUB
        console.log(`MODIFY: Just todoEdited Event`)
        pubsub.publish('todoEdited', dataArray[arrayIndex])
        console.log(dataArray[arrayIndex], "commitEdit")
    },

    Render: function(todoObj){
        console.log('RENDER: I hear an element is updated!')
        const uuidData = todoObj.uuid
        const container = document.querySelector(`[data-uuid="${uuidData}"]`)
        paintPriority(todoObj.priority, container)
        container.querySelector('.text-container p').textContent = todoObj.title
        container.querySelector('.date').textContent = todoObj.dueDate.
        toLocaleString('default',{
            day:"numeric",
            month: "long",
        })
    },

    subscribe: function(){
        console.log("RENDER: subscribed to todoEdited")
        pubsub.subscribe('todoEdited', todoEdit.Render)
    }
}
   