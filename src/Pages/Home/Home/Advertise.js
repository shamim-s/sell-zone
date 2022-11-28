import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const Advertise = () => {
  const { data: advertice = [] , refetch} = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch(`https://sell-zone-server.vercel.app/advertise/item`);
      const data = await res.json();
      return data;
    },
  });
  const item = advertice[0];

  if (advertice.length === 1) {
    return (
      <Link to={`/phone_details/${item.productId}`}>
        <div className="flex items-center justify-center mb-10">
          <div className="relative">
            <img
              src={item.img}
              alt=""
              className="w-96 border-2 border-orange-300"
            />
            <span className="text-2xl font-semibold absolute top-0 left-2">
              AD
            </span>
            <span className="absolute left-28 top-1 text-2xl">
              {item.model}
            </span>
            <span className="text-3xl font-semibold  text-orange-400 absolute bottom-0 right-0 w-full bg-slate-600 py-2 px-3">
              <span className="animate-pulse text-center">Buy Now</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }
};

export default Advertise;
