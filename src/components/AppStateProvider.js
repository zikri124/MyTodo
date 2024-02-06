import { useContext } from "react";
import { createContext, useReducer } from "react";

const AppStateContextValue = createContext(null)
const AppStateDispatchContext = createContext(null)

export const AppStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        appStateReducer,
        initialAppState
    )

    return (
        <AppStateContextValue.Provider value={state}>
            <AppStateDispatchContext.Provider value={dispatch}>
                {children}
            </AppStateDispatchContext.Provider>
        </AppStateContextValue.Provider>
    )
}

const appStateReducer = (state, action) => {
    switch (action.type) {
        case 'add_error': {
            return {
                ...state,
                is_error: true,
                error: action.error
            }
        }
        case 'set_is_loading': {
            return { ...state, is_loading: action.is_loading }
        }
        default: {
            return { ...state }
        }
    }
}

export const useAppState = () => {
    return useContext(AppStateContextValue)
}

export const useAppStateDispatch = () => {
    return useContext(AppStateDispatchContext)
}

const initialAppState = {
    is_error: false,
    error: null,
    is_loading: false
}
