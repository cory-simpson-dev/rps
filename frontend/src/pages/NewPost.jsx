import {useState, useEffect} from 'react'
// get user from global state using useSelector
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createPost, resetPost} from '../features/posts/postSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewPost() {
    // get user from global state (auth)
    const {user} = useSelector((state) => state.auth)
    // useSelector from post state (not auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.posts)

    // local state
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess) {
            dispatch(resetPost())
            navigate(`/user/${user._id}`)
        }

        dispatch(resetPost())
        // dependencies go at end of useEffect() as array
    }, [dispatch, isError, isSuccess, navigate, message, user])

    const onSubmit = (e) => {
        e.preventDefault()
        // uses postSlice & postService
        dispatch(createPost({title, body}))
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <BackButton url='/' />
        <section className="heading">
            <h1>Create New Post</h1>
            <p>Please fill out the form below</p>
        </section>
        <section className="form">
            <div className="form-group">
                <label htmlFor="name">User Name</label>
                <input type="text" className="form-control" value={name} disabled/>
            </div>
            <div className="form-group">
                <label htmlFor="email">User Email</label>
                <input type="text" className="form-control" value={email} disabled/>
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea name="body" id="body" className='form-control' placeholder='Body' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default NewPost