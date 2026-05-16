export const modal = {
    todoModalCreate: function(modalType, uuidData = null){
        const template = document.getElementById('template-modal')
        const modal = template.content.firstElementChild.cloneNode(true)
        modal.classList.add('divModal')
        if(modalType === 'edit'){
            const btn = modal.querySelector('.submit-btn')
            btn.classList.remove('submit-btn')
            btn.classList.add('edit-btn')
            btn.textContent = 'Edit'
            if(uuidData) modal.dataset.uuid = uuidData
        }
        document.body.append(modal)
    },
    
    todoModalRemove: function(){
        document.querySelector('.divModal').remove()
    },

    projectModalCreate : function() {
        const modalTemplate = document.getElementById('template-project')
        console.log(modalTemplate)
        const container = modalTemplate.content.firstElementChild.cloneNode(true)
        document.querySelector('body').append(container)
    },

    projectModalRemove: function() {
        document.querySelector('.project-modal').remove()
    }
}