import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    commentariesByProjectID: undefined,
    isLoadingCommentaries: false,
}

export const commentariesSlice = createSlice({
    name: 'commentaries',
    initialState,
    reducers: {
        loadingCommentariesReducer: ( state ) => {
            state.isLoadingCommentaries = true;
        },

        findAllCommentariesByProjectIDReducer: ( state, { payload } ) => {
            state.commentariesByProjectID = payload;
            state.isLoadingCommentaries = false;
        }
    }
});

export const {
    loadingCommentariesReducer,
    findAllCommentariesByProjectIDReducer,
} = commentariesSlice.actions;