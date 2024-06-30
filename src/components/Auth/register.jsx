import { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import grayimage from "../../assets/grayimage.png";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/base-url/user/register", { email, password, phone, name, role }, {
        withCredentials: true, headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("this is error:", error);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />
  }


  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white">
      {/* Left side content */}
      <div className="lg:w-[33%] md:w-[50%] w-full p-8">
        <form onSubmit={handleRegister}>
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">JOBFINDER</h2>
          <p className="text-center mb-2 font-medium tracking-wide">Welcome to JOBFINDER!</p>
          <span className="block text-center mb-6 text-gray-500">Create an account</span>

          <div className="flex justify-between w-full gap-2">
            <div className="mb-4 md:mb-2 w-[50%]">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">Name</label>
              <input
                placeholder="Enter Your Name"
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 md:mb-2 w-[50%]">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="role">Role</label>
              <select

                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="Employeer">Employeer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>
          </div>

          <div className="mb-4 md:mb-2">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email</label>
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

          <div className="mb-4 md:mb-2 relative">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">Password</label>
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
              {showPassword ? <FaRegEye size={20} className="text-indigo-700" /> : <FaRegEyeSlash size={20} />}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="phone">Phone</label>
            <input
              placeholder="Enter Your Phone Number"
              type="number"
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <p className="block text-center text-md font-semibold mb-4">Forgot password?</p>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-blue-700 mb-4">
            Register
          </button>

          <p className="block text-center text-md text-gray-500">Already have an account? <Link to="/login" className="font-semibold text-gray-700">LogIn</Link></p>
        </form>
      </div>

      {/* Right side image */}
      <div className="lg:w-[67%] md:w-[50%] md:flex hidden relative mr-4">
        <img src={grayimage} className="border inset-0 w-full h-full object-cover rounded-xl" alt="Background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="lg:text-3xl text-xl font-bold mb-4">Find Your Dream Job Today</h3>
            <p className="lg:text-lg text-md mb-4">Forget the old rules. You can have the best people.
              Right now. Right here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register