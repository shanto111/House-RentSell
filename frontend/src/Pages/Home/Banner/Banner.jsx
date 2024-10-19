import React from "react";
import bannerImg from "../../../assets/property.jpg";

const Banner = (props) => {
  return (
    <div
      className="hero  h-[450px]"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl text-white font-extrabold">
            Find Your Dream House
          </h1>
          <p className="mb-5 text-white">
            Buy or rent properties of any type in the Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
