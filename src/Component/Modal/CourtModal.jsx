// import { Dialog, Transition } from '@headlessui/react';
// import { Fragment } from 'react';

// const CourtModal = ({
//   isOpen,
//   onClose,
//   court,
//   onSubmit,
//   register,
//   handleSubmit,
//   errors,
//   slotOptions,
// }) => {
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-50" onClose={onClose}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           leave="ease-in duration-200"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               leave="ease-in duration-200"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
//                 <Dialog.Title className="text-xl font-semibold mb-4">
//                   {court ? 'Edit Court' : 'Add Court'}
//                 </Dialog.Title>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                   <input
//                     {...register('name', { required: 'Court name is required' })}
//                     placeholder="Court Name"
//                     className="input input-bordered w-full"
//                   />
//                   {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

//                   <select
//                     {...register('type', { required: 'Court type is required' })}
//                     className="select select-bordered w-full"
//                   >
//                     <option value="">Select Type</option>
//                     <option value="tennis">Tennis</option>
//                     <option value="badminton">Badminton</option>
//                     <option value="squash">Squash</option>
//                   </select>
//                   {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}

//                   <input
//                     type="number"
//                     {...register('price', {
//                       required: 'Price is required',
//                       min: { value: 0, message: 'Price must be positive' },
//                     })}
//                     placeholder="Price (৳)"
//                     className="input input-bordered w-full"
//                   />
//                   {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}

//                   <input
//                     type="file"
//                     accept="image/*"
//                     {...register('imageFile')}
//                     className="file-input file-input-bordered w-full"
//                   />

//                   <fieldset className="mt-4">
//                     <legend className="font-semibold mb-2">Available Slots</legend>
//                     <div className="flex flex-wrap gap-3">
//                       {slotOptions.map((slot) => (
//                         <label key={slot} className="flex items-center gap-2">
//                           <input type="checkbox" {...register(`slots.${slot}`)} className="checkbox" />
//                           <span>{slot}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>

//                   <div className="mt-6 flex justify-end gap-3">
//                     <button type="submit" className="btn btn-primary">
//                       {court ? 'Update' : 'Add'}
//                     </button>
//                     <button type="button" className="btn btn-ghost" onClick={onClose}>
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default CourtModal;


import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const slotOptions = ["9AM-10AM", "10AM-11AM", "11AM-12PM", "12PM-1PM"];

const CourtModal = ({ isOpen, onClose, court, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (court) {
      reset({
        name: court.name,
        type: court.type,
        price: court.price,
        slots: slotOptions.reduce((acc, slot) => {
          acc[slot] = court.slots?.includes(slot);
          return acc;
        }, {}),
      });
    }
  }, [court, reset]);

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => axios.put(`http://localhost:3000/courts/${id}`, data),
    onSuccess: () => {
      Swal.fire("Updated", "Court updated successfully", "success");
      onClose();
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Update failed", "error");
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = court.image;

    if (data.imageFile?.length > 0) {
      imageUrl = await imageUpload(data.imageFile[0]);
    }

    const updated = {
      name: data.name,
      type: data.type,
      price: parseFloat(data.price),
      image: imageUrl,
      slots: Object.entries(data.slots || {})
        .filter(([_, v]) => v)
        .map(([k]) => k),
    };

    updateMutation.mutate({ id: court._id, ...updated });
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">Edit Court</Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register("name", { required: true })} className="input input-bordered w-full" />
              <select {...register("type", { required: true })} className="select select-bordered w-full">
                <option value="">Select Type</option>
                <option value="tennis">Tennis</option>
                <option value="badminton">Badminton</option>
                <option value="squash">Squash</option>
              </select>
              <input type="number" {...register("price", { required: true })} className="input input-bordered w-full" />
              <input type="file" {...register("imageFile")} className="file-input file-input-bordered w-full" />

              <fieldset>
                <legend className="font-semibold mb-2">Available Slots</legend>
                <div className="flex flex-wrap gap-3">
                  {slotOptions.map((slot) => (
                    <label key={slot} className="flex items-center gap-2">
                      <input type="checkbox" {...register(`slots.${slot}`)} className="checkbox" />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex justify-end gap-4">
                <button type="button" onClick={onClose} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Court
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CourtModal;
