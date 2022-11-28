import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import { HiBadgeCheck } from "react-icons/hi";
import { format} from 'date-fns';
import axios from 'axios';
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { async } from "@firebase/util";
import useSeller from "../../Hooks/useSeller";

const ProfileCard = () => {
    const date = format(new Date(), 'PP');
    const {user} = useContext(AuthContext);
    const [isVerified, setIsVerified] = useState(false);
    const [isSeller] = useSeller(user?.email);

    console.log(isSeller.isSeller);


    useEffect(() => {
        axios.get(`http://localhost:5000/seller/${user?.email}`)
        .then(res => setIsVerified(res.data.isVerified))
    },[user, isVerified])


    // useEffect(() => {
    //   axios.get(`http://localhost:5000/seller/request/${user?.email}`)
    //   .then(res => setIsPending(res.data.isPending))
    // },[user, isPending])

    const {data, refetch} = useQuery({
      queryKey: ['isPending'],
      queryFn: async () => {
        const res = await fetch(`http://localhost:5000/seller/request/${user?.email}`)
        const data = await res.json();
        return data;
      }
    })

    refetch();

    const sendVerifyRequest = () => {

        const seller = {
          seller: user?.email,
          name: user?.displayName,
          date,
        }

      fetch(`http://localhost:5000/seller/verify_req`, {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(seller)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.acknowledged){
          toast.success('Request Sent!');
        }
      })

      refetch();
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
              className={`text-md font-semibold sm:text-xl items-center ${isVerified && 'flex'}`}>
              <span className="mr-1">{user.displayName}</span> 
              {isVerified && <HiBadgeCheck className="text-2xl"/>}
              </h2>
            <p className="px-5 text-xs sm:text-base dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            {
              isSeller.isSeller === true && <>
              {isVerified || <>
              {
                data?.isPending ? <p className="bg-white text-primary px-2 font-semibold rounded-sm">PENDING</p>
                 :
                 <button
                onClick={sendVerifyRequest} 
                className="btn btn-xs rounded-sm bg-white text-primary border-0">
                 SEND VERIFY REQUEST
                 </button>
              }
            </>}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
