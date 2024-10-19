import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";
import { FaBed, FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const RProverty = () => {
  const [property, setProperty] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/propertys").then((res) => {
      setProperty(res.data);
    });
  }, []);

  return (
    <header className="bg-indigo-200">
      <section className="max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral">Recent Properties</h2>
          <p className="text-lg text-gray-500 mt-2">
            Discover amazing properties for rent or sale across Bangladesh.
          </p>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {property?.map((data) => (
            <SwiperSlide key={data._id} className="relative group">
              <div className="bg-white relative rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ">
                {/* Image Section */}
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover"
                    src={data.image || "https://via.placeholder.com/300"}
                    alt={data.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  {/* Title and Location */}
                  <div className="flex justify-between items-center mb-2 ">
                    <h3 className="text-xl font-semibold right-3 top-3 pl-4 pr-4 bg-white rounded-lg absolute text-gray-800">
                      {data.name}
                    </h3>
                  </div>

                  {/* Details Section */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <FaBed className="text-red-600 text-xl" />
                      <span className="text-gray-800">{data.bedroom} Beds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaBath className="text-blue-600 text-xl" />
                      <span className="text-gray-800">
                        {data.washroom} Baths
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-xl font-bold text-green-600 mb-4">
                    <h2>Price : {data.price}</h2>
                  </div>

                  {/* Hover Effect */}
                  <div className=" inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0  transition-opacity duration-300"></div>
                  <Link to={`/showdetails/${data._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg  transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </header>
  );
};

export default RProverty;
