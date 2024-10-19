import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Booking = ({
  propertyId,
  userUid,
  propertyAddress,
  rentPrice,
  propertyType,
  purpose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = UseAxoisPublic();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const bookingInfo = {
        member: data.familyNumber,
        priceOffer: data.priceOffer,
        planStay: data.planStay,
        homeDistrict: data.homeDistrict,
        nidNumber: data.nidNumber,
        email: user?.email,
        userUid,
        propertyId,
        propertyAddress,
        rentPrice,
        propertyType,
        purpose,
        status: "Pending",
      };

      const res = await axiosPublic.post("/bookingInformation", bookingInfo);
      reset();
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: "Your booking has been successfully submitted.",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "An error occurred while processing your booking.",
      });
      reset();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold mb-8">Booking Information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="text-xl font-medium mb-2">
            Number of Family Members
          </label>
          <input
            type="number"
            {...register("familyNumber", {
              required: "Number of family members is required.",
              min: { value: 1, message: "Must be at least 1 member." },
            })}
            className="input input-bordered w-full rounded-lg p-2.5 border-gray-300"
          />
          {errors.familyNumber && (
            <p className="text-red-500">{errors.familyNumber.message}</p>
          )}
        </div>

        <div>
          <label className="text-xl font-medium mb-2">Price Offer</label>
          <input
            type="number"
            {...register("priceOffer", {
              required: "Price offer is required.",
              min: { value: 0, message: "Price cannot be negative." },
            })}
            className="input input-bordered w-full rounded-lg p-2.5 border-gray-300"
          />
          {errors.priceOffer && (
            <p className="text-red-500">{errors.priceOffer.message}</p>
          )}
        </div>

        <div>
          <label className="text-xl font-medium mb-2">
            How long do you plan to stay? (Months)
          </label>
          <input
            type="number"
            {...register("planStay", {
              required: "Plan stay duration is required.",
              min: { value: 1, message: "Must be at least 1 month." },
            })}
            className="input input-bordered w-full rounded-lg p-2.5 border-gray-300"
          />
          {errors.planStay && (
            <p className="text-red-500">{errors.planStay.message}</p>
          )}
        </div>

        <div>
          <label className="text-xl font-medium mb-2">Home District</label>
          <input
            type="text"
            {...register("homeDistrict", {
              required: "Home district is required.",
            })}
            className="input input-bordered w-full rounded-lg p-2.5 border-gray-300"
          />
          {errors.homeDistrict && (
            <p className="text-red-500">{errors.homeDistrict.message}</p>
          )}
        </div>

        <div>
          <label className="text-xl font-medium mb-2">NID Number</label>
          <input
            type="number"
            {...register("nidNumber", {
              required: "NID number is required.",
              min: { value: 1, message: "NID number must be positive." },
            })}
            className="input input-bordered w-full rounded-lg p-2.5 border-gray-300"
          />
          {errors.nidNumber && (
            <p className="text-red-500">{errors.nidNumber.message}</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-8 space-x-4">
          <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg">
            Confirm Booking
          </button>
          <button
            type="button"
            className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
