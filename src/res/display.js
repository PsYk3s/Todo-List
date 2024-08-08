const { compareAsc, isToday, isTomorrow, isPast, formatDistanceToNow } = require( "date-fns" );
import { storeTasks, storeProjects } from "./store"

export default function updateDisplay( taskList, projectList, container ) {

    //Reset content before populating
    container.innerHTML = ""



    if ( projectList.length > 0) {

        //Sort projects by due date
        projectList.sort(( projectA, projectB ) => compareAsc( projectA.projectDueDate, projectB.projectDueDate ));

        //Populate projects in the cards container
        projectList.forEach(( project, index ) => {
            container.innerHTML += `
            <div class="project" id="${index}">
                <div id="project-header">
                    <h2>${project.projectName}</h2>
                </div>
                <div class="project-list" id="${project.projectName.split(" ").join("-")}"></div>
                <div id="add-ptask"><a href="#" onclick="toggleVisible('addtaskblock-${index}')">Add task</a>
                <div id="addtaskblock-${index}" class="addtaskblock"  style="display:none;">
                    <textarea type="textarea" id="taskname-${index}" placeholder="Task Name"></textarea>
                    <input type="date" id="taskduedate-${index}"></input>
                    <button type="button" id="add-task-${index}" onclick="addNewTask(${index}, '${project.projectName}')">Add task</button>
                </div></div>
                <p>Project due: ${
                    isToday( project.projectDueDate ) ? "Today" : 
                    isTomorrow( project.projectDueDate ) ? "Tomorrow" : 
                    isPast( project.projectDueDate ) ? `<span id="overdue">Overdue: ${formatDistanceToNow( project.projectDueDate )} ago` : 
                    formatDistanceToNow( project.projectDueDate )} <a href="#" id="removeproject" onclick="removeProject(${index})">Remove</a></p>
            </div>`;
             
        })
        

        if ( taskList.length > 0 ) {

            //Sort cards by due date
            taskList.sort(( taskA, taskB ) => compareAsc( taskA.taskDueDate, taskB.taskDueDate ));

            //Populate tasks under each project
            taskList.forEach(( task, index ) => {
                const projectId = task.taskProjectName.split(" ").join("-");
                const projectContainer = document.getElementById( projectId );

                projectContainer.innerHTML += `
                    <div class="card" id="${index}">
                        <div id="card-text" class="card-${index}">
                            <div id="card-text-left">
                                <h2 id="card-heading">${task.taskName}</h2>
                                <p id="card-due">${
                                    isToday( task.taskDueDate ) ? "Today" : 
                                    isTomorrow( task.taskDueDate ) ? "Tomorrow" : 
                                    isPast( task.taskDueDate ) ? `<span id="overdue">Overdue: ${formatDistanceToNow( task.taskDueDate )} ago` : 
                                    formatDistanceToNow( task.taskDueDate )} <a href="#" onclick="toggleVisible('edit-form-${index}')">Edit</a></p>
                            </div>
                            <div id="card-text-right">
                                <button id="toggle" onclick="toggle(${index})" class="card-${task.taskActive}"></button>
                            </div>
                        </div>
                        <div>
                            <button id="remove" onclick="removeTask(${index})"></button>
                        </div>
                    </div>
                    <div id="edit-form-${index}" style="display: none" class="edit-task">
                        <textarea type="textarea" id="edit-task-name-${index}">${task.taskName}</textarea>
                        <input type="date" id="edit-task-date-${index}"></input>
                        <button type="button" id="add-project" onclick="updateTask(${index}, 'edit-task-date-${index}', 'edit-task-name-${index}')">Save</button>
                    </div>
                    `;

            });

        }
    } else {
        container.innerHTML = `<div id="intro"><p>Start by adding a project and some tasks :)</p></div>`
    }

    container.innerHTML += 
    
        `<div id="add-projects"><a href="#" onclick="toggleVisible('addprojectblock')">Add project</a>
        <div id="addprojectblock" style="display:none;">
            <textarea type="textarea" id="projectname" placeholder="Project name"></textarea>
            <input type="date" id="projectduedate"></input>
            <button type="button" id="add-project" onclick="addNewProject()">Add project</button>
        </div></div>`
        
    storeProjects( projectList )
    storeTasks( taskList )
    
}
