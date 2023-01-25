import { Dispatch } from '@reduxjs/toolkit';
import projectsManagement from '../../api/api';
import { loadingUsersReducer, usersFoundedReducer } from './usersSlice';


export const findUsersByRole_thunk = ( role: string ): any => {
    return async ( dispatch: Dispatch ) => {

        dispatch( loadingUsersReducer() );

        projectsManagement.get(`/user/findAllByRole/${ role }`)
            .then(({ data, status }) => {
                // console.log('data en then: ', data)
                dispatch( usersFoundedReducer( data ) );
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