import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("/base-url/user/logout", { withCredentials: true });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/");
    }
    catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  }

  return (
    <nav className="flex bg-gray-700 p-4 justify-between items-center">
      <Link to="/">
        <div className="font-semibold text-xl text-indigo-600 hover:text-indigo-700 cursor-pointer">
          JOBFINDER
        </div>
      </Link>
      <div className="">
        <ul className="flex space-x-6 text-white">
          <Link to="/">
            <li className="hover:text-gray-400 cursor-pointer text-md">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-gray-400 cursor-pointer">About</li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-gray-400 cursor-pointer">Contact</li>
          </Link>
        </ul>
      </div>
      <div className="space-x-4">
        {isAuthorized ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className=" text-white hover:text-gray-400 transition duration-300"
            >
              Log in
            </button>
            <span className="font-thin text-2xl text-white">|</span>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition duration-300"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header