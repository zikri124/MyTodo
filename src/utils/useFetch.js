import { useEffect } from 'react'


const useFetch = (url, tasksDispatch, appStateDispatch) => {
    useEffect(() => {
        const abortCont = new AbortController() 

        fetch(url, { signal: abortCont.signal })
        .then(res => {
            console.log("called")
            if (!res.ok) { 
                throw Error("could not fetch the data")
            }
            return res.json()
        })
        .then(data => {
            appStateDispatch({
                type: 'set_is_loading',
                is_loading: false
            })
            tasksDispatch({
                type: 'set_tasks',
                tasks: data
            })
        })
        .catch(err => {
            if (err.name === "AbortError") {
                console.log("fetch aborted")
            } else {
                appStateDispatch({
                    type: 'set_is_loading',
                    is_loading: false
                })
                appStateDispatch({
                    type: 'set_error',
                    is_error: true,
                    error: err
                })
            }
        })

        return () => abortCont.abort()
    }, [url, appStateDispatch, tasksDispatch])

    return
} 

export default useFetch