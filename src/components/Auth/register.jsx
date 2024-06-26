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
      const { data } = await axios.post("http://localhost:4000/api/v1/user/register", { email, password, phone, name, role }, {
        withCredentials: true, headers: {
          "Content-Type": "application/json",
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
      console.log(error);
    }
  };

  if(isAuthorized) {
    return <Navigate to={"/"} />
  }


  return (
    <div>register</div>
  )
}

export default Register