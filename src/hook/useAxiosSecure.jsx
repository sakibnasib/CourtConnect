// import axios from 'axios';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';



//  const axiosSecure=axios.create({
//         baseURL:`https://server12-taupe.vercel.app`
//     })
// const useAxiosSecure = () => {
//     const { user, logOut } = useAuth();
    
//     const navigate = useNavigate();
//     if(!user.accessToken) return 
//     axiosSecure.interceptors.request.use(config => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;

//     }, error => {
//         return Promise.reject(error);
//     })

//     axiosSecure.interceptors.response.use(res => {
//         return res;
//     }, error => {
//         const status = error.status;
//         if (status === 403) {
//             navigate('/');
//         }
//         else if (status === 401) {
//             logOut()
//                 .then(() => {
//                     navigate('/login')
//                 })
//                 .catch(() => { })
//         }

//         return Promise.reject(error);
//     })


//     return axiosSecure;
// };

// export default useAxiosSecure;


import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const axiosSecure = axios.create({
    baseURL: `https://server12-taupe.vercel.app`
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.accessToken) return;

        // Request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
            return config;
        }, error => {
            return Promise.reject(error);
        });

        // Response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            const status = error.response?.status;

            if (status === 403) {
                navigate('/');
            } else if (status === 401) {
                logOut()
                    .then(() => {
                        navigate('/login');
                    })
                    .catch(() => {});
            }

            return Promise.reject(error);
        });

        // Cleanup interceptor on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
