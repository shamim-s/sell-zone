import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import { HiBadgeCheck } from "react-icons/hi";
import axios from 'axios';

const ProfileCard = () => {
    const {user} = useContext(AuthContext);

    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/seller/${user?.email}`)
        .then(res => setIsVerified(res.data.isVerified))
    },[user, isVerified])

    const sendVerifyRequest = () => {

    }

  return (
    <div>
      <div className="flex flex-col justify-center p-6 rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100 mx-auto">
        <img
          src={user.photoURL}
          alt=""
          className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-700">
          <div className="my-2 space-y-1">
            <h2 
              className="text-md font-semibold sm:text-xl flex items-center">
              <span className="mr-1">{user.displayName}</span> 
              {isVerified || <HiBadgeCheck className="text-2xl "/>}
              </h2>
            <p className="px-5 text-xs sm:text-base dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            {isVerified || <button
             onClick={sendVerifyRequest} 
             className="btn btn-xs rounded-sm bg-white text-primary border-0">
              SEND VERIFY REQUEST
              </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
