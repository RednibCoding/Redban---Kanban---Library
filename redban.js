
/*
	Redban - Kanban library
	Author: Michael Binder aka RednibCoding
	Date: 15.10.2020

	Licence: MIT
*/

const redban = {

// #######################  PRIVATE  #######################

		_onDragStart: function(event) {
			event.dataTransfer.setData("text/plain", event.target.id);
			const draggableElement = document.getElementById(event.target.id);
			draggableElement.style.opacity = 0.5;
		},

		_onDragEnd: function(event) {
			const draggableElement = document.getElementById(event.target.id);
			draggableElement.style.opacity = 1;
		},
		
		_onDragOver: function(event) {
			event.preventDefault();
		},
		
		_onDragDrop: function(event) {
			const id = event.dataTransfer.getData("text");
			const draggableElement = document.getElementById(id);
			let dropTarget = event.target;
			draggableElement.style.opacity = 1;
	
			if (dropTarget.className == "redban-task") {
				dropTarget = event.target.parentElement;
				dropTarget.appendChild(draggableElement);
			} else if (dropTarget.className == "redban-task-head" || dropTarget.className == "redban-task-body") {
				dropTarget = event.target.parentElement.parentElement;
				dropTarget.appendChild(draggableElement);
			} else if (dropTarget.className == "redban-task-container-dropzone") {
				dropTarget.appendChild(draggableElement);
			} else {
				console.warn("Unable to drop task '"+id+"'");
			}
			event.dataTransfer.clearData();
		},


// #######################  PUBLIC  #######################

	// Append redban-root to the body (use either this function or redban.append(elementId))
	init: function() {
		const redbanRoot = document.createElement("div");
		redbanRoot.id = "redban-root";
		document.body.appendChild(redbanRoot);
	},

	// Append redban-root to an element by id ( use either this function or redban.init())
	append: function(parentId) {
		const parent = document.getElementById(parentId);
		const redbanRoot = document.createElement("div");
		redbanRoot.id = "redban-root";
		parent.appendChild(redbanRoot);
	},

	// Get a column by it's id
	// Make sure to use this function instead of using "document.getElementById"
	// to make sure, only elements within "redban-root" are considered
	// otherwise you may run into name/id clashing problems
	getColumnById: function(id) {
		const root = document.getElementById("redban-root");
		const columns = root.getElementsByClassName("redban-task-container");
		for (i=0; i<columns.length; i++) {
			if (columns[i].id == id)
				return columns[i];
		}
		console.warn(`Column with id ${id} does not exist`)
		return null;
	},

	// Returns an array that contains all column names/ids
	getColumnIds: function() {
		let columnIds = [];
		const root = document.getElementById("redban-root");
		
		// Only consider elements within the "redban-root" element
		const columns = root.getElementsByClassName("redban-task-container");

		for (i=0; i<columns.length; i++) {
			columnIds.push(columns[i].id);
		}
		
		return columnIds;
	},

	// Get a task by it's id
	// Make sure to use this function instead of using "document.getElementById"
	// to make sure, only elements within "redban-root" are considered
	// otherwise you may run into name/id clashing problems
	getTaskById: function(taskId) {
		const columnId = redban.getColumnIdOfTask(taskId);
		const tasks = redban.getTasksInColumn(columnId);

		for (i=0; i<tasks.length; i++) {
			if (tasks[i].id == taskId) {
				return tasks[i];
			}
		}
	},

	// Get all tasks of a specific column
	getTasksInColumn: function(columnId) {
		const column = redban.getColumnById(columnId);
		const columnDropzone = column.children[1]; // 0 = task-container-header, 1 = task-container-dropzone
		const tasks = columnDropzone.getElementsByClassName("redban-task");
		return tasks;
	},

	// Returns an array that contains all task id's in a specific column
	getTaskIdsInColumn: function(columnId) {
		const column = redban.getColumnById(columnId);
		const columnDropzone = column.children[1]; // 0 = task-container-header, 1 = task-container-dropzone
		const tasks = columnDropzone.getElementsByClassName("redban-task");
		let taskIds = [];
		for (i=0; i<tasks.length ; i++) {
			taskIds.push(tasks[i].id);
		}
		return taskIds;
	},

	// Get the column id the task is present in
	getColumnIdOfTask: function(taskId) {
		const columnIds = redban.getColumnIds();
		for (i=0; i<columnIds.length; i++) {
			const colId = columnIds[i];
			const taskIds = redban.getTaskIdsInColumn(colId);
			for (j=0; j<taskIds.length; j++) {
				if (taskIds[j] == taskId) {
					return colId;
				}
			}
		}
		console.warn(`Task with id ${taskId} does not exist`);
		return null;		
	},

	// Returns the head content of a task with the given id
	getTaskHeadContent: function(taskId) {
		const task = redban.getTaskById(taskId);
		const head = task.getElementsByClassName("redban-task-head");
		return head[0].innerHTML;
	},

	// Returns the body content of a task with the given id
	getTaskBodyContent: function(taskId) {
		const task = redban.getTaskById(taskId);
		const body = task.getElementsByClassName("redban-task-body");
		return body[0].innerHTML;
	},

	// Add a task column (e.g. To do, In Progress, Done etc...)
	// Note: id must be unique
	addColumn: function(id) {
		const root = document.getElementById("redban-root")

		const taskContainer = document.createElement("div");
		taskContainer.className = "redban-task-container";
		taskContainer.id = id;

		const taskContainerHeader = document.createElement("div");
		taskContainerHeader.className = "redban-task-container-header";
		taskContainerHeader.innerHTML = `${id}`;

		const taskContainerBody = document.createElement("div");
		taskContainerBody.className = "redban-task-container-dropzone";
		taskContainerBody.setAttribute("ondragover", "redban._onDragOver(event)");
		taskContainerBody.setAttribute("ondrop", "redban._onDragDrop(event)");

		taskContainer.appendChild(taskContainerHeader);
		taskContainer.appendChild(taskContainerBody);

		root.appendChild(taskContainer);
	},

	// Add a new task to an existing column
	// Note: taskId must be unique
	addTask: function(columnId, taskId, taskHeader, taskText) {
		const column = redban.getColumnById(columnId);
		const columnDropzone = column.children[1]; // 0 = task-container-header, 1 = task-container-dropzone
		const task = document.createElement("div");
		task.id = taskId;
		task.className = "redban-task";
		task.setAttribute("draggable", "true");
		task.setAttribute("ondragstart", "redban._onDragStart(event)");
		task.setAttribute("ondragend", "redban._onDragEnd(event)");
		
		const taskHead = document.createElement("div");
		taskHead.className = "redban-task-head";
		taskHead.innerHTML = `${taskHeader}`

		const taskIdEl = document.createElement("div");
		taskIdEl.className = "redban-task-id";
		taskIdEl.innerHTML = `${taskId}`;

		const taskBody = document.createElement("div");
		taskBody.className = "redban-task-body";
		taskBody.innerHTML = taskText;

		task.appendChild(taskHead);
		task.appendChild(taskIdEl);
		task.appendChild(taskBody);
		
		columnDropzone.appendChild(task);
	},
}