import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../Context/Context';
import useSeller from '../Hooks/useSeller';

const RoutesSeller = ({children}) => {
    const {user, loading, logOutUser} = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);

    const location = useLocation();

    if(loading || isSellerLoading){
        return <Spinner/>;
    }

    if(user?.email && isSeller){
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}} replace>
        {logOutUser()}
    </Navigate>
};

export default RoutesSeller;