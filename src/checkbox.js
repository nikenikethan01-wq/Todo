import { dataArray } from "./dataArray.js"

export function checkBox (container) {
    const uuidData = container.dataset.uuid
    const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
    dataArray[arrayIndex].ischecked = !dataArray[arrayIndex].ischecked
    container.classList.toggle('todo-checked')
    // local storage update
    localStorage.setItem('dataArray', JSON.stringify(dataArray)) 
}