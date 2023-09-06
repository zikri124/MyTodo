import { useState, useEffect } from 'react'

const useFetch = (url, setTasks, setError) => {
    // const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    // const [error, setError] = useState(null)

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
            setIsPending(false)
            setError(null)
            setTasks(data)
        })
        .catch(err => {
            if (err.name === "AbortError") {
                console.log("fetch aborted")
            } else {
                setIsPending(false)
                setError(err.message)
            }
        })

        return () => abortCont.abort()
    }, [setError, setTasks, url])

    return { isPending }
} 

export default useFetch