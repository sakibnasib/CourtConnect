import { useState,} from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loader from '../../../Component/Loader/Loader';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const AdminBookingsSection = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['admin-bookings', search, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/bookings?page=${currentPage}&limit=${bookingsPerPage}&search=${search}`
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const bookings = data?.bookings || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / bookingsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">📋 Manage Bookings</h2>

      <div className="flex justify-center mb-4">
        <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full max-w-sm px-4 py-2 border rounded-full border-gray-300  focus:outline-none focus:ring"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-md">
              <thead className="text-gray-600 font-semibold">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Court Type</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, index) => (
                  <tr key={b._id || index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{b.courttitle}</td>
                    <td className="px-4 py-3">{b.courtType || 'N/A'}</td>
                    <td className="px-4 py-3">{b.userEmail}</td>
                    <td className="px-4 py-3 text-green-600 font-medium">
                      {b.status || 'Confirmed'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <p className="text-center text-gray-400 py-6">No bookings found.</p>
            )}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              <button
                className="px-2 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaArrowLeft size={10}/>
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary rounded-full' : 'rounded-full'}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="px-2 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
               <FaArrowRight size={10} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AdminBookingsSection;
