import useFetch from '../useFetch';
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';
import TasksList from './TasksList';
import { useState } from 'react';

function Home() {    
    const [tasks, setTasks] = useState(null)
    const [error, setError] = useState(null)
    
    const { isPending } = useFetch('http://localhost:8000/tasks', setTasks, setError)

    return (
        <div className='md:container md:mx-auto'>
            { isPending && <Loading /> }
            { error && <ErrorAlert error={error} setTasks={setTasks} /> }
            { tasks && <TaskStat tasks={tasks} /> }
            { tasks && <TasksList tasks={tasks} setTasks={setTasks} setError={setError} /> }
        </div>
    )
} 

function TaskStat({ tasks }) {
    let tasksGoing = 0

    tasks.forEach(task => {
        if (!task.isDone) {
            tasksGoing++
        }
    });
    
    return (
        <h1 className='text-center my-8 text-xl'>You have <strong>{tasksGoing}</strong> { tasksGoing>1? 'tasks':'task' } remaining</h1>
    )
}

export default Home;
