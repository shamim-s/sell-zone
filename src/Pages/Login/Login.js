import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/Context";
import toast from "react-hot-toast";
import Spinner from "../../Components/Spinner/Spinner";
import useVerifyUser from "../../Hooks/useVerifyUser";

const Login = () => {
    const {user, setUser, loginUser, googleSignin} =  useContext(AuthContext);
    const [viewPassword, setViewPassword] = useState(false);
    const {register, handleSubmit, errors} = useForm();

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useVerifyUser(loginUserEmail);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    

    if(token){
      navigate(from, {replace: true});
    }
    const handleLogin = data => {
        const email = data.email;
        const password = data.password;

        setLoading(true);
        loginUser(email, password)
        .then(result => {
            const user = result.user;
            setLoginUserEmail(user.email);
            setUser(user);
            toast.success("Login Success");
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        })
    }

    const handleGoogleSignin = () => {
        googleSignin()
        .then(result => {
          const user = result.user;
          console.log(user);

          const newUser = {
            email: user.email,
            img: user.photoURL,
            name: user.displayName,
          };

        //   console.log(newUser);

        //   setUser(user);
          //save to db
          fetch(`https://sell-zone-server.vercel.app/add/newuser`,{
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newUser)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            toast.success('Signin Success');
            navigate('/');
          })
          
        })
        .catch(err => {
          console.log(err);
          toast.error(err.message);
        })
      }
  return (
    <div className="mt-10 mb-10">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-900 dark:text-gray-100 mx-auto">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center dark:text-gray-400">
          Dont have account?
          <Link to={'/register'}
            href="#"
            rel="noopener noreferrer"
            className="focus:underline hover:underline"
          >
            Sign up here
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogleSignin}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-sky-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-400" />
          <p className="px-3 dark:text-gray-400">OR</p>
          <hr className="w-full dark:text-gray-400" />
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-8 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={''}
                {...register('email', {required: 'User email is required'})}
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
                data-temp-mail-org="2"
              />
            </div>
            <div className="space-y-2 relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type={viewPassword ? "text" : "password"}
                name="password"
                id="password"
                defaultValue={''}
                {...register('password', {required: 'User password is required'})}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-sky-400"
              />
                <span className="absolute right-4 top-7">
                {
                viewPassword ?
                    <FaRegEyeSlash className="text-2xl" onClick={()=>setViewPassword(false)}/>
                : 
                    <FaRegEye className="text-2xl" onClick={()=> setViewPassword(true)}/>
                }
                </span>
            </div>
          </div>
          <button
            type="submit"
            className="btn w-full px-8 py-3 font-semibold rounded-md dark:bg-sky-400 dark:text-gray-900"
          >
            {
                loading ? <Spinner/> : 'Sign in'
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
