import React from 'react';
import Navbar from '../Component/Navbar'
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const MainLayout = () => {
    return (
        <div>
          <Navbar />
          <div className="min-h-[calc(100vh-px)]">
  <Outlet />
          </div>
         
           <Footer />
        </div>
    );
};

export default MainLayout;