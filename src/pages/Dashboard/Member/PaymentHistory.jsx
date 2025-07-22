import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Loader from "../../../Component/Loader/Loader";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payments", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}?page=${page}&limit=${limit}`
      );
      return data; // { payments, totalCount }
    },
  });

  const payments = data?.payments || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load payment history.
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">💳 Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-600">No payment history found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Amount ($)</th>
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
                    <td className="py-2 px-4 border">${payment.amount}</td>
                    <td className="py-2 px-4 border text-blue-600">
                      {payment.transactionId}
                    </td>
                    <td className="py-2 px-4 border capitalize">
                      {payment.courtType}
                    </td>
                    <td className="py-2 px-4 border text-sm text-gray-700">
                      {new Date(payment.date).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>

                    <td className="py-2 px-4 border text-sm text-gray-700">
                      {new Date(payment.createdAt).toLocaleString("en-IN", {
                        year: "numeric",
                       month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                  page === idx + 1 ? "bg-blue-500 text-white" : "bg-white"
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

export default PaymentHistory;
