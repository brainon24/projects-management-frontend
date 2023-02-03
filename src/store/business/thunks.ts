import { addErrorReducer, allBusinessFoundedReducer, findByIdReducer, loadingBusinessReducer } from './businessSlice';
import projectsManagement from '../../api/api';


export const findBusinessById_thunk = (businessId : any) => {
    return async ( dispatch: any ) => {

        // dispatch( loadingBusinessReducer() );

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

        // dispatch( loadingBusinessReducer() );

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
