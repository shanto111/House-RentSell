import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import { MdDone } from "react-icons/md";
import UseProperty from "../../Hooks/UseProperty";

const BookingDetails = () => {
  const axoisPublic = UseAxoisPublic();
  const [bookings, setBookings] = useState([]);
  const [approvedBookingId, setApprovedBookingId] = useState(null); // Store the approved booking ID
  const [refetch] = UseProperty();
  const { id } = useParams();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axoisPublic.get(`/bookingInformation/${id}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    if (id) {
      fetchBookingDetails();
    }
  }, [id, axoisPublic]);

  const handleApprove = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this property?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setApprovedBookingId(bookingId); // Disable all other buttons
        refetch();

        try {
          await axoisPublic.patch(`properties/${bookingId}`, {
            booking: "complete",
          });
          const response = await axoisPublic.put(
            `/bookingInformation/${bookingId}`
          );
          if (response.data.modifiedCount > 0) {
            Swal.fire(
              "Approved!",
              "The property has been approved.",
              "success"
            );
          }
        } catch (err) {
          console.error("Error approving the booking:", err);
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        Booking Details
      </h2>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Booking #{booking._id}
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Member:</strong> {booking.member}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Price Offer:</strong> ${booking.priceOffer}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Plan Stay:</strong> {booking.planStay} months
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Home District:</strong> {booking.homeDistrict}
                </p>

                <div>
                  {booking.status === "Approved" ||
                  booking._id === approvedBookingId ? (
                    <button disabled className="btn btn-sm btn-primary w-full">
                      Complete <MdDone className="mr-1"></MdDone>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(booking._id)}
                      className="btn btn-sm btn-primary w-full"
                      disabled={approvedBookingId !== null} // Disable all buttons once a booking is approved
                    >
                      Approve <GiConfirmed className="mr-1"></GiConfirmed>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500 mt-6">
          No booking details available.
        </p>
      )}
    </div>
  );
};

export default BookingDetails;
