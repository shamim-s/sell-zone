import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import DeleteUserModal from "../../Components/DeleteUserModal/DeleteUserModal";
const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/buyers`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
        }
      })
      .then((res) => setUsers(res.data));

  //   fetch(`http://localhost:5000/users/buyers`, {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
  //         }
  //       })
  //       .then(res => res.json())
  //       .then(data => setUsers(data));
  
  }, [users, deleteUser]);

  return (
    <div className="lg:mt-0 md:mt-4 mt-10">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th></th>
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
                    <p>
                      <span className="font-bold">{user.name}</span>
                    </p>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <label onClick={() => setDeleteUser(user)} htmlFor="delete-user-modal" className="">
                    <FaTrashAlt className="text-xl text-red-500 cursor-pointer transition-all hover:text-gray-800" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DeleteUserModal deleteUser={deleteUser}/>
      </div>
    </div>
  );
};

export default AllUser;
