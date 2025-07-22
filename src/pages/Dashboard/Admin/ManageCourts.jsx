import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import CourtModal from "../../../Component/Modal/CourtModal";
import { imageUpload } from "../../../api/utils";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loader from "../../../Component/Loader/Loader";


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
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    register: addRegister,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm();

  const { data  , isLoading, error } = useQuery({
    queryKey: ["courts", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/courts?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    
  });
  const courts = data?.courts || [];

  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);
console.log(courts)
  const addCourtMutation = useMutation({
    mutationFn: (data) => axiosSecure.post("/courts", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["courts"]);
      Swal.fire("Success", "Court added!", "success");
      resetAddForm();
    },
    onError: () => Swal.fire("Error", "Failed to add court.", "error"),
  });

  const deleteCourtMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/courts/${id}`),
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
        title: data.title,
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
    <>
      <div className="w-full mx-auto p-4 sm:p-6 bg-white rounded shadow space-y-10">
        <h2 className="text-3xl sm:text-3xl font-bold text-center text-blue-800">Add New Court</h2>

        <form onSubmit={handleAddSubmit(onAddSubmit)} className="space-y-4">
          <input
            {...addRegister("title", { required: "title is required" })}
            placeholder="Court title"
            className="input input-bordered w-full"
          />
          {addErrors.name && <p className="text-sm text-red-500">{addErrors.name.message}</p>}

          <select {...addRegister("type", { required: "Type is required" })} className="select select-bordered w-full">
            <option value="">Select Type</option>
            <option value="tennis">Tennis</option>
            <option value="badminton">Badminton</option>
            <option value="basketball">Basketball</option>
            <option value="volleyball">Volleyball</option>
            <option value="football">Football</option>
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

        {/* COURT TABLE */}
        <div className="bg-white rounded overflow-x-auto  shadow p-4">
          <h2 className="text-2xl font-bold mb-4">Courts</h2>
          {isLoading ? (
            <Loader />
          ) : courts.length === 0 ? (
            <p>No courts found.</p>
          ) : (
            <>
              <table className="table w-full   text-sm sm:text-base ">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody >
                  {courts.map((court) => (
                    <tr key={court._id}>
                      <td>
                        <img src={court.image} alt={court.title} className="w-16 h-12 object-cover rounded" />
                      </td>
                      <td>{court.title}</td>
                      <td>{court.type}</td>
                      <td>${court.price}</td>
                      <td className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(court)} className="btn btn-sm btn-info">
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "This court will be permanently deleted!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteCourtMutation.mutate(court._id);
                              }
                            });
                          }}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4 gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === idx + 1 ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
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
    </>
  );
};

export default ManageCourts;
