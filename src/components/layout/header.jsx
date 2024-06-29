import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="flex bg-gray-700 p-4 justify-between items-center">
        <Link to="/">
          <div className="font-semibold text-xl text-indigo-600 hover:text-indigo-700 cursor-pointer">
            JOBFINDER
          </div>
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <AiOutlineMenu size={24} />
          </button>
        </div>


        <ul className="hidden md:flex space-x-6 text-white">
          <Link to="/">
            <li className="hover:text-gray-400 cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:text-gray-400 cursor-pointer">About</li>
          </Link>
          <Link to="/contact">
            <li className="hover:text-gray-400 cursor-pointer">Contact</li>
          </Link>
        </ul>

        <div className="hidden md:flex space-x-4">
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

      {/* sidebar */}
      <div
        className={`fixed top-0 left-0 w-full bg-gray-800 h-full z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between">
          <div className="p-4 font-semibold text-xl text-indigo-600 hover:text-indigo-700 cursor-pointer ">
            JOBFINDER
          </div>
          <div className="p-4">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <AiOutlineClose size={24} />
            </button>
          </div>
        </div>

        <div className="m-auto">
          <ul className="space-y-6 text-white p-4 flex flex-col items-center">
            <Link to="/" onClick={toggleMenu}>
              <li className="hover:text-gray-400 cursor-pointer text-lg">Home</li>
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              <li className="hover:text-gray-400 cursor-pointer text-lg">About</li>
            </Link>
            <Link to="/contact" onClick={toggleMenu}>
              <li className="hover:text-gray-400 cursor-pointer text-lg">Contact</li>
            </Link>
          </ul>

          <div className="p-4">
            {isAuthorized ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 text-white text-lg px-4 py-2 rounded-2xl hover:bg-red-700 transition duration-300 w-full"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                  className="text-white text-lg hover:text-gray-400 transition duration-300 w-full mb-4"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    toggleMenu();
                  }}
                  className="bg-green-500 text-white text-lg px-4 py-2 rounded-2xl hover:bg-green-700 transition duration-300 w-full"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  )
}

export default Header