import React from 'react';
import useRole from '../hook/useRole';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Component/Loader/Loader';

const AdminRoute  = ({children}) => {
    const [role,isRoleLoading]=useRole();
    const location = useLocation()
    console.log(location)
    if (isRoleLoading) return <Loader/>
 if (role === 'admin') return children
    return  <Navigate to='/' replace='true' />
};

export default AdminRoute ;