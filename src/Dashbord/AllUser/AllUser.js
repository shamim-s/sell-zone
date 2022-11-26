import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllUser = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users/buyers`);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="lg:mt-0 md:mt-4 mt-10">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
   
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                users.map(user => <tr key={user._id}>
                    <th>
                      
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user.img}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user.email}
                    </td>
                    <td><button className="btn btn-xs rounded-sm bg-red-500 border-none">Delete</button></td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
