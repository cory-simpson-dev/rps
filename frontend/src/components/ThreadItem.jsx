import { useSelector, useDispatch } from 'react-redux'
import {getThread} from '../features/messages/messageSlice'

function ThreadItem({thread}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  // construct data for voting buttons component
  const threadId = thread._id
  let userUsername
  if (user === null) {
    userUsername = null
  } else {
    userUsername = user.username
  }

  let recipientUsername = thread.users.filter(username => username !== userUsername)
  let lastMessageSentBy = thread.messages.slice(-1)[0].sender

  return (
    // ticket className only kept for current styles
    <div onClick={() => dispatch(getThread(threadId))} className="hover:cursor-pointer container mx-auto p-3 mb-6 rounded-sm shadow hover:shadow-lg grid grid-rows-[60px_60px)]">
      <div>
        {recipientUsername}
      </div>
      <div className='text-xs'>Last message sent by {lastMessageSentBy === userUsername ? (
        <span>
          you
        </span>
      ) : (
        <span>
          {lastMessageSentBy}
        </span>
      )}
      </div>
    </div>
  )
}

export default ThreadItem