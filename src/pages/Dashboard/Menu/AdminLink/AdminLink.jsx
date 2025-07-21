import React from 'react';
import { NavLink } from 'react-router';
import { 
  User, 
  Users, 
  CalendarCheck, 
  LayoutDashboard, 
  ClipboardList, 
  Landmark, 
  Percent, 
  Megaphone 
} from 'lucide-react';

const AdminLink = () => {
  const baseStyle =
    'flex items-center gap-2 px-3 py-2 rounded-md font-medium hover:bg-gray-200';
  const activeStyle = 'bg-blue-100 text-blue-600';

  return (
    <div className="space-y-2 text-sm">
    
      <NavLink
        to="/dashboard"
         end
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <User size={16} />
        Admin Profile
      </NavLink>

      <NavLink
        to="/dashboard/bookings-approval"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <ClipboardList size={16} />
        Manage Booking Approval
      </NavLink>

      <NavLink
        to="/dashboard/manage-members"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <Users size={16} />
        Manage Members
      </NavLink>

      <NavLink
        to="/dashboard/all-users"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <User size={16} />
        All Users
      </NavLink>

      <NavLink
        to="/dashboard/manage-courts"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <Landmark size={16} />
        Manage Courts
      </NavLink>

      <NavLink
        to="/dashboard/manage-bookings"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <CalendarCheck size={16} />
        Confirmed Bookings
      </NavLink>

      <NavLink
        to="/dashboard/manage-coupons"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <Percent size={16} />
        Manage Coupons
      </NavLink>

      <NavLink
        to="/dashboard/announcements"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ''}`
        }
      >
        <Megaphone size={16} />
        Make Announcements
      </NavLink>
    </div>
  );
};

export default AdminLink;
