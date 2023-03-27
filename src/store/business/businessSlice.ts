import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    isLoadingBusiness: boolean;
    businessName: string | undefined;
    businessId: string | undefined;
    businessErrorMessage: string | undefined;
    allBusiness: undefined | [];

    isRequestSuccess: boolean;
    textRequestSuccess: string | undefined;
}

const initialState: InitialState = {
    isLoadingBusiness: false,
    businessName: undefined,
    businessId: undefined,
    businessErrorMessage: undefined,
    allBusiness: [],

    isRequestSuccess: false,
    textRequestSuccess: undefined,
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
            state.isLoadingBusiness = false;
        },

        addErrorReducer: ( state, { payload } ) => {
            state.isLoadingBusiness = false
            state.businessName = undefined;
            state.businessId = undefined;
            state.businessErrorMessage = payload;
        },

        clearErrorBusinessReducer: ( state ) => {
            state.isLoadingBusiness = false;
            state.businessErrorMessage = undefined;
        },

        allBusinessFoundedReducer: ( state, { payload } ) => {
            state.isLoadingBusiness = false;
            state.allBusiness = payload;
        },

        changeRequestSuccess: ( state, { payload } ) => {
            state.isLoadingBusiness = false;
            state.isRequestSuccess = payload.isRequestSuccess;
            state.textRequestSuccess = payload.textRequestSuccess;
        }
    }
});

export const {
    loadingBusinessReducer,
    findByIdReducer,
    clearBusinessIdAndName,
    addErrorReducer,
    clearErrorBusinessReducer,
    allBusinessFoundedReducer,
    changeRequestSuccess,
} = businessSlice.actions;