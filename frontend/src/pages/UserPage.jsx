import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getUserPosts, resetUserPost} from '../features/users/userSlice'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import PostItem from '../components/PostItem'

function UserPage() {
    const {posts, isLoading, isSuccess, isError, message} = useSelector((state) => state.user)

    const params = useParams()
    const dispatch = useDispatch()
    const {userId} = params

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(resetUserPost())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getUserPosts(userId))
        // dispatch not included as dependency because it will produce never ending loop, so we prevent eslint error with next line
        // eslint-disable-next-line
    }, [isError, message, userId])

    if(isLoading) {
        return <Spinner />
    }

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }

  return (
    <>
        <h1>{userId.slice(0,7)} Posts</h1>
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

export default UserPage