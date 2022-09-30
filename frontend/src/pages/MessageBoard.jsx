import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'


function MessageBoard() {
    // get user from global state
    const {user} = useSelector((state) => state.auth)

  return (
    <div>
      Message board
    </div>
  )
}

export default MessageBoard