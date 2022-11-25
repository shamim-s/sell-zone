import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../Context/Context";

const Register = () => {
  const { register, formState:{errors}, handleSubmit , reset} = useForm();

  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {googleSignin, setUser, createNewUser, updateUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = data => {

    const name = data.name;
    const email = data.email;
    const password = data.password;
    const selectedValue = data.select;
    const image = data.img[0];

    const formData = new FormData()
    formData.append('image', image);


    setLoading(true);
    fetch(`https://api.imgbb.com/1/upload?key=4e1ec518aa0732659004cc615a8fe704`,{
        method:'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.data.display_url);
        const userImage = data.data.display_url;

        // Creating user here
        createNewUser(email, password)
        .then(result => {
            const user = result.user;

            // Updaing user name and image
            updateUser(name, userImage)
            .then(() => {

                const userData = {
                    name,
                    email,
                    role: selectedValue,
                    img: user.photoURL
                }

                //add user in database
                fetch(`http://localhost:5000/add_user`, {
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setUser(user);
                    toast.success('Register Successfully');
                    navigate('/');
                    console.log(user);
                    setLoading(false);
                    reset();
                })
            })
            .catch(err => {
                console.error(err);
                toast.error(err.message);
            })

        })
        .catch(err => {
            console.error(err);
            toast.error(err.message);
        })

    })
  }

  const handleGoogleSignin = () => {
    googleSignin()
    .then(result => {
      const user = result.user;
      setUser(user);
      toast.success('Login Success');
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      toast.error(err.message);
    })
  }
  return (
    <div className="mt-10 mb-10">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100 mx-auto">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Create new account
        </h2>
        <p className="text-sm text-center dark:text-gray-400">
          Alreadt have an account?
          <Link
            to={"/login"}
            href="#"
            rel="noopener noreferrer"
            className="focus:underline hover:underline"
          >
            Sign in
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogleSignin}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-sky-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-400" />
          <p className="px-3 dark:text-gray-400">OR</p>
          <hr className="w-full dark:text-gray-400" />
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-8 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={""}
                {...register('name', {required:'Name is required'})}
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
                data-temp-mail-org="2"
              />
                {
                    errors.name &&
                    <p className="text-red-500" role="alert">
                      {errors.name?.message}
                    </p>
                }
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={""}
                {...register('email', {required:'Email is required'})}
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
                data-temp-mail-org="2"
              />
              {
                    errors.email &&
                    <p className="text-red-500" role="alert">
                      {errors.email?.message}
                    </p>
                }
            </div>

            <div className="space-y-2">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-full  mb-2">
                  <label htmlFor="" className="text-left">
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
                {
                    errors.img &&
                    <p className="text-red-500" role="alert">
                      {errors.img?.message}
                    </p>
                }
              </div>
            </div>

            <div className="space-y-2">
              <select
                name="select"
                id="select"
                className="select select-bordered w-full mt-4"
                required
                {...register('select', {required:'select is required'})}
              >

                <option value='' selected>Please Select One</option>
                <option value={'buyer'}>Buyer</option>
                <option value={'seller'}>Seller</option>
              </select>
              {
                    errors.select &&
                    <p className="text-red-500" role="alert">
                      {errors.select?.message}
                    </p>
                }
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                id="password"
                defaultValue={""}
                {...register('password', {required: 'Password is required', minLength: {
                    value: 6,
                    message: "Password must be 6 caharacter or more",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(.*[a-z])/,
                    message: "Password must be stonger",
                  },
                })}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
              />
              <span className="absolute right-4 top-7">
                {viewPassword ? (
                  <FaRegEyeSlash
                    className="text-2xl"
                    onClick={() => setViewPassword(false)}
                  />
                ) : (
                  <FaRegEye
                    className="text-2xl"
                    onClick={() => setViewPassword(true)}
                  />
                )}
              </span>
              {errors.password && (
              <p className="text-red-500" role="alert">
                {errors.password?.message}
              </p>
            )}
            </div>
          </div>
          <button
            type="submit"
            className="btn w-full px-8 py-3 font-semibold rounded-md dark:bg-sky-400 dark:text-gray-900"
          >
            {
                loading ? <Spinner/> : 'Sign Up'
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
