import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from './commentService'

// Get user from localStorage
// parse is needed because it is a string in local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    comments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get post comments
export const getComments = createAsyncThunk('comments/getAll', async (postId, thunkAPI) => {
    try {
        return await commentService.getComments(postId)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Create post comment
export const createComment = createAsyncThunk('comments/create', async ({ commentText, postId }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await commentService.createComment(commentText, postId, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Upvote comment
export const upvoteComment = createAsyncThunk('comment/upvote', async ({commentId, postId, userId}, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await commentService.upvoteComment(commentId, postId, userId, token)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Downvote comment
export const downvoteComment = createAsyncThunk('comment/downvote', async ({commentId, postId, userId}, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await commentService.downvoteComment(commentId, postId, userId, token)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getComments.fulfilled, (state, action) => {
                // have action as parameter because we are getting data
                state.isLoading = false
                state.isSuccess = true
                state.comments = action.payload
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
                // have action as parameter because we are getting data
                state.isLoading = false
                state.isSuccess = true
                // part of redux tool kit - allows to unshift to state (normally immutable)
                state.comments.unshift(action.payload)
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(upvoteComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.comments.map((comment) => {
                    // if post id matches
                    if (comment._id === action.payload._id) {
                        // if it does, check if user is already in upvotedBy list
                        if (comment.upvotedBy.indexOf(state.user._id) > -1) {
                            // if they are, take them out of the list
                            return {
                                ...comment,
                                upvotedBy: comment.upvotedBy.filter(id => id !== state.user._id),
                            }
                        // check if user is in downvotedByList
                        } else if (comment.downvotedBy.indexOf(state.user._id) > -1) {
                            return {
                                ...comment,
                                upvotedBy: comment.upvotedBy.push(state.user._id),
                                downvotedBy: comment.downvotedBy.filter(id => id !== state.user._id)
                            }
                        } else {
                            return {
                                ...comment,
                                upvotedBy: comment.upvotedBy.push(state.user._id),
                            }
                        }
                    // if wrong post
                    } else {
                        return comment
                    }
                })
            })
            .addCase(downvoteComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.comments.map((comment) => {
                    // if post id matches
                    if (comment._id === action.payload._id) {
                        // if it does, check if user is already in downvotedBy list
                        if (comment.downvotedBy.indexOf(state.user._id) > -1) {
                            // if they are, take them out of the list
                            return {
                                ...comment,
                                downvotedBy: comment.downvotedBy.filter(id => id !== state.user._id),
                            }
                        // check if user is in upvotedByList
                        } else if (comment.upvotedBy.indexOf(state.user._id) > -1) {
                            return {
                                ...comment,
                                downvotedBy: comment.downvotedBy.push(state.user._id),
                                upvotedBy: comment.upvotedBy.filter(id => id !== state.user._id)
                            }
                        } else {
                            return {
                                ...comment,
                                downvotedBy: comment.downvotedBy.push(state.user._id),
                            }
                        }
                    // if wrong post
                    } else {
                        return comment
                    }
                })
            })
    }
})

export const {reset} = commentSlice.actions
export default commentSlice.reducer