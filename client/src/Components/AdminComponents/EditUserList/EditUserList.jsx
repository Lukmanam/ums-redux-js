import { Card, Input, Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import { editUserData, updateUser } from "../../../Api/adminApi";

const EditUserList = () => {
  const [value, setValue] = useState({
    name: "",
    number: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await editUserData(id);
        const { name, mobile, email } = response.data.userData;
        setValue({ name: name, number: mobile, email: email });
      } catch (error) {
        console.log(error.message);
      }
    };
    userData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(id, value);
      if (response.data.userData) {
        toast.success(response.data.alert);
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center pt-4">
      <Card
        color="transparent"
        shadow={false}
        className="w-80 max-w-screen-lg sm:w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-gray-700 mt-4 mb-6">
          Edit User Details
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 mb-2">
          <div className="mb-4 space-y-4">
            <Input
              name="name"
              value={value.name}
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Name"
            />
            <Input
              name="number"
              value={value.number}
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Number"
            />
            <Input
              name="email"
              value={value.email}
              onChange={(e) =>
                setValue({ ...value, [e.target.name]: e.target.value })
              }
              size="lg"
              label="Email"
            />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </div>
          <ToastContainer />
        </form>
      </Card>
    </div>
  );
};

export default EditUserList;
