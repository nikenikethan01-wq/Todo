import { ToDo } from "./ToDo.js"
import { dataArray } from "./dataArray.js"
import { pubsub } from "./pubsub.js"
import { genericContainer } from "./genericContainer.js"

export const todoCreate = {
    create : function(title, description, dueDate, priority, project) {
       const itemObj = new ToDo(
            title,
            description,
            dueDate,
            priority,
            project
       )
       dataArray.push(itemObj)
       ///PUBSUB: published item added
       console.log(`CREATE: just todoCreated Event - ${itemObj}`)
       console.log(itemObj)
       pubsub.publish('todoCreated', itemObj)
    },

    render: function(todo){
        console.log(`RENDER: I hear itemCreate Event`)
        const todoContainer = document.querySelector('.todo-container'); // reference to append
        const container = genericContainer(todo)
        todoContainer.insertBefore(container, todoContainer.firstChild)
    },

    subscribe: function(){
        console.log('RENDER: subscribed to todoCreate')
        pubsub.subscribe('todoCreated', todoCreate.render)
    }
}