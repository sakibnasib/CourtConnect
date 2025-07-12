import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const PendingB = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch all pending bookings
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['pendingBookings'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/bookings?status=pending');
      return res.data;
    },
  });

  // ✅ Mutation to cancel a booking
  const cancelMutation = useMutation({
    mutationFn: (bookingId) => axios.delete(`http://localhost:3000/bookings/${bookingId}`),
    onSuccess: () => {
      Swal.fire('Cancelled!', 'The booking has been cancelled.', 'success');
      queryClient.invalidateQueries(['pendingBookings']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cancel booking', 'error');
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This booking will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading pending bookings...</p>;
  if (isError) return <p className="text-red-500 text-center mt-10">Failed to load bookings.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">⏳ Pending Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No pending bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">User</th>
                <th className="py-2 px-4 border">Court</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Slot</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 border">{booking.userEmail}</td>
                  <td className="py-2 px-4 border">{booking.courtType}</td>
                  <td className="py-2 px-4 border">{booking.date}</td>
                  <td className="py-2 px-4 border">{booking.slots?.join(', ')}</td>
                  <td className="py-2 px-4 border">₹{booking.totalPrice}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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

export default PendingB;
