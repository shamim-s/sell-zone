import React, { useState } from "react";
import toast from "react-hot-toast";
import PulseLoader from "../PulseLoader/PulseLoader";

const ProductDeleteModal = ({ deleteProduct, refetch}) => {
    const [loading, setLoading] = useState(false);

    const hadnleProductDelete = id => {
        console.log(id);

        setLoading(true);
        fetch(`https://sell-zone-server.vercel.app/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                console.log(data);
                setLoading(false);
                toast.success('Product Deleted');
                refetch();
            } 
        })
    }

  return (
    <div>
      <input
        type="checkbox"
        id="product-delete-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label
              htmlFor="product-delete-modal"
              className="btn btn-xs border-0 rounded-sm"
            >
              Cancel
            </label>
            <button onClick={()=> hadnleProductDelete(deleteProduct._id)}>
              <label
                htmlFor="product-delete-modal"
                className="btn btn-xs border-0 bg-red-500 rounded-sm"
              >
                {
                    loading ? <PulseLoader/> : 'Delete'
                }
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteModal;
