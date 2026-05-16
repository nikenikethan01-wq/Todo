export function paintPriority(level,container){
    const priorityIndicator = (level === "Low") ? "low" : 
    (level === "Medium") ? "medium" : "high"
    container.classList.remove("low","medium","high")                     
    container.classList.add(priorityIndicator)
}

