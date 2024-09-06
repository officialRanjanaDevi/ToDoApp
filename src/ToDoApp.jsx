import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDoApp.css";

export default function ToDoList() {
    let [todos, setTodos] = useState([]);
    let [newTodo, setNewToDo] = useState("");
    let [progressBar, setProgressBar] = useState(1);

    let updateProgressBar = (updatedTodos) => {
        let completedTasks = updatedTodos.filter((todo) => todo.isdone).length;
        let progress = (completedTasks * 100) / updatedTodos.length + 1;
        setProgressBar(progress);
    };
    let updateToDo = (event) => {
        setNewToDo(event.target.value);
    };
    let addNewTask = () => {
        let updatedTodos = [
            ...todos,
            { task: newTodo, id: uuidv4(), isdone: false },
        ];
        setTodos(updatedTodos);
        updateProgressBar(updatedTodos);
        setNewToDo("");
    };
    let deleteTask = (id) => {
        let updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        updateProgressBar(updatedTodos);
    };

    let markAllAsRead = () => {
        let updatedTodos = todos.map((todo) => ({
            ...todo,
            isdone: true,

        }));
        setTodos(updatedTodos);
        updateProgressBar(updatedTodos);
    };

    let taskCompleted = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isdone: true,
                };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
        updateProgressBar(updatedTodos);
    };

    let count = 1;
    return (
        <>
            <div className="toDoApp">
                <div className="toDoApp-text">
                    <p>Keep going</p>
                    <div className="progress" role="progressbar" aria-valuenow={progressBar} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar text-bg-warning" style={{ width: `${progressBar}%` }}>

                        </div>
                    </div>
                </div>
                <div className="counter">
                    <p>
                        {todos.filter((todo) => todo.isdone).length}/{todos.length}
                    </p>
                </div>
            </div>

            <div className="inputTask">
                <input
                    type="text"
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={updateToDo}
                />
                <i className="fa-solid fa-circle-plus" onClick={addNewTask}></i>
            </div>

            <div className="taskList">
                <ul className="row ">

                    {todos.map((todo) => {

                        let doneStyle = { backgroundColor: todo.isdone ? "green" : "#8955bb" };
                        return (
                            <li className="col-sm-5 " key={todo.id} style={doneStyle}>
                                <span>{count++}. {todo.todo}</span>

                                <div>
                                    <i className="fa-solid fa-square-check" style={doneStyle} onClick={() => taskCompleted(todo.id)}></i>
                                    <i className="fa-regular fa-trash-can" onClick={() => deleteTask(todo.id)}></i>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <button className="markall" onClick={markAllAsRead}>Mark All as Done</button>
            </div>


        </>
    );
}
