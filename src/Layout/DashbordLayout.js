import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { FaChevronRight } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Context/Context";

const DashbordLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile relative">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-4">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden absolute top-3 left-0 btn-sm rounded-r-full"
          >
            <FaChevronRight className="text-xl"/>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-primary text-white">
            <li>
              <Link>Cart</Link>
            </li>
            <li>
              <Link to={'/dashbord/add_product'}>Add New Product</Link>
            </li>
            <li>
              <Link to={'/dashbord/my_product'}>My Products</Link>
            </li>
            {
              isAdmin && <>
              <li>
              <Link to={'/dashbord/all_users'}>All Users</Link>
            </li>
            <li>
              <Link to={'/dashbord/all_sellers'}>All Sellers</Link>
            </li>
            <li>
              <Link to={'/dashbord/reports'}>Reports</Link>
            </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashbordLayout;
