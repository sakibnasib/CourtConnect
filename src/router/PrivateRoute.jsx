import React from 'react';
import useAuth from '../hook/useAuth';
import { Navigate,  useLocation } from 'react-router';
import Loader from '../Component/Loader/Loader'
const PrivateRoute = ({ children }) => {
    const {user ,loading}=useAuth();
    const location =useLocation()
    if(loading) return <Loader/>
    if(user) return children
    return <Navigate to="/auth/login" state={{ from: location }} replace='true'/>
};

export default PrivateRoute;