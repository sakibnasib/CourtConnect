import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useAuth from '../hook/useAuth';

const CourtBookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [bookingData, setBookingData] = useState({ date: '', slots: [] });
 

  // ✅ Fetch courts from DB
  const { data: courts = [], isLoading } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/courts');
      return res.data;
    },
  });

  // ✅ Submit booking mutation
  const bookingMutation = useMutation({
    mutationFn: async (booking) => {
      const res = await axios.post('http://localhost:3000/bookings', booking);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      setIsModalOpen(false);
      setBookingData({ date: '', slots: [] });
      alert('Booking request sent. Awaiting admin approval.');
    },
  });

  const handleBookNow = (court) => {
    if (!user) {
      navigate('/login');
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
      courtImg:selectedCourt.image,
      courtName: selectedCourt.name,
      pricePerSlot: selectedCourt.price,
      totalPrice: selectedCourt.price * bookingData.slots.length,
      date: bookingData.date,
      slots: bookingData.slots,
      userEmai:user?.email,
      status: 'pending',
    });
  };
 selectedCourt?.price * bookingData.slots.length || 0
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🏟️ Book a Court</h1>

      {isLoading ? (
        <p>Loading courts...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <div key={court._id} className="bg-white rounded shadow p-4">
              <img
                src={court.image}
                alt={court.type}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{court.name}</h2>
              <p>Type: {court.type}</p>
              <p>Price: ₹{court.price} / slot</p>
              <button
                onClick={() => handleBookNow(court)}
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🧾 Booking Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded shadow-lg">
            <Dialog.Title className="text-lg font-bold mb-4">
              Booking Court: {selectedCourt?.name}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Court Type */}
              <div>
                <label className="block text-sm font-medium">Court Type</label>
                <input
                  type="text"
                  value={selectedCourt?.type || ''}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>

              {/* Price Per Slot */}
              <div>
                <label className="block text-sm font-medium">Price per Slot</label>
                <input
                  type="text"
                  value={`₹${selectedCourt?.price || 0}`}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100"
                />
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, date: e.target.value })
                  }
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Slot Checkboxes */}
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

              {/* Total Price */}
              <div className="text-right text-gray-700 font-medium">
              
                Total Price: ₹{ selectedCourt?.price * bookingData.slots.length || 0}
              </div>

              {/* Submit/Cancel */}
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
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={bookingMutation.isLoading}
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
