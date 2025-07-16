// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hook/useAxiosSecure';


// const AllUsers = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState('');
// const axiosSecure = useAxiosSecure()
//   // Debounce search input
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//     }, 400); // delay
//     return () => clearTimeout(handler);
//   }, [searchTerm]);

//   const { data: users = [], isLoading, isError } = useQuery({
//     queryKey: ['users', debouncedSearch],
//     queryFn: () => async (searchTerm) => {
//   const {data} = await axiosSecure.get(`http://localhost:3000/users`, {
   
//   });
//   return data;
// }
//   });

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">👥 All Users</h1>

//       <input
//         type="text"
//         placeholder="Search by name or email..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className=" border px-4 py-2 rounded mb-4"
//       />

//       {isLoading && <p>Loading users...</p>}
//       {isError && <p className="text-red-600">Failed to fetch users.</p>}

//       {!isLoading && users.length === 0 && (
//         <p className="text-gray-600">No users found.</p>
//       )}

//       {!isLoading && users.length > 0 && (
//         <table className="w-full border text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2 text-left">Name</th>
//               <th className="border px-4 py-2 text-left">Email</th>
//               <th className="border px-4 py-2 text-left">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td className="border px-4 py-2">{user.name}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//                 <td className="border px-4 py-2 capitalize">{user.role || 'user'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AllUsers;


import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loader from '../../../Component/Loader/Loader';

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const axiosSecure = useAxiosSecure();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`, {
        params: {
          search: debouncedSearch || undefined, // only send if not empty
        },
      });
      return res.data;
    },
    enabled: !!axiosSecure, // Only run when axios is ready
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">👥 All Users</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded mb-4 w-full max-w-md"
      />

      {isLoading && <Loader/>}
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
