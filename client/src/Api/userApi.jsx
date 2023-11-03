import axios from "axios";

const userApi = axios.create({
    baseURL: `http://localhost:3000`,
  });


  export async function userSignup(singupData) {
    try {
      const data = await userApi.post("/signup", singupData);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }


  export const userLogin = async (loginData) => {
    try {
      const data = await userApi.post("/login", loginData);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export const userImage = async (id,images) =>{
    try {
      const data = new FormData()
      data.append('image',images)
      data.append('userId',id)
      const config={
        header:{
          'content-type':'multipart/form-data',
          userId : id
        },WithCreadentials:true
      }
      const response = await userApi.post('/profileImage',data,config)
      console.log(response,'==resopnse');
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
  
