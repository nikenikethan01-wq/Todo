import { paintPriority } from "./paintPriority.js"

export function genericContainer (todo){
    const template = document.getElementById('item-template')
    const container = template.content.firstElementChild.cloneNode(true)
    container.dataset.uuid = todo.uuid
    container.querySelector('.text-container p').textContent = todo.title
    container.querySelector('.date').textContent = todo.dueDate.
    toLocaleString('default',{
        day:"numeric",
        month: "long",
    })
    paintPriority(todo.priority, container)
    return container
}