import {useState} from 'react'
// get user from global state using useSelector
import {useSelector} from 'react-redux'

function NewPost() {
    // get user from global state
    const {user} = useSelector((state) => state.auth)
    // local state
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
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