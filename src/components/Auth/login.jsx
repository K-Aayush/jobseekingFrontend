import { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import manLaptop from "../../assets/man-laptop.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setIsAuthorized } = useContext(Context);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/base-url/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      Cookies.set("authToken", data.token);
      handleToken();
      setEmail("");
      setPassword("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("this is error:", error);
    }
  };

  const handleToken = () => {
    const token = Cookies.get("authToken");

    if (token) {
      setIsAuthorized(true);
      const decodeToken = jwtDecode(token);
      Cookies.set("role", decodeToken.role);

      if (decodeToken.role === "Employeer") {
        navigate("/employeerOnBoard");
      } else if (decodeToken.role === "Job Seeker") {
        navigate("/jobSeekerOnBoard");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white">
      {/* Left side content */}
      <div className="lg:w-[33%] md:w-[50%] w-full p-8">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
            JOBFINDER
          </h2>
          <p className="text-center mb-2 font-medium tracking-wide">
            Welcome to JOBFINDER!
          </p>
          <span className="block text-center mb-6 text-gray-500">
            Log in to your account.
          </span>

          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder="email@address.com"
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              placeholder="Password (8 or more characters)"
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute block right-0 inset-y-0 px-3 py-2 top-8 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEye size={20} className="text-indigo-700" />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </button>
          </div>

          <p className="block text-center text-md font-semibold mb-4">
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
          >
            LogIn
          </button>

          <p className="block text-center text-md text-gray-500">
            Don`t have an account?{" "}
            <Link to="/register" className="font-semibold text-gray-700">
              Signup
            </Link>
          </p>
        </form>
      </div>

      {/* Right side image */}
      <div className="lg:w-[67%] md:w-[50%] md:flex hidden relative mr-4">
        <img
          src={manLaptop}
          className="border inset-0 w-full h-full object-cover rounded-xl"
          alt="Background"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="lg:text-3xl text-xl text-indigo-700 font-bold mb-4">
              Welcome Back!
            </h3>
            <p className="lg:text-lg text-md text-gray-500 mb-4 font-semibold">
              Forget the old rules. You can have the best people.Access your
              account and continue your journey towards finding the perfect job.
              Your dream job awaits!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
