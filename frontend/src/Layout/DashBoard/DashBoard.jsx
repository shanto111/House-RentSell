import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaHistory,
  FaFileAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import UseAdmin from "../../Hooks/UseAdmin";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";

const DashBoard = () => {
  const [users, setUser] = useState(null);
  const navigate = useNavigate();
  const axoisPublic = UseAxoisPublic();
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().then((res) => {
      console.log("dkkk");
      navigate("/login");
    });
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axoisPublic.get(`/user/${user?.email}`);
        setUser(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user, axoisPublic]);

  const DashboardLink = ({ to, icon, label }) => (
    <li className="mt-2">
      <Link
        to={to}
        className="flex items-center py-3 px-5 rounded-xl bg-white shadow-lg text-gray-700 transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-100 hover:text-indigo-600"
      >
        {icon}
        <span className="ml-3 font-semibold">{label}</span>
      </Link>
    </li>
  );

  const [admin] = UseAdmin();

  return (
    <section className="flex min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <Helmet>
        <title>House RentSell || Dashboard</title>
      </Helmet>
      {/* Sidebar */}
      <div className="w-72 bg-white bg-opacity-20 backdrop-blur-lg p-6 shadow-lg rounded-xl m-4 overflow-hidden fixed top-0 left-0 h-full">
        <div className="flex flex-col items-center mb-8">
          <img
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-xl"
            src={users?.image}
            alt="Profile"
          />
          <h2 className="mt-4 text-xl font-bold text-white">{users?.name}</h2>
          <p className="text-sm text-gray-200">{user?.email}</p>
          <p className="text-sm text-gray-200">{user?.role}</p>
          {user?.emailVerified === false && (
            <p className="text-red-600">Please Verify Your email</p>
          )}
        </div>
        <ul className="space-y-4">
          {admin ? (
            <>
              {/* Admin Links */}
              <DashboardLink
                to="/dashboard/allhouse"
                icon={<FaBuilding />}
                label="All Properties"
              />
              <DashboardLink
                to="/dashboard/users"
                icon={<FaUsers />}
                label="All Users"
              />
              <DashboardLink
                to="/dashboard/manageproperty"
                icon={<FaBuilding />}
                label="Manage Property"
              />
              <DashboardLink
                to="/dashboard/paymenthistory"
                icon={<FaHistory />}
                label="Payment History"
              />
              <DashboardLink
                to="/dashboard/addproverty"
                icon={<BsHouseFill />}
                label="Add Property"
              />
              <DashboardLink
                to="/dashboard/myhouse"
                icon={<FaHome />}
                label="My House"
              />
            </>
          ) : (
            <>
              {/* User Links */}
              <DashboardLink
                to="/dashboard/allhouse"
                icon={<FaHome />}
                label="All Property"
              />
              <DashboardLink
                to="/dashboard/addproperty"
                icon={<BsHouseFill />}
                label="Add Property"
              />
              <DashboardLink
                to="/dashboard/myhouse"
                icon={<FaHome />}
                label="My House"
              />
              <DashboardLink
                to="/dashboard/myboking"
                icon={<FaMoneyBill />}
                label="My Booking"
              />
              {/* {user?.emailVerified === true ? (
                <DashboardLink
                  to="/dashboard/paymentHistory"
                  icon={<FaMoneyBill />}
                  label="Payment History"
                />
              ) : (
                <button>Verify Your Email</button>
              )} */}
              <DashboardLink
                to="/dashboard/paymentHistory"
                icon={<FaMoneyBill />}
                label="Payment History"
              />
            </>
          )}
          <button onClick={handleLogOut} className="btn btn-primary w-full">
            Log out
          </button>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-80 bg-white bg-opacity-60 backdrop-blur-md p-10 rounded-2xl m-4 shadow-lg overflow-auto h-screen">
        <Outlet />
      </div>
    </section>
  );
};

export default DashBoard;
