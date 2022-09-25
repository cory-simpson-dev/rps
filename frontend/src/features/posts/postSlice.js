import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postService from './postService'

const initialState = {
    // array for multiple posts
    posts: [],
    // object for single post
    post: {},
    // the following four for every resource in redux
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new post
export const createPost = createAsyncThunk('posts/create', async (postData, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await postService.createPost(postData, token)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user posts
// to access thunkAPI, use _ to skip the argument
export const getPosts = createAsyncThunk('posts/getAll', async (_, thunkAPI) => {
    try {
        return await postService.getPosts()
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetPost: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                // have action as parameter because we are getting data
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetPost} = postSlice.actions
export default postSlice.reducer