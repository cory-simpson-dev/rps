// axios in place of fetchAPI for additional tools
import axios from 'axios'
// end point for all auth 
const API_URL = '/api/users'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        // localStorage can only hold strings, so JSON.stringify is necessary
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    // return user data & token
    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData)

    if (response.data) {
        // localStorage can only hold strings, so JSON.stringify is necessary
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    // return user data & token
    return response.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    logout,
    login,
}

export default authService