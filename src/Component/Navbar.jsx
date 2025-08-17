// import { Link, NavLink } from 'react-router';
// import Logo from '../Component/Logo'
// import ProfileDropdown from './ProfileDropdown';
// import useAuth from '../hook/useAuth';

// const Navbar = () => {
//   const { user } = useAuth()
//  const baseStyle =
//     'flex items-center gap-2 px-3 py-2 rounded-md font-medium hover:bg-gray-200';
//   const activeStyle = 'bg-blue-100 text-blue-600';
//   const navLinks = (
//     <>
//       <li><NavLink to="/"  className={({ isActive }) =>
//           `${baseStyle} ${isActive ? activeStyle : ''}`
//         }>Home</NavLink></li>
//       <li><NavLink to="/courts" className={({ isActive }) =>
//           `${baseStyle} ${isActive ? activeStyle : ''}`
//         }>Courts</NavLink></li>
//           <li><NavLink to="/about" className={({ isActive }) =>
//           `${baseStyle} ${isActive ? activeStyle : ''}`
//         }>About</NavLink></li>
//     </>
//   );

//   return (
//     <div className="bg-base-100 rounded-3xl shadow-md sticky top-0 z-50  ">
//       <div className="navbar w-12/12 mx-auto px-8">
//         {/* Logo + Site Name */}
//         <div className="flex-1">
//           <Link to="/" className="text-xl font-bold flex items-center gap-2">
//           <Logo/>
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">{navLinks}</ul>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-3">
//           {/* Auth */}
//           {user ? (
//             <ProfileDropdown />
//           ) : (
//             <>
//               <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
//               <div className="hidden md:block">
//                 <Link to="/register" className="btn btn-outline btn-sm ">Register</Link>
//               </div>
              
//             </>
//           )}

//           {/* Mobile Menu */}
//           <div className="dropdown dropdown-end lg:hidden">
//             <label tabIndex={0} className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </label>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
//             >
//               {navLinks}
//               {user ? (
//                 <>
               
//                 </>
//               ) : (
//                 <>
//                   {/* <p><Link to="/login">Login</Link></p>
//                   <p><Link to="/register">Register</Link></p> */}
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import { Link, NavLink } from "react-router";
import Logo from "../Component/Logo";
import ProfileDropdown from "./ProfileDropdown";
import useAuth from "../hook/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  const baseStyle =
    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const activeStyle = "bg-blue-500 text-white shadow-sm";

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-gray-100"}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/courts"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-gray-100"}`
          }
        >
          Courts
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : "hover:bg-gray-100"}`
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="navbar w-12/12 mx-auto px-6 lg:px-12 py-2">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2">{navLinks}</ul>
        </div>

        {/* Right: Auth + Mobile Menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <ProfileDropdown />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-sm btn-outline rounded-full px-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:inline btn btn-sm bg-blue-500 text-white rounded-full px-4 hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-2xl w-52 border border-gray-100"
            >
              {navLinks}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </li>
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
