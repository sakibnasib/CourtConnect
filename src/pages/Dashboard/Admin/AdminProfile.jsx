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
import { Chart } from 'react-google-charts';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loader from '../../../Component/Loader/Loader';

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
      const { data } = await axiosSecure.get('/admin/overview');
      return data;
    },
  });

  const {
    totalCourts = 0,
    totalUsers = 0,
    totalMembers = 0,
    earnings = {},
  } = data;
  
  const {
  todayEarnings = 0,
  weekEarnings = 0,
  monthEarnings = 0,
  yearEarnings = 0,
  totalEarnings = 0,
} = earnings;

  const pieChartData = [
  ['Period', 'Earnings'],
  ['Today', todayEarnings || 0.01],
  ['This Week', weekEarnings || 0.01],
  ['This Month', monthEarnings || 0.01],
  ['This Year', yearEarnings || 0.01],
  ['Total', totalEarnings || 0.01],
];


  const pieChartOptions = {
  title: 'Earnings Distribution',
  is3D: true,
  legend: { position: 'bottom' },
  pieSliceText: 'value',
  colors: ['#facc15', '#6366f1', '#10b981', '#ec4899', '#f97316', '#4f46e5'],
};


  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
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
        <StatCard icon={<FaUsers />} label="Total Users" value={totalUsers} color={{ bg: 'bg-blue-500' }} />
        <StatCard icon={<FaUser />} label="Total Members" value={totalMembers} color={{ bg: 'bg-green-500' }} />
        <StatCard icon={<FaUniversity />} label="Total Courts" value={totalCourts} color={{ bg: 'bg-purple-500' }} />
        <StatCard
          icon={<FaMoneyBillWave />}
          label="Total Earnings"
          value={`₹${earnings.totalEarnings || 0}`}
          color={{ bg: 'bg-rose-500' }}
        />
      </div>

      {/* Earnings Summary */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Earnings Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<FaCalendarDay />} label="Today" value={`₹${earnings.todayEarnings || 0}`} color={{ bg: 'bg-yellow-500' }} />
        <StatCard icon={<FaCalendarWeek />} label="This Week" value={`₹${earnings.weekEarnings || 0}`} color={{ bg: 'bg-orange-500' }} />
        <StatCard icon={<FaCalendarAlt />} label="This Month" value={`₹${earnings.monthEarnings || 0}`} color={{ bg: 'bg-pink-500' }} />
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📈 Earnings Pie Chart</h3>
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={pieChartOptions}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default AdminProfile;
