import axios from 'axios';
import { baseURL } from '../../api/api';
import { findByIdReducer } from './businessSlice';


export const findBusinessById_thunk = (businessId : any) => {
    return async ( dispatch: any ) => {

        // dispatch( checkingReducer() );

        const { data }: any = await axios.get(`${baseURL}/business/findById/${ businessId }`);
        console.log('DATA - THUNK: ', data);

        if ( data.message ) {
            // return dispatch( addErrorReducer( data ) );
        }

        dispatch( findByIdReducer( data ) );

        return data;
    }
}
