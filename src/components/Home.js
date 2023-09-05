import useFetch from '../useFetch';
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';

function Home() {
    const { data: tasks, error, isPending } = useFetch('http://localhost:8000/tasks')

    return (
        <div className='md:container md:mx-auto'>
            { isPending && <Loading /> }
            { error && <ErrorAlert error={error} /> }
            { tasks && <TaskStat tasks={tasks} /> }
            { tasks && <TasksList tasks={tasks} /> }
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

function TasksList({ tasks }) {
    return (
        <div className='mx-auto w-full md:w-3/4 lg:w-1/2'>
            {tasks.map((task) => (
                <div className='card bg-base-100 glass mb-2'>
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
