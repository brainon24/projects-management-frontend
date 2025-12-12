import { addErrorReducer, checkingReducer, logoutReducer, signInReducer } from "./authSlice";
import { clearBusinessIdAndName } from "../business/businessSlice";
import projectsManagement from '../../api/api';
import { clearStateUsersReducer } from "../users/usersSlice";
import { closeSidemenu } from "../ui/uiSlice";
import whatsapp from "../../api/whatsapp";


interface SignUpProps {
    fullName: string;
    phone: string; 
    email: string; 
    password: string;
    businessId: string;
}

const postMessage = async (payload: any) => {
    try {
        console.log({payload})
        const { data } = await whatsapp.post('/send-message', {
            phone: payload?.phone,
            content: `Hola ${payload?.fullName}, bienvenido a brainon24. Tu cuenta ha sido creada exitosamente.`,
            author: payload?._id,
            conversationId: payload?.id,
        });
        return data;
    } catch (error) {
        console.log({error})
    }
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
            .then(async ({ data, status }) => {
                if (status !== 201) {
                    throw new Error(data.message);
                }
                
                localStorage.setItem('token', data.token);
                dispatch( signInReducer( data ) );
                await postMessage({
                    phone,
                    fullName,
                    ...data.user,
                });
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