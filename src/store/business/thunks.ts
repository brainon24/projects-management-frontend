import axios from 'axios';
import { baseURL } from '../../api/api';
import { addErrorReducer, findByIdReducer } from './businessSlice';
import projectsManagement from '../../api/api';


export const findBusinessById_thunk = (businessId : any) => {
    return async ( dispatch: any ) => {

        // dispatch( checkingReducer() );

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
