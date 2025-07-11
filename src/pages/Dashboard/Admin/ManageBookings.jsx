// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const ManageBookingsApproval = () => {
//   const queryClient = useQueryClient();

//   // Fetch pending bookings
//   const { data: bookings = [], isLoading } = useQuery({
//     queryKey: ['bookings'],
//     queryFn: async () => {
//       const res = await axios.get('http://localhost:3000/bookings?status=approved');
//       return res.data;
//     }
//   });

//   // Mutation to update status
//   const updateBookingMutation = useMutation({
//     mutationFn: ({ id, status }) =>
//       axios.patch(`http://localhost:3000/bookings/${id}`, { status }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['bookings']);
//       Swal.fire('Updated!', 'Booking status changed.', 'success');
//     },
//     onError: () => {
//       Swal.fire('Error', 'Failed to update booking.', 'error');
//     }
//   });

//   const handleStatusChange = (id, status) => {
//     updateBookingMutation.mutate({ id, status });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Booking Requests</h2>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : bookings.length === 0 ? (
//         <p>No pending bookings found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full border rounded">
//             <thead>
//               <tr>
//                 <th>Court</th>
//                 <th>Type</th>
//                 <th>Date</th>
//                 <th>Slots</th>
//                 <th>Total Price</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id}>
//                   <td>{booking.courtName}</td>
//                   <td>{booking.courtType}</td>
//                   <td>{booking.date}</td>
//                   <td>
//                     {booking.slots.map((slot, idx) => (
//                       <span key={idx} className="block">{slot}</span>
//                     ))}
//                   </td>
//                   <td>₹{booking.totalPrice}</td>
//                   <td className='text-amber-500'>{booking.status}</td>
//                   <td className="space-x-2">
//                     <button
//                       className="btn btn-xs btn-success"
//                       onClick={() => handleStatusChange(booking._id, 'approved')}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="btn btn-xs btn-error"
//                       onClick={() => handleStatusChange(booking._id, 'rejected')}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBookingsApproval;


import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MemberApprovedBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch only approved bookings for the logged-in user
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['approvedBookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await  await axios.get('http://localhost:3000/bookings?status=approved');
      return res.data;
    },
  });

  // Cancel mutation
  const cancelMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['approvedBookings']);
      Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cancel booking.', 'error');
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Cancel Booking?',
      text: 'This cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  const handlePayment = (booking) => {
    // Redirect to payment route with booking ID or full data
    navigate('/dashboard/payment', { state: { booking } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Your Approved Bookings</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No approved bookings available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded">
            <thead>
              <tr>
                <th>Court</th>
                <th>Type</th>
                <th>Date</th>
                <th>Slots</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.courtName}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.date}</td>
                  <td>
                    {booking.slots.map((slot, idx) => (
                      <span key={idx} className="block">{slot}</span>
                    ))}
                  </td>
                  <td>₹{booking.totalPrice}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => handlePayment(booking)}
                    >
                      Pay Now
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberApprovedBookings;
