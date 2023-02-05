import { Dispatch } from '@reduxjs/toolkit';
import projectsManagement from '../../api/api';
import { clientsFoundedReducer, employeesFoundedReducer, loadingUsersReducer, usersFoundedReducer } from './usersSlice';


export const findAllClients_thunk = (): any => {
    return async ( dispatch: Dispatch ) => {
        console.log('findUsersByRole_thunk')
        dispatch( loadingUsersReducer() );

        projectsManagement.get('/user/findAll')
            .then(({ data, status }) => {
                // console.log('data en then: ', data)
                return dispatch( usersFoundedReducer( data ) );
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


export const findEmployeesByRole_thunk = ( role: string ): any => {
    return async ( dispatch: Dispatch ) => {
        console.log('findEmployeesByRole_thunk')
        dispatch( loadingUsersReducer() );

        projectsManagement.get(`/user/findAllByRole/${ role }`)
            .then(({ data, status }) => {
                // console.log('data en then: ', data)
                return dispatch( employeesFoundedReducer( data ) );
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
                return dispatch( clientsFoundedReducer( data ) );
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


export const updateRole_thunk = ({ userId, role }: any): any => {
    return async ( dispatch: Dispatch ) => {
        console.log('findAll_thunk')
        dispatch( loadingUsersReducer() );

        projectsManagement.patch(`/user/updateRole/${ userId }`, {role})
            .then(({ data, status }) => {
                // console.log('data en then: ', data)
                // return dispatch( usersFoundedReducer( data ) );
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