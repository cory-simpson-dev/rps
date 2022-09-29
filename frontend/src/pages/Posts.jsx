import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, resetPost} from '../features/posts/postSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import PostItem from '../components/PostItem'
import SearchBar from '../components/SearchBar'

function Posts() {
    // get posts from postSlice
    const {posts, isLoading, isSuccess} = useSelector((state) => state.posts)

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
        console.log(currentPosts);
    }

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

    useEffect(() => {
        setCurrentPosts([...posts])
    }, [posts])

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
        <BackButton url='/' />
        <h1>All Posts</h1>
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

export default Posts