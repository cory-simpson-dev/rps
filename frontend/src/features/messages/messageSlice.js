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

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {

    }
})

export const {reset} = messageSlice.actions
export default messageSlice.reducer