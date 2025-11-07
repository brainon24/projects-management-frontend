import { addErrorReducer, checkingReducer, logoutReducer, signInReducer } from "./authSlice";
import { clearBusinessIdAndName } from "../business/businessSlice";
import projectsManagement from '../../api/api';
import { clearStateUsersReducer } from "../users/usersSlice";
import { closeSidemenu } from "../ui/uiSlice";


interface SignUpProps {
    fullName: string;
    phone: string; 
    email: string; 
    password: string;
    businessId: string;
}

export const signUp_thunk = ({ fullName, email, password, phone, businessId }: SignUpProps) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );

        projectsManagement.post(`/auth/signUp`, {
            fullName, 
            email, 
            password, 
            phone, 
            businessId,
        })
            .then(({ data, status }) => {
                if (status !== 201) {
                    throw new Error(data.message);
                }
                
                localStorage.setItem('token', data.token);
                dispatch( signInReducer( data ) );
            })
            .catch(error => {
                try {
                    console.log(error)
                    // console.log(error.response.data.message);
                    dispatch( clearBusinessIdAndName() );
                    dispatch( addErrorReducer(error.response.data.message) );
                } catch (error) {
                    console.error(error);
                }
            });
    }
}

interface LoginProps {
    email: string; 
    password: string;
}

export const login_thunk = ({ email, password }: LoginProps) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() ); 

        projectsManagement.post(`/auth/login`, {
            email, 
            password, 
        })
            .then(({ data, status }) => {
                if (status !== 201) {
                    throw new Error(data.message);
                }
                
                localStorage.setItem('token', data.token);
                dispatch( signInReducer( data ) );
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

export const checkToken_thunk = (token: string) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() ); 

        projectsManagement.request({
            method: 'GET',
            url: '/auth/checkToken',
            headers: { 'x-token': token },
        })
            .then(({ data }) => {
                if( !token ) return dispatch( logout_thunk() );

                if( data.user ) {
                    // localStorage.setItem('token', data.token);
                    return dispatch( signInReducer( data ) );
                }

                const { response: { statusCode, message } } = data;

                if (statusCode !== 200) {
                    dispatch( addErrorReducer( message ) );
                    localStorage.removeItem('token');
                }
            })
            .catch(error => {
                try {
                    // console.log(error.response.data.message);
                    dispatch( addErrorReducer(error.response.data.message) );
                    localStorage.removeItem('token');
                } catch (error) {
                    console.error(error);
                }
            });
    }
}


export const logout_thunk = () => {
    return async ( dispatch: any ) => {

        await localStorage.removeItem('token');
        
        dispatch( logoutReducer() );
        dispatch( closeSidemenu() );

        return dispatch( clearStateUsersReducer() );
    }
}