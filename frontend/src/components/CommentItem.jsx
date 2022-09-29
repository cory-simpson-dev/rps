import {useSelector} from 'react-redux'

function CommentItem({comment}) {
    const {user} = useSelector((state) => state.auth)

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
    </div>
  )
}

export default CommentItem
