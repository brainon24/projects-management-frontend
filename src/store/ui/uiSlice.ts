import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    sidemenuOpen: boolean;
    isOpenModal: boolean;
}

const initialState: InitialState = {
    sidemenuOpen: false,
    isOpenModal: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openSidemenu: ( state ) => {
            state.sidemenuOpen = true;
        },

        closeSidemenu: ( state ) => {
            state.sidemenuOpen = false;
        },

        openModal: ( state ) => {
            state.isOpenModal = true;
        },

        closeModal: ( state ) => {
            state.isOpenModal = false;
        },
    }
});

export const { 
    openSidemenu, 
    closeSidemenu, 
    openModal, 
    closeModal 
} = uiSlice.actions;