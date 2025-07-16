import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useAuth from '../../../hook/useAuth';


const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure()
  const {user}=useAuth()
  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const {data}= await  axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <p className="text-center mt-10">Loading payment history...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Failed to load payment history.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">💳 Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-600">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Amount (₹)</th>
                <th className="py-2 px-4 border">Transaction ID</th>
                <th className="py-2 px-4 border">Court Type</th>
                <th className="py-2 px-4 border">Booking Date</th>
                <th className="py-2 px-4 border">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4 border">{payment.email}</td>
                  <td className="py-2 px-4 border">{payment.amount}</td>
                  <td className="py-2 px-4 border text-blue-600">{payment.transactionId}</td>
                  <td className="py-2 px-4 border capitalize">{payment.courtType}</td>
                  <td className="py-2 px-4 border">{payment.date}</td>
                  <td className="py-2 px-4 border">
                    {new Date(payment.createdAt).toLocaleString()}
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

export default PaymentHistory;
