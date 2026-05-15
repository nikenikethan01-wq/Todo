import { dataArray } from "./dataArray.js"

export const modifyItem = {
    arrayIndex : function(id){
        return dataArray.findIndex(element => element.id === id)
    },

    updateItem : function(id){
        const index = this.arrayIndex(id)
        /// pub sub updated element
    },

    deleteItem : function(id) {
        const index = this.arrayIndex(id)
        dataArray.splice(index,1)
        /// pub sub removed element
    }

}

