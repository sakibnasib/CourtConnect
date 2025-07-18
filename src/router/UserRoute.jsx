import React from 'react';
import useRole from '../hook/useRole';
import Loader from '../Component/Loader/Loader';

const UserRoute = ({children}) => {
    const [role ,isRoleLoading]=useRole()
 if (isRoleLoading) return <Loader/>
    if (role === 'user') return children
  return <Navigate to='/' replace='true' />
};

export default UserRoute;