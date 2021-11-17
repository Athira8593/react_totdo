import React from 'react'
import "./TodoApp.css" 
import {useEffect} from "react"

const Form = ({input, setInput, todos, setTodos, EditTodo, setEditTodo,setStatus}) => {
    const updateTodo = (text, id, completed) =>{
        const newTodo = todos.map((todo) => 
            todo.id === id ? {text, id, completed} : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };

    useEffect(() => {
        if (EditTodo){
            setInput(EditTodo.text)
        }
        else{
            setInput("")
        }
    }, [setInput,EditTodo]
    );
    const onInputChange = (event)=> {
        setInput(event.target.value);
    };





    const onFormSubmit=(event)=>{
        event.preventDefault();
        if (!EditTodo){
            setTodos([...todos, {id:Date.now(), text: input, completed: false}]);
        setInput("");
        } else{
            updateTodo(input, EditTodo.id, EditTodo.completed)
        }
    }
    
    return(
        <form onSubmit={onFormSubmit}>
            <select>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
           
            <div className="form-div">
            <input type="text" placeholder="Enter a Task..."
             value= {input} required onChange={onInputChange}></input>
            <button  type="text"><i className="p fa fa-plus "></i></button>
            </div>
        </form>
    )
}
export default Form;