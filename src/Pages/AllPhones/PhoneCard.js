import React from "react";
import { Link } from "react-router-dom";

const PhoneCard = ({ phone }) => {
  const { img, model, _id } = phone;
  return (
    <Link to={`/phone_details/${_id}`}>
      <div className="card w-96 h-56 bg-base-100 shadow-xl mt-10 relative cursor-pointer mx-auto">
        <div className="flex justify-center items-center absolute w-full h-full opacity-0 hover:opacity-80 transition-all rounded-xl">
          <div className="flex justify-center items-center absolute w-full h bg-blue-600 p-6 bottom-0 rounded-b-xl">
            <h1 className="text-2xl font-semibold mt-6 text-white">{model}</h1>
          </div>
        </div>
        <figure className="px-10 pt-10">
          <img src={img} alt="Phone" className="rounded-xl mt-14" />
        </figure>
      </div>
    </Link>
  );
};

export default PhoneCard;
