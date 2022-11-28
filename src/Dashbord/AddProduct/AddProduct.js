import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/Context";
import { format} from 'date-fns';
import axios from 'axios';
import Spinner from "../../Components/Spinner/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const {register, handleSubmit} = useForm();
    const {user} = useContext(AuthContext);
    const date = format(new Date(), 'PP');
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://sell-zone-server.vercel.app/seller/${user?.email}`)
        .then(res => setIsVerified(res.data.isVerified))
    },[user, isVerified])



    const handleFormSubmit = data => {
        

        const cataId = data.brand;
        const model = data.model;
        const image = data.img[0];
        const seller = user.displayName;
        const originalPrice = data.originalPrice;
        const sellPrice = data.sellPrice;
        const storage = data.storage;
        const used = data.usedMonth;
        const location = data.location;


        const formData = new FormData()
        formData.append('image', image)

        setLoading(true);
        fetch(`https://api.imgbb.com/1/upload?key=4e1ec518aa0732659004cc615a8fe704`,{
        method:'POST',
        body: formData
        })
        .then(res => res.json())
        .then(data => {
            const img = data.data.display_url;
            
            const phone = {
            cataId,
            img,
            seller,
            sellerEmail: user?.email,
            model,
            originalPrice,
            sellPrice,
            location,
            storage,
            used,
            postDate: date,
            isVerified,
            status: 'available'
            }

            //Add product to database
            fetch(`https://sell-zone-server.vercel.app/add/product`, {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(phone)
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    console.log(data);
                    setLoading(false);
                    toast.success('New Product Added');
                    navigate('/dashbord/my_product');
                }
            })

        })


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
                <button type="submit" className="btn w-full">
                    {
                        loading ? <Spinner/> : 'Submit'
                    }
                </button>
            </div>
      </form>
    </div>
  );
};

export default AddProduct;
