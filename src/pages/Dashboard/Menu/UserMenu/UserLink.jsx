import { NavLink } from 'react-router';
import { User, CalendarCheck, Megaphone } from 'lucide-react';


const UserLink = () => {
 
  

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <div className="space-y-2">
      <NavLink to="/dashboard"  end className={linkClass}>
        <User size={18} />
        My Profile
      </NavLink>

      <NavLink to="/dashboard/usersbookings" className={linkClass}>
        <CalendarCheck size={18} />
        My Bookings
      </NavLink>

      <NavLink to="/dashboard/userannouncements" className={linkClass}>
      <Megaphone size={18} />
        Announcements
      </NavLink>

      
    </div>
  );
};

export default UserLink;
