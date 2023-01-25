import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    mUser: {},
    mUsers: [],
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
        
        usersFoundedReducer: ( state, { payload } ) => {
            state.mUsers = payload;
            state.isLoadingUsers = false;
        },
    }
});

export const {
    loadingUsersReducer,
    userFoundedReducer,
    usersFoundedReducer,
} = usersSlice.actions;
