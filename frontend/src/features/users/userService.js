import axios from "axios"

const API_URL = '/api/users/'

// Get user-specific posts
const getUserPosts = async (userId) => {
    // userId comes from userSlice
    const response = await axios.get(API_URL + userId)

    return response.data
}

const userService = {
    getUserPosts,
}

export default userService