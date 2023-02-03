import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    isLoadingBusiness: boolean,
    businessName: string | undefined;
    businessId: string | undefined;
    businessErrorMessage: string | undefined;
    allBusiness: undefined | [],
}

const initialState: InitialState = {
    isLoadingBusiness: false,
    businessName: undefined,
    businessId: undefined,
    businessErrorMessage: undefined,

    allBusiness: [],
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

        allBusinessFoundedReducer: ( state, { payload } ) => {
            state.allBusiness = payload;
        },
    }
});

export const {
    loadingBusinessReducer,
    findByIdReducer,
    clearBusinessIdAndName,
    addErrorReducer,
    clearErrorBusinessReducer,
    allBusinessFoundedReducer,
} = businessSlice.actions;