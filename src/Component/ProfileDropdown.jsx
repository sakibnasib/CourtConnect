import { Link } from 'react-router';
import useAuth from '../hook/useAuth';

const ProfileDropdown = () => {
  const { user, logOut } = useAuth()

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user?.photoURL || '/default.png'} alt="user" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        <li className="text-sm text-gray-600 cursor-default px-3">{user?.email}</li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={logOut}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
