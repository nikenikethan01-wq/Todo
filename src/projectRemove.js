import { dataArray } from "./dataArray.js"
import { projectsArray } from "./dataArray.js"


export const projectRemove = function(target) {
    if(projectsArray.includes(target)){
        const removalElements = dataArray.filter(item => item.project === target)
        const removeTodoDivs = [... document.querySelectorAll('.item-container')]
        // update main UI
        removalElements.forEach(element => {
            removeTodoDivs.forEach(div => {
                if(element.uuid === div.dataset.uuid)
                    div.remove()
            })
        })
        // remove from data Array
        removalElements.forEach(element => {
            for(let i = dataArray.length - 1; i >= 0; i--){
                if(element.uuid === dataArray[i].uuid){
                    dataArray.splice(i,1)
                }
            }
        })
        // remove from projectsArray
        const removeIndex = projectsArray.indexOf(target)
        projectsArray.splice(removeIndex, 1)
        // update aside UI
        const removeli = [... document.querySelectorAll('li')]
        removeli.forEach(li => {
            if(li.textContent === target)
                li.remove()
        })
        
    }

    
}