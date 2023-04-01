import projectsManagement from '../../api/api';
import { changeRequestSuccessReducer, findAllCommentariesByProjectIDReducer, loadingCommentariesReducer } from './commentarySlice';

export const findAllCommentariesByProjectID_thunk = (projectId: string): any => {
    return async ( dispatch: any ) => {

        dispatch( loadingCommentariesReducer() );
        
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
                // dispatch( addErrorReducer(error.response.data.message) );
            } catch (error) {
                console.error(error);
            }
        });
    }
}


export const createCommentByProjectID_thunk = ({projectId, authorId, commentary}: any): any => {
    return async ( dispatch: any ) => {
        
        dispatch( loadingCommentariesReducer() );
        
        projectsManagement.post('/commentary/create', {
            projectId,
            authorId,
            commentary,
        })
        .then(({ data, status }) => {
            if (status !== 201) {
                throw new Error(data.message);
            }

            dispatch( findAllCommentariesByProjectID_thunk( projectId ) );
            
            dispatch( changeRequestSuccessReducer({
                isRequestSuccess: true,
                textRequestSuccess: 'Tu solicitud fue procesada exitosamente.',
            }) );
        })
        .catch(error => {
            try {
                // console.log(error.response.data.message);
                // dispatch( addErrorReducer(error.response.data.message) );
            } catch (error) {
                console.error(error);
            }
        });
    }
}
