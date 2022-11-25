import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { HiChip, HiOutlineDatabase } from "react-icons/hi";

const PhoneDetails = () => {
    const phone = useLoaderData();
    const {img, originalPrice, sellPrice, seller, storage, used, location, model, chipset, postDate} = phone;

    return (
        <section className='lg:pl-16 lg:pr-16 mt-10 mb-10'>
            <div className='lg:flex'>
                <div>
                    <img src={img} className="w-96" alt="" />
                </div>
                <div className='lg:p-0 md:p-4 p-6'>
                    <h1 className='text-3xl font-semibold'>{model}</h1>
                    <h1 className='text-xl flex items-center mt-2'>
                        <HiChip className='text-2xl'/>  {chipset}
                    </h1>
                    <h1 className='text-xl flex items-center mt-2'>
                        <HiOutlineDatabase className='text-2xl'/>  {storage}
                    </h1>
                    <hr className='mt-2 mb-4'/>
                    <p className='mb-2'>
                        <span className='font-semibold'>Original Price:</span> {originalPrice} BDT
                    </p>
                    <p className='mb-2'>
                        <span className='font-semibold'>Selling Price:</span> {sellPrice} BDT
                    </p>
                    <p className='mb-2'>
                        <span className='font-semibold'>Seller:</span> {seller}
                    </p>
                    <p className='mb-2'>
                        <span className='font-semibold'>Location:</span> {location}
                    </p>
                    <p className='mb-2'>
                        <span className='font-semibold'>Used:</span> {used}
                    </p>
                    <p className='mb-2'>
                        <span className='font-semibold'>Post Date:</span> {postDate}
                    </p>
                   <div className='mt-5'>
                        <button className='btn btn-sm'>ADD CART</button>
                   </div>
                </div>
            </div>
        </section>
    );
};

export default PhoneDetails;