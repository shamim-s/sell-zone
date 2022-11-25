import React from "react";
import { Link } from "react-router-dom";

const CatagoryCard = ({ catagory }) => {
  return (
    <Link>
      <div className="card lg:w-96 h-56 bg-base-100 shadow-xl relative">
        <div 
        className="bg-slate-900 w-full h-full text-white flex justify-center items-center absolute opacity-0 hover:opacity-70 transition-all rounded-xl">
            <h1 className="text-2xl font-bold opacity-100">{catagory.brand}</h1>
        </div>
        <figure className="px-10 pt-10">
          <img
            src={catagory.img}
            alt="phones"
            className="rounded-xl mt-16"
          />
        </figure>
      </div>
    </Link>
  );
};

export default CatagoryCard;
