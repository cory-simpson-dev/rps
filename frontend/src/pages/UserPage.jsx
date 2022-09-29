import { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getUserPosts, resetPost} from '../features/posts/postSlice'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import PostItem from '../components/PostItem'
import SearchBar from '../components/SearchBar'

function UserPage() {
    const {posts, isLoading, isSuccess, isError, message} = useSelector((state) => state.posts)

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

    const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value)

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value)
        // update posts based on filter value
        if (e.target.value === 'mostUpvotes') {
            setCurrentPosts(() => currentPosts.sort((a,b) => b.upvotedBy.length - a.upvotedBy.length))
        }
        if (e.target.value === 'mostDownvotes') {
            setCurrentPosts(() => currentPosts.sort((a,b) => b.downvotedBy.length - a.downvotedBy.length))
        }
        if (e.target.value === 'dateNewest') {
            setCurrentPosts(() => currentPosts.sort((a,b) => {
                if (a.createdAt < b.createdAt) {
                    return 1;
                }
                if (a.createdAt > b.createdAt) {
                    return -1;
                }
                return 0
            }))
        }
        if (e.target.value === 'dateOldest') {
            setCurrentPosts(() => currentPosts.sort((a,b) => {
                if (a.createdAt > b.createdAt) {
                    return 1;
                }
                if (a.createdAt < b.createdAt) {
                    return -1;
                }
                return 0
            }))
        }
    }

    const params = useParams()
    const dispatch = useDispatch()
    const {userId} = params

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

        dispatch(getUserPosts(userId))
        // dispatch not included as dependency because it will produce never ending loop, so we prevent eslint error with next line
        // eslint-disable-next-line
    }, [isError, message, userId])

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
        <h1>{userId.slice(0,7)} Posts</h1>
        {/* ticket classNames only kept for current styles */}
        <div className="tickets">
            <SearchBar searchState={search} searchStateSet={setSearch}/>
            <div className="ticket-headings">
                <select value={selectedFilter} onChange={handleFilterChange}>
                    {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            </div>
            <div className="ticket-headings">
                <div>title</div>
                <div>body</div>
                <div>upvotes&downvotes</div>
                <div>links</div>
            </div>
            {currentPosts.filter((post) => {
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