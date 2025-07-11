import { NavLink } from 'react-router';
import {
  UserCircle,
  Clock,
  CheckCircle2,
  BadgeCheck,
  CreditCard,
  Megaphone,
} from 'lucide-react';
import { TbCreditCard } from 'react-icons/tb';

const MemberLink = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-200 transition'
    }`;

  return (
    <div className="space-y-2">
      <NavLink to="/dashboard/profile-user" className={linkClass}>
        <UserCircle size={18} />
        My Profile
      </NavLink>

      <NavLink to="/dashboard/pending-bookings" className={linkClass}>
        <Clock size={18} />
        Pending Bookings
      </NavLink>

      <NavLink to="/dashboard/approved-bookings-member" className={linkClass}>
        <CheckCircle2 size={18} />
        Approved Bookings
      </NavLink>

      <NavLink to="/dashboard/confirmed-bookings" className={linkClass}>
        <BadgeCheck size={18} />
        Confirmed Bookings
      </NavLink>
<NavLink to="/dashboard/payment" className={linkClass}>
  <TbCreditCard size={18} />
  Payment
</NavLink>

      <NavLink to="/dashboard/payment-history" className={linkClass}>
        <CreditCard size={18} />
        Payment History
      </NavLink>

      <NavLink to="/dashboard/announcements" className={linkClass}>
        <Megaphone size={18} />
        Announcements
      </NavLink>
    </div>
  );
};

export default MemberLink;
