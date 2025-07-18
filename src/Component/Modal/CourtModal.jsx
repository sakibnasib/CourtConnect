import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import { useMutation } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hook/useAxiosSecure";

const slotOptions = ['6:00 AM - 7:00 AM',
                    '7:00 AM - 8:00 AM',
                    '8:00 AM - 9:00 AM',
                    '5:00 PM - 6:00 PM',
                    '6:00 PM - 7:00 PM',];

const CourtModal = ({ isOpen, onClose, court, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
   const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (court) {
      reset({
        name: court.title,
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
    mutationFn: ({ id, ...data }) => axiosSecure.put(`/courts/${id}`, data),
    onSuccess: () => {
      Swal.fire("Updated", "Court updated successfully", "success");
      onClose();
      refetch();
      console.log('ryhrdfhydftgh')
    },
    onError: () => {
      Swal.fire("Error", "Update failed", "error");
       console.log('wrewr')
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = court.image;

    if (data.imageFile?.length > 0) {
      imageUrl = await imageUpload(data.imageFile[0]);
    }

    const updated = {
      title: data.title,
      type: data.type,
      price: parseFloat(data.price),
      image: imageUrl,
      slots: Object.entries(data.slots || {})
        .filter(([ _, v]) => v)
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
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-lg bg-white p-6 rounded shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4">Edit Court</Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register("title", { required: true })} className="input input-bordered w-full" />
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
