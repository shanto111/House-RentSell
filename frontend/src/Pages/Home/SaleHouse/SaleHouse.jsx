import React, { useEffect, useState } from "react";
import saleHouseImg from "../../../assets/house.jpg"; // Assuming this is a placeholder image
import axios from "axios";
import { Link } from "react-router-dom";
import UseProperty from "../../../Hooks/UseProperty";

const SaleHouse = () => {
  const [saleProperties, setSaleProperties] = useState([]);
  const [propertys] = UseProperty();

  useEffect(() => {
    const rentPropertys = propertys?.filter(
      (property) =>
        property.purpose === "sale" && property.status === "Approved"
    );
    setSaleProperties(rentPropertys);
  }, []);

  return (
    <header>
      <section className="max-w-7xl mx-auto">
        <div className="text-center my-12">
          <h2 className="text-3xl font-bold text-neutral">Buy a House</h2>
          <p className="text-lg text-gray-500 mt-2">
            Explore a variety of properties available for sale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saleProperties?.slice(0, 3)?.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={saleHouseImg}
                alt={property.name}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {property.name}
                </h3>
                <p className="text-gray-500">{property.location}</p>
                <div className="flex items-center mt-4 text-gray-600">
                  <span className="mr-2">{property.bedroom} Bedrooms</span>
                  <span className="mr-2">{property.washroom} Bathrooms</span>
                  <span className="mr-2">{property.sqft} sqft</span>
                </div>
                <div className="text-lg flex justify-between items-center font-semibold text-green-600 mt-4">
                  <p>Price : {property.price}</p>
                  <Link
                    to={`/showdetails/${property._id}`}
                    type="submit"
                    className="btn btn-info"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/sale"
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
          >
            See All Properties
          </Link>
        </div>
      </section>
    </header>
  );
};

export default SaleHouse;
