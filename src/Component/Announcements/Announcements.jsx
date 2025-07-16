import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';

const Announ = () => {
  const axiosSecure = useAxiosSecure()
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading announcements...</p>;
  if (error) return <p className="text-red-500">Failed to load announcements.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📣 Club Announcements</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        data.map((a) => (
          <div key={a._id} className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-blue-700">{a.title}</h3>
            <p className="text-gray-700">{a.message}</p>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(a.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Announ;
