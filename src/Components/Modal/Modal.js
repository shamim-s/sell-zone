import React from "react";
import { Link } from "react-router-dom";

const Modal = () => {
  return (
    <div>
      <input type="checkbox" id="login-inform-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Oops!, Please Login first to add cart......
          </h3>
          <div className="modal-action">
            <Link to={'/login'}>
              <label htmlFor="login-inform-modal" className="btn btn-sm">
                Login?
              </label>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
