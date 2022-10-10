import { useSelector } from 'react-redux'

function Thread({thread}) {
  // get user from global state (auth)
  const {user} = useSelector((state) => state.auth)

  let userUsername
  if (user === null) {
    userUsername = null
  } else {
    userUsername = user.username
  }

  return (
    <div className="h-full overflow-auto border rounded-md pt-2 pb-1 px-2">
      <div className="grid grid-rows-1 h-full">
      {(
        thread.messages.map((message) => {
          return <>
            {
              message.sender === userUsername ? (
              <div className="justify-self-end self-end container max-w-[60%] w-3/5 p-3 rounded-sm grid grid-rows-[40px_1fr)] border rounded-md mb-1" key={message._id}>
                <div className='text-right'>
                  <span className='text-xs'>{new Date(message.sentAt).toLocaleString('en-US')}</span>
                </div>
                <div className='text-right'>
                  {message.text}
                </div>
              </div>
              ) : (
                <div className="justify-start self-end container max-w-[60%] w-3/5 p-3 rounded-sm grid grid-rows-[40px_1fr)] border rounded-md mb-1" key={message._id}>
                  <div className='text-left'>
                    <span className='text-xs'>{new Date(message.sentAt).toLocaleString('en-US')}</span>
                  </div>
                  <div>
                    {message.text}
                  </div>
                </div>
              )
            }
            
          </>
        })
      )}
      
      </div>
    </div>
  )
}

export default Thread
