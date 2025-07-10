// src/components/AnnouncementForm.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

export default function AnnouncementForm({ isOpen, closeModal, onSubmit, initialData = {} }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTitle(initialData.title || '');
    setMessage(initialData.message || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, message });
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                {initialData.id ? 'Edit Announcement' : 'Add New Announcement'}
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                  className="w-full border rounded p-2"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="w-full border rounded p-2"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={closeModal} className="text-gray-500">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {initialData.id ? 'Update' : 'Post'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
