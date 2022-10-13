import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import {useSelector, useDispatch} from 'react-redux'
import {getPost, upvotePost, downvotePost, resetPost} from '../features/posts/postSlice'
import { getComments, createComment, reset as commentsReset } from '../features/comments/commentSlice'
import { useParams, Link } from 'react-router-dom'
import parse from 'html-react-parser'
import Spinner from '../components/Spinner'
import CommentItem from '../components/CommentItem'
import VotingButtons from '../components/VotingButtons'
import TimeSince from '../components/TimeSince'

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

    let postBody = String(post.body)

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
    <>
      <div className="container mx-auto p-3 mb-6 rounded-sm shadow hover:shadow-lg grid grid-cols-[60px_minmax(250px,_1fr)]">
        <div className="grid grid-cols-1 place-content-center">
          <VotingButtons 
            item={post}
            upvoteItem={upvotePost}
            downvoteItem={downvotePost}
            dispatchData={{postId, userId}}
          />
        </div>
        <div className="grid grid-rows-[30px_50px_1fr_30px]">
          <p className='truncate text-sm'>Posted by <Link to={`/user/${post.username}`} className='text-primary hover:text-purple-600'>{post.username}</Link> <TimeSince item={post} /></p>
          <h4 className='text-lg font-semibold'>{post.title}</h4>
          <div className="whitespace-pre-wrap">{parse(postBody)}</div>
          <p className='text-sm text-gray-500'>{comments.length} comments</p>
        </div>
      </div>
      <header className="ticket-header">
        <h2>Comments</h2>
      </header>

      {/* if user is logged in */}
      {user ? (
        <button onClick={openModal} className='mb-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>Add Comment</button>
      ) : (
        <button className='mb-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>Sign in to Comment</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Comment'>
        <div className='grid grid-rows-[40px_1fr]'>
          <div className='grid grid-cols-[1fr_30px]'>
            <h2>Add Comment</h2>
            <span className="text-center mb-auto items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={closeModal}>X</span>
          </div>
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
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700" type='submit'>Submit</button>
            </div>
          </form>
        </div>        
      </Modal>

      { comments.length > 0 ? 
        comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      )) :
        <h4>Be the first to comment</h4>
      }
    </>
  )
}

export default Post