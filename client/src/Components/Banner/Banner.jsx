import { Carousel, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function Banner() {
  
  const { name } = useSelector((state) => state.user);

  return (
    <div>
      
        <div className="relative h-full w-full">
          <img
            src="https://images2.alphacoders.com/132/1325726.png"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center">
            <div className="w-3/4 text-center md:w-2/4">
              {name && (
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  Welcome {name}
                </Typography>
              )}
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default Banner;
