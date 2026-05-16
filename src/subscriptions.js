import { todoCreate } from "./todoCreate.js"
import { todoDelete } from "./todoDelete.js"
import { todoEdit } from "./todoEdit.js"
import { projectCreate } from "./projectCreate.js"

export function subscriptions() {
    todoCreate.subscribe()
    todoDelete.subscribe()
    todoEdit.subscribe()
    projectCreate.subscribe()
}