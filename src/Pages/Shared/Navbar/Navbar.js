import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/Context";

const Navbar = () => {
  const {user, logOutUser} = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser()
    .then(() => {
        toast.success("Logout Success");
    })
    .catch(err => {
      console.log(err);
      toast.error(err.message);
    })
  }

  return (
    <div >
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={'/'} className="font-semibold">HOME</Link>
              </li>
              <li>
                <Link to={'/all_phones'} className="font-semibold">PRODUCTS</Link>
              </li>
              <li>
                <Link className="font-semibold">DASHBORD</Link>
              </li>
              <li>
                {
                  user?.email ? <Link onClick={handleLogout} to={'/login'} className="font-semibold">LOGOUT</Link> :
                  <Link to={'/login'} className="font-semibold">LOGIN</Link>
                }
              </li>
            </ul>
          </div>
          <Link 
            to={'/'} 
            className="btn btn-ghost font-bold text-xl">
                SELL<span className="text-orange-500 ml-2">ZONE</span>
            </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
          <li>
                <Link to={'/'} className="font-semibold">HOME</Link>
              </li>
              <li>
                <Link to={'/all_phones'} className="font-semibold">PRODUCTS</Link>
              </li>
              <li>
                <Link className="font-semibold">DASHBORD</Link>
              </li>
              <li>
                {
                  user?.email ? <Link onClick={handleLogout} to={'/login'} className="font-semibold">LOGOUT</Link> :
                  <Link to={'/login'} className="font-semibold">LOGIN</Link>
                }
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
