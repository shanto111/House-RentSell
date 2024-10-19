import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Popup from "../../compoenets/PopUp/PopUp";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().then((res) => {
      console.log(res);
    });
  };

  const links = (
    <>
      <Link to="/" className="hover:text-gray-400">
        Home
      </Link>
      <Link to="/rent" className="hover:text-gray-400">
        Rent
      </Link>
      <Link to="/sale" className="hover:text-gray-400">
        Sale
      </Link>
      <Link to="/contact" className="hover:text-gray-400">
        Contact Us
      </Link>
      {user ? (
        <>
          <button
            onClick={handleLogout}
            className="hover:text-gray-400 btn  btn-primary"
          >
            Logout
          </button>
          {/* <button className="hover:text-gray-400">Profile</button>
          <Link to="/addProperty" className="hover:text-gray-400">
            Add Property
          </Link>
          <button className="hover:text-gray-400">Logout</button> */}
          {/* <Popup></Popup> */}
          <Link to="/dashboard/allhouse">
            <button className="btn text-black">
              <svg
                xmlns=""
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a5 5 0 100 10 5 5 0 000-10zM4 20a8 8 0 1116 0H4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </>
      ) : (
        <Link to="/login" className="hover:text-gray-400">
          Login
        </Link>
      )}
    </>
  );
  return (
    <div className="bg-gray-800 text-white shadow-md">
      <div className="container flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <a href="/" className="text-2xl font-bold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7m-9-2v12m0 0h-4m4 0h4"
              />
            </svg>
            <span>RentSell</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {links}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="flex flex-col space-y-4 p-4 bg-gray-700">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/rent" className="text-white hover:text-gray-300">
            Add Property
          </a>
          <a href="/rent" className="text-white hover:text-gray-300">
            Rent
          </a>
          <a href="/sale" className="text-white hover:text-gray-300">
            Sale
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
