import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../Context/Context';
import useAdmin from '../Hooks/useAdmin';

const AdminRoutes = ({children}) => {
    const {user, loading, logOutUser} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    const location = useLocation();

    if(loading || isAdminLoading){
        return <Spinner/>;
    }

    if(user?.email && isAdmin){
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}} replace>
        {logOutUser()}
    </Navigate>

};

export default AdminRoutes;