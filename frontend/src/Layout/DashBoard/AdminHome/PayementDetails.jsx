import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import UseAxoisSecure from "../../../Hooks/UseAxoisSecure/UseAxoisSecure";
import { useParams } from "react-router-dom";
import { MdDone } from "react-icons/md";

const PaymentDetails = () => {
  const axoisSecure = UseAxoisSecure();
  const [property, setProperty] = useState([]);
  const { id } = useParams();

  const {
    data: paymentHistory,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userdails"],
    queryFn: async () => {
      const res = await axoisSecure.get("/paymentHistory");
      return res.data;
    },
  });

  useEffect(() => {
    if (paymentHistory && paymentHistory.length > 0) {
      const filteredProperty = paymentHistory.filter(
        (payment) => payment.HouseId === id
      );
      setProperty(filteredProperty);
    }
  }, [paymentHistory, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching payment details.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-center mb-6 text-yellow-700">
        Payment Details for Property ID: {id}
      </h2>

      {property.length > 0 ? (
        <div className="space-y-4">
          {property.map((payment) => (
            <div
              key={payment._id}
              className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4"
            >
              <p className="text-gray-800 text-center font-semibold text-xl">
                Email: {payment.email}
              </p>

              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-200 font-semibold">
                      Transaction ID
                    </th>
                    <th className="py-2 px-4 bg-gray-200 font-semibold">
                      Month
                    </th>
                    <th className="py-2 px-4 bg-gray-200 font-semibold">
                      Amount
                    </th>
                    <th className="py-2 px-4 bg-gray-200 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">{payment.transaction}</td>
                    <td className="border px-4 py-2">
                      {new Date(payment.date).toLocaleDateString("en-US", {
                        month: "long",
                      })}
                    </td>
                    <td className="border px-4 py-2">${payment.price}</td>
                    <td className="border px-4 py-2">
                      <MdDone />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No payment history available for this property.
        </p>
      )}
    </div>
  );
};

export default PaymentDetails;
