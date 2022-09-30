import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postService from './postService'

// Get user from localStorage
// parse is needed because it is a string in local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
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

// Get all posts
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

// Get single post
export const getPost = createAsyncThunk('posts/get', async (postId, thunkAPI) => {
    try {
        return await postService.getPost(postId)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Get user-specific posts
export const getUserPosts = createAsyncThunk('posts/getUserPosts', async (userId, thunkAPI) => {
    try {
        return await postService.getUserPosts(userId)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Upvote post
export const upvotePost = createAsyncThunk('posts/upvote', async ({postId, userId}, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await postService.upvotePost(postId, userId, token)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Downvote post
export const downvotePost = createAsyncThunk('posts/downvote', async ({postId, userId}, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await postService.downvotePost(postId, userId, token)
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
            .addCase(getPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                // have action as parameter because we are getting data
                state.isLoading = false
                state.isSuccess = true
                state.post = action.payload
            })
            .addCase(getPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
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
            .addCase(upvotePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.posts.map((post) => {
                    // if post id matches
                    if (post._id === action.payload._id) {
                        // if it does, check if user is already in upvotedBy list
                        if (post.upvotedBy.indexOf(state.user._id) > -1) {
                            // if they are, take them out of the list
                            return {
                                ...post,
                                upvotedBy: post.upvotedBy.filter(id => id !== state.user._id),
                            }
                        // check if user is in downvotedByList
                        } else if (post.downvotedBy.indexOf(state.user._id) > -1) {
                            return {
                                ...post,
                                upvotedBy: post.upvotedBy.push(state.user._id),
                                downvotedBy: post.downvotedBy.filter(id => id !== state.user._id)
                            }
                        } else {
                            return {
                                ...post,
                                upvotedBy: post.upvotedBy.push(state.user._id),
                            }
                        }
                    // if wrong post
                    } else {
                        return post
                    }
                })
            })
            .addCase(downvotePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.posts.map((post) => {
                    // if post id matches
                    if (post._id === action.payload._id) {
                        // if it does, check if user is already in downvotedBy list
                        if (post.downvotedBy.indexOf(state.user._id) > -1) {
                            // if they are, take them out of the list
                            return {
                                ...post,
                                downvotedBy: post.downvotedBy.filter(id => id !== state.user._id),
                            }
                        // check if user is in upvotedByList
                        } else if (post.upvotedBy.indexOf(state.user._id) > -1) {
                            return {
                                ...post,
                                downvotedBy: post.downvotedBy.push(state.user._id),
                                upvotedBy: post.upvotedBy.filter(id => id !== state.user._id)
                            }
                        } else {
                            return {
                                ...post,
                                downvotedBy: post.downvotedBy.push(state.user._id),
                            }
                        }
                    // if wrong post
                    } else {
                        return post
                    }
                })
            })
    }
})

export const {resetPost} = postSlice.actions
export default postSlice.reducer