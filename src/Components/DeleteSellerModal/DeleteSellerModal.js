import React from "react";
import toast from "react-hot-toast";

const DeleteSellerModal = ({deleteSeller}) => {

    const handleDeleteSeller = seller => {

        fetch(`https://sell-zone-server.vercel.app/sellers/${seller._id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                console.log(data);
                toast.success('Seller Deleted');
            }
        })
    }
  return (
    <div>
      <input type="checkbox" id="delete-seller-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to Delete seller <span className="text-red-500"> {deleteSeller.name}</span>?
          </h3>
          <div className="modal-action">
            <label htmlFor="delete-seller-modal" className="btn btn-xs rounded-sm">
              Cancel
            </label>
            <button onClick={() => 
                handleDeleteSeller(deleteSeller)}>
            <label htmlFor="delete-seller-modal" className="btn btn-xs rounded-sm bg-red-500 border-0">
              Delete
            </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSellerModal;
