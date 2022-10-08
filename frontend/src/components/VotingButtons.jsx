import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaHeartBroken, FaHeart } from 'react-icons/fa'

// item = post/comment
function VotingButtons({item, upvoteItem, downvoteItem, dispatchData}) {
    // get user from global state (auth)
    const {user} = useSelector((state) => state.auth)

    // local state
    const [upvotes, setUpvotes] = useState(0)
    const [downvotes, setDownvotes] = useState(0)
    const [upvotedBy, setUpvotedBy] = useState([])
    const [downvotedBy, setDownvotedBy] = useState([])
    
    const upvoteClassesRef = useRef(`mx-auto my-auto text-slate-300`)
    const downvoteClassesRef = useRef(`mx-auto my-auto text-slate-300`)

    const dispatch = useDispatch()

    useEffect(() => {
      if (item.upvotedBy) {
        setUpvotes(item.upvotedBy.length)
        setDownvotes(item.downvotedBy.length)
        setUpvotedBy(item.upvotedBy)
        setDownvotedBy(item.downvotedBy)
      }
    }, [item])

    useEffect(() => {
      if (user) {
        if (upvotedBy.indexOf(user._id) > -1) {
          upvoteClassesRef.current = `mx-auto my-auto text-primary`
        }
        if (downvotedBy.indexOf(user._id) > -1) {
          downvoteClassesRef.current = `mx-auto my-auto text-black`
        }
      }
    })

    const handleUpvote = () => {
    // uses itemSlice & itemService
        dispatch(upvoteItem(dispatchData))
        
        // if item upvotedBy user already, remove user from upvotedBy & reduce upvotes
        if (upvotedBy.indexOf(user._id) > -1) {
            setUpvotedBy(() => upvotedBy.filter(id => id !== user._id))
            setUpvotes(upvotes - 1)
            upvoteClassesRef.current = `mx-auto my-auto text-slate-300`
        // if item previously downvoted by user, remove from down votes && add to upvotes
        } else if (downvotedBy.indexOf(user._id) > -1){
            let newUpvotedByArr = upvotedBy.concat(user._id)
            setDownvotedBy(() => downvotedBy.filter(id => id !== user._id))
            setDownvotes(downvotes - 1)
            setUpvotedBy(newUpvotedByArr)
            setUpvotes(upvotes + 1)
            upvoteClassesRef.current = `mx-auto my-auto text-primary`
            downvoteClassesRef.current = `mx-auto my-auto text-slate-300`
        // otherwise, add user to upvotedBy
        } else {
            let newUpvotedByArr = upvotedBy.concat(user._id)
            setUpvotes(upvotes + 1)
            setUpvotedBy(newUpvotedByArr)
            upvoteClassesRef.current = `mx-auto my-auto text-primary`
        }
    }

  const handleDownvote = () => {
    // uses itemSlice & itemService
    dispatch(downvoteItem(dispatchData))
    
    // if item downvotedBy user already, remove user from downvotedBy & reduce downvotes
    if (downvotedBy.indexOf(user._id) > -1) {
      setDownvotedBy(() => downvotedBy.filter(id => id !== user._id))
      setDownvotes(downvotes - 1)
      downvoteClassesRef.current = `mx-auto my-auto text-slate-300`
    // if item previously upvoted by user, remove from upvotes && add to downvotes
    } else if (upvotedBy.indexOf(user._id) > -1){
      let newDownvotedByArr = downvotedBy.concat(user._id)
      setUpvotedBy(() => upvotedBy.filter(id => id !== user._id))
      setUpvotes(upvotes - 1)
      setDownvotedBy(newDownvotedByArr)
      setDownvotes(downvotes + 1)
      upvoteClassesRef.current = `mx-auto my-auto text-slate-300`
      downvoteClassesRef.current = `mx-auto my-auto text-black`
    // otherwise, add user to downvotedBy
    } else {
      let newDownvotedByArr = downvotedBy.concat(user._id)
      setDownvotes(downvotes + 1)
      setDownvotedBy(newDownvotedByArr)
      downvoteClassesRef.current = `mx-auto my-auto text-black`
    }
  }

  return (
    <div className='grid grid-rows-3'>
        <div className='flex hover:cursor-pointer' onClick={handleUpvote}>
          <FaHeart className={upvoteClassesRef.current}/>
        </div>
        <div className='text-center'>
          {upvotes - downvotes}
        </div>
        <div className='flex hover:cursor-pointer' onClick={handleDownvote}>
          <FaHeartBroken className={downvoteClassesRef.current} />
        </div>
    </div>
  )
}

export default VotingButtons