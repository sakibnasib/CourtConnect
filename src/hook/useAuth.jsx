import React, { use } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
     const authInfo=use(AuthContext)
    return authInfo
};

export default useAuth;