import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAxiosSecure from '../../../hook/useAxiosSecure'
import Loader from '../../../Component/Loader/Loader'


const AdminBookingsSection = () => {
  const axiosSecure = useAxiosSecure()
  const [search, setSearch] = useState('')

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['admin-bookings', search],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/admin/bookings?search=${search}`)
      return data
    },
    staleTime: 5 * 60 * 1000,
  })

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📋 Manage Bookings</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Loader/>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-md">
            <thead className=" text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">CourtType</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{b.courttitle}</td>
                  <td className="px-4 py-3">{b.courtType|| 'N/A'}</td>
                  <td className="px-4 py-3">{b.userEmail}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">Confirmed</td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <p className="text-center text-gray-400 py-6">No confirmed bookings found.</p>
          )}
        </div>
      )}
    </section>
  )
}

export default AdminBookingsSection
