import axios from "axios"

const API_URL = '/api/messaging/'

// Get user threads
const getMessages = async (token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const messageService = {
    getMessages,
}

export default messageService