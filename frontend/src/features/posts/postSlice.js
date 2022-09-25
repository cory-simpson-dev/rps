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

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetPost: (state) => initialState
    },
    extraReducers: (builder) => {

    }
})

export const {resetPost} = postSlice.actions
export default postSlice.reducer