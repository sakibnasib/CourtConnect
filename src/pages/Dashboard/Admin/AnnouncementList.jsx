import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../api/AnnouncementAPI';
import { useState } from 'react';
import AnnouncementForm from '../components/AnnouncementForm';

export default function AnnouncementList() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });

  const addMutation = useMutation({
    mutationFn: addAnnouncement,
    onSuccess: () => queryClient.invalidateQueries(['announcements']),
  });

  const updateMutation = useMutation({
    mutationFn: updateAnnouncement,
    onSuccess: () => queryClient.invalidateQueries(['announcements']),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => queryClient.invalidateQueries(['announcements']),
  });

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (announcement) => {
    setEditData(announcement);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormSubmit = (data) => {
    if (editData) {
      updateMutation.mutate({ id: editData.id, updatedData: data });
    } else {
      addMutation.mutate(data);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">📣 Announcements</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Announcement
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((a) => (
            <li
              key={a.id}
              className="bg-white p-4 shadow rounded flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.message}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AnnouncementForm
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editData}
      />
    </div>
  );
}
