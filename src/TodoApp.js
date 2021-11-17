import React from 'react'
import "./TodoApp.css" 
import {useState, useEffect} from "react"
import Form from './Form';



function TodoApp() {
    const initialState = JSON.parse(localStorage.getItem("todos")) || [];
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState(initialState);
    const [status, setStatus] = useState("all");
    const [filteredTodo, setfilteredTodo] = useState([]);
    const [EditTodo, setEditTodo] = useState(null);
    const deleteHandler = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }



    const editHandler =({id})=>{
        const findTodo = todos.find((todo)=> todo.id === id);
        setEditTodo(findTodo);
    };

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(()=> {
        filterHandler();
    }, [todos,status]);

    const filterHandler = ()=>{
        switch(status){
        case 'Completed':
            setfilteredTodo(todos.filter(todo => todo.completed === true));
            break;
        case 'active':
            setfilteredTodo(todos.filter(todo => todo.completed === false));
            break;
        default:
            setfilteredTodo(todos);
            break;
        }
    };
    
    const completeHandler = (obj)=>{
        setTodos(
            todos.map((item) => {
                if (item.id === obj.id){ 
                    console.log(item.completed)
                    return {...item, completed: !item.completed}
                    
                }
                return item;
            })
        )
    }
  
    return (
            <div className="container">
                <div className="main-head"><h1>TODO APP</h1></div>
                <div className="filter">
        
            </div>
                <div className="section">
                    <Form 
                    input = {input}
                    setInput = {setInput}
                    todos ={todos}
                    setTodos= {setTodos}
                    EditTodo={EditTodo}
                    setEditTodo={setEditTodo}
                    setStatus = {setStatus}
                    />
                </div>
           

            {filteredTodo.map((obj) => {
                if (obj.text) {
                    return(
                        <div className="todo">
                        <ul className="todo-list">
                            <li className={`todo-item ${obj.completed ? "completed" : ""}`}>  {obj.text}<p> <button onClick={()=> completeHandler(obj)} >  <i className=" fa fa-check-circle"></i></button></p> 
                            <button ><i onClick={()=> editHandler(obj)}  className="fa fa-pencil"></i> </button>
                            <button ><i onClick={()=> deleteHandler(obj)} className="fa fa-trash"></i> </button></li>
                        </ul>
                    </div>
                    )}
                return null
            })}                   
        </div>
    );
}
export default TodoApp
