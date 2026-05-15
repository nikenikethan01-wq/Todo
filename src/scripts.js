import './styles.css';
import { TodoItem } from "./TodoItem.js"
import { dataArray } from "./dataArray.js"
import { projectsArray } from "./dataArray.js"
import { pubsub } from './pubsub.js';
import { projects } from './projects.js';

document.body.addEventListener('click', (ev) => {
    const modal = document.querySelector('.divModal')
    if(ev.target.matches('.add-btn')){
        screenRender.modal('add')
    }

    if(ev.target.matches('.submit-btn')){
        ev.preventDefault()
        create.newItem(
            document.querySelector('form input[type=text]').value,
            document.querySelector('form textarea').value,
            new Date(document.getElementById('due').value),
            document.querySelector('form select').value,
            document.getElementById('project-title').textContent
        )
        modal.remove()
    }

    if(ev.target.matches('.close-btn')){
        modal.remove()
    }

    if(ev.target.type === 'checkbox'){
        screenRender.checkBox(ev.target.closest('.item-container'))
    }

    if(ev.target.matches('.fa-trash-can')){
        const uuidData = ev.target.closest('.item-container').dataset.uuid
        modifyItem.removeElement(uuidData)
    }
    if(ev.target.matches('.fa-pen-to-square')){
        screenRender.modal('edit')
        const uuidData = ev.target.closest('.item-container').dataset.uuid
        modifyItem.editItem(uuidData)
    }
    if(ev.target.matches('.fa-angle-down')){
        screenRender.view(ev.target.closest('.item-container').dataset.uuid)
        
    }

    if(ev.target.matches('.view-close-btn')){
        document.querySelector('.view-modal').remove()
    }

    if(ev.target.matches('.project-btn')){
        projects.addNewProject()
    }
    if(projectsArray.includes(ev.target.textContent)){
        const arrayIndex = projectsArray.findIndex(item => item === ev.target.textContent)
        document.querySelector('main h2').textContent = projectsArray[arrayIndex]
        screenRender.selectedProjectRender(ev.target.textContent)
    }
})


const create = {
    newItem : function(title, description, dueDate, priority, project) {
       const itemObj = new TodoItem(
            title,
            description,
            dueDate,
            priority,
            project
       )
       dataArray.push(itemObj)
       ///PUBSUB: published item added
       console.log(`CREATE: just itemCreated Event - ${itemObj}`)
       console.log(itemObj)
       pubsub.publish('itemCreated', itemObj)
    }
}

const modifyItem = {
    
    removeElement: function(uuidData) {
        const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
        dataArray.splice(arrayIndex,1)
        //pubsub publish
        console.log(`MODIFY: just itemRemoved Event - ${uuidData}`)
        pubsub.publish('itemRemoved', uuidData)
    },

    editItem: function(uuidData){
        const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
        document.querySelector('form input[type=text]').value = dataArray[arrayIndex].title
        document.querySelector('form textarea').value = dataArray[arrayIndex].description
        document.querySelector('form select').value = dataArray[arrayIndex].priority

        const editBtn = document.querySelector('.edit-btn')
        editBtn.addEventListener('click', (ev) => {
            ev.preventDefault()
            dataArray[arrayIndex].title = document.querySelector('form input[type=text]').value
            dataArray[arrayIndex].description = document.querySelector('form textarea').value
            dataArray[arrayIndex].dueDate = new Date(document.getElementById('due').value)
            dataArray[arrayIndex].priority = document.querySelector('form select').value
            console.log(`MODIFY: Just itemEdited Event`)
            pubsub.publish('itemEdited', uuidData)
            document.querySelector('.divModal').remove()
        })
    }
}

const screenRender = {
        subscription : function() {
            console.log(`RENDER: subscribed to itemCreated`)
            pubsub.subscribe('itemCreated', screenRender.appendItem)
            console.log(`RENDER: subscribed to itemRemoved`)
            pubsub.subscribe('itemRemoved', screenRender.removeRender)
            console.log(`RENDER: subscribed to itemEdited`)
            pubsub.subscribe('itemEdited', screenRender.editRender)
            console.log(`RENDER: subscribed to newProject`)
            pubsub.subscribe('newProject', screenRender.newProjectRender)
        },

        modal : function(modalType){
            const template = document.getElementById('template-modal')
            const modal = template.content.firstElementChild.cloneNode(true)
            modal.classList.add('divModal')
            document.body.append(modal)
            if(modalType === 'edit'){
                const btn = document.querySelector('.submit-btn')
                btn.classList.remove('submit-btn')
                btn.classList.add('edit-btn')
                btn.textContent = 'Edit'
            }
        },

        appendItem: function(todo){
            console.log(`RENDER: I hear itemCreate Event`)
            const todoContainer = document.querySelector('.todo-container'); // reference to append
            const template = document.getElementById('item-template')
            const container = template.content.firstElementChild.cloneNode(true)
            container.dataset.uuid = todo.uuid
            screenRender.priorityLevel(todo.priority, container)
            container.querySelector('.text-container p').textContent = todo.title
            container.querySelector('.date').textContent = todo.dueDate.
            toLocaleString('default',{
                day:"numeric",
                month: "long",
            })
                    
            todoContainer.insertBefore(container, todoContainer.firstChild)
        },

        priorityLevel: function(level,container){
            const priorityIndicator = (level === "Low") ? "low" : 
                                    (level === "Medium") ? "medium" : "high"
            container.classList.remove("low","medium","high")                     
            container.classList.add(priorityIndicator)
        },

        checkBox : function(container) {
            const uuidData = container.dataset.uuid
            const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
            dataArray[arrayIndex].ischecked = !dataArray[arrayIndex].ischecked
            container.classList.toggle('todo-checked')
        },

        removeRender : function(id){
            console.log('RENDER: I hear an element is removed!')
            const removalItem = document.querySelector(`[data-uuid="${id}"]`)
            document.querySelector('.todo-container').removeChild(removalItem)
        },

        editRender: function(uuidData){
            console.log('RENDER: I hear an element is updated!')
            const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
            const container = document.querySelector(`[data-uuid="${uuidData}"]`)
            screenRender.priorityLevel(dataArray[arrayIndex].priority, container)
            container.querySelector('.text-container p').textContent = dataArray[arrayIndex].title
            container.querySelector('.date').textContent = dataArray[arrayIndex].dueDate.
                    toLocaleString('default',{
                        day:"numeric",
                        month: "long",
                    })
        },

        view: function(uuidData){
            const arrayIndex = dataArray.findIndex(item => item.uuid === uuidData)
            const viewTemplate = document.getElementById('view-template')
            const container = viewTemplate.content.firstElementChild.cloneNode(true)
            container.querySelector('h2').textContent = dataArray[arrayIndex].title
            container.querySelector('p').textContent =  dataArray[arrayIndex].description
            container.querySelector('.view-date').textContent = `Due Date : ${dataArray[arrayIndex].dueDate.toLocaleString('default',{
                day:"numeric",
                month: "long",
            })}`
            container.querySelector('.view-priority').textContent = `Task Priority : ${dataArray[arrayIndex].priority}`
            document.querySelector('body').append(container)
        },


        newProjectRender: function(projectName){
            console.log('RENDER: I heard someone added new project')
            console.log(projectName, "from render")
            const ul = document.querySelector('aside ul')
            const li = document.createElement('li')
            li.textContent = projectName
            ul.append(li)
        },

        selectedProjectRender: function(projectName){
            if(projectName === "Home"){
                
            }
        }

}

const render = (function(){
    const todoContainer = document.querySelector('.todo-container');
    const projectsUL = document.querySelector('aside ul')
    const todoFragment = document.createDocumentFragment()
    const projectFragment = document.createDocumentFragment()
    dataArray.forEach(todo => {
        const template = document.getElementById('item-template')
        const container = template.content.firstElementChild.cloneNode(true)
        container.dataset.uuid = todo.uuid
        screenRender.priorityLevel(todo.priority, container)
        container.querySelector('.text-container p').textContent = todo.title
        container.querySelector('.date').textContent = todo.dueDate.
        toLocaleString('default',{
            day:"numeric",
            month: "long",
        }),
        todoFragment.append(container)
    })
    todoContainer.append(todoFragment)
    
    projectsArray.forEach(project =>{
        const li = document.createElement('li')
        li.textContent = project
        projectFragment.append(li)
    })
    projectsUL.append(projectFragment)
    screenRender.subscription()
    console.log(dataArray)
})()

function generic(){
    const template = document.getElementById('item-template')
    const container = template.content.firstElementChild.cloneNode(true)
    container.dataset.uuid = todo.uuid
    screenRender.priorityLevel(todo.priority, container)
    container.querySelector('.text-container p').textContent = todo.title
    container.querySelector('.date').textContent = todo.dueDate.
    toLocaleString('default',{
        day:"numeric",
        month: "long",
    })
    return container
}


