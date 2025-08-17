// import { Link } from 'react-router';
// import useAuth from '../hook/useAuth';

// const ProfileDropdown = () => {
//   const { user, logOut } = useAuth()

//   return (
//     <div className="dropdown dropdown-end">
//       <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           <img src={user?.photoURL || '/default.png'} alt="user" />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
//       >
//         <li className="text-sm text-gray-600 cursor-default px-3">{user?.email}</li>
//         <li>
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//         <li>
//           <button onClick={logOut}>Logout</button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default ProfileDropdown;


import { Link } from "react-router";
import useAuth from "../hook/useAuth";

const ProfileDropdown = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Button */}
      <div
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-blue-400 transition"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user?.photoURL || "/default.png"}
            alt="user avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content bg-white rounded-2xl w-56 border border-gray-100"
      >
        {/* User Info */}
        <li className="mb-2 border-b pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={user?.photoURL || "/default.png"}
                alt="user avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 text-sm">
                {user?.displayName || "User"}
              </span>
              <span className="text-xs text-gray-500 truncate max-w-[120px]">
                {user?.email}
              </span>
            </div>
          </div>
        </li>

        {/* Links */}
        <li>
          <Link
            to="/dashboard"
            className="rounded-md px-3 py-2 hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={logOut}
            className="rounded-md px-3 py-2 text-red-500 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
