import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
import { userSignup } from "../../../Api/userApi";

const Signup = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "") {
        toast("please enter your email");
      } else if (number.trim() === "") {
        toast("pleas enter your number ");
      } else if (email.trim() === "") {
        toast("pleace enter your email");
      } else if (password.trim() === "") {
        toast("pleace enter your password");
      } else {
        const response = await userSignup({ name, number, email, password });
        if (response.data.status) {
          localStorage.setItem("token", response.data.token);
          const { _id, email, name, mobile, image, is_admin } =
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
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-white-500">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <Card color="transparent" shadow={false} className="w-96">
          <Typography variant="h4" color="blue-gray" className="text-left mt-4">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="mb-4 flex flex-col gap-6 ">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
                label="Name"
                inputClassName="border-none"
                color="black"
                required
              />
              <Input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                size="lg"
                label="Number"
                inputClassName="border-none"
                color="black"
                required
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
                label="Email"
                inputClassName="border-none"
                color="black"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                size="lg"
                label="Password"
                inputClassName="border-none"
                labelClassName="text-black"
                color="black"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Register
            </Button>
            <Typography color="black" className="text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-900">
                Sign In
              </Link>
            </Typography>
          </form>
          <ToastContainer />
        </Card>
      </div>
    </div>
  );
};

export default Signup;
