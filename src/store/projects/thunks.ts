import { Dispatch } from '@reduxjs/toolkit';
import projectsManagement from '../../api/api';
import { addErrorNotFoundProjectsReducer, findProjectsByUserIdReducer, lastUpdateProjectsReducer, loadingProjectsReducer, findProjectsByBusinessIdReducer, findProjectsByResponsibleIdReducer, findAllProjectsReducer, findProjectByIdReducer, updateProjectReducer, changeRequestSuccessReducerProjects } from './projectsSlice';

export const createProject_thunk = ( payload: any ): any => {
    return async ( dispatch: Dispatch ) => {
        // console.log('payload: ', payload)
        dispatch( loadingProjectsReducer() );

        projectsManagement.post(`/project/create`, payload)
            .then(({ data, status }) => {
                // console.log('DATA en THEN: ', data)
                return dispatch( lastUpdateProjectsReducer({
                    code: 'SUCCESS',
                    // message: `¡Se ha creado el proyecto con exito, el ID del proyecto es: ${ data._id }!`,
                    message: `¡Se ha creado el proyecto con exito!`,
                    data,
                }) );
            })
            .catch(error => {
                try {
                    // console.log('ERROR en TRY: ', error.response.data.message);

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


export const findAllProjects_thunk = (): any => {
    return async ( dispatch: Dispatch ) => {
        dispatch( loadingProjectsReducer() );

        projectsManagement.get(`/project/findAll/`)
            .then(({ data, status }) => {
                // console.log('DATA en THEN: ', data)
                return dispatch( findAllProjectsReducer( data ) );
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


export const findProjectsByUserId_thunk = ( userId: string ): any => {
    return async ( dispatch: Dispatch ) => {
        // console.log('findProjectsByUserId_thunk');
        dispatch( loadingProjectsReducer() );

        projectsManagement.get(`/project/findByUserId/${ userId }`)
            .then(({ data, status }) => {
                // console.log('DATA en THEN: ', data)
                return dispatch( findProjectsByUserIdReducer( data ) );
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


export const findProjectsByBusinessId_thunk = ( businessId: string ): any => {
    return async ( dispatch: Dispatch ) => {
        // console.log('findProjectsByBusinessId_thunk');
        dispatch( loadingProjectsReducer() );

        projectsManagement.get(`/project/findByBusinessId/${ businessId }`)
            .then(({ data, status }) => {
                // console.log('DATA en THEN: ', data)
                return dispatch( findProjectsByBusinessIdReducer( data ) );
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


export const findProjectsByResponsibleI_thunk = ( responsibleId: string ): any => {
    return async ( dispatch: Dispatch ) => {
        // console.log('findProjectsByResponsibleI_thunk');
        dispatch( loadingProjectsReducer() );

        projectsManagement.get(`/project/findByResponsibleId/${ responsibleId }`)
            .then(({ data, status }) => {
                // console.log('DATA en THEN: ', data)
                return dispatch( findProjectsByResponsibleIdReducer( data ) );
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
                .then(({ data }) => data)
                .catch(error => {
                    try {
                        // console.log('ERROR en TRY: ', error.response.data.message);

                        return dispatch( addErrorNotFoundProjectsReducer(error.response.data.message) );
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