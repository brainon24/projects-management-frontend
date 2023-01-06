import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    businessName: string | undefined,
}

const initialState: InitialState = {
    businessName: undefined,
}

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        createBusinessReducer: () => {},

        findByIdReducer: ( state, { payload } ) => {
            state.businessName = payload.businessName;
        }
    }
});

export const {
    findByIdReducer,
} = businessSlice.actions;