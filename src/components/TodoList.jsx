import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  let initalTodo;

  if(localStorage.getItem('todos') === null) {
    initalTodo = [];
  } else {
    initalTodo = JSON.parse(localStorage.getItem('todos'));
  }

  const [todos, setTodos] = useState(initalTodo);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    if(!todo.text || /^\s*$/.test(todo.text)) return;

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  }

  const updateTodo = (todoId, newValue) => {
    if(!newValue.text || /^\s*$/.test(newValue.text)) return;

    const updatedTodos = todos.map((item) => item.id === todoId ? newValue : item);

    setTodos(updatedTodos);
  }

  const removeTodo = (id) => {
    const removeArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removeArr);
  }

  const completeTodo = (id) => { 
    let updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <div>
      <h1>To do List</h1>
      <TodoForm 
        onSubmit={addTodo}
      />
      <Todo 
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  ) 
}

export default TodoList;