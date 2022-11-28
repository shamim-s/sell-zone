import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CatagoryPhoneCard from "./CatagoryPhoneCard";
import Hero from "./Hero";

const CatagoryPhones = () => {
  const phones = useLoaderData();

  console.log(phones[0].cataId);

  const { data: catagory = {} } = useQuery({
    queryKey: ["catagory"],
    queryFn: async () => {
      const res = await fetch(
        `https://sell-zone-server.vercel.app/catagory/${phones[0].cataId}`
      );

      const data = await res.json();
      return data;
    },
  });
  return (
    <section>
      <div className="lg:pl-16 lg:pr-16">
        <Hero catagory={catagory}/>
      </div>
      <div className="mb-16 grid lg:grid-cols-3 md:grid-cols-2 gap-6 lg:pl-16 lg:pr-16">
        {phones.map((phone) => (
          <CatagoryPhoneCard key={phone._id} phone={phone} />
        ))}
      </div>
    </section>
  );
};

export default CatagoryPhones;
