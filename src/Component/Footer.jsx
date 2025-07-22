import React from 'react';
import Logo from './Logo';
import { FaFacebook, FaLinkedin} from 'react-icons/fa';
import { IoLogoGithub } from "react-icons/io";
import { Link, NavLink } from 'react-router';

const Footer = () => {
  const activeStyle = ' ';
  return (
    <footer className="w-full bg-base-200  text-gray-700 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo and Info */}
        <div className='flex flex-col items-center md:items-start'>
          <Link to='/'>
  <Logo />
          </Link>
        
          <h2 className="text-lg font-bold mt-4">CourtConnect Ltd.</h2>
          <p className="mt-2">Providing reliable court booking tech since 2024</p>
        </div>

        {/* Quick Links (optional) */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><NavLink to="/"  className={({ isActive }) =>
          ` ${isActive ? activeStyle : ''}`
        }>Home</NavLink></li>
      <li><NavLink to="/courts" className={({ isActive }) =>
          ` ${isActive ? activeStyle : ''}`
        }>Courts</NavLink></li>
            
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-6 mt-4 text-2xl">
            <Link to='https://www.facebook.com/share/19UBhoVfxA/' >
              <FaFacebook className="hover:text-blue-400 transition" />
            </Link>
            <Link  to='https://github.com/sakibnasib'>
              <IoLogoGithub className="hover:text-blue-300 transition" />
            </Link>
            <Link to='https://www.linkedin.com/in/sakib-nasib-a13260335' >
              <FaLinkedin className="hover:text-blue-300  transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm border-t border-primary-content/20 pt-6">
        <p>© {new Date().getFullYear()} CourtConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
