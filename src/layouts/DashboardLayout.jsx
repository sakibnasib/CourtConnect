import { Outlet, Link} from 'react-router';
import { Menu, LogOut } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../hook/useAuth';
// import UserLink from '../pages/Dashboard/Menu/UserMenu/UserLink';
// import MemberLink from '../pages/Dashboard/Menu/MemberMenu/MemberLink';
import AdminLink from '../pages/Dashboard/Menu/AdminLink/AdminLink';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logOut } = useAuth();
//   const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <aside
  className={` h-screen w-64 bg-white shadow-md transform ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
  } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
>
        <div className="flex items-center justify-center h-16 border-b px-6 ">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            CourtConnect
          </Link>
        </div>

        <div className="p-4 space-y-4">
          {/* <UserLink /> */}
          {/* <MemberLink /> */}
          <AdminLink/>
        </div>

        <div className="absolute bottom-4 left-4">
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          {/* <h1 className="text-lg font-semibold text-gray-700 capitalize">
            {location.pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
          </h1> */}
        </header>

        {/* Page Content */}
        <main className="flex-1  p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
