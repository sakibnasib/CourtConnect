// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { FaUser, FaUsers, FaMoneyBillWave, FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
// import useAuth from '../../../hook/useAuth';
// import useAxiosSecure from '../../../hook/useAxiosSecure';

// const StatCard = ({ icon, label, value, bgColor }) => (
//   <div className={`flex items-center gap-4 p-4 rounded-lg shadow-md ${bgColor} text-white`}>
//     <div className="text-3xl">{icon}</div>
//     <div>
//       <p className="text-sm uppercase tracking-wide">{label}</p>
//       <p className="text-xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// const AdminProfile = () => {
//   const { user } = useAuth();
// const axiosSecure = useAxiosSecure()
//   const { data = {}, isLoading } = useQuery({
//     queryKey: ['adminOverview'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/admin/overview');
//       return res.data;
//     },
//   });

//   const {
//     totalCourts = 0,
//     totalUsers = 0,
//     totalMembers = 0,
//     earnings = {},
//   } = data;

//   if (isLoading) return <p className="text-center font-semibold">Loading...</p>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Admin Info Card */}
//       <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-center mb-8">
//         <img
//           src={user?.photoURL || 'https://i.ibb.co/4Jf3Zq2/user.png'}
//           alt="Admin"
//           className="w-24 h-24 rounded-full object-cover"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{user?.displayName || 'Admin'}</h2>
//           <p className="text-gray-600">{user?.email}</p>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//         <StatCard
//           icon={<FaUsers />}
//           label="Total Users"
//           value={totalUsers}
//           bgColor="bg-blue-500"
//         />
//         <StatCard
//           icon={<FaUser />}
//           label="Total Members"
//           value={totalMembers}
//           bgColor="bg-green-500"
//         />
//         <StatCard
//           icon={<FaUniversity />}
//           label="Total Courts"
//           value={totalCourts}
//           bgColor="bg-purple-500"
//         />
//         <StatCard
//           icon={<FaMoneyBillWave />}
//           label="Total Earnings"
//           value={`₹${earnings.totalEarnings || 0}`}
//           bgColor="bg-rose-500"
//         />
//       </div>

//       {/* Earnings Breakdown */}
//       <h3 className="text-xl font-semibold mb-4">💰 Earnings Breakdown</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <StatCard
//           icon={<FaCalendarDay />}
//           label="Today"
//           value={`₹${earnings.todayEarnings || 0}`}
//           bgColor="bg-yellow-500"
//         />
//         <StatCard
//           icon={<FaCalendarWeek />}
//           label="This Week"
//           value={`₹${earnings.weekEarnings || 0}`}
//           bgColor="bg-orange-500"
//         />
//         <StatCard
//           icon={<FaCalendarAlt />}
//           label="This Month"
//           value={`₹${earnings.monthEarnings || 0}`}
//           bgColor="bg-pink-500"
//         />
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;


import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FaUser,
  FaUsers,
  FaMoneyBillWave,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendarAlt,
  FaUniversity,
} from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loader from '../../../Component/Loader/Loader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-xl shadow-lg p-5 flex items-center gap-4 hover:shadow-xl transition duration-200">
    <div className={`text-3xl p-4 rounded-full ${color.bg} text-white`}>
      {icon}
    </div>
    <div>
      <p className="text-sm uppercase tracking-wider text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['adminOverview'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/overview');
      return res.data;
    },
  });

  const {
    totalCourts = 0,
    totalUsers = 0,
    totalMembers = 0,
    earnings = {},
  } = data;

  const chartData = {
    labels: ['Today', 'This Week', 'This Month'],
    datasets: [
      {
        label: 'Earnings',
        data: [
          earnings.todayEarnings || 0,
          earnings.weekEarnings || 0,
          earnings.monthEarnings || 0,
        ],
        backgroundColor: ['#facc15', '#f97316', '#ec4899'],
        borderRadius: 12,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  if (isLoading) return <Loader/>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-center   gap-6 mb-10">
        <img
          src={user?.photoURL || 'https://i.ibb.co/4Jf3Zq2/user.png'}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.displayName || 'Admin'}</h1>
          <p className="text-white/80">{user?.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<FaUsers />}
          label="Total Users"
          value={totalUsers}
          color={{ bg: 'bg-blue-500' }}
        />
        <StatCard
          icon={<FaUser />}
          label="Total Members"
          value={totalMembers}
          color={{ bg: 'bg-green-500' }}
        />
        <StatCard
          icon={<FaUniversity />}
          label="Total Courts"
          value={totalCourts}
          color={{ bg: 'bg-purple-500' }}
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          label="Total Earnings"
          value={`₹${earnings.totalEarnings || 0}`}
          color={{ bg: 'bg-rose-500' }}
        />
      </div>

      {/* Earnings Breakdown */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Earnings Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<FaCalendarDay />}
          label="Today"
          value={`₹${earnings.todayEarnings || 0}`}
          color={{ bg: 'bg-yellow-500' }}
        />
        <StatCard
          icon={<FaCalendarWeek />}
          label="This Week"
          value={`₹${earnings.weekEarnings || 0}`}
          color={{ bg: 'bg-orange-500' }}
        />
        <StatCard
          icon={<FaCalendarAlt />}
          label="This Month"
          value={`₹${earnings.monthEarnings || 0}`}
          color={{ bg: 'bg-pink-500' }}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Bar Chart: Earnings</h3>
        <Bar data={chartData} options={chartOptions} height={120} />
      </div>
    </div>
  );
};

export default AdminProfile;
