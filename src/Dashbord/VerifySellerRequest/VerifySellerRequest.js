import { useQuery } from "@tanstack/react-query";
import React from "react";

const VerifySellerRequest = () => {
    const {data: requests = [], refetch} = useQuery({
        queryKey: ['verifyRequest'],
        queryFn: async () => {
            const res = await fetch(`https://sell-zone-server.vercel.app/verify/request`);
            const data = await res.json();
            return data;
        }
    })

    const handleAccept = (email, id) => {
        fetch(`https://sell-zone-server.vercel.app/request/accept/${email}`, {
            method:'PUT',
            headers: {
              authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            handleDelete(id);
        })

    }

    //after verify delete request from db collection
    const handleDelete = (id) => {
        fetch(`https://sell-zone-server.vercel.app/request/delete/${id}`,{
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
          }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            refetch();
        })
    }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Verify Seller Request</h1>
      <div className="overflow-x-auto lg:mt-0 md:mt-8 mt-12">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Seller Name</th>
              <th>Email</th>
              <th>Request Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                requests.map((request, i) => <tr key={request._id}>
                    <th>{i + 1}</th>
                    <td>{request.name}</td>
                    <td>{request.seller}</td>
                    <td>{request.date}</td>
                    <td>
                        <button 
                            onClick={()=> handleAccept(request.seller, request._id)}
                            className="btn btn-xs bg-primary rounded-sm border-0">Accept</button>
                    </td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifySellerRequest;
