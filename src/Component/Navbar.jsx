import { Link, NavLink } from 'react-router';
import Logo from '../Component/Logo'
import ProfileDropdown from './ProfileDropdown';
import useAuth from '../hook/useAuth';

const Navbar = () => {
  const { user } = useAuth()
 const baseStyle =
    'flex items-center gap-2 px-3 py-2 rounded-md font-medium hover:bg-gray-200';
  const activeStyle = 'bg-blue-100 text-blue-600';
  const navLinks = (
    <>
      <li><NavLink to="/"  className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }>Home</NavLink></li>
      <li><NavLink to="/courts" className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }>Courts</NavLink></li>
    </>
  );

  return (
    <div className="bg-base-100 rounded-3xl shadow-md sticky top-0 z-50  ">
      <div className="navbar max-w-7xl mx-auto">
        {/* Logo + Site Name */}
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            {/* <img src="/logo.png" alt="logo" className="w-10 h-10" /> */}
          <Logo/>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Auth */}
          {user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/auth/register" className="btn btn-outline btn-sm">Register</Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
              {user ? (
                <>
               
                </>
              ) : (
                <>
                  {/* <p><Link to="/login">Login</Link></p>
                  <p><Link to="/register">Register</Link></p> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
