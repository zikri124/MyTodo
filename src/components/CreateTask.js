import { useRef } from "react"

function CreateTask({ tasks, setTasks, setError, setIsPending }) {
    const newTaskNameInput = useRef()
    
    async function HandleCreateTask(event) {
        event.preventDefault()

        setIsPending(true)

        const newTaskName = event.target.elements.taskName.value

        const body = {
            isDone: false,
            name: newTaskName 
        }

        const updatedTasks = tasks.slice()

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
                updatedTasks.push(data)
                newTaskNameInput.current.value = ""
                setTasks(updatedTasks)
                setIsPending(false)
            }
        }).catch((err) => {
            setError(err.message)
        })
    }
    
    return (
        <div className="mb-4">
            <form onSubmit={HandleCreateTask}>
                <div className="join flex">
                    <input className="input input-bordered grow join-item" name="taskName" placeholder="Insert task name" ref={newTaskNameInput} />
                    <button className="btn grow-0 join-item">Add task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask