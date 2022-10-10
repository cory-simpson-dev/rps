import {useSelector} from 'react-redux'
import { upvoteComment, downvoteComment } from '../features/comments/commentSlice'
import { useParams, Link } from 'react-router-dom'
import VotingButtons from './VotingButtons'
import TimeSince from './TimeSince'

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
    <div className="container mx-auto p-3 mb-6 rounded-sm shadow hover:shadow-lg grid grid-cols-[60px_minmax(250px,_1fr)] grid-rows-1">
        <div className="grid grid-cols-1 place-content-center">
          <VotingButtons 
            item={comment}
            upvoteItem={upvoteComment}
            downvoteItem={downvoteComment}
            dispatchData={{commentId, postId, userId}}
          />
        </div>
        <div className="grid grid-rows-[30px_minmax(1fr,_200px)]">
          <p className='truncate text-sm'><Link to={`/user/${comment.username}`} className='text-primary hover:text-purple-600'>{comment.username} </Link> <TimeSince item={comment} /></p>
          <p className="whitespace-pre-wrap">{comment.text}</p>
        </div>
    </div>

  )
}

export default CommentItem
