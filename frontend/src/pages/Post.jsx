import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getPost, resetPost} from '../features/posts/postSlice'
import { useParams, Link } from 'react-router-dom'
import UserButton from '../components/UserButton'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Post() {
    const {post, isLoading, isSuccess, isError, message} = useSelector((state) => state.posts)

    const params = useParams()
    const dispatch = useDispatch()
    const {postId} = params

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(resetPost())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getPost(postId))
        // dispatch not included as dependency because it will produce never ending loop, so we prevent eslint error with next line
        // eslint-disable-next-line
    }, [isError, message, postId])

    if(isLoading) {
        return <Spinner />
    }

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }

  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/posts' />
        <h3>
            <span className='status status-new'>{post.upvotes}</span>
            <span className='status status-closed'>{post.downvotes}</span>
        </h3>
        <h4>Written at {new Date(post.createdAt).toLocaleString('en-US')}</h4>
        <h2>{post.title}</h2>
        <UserButton url={`/user/${post.user}`} user={post.user}/>
        {/* horizontal rule = hr */}
        <hr />
        <div className="post-desc">
            <p>{post.body}</p>
        </div>
      </header>
    </div>
  )
}

export default Post