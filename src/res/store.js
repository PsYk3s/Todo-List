export function storeTasks(array) {
    localStorage.setItem('tasktodo', JSON.stringify(array))
}

export function storeProjects(array) {
    localStorage.setItem('projecttodo', JSON.stringify(array))
}