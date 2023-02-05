import projectsManagement from '../../api/api';
import { addErrorReducer } from '../auth/authSlice';
import { findAllCommentariesByProjectIDReducer } from './commentarySlice';

export const findAllCommentariesByProjectID_thunk = (projectId: string): any => {
    return async ( dispatch: any ) => {

        // dispatch( loadingBusinessReducer() );

        projectsManagement.get(`/commentary/findAllByProject/${ projectId }`)
            .then(({ data, status }) => {
                if (status !== 200) {
                    throw new Error(data.message);
                }

                dispatch( findAllCommentariesByProjectIDReducer( data ) );
            })
            .catch(error => {
                try {
                    // console.log(error.response.data.message);
                    dispatch( addErrorReducer(error.response.data.message) );
                } catch (error) {
                    console.error(error);
                }
            });
    }
}
