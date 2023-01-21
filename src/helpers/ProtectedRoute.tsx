import React from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoute = ({ children, roles = [], }: any) => {

    const { user } = useSelector((state: any) => state.auth);

    if ( !roles.includes(user.role) ) {
        return <Navigate to='/private' />
    }

    return children;
}
