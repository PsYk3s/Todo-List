import _ from 'lodash';
import { CreateTask, CreateProject } from "./res/create";
import updateDisplay from "./res/display";
import "./style.css";

const container = document.getElementById('lists-container');

// Look-up local storage or fallback to empty array
let projectList = JSON.parse(localStorage.getItem('projecttodo')) || [];
let taskList = JSON.parse(localStorage.getItem('tasktodo')) || [];

// Initial display render after loading local storage
updateDisplay(taskList, projectList, container);

// Method for new projects
const addNewProject = () => {
    const projectName = document.getElementById('projectname').value;
    const projectDueDate = document.getElementById('projectduedate').valueAsDate || new Date();
    const newProject = new CreateProject(projectName, projectDueDate);
    projectList.push(newProject);
    updateDisplay(taskList, projectList, container);
};

// Method to add new task onclick
const addNewTask = (taskIndex, projectName) => {
    const taskName = document.getElementById(`taskname-${taskIndex}`).value
    const dueDate = document.getElementById(`taskduedate-${taskIndex}`).valueAsDate || new Date()
    const newTask = new CreateTask(taskName, dueDate, projectName);
    taskList.push(newTask);
    updateDisplay(taskList, projectList, container);
};

// Remove task from taskList, update display and storage
const removeTask = index => {
    taskList.splice(index, 1);
    updateDisplay(taskList, projectList, container);
};

// Remove project and associated tasks, update display and storage
const removeProject = index => {
    taskList = taskList.filter((task) => task.taskProjectName !== projectList[index].projectName);
    projectList.splice(index, 1);
    updateDisplay(taskList, projectList, container);
};

// Toggle tasks completion
const toggle = index => {
    taskList[index].taskActive === "active" ? taskList[index].taskActive = "inactive" : taskList[index].taskActive = "active";
    updateDisplay(taskList, projectList, container);
};

const toggleVisible = id => {
    const block = document.getElementById(id)
    block.style.display == "none" ? block.style.display = "inline-grid" : block.style.display = "none";
}

const updateTask = (id, idDate, idName) => {
    const newDate = document.getElementById(idDate)
    const newName = document.getElementById(idName)
    taskList[id].taskDueDate = newDate.valueAsDate || new Date()
    taskList[id].taskName = newName.value
    updateDisplay(taskList, projectList, container);
}

window.updateTask = updateTask
window.toggleVisible = toggleVisible;
window.addNewProject = addNewProject;
window.addNewTask = addNewTask;
window.toggle = toggle;
window.removeTask = removeTask;
window.removeProject = removeProject;
