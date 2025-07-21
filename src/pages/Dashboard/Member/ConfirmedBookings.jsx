// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../hook/useAuth';
// import useAxiosSecure from '../../../hook/useAxiosSecure';

// const ConfirmedBookings = () => {
//   const {user}=useAuth()
//   const axiosSecure = useAxiosSecure()
//   const { data: bookings = [], isLoading, isError } = useQuery({
//     queryKey: ['confirmedBookings'],
//     queryFn: async () => {
//       const {data}= await axiosSecure.get(`/bookings/confirmed/${user?.email}`);
//       return data;
//     },
//   });

//   if (isLoading) return <p className="text-center mt-10">Loading confirmed bookings...</p>;
//   if (isError) return <p className="text-center text-red-500 mt-10">Error fetching confirmed bookings.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">✅ Confirmed Bookings</h2>

//       {bookings.length === 0 ? (
//         <p className="text-gray-600">No confirmed bookings found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="py-2 px-4 border">User</th>
//                 <th className="py-2 px-4 border">Court</th>
//                 <th className="py-2 px-4 border">Date</th>
//                 <th className="py-2 px-4 border">Time</th>
//                 <th className="py-2 px-4 border">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id} className="border-t hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{booking.userEmail}</td>
//                   <td className="py-2 px-4 border">{booking.courtType}</td>
//                   <td className="py-2 px-4 border">{booking.date}</td>
//                   <td className="py-2 px-4 border">{booking.slots?.join(', ')}</td>
//                   <td className="py-2 px-4 border">₹{booking.totalPrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConfirmedBookings;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loader from '../../../Component/Loader/Loader';

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['confirmedBookings', user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/member/bookings/confirmed/${user?.email}?page=${page}&limit=${limit}`
      );
      return data; // { bookings: [...], totalCount: N }
    },
  });

  const bookings = data?.bookings || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  if (isLoading) return <Loader/>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error fetching confirmed bookings.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">✅ Confirmed Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No confirmed bookings found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border">User</th>
                  <th className="py-2 px-4 border">Court</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Time</th>
                  <th className="py-2 px-4 border">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 border">{booking.userEmail}</td>
                    <td className="py-2 px-4 border">{booking.courtType}</td>
                    <td className="py-2 px-4 border ">
                       {new Date(booking.date).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="py-2 px-4 border">
                       <select className="border px-2 py-1 rounded w-32 text-sm">
                        {booking.slots.map((slot, idx) => (
                          <option className="bg-amber-50" key={idx} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 px-4 border">₹{booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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
        </>
      )}
    </div>
  );
};

export default ConfirmedBookings;

