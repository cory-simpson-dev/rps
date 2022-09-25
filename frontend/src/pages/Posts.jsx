import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, resetPost} from '../features/posts/postSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Posts() {
    const {posts, isLoading, isSuccess} = useSelector((state) => state.posts)

    const dispatch = useDispatch()

    // extra useEffect for unmount
    // if we want something to happen on unmount, we need to return a function from useEffect
    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(resetPost())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

  return (
    <div>
      <h1>Posts</h1>
    </div>
  )
}

export default Posts