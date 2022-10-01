import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getMessages, reset as resetMessages} from '../features/messages/messageSlice'
import Spinner from '../components/Spinner'
import ThreadItem from '../components/ThreadItem'
import NewMessage from '../components/NewMessage'

function MessageBoard() {
    const {threads, thread, isLoading, isSuccess} = useSelector((state) => state.messages)
    const [currentThread, setCurrentThread] = useState(thread)

    const dispatch = useDispatch()

    // extra useEffect for unmount
    // if we want something to happen on unmount, we need to return a function from useEffect
    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(resetMessages())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getMessages())
    }, [dispatch])

    useEffect(() => {
        setCurrentThread(thread)
    }, [thread])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="message-board-layout">
            <div>
                <button onClick={() => setCurrentThread({})} className="btn btn-block">New Thread</button>
                {threads.length === 0 ? (
                    <>
                        <h4>Create Your First Thread</h4>
                    </>
                ) : (
                    threads.map((thread) => {
                        return <ThreadItem key={thread._id} thread={thread} />
                    })
                )}
            </div>
            <div>
                {!currentThread._id ? (
                  <NewMessage />
                ) : (
                  <>
                    <h2>thread body component</h2>
                  </>
                )}
            </div>
        </div>
    )
}

export default MessageBoard