import { Navigate } from "react-router-dom";

 const UserPublic = (props) => {
  try {
    const token =  localStorage.getItem('token')
    if(token){
      return <Navigate to="/"/>
    }else{
      <Navigate to="/login"/>
      return props.children
    }
  } catch (error) {
    console.log(error.message)
  }
}
export default UserPublic;