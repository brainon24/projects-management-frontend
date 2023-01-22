import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoute = ({ children, roles = [], }: any) => {

    const { user, token } = useSelector((state: any) => state.auth);

    if( !token ) {
        localStorage.removeItem('token')
        return <Navigate to='/' />;
    }

    if ( !roles.includes(user.role) ) {
        return <Navigate to='/private' />
    }

    return children;
}
