export class CreateTask {
  constructor(taskName, taskDueDate, taskProjectName) {
    this.taskProjectName = taskProjectName;
    this.taskName = taskName;
    this.taskDueDate = taskDueDate;
    this.taskActive = "active";
  }
}

export class CreateProject {
  constructor(projectName, projectDueDate) {
    this.projectName = projectName;
    this.projectDueDate = projectDueDate;
  }
}
