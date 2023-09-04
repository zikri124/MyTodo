import { useState } from 'react'

function Home() {
    const [tasks, setTasks] = useState(Array)

    return (
        <div className='md:container md:mx-auto'>
            <h1 className='text-center my-8 text-xl'>You have <strong>{tasks.length}</strong> tasks remaining</h1>

            <TasksList tasks={tasks} />
        </div>
    )
}

function TasksList({ tasks }) {
    return (
        <div className='mx-auto w-full md:w-3/4 lg:w-1/2'>
            {tasks.map((task) => (
                <div className='card bg-base-100 glass'>
                    <div className="card-body flex flex-row items-center">
                        <input type="checkbox" className="checkbox checkbox-success mx-4" defaultChecked={ task.isDone? 'checked':'' } />
                        <h2 className="card-title">{ task.name }</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home;
