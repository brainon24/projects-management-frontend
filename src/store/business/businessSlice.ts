import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    businessName: string | undefined;
    businessId: string | undefined;
    businessErrorMessage: string | undefined;
}

const initialState: InitialState = {
    businessName: undefined,
    businessId: undefined,
    businessErrorMessage: undefined,
}

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        createBusinessReducer: () => {},

        findByIdReducer: ( state, { payload } ) => {
            state.businessName = payload.name;
            state.businessId = payload.id;
        },

        addErrorReducer: ( state, { payload } ) => {
            state.businessName = undefined;
            state.businessId = undefined;
            state.businessErrorMessage = payload;
        },

        clearErrorBusinessReducer: ( state ) => {
            // state.businessName = undefined;
            state.businessErrorMessage = undefined;
        },
    }
});

export const {
    findByIdReducer,
    addErrorReducer,
    clearErrorBusinessReducer,
} = businessSlice.actions;