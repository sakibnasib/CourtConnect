import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PendingBookings = () => {
  const queryClient = useQueryClient();

  // GET all pending bookings
  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/bookings?status=pending");
      return res.data;
    },
  });

  // DELETE booking mutation
  const cancelMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/bookings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingBookings"]);
      Swal.fire("Cancelled", "Booking has been cancelled.", "info");
    },
    onError: () => Swal.fire("Error", "Failed to cancel booking.", "error"),
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading pending bookings...</p>;
  if (error) return <p className="text-red-500">Failed to load bookings.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">⏳ Pending Bookings</h2>

      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Court</th>
                <th>Type</th>
                <th>Date</th>
                <th>Slots</th>
                <th>Total Price</th>
                <th>User Email</th>
                <th>Action</th>
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
                      <span key={idx} className="badge badge-info mr-1">{slot}</span>
                    ))}
                  </td>
                  <td>৳{booking.totalPrice}</td>
                  <td>{booking.userEmai}</td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-error"
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

export default PendingBookings;
