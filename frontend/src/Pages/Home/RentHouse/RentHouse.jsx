import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseProperty from "../../../Hooks/UseProperty";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const RentHouse = () => {
  const [rentProperties, setRentProperties] = useState([]);
  const [property] = UseProperty();

  useEffect(() => {
    const rentProperty = property?.filter(
      (propertys) =>
        propertys.purpose === "rent" && propertys.status === "Approved"
    );
    setRentProperties(rentProperty);
  }, [property]);

  return (
    <header>
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center my-12">
          <h2 className="text-4xl font-bold text-neutral">Rent a House</h2>
          <p className="text-lg text-gray-500 mt-2">
            Discover affordable homes available for rent across the country.
          </p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {rentProperties?.map((property) => (
            <SwiperSlide key={property._id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <img
                  className="w-full h-56 object-cover"
                  src={property.image}
                  alt={property.name}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {property.name}
                  </h3>
                  <p className="text-gray-500">{property.location}</p>
                  <div className="flex items-center mt-4 text-gray-600">
                    <span className="mr-4">
                      <i className="fas fa-bed mr-1"></i>
                      {property.bedroom} Bedrooms
                    </span>
                    <span className="mr-4">
                      <i className="fas fa-bath mr-1"></i>
                      {property.washroom} Bathrooms
                    </span>
                    <span>
                      <i className="fas fa-expand-arrows-alt mr-1"></i>
                      {property.sqft} sqft
                    </span>
                  </div>
                  <div className="text-lg flex justify-between items-center font-semibold text-green-600 mt-4">
                    <p>Price: ${property.price}</p>
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
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8">
          <Link
            to="/rent"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            See All Houses
          </Link>
        </div>
      </section>
    </header>
  );
};

export default RentHouse;
