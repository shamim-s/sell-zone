import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Spinner/Loader';
import { AuthContext } from '../Context/Context';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loader/>
    }

    if(user && user?.email){
        return children
    }
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default PrivateRoutes;