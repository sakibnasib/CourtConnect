import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from '../hook/useAuth';
import useAxiosSecure from '../hook/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Component/Loader/Loader';

const CourtBookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingData, setBookingData] = useState({ date: '', slots: [] });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const { data: courts, isLoading } = useQuery({
    queryKey: ['courts', currentPage],
    queryFn: async () => {
      const { data } = await axios.get(`https://server12-taupe.vercel.app/courts?page=${currentPage}&limit=${pageSize}`);
      return data;
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (booking) => {
      const { data } = await axiosSecure.post('/bookings', booking);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      setIsModalOpen(false);
      setBookingData({ date: '', slots: [] });
      toast.success('Booking request sent. Awaiting admin approval.');
    },
  });

  const handleBookNow = (court) => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    setSelectedCourt(court);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookingData.date || bookingData.slots.length === 0) return;

    bookingMutation.mutate({
      userId: user.id,
      courtId: selectedCourt._id,
      courtType: selectedCourt.type,
      courtImg: selectedCourt.image,
      courttitle: selectedCourt.title,
      pricePerSlot: selectedCourt.price,
      totalPrice: selectedCourt.price * bookingData.slots.length,
      date: bookingData.date,
      slots: bookingData.slots,
      userEmail: user?.email,
      status: 'pending',
    });
  };

  useEffect(() => {
    if (courts?.totalPages && currentPage < courts.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['courts', currentPage + 1],
        queryFn: async () => {
          const { data } = await axios.get(`https://server12-taupe.vercel.app/courts?page=${currentPage + 1}&limit=${pageSize}`);
          return data;
        }
      });
    }
  }, [courts, currentPage, queryClient]);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">🏟️ Book a Sports Court</h1>

      {isLoading ? (
        <Loader/>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courts?.data?.length > 0 ? (
              courts.data.map((court) => (
                <div
                  key={court._id}
                  className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  <img
                    src={court.image}
                    alt={court.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-800">{court.title}</h2>
                    <p className="text-sm text-gray-500">Type: <span className="font-medium">{court.type}</span></p>
                    <p className="text-sm text-gray-500">Price: ₹{court.price} / slot</p>
                  </div>
                  <button
                    onClick={() => handleBookNow(court)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
                  >
                    Book Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No courts available.</p>
            )}
          </div>

          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: courts?.totalPages || 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, courts?.totalPages || 1))
              }
              disabled={currentPage === (courts?.totalPages || 1)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-xl font-bold mb-4">
              Booking Court: {selectedCourt?.title}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Court Type</label>
                <input
                  type="text"
                  value={selectedCourt?.title || ''}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price per Slot</label>
                <input
                  type="text"
                  value={`₹${selectedCourt?.price || 0}`}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Select Slots</label>
                <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                  {selectedCourt?.slots?.map((slot, idx) => {
                    const isChecked = bookingData.slots.includes(slot);
                    return (
                      <label key={idx} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={slot}
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBookingData({
                                ...bookingData,
                                slots: [...bookingData.slots, slot],
                              });
                            } else {
                              setBookingData({
                                ...bookingData,
                                slots: bookingData.slots.filter((s) => s !== slot),
                              });
                            }
                          }}
                          className="accent-blue-600"
                        />
                        <span>{slot}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="text-right text-gray-700 font-medium">
                Total Price: ₹{selectedCourt?.price * bookingData.slots.length || 0}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  disabled={bookingMutation.isLoading || bookingData.slots.length === 0}
                >
                  {bookingMutation.isLoading ? 'Booking...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CourtBookingPage;
