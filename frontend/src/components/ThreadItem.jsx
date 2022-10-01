import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ThreadItem({thread}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)

  // construct data for voting buttons component
  const threadId = thread._id
  let userId
  if (user === null) {
    userId = null
  } else {
    userId = user._id
  }

  let recipientId = thread.users.filter(id => id !== userId)
  let lastMessageSentBy = thread.messages.slice(-1)[0].sender

  return (
    // ticket className only kept for current styles
    <div className='threadItem'>
        <div>Messages with {recipientId}
        <hr />
        <div>Last message sent by {lastMessageSentBy === userId ? (
          <span>
            you
          </span>
        ) : (
          <span>
            {lastMessageSentBy}
          </span>
        )}</div>
        </div>
    </div>
  )
}

export default ThreadItem