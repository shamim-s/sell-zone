import React from "react";
import { Link } from "react-router-dom";
import banner from "../../../images/banner.jpg";

const Hero = () => {
  return (
    <section className="dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col-reverse justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="lg:text-5xl md:text-5xl text-5xl font-bold mb-4">Here Will You Find</h1>
          <h1 className="text-4xl">Genuin <span>Pre-Owned</span> Smart Phones</h1>
          <div className="flex mt-6 flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <button
              className=" btn text-lg font-semibold rounded dark:bg-sky-400 dark:text-gray-900"
            >
              GET STARTED
            </button>
            <button
              className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100"
            >
              CONTACT US
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src={banner}
            alt=""
            className="object-contain h-72 rounded-lg sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
