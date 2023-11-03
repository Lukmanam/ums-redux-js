import axios from "axios";

const adminApi = axios.create({
  baseURL: `http://localhost:3000/admin`,
});

// ******** ADMIN SIGN IN DATA PASSING AREA **********//
export async function Adminsignin(signinData) {
  try {
    
    const data = await adminApi.post("/login", signinData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const UserListDetails = async () => {
  try {
    const data = await adminApi.get("/userList");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export async function addUserDetails(userData) {
  try {
    const data = await adminApi.post('/addUserData',userData)
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
export const editUserData = async (userId) => {
  try {
    const data = await adminApi.get(`/editUser/${userId}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (id, updateUserData) => {
  try {
    const { email, name, number } = updateUserData;
    const data = await adminApi.post("/updateUser", {
      id,
      email,
      name,
      number,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (userId) => {
    try {
        const data = await adminApi.post("/deleteUser",{userId})
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
