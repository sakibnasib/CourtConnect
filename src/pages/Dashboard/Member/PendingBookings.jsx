import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useAuth from '../../../hook/useAuth';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PendingB = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['pendingBookings'],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`http://localhost:3000/bookings/pending/${user?.email}`);
      return data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (bookingId) => axiosSecure.delete(`/bookings/${bookingId}`),
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

  const totalPages = Math.ceil((data?.totalCount || 0) / itemsPerPage);
const paginatedBookings = data?.bookings || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">⏳ Pending Bookings</h2>

      {data.length === 0 ? (
        <p className="text-gray-600">No pending bookings found.</p>
      ) : (
        <>
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
                {paginatedBookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 border">{booking.userEmail}</td>
                    <td className="py-2 px-4 border">{booking.courtType}</td>
                    <td className="py-2 px-4 border">{booking.date}</td>
                    <td className="px-4 py-2">
                      <select className="border px-2 py-1 rounded w-32 text-sm">
                        {booking.slots.map((slot, idx) => (
                          <option className="bg-amber-50" key={idx} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </td>
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

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4 gap-2">
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
              <FaArrowRight size={10} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PendingB;
