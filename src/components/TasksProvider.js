import { createContext, useContext, useReducer } from "react"

const TasksValueContext = createContext()
const TasksDispatchContext = createContext(null)

export const TasksProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        []
    )

    return (
        <TasksValueContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksValueContext.Provider>
    )
}

export const useTasks = () => {
    return useContext(TasksValueContext)
}

export const useTasksDispatch = () => {
    return useContext(TasksDispatchContext)
}

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case 'set_tasks': {
            return action.tasks
        }
        case 'add_task': {
            return [
                ...tasks, {
                    id: action.task.id,
                    name: action.task.name,
                    id_done: false
                }
            ]
        }
        case 'edit_task': {
            return tasks.map(task => {
                if (task.id === action.task.id) {
                    return action.task
                } else {
                    return task
                }
            })
        }
        case 'delete_task': {
            return tasks.filter(task => task.id !== action.id)
        }
        default : {
            return [...tasks]
        }
    }
}
