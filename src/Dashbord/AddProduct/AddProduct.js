import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/Context";
import { format} from 'date-fns';
import axios from 'axios';

const AddProduct = () => {
    const {register, handleSubmit} = useForm();
    const {user} = useContext(AuthContext);
    const date = format(new Date(), 'PP');

    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/seller/${user?.email}`)
        .then(res => setIsVerified(res.data.isVerified))
    },[user, isVerified])



    const handleFormSubmit = data => {
        

        const cataId = data.brand;
        const model = data.model;
        const img = data.img[0];
        const seller = user.displayName;
        const originalPrice = data.originalPrice;
        const sellPrice = data.sellPrice;
        const storage = data.storage;
        const used = data.usedMonth;

        const phone = {
            cataId,
            img,
            seller,
            model,
            originalPrice,
            sellPrice,
            storage,
            used,
            postDate: date,
            isVerified
        }
        console.log(phone);
    }

  return (
    <div className="lg:mt-0 md:mt-8 mt-12">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Model</span>
          </label>
          <input
            type="text"
            required
            name="model"
            id="model"
            {...register('model', {required: 'Phone Model is required'})}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Chipset</span>
          </label>
          <input
            type="text"
            required
            name="chipset"
            {...register('chipset', {required: 'chipset'})}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Original Price</span>
          </label>
          <input
            type="text"
            required
            name="originalPrice"
            {...register('originalPrice', {required: 'Original Price required'})}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Sell Price</span>
          </label>
          <input
            type="text"
            required
            name="sellPrice"
            {...register('sellPrice', {required: 'sell Price required'})}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Storage</span>
          </label>
          <input
            type="text"
            required
            name="storage"
            {...register('storage', {required: 'storage required'})}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            required
            name="location"
            {...register('location', {required: 'location required'})}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Total Used Month</span>
          </label>
          <input
            required
            name="usedMonth"
            type="text"
            {...register('usedMonth', {required: 'used Month required'})}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <label htmlFor="" className="label">Brand</label>
          <select required 
            name="brand"
            {...register('brand', {required: 'brand required'})}
            className="select select-bordered w-full max-w-xs">
            <option value='' selected>
              Please Select One
            </option>
            <option value='apple_iphone'>Apple</option>
            <option value='xiaomi_phones'>Xiaomi</option>
            <option value='samsung_phone'>Samsung</option>
          </select>
        </div>

        <div className="">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-full">
                  <label htmlFor="" className="label text-left">
                    Image
                  </label>
                </div>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input 
                    id="dropzone-file" 
                    name="img" 
                    type="file" 
                    {...register('img', {required:'Image is required'})}
                    accept="image/*"
                    className="hidden" />
                </label>
              </div>
            </div>

            <div className="lg:col-span-3">
                <button type="submit" className="btn w-full">Submit</button>
            </div>
      </form>
    </div>
  );
};

export default AddProduct;
