import React, { useContext, useEffect } from "react";
import { FaHome, FaKey, FaDollarSign, FaUsers } from "react-icons/fa"; // Import icons
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import UseAxoisSecure from "../../../Hooks/UseAxoisSecure/UseAxoisSecure";
import { useQuery } from "@tanstack/react-query";
import PaymentHistory from "../PaymentHistory/PaymentHistory";
import Payment from "./PayementDetails";
import PaymentDetail from "./PayementDetails";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axoisSecure = UseAxoisSecure();

  const { data } = useQuery({
    queryKey: ["propertyDetails"],
    queryFn: async () => {
      const res = await axoisSecure.get("/user-stats");
      return res.data;
    },
  });

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* navigation */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">HouseRent</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6l3 12h12l3-12H3zm3 0a6 6 0 1112 0"
                ></path>
              </svg>
              <span className="badge badge-sm indicator-item">10</span>
            </div>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" alt="User" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="text-4xl font-semibold text-center mb-8">
        Welcome {users?.name || "Back"}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Total Properties Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg shadow-lg p-5 flex justify-between items-center transition-transform transform hover:scale-105">
          <div>
            <p className="text-5xl font-bold text-center">
              {data?.totalProperties}
            </p>
            <h2 className="text-lg text-center mt-2">Total Properties</h2>
          </div>
          <FaHome className="text-6xl" />
        </div>

        {/* Total Users Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg shadow-lg p-5 flex justify-between items-center transition-transform transform hover:scale-105">
          <div>
            <p className="text-5xl font-bold text-center">{data?.totalUsers}</p>
            <h2 className="text-lg text-center mt-2">Total Users</h2>
          </div>
          <FaUsers className="text-6xl" />
        </div>

        {/* Total Revenue Card */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white rounded-lg shadow-lg p-5 flex justify-between items-center transition-transform transform hover:scale-105">
          <div>
            <p className="text-5xl font-bold text-center">
              ${data?.totalRevenue}
            </p>
            <h2 className="text-lg text-center mt-2">Total Revenue</h2>
          </div>
          <FaDollarSign className="text-6xl" />
        </div>

        {/* Total Bookings Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg shadow-lg p-5 flex justify-between items-center transition-transform transform hover:scale-105">
          <div>
            <p className="text-5xl font-bold text-center">
              {data?.totalBookings}
            </p>
            <h2 className="text-lg text-center mt-2">Total Bookings</h2>
          </div>
          <FaKey className="text-6xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Product Sales</h2>
            {/* <ProductSalesChart /> */}
          </div>
        </div>

        <div className="card ">
          <PaymentDetail></PaymentDetail>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
