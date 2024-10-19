import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxoisSecure from "../../Hooks/UseAxoisSecure/UseAxoisSecure";
import UseAxoisPublic from "../../Hooks/UseAxoisPublic/UseAxoisPublic";
import UseAdmin from "../../Hooks/UseAdmin";
import { Helmet } from "react-helmet";

const image_hosting_key = "f2f33d12bd08464e3a409b458207a1a6";
const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

const Register = () => {
  const { createUser, handleSendEmailVerification } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axoisSecure = UseAxoisSecure();
  const axoispublic = UseAxoisPublic();
  const [admin] = UseAdmin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imageResponse = await axoispublic.post(
        image_hosting_api,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (imageResponse.data.success) {
        const imageUrl = imageResponse.data.data.display_url;

        const userResponse = await createUser(data.email, data.password);
        if (userResponse) {
          const users = {
            name: data.name,
            email: data.email,
            image: imageUrl,
          };

          const response = await axoisSecure.post("/users", users);

          if (response.data.insertedId) {
            await handleSendEmailVerification(userResponse.user).then(() => {
              Swal.fire({
                title: "Please Verify your email",
                text: "Please verify your email to complete the process.",
                confirmButtonText: "OK",
              });
            });
            setSuccess("Registration successful!");
            reset();
            {
              admin
                ? navigate("/dashboard/adminHome")
                : navigate("/dashboard/allhouse");
            }
          } else {
            throw new Error("Failed to save user data.");
          }
        }
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      setError(error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Helmet>
        <title>House RentSell || Register</title>
      </Helmet>
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left side - Register Form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
          <div className="max-w-sm w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-gray-800">
              Create Account
            </h2>
            <p className="mb-4 md:mb-6 text-gray-500">
              Sign up to start managing your properties with ease.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="form-control mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              {/* Image Upload Field */}
              <div className="form-control mb-4">
                <input
                  type="file"
                  {...register("image", { required: "Image is required" })}
                  className="mt-2 h-10 w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.image && (
                  <span className="text-red-500">{errors.image.message}</span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control mb-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <span
                    className="absolute right-2 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="form-control mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("terms", {
                      required: "You must accept the terms",
                    })}
                    className="checkbox"
                  />
                  <span>Accept terms and conditions</span>
                </label>
                {errors.terms && (
                  <span className="text-red-500">{errors.terms.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-block bg-orange-500 hover:bg-orange-600 text-white"
              >
                Register
              </button>
            </form>

            {/* Link to Login */}
            <div className="mt-6 text-center">
              <p className="text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 hover:underline">
                  Login here
                </Link>
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && <p className="text-red-500 text-center mt-3">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mt-3">{success}</p>
            )}
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden md:block w-full md:w-1/2 relative bg-cover bg-center">
          <div className="absolute bottom-8 left-8 bg-white p-4 md:p-6 rounded-lg shadow-xl">
            <h4 className="font-bold text-lg">Efficient Property Management</h4>
            <p className="text-gray-500">
              Easily manage your properties with our intuitive platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
