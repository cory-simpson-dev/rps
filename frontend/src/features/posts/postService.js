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

const postService = {
    createPost
}

export default postService