
function TasksList({ tasks, setTasks, setError }) {
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
            {tasks.map((task) => (
                <div className='card bg-base-100 glass mb-2' key={task.id}>
                    <div className="card-body flex flex-row items-center">
                        <input type="checkbox" className="checkbox checkbox-success mx-4" onChange={() => HandleToggleTask(task.id)} defaultChecked={ task.isDone? 'checked':'' } />
                        <div>{task.isDone?<h2 className="card-title line-through text-gray-500">{task.name}</h2>:<h2 className="card-title">{task.name}</h2>}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TasksList
