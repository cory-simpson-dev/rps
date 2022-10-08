import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getUserPosts, resetPost} from '../features/posts/postSlice'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import PostItem from '../components/PostItem'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'

function UserPage() {
    // get posts from postSlice
    const {posts, isLoading, isSuccess, isError, message} = useSelector((state) => state.posts)

    // create mutible posts copy
    const [currentPosts, setCurrentPosts] = useState([...posts])

    // track search field
    const [search, setSearch] = useState('')

    // create filter options
    const filterOptions = [
        {value: 'dateNewest', text: 'Newest'},
        {value: 'dateOldest', text: 'Oldest'},
        {value: 'mostUpvotes', text: 'Most Appreciated'},
        {value: 'mostDownvotes', text: 'Least Appreciated'},
    ]

    // track filter option
    const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value)

    const params = useParams()
    const dispatch = useDispatch()
    const {username} = params

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(resetPost())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getUserPosts(username))
        // dispatch not included as dependency because it will produce never ending loop, so we prevent eslint error with next line
        // eslint-disable-next-line
    }, [isError, message, username])

    useEffect(() => {
        setCurrentPosts([...posts])
    }, [posts])

    if(isLoading) {
        return <Spinner />
    }

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }

  return (
    <>
        <h1>{username} Posts</h1>
        {/* ticket classNames only kept for current styles */}
        <div className="tickets">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <SearchBar searchState={search} searchStateSet={setSearch}/>
                </div>
                <div className="col-span-1">
                    <Filter filterState={selectedFilter} filterStateSet={setSelectedFilter} providedFilterOptions={filterOptions}/>
                </div>
            </div>
            {currentPosts.sort((a,b) => {
                if (selectedFilter === 'mostUpvotes') {
                    let aCurrentVotes = a.upvotedBy.length - a.downvotedBy.length
                    let bCurrentVotes = b.upvotedBy.length - b.downvotedBy.length
                    return bCurrentVotes - aCurrentVotes
                } else if (selectedFilter === 'mostDownvotes') {
                    let aCurrentVotes = a.downvotedBy.length - a.upvotedBy.length
                    let bCurrentVotes = b.downvotedBy.length - b.upvotedBy.length
                    return bCurrentVotes - aCurrentVotes
                } else if (selectedFilter === 'dateNewest') {
                    if (a.createdAt < b.createdAt) {
                        return 1;
                    }
                    if (a.createdAt > b.createdAt) {
                        return -1;
                    }
                    return 0
                } else if (selectedFilter === 'dateOldest') {
                    if (a.createdAt > b.createdAt) {
                        return 1;
                    }
                    if (a.createdAt < b.createdAt) {
                        return -1;
                    }
                    return 0
                }
            }).filter((post) => {
                if (search === '') {
                    return post
                } else {
                    if (post.title.toLowerCase().includes(search.toLowerCase())) {
                        return post
                    }
                }
            }).map((post) => {
                return <PostItem key={post._id} post={post} />
            })}
        </div>
    </>
  )
}

export default UserPage