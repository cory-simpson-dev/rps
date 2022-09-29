import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from './commentService'

const initialState = {
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
    }
})

export const {reset} = commentSlice.actions
export default commentSlice.reducer