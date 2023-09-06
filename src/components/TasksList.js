import { useState } from "react"
import CreateTask from "./CreateTask"

function TasksList({ tasks, setTasks, setError, setIsPending }) {
    const [editMode, setEditMode] = useState(null)

    function viewTaskTemplate(task) { 
        return (
            <div className="flex w-100 items-center">
                <div className="wrapper grow" onClick={() => setEditMode(task.id)}>
                    {task.isDone?<h3 className="text-base font-medium line-through text-gray-500">{task.name}</h3>:<h3 className="text-base font-medium">{task.name}</h3>}
                </div>
                <div className="grow-0">
                    <button className="btn btn-square btn-ghost" onClick={()=>document.getElementById('modal'+task.id).showModal()}>
                        <img width="24" height="24" src="https://img.icons8.com/windows/32/trash.png" alt="trash"/>
                    </button>
                    <dialog id={'modal'+task.id} className="modal">
                        <div className="modal-box">
                            <h4 className="font-bold text-lg">Are you sure to delete this task?</h4>
                            <p className="py-4">{task.name}</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-accent me-4" onClick={()=> HandleDeleteTask(task.id)}>Delete</button>
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                </dialog>
                </div>
            </div>
        )
    } 

    function viewEditTaskTemplate(task) {
        return (
            <div> 
                <form onSubmit={HandleEditTask}>
                    <div className="join flex">
                        <input name='taskName' placeholder="Task name" className="input input-bordered join-item grow" type='text' maxLength={40} defaultValue={task.name}></input>
                        <button className="btn btn-primary join-item grow-0" type='submit'>Edit</button>
                        <button className="btn btn-outline join-item grow-0" onClick={() => setEditMode(null)}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    function HandleDeleteTask(id) {
        const updatedTasks = tasks.slice()
        const taskIndex = updatedTasks.findIndex(task => task.id === id)
        updatedTasks.splice(taskIndex, 1)
        
        fetch('http://localhost:8000/tasks/'+id, {
            method: "DELETE"
        }).then(() => {
            setTasks(updatedTasks)
        }).catch((err) => {
            setError(err.message)
        })
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
        <div className='md:container md:mx-auto w-full md:w-3/4 lg:w-1/2' style={{maxWidth:'100vw'}}>
            <CreateTask tasks={tasks} setTasks={setTasks} setError={setError} setIsPending={setIsPending} />
            {tasks.map((task) => (
                <div className='card bg-base-100 glass mb-4' key={task.id}>
                    <div className="py-2 px-6 flex flex-row items-center">
                        <div className="flex-none">
                            <input type="checkbox" style={{marginTop:'revert'}} className="checkbox checkbox-success me-4" onChange={() => HandleToggleTask(task.id)} defaultChecked={ task.isDone? 'checked':'' } />
                        </div>
                        <div className="flex-1">
                            {editMode === task.id ? viewEditTaskTemplate(task) : viewTaskTemplate(task)}   
                        </div>                    
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TasksList
