// import React from 'react';
// import useAuth from './useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';


// const useRole = () => {
//     const{user,loading}=useAuth()
//     const axiosSecure = useAxiosSecure()
//     const {data: role, isLoading: isRoleLoading}=useQuery({
//           enabled: !loading && !!user?.email,
//         queryKey: ['role', user?.email],
//           queryFn:async()=>{
//             const {data}=await axiosSecure.get(`/user/role/${user?.email}`)
//             return data
//           }
//     })
  
//     return [role?.role , isRoleLoading]
// };

// export default useRole;


import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

import { useQuery } from '@tanstack/react-query'

const useRole = () => {
  const { user,loading } = useAuth()
 
const axiosSecure = useAxiosSecure()

const { data: role, isLoading: isRoleLoading}=useQuery({
  queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role/${user?.email}`)
      return res.data.role;
    }
  })
  return [role, isRoleLoading]
}
export default useRole