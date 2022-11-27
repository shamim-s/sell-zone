import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, version } from "react";
import ProductDeleteModal from "../../Components/ProductDeleteModal/ProductDeleteModal";
import { AuthContext } from "../../Context/Context";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [deleteProduct, setDeleteProduct] = useState({});

  const { data: products = [], refetch } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/my_products/${user?.email}`
      );

      const data = await res.json();
      return data;
    },
  });

  const handleDelete = (product) => {};

  return (
    <div>
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
                <th>Advertise</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (<>
                <tr key={product._id}>
                  <th>{i + 1}</th>
                  <td>{product.model}</td>
                  <td>{product.cataId}</td>
                  <td>{product.postDate}</td>
                  <td>
                    {product?.status === "available" ? (
                      <button className="btn btn-xs bg-primary rounded-none border-0">
                        Advertise
                      </button>
                    ) : (
                      <button className="btn btn-xs bg-primary rounded-none border-0">
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
                <ProductDeleteModal refetch={refetch} deleteProduct={deleteProduct}/>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
