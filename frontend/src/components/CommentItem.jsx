import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { upvoteComment, downvoteComment } from '../features/comments/commentSlice'
import { useParams } from 'react-router-dom'

function CommentItem({comment}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)
  // local state
  const [upvotes, setUpvotes] = useState(comment.upvotedBy.length)
  const [downvotes, setDownvotes] = useState(comment.downvotedBy.length)
  const [upvotedBy, setUpvotedBy] = useState(comment.upvotedBy)
  const [downvotedBy, setDownvotedBy] = useState(comment.downvotedBy)
    
  const params = useParams()
  const dispatch = useDispatch()
  const {postId} = params
  const commentId = comment._id
  let userId
  if (user === null) {
    userId = null
  } else {
    userId = user._id
  }
  
  const handleUpvote = () => {
    // uses commentSlice & commentService
    dispatch(upvoteComment({commentId, postId, userId}))
    
    // if comment upvotedBy user already, remove user from upvotedBy & reduce upvotes
    if (upvotedBy.indexOf(user._id) > -1) {
      setUpvotedBy(() => upvotedBy.filter(id => id !== user._id))
      setUpvotes(upvotes - 1)
    // if comment previously downvoted by user, remove from down votes && add to upvotes
    } else if (downvotedBy.indexOf(user._id) > -1){
      let newUpvotedByArr = upvotedBy.concat(user._id)
      setDownvotedBy(() => downvotedBy.filter(id => id !== user._id))
      setDownvotes(downvotes - 1)
      setUpvotedBy(newUpvotedByArr)
      setUpvotes(upvotes + 1)
    // otherwise, add user to upvotedBy
    } else {
      let newUpvotedByArr = upvotedBy.concat(user._id)
      setUpvotes(upvotes + 1)
      setUpvotedBy(newUpvotedByArr)
    }
  }

  const handleDownvote = () => {
    // uses commentSlice & commentService
    dispatch(downvoteComment({commentId, postId, userId}))
    
    // if comment downvotedBy user already, remove user from downvotedBy & reduce downvotes
    if (downvotedBy.indexOf(user._id) > -1) {
      setDownvotedBy(() => downvotedBy.filter(id => id !== user._id))
      setDownvotes(downvotes - 1)
    // if comment previously upvoted by user, remove from upvotes && add to downvotes
    } else if (upvotedBy.indexOf(user._id) > -1){
      let newDownvotedByArr = downvotedBy.concat(user._id)
      setUpvotedBy(() => upvotedBy.filter(id => id !== user._id))
      setUpvotes(upvotes - 1)
      setDownvotedBy(newDownvotedByArr)
      setDownvotes(downvotes + 1)
    // otherwise, add user to downvotedBy
    } else {
      let newDownvotedByArr = downvotedBy.concat(user._id)
      setDownvotes(downvotes + 1)
      setDownvotedBy(newDownvotedByArr)
    }
  }

  return (
    // className note for current styles & dynamic styling for staff vs not staff
    <div className='note' style={{
        backgroundColor: comment.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        textColor: comment.isStaff ? '#fff' : '#000'
    }}>
      <h4>Comment from {comment.isStaff ? <span>Staff</span> : <span>{comment.user}</span>}</h4>
      <p>{comment.text}</p>
      <div className="note-date">
        {new Date(comment.createdAt).toLocaleString('en-US')}
      </div>
      <div>
        <div className='status status-new' onClick={handleUpvote}>
          {upvotes}
        </div>
        <div className='status status-closed' onClick={handleDownvote}>
          {downvotes}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
