import './styles.css';
import { TodoItem } from "./TodoItem.js"
import { dataArray } from "./dataArray.js"
import { pubsub } from './pubsub.js';

document.body.addEventListener('click', (ev) => {
    console.log(ev.target)
    if(ev.target.matches('.add-btn')){
        create.modal()
    }

    if(ev.target.matches('.submit-btn')){
        ev.preventDefault()
        const dueDate = new Date(document.getElementById('due').value)
        create.newItem(
            document.querySelector('form input[type=text]').value,
            document.querySelector('form textarea').value,
            dueDate,
            document.querySelector('form select').value
        )
    }
    if(ev.target.matches('.close-btn')){
        screenRender.removeModal()
    }

    if(ev.target.type === 'checkbox'){
        modifyItem.checkBox(ev.target.closest('.item-container'))
    }

    if(ev.target.matches('.fa-trash-can')){
        const removeId = ev.target.closest('.item-container').dataset.uuid
        modifyItem.removeElement(removeId)
    }
})


const create = {
    newItem : function(title, description, dueDate, priority) {
       const itemObj = new TodoItem(
            title,
            description,
            dueDate,
            priority
       )
       dataArray.push(itemObj)
       ///PUBSUB: published item added
       console.log(`CREATE: just createEvent ${itemObj}`)
       pubsub.publish('createEvent', itemObj)
       create.newItemContainer(itemObj)////////////////////////////////////////////
    },

    modal : function(){
        const template = document.getElementById('template-modal')
        const modal = template.content.firstElementChild.cloneNode(true)
        modal.classList.add('divModal')
        screenRender.modal(modal)
    },

    newItemContainer: function(itemObj){
        
        screenRender.newItemContainer(divContainer,itemObj)
    }
}

const modifyItem = {
    checkBox : function(container) {
        const checkedUUID = container.dataset.uuid
        const findArrayIndex = dataArray.findIndex(item => item.uuid === checkedUUID)
        dataArray[findArrayIndex].ischecked = !dataArray[findArrayIndex].ischecked
        screenRender.checkBox(container)
    },

    removeElement: function(id) {
        const findArrayIndex = dataArray.findIndex(item => item.uuid === id)
        dataArray.splice(findArrayIndex,1)
        //pubsub publish
        screenRender.removeElement()
    }
}

const screenRender = {
        modal : function(modal){
            document.body.append(modal)
        },
    
        removeModal : function(){
           document.querySelector('.divModal').remove()
        },
    
        appendItem: function(newObj){
            const template = document.getElementById('item-template')
            const container = template.content.firstElementChild.cloneNode(true)
            container.dataset.uuid = newObj.uuid
            const todoContainer = document.querySelector('.todo-container');
            screenRender.priorityLevel(newObj.priority, container)
            container.querySelector('.text-container p').textContent = newObj.title
            container.querySelector('.date').textContent = newObj.dueDate.
                    toLocaleString('defalut',{
                        day:"numeric",
                        month: "long",
                    }),
            todoContainer.insertBefore(container, todoContainer.firstChild)
            screenRender.removeModal()
        },

        priorityLevel: function(level,container){
            const priorityIndicator = (level === "Low") ? "low" : 
                                    (level === "Medium") ? "medium" : "high"
            container.classList.add(priorityIndicator)
        },

        checkBox : function(container) {
            container.classList.toggle('todo-checked')
        },

        reRenderAfterRemove : function(){
            document.querySelector('.todo-container').innerHTML = ""
            render()
        }

}

const render = function(){
    const todoContainer = document.querySelector('.todo-container');
    dataArray.forEach(todo => {
        const template = document.getElementById('item-template')
        const divContainer = template.content.firstElementChild.cloneNode(true)
        divContainer.dataset.uuid = todo.uuid
        screenRender.priorityLevel(todo.priority, divContainer)
        divContainer.querySelector('.text-container p').textContent = todo.title
        divContainer.querySelector('.date').textContent = todo.dueDate.
        toLocaleString('default',{
            day:"numeric",
            month: "long",
        }),
        todoContainer.appendChild(divContainer)
    })
}

render()