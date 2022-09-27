import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { upvotePost, downvotePost } from '../features/posts/postSlice'
import { Link } from 'react-router-dom'
import UserButton from './UserButton'

function PostItem({post}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)
  // local state
  const [upvotes, setUpvotes] = useState(post.upvotedBy.length)
  const [downvotes, setDownvotes] = useState(post.downvotedBy.length)
  const [upvotedBy, setUpvotedBy] = useState(post.upvotedBy)
  const [downvotedBy, setDownvotedBy] = useState(post.downvotedBy)

  const postData = {
    "id": post._id,
    "user": user,
  }
  
  const dispatch = useDispatch()

  const handleUpvote = () => {
    // uses postSlice & postService
    dispatch(upvotePost(postData))
    
    // if post upvotedBy user already, remove user from upvotedBy & reduce upvotes
    if (upvotedBy.indexOf(user._id) > -1) {
      setUpvotedBy(() => upvotedBy.filter(id => id !== user._id))
      setUpvotes(upvotes - 1)
    // if post previously downvoted by user, remove from down votes && add to upvotes
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
    // uses postSlice & postService
    dispatch(downvotePost(postData))
    
    // if post downvotedBy user already, remove user from downvotedBy & reduce downvotes
    if (downvotedBy.indexOf(user._id) > -1) {
      setDownvotedBy(() => downvotedBy.filter(id => id !== user._id))
      setDownvotes(downvotes - 1)
    // if post previously upvoted by user, remove from upvotes && add to downvotes
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
    // ticket className only kept for current styles
    <div className='ticket'>
      <div>{post.title}</div>
      <div>{post.body}</div>
      <div>
        <div className='status status-new' onClick={handleUpvote}>
          {upvotes}
        </div>
        <div className='status status-closed' onClick={handleDownvote}>
          {downvotes}
        </div>
      </div>
      <div>
      <UserButton url={`/user/${post.user}`} user={post.user}/>
      <Link to={`/post/${post._id}`} className='btn btn-reverse btn-sm'>
        View Post {post._id}
      </Link>
      </div>
    </div>
  )
}

export default PostItem