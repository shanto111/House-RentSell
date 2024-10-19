import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const image_hosting_key = "af9b4922b6dd98c49abe308d131d60a4";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axoisPublic = UseAxoisPublic();
  const { user } = useContext(AuthContext);
  const [purpose, setPurpose] = useState("");

  const onSubmit = async (data) => {
    try {
      const formDataArray = [
        data.image1[0],
        data.image2[0],
        data.image3[0],
      ].map((image) => {
        const formData = new FormData();
        formData.append("image", image);
        return formData;
      });

      const uploadPromises = formDataArray.map((formData) =>
        axios.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      );

      const [response1, response2, response3] = await Promise.all(
        uploadPromises
      );

      if (
        response1.data.success &&
        response2.data.success &&
        response3.data.success
      ) {
        const imageUrls = [
          response1.data.data.display_url,
          response2.data.data.display_url,
          response3.data.data.display_url,
        ];

        console.log(imageUrls);

        const propertyData = {
          ...data,
          image1: imageUrls[0],
          image2: imageUrls[1],
          image3: imageUrls[2],
          email: user.email,
        };

        const response = await axoisPublic.post("/propertys", propertyData);

        console.log(response.data);

        if (response.data.insertedId) {
          reset();
          Swal.fire({
            title: "Success!",
            text: "Property uploaded successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } else {
        throw new Error("One or more image uploads failed.");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        {purpose === "sale" ? "Sell Your Property" : "Rent Out Your Property"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Purpose */}
        <div>
          <label className="text-lg font-medium text-gray-700">Purpose</label>
          <select
            {...register("purpose", { required: "Purpose is required" })}
            className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="">Select purpose</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
          {errors.purpose && (
            <p className="text-red-500 text-sm">{errors.purpose.message}</p>
          )}
        </div>

        {/* Common Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Property Type */}
          <div>
            <label className="text-lg font-medium text-gray-700">
              Property Type
            </label>
            <select
              {...register("propertyType", {
                required: "Property type is required",
              })}
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="single-family">Single-Family Home</option>
              <option value="duplex">Duplex</option>
            </select>
            {errors.propertyType && (
              <p className="text-red-500 text-sm">
                {errors.propertyType.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Full Address"
              {...register("address", { required: "Address is required" })}
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Sale-specific Fields */}
        {purpose === "sale" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {/* Asking Price */}
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Asking Price
                </label>
                <input
                  type="number"
                  placeholder="Asking Price"
                  {...register("askingPrice", {
                    required: "Asking price is required",
                  })}
                  className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.askingPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.askingPrice.message}
                  </p>
                )}
              </div>

              {/* Property Taxes */}
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Property Taxes
                </label>
                <input
                  type="number"
                  placeholder="Annual Property Taxes"
                  {...register("propertyTaxes", {
                    required: "Property taxes are required",
                  })}
                  className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.propertyTaxes && (
                  <p className="text-red-500 text-sm">
                    {errors.propertyTaxes.message}
                  </p>
                )}
              </div>
            </div>

            {/* Additional Sale Fields */}
            <div className="grid grid-cols-2 gap-4">
              {/* Year Built */}
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Year Built
                </label>
                <input
                  type="number"
                  placeholder="Year Built"
                  {...register("yearBuilt", {
                    required: "Year built is required",
                  })}
                  className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.yearBuilt && (
                  <p className="text-red-500 text-sm">
                    {errors.yearBuilt.message}
                  </p>
                )}
              </div>

              {/* Lot Size */}
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Lot Size (sqft)
                </label>
                <input
                  type="number"
                  placeholder="Lot Size"
                  {...register("lotSize", {
                    required: "Lot size is required",
                  })}
                  className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.lotSize && (
                  <p className="text-red-500 text-sm">
                    {errors.lotSize.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Rent-specific Fields */}
        {purpose === "rent" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {/* Rent Price */}
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Rent Price
                </label>
                <input
                  type="number"
                  placeholder="Monthly Rent"
                  {...register("rentPrice", {
                    required: "Rent price is required",
                  })}
                  className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.rentPrice && (
                  <p className="text-red-500 text-sm">
                    {errors.rentPrice.message}
                  </p>
                )}
              </div>

              {/* Security Deposit */}
              <div>
                <label className="text-lg font-medium text-gray-700">
                  Security Deposit
                </label>
                <input
                  type="number"
                  placeholder="Security Deposit"
                  {...register("securityDeposit", {
                    required: "Security deposit is required",
                  })}
                  className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.securityDeposit && (
                  <p className="text-red-500 text-sm">
                    {errors.securityDeposit.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Common Fields Continued */}
        <div className="grid grid-cols-2 gap-4">
          {/* Number of Bedrooms */}
          <div>
            <label className="text-lg font-medium text-gray-700">
              Bedrooms
            </label>
            <input
              type="number"
              placeholder="Number of Bedrooms"
              {...register("bedroom", {
                required: "Number of bedrooms is required",
              })}
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.bedrooms && (
              <p className="text-red-500 text-sm">{errors.bedrooms.message}</p>
            )}
          </div>

          {/* Number of Bathrooms */}
          <div>
            <label className="text-lg font-medium text-gray-700">
              Bathrooms
            </label>
            <input
              type="number"
              placeholder="Number of Bathrooms"
              {...register("washroom", {
                required: "Number of bathrooms is required",
              })}
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.bathrooms && (
              <p className="text-red-500 text-sm">{errors.bathrooms.message}</p>
            )}
          </div>
        </div>

        {/* Square Footage */}
        <div>
          <label className="text-lg font-medium text-gray-700">
            Square Footage
          </label>
          <input
            type="number"
            placeholder="Total Square Footage"
            {...register("squareFootage", {
              required: "Square footage is required",
              min: 1,
            })}
            className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors.squareFootage && (
            <p className="text-red-500 text-sm">
              {errors.squareFootage.message}
            </p>
          )}
        </div>

        {/* Property Description */}
        <div>
          <label className="text-lg font-medium text-gray-700">
            Property Description
          </label>
          <textarea
            placeholder="Describe your property"
            {...register("description", {
              required: "Property description is required",
            })}
            className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            rows="5"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Upload Images */}
        <div>
          <label className="text-lg font-medium text-gray-700">
            Upload First Image
          </label>
          <input
            type="file"
            {...register("image1", { required: "First Image is required" })} // First image
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.image1 && (
            <p className="text-red-500 text-sm">{errors.image1.message}</p>
          )}
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">
            Upload Second Image
          </label>
          <input
            type="file"
            {...register("image2")} // Second image
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">
            Upload Third Image
          </label>
          <input
            type="file"
            {...register("image3")} // Third image
            className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          {/* Contact Number */}
          <div>
            <label className="text-lg font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              placeholder="Your Contact Number"
              {...register("number", {
                required: "Contact number is required",
              })}
              className="p-3 mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Your Email Address"
              defaultValue={user?.email}
              readOnly
              className="p-3 mt-2 w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-5 bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          {purpose === "sale"
            ? "Submit Property for Sale"
            : "Submit Rental Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
