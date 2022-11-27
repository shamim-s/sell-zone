import React from "react";
import toast from "react-hot-toast";

const DeleteUserModal = ({ deleteUser }) => {

  const handleDeleteUser = (user) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          console.log(data);
          toast.success("User Deleted");
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="delete-user-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
        <h3 className="font-bold text-lg">
            Are you sure to Delete User <span className="text-red-500"> {deleteUser.name}</span>?
          </h3>
          <div className="modal-action">
            <label htmlFor="delete-user-modal" className="btn btn-xs rounded-sm">
              Cancel
            </label>
            <button onClick={() => handleDeleteUser(deleteUser)}>
              <label htmlFor="delete-user-modal" className="btn btn-xs bg-red-500 rounded-sm border-0">
                Delete
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
