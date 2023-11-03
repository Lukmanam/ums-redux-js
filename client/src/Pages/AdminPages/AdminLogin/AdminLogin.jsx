import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
import { Adminsignin } from "../../../Api/adminApi";

export default function AdminLogin() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = value;
      if (email.trim() === "") {
        toast.info("please enter your email");
      } else if (password.trim() === "") {
        toast.info("please enter your password");
      } else {
        const response = await Adminsignin(value);
        if (response.data.status) {
          localStorage.setItem("admintoken", response.data.token);
          dispatch(
            setUserDetails({
              id: response.data.adminData._id,
              name: response.data.adminData.name,
              email: response.data.adminData.email,
              mob: response.data.adminData.mob,
              is_admin: response.data.adminData.is_admin,
              image: response.data.adminData.image,
            })
          );
          navigate("/admin/dashboard");
        } else {
          toast.error(response.data.alert);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 to-jelly-500 backdrop-blur-md">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Admin Sign In
        </h2>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
