import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from './userService'

const initialState = {
    // array for multiple posts
    posts: [],
    // the following four for every resource in redux
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get user posts
export const getUserPosts = createAsyncThunk('users/getPosts', async (userId, thunkAPI) => {
    try {
        return await userService.getUserPosts(userId)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: 'userPosts',
    initialState,
    reducers: {
        resetUserPost: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                // have action as parameter because we are getting data
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetUserPost} = userSlice.actions
export default userSlice.reducer