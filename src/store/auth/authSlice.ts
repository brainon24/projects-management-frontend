import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user.interface';

type StatusInterface = | 'checking' | 'authenticated' | 'not-authenticated';

interface InitialState {
    status: StatusInterface;
    user: IUser;
    token: string | undefined;
    errorMessage: string | undefined;
}

const initialState: InitialState = {
    status: 'checking',
    user: {},
    token: undefined,
    errorMessage: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkingReducer: ( state ) => {
            state.status = 'checking';
            // state.errorMessage = undefined;
        },

        signInReducer: ( state, { payload } ) => {            
            state.status = 'authenticated';
            state.user = payload.user;
            state.token = payload.token;
            state.errorMessage = undefined;
        },

        logoutReducer: ( state ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.token = undefined;
            // state.errorMessage = undefined;
        },

        addErrorReducer: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.token = undefined;
            state.errorMessage = payload;
        },

        clearErrorReducer: ( state ) => {
            state.status = 'not-authenticated';
            state.errorMessage = undefined;
        },
    }
});

export const {
    checkingReducer,
    signInReducer,
    logoutReducer,
    addErrorReducer,
    clearErrorReducer,
} = authSlice.actions;