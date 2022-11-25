import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AllPhones from "../Pages/AllPhones/AllPhones";
import CatagoryPhones from "../Pages/CatagoryPhones/CatagoryPhones";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path:'/all_phones',
                element: <AllPhones/>
            },
            {
                path:'/catagory/:cataId',
                element: <CatagoryPhones/>,
                loader: ({params}) => 
                fetch(`http://localhost:5000/phones/${params.cataId}`)
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    }
])