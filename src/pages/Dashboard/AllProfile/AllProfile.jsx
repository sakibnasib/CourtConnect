import React from 'react';
import useRole from '../../../hook/useRole';
import Loader from '../../../Component/Loader/Loader';
import AdminProfile from '../Admin/AdminProfile';
import MyProfile from '../User/Profile';

const AllProfile = () => {
    const [role ,isRoleLoading]=useRole();

    if (isRoleLoading) return <Loader />;

if (role === 'admin') {
  return <AdminProfile />;
}
if (role === 'user' || role === 'member') {
  return <MyProfile />;
}

};

export default AllProfile;