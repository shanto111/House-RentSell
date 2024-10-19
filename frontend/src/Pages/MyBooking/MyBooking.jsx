import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const MyBooking = () => {
  const [Booking, setBooking] = useState([]);
  const { user } = useContext(AuthContext);
  const axoisPublic = UseAxoisPublic();

  const { refetch, data: bookings } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axoisPublic.get("/bookingInformation");
      return res.data;
    },
  });

  // Filter the bookings based on the current logged-in user's email
  useEffect(() => {
    if (bookings && user?.email) {
      const filteredBookings = bookings.filter(
        (booking) => booking.email === user?.email
      );
      setBooking(filteredBookings);
    }
  }, [bookings, user?.email]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">
        My Bookings: {Booking?.length}
      </h2>

      {Booking.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Booking Id</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Price Offer</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Booking.map((booking, index) => (
              <tr key={index} className="bg-gray-100 border-t border-gray-300">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{booking._id}</td>
                <td className="border px-4 py-2 text-center">
                  {booking.status === "Approved" ? "Approved" : "Pending"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {booking.priceOffer}
                </td>
                <td className="border text-center">
                  {booking.status === "Approved" && (
                    <Link
                      to={`/dashboard/payment?houseId=${booking.propertyId}`}
                    >
                      <button className="btn btn-outline">
                        Get Advance Payment
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg text-gray-500">No bookings yet.</p>
      )}
    </div>
  );
};

export default MyBooking;
