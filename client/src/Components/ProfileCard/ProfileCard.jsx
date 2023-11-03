import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  
  import { useDispatch, useSelector } from "react-redux";
  import { useState } from "react";
  
  import { setUserDetails } from "../../Redux/UserSlice/UserSlice";
  import { userImage } from "../../Api/userApi";
  
  const ProfileCard = () => {
    const [images, setImage] = useState(null);
    const dispatch = useDispatch();
    const { id, name, email, mobile, image } = useSelector((state) => state.user);
  
    const handleUpdateImage = async () => {
      try {
        const response = await userImage(id, images);
        if (response.data.updated) {
          const { _id, name, email, image, mobile, is_admin } = response.data.data;
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
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const cardImageStyle = {
      width: "300px",
      height: "300px",
      objectFit: "fill",
      overflow: 'hidden',
      borderRadius: "50%",
      border: "0.5px   solid grey ",// Add a white border
      
    };
  
    return (
      <div className="flex justify-center align-center items-center text-start pt-5">
        <Card className=" mt-6 w-auto pl-10">
          
            <img
              src={
                image
                  ? `/images/${image}`
                  : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
              }
              alt="card-image"
              style={cardImageStyle}
            />
          
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Name : {name}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Number : {mobile}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Email : {email}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div>
              <Button onClick={handleUpdateImage}>Submit</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  export default ProfileCard;
  