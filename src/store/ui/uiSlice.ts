import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    sidemenuOpen: boolean;
}

const initialState: InitialState = {
    sidemenuOpen: false,
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
    }
});

export const { openSidemenu, closeSidemenu } = uiSlice.actions;