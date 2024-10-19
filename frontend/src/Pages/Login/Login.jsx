import React, { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseAdmin from "../../Hooks/UseAdmin";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const captchaRef = useRef("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(true);
  const [admin] = UseAdmin();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleCaptchaValidation = () => {
    const captchaValue = captchaRef.current.value;

    if (validateCaptcha(captchaValue)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate("/dashboard/allhouse");
        // {
        //   admin
        //     ? navigate("/dashboard/adminHome")
        //     :;
        // }
        Swal.fire({
          title: "Login in successfully",
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data.email, data.password);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left side - Login Form */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-12">
            <div className="max-w-sm w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-gray-800">
                Welcome Back
              </h2>
              <p className="mb-4 md:mb-6 text-gray-500">
                Thank you for getting back to Pomah, let's access the best
                recommendation for you.
              </p>

              {/* Tabs */}
              <div className="tabs mb-4 md:mb-6">
                <h2 className="text-3xl font-bold mb-2 text-orange-500">
                  Login
                </h2>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="form-control mb-4">
                  <input
                    type={showpassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered w-full"
                    name="password"
                    {...register("password", { required: true })}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
                  <label className="flex items-center space-x-2">
                    <input
                      onChange={() => setShowPassword(!showpassword)}
                      type="checkbox"
                      className="checkbox checkbox-warning"
                    />
                    <span>Show Password</span>
                  </label>
                  <Link to={`/forgetPassword`}>
                    <a href="#" className="text-orange-500">
                      Forgot Password?
                    </a>
                  </Link>
                </div>

                {/* CAPTCHA */}
                <div className="form-control  mb-2">
                  <LoadCanvasTemplate />
                </div>
                <div className="form-control mb-4">
                  <input
                    type="text"
                    placeholder="Enter CAPTCHA"
                    ref={captchaRef}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* CAPTCHA Validation Button */}
                <button
                  type="button"
                  onClick={handleCaptchaValidation}
                  className="btn btn-block bg-blue-500 hover:bg-blue-600 text-white mb-4"
                >
                  Validate CAPTCHA
                </button>

                <button
                  type="submit"
                  className="btn btn-block bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Login
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-gray-500">
                  Do you have an account?{" "}
                  <Link to="/signup">
                    <a href="#" className="text-orange-500 hover:underline">
                      Please Sign Up
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div
            className="hidden md:block w-full md:w-1/2 relative bg-cover bg-center"
            // style={{ backgroundImage: `url(${loginImg})` }}
          >
            <div className="absolute bottom-8 left-8 bg-white p-4 md:p-6 rounded-lg shadow-xl">
              <h4 className="font-bold text-lg">Various Payment Options</h4>
              <p className="text-gray-500">
                Be more flexible with various payment methods from ATM Transfer,
                Credit Card, to Internet Banking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
