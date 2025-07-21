import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loader from '../../../Component/Loader/Loader';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ManageMembers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  // Fetch paginated members with optional search
  const { data, isLoading, error } = useQuery({
    queryKey: ['members', currentPage, searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/users?page=${currentPage}&limit=${membersPerPage}&search=${searchTerm}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const members = data?.members || [];
  const totalPages = Math.ceil((data?.total || 0) / membersPerPage);

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      Swal.fire('Deleted!', 'Member has been removed.', 'info');
      queryClient.invalidateQueries(['members']);
    },
    onError: () => Swal.fire('Error', 'Failed to delete member', 'error')
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the member permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Manage Members</h2>

      <input
        type="text"
        placeholder="Search members by name"
        className="input input-bordered w-full md:w-1/2"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">Failed to load members.</p>
      ) : members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded shadow bg-white">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member._id}>
                    <td>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td className="text-sm text-gray-600">
                      {new Date(member.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      })}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            <button
               className="px-2 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
               <FaArrowLeft size={10}/>
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary rounded-full' : ''}`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
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
        </>
      )}
    </div>
  );
};

export default ManageMembers;
