import { projectsArray } from "./dataArray.js"
import { pubsub } from "./pubsub.js"

export const projectCreate = {
    create: function(){
        const projectName = document.querySelector('.project-modal input').value
        if(!projectsArray.includes(projectName)){
            projectsArray.push(projectName)
            // Local Storage Update
            localStorage.setItem('projectsArray', JSON.stringify(projectsArray)) 
            //PUB SUB
            console.log(`PROJECTS: just projectCreated added`)
            pubsub.publish('projectCreated', projectName)
        }
        return
    },

    render: function(projectName){
        console.log('RENDER: I heard someone added new project')
        console.log(projectName, "from render")
        const ul = document.querySelector('aside ul')
        const li = document.createElement('li')
        li.textContent = projectName
        const i = document.createElement('i')
        i.classList.add('fa-solid', 'fa-circle-minus')
        li.append(i)
        ul.append(li)
    },

    subscribe: function(){
        console.log(`RENDER: subscribed to projectCreated`)
        pubsub.subscribe('projectCreated', projectCreate.render)
    }

}