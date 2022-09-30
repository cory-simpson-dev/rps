import { useEffect, useState, useRef  } from 'react'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {getPost, upvotePost, downvotePost, resetPost} from '../features/posts/postSlice'
import { getComments, createComment, reset as commentsReset } from '../features/comments/commentSlice'
import { useParams } from 'react-router-dom'
import UserButton from '../components/UserButton'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import CommentItem from '../components/CommentItem'
import VotingButtons from '../components/VotingButtons'

// react modal styles
const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

// looks in index.html to mount
Modal.setAppElement('#root')

function Post() {
    // set local state for modal
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [commentText, setCommentText] = useState('')

    const {post, isLoading, isSuccess, isError, message} = useSelector((state) => state.posts)
    // get comments from state (isLoading is renamed via colon)
    const {comments, isLoading: commentsIsLoading} = useSelector((state) => state.comments)
    const {user} = useSelector((state) => state.auth)
    let userId
    if (user === null) {
      userId = null
    } else {
      userId = user._id
    }

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
 
    // Create comment submit
    const onCommentSubmit = (e) => {
      e.preventDefault()
      dispatch(createComment({commentText, postId}))
      closeModal()
    }

    // opens/closes modal for comment
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

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
        <VotingButtons 
          item={post}
          upvoteItem={upvotePost}
          downvoteItem={downvotePost}
          dispatchData={{postId, userId}}
        />
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

      {/* if user is logged in */}
      {user ? (
        <button onClick={openModal} className='btn'><FaPlus /> Add Comment</button>
      ) : (
        <button className='btn'>Sign in to Comment</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Comment'>
        <h2>Add Comment</h2>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form onSubmit={onCommentSubmit}>
          <div className="form-group">
            <textarea 
              name="commentText" 
              id="commentText" 
              className='form-control' 
              placeholder='Comment text' 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Submit</button>
          </div>
        </form>
      </Modal>

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