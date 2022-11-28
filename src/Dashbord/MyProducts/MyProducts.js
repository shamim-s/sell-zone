import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import ProductDeleteModal from "../../Components/ProductDeleteModal/ProductDeleteModal";
import { AuthContext } from "../../Context/Context";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [deleteProduct, setDeleteProduct] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://sell-zone-server.vercel.app/my_products/${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setProducts(data);
    })
  },[deleteProduct, user])


  const { data: advertise = [], refetch} = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch(`https://sell-zone-server.vercel.app/advertise/item`);
      const data = await res.json();
      return data;
    },
  });
  const advertiseItem = advertise[0];

  const handleAdvertise = (product) => {

    const advertiseItem = {
      model: product.model,
      cataId: product.cataId,
      img: product.img,
      status: product.status,
      productId: product._id
    }

    fetch(`https://sell-zone-server.vercel.app/advertise/add`, {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(advertiseItem)
    })
    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        fetch(`https://sell-zone-server.vercel.app/advertise/start/${product._id}`, {
          method: 'PUT'
        })
        .then(res => res.json())
        .then(data => {
          if(data.acknowledged){
            console.log(data);
            toast.success('Product added to Advertise');
          }
        })
      }
    })
  }

  const handleStopAdvertise = (product) => {
    
    //Stop Advertise
    fetch(`https://sell-zone-server.vercel.app/advertise/stop/${product._id}`, {
      method: 'PUT'
    })
    .then(res => res.json())
    .then(data => {

      //Delete advertise data from database
        fetch(`https://sell-zone-server.vercel.app/advertise/delete`, {
        method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
          if(data.acknowledged){
            console.log(data);
            toast.success('Advertise stopped');
          }
        })
    })
  }

  return (
    <div className="mt-8">
      <h1>My Products</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Model</th>
                <th>Category</th>
                <th>Post Date</th>
                <th>Status</th>
                <th>Advertise</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>{product.model}</td>
                  <td>{product.cataId}</td>
                  <td>{product.postDate}</td>
                  <td>{product.status}</td>
                  <td>
                    {product?.status === "available" ? (
                      <>
                      {
                        product?.isAdvertising ? <button 
                        onClick={() => handleStopAdvertise(product)} className="btn btn-xs bg-red-500 rounded-sm border-0">Stop Advertise</button>
                        :
                        <button 
                        disabled={advertiseItem?.productId !== product?._id && advertise.length === 1}
                        onClick={() => handleAdvertise(product)} className="btn btn-xs bg-primary rounded-none border-0">
                        Advertise
                        </button>
                      }
                      </>
                    ) : (
                      <button 
                      disabled={product.status !== 'available'}
                      className="btn btn-xs bg-primary rounded-none border-0">
                        Advertise
                      </button>
                    )}
                  </td>
                  <td>
                    <label htmlFor="product-delete-modal" 
                            onClick={() => setDeleteProduct(product)}
                            className="btn btn-xs bg-red-500 border-0 rounded-sm">
                            Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ProductDeleteModal refetch={refetch} deleteProduct={deleteProduct}/>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
