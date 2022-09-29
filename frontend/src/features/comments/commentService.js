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

const commentService = {
    getComments,
    createComment
}

export default commentService