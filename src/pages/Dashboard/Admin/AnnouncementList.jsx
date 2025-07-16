import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hook/useAxiosSecure'
import Loader from '../../../Component/Loader/Loader'

const AnnouncementSection = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ title: '', message: '' })
  const [editId, setEditId] = useState(null)
  const axiosSecure = useAxiosSecure()

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/announcements')
      return data
    },
  })

  const addMutation = useMutation({
    mutationFn: async (newAnnouncement) => {
      const res = await axiosSecure.post('/announcements', newAnnouncement)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements'])
      closeModal()
      Swal.fire('Success', 'Announcement added!', 'success')
    },
    onError: () => {
      Swal.fire('Error', 'Failed to add announcement.', 'error')
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axiosSecure.put(`/announcements/${id}`, updatedData)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements'])
      closeModal()
      Swal.fire('Updated', 'Announcement updated!', 'success')
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update announcement.', 'error')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/announcements/${id}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['announcements'])
      Swal.fire('Deleted', 'Announcement deleted.', 'success')
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete announcement.', 'error')
    },
  })

  const openModal = (announcement = null) => {
    if (announcement) {
      setFormData({ title: announcement.title, message: announcement.message })
      setEditId(announcement._id)
    } else {
      setFormData({ title: '', message: '' })
      setEditId(null)
    }
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setFormData({ title: '', message: '' })
    setEditId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.message) return
    if (editId) {
      updateMutation.mutate({ id: editId, updatedData: formData })
    } else {
      addMutation.mutate(formData)
    }
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the announcement permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id)
      }
    })
  }

  return (
    <section className="bg-white rounded-xl p-6 shadow-md max-w-3xl mx-auto mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-800">📢 Announcements</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      {isLoading ? (
        <Loader/>
      ) : announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <ul className="space-y-4 divide-y divide-gray-100">
          {announcements.map((a) => (
            <li key={a._id} className="pt-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{a.message}</p>
                </div>
                <div className="flex gap-2 text-sm text-right">
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
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-md w-full p-6 rounded shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {editId ? 'Edit Announcement' : 'Add Announcement'}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
  )
}

export default AnnouncementSection
