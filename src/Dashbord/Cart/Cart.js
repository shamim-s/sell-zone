import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Context";

const Cart = () => {
  const [items, setItems] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://sell-zone-server.vercel.app/cart/products/${user?.email}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setItems(data);
    })
  },[user?.email])

  return (
    <div className="overflow-x-auto lg:mt-0 md:mt-8 mt-12">
      {
        items.length === 0 && <span>
            No product added
        </span>
      }
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Model</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Pay</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((item, i) => <tr key={item._id}>
            <th>{i + 1}</th>
            <td>{item.model}</td>
            <td>{item.price}</td>
            <td>{item.user}</td>
            <td>
              {
                item.paid ? <Link disabled={item.paid} to={`/dashbord/payment/${item._id}`} className="btn btn-xs bg-primary rounded-sm border-0">Pay Now</Link> :
                <Link to={`/dashbord/payment/${item._id}`} className="btn btn-xs bg-primary rounded-sm border-0">Pay Now</Link>
              }
            </td>
            {
              item.paid &&
              <td>
                <span className="text-red-400">sold</span>
              </td>
            }
          </tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
