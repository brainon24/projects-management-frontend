import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    projectById: undefined,
    oneProject: undefined,

    lastUpdateProject: undefined, 
    errorNotFoundProject: undefined,
    clearErrorNotFoundProject: undefined,
    isLoadingProjects: false,

    isRequestSuccess: false,
    textRequestSuccess: undefined,
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        loadingProjectsReducer: ( state ) => {
            state.isLoadingProjects = true;
        },

        lastUpdateProjectsReducer: ( state, { payload } ) => {
            state.lastUpdateProject = payload;
            state.isLoadingProjects = false;
        },

        clearlastUpdateProjectsReducer: ( state ) => {
            state.lastUpdateProject = undefined;
            state.isLoadingProjects = false;
        },

        addErrorNotFoundProjectsReducer: ( state, { payload } ) => {
            state.errorNotFoundProject = payload;
            state.isLoadingProjects = false;
        },

        clearErrorNotFoundProjectsReducer: ( state ) => {
            state.clearErrorNotFoundProject = undefined;
            state.isLoadingProjects = false;
        },


        findProjectOneReducer: ( state, { payload } ) => {
            state.oneProject = payload;
            state.isLoadingProjects = false;
        },

        clearProjectOneReducer: ( state ) => {
            state.oneProject = undefined;
            state.isLoadingProjects = false;
        },

        findProjectByIdReducer: ( state, { payload } ) => {
            state.projectById = payload;
            state.isLoadingProjects = false;
        },

        clearProjectByIdReducer: ( state ) => {
            state.projectById = undefined;
            state.isLoadingProjects = false;
        },

        updateProjectReducer: (state, { payload }) => {
            state.isLoadingProjects = false;
        },

        changeRequestSuccessReducerProjects: ( state, { payload } ) => {
            state.isLoadingCommentaries = false;
        },
    }
});

export const {
    loadingProjectsReducer,
    lastUpdateProjectsReducer,
    clearlastUpdateProjectsReducer,
    addErrorNotFoundProjectsReducer,
    clearErrorNotFoundProjectsReducer,
    findProjectByIdReducer,
    clearProjectByIdReducer,
    findProjectOneReducer,
    clearProjectOneReducer,
    updateProjectReducer,
    changeRequestSuccessReducerProjects,
} = projectsSlice.actions;