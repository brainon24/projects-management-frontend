import { Dispatch } from '@reduxjs/toolkit';
import projectsManagement from '../../api/api';
import { addErrorNotFoundProjectsReducer, lastUpdateProjectsReducer, loadingProjectsReducer, findProjectByIdReducer, updateProjectReducer, changeRequestSuccessReducerProjects } from './projectsSlice';

export const createProject_thunk = ( payload: any ): any => {
    return async ( dispatch: Dispatch ) => {
        dispatch( loadingProjectsReducer() );

        projectsManagement.post(`/project/create`, payload)
            .then(({ data, status }) => {
                return dispatch( lastUpdateProjectsReducer({
                    code: 'SUCCESS',
                    // message: `¡Se ha creado el proyecto con exito, el ID del proyecto es: ${ data._id }!`,
                    message: `¡Se ha creado el proyecto con exito!`,
                    data,
                }) );
            })
            .catch(_ => {
                try {
                    return dispatch( lastUpdateProjectsReducer({
                        code: 'ERROR',
                        message: `No se ha podido crear el proyecto con exito, descripción: ${ error.response.data.message }`,
                    }) );
                } catch (error) {
                    console.error(error);
                }
            });
    }
}


// DEPRECATED: findAllProjects_thunk - removido, usar llamada directa a API en Projects.tsx


// DEPRECATED: findProjectsByUserId_thunk - removido, usar llamada directa a API en Projects.tsx


// DEPRECATED: findProjectsByBusinessId_thunk - removido, usar llamada directa a API en Projects.tsx


// DEPRECATED: findProjectsByResponsibleI_thunk - removido, usar llamada directa a API en Projects.tsx


export const findProjectById_thunk = ( projectId: string ): any => {
    return async ( dispatch: Dispatch ) => {

        dispatch( loadingProjectsReducer() );

        projectsManagement.get(`/project/findById/${ projectId }`)
            .then(({ data, status }) => {

                dispatch( changeRequestSuccessReducerProjects({
                    isRequestSuccess: true,
                    textRequestSuccess: 'Tu solicitud fue procesada exitosamente.',
                }) );

                return dispatch( findProjectByIdReducer( data ) );
            })
            .catch(error => {
                try {
                    // console.log('ERROR en TRY: ', error.response.data.message);

                    return dispatch( addErrorNotFoundProjectsReducer(error.response.data.message) );
                } catch (error) {
                    console.error(error);
                }
            });
    }
}


export const patchStatusProject_thunk = ({ projectId, newStatus }: any) => {
    return async ( dispatch: Dispatch ) => {

        dispatch( loadingProjectsReducer() );

        try {
            projectsManagement.patch(`/project/patchStatus/${projectId}`, {newStatus})
                .then(({ data }) => console.log(data))
                .catch(_ => {
                    try {
                        // return dispatch( addErrorNotFoundProjectsReducer(error.response.data.message) );
                    } catch (error) {
                        console.error(error);
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }
}


export const updateProject_thunk = (projectData: any) => {
    return async ( dispatch: Dispatch ) => {

        dispatch( loadingProjectsReducer() );

        const { _id,
            authorId,
            businessId,
            responsiblesId,
            title,
            description,
            acceptanceCriteria,
            status, 
        } = projectData;

        try {
            projectsManagement.put(`/project/update/${_id}`, {
                authorId,
                businessId,
                responsiblesId,
                title,
                description,
                acceptanceCriteria,
                status, 
            })
                .then(({ data }) => {
                    return dispatch( updateProjectReducer(data) )
                })
                .catch(error => {
                    try {
                        console.log('ERROR en TRY: ', error.response.data.message);

                        // return dispatch( addErrorNotFoundProjectsReducer(error.response.data.message) );
                    } catch (error) {
                        console.error(error);
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }
}