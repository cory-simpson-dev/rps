import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getThread} from '../features/messages/messageSlice'

function ThreadItem({thread}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)
  // get currentThread from global state (messages)
  const currentThread = useSelector((state) => state.messages.thread)
  const [currentThreadId, setCurrentThreadId] = useState('')

  const dispatch = useDispatch() 

  const threadId = thread._id

  useEffect(() => {
    if (currentThread !== undefined) {
      setCurrentThreadId(currentThread._id)
    }
  }, [currentThread])

  let userUsername
  if (user === null) {
    userUsername = null
  } else {
    userUsername = user.username
  }

  let recipientUsername = thread.users.filter(username => username !== userUsername)
  let lastMessageSentBy = thread.messages.slice(-1)[0].sender

  return (
    <>
    {
      currentThreadId === threadId ? (
        <div onClick={() => dispatch(getThread(threadId))} className="hover:cursor-pointer container mx-auto p-3 mb-2 rounded-md shadow-inner shadow-indigo-700 grid grid-rows-[60px_60px)]">
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
      ) : (
        <div onClick={() => dispatch(getThread(threadId))} className="hover:cursor-pointer container mx-auto p-3 mb-2 rounded-md shadow hover:shadow-lg grid grid-rows-[60px_60px)]">
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
    </>
  )
}

export default ThreadItem