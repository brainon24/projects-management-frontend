import { Dispatch } from '@reduxjs/toolkit';
import projectsManagement from '../../api/api';
import { addErrorNotFoundProjectsReducer, findProjectsByUserIdReducer, lastUpdateProjectsReducer, loadingProjectsReducer } from './projectsSlice';

export const createProject_thunk = ( payload: any ): any => {
    return async ( dispatch: Dispatch ) => {
        // console.log('createProject_thunk');
        // console.log('payload: ', payload)
        dispatch( loadingProjectsReducer() );

        projectsManagement.post(`/project/create`, payload)
            .then(({ data, status }) => {
                console.log('DATA en THEN: ', data)
                return dispatch( lastUpdateProjectsReducer({
                    code: 'SUCCESS',
                    message: `Se ha creado el proyecto con exito, el ID del proyecto es: ${ data._id }`,
                }) );
            })
            .catch(error => {
                try {
                    console.log('ERROR en TRY: ', error.response.data.message);

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


export const findProjectsByUserId_thunk = ( userId: any ): any => {
    return async ( dispatch: Dispatch ) => {
        console.log('findProjectsByUserId_thunk');
        dispatch( loadingProjectsReducer() );

        projectsManagement.get(`/project/findByUserId/${ userId }`)
            .then(({ data, status }) => {
                console.log('DATA en THEN: ', data)
                return dispatch( findProjectsByUserIdReducer( data ) );
            })
            .catch(error => {
                try {
                    console.log('ERROR en TRY: ', error.response.data.message);

                    return dispatch( addErrorNotFoundProjectsReducer(error.response.data.message) );
                } catch (error) {
                    console.error(error);
                }
            });
    }
}