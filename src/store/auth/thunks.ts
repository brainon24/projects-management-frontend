import axios from "axios";
import { addErrorReducer, checkingReducer, signInReducer } from "./authSlice";
import { baseURL } from '../../api/api';

interface SignUpProps {
    name: string;
    lastName: string;
    phone: string; 
    email: string; 
    password: string;
    businessId: string;
}

export const signUp_thunk = ({ name, lastName, email, password, phone, businessId }: SignUpProps) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );
        
        const cellphone = parseInt( phone );

        const { data }: any = await axios.post(`${baseURL}/auth/signUp`, {
            name, 
            lastName, 
            email, 
            password, 
            phone: cellphone, 
            businessId,
        });
        console.log('DATA - THUNK: ', data);

        if ( data.message ) {
            return dispatch( addErrorReducer( data ) );
        }

        dispatch( signInReducer( data ) );

        await localStorage.setItem('token', data.token);

        return data;
    }
}
