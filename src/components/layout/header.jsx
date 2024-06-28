import { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
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
    <div>Header</div>
  )
}

export default Header