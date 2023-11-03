import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { logoutDetails } from "../../Redux/UserSlice/UserSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logoutDetails({
      id:'',
      name:'',
      email:'',
      mobile:'',
    }))
    navigate('/')
  }
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={"/"} className="flex items-center">
          <strong>Home</strong>
        </Link>
      </Typography>

      {localStorage.getItem("token") ? (
        <div className="flex gap-5">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to={"/profile"} className="flex items-center">
            <strong>   Profile</strong>
            </Link>
          </Typography>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block "
            onClick={handleLogout}
          >
            <span>Logout</span>
          </Button>
        </div>
      ) : (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <span>
              <Link to={"/login"}>Login</Link>
            </span>
          </Button>
        </Typography>
      )}
    </ul>
  );
  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <strong>USER-APP</strong>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Button  variant="gradient" size="sm" fullWidth className="mb-2" >
            <span><strong>Logout</strong></span>
          </Button>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default Header;
