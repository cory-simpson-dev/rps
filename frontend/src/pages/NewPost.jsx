import {useState, useEffect} from 'react'
// get user from global state using useSelector
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {toast} from 'react-toastify'
import {createPost, resetPost} from '../features/posts/postSlice'
import Spinner from '../components/Spinner'

function NewPost() {
    // get user from global state (auth)
    const {user} = useSelector((state) => state.auth)
    // useSelector from post state (not auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.posts)

    // local state
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
            navigate(`/user/${user.username}`)
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
        <section className="heading">
            <h1 className='text-center'>Create New Post</h1>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    {/* <textarea name="body" id="body" className='form-control' value={body} onChange={(e) => setBody(e.target.value)}></textarea> */}
                    <CKEditor
                        editor={ ClassicEditor }
                        data={body}
                        config={ {
                            toolbar: {
                                items: [ 'bold', 'italic', '|', 'undo', 'redo',]
                            }
                        } }
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setBody(data)
                        } }
                    />
                </div>
                <div className="form-group">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default NewPost