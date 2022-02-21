import React,  { Fragment, useRef, useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { v4 as uuid } from 'uuid';
import './App.css';


/* What is { useState } ???

The hook useState, allows the component to have state. 
The state is a property that allows to re-render the component
with every change in the element we store as a state. */

/* How we use { useState } ???

Create a const with destructuring an array as useState IS an array.
It returns two properties:
#1 The state itself;
#2 The function that allows to change that state. 
*/

/* The return
We must use the () to wrap all the content we return if it occupy more than a line.
The function will ONLY return ONE ELEMENT! 
Inside that element you can nest all the elements you need.  
Old Style: wrapping the elements inside a <div>...</div> but its more difficult to style
New way: use React-native tool 'fragment' so it does not affect the style-rendering:
  #1 Simple way:  <> ... </>
  #2 Another way: <React.Fragment> ... </React.Fragment>
  #3 More efficient: destructuring when importing:
    import React,  { Fragment, useState } from 'react';
    export function App () {
      ...
      return (
        <Fragment> Everithing you want </Fragment>
      )
    }

*/
/*
How can we add new tasks???

Adding a handler 'onClick' to button: 
<button onClick={handleTodoAdd}>+</button>

Then we set the function.
To read what is coming from input we must use a reference.
React identifies the component that we are using, and with the hook useRef we create that reference.
Then when can use it inside the handleTodoAdd function.

A copy of tha previous state must be created so React can detect wheter a change is made.
This is made by inserting a function inside the hook of useState 'setTodos()'

We could create 'id' for every new task manually but there is a library that randomly creates id: uuid
*/
/*
Once a new task is created the text remains in the input.
So to make it dessapear we can we reset the value of todoTaskRef to null.
*/
/* 
Checking as done/undone a task with toggleTodo
Create a  function that recieve the id
Make a copy of the todos
Find the task with the id to modificate
For that found task, set the new status for property 'completed' 
And send the newTodos.
 */

/*
Everything is ok but when you refresh the page, the tasks are cleared out.
So to make the app more persistent we can use the localStorage by  calling another hook 'useEffect'
It allow to access to the component lifecycle.
*/

const KEY = 'todoApp.todos';

export function App() {
  
  const todoTaskRef = useRef();

  const [todos, setTodos] = useState([
    { id: 1, task: "Aprender React!", completed: false }
  ]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo)=> todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === '') return;

    setTodos((previousTodos) => {
      return [...previousTodos, {id: uuid(), task, completed: false}]
    })

    todoTaskRef.current.value = null
  }

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return ( 
    <Fragment>
      <div className='bodyWrapper'>
        <div className='todoController'>
          <input className='todoInput' ref={todoTaskRef} type='text' placeholder='Nueva Tarea' /> 
          <button className='addTodo' onClick={handleTodoAdd}>+</button>
          <button className='clearDone' onClick={handleClearAll}>-</button>
        </div>
        <div className='todoReport'>Te quedan {todos.filter((todo) => !todo.completed).length} tareas pendientes!</div>
        <TodoList todos={ todos } toggleTodo={toggleTodo} />
        </div>
        <Footer />
    </Fragment>
  );
}