import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div >
            <div className=" text-white mb-2">
                <Link to='/'>home</Link>
            </div>
            <div className="pb-5">
                <Outlet/>
            </div>
        </div>
    );
};

export default AuthLayout;