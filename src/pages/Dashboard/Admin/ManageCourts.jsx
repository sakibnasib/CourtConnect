// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import axios from "axios";
// import CourtModal from "../../../Component/Modal/CourtModal";
// import { imageUpload } from "../../../api/utils";


// const slotOptions = [ '6:00 AM - 7:00 AM',
//                     '7:00 AM - 8:00 AM',
//                     '8:00 AM - 9:00 AM',
//                     '5:00 PM - 6:00 PM',
//                     '6:00 PM - 7:00 PM',];

// const ManageCourts = () => {
//   const [editingCourt, setEditingCourt] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const queryClient = useQueryClient();

//   // Add form only
//   const {
//     register: addRegister,
//     handleSubmit: handleAddSubmit,
//     reset: resetAddForm,
//     formState: { errors: addErrors },
//   } = useForm();

//   const { data: courts = [], isLoading, error } = useQuery({
//     queryKey: ["courts"],
//     queryFn: async () => {
//       const res = await axios("http://localhost:3000/courts");
//       return res.data;
//     },
//   });

//   const addCourtMutation = useMutation({
//     mutationFn: (data) => axios.post("http://localhost:3000/courts", data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["courts"]);
//       Swal.fire("Success", "Court added!", "success");
//       resetAddForm();
//     },
//     onError: () => Swal.fire("Error", "Failed to add court.", "error"),
//   });

//   const deleteCourtMutation = useMutation({
//     mutationFn: (id) => axios.delete(`http://localhost:3000/courts/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["courts"]);
//       Swal.fire("Deleted", "Court deleted!", "info");
//     },
//     onError: () => Swal.fire("Error", "Failed to delete court.", "error"),
//   });

//   const onAddSubmit = async (data) => {
//     try {
//       let imageUrl = "";
//       if (data.imageFile && data.imageFile.length > 0) {
//         imageUrl = await imageUpload(data.imageFile[0]);
//       }

//       const courtData = {
//         name: data.name,
//         type: data.type,
//         price: parseFloat(data.price),
//         image: imageUrl,
//         slots: Object.entries(data.slots || {})
//           .filter(([_, v]) => v)
//           .map(([k]) => k),
//       };

//       addCourtMutation.mutate(courtData);
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Image upload failed!", "error");
//     }
//   };

//   const handleEdit = (court) => {
//     setEditingCourt(court);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingCourt(null);
//   };

//   if (error) return <div className="text-red-500">Failed to load courts.</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow space-y-10">
//       <h2 className="text-3xl font-bold">Add New Court</h2>

//       <form onSubmit={handleAddSubmit(onAddSubmit)} className="space-y-4">
//         <input {...addRegister("name", { required: "Name is required" })} placeholder="Court Name" className="input input-bordered w-full" />
//         {addErrors.name && <p className="text-sm text-red-500">{addErrors.name.message}</p>}

//         <select {...addRegister("type", { required: "Type is required" })} className="select select-bordered w-full">
//           <option value="">Select Type</option>
//           <option value="tennis">Tennis</option>
//           <option value="badminton">Badminton</option>
//           <option value="squash">Squash</option>
//         </select>
//         {addErrors.type && <p className="text-sm text-red-500">{addErrors.type.message}</p>}

//         <input type="number" {...addRegister("price", { required: "Price is required" })} placeholder="Price" className="input input-bordered w-full" />
//         {addErrors.price && <p className="text-sm text-red-500">{addErrors.price.message}</p>}

//         <input type="file" {...addRegister("imageFile")} accept="image/*" className="file-input file-input-bordered w-full" />

//         <fieldset>
//           <legend className="font-semibold mb-2">Available Slots</legend>
//           <div className="flex flex-wrap gap-3">
//             {slotOptions.map((slot) => (
//               <label key={slot} className="flex items-center gap-2">
//                 <input type="checkbox" {...addRegister(`slots.${slot}`)} className="checkbox" />
//                 <span>{slot}</span>
//               </label>
//             ))}
//           </div>
//         </fieldset>

//         <button type="submit" className="btn btn-primary" disabled={addCourtMutation.isLoading}>
//           {addCourtMutation.isLoading ? "Adding..." : "Add Court"}
//         </button>
//       </form>

//       <div className="overflow-x-auto bg-white rounded shadow p-4">
//         <h2 className="text-2xl font-bold mb-4">Courts</h2>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : courts.length === 0 ? (
//           <p>No courts found.</p>
//         ) : (
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courts.map((court) => (
//                 <tr key={court._id}>
//                   <td>
//                     <img src={court.image} alt={court.name} className="w-20 h-14 object-cover rounded" />
//                   </td>
//                   <td>{court.name}</td>
//                   <td>{court.type}</td>
//                   <td>{court.price}</td>
//                   <td className="flex gap-2">
//                     <button onClick={() => handleEdit(court)} className="btn btn-sm btn-info">Edit</button>
//                     <button onClick={() => deleteCourtMutation.mutate(court._id)} className="btn btn-sm btn-error">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Edit Modal */}
//       <CourtModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         court={editingCourt}
//         refetch={() => queryClient.invalidateQueries(["courts"])}
//       />
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

const slotOptions = [
  "6:00 AM - 7:00 AM",
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
];

const ManageCourts = () => {
  const [editingCourt, setEditingCourt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

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
    <div className=" w-12/12 overflow-x-auto mx-auto p-4 sm:p-6 bg-white rounded shadow space-y-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Add New Court</h2>

      <form onSubmit={handleAddSubmit(onAddSubmit)} className="space-y-4">
        <input
          {...addRegister("name", { required: "Name is required" })}
          placeholder="Court Name"
          className="input input-bordered w-full"
        />
        {addErrors.name && <p className="text-sm text-red-500">{addErrors.name.message}</p>}

        <select {...addRegister("type", { required: "Type is required" })} className="select select-bordered w-full">
          <option value="">Select Type</option>
          <option value="tennis">Tennis</option>
          <option value="badminton">Badminton</option>
          <option value="squash">Squash</option>
        </select>
        {addErrors.type && <p className="text-sm text-red-500">{addErrors.type.message}</p>}

        <input
          type="number"
          {...addRegister("price", { required: "Price is required" })}
          placeholder="Price"
          className="input input-bordered w-full"
        />
        {addErrors.price && <p className="text-sm text-red-500">{addErrors.price.message}</p>}

        <input
          type="file"
          {...addRegister("imageFile")}
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />

        <fieldset>
          <legend className="font-semibold mb-2">Available Slots</legend>
          <div className="flex flex-wrap gap-3">
            {slotOptions.map((slot) => (
              <label key={slot} className="flex items-center gap-2">
                <input type="checkbox" {...addRegister(`slots.${slot}`)} className="checkbox" />
                <span className="text-sm">{slot}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={addCourtMutation.isLoading}>
          {addCourtMutation.isLoading ? "Adding..." : "Add Court"}
        </button>
      </form>

      <div className=" bg-white rounded shadow p-4">
        <h2 className="text-2xl font-bold mb-4">Courts</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : courts.length === 0 ? (
          <p>No courts found.</p>
        ) : (
          <table className="table w-full text-sm sm:text-base overflow-x-auto">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court._id}>
                  <td>
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{court.name}</td>
                  <td>{court.type}</td>
                  <td>${court.price}</td>
                  <td className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(court)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCourtMutation.mutate(court._id)}
                      className="btn btn-sm btn-error"
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
