import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, resetPost} from '../features/posts/postSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PostItem from '../components/PostItem'

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
    <>
        <BackButton url='/' />
        <h1>All Posts</h1>
        {/* ticket classNames only kept for current styles */}
        <div className="tickets">
            <div className="ticket-headings">
                <div>title</div>
                <div>body</div>
                <div>upvotes&downvotes</div>
                <div>links</div>
            </div>
            {posts.map((post) => {
                return <PostItem key={post._id} post={post} />
            })}
        </div>
    </>
  )
}

export default Posts