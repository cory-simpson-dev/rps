import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getPosts, resetPost} from '../features/posts/postSlice'
import Spinner from '../components/Spinner'
import PostItem from '../components/PostItem'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'

function Posts() {
    // get posts from postSlice
    const {posts, isLoading, isSuccess} = useSelector((state) => state.posts)

    // create mutible posts copy
    const [currentPosts, setCurrentPosts] = useState([...posts])

    // track search field
    const [search, setSearch] = useState('')

    // create filter options
    const filterOptions = [
        {value: 'dateNewest', text: 'Most Recent'},
        {value: 'dateOldest', text: 'Oldest'},
        {value: 'mostUpvotes', text: 'Most Appreciated'},
        {value: 'mostDownvotes', text: 'Least Appreciated'},
    ]
    
    // track filter option
    const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value)
    
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
                    return b.upvotedBy.length - a.upvotedBy.length
                } else if (selectedFilter === 'mostDownvotes') {
                    return b.downvotedBy.length - a.downvotedBy.length
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
                } else if (post.title.toLowerCase().includes(search.toLowerCase())){
                    return post
                }
            }).map((post) => {
                return <PostItem key={post._id} post={post} />
            })}
        </div>
    </>
  )
}

export default Posts