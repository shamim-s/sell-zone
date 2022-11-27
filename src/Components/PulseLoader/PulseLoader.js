import React from "react";

const PulseLoader = () => {
  return (
    <div
      className="spinner-grow inline-block w-4 h-4 bg-white rounded-full opacity-0"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default PulseLoader;
