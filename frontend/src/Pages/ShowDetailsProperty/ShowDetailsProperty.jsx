import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import Booking from "../Booking/Booking";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ShowDetailsProperty = () => {
  const [property, setProperty] = useState(null);
  const [isBooked, setisBooked] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false); // Track booking form visibility
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axoisPublic = UseAxoisPublic();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/propertys/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (user?.uid && property?._id) {
      const checkBookingStatus = async () => {
        try {
          const response = await axoisPublic.get(
            `/bookingInformation/${user.uid}/${property._id}`
          );
          setisBooked(response.data.isBooked);
        } catch (error) {
          console.error("Error checking booking status:", error);
        }
      };
      checkBookingStatus();
    }
  }, [user?.uid, property?._id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-4xl text-center font-bold mb-8 text-primary">
        Property Details
      </h2>
      <div className=" gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            className="h-[500px]"
          >
            <SwiperSlide>
              <img
                src={property.image1}
                alt="Property Image 1"
                className="w-full object-cover h-[500px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={property.image2}
                alt="Property Image 2"
                className="w-full object-cover h-[500px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={property.image3}
                alt="Property Image 3"
                className="w-full object-cover h-[500px]"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Property Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Purpose:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.purpose}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Property Type:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.propertyType}
              </span>
            </div>
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
              <span className="font-medium text-gray-600">Square Footage:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.squareFootage}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Price:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.rentPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">
                Security Deposit:
              </span>
              <span className="text-lg font-semibold text-gray-800">
                ${property.securityDeposit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Address:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Contact:</span>
              <span className="text-lg font-semibold text-gray-800">
                {property.number} | {property.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        {isBooked ? (
          <div className="bg-gray-400 text-white text-2xl px-6 py-3 rounded-full shadow-md">
            Already Booked
          </div>
        ) : (
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-primary text-white text-2xl px-6 py-3 rounded-full shadow-md"
          >
            Add Booking
          </button>
        )}
      </div>

      {showBookingForm && (
        <Booking
          propertyId={property._id}
          userUid={user?.uid}
          propertyAddress={property?.address}
          rentPrice={property.rentPrice}
          propertyType={property.propertyType}
          purpose={property.purpose}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default ShowDetailsProperty;
