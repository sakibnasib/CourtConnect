// import {  useMutation, useQueryClient } from '@tanstack/react-query';
// import { useState } from 'react';
// import axios from 'axios';
// import AnnouncementForm from '../../../Component/Modal/From/AnnouncementForm';

// // Base API URL (change this to your actual backend endpoint)
// const BASE_URL = 'https://your-api-url.com/api/announcements';

// export default function AnnouncementList() {
//   const queryClient = useQueryClient();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // ✅ Fetch Announcements
//   const { data: announcements = [], isLoading } = useQuery({
//     queryKey: ['announcements'],
//     queryFn: async () => {
//       const res = await axios.get(BASE_URL);
//       return res.data;
//     },
//   });

//   // ✅ Add Announcement
//   const addMutation = useMutation({
//     mutationFn: async (newAnnouncement) => {
//       const res = await axios.post(BASE_URL, newAnnouncement);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['announcements']);
//     },
//   });

// //   ✅ Update Announcement
//   const updateMutation = useMutation({
//     mutationFn: async ({ id, updatedData }) => {
//       const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['announcements']);
//     },
//   });

// //   ✅ Delete Announcement
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await axios.delete(`${BASE_URL}/${id}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['announcements']);
//     },
//   });

//   // 👇 Handlers
//   const handleAdd = () => {
//     setEditData(null);
//     setModalOpen(true);
//   };

//   const handleEdit = (announcement) => {
//     setEditData(announcement);
//     setModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (confirm('Are you sure you want to delete this announcement?')) {
//       deleteMutation.mutate(id ||1);
//     }
//   };

//   const handleFormSubmit = (formData) => {
//     if (editData) {
//     //   updateMutation.mutate({ id: editData.id, updatedData: formData });
//     } else {
//       addMutation.mutate(formData);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-bold">📣 Announcements</h2>
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           + Add Announcement
//         </button>
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="space-y-4">
//           {announcements.map((a) => (
//             <li
//               key={a.id}
//               className="bg-white p-4 shadow rounded flex justify-between items-start"
//             >
//               <div>
//                 <h3 className="font-semibold text-lg">{a.title}</h3>
//                 <p className="text-sm text-gray-600">{a.message}</p>
//               </div>
//               <div className="space-x-2">
//                 <button
//                   onClick={() => handleEdit(a)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(a?.id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       <AnnouncementForm
//         isOpen={modalOpen}
//         closeModal={() => setModalOpen(false)}
//         onSubmit={handleFormSubmit}
//         initialData={editData}
//       />
//     </div>
//   );
// }



import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

const BASE_URL = 'http://localhost:3000/announcements'; // change as needed

const AnnouncementSection = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '' });
  const [editId, setEditId] = useState(null); // null = create, id = edit

  // ✅ Fetch Announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axios.get(BASE_URL);
      return res.data;
    },
  });

  // ✅ Create
  const addMutation = useMutation({
    mutationFn: async (newAnnouncement) => {
      const res = await axios.post(BASE_URL, newAnnouncement);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      closeModal();
    },
  });

  // ✅ Update
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axios.put(`${BASE_URL}/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements']);
      closeModal();
    },
  });

  // ✅ Delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${BASE_URL}/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(['announcements']),
  });

  const openModal = (announcement = null) => {
    if (announcement) {
      setFormData({ title: announcement.title, message: announcement.message });
      setEditId(announcement._id);
    } else {
      setFormData({ title: '', message: '' });
      setEditId(null);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({ title: '', message: '' });
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    if (editId) {
      updateMutation.mutate({ id: editId, updatedData: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <section className="bg-gray-50 py-8 px-4 rounded shadow mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">📢 Announcements</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li
              key={a._id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{a.title}</h3>
                <p className="text-sm text-gray-700">{a.message}</p>
              </div>
              <div className="space-x-2 mt-1">
                <button
                  onClick={() => openModal(a)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-md w-full p-6 rounded shadow">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {editId ? 'Edit Announcement' : 'Add Announcement'}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <textarea
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={addMutation.isLoading || updateMutation.isLoading}
                >
                  {editId
                    ? updateMutation.isLoading
                      ? 'Updating...'
                      : 'Update'
                    : addMutation.isLoading
                    ? 'Posting...'
                    : 'Post'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
};

export default AnnouncementSection;
