import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {sendMessage} from '../features/messages/messageSlice'
import Spinner from '../components/Spinner'

function ThreadMessageForm({thread}) {
    // useSelector from message state (not auth)
    const {isLoading, isError, message} = useSelector((state) => state.messages)
    // local state
    const [text, setText] = useState('')
    const threadId = thread._id
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // dependencies go at end of useEffect() as array
    }, [dispatch, isError, message])

    const onSubmit = (e) => {
        e.preventDefault()
        // uses messageSlice & messageService
        dispatch(sendMessage({threadId, text}))
        setText('')
    }
    
    if(isLoading) {
            return <Spinner />
    }

    return (
        <>
            <section className="w-full mt-2">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="text" className="sr-only">Text</label>
                        <textarea name="text" id="text" className='form-control' placeholder='Text' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 btn-block">Send</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ThreadMessageForm