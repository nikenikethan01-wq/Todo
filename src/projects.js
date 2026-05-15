import { dataArray } from "./dataArray.js"
import { projectsArray } from "./dataArray.js"
import { pubsub } from "./pubsub.js"




export const projects = {
    

    addNewProject: function(){
        //popup modal
        const modalTemplate = document.getElementById('template-project')
        console.log(modalTemplate)
        const container = modalTemplate.content.firstElementChild.cloneNode(true)
        document.querySelector('body').append(container)
        
        container.addEventListener('click', (ev) => {
            ev.preventDefault()
            if(ev.target.matches('.project-close-btn'))
                container.remove()
            if(ev.target.matches('.project-submit-btn')){
                const projectName = container.querySelector('input').value
                if(!projectsArray.includes(projectName)){
                    projectsArray.push(projectName)
                    container.remove()
                    console.log(`PROJECTS: just newProject added`)
                    pubsub.publish('newProject', projectName)
                }
                container.remove()
            }
        })
    }




}