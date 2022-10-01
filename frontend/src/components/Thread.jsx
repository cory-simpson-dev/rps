function Thread({thread}) {
  return (
    <div>
      {(
        thread.messages.map((message) => {
            return <div key={message._id}> {message.text} <br /> from {message.sender} at {new Date(message.sentAt).toLocaleString('en-US')} </div>
            })
        )}
    </div>
  )
}

export default Thread
