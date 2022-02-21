import React from "react";
import { TodoItem } from "./TodoItem";

/*
Exporting a fn called 'TodoList'
That fn receive an array as parameter
And return a <ul> 
*/
/*
We use key for making easy to React making the DOM of components and identify them with a unique id.
*/

export function TodoList({ todos, toggleTodo }) {
    //For inserting JS code in JSX we use the {}
    return ( 
        <ul className="ul-tasks">
            { todos.map( (todo) => ( 
                <TodoItem key={todo.id} todo={ todo } toggleTodo={toggleTodo} /> 
                )
            )}
        </ul>)
}

