import React, { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get(`https://sell-zone-server.vercel.app/reports/all`)
        .then(res => setReports(res.data))
    },[])

    const handleDelete = deleteItem => {
        
        fetch(`https://sell-zone-server.vercel.app/report/delete`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('userAccessToken')}`

            },
            body: JSON.stringify(deleteItem)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                console.log(data);
                toast.success("Report item deleted");
            }
        })
    }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Seller</th>
              <th>Reported By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                reports.map((report, i) => <tr key={report._id}>
                <th>{i + 1}</th>
                <td>{report.product}</td>
                <td>{report.seller}</td>
                <td>{report.reportBy}</td>
                <td>
                    <span onClick={()=>handleDelete(report)} className="btn btn-xs bg-red-500 rounded-sm border-0">Delete Item</span>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
