import {useSelector } from 'react-redux'
import { upvotePost, downvotePost } from '../features/posts/postSlice'
import { Link } from 'react-router-dom'
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

  // calculate time since post
  const currentTime = new Date()
  const postedAt = new Date(post.createdAt)
  const minutesSince = Math.floor((currentTime - postedAt)/60000)

  return (
      <div className="container mx-auto p-3 mb-6 rounded-sm shadow hover:shadow-lg grid grid-cols-[60px_minmax(250px,_1fr)]">
        <div className="grid grid-cols-1 place-content-center">
          <VotingButtons 
            item={post}
            upvoteItem={upvotePost}
            downvoteItem={downvotePost}
            dispatchData={{postId, userId}}
          />
        </div>
      <Link to={`/post/${post._id}`}>
        <div className="grid grid-rows-[30px_50px_minmax(1fr,_100px)_30px]">
          <p className='truncate text-sm'>Posted by <Link to={`/user/${post.username}`} className='text-primary hover:text-purple-600'>{post.username}</Link> {minutesSince} minutes ago</p>
          <h4 className='truncate text-lg font-semibold'>{post.title}</h4>
          <p className='truncate'>{post.body}</p>
          <p className='truncate text-sm text-gray-500'>42 comments</p>
        </div>
      </Link>
      </div>
  )
}

export default PostItem