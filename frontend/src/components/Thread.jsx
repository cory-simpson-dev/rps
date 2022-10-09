function Thread({thread}) {
  return (
    <div className="h-full overflow-auto border rounded-md">
      {(
        thread.messages.map((message) => {
          return <>
            <div className="container mx-auto p-3 m-2 rounded-sm grid grid-rows-[40px_1fr)]" key={message._id}>
              <div className="grid grid-cols-2">
                <span className='text-left'>{message.sender}</span>
                <span className='text-right'>{new Date(message.sentAt).toLocaleString('en-US')}</span>
              </div>
              <div>
                {message.text}
              </div>
            </div>
          </>
        })
      )}
    </div>
  )
}

export default Thread
