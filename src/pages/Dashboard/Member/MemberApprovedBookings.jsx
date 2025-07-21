// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router';
// import useAuth from '../../../hook/useAuth';
// import useAxiosSecure from '../../../hook/useAxiosSecure';

// const MemberApprovedBookings = () => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure()

//   // Fetch approved bookings for logged-in member
//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ['approvedBookings', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const {data} = await axiosSecure( `/bookings/approved/${user.email}`);
//       return data;
//     },
//   });

//   // Cancel mutation
//   const cancelBooking = useMutation({
//     mutationFn: async (id) => await axiosSecure.delete(`/bookings/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['approvedBookings']);
//     },
//   });

//   const handleCancel = (id) => {
//     if (window.confirm('Are you sure you want to cancel this booking?')) {
//       cancelBooking.mutate(id);
//     }
//   };

//   const handlePayment = (booking) => {
//     navigate('/dashboard/payment', { state: {booking} }); 
//   };

//   if (isLoading) return <p className="text-center">Loading bookings...</p>;
//   if (!bookings.length) return <p className="text-center text-gray-500">No approved bookings found.</p>;

//   return (
//    <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">Approved Bookings</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 border">CourtTitle</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Slots</th>
//               <th className="px-4 py-2 border">Price</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id} className="text-center">
//                 <td className="px-4 py-2 border">{booking.courttitle}</td>
//                 <td className="px-4 py-2 border">{booking.date}</td>
//                 <td className="px-4 py-2 border">
//   <select className="border px-2 py-1 rounded w-32 text-sm ">
//     {booking.slots.map((slot, idx) => (
//       <option className='bg-amber-50' key={idx} value={slot}>
//         {slot}
//       </option>
//     ))}
//   </select>
// </td>
//                 <td className="px-4 py-2 border">${booking.totalPrice}</td>
//                 <td className="px-4 py-2 border">
//                   <div className="flex justify-center gap-2">
//                     <button
//                       onClick={() => handlePayment(booking)}
//                       className="px-3 py-1  bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                       Pay 
//                     </button>
//                     <button
//                       onClick={() => handleCancel(booking._id)}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MemberApprovedBookings;

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loader from '../../../Component/Loader/Loader';

const MemberApprovedBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['approvedBookings', user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/approved/${user.email}?page=${page}&limit=${itemsPerPage}`);
      return data; 
    },
  });

  const bookings = data?.bookings || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / itemsPerPage);

  const cancelBooking = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['approvedBookings', user?.email, page]);
    },
  });

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking.mutate(id);
    }
  };

  const handlePayment = (booking) => {
    navigate('/dashboard/payment', { state: { booking } });
  };

  if (isLoading) return <Loader/>;
  if (!bookings.length) return <p className="text-center text-gray-500">No approved bookings found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Approved Bookings</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">CourtTitle</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Slots</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-center">
                <td className="px-4 py-2 border">{booking.courttitle}</td>
                <td className="px-4 py-2 border">
                   {new Date(booking.date).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                </td>
                <td className="px-4 py-2 border">
                  <select className="border px-2 py-1 rounded w-32 text-sm">
                    {booking.slots.map((slot, idx) => (
                      <option className="bg-amber-50" key={idx} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border">₹{booking.totalPrice}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handlePayment(booking)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaArrowLeft size={10} />
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 border rounded-full ${
              page === idx + 1 ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <FaArrowRight size={10}/>
        </button>
      </div>
    </div>
  );
};

export default MemberApprovedBookings;
