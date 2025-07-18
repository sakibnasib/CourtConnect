import React from 'react';
import useRole from '../hook/useRole';
import { Navigate } from 'react-router';
import Loader from '../Component/Loader/Loader';

const MemberRoute = ({children}) => {
    const [role ,isRoleLoading]=useRole();
 if (isRoleLoading) return <Loader/>
    if (role === 'member') return children
  return <Navigate to='/' replace='true' />
};

export default MemberRoute;