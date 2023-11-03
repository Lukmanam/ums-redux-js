import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id:"",
  name:"",
  mobile:"",
  email:"",
  image:"",
  is_admin:""
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    setUserDetails:(state,action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.mobile = action.payload.mobile
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    logoutDetails:(state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.image = "";
      state.mobile = "";
    }
  }
})




export const {setUserDetails,logoutDetails} = userSlice.actions
export default userSlice.reducer
