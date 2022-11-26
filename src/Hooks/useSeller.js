import React, { useEffect, useState } from 'react';

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(false);
    
    useEffect(() => {
        if(email){
            fetch(`http://localhost:5000/user/seller/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIsSeller(data.isAdmin);
                setIsSellerLoading(false);
            })
        }
    },[email])
    return [isSeller, isSellerLoading] ;
};

export default useSeller;