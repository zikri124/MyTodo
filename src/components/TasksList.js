import { useState } from "react"
import CreateTask from "./CreateTask"
import { useTasks, useTasksDispatch } from "./TasksProvider"
import { useAppStateDispatch } from "./AppStateProvider"

function TasksList() {
    const [editMode, setEditMode] = useState(null)
    const tasks = useTasks()
    const tasksDispatch = useTasksDispatch()
    const appStateDispatch = useAppStateDispatch()

    function viewTaskTemplate(task) {
        return (
            <div className='w-full flex'>
                <div className='flex-1 flex items-center' onClick={() => setEditMode(task.id)}>
                    <div>
                        <h3 className="text-lg font-medium h-full w-full wrapper">{task.name}</h3>
                    </div>
                </div>
                <div className='flex-none'>
                    <button className="btn btn-square btn-ghost" onClick={() => document.getElementById('modal' + task.id).showModal()}>
                        <img width="24" height="24" src="https://img.icons8.com/windows/32/trash.png" alt="trash" />
                    </button>
                    <dialog id={'modal' + task.id} className="modal">
                        <div className="modal-box">
                            <h4 className="font-bold text-lg">Are you sure to delete this task?</h4>
                            <p className="py-4">{task.name}</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-accent me-4" onClick={() => HandleDeleteTask(task.id)}>Delete</button>
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
                        <input name='taskName' placeholder="Task name" className="input input-bordered join-item grow text-lg font-semibold" type='text' maxLength={40} defaultValue={task.name}></input>
                        <button className="btn btn-primary join-item grow-0" type='submit'>Edit</button>
                        <button className="btn btn-outline join-item grow-0" onClick={() => setEditMode(null)}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    function HandleDeleteTask(id) {
        fetch('http://localhost:8000/tasks/' + id, {
            method: "DELETE"
        }).then(() => {
            tasksDispatch({
                type: 'delete_task',
                id: id
            })
        }).catch((err) => {
            appStateDispatch({
                type: 'add_error',
                error: err.message
            })
        })
    }

    function HandleEditTask(event) {
        event.preventDefault()
        const task = tasks.find(task => task.id === editMode)

        const newTaskName = event.target.elements.taskName.value

        const body = {
            is_done: task.is_done,
            name: newTaskName
        }

        fetch('http://localhost:8000/tasks/' + task.id, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            tasksDispatch({
                type: 'edit_task',
                task: {
                    id: task.id,
                    name: body.name,
                    done: body.is_done
                }
            })
        }).catch((err) => {
            appStateDispatch({
                type: 'add_error',
                error: err.message
            })
        })

        setEditMode(null)
    }

    function HandleToggleTask(id) {
        const task = tasks.find(task => task.id === id)
        console.log(task)

        const body = {
            is_done: !task.is_done,
            name: task.name
        }

        fetch('http://localhost:8000/tasks/' + id, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            tasksDispatch({
                type: 'edit_task',
                task: {
                    id: id,
                    name: body.name,
                    is_done: body.is_done
                }
            })
        }).catch((err) => {
            appStateDispatch({
                type: 'add_error',
                error: err.message
            })
        })
    }

    return (
        <div className='md:container md:mx-auto w-full md:w-3/4 lg:w-1/2 flex flex-col gap-6' style={{ maxWidth: '100vw' }}>
            <CreateTask />
            {tasks.map((task) => (
                <div className='card border border-neutral-400' key={task.id}>
                    <div className="py-2 px-6 flex flex-row items-center">
                        <div className="flex-none">
                            <input type="checkbox" style={{ marginTop: 'revert' }} className="checkbox checkbox-primary me-4" onChange={() => HandleToggleTask(task.id)} defaultChecked={task.is_done ? 'checked' : ''} />
                        </div>
                        <div className="flex-1 w-full">
                            {editMode === task.id ? viewEditTaskTemplate(task) : viewTaskTemplate(task)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TasksList
