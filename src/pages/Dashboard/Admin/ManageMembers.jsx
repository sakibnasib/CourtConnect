import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const ManageMembers = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
       const res = await axios.get('http://localhost:3000/users?role=member');
  return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/users/${id}`),
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

  const filteredMembers = members.filter(member =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Manage Members</h2>

      <input
        type="text"
        placeholder="Search members by name"
        className="input input-bordered w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <p>Loading members...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load members.</p>
      ) : filteredMembers.length === 0 ? (
        <p>No members found.</p>
      ) : (
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
              {filteredMembers.map(member => (
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
                  <td>{new Date(member.created_at).toLocaleDateString()}</td>
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
      )}
    </div>
  );
};

export default ManageMembers;
