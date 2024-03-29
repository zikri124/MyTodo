import { useRef } from "react"
import { useTasksDispatch } from "./TasksProvider"
import { useAppStateDispatch } from "./AppStateProvider"

function CreateTask() {
    const tasksDispatch = useTasksDispatch()
    const appStateDispatch = useAppStateDispatch()
    const newTaskNameInput = useRef()
    
    async function HandleCreateTask(event) {
        event.preventDefault()

        appStateDispatch({
            type: 'set_is_loading',
            is_loading: true
        })

        const newTaskName = event.target.elements.taskName.value

        const body = {
            is_done: false,
            name: newTaskName 
        }

        await fetch('http://localhost:8000/tasks', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            if (data) {
                newTaskNameInput.current.value = ""
                tasksDispatch({
                    type: 'add_task',
                    task: {
                        id: data.id,
                        name: body.name
                    }
                })
                appStateDispatch({
                    type: 'set_is_loading',
                    is_loading: false
                })
            }
        }).catch((err) => {
            appStateDispatch({
                type: 'add_error',
                error: err.message
            })
        })
    }
    
    return (
        <div className="mb-4">
            <form onSubmit={HandleCreateTask}>
                <div className="join flex">
                    <input className="input input-bordered grow join-item" name="taskName" placeholder="Insert task name" ref={newTaskNameInput} />
                    <button className="btn btn-primary grow-0 join-item">Add task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask