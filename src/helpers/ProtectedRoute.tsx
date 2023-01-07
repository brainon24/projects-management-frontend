import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
    
    const token = localStorage.getItem('token');

    if( !token ){
        return <Navigate to='/' /> 
    }

    //TODO: Change coditional for a http request to /checkToken

    return children;
}
