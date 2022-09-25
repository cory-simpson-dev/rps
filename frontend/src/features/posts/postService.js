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

const postService = {
    createPost,
    getPosts,
    getPost,
}

export default postService