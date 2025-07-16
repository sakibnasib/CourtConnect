// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useNavigate } from 'react-router';
// import useAuth from '../../../hook/useAuth';

// const MemberApprovedBookings = () => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   // Fetch approved bookings for logged-in member
//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ['approvedBookings', user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axios.get( `http://localhost:3000/bookings?status=approved&email=${user.email}`);
//       return res.data;
//     },
//   });

//   // Cancel mutation
//   const cancelBooking = useMutation({
//     mutationFn: async (id) => await axios.delete(`http://localhost:3000/bookings/${id}`),
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
//     navigate('/dashboard/payment-pay', { state: booking }); 
//   };

//   if (isLoading) return <p className="text-center">Loading bookings...</p>;
//   if (!bookings.length) return <p className="text-center text-gray-500">No approved bookings found.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-center">Approved Bookings</h2>
//       <div className="grid gap-4">
//         {bookings.map((booking) => (
//           <div key={booking._id} className="p-4 rounded-md shadow bg-white">
//             <p><strong>Court:</strong> {booking.courtName}</p>
//             <p><strong>Date:</strong> {booking.date}</p>
//             <p><strong>Slot:</strong> {booking.slot}</p>
//             <p><strong>Price:</strong> ${booking.price}</p>

//             <div className="flex gap-4 mt-3">
//               <button
//                 onClick={() => handlePayment(booking)}
//                 className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Pay Now
//               </button>
//               <button
//                 onClick={() => handleCancel(booking._id)}
//                 className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MemberApprovedBookings;

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const MemberApprovedBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  // Fetch approved bookings for logged-in member
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['approvedBookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const {data} = await axiosSecure( `/bookings/approved/${user.email}`);
      return data;
    },
  });

  // Cancel mutation
  const cancelBooking = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['approvedBookings']);
    },
  });

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking.mutate(id);
    }
  };

  const handlePayment = (booking) => {
    navigate('/dashboard/payment', { state: {booking} }); 
  };

  if (isLoading) return <p className="text-center">Loading bookings...</p>;
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
                <td className="px-4 py-2 border">{booking.date}</td>
                <td className="px-4 py-2 border">{booking.slots?.join(', ')}</td>
                <td className="px-4 py-2 border">${booking.totalPrice}</td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handlePayment(booking)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Pay Now
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
    </div>
  );
};

export default MemberApprovedBookings;