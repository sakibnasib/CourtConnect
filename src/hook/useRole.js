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

import { useEffect, useState } from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
  const { user } = useAuth()
  const [role, setRole] = useState(null)
  const [isRoleLoading, setIsRoleLoading] = useState(true)
 const axiosSecure = useAxiosSecure()
  useEffect(() => {
    const fetchUserRole = async () => {
      const { data } = await axiosSecure.get(`/user/role/${user?.email}`)

      setRole(data?.role)
      setIsRoleLoading(false)
    }
    fetchUserRole()
  }, [user, axiosSecure])

  return [role, isRoleLoading]
}

export default useRole