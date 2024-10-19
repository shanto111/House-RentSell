import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaPage4, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxoisSecure from "../../Hooks/UseAxoisSecure/UseAxoisSecure";
import { FcApprove } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";

const ManageProperty = () => {
  const axoisSecure = UseAxoisSecure();

  const { refetch, data } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const res = await axoisSecure.get("/propertys");
      return res.data;
    },
  });
  console.log("padding house", data);

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform approve action
        axoisSecure.put(`/propertys/${id}`).then((response) => {
          if (response.data.modifiedCount > 0) {
            refetch();
            console.log("approve", response);
            Swal.fire(
              "Approved!",
              "The property has been approved.",
              "success"
            );
          }
        });
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete action
        refetch();
        axoisSecure
          .delete(`/propertys/${id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              refetch(); // Refetch the data to update the UI
              console.log("deleted", response);
              Swal.fire(
                "Deleted!",
                "The property has been deleted.",
                "success"
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting property:", error);
            Swal.fire(
              "Error!",
              "There was an error deleting the property.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Properties</h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((property) => (
              <tr key={property._id}>
                <td>{property.purpose}</td>
                <td>{property.address}</td>
                <td>{property.rentPrice || property.askingPrice}</td>
                <td>
                  {property.status === "Approved" ? (
                    <FcApprove className="text-4xl" />
                  ) : (
                    <FaTimes className="text-4xl text-red-500" /> // You can customize the color/size here
                  )}
                </td>
                <td className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(property._id)}
                    className="btn btn-sm btn-primary"
                  >
                    <FaEdit className="mr-2" /> Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(property._id)}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperty;
