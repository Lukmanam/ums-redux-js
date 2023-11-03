import { Button, Card, Typography, Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
import { userLogin } from "../../../Api/userApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin({ email, password });
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        const { _id, name, email, mobile, image, is_admin } =
          response.data.userData;
        dispatch(
          setUserDetails({
            id: _id,
            name: name,
            mobile: mobile,
            email: email,
            image: image,
            is_admin: is_admin,
          })
        );
        navigate("/");
      } else {
        toast(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-black-500">
<div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg p-8">
      
        <Card color="transparent" shadow={false} className="w-96">
          <Typography variant="h4" color="blue-gray" className="text-left mt-4">
            Sign in
          </Typography>
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              type="email"
              label="Email"
              inputClassName="border-none focus:text-white" // Set label focus color to white
              color="black"
              required
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="lg"
              label="Password"
              inputClassName="border-none focus:text-white text-black" 
              color="black"
              required
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Sign In
            </Button>
            <Typography color="black" className="text-center font-normal">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-900"  >
                Sign Up
              </Link>
            </Typography>
            <ToastContainer />
          </form>
        </Card>
      </div>


      </div>
    
  );
}

export default Login;
