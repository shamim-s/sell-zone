import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../Context/Context';
import useSeller from '../Hooks/useSeller';

const ASellerRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isSeller , isLoading] = useSeller(user?.email);

    const location = useLocation();
    
    if(loading || isLoading){
        return <Spinner/> ;
    }

    if(user?.email && isSeller){
        return children;
    }

    return <Navigate to={'/login'} state={{from:location}} replace>
           </Navigate>
};

export default ASellerRoutes;