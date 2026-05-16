import './styles.css';
import { dataArray } from "./dataArray.js"
import { projectsArray } from "./dataArray.js"
import { modal } from './modal.js';
import { pubsub } from './pubsub.js';
import { todoCreate } from './todoCreate.js';
import { todoDelete } from './todoDelete.js';
import { todoEdit } from './todoEdit.js';
import { view } from './todoView.js'
import { checkBox } from './checkbox.js';
import { projectCreate } from './projectCreate.js';
import { paintPriority } from './paintPriority.js';
import { subscriptions } from './subscriptions.js';
import { genericContainer } from './genericContainer.js';
import { projectRemove } from './projectRemove.js';
import { projectClick } from './projectClick.js';


document.body.addEventListener('click', (ev) => {
    if(ev.target.matches('.add-btn')){
        modal.todoModalCreate('add')
    }
    // create new ToDo
    if(ev.target.matches('.submit-btn')){
        ev.preventDefault()
        todoCreate.create(
            document.querySelector('form input[type=text]').value,
            document.querySelector('form textarea').value,
            document.getElementById('due').value,
            document.querySelector('form select').value,
            document.getElementById('main-title').textContent
        )
        modal.todoModalRemove()
    }
    if(ev.target.matches('.close-btn')){
        modal.todoModalRemove()
    }
    // delete todo
    if(ev.target.matches('.fa-trash-can')){
        const uuidData = ev.target.closest('.item-container').dataset.uuid
        todoDelete.delete(uuidData)
    }
    // todo edit populate
    if(ev.target.matches('.fa-pen-to-square')){
        const uuidData = ev.target.closest('.item-container').dataset.uuid
        modal.todoModalCreate('edit',uuidData)
        todoEdit.populateEditModal(uuidData)
    } 
    // todo edit submit
    if(ev.target.matches('.edit-btn')){
        ev.preventDefault()
        const uuidData = ev.target.closest('.divModal').dataset.uuid
        todoEdit.commitEdit(uuidData)
        modal.todoModalRemove()
    }
    // check box
    if(ev.target.type === 'checkbox'){
        checkBox(ev.target.closest('.item-container'))
    }
    // view todo
    if(ev.target.matches('.fa-angle-down')) {
        view(ev.target.closest('.item-container').dataset.uuid)
    }
    // view close
    if(ev.target.matches('.view-close-btn')){
        document.querySelector('.view-modal').remove()
    }
    //projects
    if(ev.target.matches('.project-btn')){
        modal.projectModalCreate()
    }
    if(ev.target.matches('.project-submit-btn'))
    {
        ev.preventDefault()
        projectCreate.create()
        modal.projectModalRemove()
    }

    if(ev.target.matches('.project-close-btn')){
        modal.projectModalRemove()
    }

    // project click
    if(event.target.matches('li')){
        const target = ev.target.textContent
        projectClick.updateTitle(target)
        if(target === 'Home')
            projectClick.homeRender()
        if(target !== 'Home')
            projectClick.projectRender(target) 
    }

    if(ev.target.matches('.project-remove')){
        const target = ev.target.closest('li').textContent
        projectRemove(target)
    }
})
    
const initialRender = (function(){
    // Get Local Storage Data
    const localDataArray = JSON.parse(localStorage.getItem("dataArray"))
    const localProjectsArray = JSON.parse(localStorage.getItem('projectsArray'))
    const todoContainer = document.querySelector('.todo-container');
    const projectsUL = document.querySelector('aside ul')
    const todoFragment = document.createDocumentFragment()
    const projectFragment = document.createDocumentFragment()
    dataArray.forEach(todo => {
        const container = genericContainer(todo)
        todoFragment.append(container)
    })
    todoContainer.append(todoFragment)
    
    projectsArray.forEach(project =>{
        const li = document.createElement('li')
        li.textContent = project
        const i = document.createElement('i')
        i.classList.add('fa-solid', 'fa-circle-minus', 'project-remove')
        li.append(i)
        projectFragment.append(li)
    })
    projectsUL.append(projectFragment)
    subscriptions()
})()
