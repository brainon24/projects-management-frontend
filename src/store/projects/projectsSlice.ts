import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProjects: [],
    projectById: {},
    allProjectsByUserId: [],
    allProjectsByBusinessId: [],
    allProjectsByResponsibleId: [],

    lastUpdateProject: undefined,
    clearLastUpdateProject: undefined,
    errorNotFoundProject: undefined,
    clearErrorNotFoundProject: undefined,
    isLoadingProjects: false,
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
            state.clearLastUpdateProject = undefined;
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

        findAllProjectsReducer: ( state, { payload } ) => {
            state.allProjects = payload;
            state.isLoadingProjects = false;
        },

        findProjectByIdReducer: ( state, { payload } ) => {
            state.projectById = payload;
            state.isLoadingProjects = false;
        },

        findProjectsByUserIdReducer: ( state, { payload } ) => {
            state.allProjectsByUserId = payload;
            state.isLoadingProjects = false;
        },

        findProjectsByBusinessIdReducer: ( state, { payload } ) => {
            state.allProjectsByBusinessId = payload;
            state.isLoadingProjects = false;
        },

        findProjectsByResponsibleIdReducer: ( state, { payload } ) => {
            state.allProjectsByResponsibleId = payload;
            state.isLoadingProjects = false;
        },
    }
});

export const {
    loadingProjectsReducer,
    lastUpdateProjectsReducer,
    clearlastUpdateProjectsReducer,
    addErrorNotFoundProjectsReducer,
    clearErrorNotFoundProjectsReducer,
    findAllProjectsReducer,
    findProjectByIdReducer,
    findProjectsByUserIdReducer,
    findProjectsByBusinessIdReducer,
    findProjectsByResponsibleIdReducer,
} = projectsSlice.actions;