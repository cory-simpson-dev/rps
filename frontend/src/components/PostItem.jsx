import {Link} from 'react-router-dom'
import UserButton from './UserButton'

function PostItem({post}) {
  return (
    // ticket className only kept for current styles
    <div className='ticket'>
      <div>{post.title}</div>
      <div>{post.body}</div>
      <div>
        <div className='status status-new'>
          {post.upvotes}
        </div>
        <div className='status status-closed'>
          {post.downvotes}
        </div>
      </div>
      <div>
      <UserButton url={`/user/${post.user}`} user={post.user.slice(0,7)}/>
      <Link to={`/post/${post._id}`} className='btn btn-reverse btn-sm'>
        View Post {post._id.slice(0,7)}
      </Link>
      </div>
    </div>
  )
}

export default PostItem