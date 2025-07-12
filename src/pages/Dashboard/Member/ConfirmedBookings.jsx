import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ConfirmedBookings = () => {
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['confirmedBookings'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/bookings?status=confirmed');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading confirmed bookings...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error fetching confirmed bookings.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">✅ Confirmed Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No confirmed bookings found.</p>
      ) : (
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
                  <td className="py-2 px-4 border">{booking.userEmai}</td>
                  <td className="py-2 px-4 border">{booking.courtType}</td>
                  <td className="py-2 px-4 border">{booking.date}</td>
                  <td className="py-2 px-4 border">{booking.slots?.join(', ')}</td>
                  <td className="py-2 px-4 border">₹{booking.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;
