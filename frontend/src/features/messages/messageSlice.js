import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import messageService from './messageService'

const initialState = {
    // array for multiple threads
    threads: [],
    // object for single single
    thread: {},
    // the following four for every resource in redux
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new thread
export const createThread = createAsyncThunk('messages/createThread', async (threadData, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await messageService.createThread(threadData, token)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all threads
// to access thunkAPI, use _ to skip the argument
export const getMessages = createAsyncThunk('messages/getAll', async (_, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await messageService.getMessages(token)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

// Get single thread
export const getThread = createAsyncThunk('messages/getThread', async (threadId, thunkAPI) => {
    try {
        // use thunkAPI method .getState() to retrieve data from ANY state (auth state in this case)
        const token = thunkAPI.getState().auth.user.token
        return await messageService.getThread(threadId, token)
    } catch (err) {
        // grab error message from anywhere/everywhere
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        // action payload if rejected
        return thunkAPI.rejectWithValue(message)
    }
})

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createThread.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createThread.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // part of redux tool kit - allows to unshift to state (normally immutable)
                state.threads.unshift(action.payload)
            })
            .addCase(createThread.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMessages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                // have action as parameter because we are getting data
                state.isLoading = false
                state.isSuccess = true
                state.threads = action.payload
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getThread.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getThread.fulfilled, (state, action) => {
                // have action as parameter because we are getting data
                state.isLoading = false
                state.isSuccess = true
                state.thread = action.payload
            })
            .addCase(getThread.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = messageSlice.actions
export default messageSlice.reducer