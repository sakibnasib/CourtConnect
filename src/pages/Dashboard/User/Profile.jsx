import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hook/useAuth';
import axios from 'axios';

const MyProfile = () => {
  const { user } = useAuth();
  const email = user?.email;

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['userProfile', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users/email/${email}`);
      return res.data;
    },
  });


  // const userData = users[0];

  if (isLoading) return <p className="text-center">Loading profile...</p>;
  if (error || !users) return <p className="text-red-500 text-center">Failed to load User  profile.</p>;

  const { name, image, email: userEmail,role,member_since, created_at, last_loggedIn } = users;

  const formatDateTime = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
     <div className="max-w-xl mx-auto p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-amber-500 font-medium">{role}</p>
          <p className="text-gray-600">{userEmail}</p>
          <p className="text-sm text-gray-500">
            <strong>Registered on:</strong> {formatDateTime(created_at)}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Last Login:</strong> {formatDateTime(last_loggedIn)}
          </p>

          {role === 'member' && (
            <p className="text-sm text-green-700">
              <strong>Member since:</strong>{' '}
              {member_since ? formatDateTime(member_since) : 'Unknown'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
