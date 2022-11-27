import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import DeleteSellerModal from "../../Components/DeleteSellerModal/DeleteSellerModal";

const AllSeller = () => {
  const [sellers, setSellers] = useState([]);
  const [deleteSeller, setDeleteSeller] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/sellers`)
      .then((res) => setSellers(res.data));
  }, [sellers, deleteSeller]);

  return (
    <div className="lg:mt-0 md:mt-8 mt-12">
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
            {sellers.map((seller) => (
              <tr key={seller._id}>
                <th></th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={seller.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <p>
                      <span className="font-bold">{seller.name}</span>
                    </p>
                  </div>
                </td>
                <td>{seller.email}</td>
                <td>
                  {" "}
                  <label onClick={() => setDeleteSeller(seller)} htmlFor="delete-seller-modal" className="">
                  <FaTrashAlt className="text-xl text-red-500 cursor-pointer transition-all hover:text-slate-800" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
        <DeleteSellerModal deleteSeller={deleteSeller} />
      </div>
    </div>
  );
};

export default AllSeller;
