import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getMessages, reset as resetMessages} from '../features/messages/messageSlice'
import Spinner from '../components/Spinner'
import ThreadItem from '../components/ThreadItem'

function MessageBoard() {
    const {threads, thread, isLoading, isSuccess} = useSelector((state) => state.messages)

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

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="message-board-layout">
            <div>
                {threads.map((thread) => {
                    return <ThreadItem key={thread._id} thread={thread} />
                })}
            </div>
            <div>
            </div>
        </div>
    )
}

export default MessageBoard