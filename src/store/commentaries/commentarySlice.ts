import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    commentariesByProjectID: undefined,
    isLoadingCommentaries: false,

    isRequestSuccess: false,
    textRequestSuccess: undefined,
}

export const commentariesSlice = createSlice({
    name: 'commentaries',
    initialState,
    reducers: {
        loadingCommentariesReducer: ( state ) => {
            state.isLoadingCommentaries = true;
        },

        findAllCommentariesByProjectIDReducer: ( state, { payload } ) => {
            state.isLoadingCommentaries = false;
            state.commentariesByProjectID = payload;
        },

        changeRequestSuccessReducer: ( state, { payload } ) => {
            state.isLoadingCommentaries = false;
            state.isRequestSuccess = payload.isRequestSuccess;
            state.textRequestSuccess = payload.textRequestSuccess;
        }
    }
});

export const {
    loadingCommentariesReducer,
    findAllCommentariesByProjectIDReducer,
    changeRequestSuccessReducer,
} = commentariesSlice.actions;