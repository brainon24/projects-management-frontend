import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    allProjects: [],
    projectById: undefined,
    oneProject: undefined,
    allProjectsByUserId: [],
    allProjectsByBusinessId: [],
    allProjectsByResponsibleId: [],

    lastUpdateProject: undefined, 
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

        findAllProjectsReducer: ( state, { payload } ) => {
            state.allProjects = payload;
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

        updateProjectReducer: (state, { payload }) => {
            const updatedProject = payload;
            const index = state.allProjects.findIndex(
              (project: any) => project._id === updatedProject.id
            );
            if (index !== -1) {
              state.allProjects[index] = updatedProject;
            }
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
    clearProjectByIdReducer,
    findProjectOneReducer,
    clearProjectOneReducer,
    findProjectsByUserIdReducer,
    findProjectsByBusinessIdReducer,
    findProjectsByResponsibleIdReducer,
    updateProjectReducer,
} = projectsSlice.actions;