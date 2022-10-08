import axios from "axios"

const API_URL = '/api/posts/'

// Create new post
const createPost = async (postData, token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, postData, config)

    return response.data
}

// Get user posts
const getPosts = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

// Get user post
const getPost = async (postId, token) => {
    // postId comes from postSlice
    const response = await axios.get(API_URL + postId)

    return response.data
}

// Get user-specific posts
const getUserPosts = async (username) => {
    // userId comes from postSlice
    const response = await axios.get('/api/users/' + username)

    return response.data
}

// Upvote post
const upvotePost = async (postId, userId, token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'upvotePost/' + postId, userId, config)

    return response.data
}

// Downvote post
const downvotePost = async (postId, userId, token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'downvotePost/' + postId, userId, config)

    return response.data
}

const postService = {
    createPost,
    getPosts,
    getPost,
    getUserPosts,
    upvotePost,
    downvotePost
}

export default postService