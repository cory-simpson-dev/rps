import {Link} from 'react-router-dom'

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
      <Link to={`/post/${post._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default PostItem