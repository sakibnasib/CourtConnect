import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import debounce from 'lodash.debounce';

const fetchUsers = async (search) => {
  const res = await axios.get(`http://localhost:3000/users`, {
    params: { search },
  });
  return res.data;
};

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400); // delay
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: () => fetchUsers(debouncedSearch),
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">👥 All Users</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border px-4 py-2 rounded mb-4"
      />

      {isLoading && <p>Loading users...</p>}
      {isError && <p className="text-red-600">Failed to fetch users.</p>}

      {!isLoading && users.length === 0 && (
        <p className="text-gray-600">No users found.</p>
      )}

      {!isLoading && users.length > 0 && (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 capitalize">{user.role || 'user'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllUsers;
