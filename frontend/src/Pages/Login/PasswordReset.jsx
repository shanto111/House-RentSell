import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const PasswordReset = () => {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState("");
  const { handleResetEmail } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log("Email submitted:", data.email);
    handleResetEmail(data.email);
    setMessage("If this email is registered, a reset link will be sent.");
    reset(); // Clear form after submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Enter your email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-green-600">{message}</div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
