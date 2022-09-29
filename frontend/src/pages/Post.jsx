import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getPost, resetPost} from '../features/posts/postSlice'
import { getComments, reset as commentsReset } from '../features/comments/commentSlice'
import { useParams, Link } from 'react-router-dom'
import UserButton from '../components/UserButton'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import CommentItem from '../components/CommentItem'

function Post() {
    const {post, isLoading, isSuccess, isError, message} = useSelector((state) => state.posts)
    // get comments from state (isLoading is renamed via colon)
    const {comments, isLoading: commentsIsLoading} = useSelector((state) => state.comments)
    
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
        dispatch(getComments(postId))
        // dispatch not included as dependency because it will produce never ending loop, so we prevent eslint error with next line
        // eslint-disable-next-line
    }, [isError, message, postId])

    if(isLoading || commentsIsLoading) {
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
        <h2>Comments</h2>
      </header>

      { comments.length > 0 ? 
        comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      )) :
        <h4>Be the first to comment</h4>
      }
      

    </div>
  )
}

export default Post