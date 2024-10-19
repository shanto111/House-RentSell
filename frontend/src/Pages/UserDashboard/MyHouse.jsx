import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseAxoisSecure from "../../Hooks/UseAxoisSecure/UseAxoisSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyHouse = () => {
  const { user } = useContext(AuthContext);
  const [myHouse, setMyHouse] = useState([]);
  const axiosSecure = UseAxoisSecure();

  const { refetch, data } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const res = await axiosSecure.get("/propertys");
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      const filteredProperties = data.filter(
        (property) => property?.email === user?.email
      );
      setMyHouse(filteredProperties);
    }
  }, [data, user?.email]);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        My Properties ({myHouse.length})
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-4">Purpose</th>
            <th className="border border-gray-300 p-4">House Id</th>
            <th className="border border-gray-300 p-4">Status</th>
            <th className="border border-gray-300 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myHouse?.map((property) => (
            <tr key={property._id} className="hover:bg-gray-50 text-center">
              <td className="border border-gray-300 p-4">
                {property?.purpose?.toUpperCase()}
              </td>
              <td className="border border-gray-300 p-4">{property._id}</td>
              <td className="border border-gray-300 p-4">
                {property.status ? <p>Approved </p> : <p>not approved</p>}
              </td>
              <td className="border border-gray-300 p-4 text-center">
                <button
                  onClick={() => handleDelete(property._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                >
                  Delete
                </button>
                <Link to={`/dashboard/viewbooking/${property._id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    View Booking details
                  </button>
                </Link>
                <Link to={`/dashboard/paymentdetails/${property._id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4">
                    View payment details
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyHouse;
