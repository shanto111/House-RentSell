import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Popup = () => {
  const { logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          text: "You have been logged out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-orange-300 rounded-lg shadow-lg z-50">
          <ul className="menu p-2 rounded-box w-48">
            <li>
              <button
                className="btn btn-ghost text-black"
                onClick={() => alert("Profile clicked")}
              >
                Profile
              </button>
            </li>
            <li>
              <Link
                to="addproperty"
                onClick={togglePopup}
                className="btn btn-ghost text-black"
              >
                Add Property
              </Link>
            </li>
            <li>
              <button
                className="btn btn-ghost text-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Popup;
