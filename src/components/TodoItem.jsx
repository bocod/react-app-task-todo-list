import React from "react";

/*
This function returns a <li> because his father (in TodoList) is a <ul>

It's properties will be:
    # an object 'todo', wich is the same object we find at App.js :
        { id: 1, task: "Aprender React!", completed: false }
        In TodoList at App.js we pass the entire array of objects 'todos'
        Then in TodoList.jsx we map the array and for each one we print a TodoList component with a 'todo' property wich we we'll be passing
*/
/*
The 'todoItem' will contain the same 3 properties that are being passed from App.js:
'id', 'task' & 'completed'
So we do a destructuring in  order to obtain that properties from the 'todo'
*/
/*
Recieving the toggleTodo we manipulate it adding a handler to the checkbox input with onChange
And we create a new function in order to pass the id as an argument of the function toggleTodo
*/

export function TodoItem({ todo, toggleTodo }) {
    const { id, task, completed } = todo;

    const handleTodoClick = () => {
        toggleTodo(id)
    }

    return (
        <li>
            <input type='checkbox' checked={completed} onChange={handleTodoClick}/>
            { task }
        </li>
    )
}