import useFetch from './useFetch';
import Loading from './components/Loading';
import ErrorAlert from './components/ErrorAlert';
import TasksList from './components/TasksList';
import { useState } from 'react';

function Home() {    
    const [tasks, setTasks] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(true)
    
    useFetch('http://localhost:8000/tasks', setTasks, setError, setIsPending) 

    return (
        <div className='md:container md:mx-auto'>
            { isPending && <Loading /> }
            { error && <ErrorAlert error={error} tasks={tasks} /> }
            { tasks && <TaskStat tasks={tasks} /> }
            { tasks && <TasksList tasks={tasks} setTasks={setTasks} setError={setError} setIsPending={setIsPending} /> }
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
