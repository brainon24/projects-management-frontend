import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    isLoadingBusiness: boolean,
    businessName: string | undefined;
    businessId: string | undefined;
    businessErrorMessage: string | undefined;
}

const initialState: InitialState = {
    isLoadingBusiness: false,
    businessName: undefined,
    businessId: undefined,
    businessErrorMessage: undefined,
}

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        loadingBusinessReducer: ( state ) => {
            state.isLoadingBusiness = true;
        },

        createBusinessReducer: () => {},

        findByIdReducer: ( state, { payload } ) => {
            state.isLoadingBusiness = false;
            state.businessName = payload.name;
            state.businessId = payload.id;
        },

        clearBusinessIdAndName: ( state ) => {            
            state.businessId = undefined;
            state.businessName = undefined;
        },

        addErrorReducer: ( state, { payload } ) => {
            state.isLoadingBusiness = false
            state.businessName = undefined;
            state.businessId = undefined;
            state.businessErrorMessage = payload;
        },

        clearErrorBusinessReducer: ( state ) => {            
            state.businessErrorMessage = undefined;
        },
    }
});

export const {
    loadingBusinessReducer,
    findByIdReducer,
    clearBusinessIdAndName,
    addErrorReducer,
    clearErrorBusinessReducer,
} = businessSlice.actions;