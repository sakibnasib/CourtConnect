import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loader from '../../../Component/Loader/Loader';

const ManageBookings = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['bookings', page],
    queryFn: async () => {
      const res = await axiosSecure.get('http://localhost:3000/bookings/admin/pending', {
        params: { page, limit },
      });
      return res.data;
    },
  });

  const bookings = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const updateBookingMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/bookings/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      Swal.fire('Updated!', 'Booking status changed.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update booking.', 'error');
    },
  });

  const handleStatusChange = (id, status) => {
    if (status === 'rejected') {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to reject this booking?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, reject it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          updateBookingMutation.mutate({ id, status });
        }
      });
    } else {
      updateBookingMutation.mutate({ id, status });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-5">
      <h2 className="text-2xl font-bold mb-4">Manage Booking Requests</h2>

      {isLoading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded shadow">
            <table className="table w-full text-sm border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Court Title</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Slots</th>
                  <th className="px-4 py-2">Total Price</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t">
                    <td className="px-4 py-2">{booking.courttitle}</td>
                    <td className="px-4 py-2">{booking.courtType}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                   <td className="px-4 py-2">
  <select className="border px-2 py-1 rounded w-32 text-sm">
    {booking.slots.map((slot, idx) => (
      <option className='bg-amber-50' key={idx} value={slot}>
        {slot}
      </option>
    ))}
  </select>
</td>
                    <td className="px-4 py-2">₹{booking.totalPrice}</td>
                    <td className="px-4 py-2 capitalize">{booking.status}</td>
                    <td className="px-4 py-2 space-x-1 flex ">
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

          {/* Pagination */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 border rounded ${
                  page === idx + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageBookings;
