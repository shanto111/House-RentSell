import React from "react";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";

const DetailHouse = (props) => {
  const axoisPublic = UseAxoisPublic();
  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-8 text-primary">
        Property Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <div className="rounded-lg overflow-hidden shadow-lg ">
            <img
              src={property.image}
              alt="Property Image"
              className="w-full object-cover h-[500px]"
            />
          </div>
        </div>
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Bedroom:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.bedroom}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Washroom:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.washroom}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Balcony:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.balcony}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Floor:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.floor}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Gas:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.gas}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Lift:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.lift}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Price:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Service Charge:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.serviceCharge}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                Contract Number:
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {property.number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHouse;
