import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageBookingsApproval = () => {
  const queryClient = useQueryClient();

  // Fetch pending bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/bookings?status=pending');
      return res.data;
    }
  });

  // Mutation to update status
  const updateBookingMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axios.patch(`http://localhost:3000/bookings/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      Swal.fire('Updated!', 'Booking status changed.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update booking.', 'error');
    }
  });

  const handleStatusChange = (id, status) => {
    updateBookingMutation.mutate({ id, status });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Booking Requests</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No pending bookings found.</p>
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
                <th>Status</th>
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
                  <td className='text-amber-500'>{booking.status}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleStatusChange(booking._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleStatusChange(booking._id, 'rejected')}
                    >
                      Reject
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

export default ManageBookingsApproval;
