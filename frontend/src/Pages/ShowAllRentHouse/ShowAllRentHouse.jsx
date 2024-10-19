import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UseAxoisSecure from "../../Hooks/UseAxoisSecure/UseAxoisSecure";
import { useQuery } from "@tanstack/react-query";

const ShowAllRentHouse = () => {
  const [rentProperties, setRentProperties] = useState([]);

  const axiosSecure = UseAxoisSecure();

  const { refetch, data, isLoading } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const res = await axiosSecure.get("/propertys");
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      const filteredRentProperties = data.filter(
        (property) =>
          property.purpose === "rent" && property.status === "Approved"
      );
      setRentProperties(filteredRentProperties);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading properties...</p>;
  }

  return (
    <header>
      <section className="max-w-7xl mx-auto">
        <div className="text-center my-12">
          <h2 className="text-3xl font-bold text-neutral">Rent a House</h2>
          <p className="text-lg text-gray-500 mt-2">
            Discover affordable homes available for rent across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentProperties.length === 0 ? (
            <p>No properties available for rent at the moment.</p>
          ) : (
            rentProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={property.image}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {property.purpose}
                  </h3>
                  <p className="text-gray-500">{property.location}</p>
                  <div className="flex items-center mt-4 text-gray-600">
                    <span className="mr-2">{property.bedroom} Bedrooms</span>
                    <span className="mr-2">{property.washroom} Bathrooms</span>
                  </div>
                  <div className="text-lg flex justify-between items-center font-semibold text-blue-600 mt-4">
                    <p>{property.price}/month</p>
                    <Link
                      to={`/showdetails/${property._id}`}
                      className="btn btn-info"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </header>
  );
};

export default ShowAllRentHouse;
