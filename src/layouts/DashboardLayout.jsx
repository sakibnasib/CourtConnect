// import { Outlet, Link} from 'react-router';
// import { Menu, LogOut } from 'lucide-react';
// import { useState } from 'react';
// import useAuth from '../hook/useAuth';

// import AdminLink from '../pages/Dashboard/Menu/AdminLink/AdminLink';

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { logOut } = useAuth();


//   const handleLogout = async () => {
//     try {
//       await logOut();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 ">
//       {/* Sidebar */}
//       <aside
//   className={` h-screen w-64 bg-white shadow-md transform ${
//     sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//   } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
// >
//         <div className="flex items-center justify-center h-16 border-b px-6 ">
//           <Link to="/" className="text-2xl font-bold text-blue-600">
//             CourtConnect
//           </Link>
//         </div>

//         <div className="p-4 space-y-4">
//           {/* <UserLink /> */}
//           {/* <MemberLink /> */}
//           <AdminLink/>
//         </div>

//         <div className="absolute bottom-4 left-4">
          
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <header className="sticky top-0 z-10 flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-gray-700 focus:outline-none"
//           >
//             <Menu size={24} />
//           </button>
//           {/* <h1 className="text-lg font-semibold text-gray-700 capitalize">
//             {location.pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
//           </h1> */}
//         </header>

//         {/* Page Content */}
//         <main className="flex-1  p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import { Outlet, Link } from 'react-router';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../hook/useAuth';
import AdminLink from '../pages/Dashboard/Menu/AdminLink/AdminLink';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen  bg-gray-50 ">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 md:static h-full w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            CourtConnect
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-1 space-y-1">
          {/* Add your links here */}
          <AdminLink />
        </div>

<hr />
        <div className="absolute bottom-2 left-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-500 hover:text-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <span className="font-semibold text-gray-800 text-lg">Dashboard</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
