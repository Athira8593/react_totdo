import React from 'react'
import "./TodoApp.css"
import { useEffect } from "react"

const Form = ({ input, setInput, todos, setTodos, EditTodo, setEditTodo }) => {
    const updateTodo = (text, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { text, id, completed } : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    };
    
    useEffect(() => {
        if (EditTodo) {
            setInput(EditTodo.text)
        }
        else {
            setInput("")
        }
    }, [setInput, EditTodo]
    );
    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (!EditTodo) {
            setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
            setInput("");
        } else {
            updateTodo(input, EditTodo.id, EditTodo.completed)
        }
    }

    return (
        <form onSubmit={onFormSubmit} >
            <div className="form-div ">
                <input type="text" placeholder="Enter a Task..."
                    value={input} required onChange={onInputChange}></input>
                <button style={{marginBottom:'1rem'}} type="text"><i className="p fa fa-plus"></i></button>
            </div>
        </form>
    )
}
export default Form;