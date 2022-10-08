import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getMessages, reset as resetMessages} from '../features/messages/messageSlice'
import Spinner from '../components/Spinner'
import ThreadItem from '../components/ThreadItem'
import NewMessage from '../components/NewMessage'
import Thread from '../components/Thread'
import ThreadMessageForm from '../components/ThreadMessageForm'

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
                <button onClick={() => setCurrentThread({})} className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 btn-block">New Thread</button>
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
                  <div className='border rounded-md'>
                  {/* pass in currentThread */}
                    <Thread key={`open` + currentThread._id} thread={currentThread}/>
                    <ThreadMessageForm thread={currentThread}/>
                  </div>
                )}
            </div>
        </div>
    )
}

export default MessageBoard