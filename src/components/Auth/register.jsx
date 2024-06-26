import { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

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

  if(isAuthorized) {
    return <Navigate to={"/"} />
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          className="w-full px-3 py-2 border border-gray-300 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
    </form>
  </div>
  )
}

export default Register