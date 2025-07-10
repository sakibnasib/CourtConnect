import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const ManageCoupons = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ code: '', discount: '', expiry: '' });
  const [editCoupon, setEditCoupon] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/coupons');
      return res.data;
    },
  });

  // Create coupon
  const createMutation = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axios.post('http://localhost:3000/coupons', newCoupon);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      setFormData({ code: '', discount: '', expiry: '' });
    },
  });

  // Update coupon
  const updateMutation = useMutation({
    mutationFn: async (updatedCoupon) => {
      const res = await axios.patch(
        `http://localhost:3000/coupons/${editCoupon._id}`,
        updatedCoupon
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['coupons']);
      setIsEditModalOpen(false);
      setEditCoupon(null);
    },
  });

  // Delete coupon
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`http://localhost:3000/coupons/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(['coupons']),
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discount || !formData.expiry) return;
    createMutation.mutate(formData);
  };

  const handleEditOpen = (coupon) => {
    setEditCoupon(coupon);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(editCoupon);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎟️ Manage Coupons</h1>

      {/* Create Coupon Form */}
      <form onSubmit={handleCreateSubmit} className="bg-white shadow rounded p-4 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="date"
            value={formData.expiry}
            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
            className="border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {createMutation.isLoading ? 'Creating...' : 'Create Coupon'}
        </button>
      </form>

      {/* Coupons Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">📋 Existing Coupons</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border mt-2 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 text-left">Code</th>
                <th className="border px-3 py-2">Discount</th>
                <th className="border px-3 py-2">Expiry</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td className="border px-3 py-2">{coupon.code}</td>
                  <td className="border px-3 py-2 text-center">{coupon.discount}%</td>
                  <td className="border px-3 py-2 text-center">
                    {new Date(coupon.expiry).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEditOpen(coupon)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(coupon._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded shadow">
            <Dialog.Title className="text-lg font-semibold mb-4">Edit Coupon</Dialog.Title>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                value={editCoupon?.code || ''}
                onChange={(e) =>
                  setEditCoupon({ ...editCoupon, code: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Coupon Code"
              />
              <input
                type="number"
                value={editCoupon?.discount || ''}
                onChange={(e) =>
                  setEditCoupon({ ...editCoupon, discount: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Discount (%)"
              />
              <input
                type="date"
                value={editCoupon?.expiry?.slice(0, 10) || ''}
                onChange={(e) =>
                  setEditCoupon({ ...editCoupon, expiry: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageCoupons;
