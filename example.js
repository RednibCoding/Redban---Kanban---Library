

redban.init(); // Use either this function to append it to the body or use redban.append(elementId) to append it to an existing element
redban.addColumn("To do");
redban.addColumn("In progress");
redban.addColumn("For review");
redban.addColumn("Done");

redban.addTask("To do", "#1", "Do this", "This is important and should be done immediately!!!");
redban.addTask("To do", "#2", "Do that", "This is important and should be done immediately!!!");
redban.addTask("To do", "#3", "This also", "This is important and should be done immediately!!!");
redban.addTask("To do", "#4", "That also", "This is important and should be done immediately!!!");
redban.addTask("To do", "#5", "And this also", "This is important and should be done immediately!!!");
redban.addTask("To do", "#6", "And that also", "This is important and should be done immediately!!!");

console.log(redban.getTaskBodyContent("#5"));