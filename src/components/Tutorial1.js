import React from 'react'
import { useState,useRef, useEffect } from 'react';
import TodoList from './TodoList';
import * as uuid from 'uuid'
export default function Tutorial1() {
        // Not a good practise to useState hook Objects
        /*   
          const [state,setState] =useState({count: 4, theme: 'blue'})
          const count = state.count
          const theme = state.theme
        
          function decrementCount(){
            setState(prevState => {return {...prevState, count: prevState.count - 1}})
          }
        
          function incrementCount(){
            setState(prevState => {return {...prevState, count: prevState.count + 1}})
          } */
      
        const [count, setCount] = useState(4)
        const [theme, setTheme] = useState('blue')
        const [todos, setTodos] = useState([{ id: 1, name: 'Todo 1', complete: false }, { id: 2, name: 'Todo 2', complete: true }])
        const todoNameRef = useRef()
        const LOCAL_STORAGE_KEY = 'todoApp.todos'
      
      
        // to load item from local storage when page refresh
        useEffect(()=>{
          const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
          if (storedTodos) setTodos(storedTodos)
        }, [])
      
        // to store item into local storage so when page refresh wont disappear
        useEffect(()=>{
          localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
        },[todos])
        function handleAddTodo(e){
          const name = todoNameRef.current.value
          if(name==='') return 
          console.log(name)
          setTodos(prevTodos => {
            return [...prevTodos, {id:uuid.v4(), name:name, complete :false}]
          })
          todoNameRef.current.value = null
        }
      
      
        function decrementCount() {
          setCount(prevCount => prevCount - 1)
          setTheme('red')
        }
        function incrementCount() {
          setCount(prevCount => prevCount + 1)
          setTheme('blue')
        }
      
        function toggleTodo(id){
          const newTodos = [...todos]
          const todo = newTodos.find(todo => todo.id === id)
          todo.complete = !todo.complete
          setTodos(newTodos)
      
        }
      
        function handleClearTodos(){
          const  newTodos = todos.filter(todo => !todo.complete)
          setTodos(newTodos)
        }
      
        return (
          <>
            <TodoList todos={todos} toggleTodo = {toggleTodo} />
            <input ref= {todoNameRef} type="text"></input>
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear Complete</button>
            <div> {todos.filter(todo => !todo.complete).length} left to do</div>
            <button onClick={decrementCount}>-</button>
            <span>{count}</span>
            <span>{theme}</span>
            <button onClick={incrementCount}>+</button>
          </>
        );
      }
