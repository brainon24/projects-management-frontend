import { Dispatch } from '@reduxjs/toolkit';
import projectsManagement from '../../api/api';
import { clientsFoundedReducer, employeesFoundedReducer, loadingUsersReducer } from './usersSlice';


export const findEmployeesByRole_thunk = ( role: string ): any => {
    return async ( dispatch: Dispatch ) => {
        console.log('findEmployeesByRole_thunk')
        dispatch( loadingUsersReducer() );

        projectsManagement.get(`/user/findAllByRole/${ role }`)
            .then(({ data, status }) => {
                // console.log('data en then: ', data)
                dispatch( employeesFoundedReducer( data ) );
            })
            .catch(error => {
                try {
                    console.log(error.response.data.message);
                } catch (error) {
                    console.error(error);
                }
            });
    }
}

export const findClientsByRole_thunk = ( role: string ): any => {
    return async ( dispatch: Dispatch ) => {
        console.log('findUsersByRole_thunk')
        dispatch( loadingUsersReducer() );

        projectsManagement.get(`/user/findAllByRole/${ role }`)
            .then(({ data, status }) => {
                // console.log('data en then: ', data)
                dispatch( clientsFoundedReducer( data ) );
            })
            .catch(error => {
                try {
                    console.log(error.response.data.message);
                } catch (error) {
                    console.error(error);
                }
            });
    }
}