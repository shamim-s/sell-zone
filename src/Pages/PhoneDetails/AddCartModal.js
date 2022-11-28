import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/Context";

const AddCartModal = ({phone}) => {
    const {user} = useContext(AuthContext);

    const handleCartSubmit = event => {
        event.preventDefault();

        const cartItem = {
            user: user?.displayName,
            email: user?.email,
            model: phone.model,
            price: phone.sellPrice,
            id: phone._id,
        }

        fetch(`https://sell-zone-server.vercel.app/addCart` ,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('Added to Cart');
                console.log(data);
            }
        })
    }

  return (
    <div>
      <input type="checkbox" id="add-cart-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          
        <form
          onSubmit={handleCartSubmit}
          className="space-y-8 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <input
                id="name"
                defaultValue={user?.displayName}
                readOnly
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
                data-temp-mail-org="2"
              />
            </div>
            <div className="space-y-2">
              <input
                id="email"
                defaultValue={user?.email}
                readOnly
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
                data-temp-mail-org="2"
              />
            </div>
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={phone.model}
                readOnly
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
                data-temp-mail-org="2"
              />
            </div>
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={phone.sellPrice}
                readOnly
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
                data-temp-mail-org="2"
              />
            </div>
          </div>
          <button type="submit" className="modal-action w-full">
            <label htmlFor="add-cart-modal" className="btn w-full">
              SUBMIT
            </label>
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AddCartModal;
