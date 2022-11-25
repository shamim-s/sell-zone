import React from "react";

const Hero = ({catagory}) => {
  return (
    <div className="hero min-h-screen bg-base-200 mb-16">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={catagory.img}
          className="max-w-sm rounded-lg shadow-2xl"
          alt=""
        />
        <div>
          <h1 className="text-5xl font-bold">Pre-Owned {catagory.brand} Phones</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
