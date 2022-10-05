import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {createThread, reset} from '../features/messages/messageSlice'
import Spinner from '../components/Spinner'

function NewMessage() {
    // get user from global state
    const {user} = useSelector((state) => state.auth)
    // useSelector from message state (not auth)
    const {isLoading, isError, message} = useSelector((state) => state.messages)

    // local state
    const [recipient, setRecipient] = useState('')
    const [text, setText] = useState('')

    
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        // dependencies go at end of useEffect() as array
    }, [dispatch, isError, message])

    const onSubmit = (e) => {
        e.preventDefault()
        // uses threadSlice & threadService
        dispatch(createThread({recipient, text}))
    }
    
    if(isLoading) {
            return <Spinner />
    }

    return (
        <>
        <section>
            <h3>Send New Message</h3>
        </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="recipient">Recipient</label>
                        <input name="recipient" type="text" className="form-control" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Text</label>
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

export default NewMessage
