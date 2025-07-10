// // import React, { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// // import Swal from "sweetalert2";
// // import { imageUpLoad } from "../../../api/utils";
// // import axios from "axios";

// // // Define your available slots somewhere
// // const slotOptions = ["9AM-10AM", "10AM-11AM", "11AM-12PM", "12PM-1PM"];

// // const ManageCourts = () => {
// //   const [editingCourt, setEditingCourt] = useState(null);
// //   const [showForm, setShowForm] = useState(false);

// //   const { register, handleSubmit, reset, formState: { errors } } = useForm();
// //   const queryClient = useQueryClient();

// //   // Fetch courts (replace with your axiosSecure.get or API call)
// //   const { data: courts = [], isLoading, error } = useQuery({
// //     queryKey: ["courts"],
// //     queryFn: async () => {
// //       // Replace with your actual API call
// //       const res = await axios("http://localhost:3000/courts");
// //       return res.data;
       
// //     },
// //   });

// //   // Add court mutation
// //   const addCourtMutation = useMutation({
// //     mutationFn: (data) => axios.post("http://localhost:3000/courts", data),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries(["courts"]);
// //       Swal.fire("Success", "Court added!", "success");
// //       reset();
// //       setShowForm(false);
// //     },
// //     onError: () => Swal.fire("Error", "Failed to add court.", "error"),
// //   });

// //   // Update court mutation
// //   const updateCourtMutation = useMutation({
// //     // mutationFn: ({ id, ...data }) => axiosSecure.put(`/courts/${id}`, data),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries(["courts"]);
// //       Swal.fire("Updated", "Court updated!", "success");
// //       setEditingCourt(null);
// //       reset();
// //       setShowForm(false);
// //     },
// //     onError: () => Swal.fire("Error", "Failed to update court.", "error"),
// //   });

// //   // Delete court mutation
// //   const deleteCourtMutation = useMutation({
// //     // mutationFn: (id) => axiosSecure.delete(`/courts/${id}`),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries(["courts"]);
// //       Swal.fire("Deleted", "Court deleted!", "info");
// //     },
// //     onError: () => Swal.fire("Error", "Failed to delete court.", "error"),
// //   });

// //   const onSubmit = async (data) => {
// //     try {
// //       let imageUrl = editingCourt?.image || "";

// //       if (data.imageFile && data.imageFile.length > 0) {
// //         imageUrl = await imageUpLoad(data.imageFile[0]);
// //       }

// //       const courtData = {
// //         name: data.name,
// //         type: data.type,
// //         price: parseFloat(data.price),
// //         image: imageUrl,
// //         slots: Object.entries(data.slots || {})
// //           // .filter(([_, value]) => value)
// //           .map(([key]) => key),
// //       };

// //       if (editingCourt) {
// //         updateCourtMutation.mutate({ ...courtData, id: editingCourt._id });
// //       } else {
// //         addCourtMutation.mutate(courtData);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       Swal.fire("Error", "Image upload failed!", "error");
// //     }
// //   };

// //   // const handleEdit = (court) => {
// //   //   setEditingCourt(court);
// //   //   reset({
// //   //     ...court,
// //   //     slots: slotOptions.reduce((acc, slot) => {
// //   //       acc[slot] = court.slots?.includes(slot) || false;
// //   //       return acc;
// //   //     }, {}),
// //   //   });
// //   //   setShowForm(true);
// //   // };

// //   const handleEdit = (court) => {
// //   setEditingCourt(court);
// //   setIsModalOpen(true);
// // };

// //   const cancelForm = () => {
// //     setEditingCourt(null);
// //     reset();
// //     setShowForm(false);
// //   };

// //   if (error) return <div className="text-red-500">Failed to load courts.</div>;

// //   return (
// //     <div className=" mx-auto p-6 bg-white rounded shadow">
// //       <h2 className="text-3xl font-bold mb-6">Manage Courts</h2>

// //       {/* Add/Edit Court Form */}
// //       {showForm && (
// //         <form onSubmit={handleSubmit(onSubmit)} className="mb-8 p-6 border rounded shadow-sm">
// //           <div className="grid gap-4 md:grid-cols-2">
// //             <div>
// //               <input
// //                 {...register("name", { required: "Court Name is required" })}
// //                 placeholder="Court Name"
// //                 className={`input input-bordered w-full ${errors.name ? "border-red-500" : ""}`}
// //                 aria-invalid={errors.name ? "true" : "false"}
// //               />
// //               {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
// //             </div>

// //             <div>
// //               <select
// //                 {...register("type", { required: "Court Type is required" })}
// //                 className={`select select-bordered w-full ${errors.type ? "border-red-500" : ""}`}
// //                 aria-invalid={errors.type ? "true" : "false"}
// //               >
// //                 <option value="">Select Type</option>
// //                 <option value="tennis">Tennis</option>
// //                 <option value="badminton">Badminton</option>
// //                 <option value="squash">Squash</option>
// //               </select>
// //               {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>}
// //             </div>

// //             <div>
// //               <input
// //                 type="number"
// //                 {...register("price", {
// //                   required: "Price is required",
// //                   min: { value: 0, message: "Price cannot be negative" },
// //                 })}
// //                 placeholder="Price (৳)"
// //                 className={`input input-bordered w-full ${errors.price ? "border-red-500" : ""}`}
// //                 aria-invalid={errors.price ? "true" : "false"}
// //               />
// //               {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
// //             </div>

// //             <div>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 {...register("imageFile")}
// //                 className="file-input file-input-bordered w-full"
// //               />
// //             </div>
// //           </div>

// //           <fieldset className="mt-6">
// //             <legend className="font-semibold mb-2">Available Slots</legend>
// //             <div className="flex flex-wrap gap-4">
// //               {slotOptions.map((slot) => (
// //                 <label key={slot} className="flex items-center gap-2 cursor-pointer select-none">
// //                   <input
// //                     type="checkbox"
// //                     {...register(`slots.${slot}`)}
// //                     className="checkbox checkbox-primary"
// //                   />
// //                   {slot}
// //                 </label>
// //               ))}
// //             </div>
// //           </fieldset>

// //           <div className="mt-6 flex gap-4">
// //             <button
// //               type="submit"
// //               disabled={addCourtMutation.isLoading || updateCourtMutation.isLoading}
// //               className="btn btn-primary"
// //             >
// //               {editingCourt ? (updateCourtMutation.isLoading ? "Updating..." : "Update Court") : (addCourtMutation.isLoading ? "Adding..." : "Add Court")}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={cancelForm}
// //               disabled={addCourtMutation.isLoading || updateCourtMutation.isLoading}
// //               className="btn btn-ghost"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       )}

// //       {/* Show add new button only if form is hidden */}
// //       {!showForm && (
// //         <button
// //           className="btn btn-primary mb-6"
// //           onClick={() => setShowForm(true)}
// //           disabled={addCourtMutation.isLoading || updateCourtMutation.isLoading}
// //         >
// //           Add New Court
// //         </button>
// //       )}

// //       {/* Courts Table */}
// //       {isLoading ? (
// //         <div>Loading courts...</div>
// //       ) : (
// //         <div className="overflow-x-auto bg-white rounded shadow">
// //           <table className="table w-full">
// //             <thead>
// //               <tr>
// //                 <th>Image</th>
// //                 <th>Name</th>
// //                 <th>Type</th>
// //                 <th>Price (৳)</th>
// //                 <th className="text-end">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {courts.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="5" className="text-center py-6 text-gray-500">
// //                     No courts found.
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 courts.map((court) => (
// //                   <tr key={court._id}>
// //                     <td>
// //                       <img
// //                         src={court.image}
// //                         alt={`${court.name} court`}
// //                         className="w-20 h-14 object-cover rounded"
// //                       />
// //                     </td>
// //                     <td>{court.name}</td>
// //                     <td className="capitalize">{court.type}</td>
// //                     <td>{court.price.toFixed(2)}</td>
// //                     <td className="flex justify-end gap-2">
// //                      <button
// //   onClick={() => handleEdit(court)}
// //   className="btn btn-sm btn-info"
// // >
// //   Edit
// // </button>
// //                       <button
// //                         onClick={() =>
// //                           Swal.fire({
// //                             title: "Are you sure?",
// //                             text: "This will delete the court.",
// //                             icon: "warning",
// //                             showCancelButton: true,
// //                             confirmButtonText: "Yes, delete it!",
// //                           }).then((res) => {
// //                             if (res.isConfirmed) {
// //                               deleteCourtMutation.mutate(court._id);
// //                             }
// //                           })
// //                         }
// //                         disabled={deleteCourtMutation.isLoading}
// //                         className="btn btn-sm btn-error"
// //                       >
// //                         {deleteCourtMutation.isLoading ? "Deleting..." : "Delete"}
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ManageCourts;





// // //  <CourtModal
// // //         isOpen={isModalOpen}
// // //         onClose={closeModal}
// // //         court={editingCourt}
// // //         onSubmit={onUpdate}
// // //         register={register}
// // //         handleSubmit={handleSubmit}
// // //         errors={errors}
// // //         slotOptions={slotOptions}
// // //       />




// import React, { useState, Fragment } from "react";
// import { useForm } from "react-hook-form";
// import { Dialog, Transition } from "@headlessui/react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import axios from "axios";
// import CourtModal from "../../../Component/Modal/CourtModal"; // Adjust this path to your actual CourtModal location
// import { imageUpLoad } from "../../../api/utils"; // Your image upload helper

// const slotOptions = ["9AM-10AM", "10AM-11AM", "11AM-12PM", "12PM-1PM"];

// const ManageCourts = () => {
//   const [editingCourt, setEditingCourt] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Fetch courts
//   const { data: courts = [], isLoading, error } = useQuery({
//     queryKey: ["courts"],
//     queryFn: async () => {
//       const res = await axios("http://localhost:3000/courts");
//       return res.data;
//     },
//   });
//   console.log(courts)

//   // Add court mutation
//   const addCourtMutation = useMutation({
//     mutationFn: (data) => axios.post("http://localhost:3000/courts", data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["courts"]);
//       Swal.fire("Success", "Court added!", "success");
//       reset();
//     },
//     onError: () => Swal.fire("Error", "Failed to add court.", "error"),
//   });

//   // Update court mutation
//   const updateCourtMutation = useMutation({
//     mutationFn: ({ id, ...data }) => axios.put(`http://localhost:3000/courts/${id}`, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["courts"]);
//       Swal.fire("Updated", "Court updated!", "success");
//       closeModal();
//     },
//     onError: () => Swal.fire("Error", "Failed to update court.", "error"),
//   });

//   // Delete court mutation
//   const deleteCourtMutation = useMutation({
//     mutationFn: (id) => axios.delete(`http://localhost:3000/courts/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["courts"]);
//       Swal.fire("Deleted", "Court deleted!", "info");
//     },
//     onError: () => Swal.fire("Error", "Failed to delete court.", "error"),
//   });

//   // Add court submit handler
//   const onSubmit = async (data) => {
//     try {
//       let imageUrl = "";
//       if (data.imageFile && data.imageFile.length > 0) {
//         imageUrl = await imageUpLoad(data.imageFile[0]);
//       }

//       const courtData = {
//         name: data.name,
//         type: data.type,
//         price: parseFloat(data.price),
//         image: imageUrl,
//         slots: Object.entries(data.slots || {})
//           .filter(([k, v]) => v)
//           .map(([k]) => k),
//       };

//       addCourtMutation.mutate(courtData);
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Image upload failed!", "error");
//     }
//   };

//   // Update court submit handler (used inside CourtModal)
//   const onUpdate = async (data) => {
//     try {
//       let imageUrl = editingCourt?.image || "";

//       if (data.imageFile && data.imageFile.length > 0) {
//         imageUrl = await imageUpLoad(data.imageFile[0]);
//       }

//       const updatedData = {
//         name: data.name,
//         type: data.type,
//         price: parseFloat(data.price),
//         image: imageUrl,
//         slots: Object.entries(data.slots || {})
//           .filter(([k, v]) => v)
//           .map(([k]) => k),
//       };

//       updateCourtMutation.mutate({ id: editingCourt._id, ...updatedData });
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Image upload failed!", "error");
//     }
//   };

//   // Open edit modal and populate form
//   const handleEdit = (court) => {
//     setEditingCourt(court);
//     reset({
//       ...court,
//       slots: slotOptions.reduce((acc, slot) => {
//         acc[slot] = court.slots?.includes(slot);
//         return acc;
//       }, {}),
//     });
//     setIsModalOpen(true);
//   };

//   // Close modal and reset form state
//   const closeModal = () => {
//     setEditingCourt(null);
//     reset();
//     setIsModalOpen(false);
//   };

//   if (error)
//     return <div className="text-red-500">Failed to load courts. Try refreshing.</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow space-y-10">
//       <h2 className="text-3xl font-bold">Add New Court</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <input
//           {...register("name", { required: "Court name is required" })}
//           placeholder="Court Name"
//           className="input input-bordered w-full"
//         />
//         {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

//         <select
//           {...register("type", { required: "Court type is required" })}
//           className="select select-bordered w-full"
//         >
//           <option value="">Select Type</option>
//           <option value="tennis">Tennis</option>
//           <option value="badminton">Badminton</option>
//           <option value="squash">Squash</option>
//         </select>
//         {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}

//         <input
//           type="number"
//           {...register("price", { required: "Price is required", min: 0 })}
//           placeholder="Price (৳)"
//           className="input input-bordered w-full"
//         />
//         {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}

//         <input
//           type="file"
//           accept="image/*"
//           {...register("imageFile")}
//           className="file-input file-input-bordered w-full"
//         />

//         <fieldset>
//           <legend className="font-semibold mb-2">Available Slots</legend>
//           <div className="flex flex-wrap gap-3">
//             {slotOptions.map((slot) => (
//               <label key={slot} className="flex items-center gap-2">
//                 <input type="checkbox" {...register(`slots.${slot}`)} className="checkbox" />
//                 <span>{slot}</span>
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         <button
//           type="submit"
//           className="btn btn-primary mt-4"
//           disabled={addCourtMutation.isLoading}
//         >
//           {addCourtMutation.isLoading ? "Adding..." : "Add Court"}
//         </button>

//       </form>

//       {/* Courts List */}
//       <div className="overflow-x-auto bg-white rounded shadow p-4">
//         <h2 className="text-2xl font-bold mb-4">Courts</h2>
//         {isLoading ? (
//           <p>Loading courts...</p>
//         ) : courts.length === 0 ? (
//           <p className="text-gray-500">No courts found.</p>
//         ) : (
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th className="text-end">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courts.map((court) => (
//                <tr key={court._id}>
//                   <td>
//                     <img
//                       src={court.image}
//                       alt={court.name}
//                       className="w-20 h-14 object-cover rounded"
//                     />
//                   </td>
//                   <td>{court.name}</td>
//                   <td>{court.type}</td>
//                   <td>{court.price}</td>
//                   <td className="flex justify-end gap-2">
//                     <button
//                       onClick={() => handleEdit(court)}
//                       className="btn btn-sm btn-info"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteCourtMutation.mutate(court._id)}
//                       className="btn btn-sm btn-error"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Edit Court Modal */}
//     <CourtModal
//   isOpen={isModalOpen}
//   onClose={closeModal}
//   court={editingCourt}
//   onSubmit={onUpdate}               // just the callback
//   handleSubmit={handleSubmit}       // pass handleSubmit function itself
//   register={register}
//   errors={errors}
//   slotOptions={slotOptions}
// />
//     </div>
//   );
// };

// export default ManageCourts;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import CourtModal from "../../../Component/Modal/CourtModal";
import { imageUpload } from "../../../api/utils";


const slotOptions = [ '6:00 AM - 7:00 AM',
                    '7:00 AM - 8:00 AM',
                    '8:00 AM - 9:00 AM',
                    '5:00 PM - 6:00 PM',
                    '6:00 PM - 7:00 PM',];

const ManageCourts = () => {
  const [editingCourt, setEditingCourt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Add form only
  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm();

  const { data: courts = [], isLoading, error } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axios("http://localhost:3000/courts");
      return res.data;
    },
  });

  const addCourtMutation = useMutation({
    mutationFn: (data) => axios.post("http://localhost:3000/courts", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["courts"]);
      Swal.fire("Success", "Court added!", "success");
      resetAddForm();
    },
    onError: () => Swal.fire("Error", "Failed to add court.", "error"),
  });

  const deleteCourtMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/courts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["courts"]);
      Swal.fire("Deleted", "Court deleted!", "info");
    },
    onError: () => Swal.fire("Error", "Failed to delete court.", "error"),
  });

  const onAddSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (data.imageFile && data.imageFile.length > 0) {
        imageUrl = await imageUpload(data.imageFile[0]);
      }

      const courtData = {
        name: data.name,
        type: data.type,
        price: parseFloat(data.price),
        image: imageUrl,
        slots: Object.entries(data.slots || {})
          .filter(([_, v]) => v)
          .map(([k]) => k),
      };

      addCourtMutation.mutate(courtData);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Image upload failed!", "error");
    }
  };

  const handleEdit = (court) => {
    setEditingCourt(court);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourt(null);
  };

  if (error) return <div className="text-red-500">Failed to load courts.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow space-y-10">
      <h2 className="text-3xl font-bold">Add New Court</h2>

      <form onSubmit={handleAddSubmit(onAddSubmit)} className="space-y-4">
        <input {...addRegister("name", { required: "Name is required" })} placeholder="Court Name" className="input input-bordered w-full" />
        {addErrors.name && <p className="text-sm text-red-500">{addErrors.name.message}</p>}

        <select {...addRegister("type", { required: "Type is required" })} className="select select-bordered w-full">
          <option value="">Select Type</option>
          <option value="tennis">Tennis</option>
          <option value="badminton">Badminton</option>
          <option value="squash">Squash</option>
        </select>
        {addErrors.type && <p className="text-sm text-red-500">{addErrors.type.message}</p>}

        <input type="number" {...addRegister("price", { required: "Price is required" })} placeholder="Price" className="input input-bordered w-full" />
        {addErrors.price && <p className="text-sm text-red-500">{addErrors.price.message}</p>}

        <input type="file" {...addRegister("imageFile")} accept="image/*" className="file-input file-input-bordered w-full" />

        <fieldset>
          <legend className="font-semibold mb-2">Available Slots</legend>
          <div className="flex flex-wrap gap-3">
            {slotOptions.map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input type="checkbox" {...addRegister(`slots.${slot}`)} className="checkbox" />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary" disabled={addCourtMutation.isLoading}>
          {addCourtMutation.isLoading ? "Adding..." : "Add Court"}
        </button>
      </form>

      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <h2 className="text-2xl font-bold mb-4">Courts</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : courts.length === 0 ? (
          <p>No courts found.</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court._id}>
                  <td>
                    <img src={court.image} alt={court.name} className="w-20 h-14 object-cover rounded" />
                  </td>
                  <td>{court.name}</td>
                  <td>{court.type}</td>
                  <td>{court.price}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleEdit(court)} className="btn btn-sm btn-info">Edit</button>
                    <button onClick={() => deleteCourtMutation.mutate(court._id)} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      <CourtModal
        isOpen={isModalOpen}
        onClose={closeModal}
        court={editingCourt}
        refetch={() => queryClient.invalidateQueries(["courts"])}
      />
    </div>
  );
};

export default ManageCourts;

