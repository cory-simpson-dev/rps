import {useSelector } from 'react-redux'
import { upvotePost, downvotePost } from '../features/posts/postSlice'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import parse from 'html-react-parser'
import VotingButtons from './VotingButtons'
import TimeSince from './TimeSince'

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
      <div className="container mx-auto p-3 mb-6 rounded-sm shadow hover:shadow-lg flex flex-col md:grid md:grid-cols-[60px_minmax(250px,_1fr)] grid-rows-1 overflow-hidden">
        <div className="hidden md:grid md:grid-cols-1 place-content-center">
          <VotingButtons 
            item={post}
            upvoteItem={upvotePost}
            downvoteItem={downvotePost}
            dispatchData={{postId, userId}}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className='md:hidden'>
              <VotingButtons 
                item={post}
                upvoteItem={upvotePost}
                downvoteItem={downvotePost}
                dispatchData={{postId, userId}}
                />
            </div>
            
            <Link className="flex flex-col justify-center w-full" to={`/post/${post._id}`}>
              <p className='truncate text-sm'>Posted by <Link to={`/user/${post.username}`} className='text-primary hover:text-purple-600'>{post.username}</Link> <TimeSince item={post} /></p>
              <h4 className='break-normal text-base md:text-lg font-semibold'>{post.title}</h4>
            </Link>
          </div>
          
          {post.mediaType === 'image' && 
            <figure className="mx-auto">
              <img className='md:max-w-sm' src={post.mediaUrl} alt={post.mediaUrl}/>
            </figure>
          }
          {post.mediaType === 'video' && 
            <ReactPlayer 
              className="w-full object-cover" 
              url={post.mediaUrl} 
              width='100%'  
            />
          }
          <div className='max-h-40 truncate whitespace-pre-wrap text-xs sm:text-base'>{parse(post.body)}</div>
        </div>
      </div>
  )
}

export default PostItem