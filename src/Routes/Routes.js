import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../Dashbord/AddProduct/AddProduct";
import AllSeller from "../Dashbord/AllSeller/AllSeller";
import AllUser from "../Dashbord/AllUser/AllUser";
import Cart from "../Dashbord/Cart/Cart";
import MyProducts from "../Dashbord/MyProducts/MyProducts";
import Payment from "../Dashbord/Payment/Payment";
import Reports from "../Dashbord/Reports/Reports";
import VerifySellerRequest from "../Dashbord/VerifySellerRequest/VerifySellerRequest";
import DashbordLayout from "../Layout/DashbordLayout";
import Main from "../Layout/Main";
import AllPhones from "../Pages/AllPhones/AllPhones";
import Blogs from "../Pages/Blogs/Blogs";
import CatagoryPhones from "../Pages/CatagoryPhones/CatagoryPhones";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import PhoneDetails from "../Pages/PhoneDetails/PhoneDetails";
import Register from "../Pages/Register/Register";
import AdminRoutes from "./AdminRoutes";
import ASellerRoutes from "./ASellerRoutes";
import PrivateRoutes from "./PrivateRoutes";

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
                path:'/phone_details/:id',
                element: <PhoneDetails/>,
                loader: ({params}) => 
                fetch(`http://localhost:5000/all/phones/${params.id}`)
            },
            {
                path:'/catagory/:cataId',
                element: <PrivateRoutes><CatagoryPhones/></PrivateRoutes>,
                loader: ({params}) => 
                fetch(`http://localhost:5000/phones/${params.cataId}`)
            },
            {
                path: '/blogs',
                element: <Blogs/>
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
    },
    {
        path:'/dashbord',
        element: <DashbordLayout/>,
        children: [
            {
                path:'/dashbord',
                element: <PrivateRoutes><Cart/></PrivateRoutes>
            },
            {
                path:'/dashbord/payment/:id',
                element: <PrivateRoutes><Payment/></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/cart/${params.id}`)
            },
            {
                path:'/dashbord/add_product',
                element: <PrivateRoutes>
                            <ASellerRoutes>
                                <AddProduct/>
                            </ASellerRoutes>
                        </PrivateRoutes>
            },
            {
                path:'/dashbord/my_product',
                element: <PrivateRoutes>
                            <ASellerRoutes>
                                <MyProducts/>
                            </ASellerRoutes>
                         </PrivateRoutes>
            },
            {
                path:'/dashbord/reports',
                element: <PrivateRoutes>
                            <AdminRoutes>
                                 <Reports/>
                            </AdminRoutes>
                         </PrivateRoutes>
            },
            {
                path:'/dashbord/all_users',
                element: <PrivateRoutes>
                            <AdminRoutes>
                                <AllUser/>
                            </AdminRoutes>
                         </PrivateRoutes>
            },
            {
                path:'/dashbord/all_sellers',
                element: <PrivateRoutes>
                            <AdminRoutes>
                                <AllSeller/>
                            </AdminRoutes>
                        </PrivateRoutes>
            },
            {
                path:'/dashbord/verify_seller_req',
                element: <PrivateRoutes>
                            <AdminRoutes>
                                <VerifySellerRequest/>
                            </AdminRoutes>
                         </PrivateRoutes>
            },
        ]
    }
])