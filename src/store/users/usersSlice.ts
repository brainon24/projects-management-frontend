import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    mUser: undefined,
    mUsers: [],
    mEmployees: [],
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

        employeesFoundedReducer: ( state, { payload } ) => {
            state.mEmployees = payload;
            state.isLoadingUsers = false;
        },
        
        clientsFoundedReducer: ( state, { payload } ) => {
            state.mClients = payload;
            state.isLoadingUsers = false;
        },

        clearStateUsersReducer: ( state ) => {
            state.mClients = [];
            state.mEmployees = [];
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
    employeesFoundedReducer,
    clientsFoundedReducer,
    clearStateUsersReducer,
} = usersSlice.actions;
