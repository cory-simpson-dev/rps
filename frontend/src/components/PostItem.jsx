import {useSelector } from 'react-redux'
import { upvotePost, downvotePost } from '../features/posts/postSlice'
import { Link } from 'react-router-dom'
import UserButton from './UserButton'
import VotingButtons from './VotingButtons'

function PostItem({post}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)

  // construct data for voting buttons component
  const postId = post._id
  let userId
  if (user === null) {
    userId = null
  } else {
    userId = user._id
  }

  return (
    // ticket className only kept for current styles
    <div className='ticket'>
      <div>{post.title}</div>
      <div>{post.body}</div>
      <VotingButtons 
        item={post}
        upvoteItem={upvotePost}
        downvoteItem={downvotePost}
        dispatchData={{postId, userId}}
      />
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