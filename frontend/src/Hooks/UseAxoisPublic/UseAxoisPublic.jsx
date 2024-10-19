import axios from "axios";
import React from "react";

const axoisPublic = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

const UseAxoisPublic = (props) => {
  return axoisPublic;
};

export default UseAxoisPublic;
