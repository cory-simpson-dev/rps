import axios from "axios"

const API_URL = '/api/messaging/'

// Create new thread
const createThread = async (threadData, token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + 'new', threadData, config)

    return response.data
}

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

// Get user threads
const getThread = async (threadId, token) => {
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'threads/' + threadId, config)

    return response.data
}

// Send message in existing thread
const sendMessage = async (threadData, token) => {
    const {threadId, text} = threadData
    console.log(text);
    const config = {
        // token has to be in headers authorization field (same thing as postman, but through our app)
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + 'threads/' + threadId, {text: text}, config)

    return response.data
}

const messageService = {
    createThread,
    getMessages,
    getThread,
    sendMessage
}

export default messageService