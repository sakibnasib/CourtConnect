// import { Outlet, Link } from 'react-router';
// import { Menu, X, LogOut } from 'lucide-react';
// import { useState } from 'react';
// import useAuth from '../hook/useAuth';
// // import UserLink from '../pages/Dashboard/Menu/UserMenu/UserLink';
// import Logo from '../Component/Logo';
// // import MemberLink from '../pages/Dashboard/Menu/MemberMenu/MemberLink';
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
//     <div className="flex h-screen bg-gray-50 ">
//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed z-40 md:static h-full w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0`}
//       >
//         <div className="flex items-center justify-between h-16 px-6 ">
//           <Link to="/" className="text-2xl font-bold  shadow-2xl ">
//            <Logo/>
//           </Link>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="md:hidden text-gray-700"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-1 space-y-1">
//           {/* Add your links here */}
//           <AdminLink />
//           {/* <UserLink/> */}
//           {/* <MemberLink/> */}
//         </div>

//         <div className=" bottom-2 left-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-500 hover:text-red-600"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         {/* Top Bar */}
//         <header className="sticky top-0 z-20  flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-gray-700 focus:outline-none"
//           >
//             <Menu size={30} />
//           </button>
//           <Link to="/" className="font-semibold text-gray-800 text-lg"><Logo/></Link>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-auto p-4">
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
import Logo from '../Component/Logo';
import AdminLink from '../pages/Dashboard/Menu/AdminLink/AdminLink';
import useRole from '../hook/useRole';
import UserLink from '../pages/Dashboard/Menu/UserMenu/UserLink';
import MemberLink from '../pages/Dashboard/Menu/MemberMenu/MemberLink';
import Loader from '../Component/Loader/Loader';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logOut } = useAuth();
  const [role , isRoleLoading]=useRole()
if(isRoleLoading) return <Loader/>
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col  md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link to="/" className="text-2xl font-bold">
            <Logo />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-3 space-y-1 overflow-y-auto h-[calc(100%-100px)]">
          {role === 'admin' && <AdminLink />}
            {role === 'member' && <MemberLink/>}
           {role === 'user' && <UserLink/>}
        </div>

        <div className="absolute mt-2 bottom-4 left-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-500 hover:text-red-600"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={30} />
          </button>
          <Link to="/" className="font-semibold text-gray-800 text-lg">
            <Logo />
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
