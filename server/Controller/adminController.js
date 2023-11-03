const User = require('../Models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const securePassword = async (password) => {
  try {
    const hashPassword = bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log(error.message);
  }
};
// ********** ADMIN LOGIN MANGEMENT ***********//

const adminLogin = async (req,res) => {
  try {
    const {email,password} = req.body
    const emailExist = await User.findOne({email:email})
    if(emailExist){
      if(emailExist.is_admin === 1){
        const access = await bcrypt.compare(password,emailExist.password)
        if(access){
          const adminToken = jwt.sign({adminId:emailExist._id},process.env.SECRET_KEY_ADMIN,{expiresIn:'1h'})
          res.json({adminData:emailExist,adminToken:adminToken,status:true})
        }else{
          res.json({alert:"Password is incorrect"})
        }
      }else{
        res.json({alert:"You are not an admin"})
      }
    }else{
      res.json({alert:"Email does not exist"})
    }
  } catch (error) {
    console.log(error.message);
  }
}

const userList = async (req,res) => {
  try {
    const userData = await User.find({is_admin:0})
    if(userData){
      res.json({status:true,userData})
    }else{
      res.json({status:false,userData})
    }
  } catch (error) {
    console.log(error.message);
  }
}

const addUserData = async (req,res) => {
  try {
    const {name,email,number,password} = req.body
    const emailExist  = await User.findOne({email:email})
    if(emailExist){
      res.json({status:false,alert:"This user is already exist"})
    }else{
      const spassword = await securePassword(password)
      const user = new User({
        email,
        name,
        mobile:number,
        password:spassword,
        is_admin:0
      })
      const userData = await user.save()
      const token = jwt.sign({userId:userData._id},process.env.SECRET_KEY,{expiresIn:"1h"})
      res.json({userData,token,status:true,alert:"Registration"})
    }
  } catch (error) {
    console.log(error.message);
  }
}


const editUserDetails = async (req,res) => {
  try {
    const {id} = req.params;
    const userData = await User.findById(id)
    if(userData){
      res.json({userData,staus:true,message:"Data found"})
    }else{
      res.json({staus:false,message:"Data not found"})
    }
  } catch (error) {
    console.log(error.message);
  }
}
const updateUserDetails = async (req,res) => {
  try {
    const {id,name,email,number} = req.body
    const updateUserData = await User.updateOne({_id:id},{$set:{name,email,mobile:number}})//,{new:true}
    if(updateUserData){
      res.json({userData:updateUserData,status:true,alert:"updation completed"})
    }else{
      res.json({status:false,alert:'updation failed'})
    }
  } catch (error) {
    console.log(error.message);
  }
}

const deleteUser = async (req,res) => {
  try {
    const {userId} = req.body
    const deletedUser = await User.deleteOne({_id:userId})
    if(deletedUser){
      res.json({deleted:true})
    }else{
      res.json({deleted:false})
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  adminLogin,
  userList,
  editUserDetails,
  updateUserDetails,
  deleteUser,
  addUserData
}



