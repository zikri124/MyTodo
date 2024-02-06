import useFetch from '../../utils/useFetch';
import Loading from '../ui/Loading';
import ErrorAlert from '../ErrorAlert';
import TasksList from '../TasksList';
import { useAppState, useAppStateDispatch } from '../AppStateProvider';
import { useTasks, useTasksDispatch } from '../TasksProvider';

function Home() {
    const appStateDispatch = useAppStateDispatch()
    const appState = useAppState()
    const tasks = useTasks()
    const tasksDispatch = useTasksDispatch()

    useFetch('http://localhost:8000/tasks', tasksDispatch, appStateDispatch)

    return (
        <div className='w-full h-full'>
            {appState.is_loading && <Loading />}
            {appState.is_error && <ErrorAlert />}
            {tasks && <TaskStat tasks={tasks} />}
            {tasks && <TasksList />}
        </div>
    )
}

function TaskStat({ tasks }) {
    let tasksGoing = 0

    tasks.forEach(task => {
        if (!task.is_done) {
            tasksGoing++
        }
    })

    return (
        <h1 className='text-center py-8 text-xl'>You have <strong>{tasksGoing}</strong> {tasksGoing > 1 ? 'tasks' : 'task'} remaining</h1>
    )
}

export default Home;
