import React from 'react'
import Todo from './Todo'

export default function TodoList({todos,toggleTodo}) {
  return (
    todos.map(todo =>{
        // key to allow react to re-render the component instead of re-render all sub components in an array
        return <Todo key={todo.id} todo = {todo} toggleTodo={toggleTodo}/>
    })
  )
}
