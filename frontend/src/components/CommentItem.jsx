import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { upvoteComment, downvoteComment } from '../features/comments/commentSlice'
import { useParams } from 'react-router-dom'
import VotingButtons from './VotingButtons'

function CommentItem({comment}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)
    
  // construct data for voting buttons component
  const params = useParams()
  const {postId} = params
  const commentId = comment._id
  let userId
  if (user === null) {
    userId = null
  } else {
    userId = user._id
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
      <VotingButtons 
        item={comment}
        upvoteItem={upvoteComment}
        downvoteItem={downvoteComment}
        dispatchData={{commentId, postId, userId}}
      />
    </div>
  )
}

export default CommentItem
