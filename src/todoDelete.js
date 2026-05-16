import { dataArray } from "./dataArray"
import { pubsub } from "./pubsub"
   

export const todoDelete = {
    delete: function(uuidData) {
        const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
        dataArray.splice(arrayIndex,1)
        //pubsub publish
        console.log(`MODIFY: just todoDeleted Event - ${uuidData}`)
        pubsub.publish('todoDeleted', uuidData)
    },

    render : function(id){
        console.log('RENDER: I hear an element is removed!')
        const removalItem = document.querySelector(`[data-uuid="${id}"]`)
        document.querySelector('.todo-container').removeChild(removalItem)
    },

    subscribe : function() {
        console.log(`RENDER: Subscribed to todoDeleted`)
        pubsub.subscribe("todoDeleted", todoDelete.render)
    }

}
