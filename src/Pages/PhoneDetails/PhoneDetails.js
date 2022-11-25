import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { HiChip, HiOutlineDatabase } from "react-icons/hi";
import { AuthContext } from "../../Context/Context";
import AddCartModal from "./AddCartModal";
import Modal from "../../Components/Modal/Modal";

const PhoneDetails = () => {
  const { user } = useContext(AuthContext);
  const phone = useLoaderData();
  const {
    img,
    originalPrice,
    sellPrice,
    seller,
    storage,
    used,
    location,
    model,
    chipset,
    postDate,
    status
  } = phone;

  return (
    <section className="lg:pl-16 lg:pr-16 mt-10 mb-10">
      <div className="lg:flex">
        <div>
          <img src={img} className="w-96" alt="" />
        </div>
        <div className="lg:p-0 md:p-4 p-6">
          <h1 className="text-3xl font-semibold">{model}</h1>
          <h1 className="text-xl flex items-center mt-2">
            <HiChip className="text-2xl" /> {chipset}
          </h1>
          <h1 className="text-xl flex items-center mt-2">
            <HiOutlineDatabase className="text-2xl" /> {storage}
          </h1>
          <hr className="mt-2 mb-4" />
          <p className="mb-2">
            <span className="font-semibold">Original Price:</span>{" "}
            {originalPrice} BDT
          </p>
          <p className="mb-2">
            <span className="font-semibold">Selling Price:</span> {sellPrice}{" "}
            BDT
          </p>
          <p className="mb-2">
            <span className="font-semibold">Seller:</span> {seller}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Location:</span> {location}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Used:</span> {used}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Post Date:</span> {postDate}
          </p>
          <p className="mb-2">
            {
              status === 'sold' ? <p>
                <span className="font-semibold">Status:</span> 
                <span className=" text-red-500 ml-2">{status}</span>
                </p> : <p>
                  <span className="font-semibold">Status:</span> 
                  <span className="text-green-500 ml-2">{status}</span>
                </p>
            }
          </p>
          <div className="mt-5">
          {
            status === 'sold' ? <button disabled className="btn btn-sm">Add Cart</button> : <>
              {user ? (
              <label htmlFor="add-cart-modal" className="btn btn-sm">
                Add Cart
              </label>
              ) : (
              <label htmlFor="login-inform-modal" className="btn btn-sm">
                Add Cart
              </label>
             )}
            </>
          }
          </div>
        </div>
      </div>
      <AddCartModal phone={phone} />
      <Modal/>
    </section>
  );
};

export default PhoneDetails;
