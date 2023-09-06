import { useState } from "react"
import CreateTask from "./CreateTask"

function TasksList({ tasks, setTasks, setError, setIsPending }) {
    const [editMode, setEditMode] = useState(null)

    function viewTaskTemplate(task) {
        return (
            <div onClick={() => setEditMode(task.id)}>{task.isDone?<h2 className="card-title line-through text-gray-500">{task.name}</h2>:<h2 className="card-title">{task.name}</h2>}</div>
        )
    }

    function viewEditTaskTemplate(task) {
        return (
            <div>
                <form onSubmit={HandleEditTask}>
                    <div className="join">
                        <input name='taskName' placeholder="Task name" className="input input-bordered join-item" type='text' defaultValue={task.name}></input>
                        <button className="btn btn-primary join-item" type='submit'>Edit</button>
                        <button className="btn btn-outline join-item" onClick={() => setEditMode(null)}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    function HandleEditTask(event) {
        event.preventDefault()
        const updatedTasks = tasks.slice()
        const taskIndex = tasks.findIndex(task => task.id === editMode)

        const newTaskName = event.target.elements.taskName.value

        updatedTasks[taskIndex].name = newTaskName    

        const body = {
            isDone: updatedTasks[taskIndex].isDone,
            name: newTaskName
        }

        fetch('http://localhost:8000/tasks/'+taskIndex, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            setTasks(updatedTasks)
        }).catch((err) => {
            setError(err.message)
        })

        setEditMode(null)
    }
    
    function HandleToggleTask(id) {
        const updatedTasks = tasks.slice()
        const taskIndex = updatedTasks.findIndex(task => task.id === id)

        var isDoneTask = updatedTasks[taskIndex].isDone 
        updatedTasks[taskIndex].isDone = !isDoneTask

        const body = {
            isDone: !isDoneTask,
            name: updatedTasks[taskIndex].name
        }

        fetch('http://localhost:8000/tasks/'+id, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            setTasks(updatedTasks)
        }).catch((err) => {
            setError(err.message)
        })
    }
    
    return ( 
        <div className='mx-auto w-full md:w-3/4 lg:w-1/2'>
            <CreateTask tasks={tasks} setTasks={setTasks} setError={setError} setIsPending={setIsPending} />
            {tasks.map((task) => (
                <div className='card bg-base-100 glass mb-2' key={task.id}>
                    <div className="card-body flex flex-row items-center">
                        <input type="checkbox" className="checkbox checkbox-success me-4" onChange={() => HandleToggleTask(task.id)} defaultChecked={ task.isDone? 'checked':'' } />
                        {editMode === task.id ? viewEditTaskTemplate(task) : viewTaskTemplate(task)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TasksList
