// import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");

    // Fetch tasks from database
    useEffect(() => {
        fetch('http://localhost:8000/todos')
            .then(res => res.json())
            .then(res => setTodoList(res))
            .catch(err => console.log(err))
    }, [])

    // Function to toggle the editable state for a specific row
    const toggleEditable = (id) => {
        const rowData = todoList.find((data) => data._id === id);
        if (rowData) {
            setEditableId(id);
            setEditedTask(rowData.task);
            setEditedStatus(rowData.status);
        } else {
            setEditableId(null);
            setEditedTask("");
            setEditedStatus("");
        }
    };


    // Function to add task to the database
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask || !newStatus) {
            alert("All fields must be filled out.");
            return;
        }

        const body = {
            task: newTask,
            status: newStatus
        }

        fetch('http://localhost:8000/todos', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Function to save edited data to the database
    const saveEditedTask = (id) => {
        const editedData = {
            task: editedTask,
            status: editedStatus
        };

        // If the fields are empty
        if (!editedTask || !editedStatus) {
            alert("All fields must be filled out.");
            return;
        }

        // Updating edited data to the database through updateById API
        fetch(`http://localhost:8000/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(editedData),
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                console.log(res);
                setEditableId(null);
                setEditedTask("");
                setEditedStatus("");
                window.location.reload();
            })
            .catch(err => console.log(err));
    }


    // Delete task from database
    const deleteTask = (id) => {
        fetch(`http://localhost:8000/todos/${id}`, { method: 'DELETE' })
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err =>
                console.log(err)
            )
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7">
                    <h2 className="text-center">Todo List</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-primary">
                                <tr>
                                    <th>Task</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {Array.isArray(todoList) ? (
                                <tbody>
                                    {todoList.map((data) => (
                                        <tr key={data._id}>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedTask}
                                                        onChange={(e) => setEditedTask(e.target.value)}
                                                    />
                                                ) : (
                                                    data.task
                                                )}
                                            </td>
                                            <td>
                                                {editableId === data._id ? (
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={editedStatus}
                                                        onChange={(e) => setEditedStatus(e.target.value)}
                                                    />
                                                ) : (
                                                    data.status
                                                )}
                                            </td>

                                            <td>
                                                {editableId === data._id ? (
                                                    <button className="btn btn-success btn-sm" onClick={() => saveEditedTask(data._id)}>
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-primary btn-sm" onClick={() => toggleEditable(data._id)}>
                                                        Edit
                                                    </button>
                                                )}
                                                <button className="btn btn-danger btn-sm ms-1" onClick={() => deleteTask(data._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="4">Loading products...</td>
                                    </tr>
                                </tbody>
                            )}


                        </table>
                    </div>
                </div>
                <div className="col-md-5">
                    <h2 className="text-center">Add Task</h2>
                    <form className="bg-light p-4">
                        <div className="mb-3">
                            <label>Task</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Task"
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Status"
                                onChange={(e) => setNewStatus(e.target.value)}
                            />
                        </div>
                        <button onClick={addTask} className="btn btn-success btn-sm">
                            Add Task
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default Todo;
