import { addErrorReducer, allBusinessFoundedReducer, changeRequestSuccess, findByIdReducer, loadingBusinessReducer } from './businessSlice';
import projectsManagement from '../../api/api';
import { closeModal } from '../ui/uiSlice';


export const findBusinessById_thunk = (businessId : any) => {
    return async ( dispatch: any ) => {

        dispatch( loadingBusinessReducer() );

        projectsManagement.get(`/business/findById/${ businessId }`)
            .then(({ data, status }) => {
                if (status !== 200) {
                    throw new Error(data.message);
                }

                dispatch( findByIdReducer( {name: data.businessName, id: businessId} ) );
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


export const findAllBusiness_thunk = (): any => {
    return async ( dispatch: any ) => {

        dispatch( loadingBusinessReducer() );

        projectsManagement.get('/business/findAll')
            .then(({ data, status }) => {
                if (status !== 200) {
                    throw new Error(data.message);
                }

                dispatch( allBusinessFoundedReducer( data ) );
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


export const createBussines_thunk = (bussinesName: string): any => {
    return async ( dispatch: any ) => {

        dispatch( loadingBusinessReducer() );

        dispatch( closeModal() );

        projectsManagement.post('/business/create', {businessName: bussinesName})
            .then(({ data, status }) => {
                if (status !== 201) {
                    throw new Error(data.message);
                }

                dispatch( changeRequestSuccess({
                    isRequestSuccess: true,
                    textRequestSuccess: 'Tu solicitud fue procesada exitosamente.',
                }) );
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
