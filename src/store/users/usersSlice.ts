import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    mUser: undefined,
    mUsers: [],
    mALLYs: [],
    mClients: [],
    isLoadingUsers: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadingUsersReducer: ( state ) => {
            state.isLoadingUsers = true;
        },
        
        userFoundedReducer: ( state, { payload } ) => {
            state.mUser = payload;
            state.isLoadingUsers = false;
        },

        clearUserReducer: ( state ) => {
            state.mUser = undefined;
            state.isLoadingUsers = false;
        },
        
        usersFoundedReducer: ( state, { payload } ) => {
            state.mUsers = payload;
            state.isLoadingUsers = false;
        },

        ALLYsFoundedReducer: ( state, { payload } ) => {
            state.mALLYs = payload;
            state.isLoadingUsers = false;
        },
        
        clientsFoundedReducer: ( state, { payload } ) => {
            state.mClients = payload;
            state.isLoadingUsers = false;
        },

        clearStateUsersReducer: ( state ) => {
            state.mClients = [];
            state.mALLYs = [];
            state.mUser = undefined;
            state.mUsers = [];
            state.isLoadingUsers = false;
        },
    }
});

export const {
    loadingUsersReducer,
    userFoundedReducer,
    clearUserReducer,
    usersFoundedReducer,
    ALLYsFoundedReducer,
    clientsFoundedReducer,
    clearStateUsersReducer,
} = usersSlice.actions;
