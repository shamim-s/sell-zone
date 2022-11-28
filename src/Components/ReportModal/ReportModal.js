import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/Context";

const ReportModal = ({report}) => {
const {user} = useContext(AuthContext);

  const handleRepot = phone => {

    const reportItem = {
        reportBy: user.email,
        product: phone.model,
        productId: phone._id,
        seller: phone.seller, 
    }

    console.log(reportItem);
    fetch(`https://sell-zone-server.vercel.app/report`, {
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(reportItem)
    })
    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        console.log(data);
        toast.success('Report sent to Admin');
      }
    })
  }
  return (
    <div>
      <input type="checkbox" id="report-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to repot?
          </h3>
          <div className="modal-action">
            <label htmlFor="report-modal" className="btn btn-sm rounded-sm">
              Cancel
            </label>
            <label onClick={()=> handleRepot(report)} htmlFor="report-modal" className="btn btn-sm rounded-sm bg-red-500 border-0">
              report
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
