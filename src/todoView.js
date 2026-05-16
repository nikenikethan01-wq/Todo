import { dataArray } from "./dataArray"

export function view (uuidData){
    const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
    const todo = dataArray[arrayIndex]
    const viewTemplate = document.getElementById('view-template')
    const container = viewTemplate.content.firstElementChild.cloneNode(true)
    container.querySelector('h2').textContent = todo.title
    container.querySelector('p').textContent =  todo.description
    container.querySelector('.view-date').textContent = `Due Date : ${todo.dueDate.
        toLocaleString('default',{
            day:"numeric",
            month: "long",
        })}`
        document.querySelector('body').append(container)
        container.querySelector('.view-priority').textContent = `Task Priority : 
        ${dataArray[arrayIndex].priority}`
}