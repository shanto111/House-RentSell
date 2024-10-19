import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const axoisSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const UseAxoisSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  axoisSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      console.log("requset form intercaptor", token);
      config.headers.authorization = `bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axoisSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        navigate("/login");
        await logOut();
      }
      console.log(status);
      return Promise.reject(error);
    }
  );
  return axoisSecure;
};

export default UseAxoisSecure;
