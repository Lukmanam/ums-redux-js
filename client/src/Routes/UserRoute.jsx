import { Routes,Route } from "react-router-dom"
import Home from "../Pages/UserPages/Home/Home"
import Login from "../Pages/UserPages/Login/Login"
import Signup from "../Pages/UserPages/Signup/Signup"
import Profile from "../Pages/UserPages/Profile/Profile"

import UserPublic from "./UserPublic"
import UserProtect from "./UserProtect"



function UserRoute() {
    return (
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<UserPublic><Login /></UserPublic>}/>
        <Route path="/signup" element={<UserPublic><Signup/></UserPublic>}/>
        <Route path="/profile" element={<UserProtect><Profile /></UserProtect>}/>
      </Routes>
    )
  }
  
  export default UserRoute