import { useQuery } from "@tanstack/react-query";
import React from "react";
import cover from '../../images/cover.jpg'
import PhoneCard from "./PhoneCard";

const AllPhones = () => {
  const { data: phones = [] } = useQuery({
    queryKey: ["phones"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/all/phones`);
      const data = await res.json();
      return data;
    },
  });
  return (
    <section className="pl-16 pr-16">
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${cover})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-3xl font-bold">ALL GENUIN PRE-OWNED</h1>
              <p className="mb-5 text-6xl font-bold">
                SMART PHONES HERE
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {
            phones.map(phone => <PhoneCard key={phone._id} phone={phone}/>)
        }
      </div>
    </section>
  );
};

export default AllPhones;
