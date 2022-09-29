import axios from "axios"

const API_URL = '/api/posts/'

// Get post comments
const getComments = async (postId) => {
    // postId comes from postSlice
    const response = await axios.get(API_URL + postId + '/comments')

    return response.data
}

const commentService = {
    getComments
}

export default commentService