import axios from "axios"

const API_URL = '/api/posts/'

// Get post comments
const getComments = async (postId) => {
    // postId comes from commentSlice
    const response = await axios.get(API_URL + postId + '/comments')

    return response.data
}

// Create post comment
const createComment = async (commentText, postId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    // postId comes from commentSlice
    const response = await axios.post(API_URL + postId + '/comments', {text: commentText, }, config)

    return response.data
}

// Upvote comment
const upvoteComment = async (commentId, postId, userId, token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + postId + '/comments/upvoteComment/' + commentId, userId, config)

    return response.data
}

// Downvote comment
const downvoteComment = async (commentId, postId, userId, token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + postId + '/comments/downvoteComment/' + commentId, userId, config)

    return response.data
}

const commentService = {
    getComments,
    createComment,
    upvoteComment,
    downvoteComment,
}

export default commentService