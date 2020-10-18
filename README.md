# Redban-Kanban-Library
Minimalistic Kanban library in vanilla javascript without any dependencies

![Alt text](./doc/redban1.png?raw=true "Title")
![Alt text](./doc/redban2.png?raw=true "Title")

## Include Redban
Just add the files _redban.js_ and _redban.css_ to your html file.
```html
<!DOCTYPE html>
<html>
	<head>
		<title>Redban - Kanban board</title>
		<link rel="stylesheet" href="redban.css" />
	</head>

	<body>
        <script src="redban.js"></script>
	</body>
</html>
```

## Use Redban
Create a javascript file and add it to your html file after _redban.js_:
```html
<!DOCTYPE html>
<html>
	...

	<body>
        <script src="redban.js"></script>

        <script src="myscript.js"></script>
	</body>
</html>
```

Now you can either add redban to the body of your document:
```javascript
redban.init();
```
Or you can append it to an existing element in the DOM:
```javascript
redban.append("myElementId");
```
Create some columns:
Note: _id_ of columns must be unique
```javascript
redban.addColumn("To do");
redban.addColumn("In progress");
redban.addColumn("For review");
redban.addColumn("Done");
```
Add some tasks to the _To do_ column:
Note: _id_ of tasks must be unique
```javascript
redban.addTask("To do", "#1", "Do this", "This is important!!!");
redban.addTask("To do", "#2", "Do that", "This is important!!!");
redban.addTask("To do", "#3", "This also", "This is important!!!");
redban.addTask("To do", "#4", "That also", "This is important!!!");
redban.addTask("To do", "#5", "And this also", "This is important!!!");
redban.addTask("To do", "#6", "And that also", "This is important!!!");
```

##Utilities

####Get a column by it's id
Make sure to use this function instead of using "document.getElementById"
to make sure, only elements within "redban-root" are considered
otherwise you may run into name/id clashing problems
```javascript
redban.getColumnById(id)
```

####Returns an array that contains all column names/ids
```javascript
redban.getColumnIds()
```

####Get a task by it's id
Make sure to use this function instead of using "document.getElementById"
to make sure, only elements within "redban-root" are considered
otherwise you may run into name/id clashing problems
```javascript
redban.getTaskById(taskId)
```

####Get all tasks of a specific column returns them as HTMLCollection
```javascript
redban.getTasksInColumn(columnId)
```

####Returns an array that contains all task id's in a specific column
```javascript
redban.getTaskIdsInColumn(columnId)
```

####Get the columnId the task is present in
```javascript
redban.getColumnIdOfTask(taskId)
```

####Returns the head content of a task with the given id
```javascript
redban.getTaskHeadContent(taskId)
```

####Returns the body content of a task with the given id
```javascript
redban.getTaskBodyContent(taskId)
```

####Add a task column (e.g. To do, In Progress, Done etc...) Note: id must be unique
```javascript
redban.addColumn(id)
```

####Add a new task to an existing column Note: taskId must be unique
```javascript
redban.addTask(columnId, taskId, taskHeader, taskText)
```

####More comming soon